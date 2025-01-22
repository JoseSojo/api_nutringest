import { Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import AppActions from "src/AppActions";
import AppEvent from "src/AppEvent";
import { ActiveGuard } from "src/guards/ActiveGuard";
import { AuthGuard } from "src/guards/AuthGuard";
import { LanguajeInterface } from "src/languaje/guard/languaje.interface";
import { LanguajeService } from "src/languaje/languaje.service";
import MenuModel from "src/model/quote/menu.model";
import { PrismaService } from "src/prisma/prisma.service";
import HistoryService from "src/service/history.service";
import MenuService from "src/service/quote/menu.service";

@Controller(`menu`)
export default class MenuController {

    private lang: LanguajeInterface;
    constructor(
        private service: MenuService,
        private menuDetailModel: MenuModel,
        private appEvents: AppEvent,
        private history: HistoryService,
        private permit: AppActions,
        private languaje: LanguajeService ,
        private prisma: PrismaService,
    ) {
        this.lang = this.languaje.GetTranslate()
    }

    @Put(`/food/:id/delete`)
    @UseGuards(AuthGuard)
    private async dropFood(@Req() req: any, @Param() param: { id: string }) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];
        const action = this.getPermit(user.rolReference.name).list;

        // validación de permisos
        const valid = permit.includes(action);
        // if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT }

        await this.menuDetailModel.delete({ id: param.id });

        return {
            error: false,
            message: `delete success (controller)`,
            body: {}
        }

    }

    @Post(`create`)
    @UseGuards(AuthGuard)
    @UseGuards(ActiveGuard)
    private async create(@Req() req: any, @Body() body: any) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];
        const action = this.getPermit(user.rolReference.name).udpate;

        // validación de permisos
        const valid = permit.includes(action);
        if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT }

        // validación de datos
        let data: Prisma.MenuCreateInput = {

            name: body.name,
            type: body.type,
            description: body.description,
            createByReference: { connect: { id: user.id } }

        }

        const responsePromise = this.service.create({ data });

        // LOG
        const response = await responsePromise;

        // create foods
        const menuId = response.body.id;
        const foods: { unity?: { id: string, label: string }, food: { id: string, label: string }, quantity?: string | number }[] = body.foods;

        foods.forEach(async (food) => {
            const create: Prisma.MenuDetailCreateInput = {
                foodPrimitiveReference: { connect: { id: food.food.id } },
                menuReference: { connect: { id: menuId } },
            };
            if(food.unity) create.unityMeasureReference = {connect:{id:food.unity.id}} 
            this.service.createManyFood({ data: create });
            // await this.prisma.menuDetail.create({ data:create });
        });

        if (response.error) {
            return {
                message: response.message,
                error: response.error
            }
        }

        await this.history.create({ 
            // userId:user.id,
            userReference:{connect:{id:user.id}},
            eventName:this.appEvents.EVENT_QUOTE_MENU_CREATE,
            objectName:this.objectName(), 
            objectReferenceId: response.body.id
        });

        return {
            message: response.message,
            error: response.error,
            body: response
        }
    }

    @Put(`:id/update`)
    @UseGuards(AuthGuard)
    @UseGuards(ActiveGuard)
    private async update(@Req() req: any, @Body() body: any, @Param() param: { id: string }) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];
        const action = this.getPermit(user.rolReference.name).udpate;

        // validación de permisos
        const valid = permit.includes(action);
        if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT }

        // validación de datos
        let data: Prisma.MenuUpdateInput = {
            name: body.name,
            description: body.description,
            type: body.type
        }

        const responsePromise = this.service.udpate({ data, id: param.id });

        // LOG
        await this.history.create({ 
            // userId:user.id,
            userReference:{connect:{id:user.id}},
            eventName:this.appEvents.EVENT_QUOTE_MENU_UPDATE,
            objectName:this.objectName(), 
            objectReferenceId: param.id
        });

        const response = await responsePromise;

        // create foods
        // const exchangeId = response.body.id;
        const foods: { id: string, unity?: { id: string, label: string }, food: { id: string, label: string }, quantity: string | number }[] = body.foods;

        foods.forEach(async (food) => {
            const foodFound = await this.prisma.menuDetail.findFirst({ where: { AND:[{id: food.id},{menuId:response.body.id}] } });
            if (!foodFound) {
                const create: Prisma.MenuDetailCreateInput = {
                    foodPrimitiveReference: { connect:{ id:food.food.id } },
                    menuReference: { connect:{ id:param.id } },
                    quentity: Number(food.quantity),
                };
                if(food.unity) create.unityMeasureReference = { connect:{ id:food.unity.id } }
                await this.service.createManyFood({ data: create });
            }
        });

        const foodsDelete: { id: string, unity?: { id: string, label: string }, food: { id: string, label: string }, quantity: string | number }[] = body.delete;
        if(foodsDelete) {
            foodsDelete.forEach(async (food) => {
                await this.prisma.menuDetail.delete({ where:{id:food.id} });
            })
        }


        if (response.error) {
            return {
                message: response.message,
                error: response.error
            }
        }

        return {
            message: response.message,
            error: response.error,
            body: response
        }
    }

    @Get(``)
    @UseGuards(AuthGuard)
    private async paginate(@Req() req: any, @Query() query: { skip?: string, take?: string, param?: string,quote:string }) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];
        const action = this.getPermit(user.rolReference.name).list;

        // validación de permisos
        const valid = permit.includes(action);
        if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT }

        // validación de datos
        const skip = query.skip ? Number(query.skip) : 0;
        const take = query.take ? Number(query.take) : 10;
        const customFilter: Prisma.MenuWhereInput[] = [];

        // lógica
        if (query.param) customFilter.push({ name: { contains: query.param } });
        if(user.rolReference.name === this.permit.USER_NUTRICIONISTA) customFilter.push({ createByReference:{id:user.id} });        
        if(user.rolReference.name === this.permit.USER_PACIENTE) customFilter.push({ details:{ some:{ quoteReference:{ patientReference:{ id:user.id } } } } });     

        if(query.quote) customFilter.push({ details:{ some:{ quoteId:query.quote } } });

        // validar eliminación
        const filter: Prisma.MenuWhereInput = { AND: customFilter };

        const responsePromise = this.service.paginate({ skip, take, filter });

        // LOG

        const response = await responsePromise;

        if (response.error) {
            return {
                message: response.message,
                error: response.error
            }
        }

        return {
            message: response.message,
            error: response.error,
            body: {
                ...response.body,
                actionList: this.getActionsList(permit),
                actionUnique: this.getActionsUnique(permit),
            }
        };
    }

    @Get(`:id/unique`)
    @UseGuards(AuthGuard)
    private async unique(@Req() req: any, @Param() param: { id: string }) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];
        const action = this.getPermit(user.rolReference.name).list;

        // validación de permisos
        const valid = permit.includes(action);
        if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT }

        // validar eliminación
        const filter: Prisma.MenuWhereInput = { id: param.id };
        const responsePromise = this.service.find({ filter });

        // LOG

        const response = await responsePromise;

        if (response.error) {
            return {
                message: response.message,
                error: response.error
            }
        }

        return response
    }

    @Put(`:id/delete`)
    @UseGuards(AuthGuard)
    @UseGuards(ActiveGuard)
    private async delete(@Req() req: any, @Body() body: any, @Param() param: { id: string }) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];
        const action = this.getPermit(user.rolReference.name).delete;

        // validación de permisos
        const valid = permit.includes(action);
        if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT }

        // validación si es propietario
        // validación si es super admin


        const responsePromise = this.service.delete({ id: param.id });

        // LOG
        await this.history.create({ 
            // userId:user.id,
            userReference:{connect:{id:user.id}},
            eventName:this.appEvents.EVENT_QUOTE_MENU_DELETE,
            objectName:this.objectName(), 
            objectReferenceId: param.id
        });

        const response = await responsePromise;

        if (response.error) {
            return {
                message: response.message,
                error: response.error
            }
        }

        return {
            message: response.message,
            error: response.error,
            body: response
        }
    }

    // @Put(`:id/recovery`)
    // @UseGuards(AuthGuard)
    // private async recovery(@Req() req: any, @Body() body: any, @Param() param: { id: string }) {
    //     const user = req.user as any;
    //     const permit = user.rolReference.roles as string[];
    //     const action = this.getPermit(user.rolReference.name).recovery;

    //     // validación de permisos
    //     const valid = permit.includes(action);
    //     if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT }

    //     // validación si es propietario
    //     // validación si es super admin


    //     // const responsePromise = this.service.recovery({ id:param.id });

    //     // LOG

    // }

    private getActionsList(permit: string[]) {
        const response = this.service.getActionsList(permit);
        return response;
    }

    private getActionsUnique(permit: string[]) {
        const response = this.service.getActionsList(permit);
        return response;
    }

    // obtiene permisos en crud
    private getPermit(rol: string) {
        let response: any;

        if (rol === this.permit.USER_NUTRICIONISTA) {
            response = this.service.getPermitsPropietary();
        }
        else if (rol === this.permit.USER_PACIENTE) {
            response = this.service.getPermitsPropietary();
        }
        else {
            response = this.service.getPermits();
        }

        return response;
    }

    private objectName() { return `menu` }

}
