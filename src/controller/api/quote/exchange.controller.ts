import { Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import AppActions from "src/AppActions";
import AppEvent from "src/AppEvent";
import { ActiveGuard } from "src/guards/ActiveGuard";
import { AuthGuard } from "src/guards/AuthGuard";
import { LanguajeInterface } from "src/languaje/guard/languaje.interface";
import { LanguajeService } from "src/languaje/languaje.service";
import ExchangeListFoodModel from "src/model/quote/exchange.food.model";
import { PrismaService } from "src/prisma/prisma.service";
import HistoryService from "src/service/history.service";
import PrimitiveFoodService from "src/service/nutri/food.service";
import ExchangeListService from "src/service/quote/exchange.service";

@Controller(`exchange`)
export default class ExchangeListController {

    private lang: LanguajeInterface;
    constructor(
        private exchangeListFoodModel: ExchangeListFoodModel,
        private service: ExchangeListService,
        private appEvents: AppEvent,
        private history: HistoryService,
        private permit: AppActions,
        private languaje: LanguajeService,
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

        await this.exchangeListFoodModel.delete({ id: param.id });

        return {
            error: false,
            message: `delete success (controller)`,
            body: {}
        }

    }

    @Get(``)
    @UseGuards(AuthGuard)
    private async paginate(@Req() req: any, @Query() query: { skip?: string, take?: string, param?: string, quote?: string }) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];
        const action = this.getPermit(user.rolReference.name).list;

        // validación de permisos
        const valid = permit.includes(action);
        if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT }

        // validación de datos
        const skip = query.skip ? Number(query.skip) : 0;
        const take = query.take ? Number(query.take) : 10;
        const customFilter: Prisma.ExchangeListWhereInput[] = [];

        // lógica
        if (query.param) customFilter.push({ name: { contains: query.param } });

        if (user.rolReference.name === this.permit.USER_NUTRICIONISTA) customFilter.push({ userReference: { id: user.id } });
        if (user.rolReference.name === this.permit.USER_PACIENTE) customFilter.push({ exchange: { some: { quoteReference: { patientId: user.id } } } });
        if (query.quote) customFilter.push({ exchange: { some: { quoteId: query.quote } } });

        // validar eliminación
        const filter: Prisma.ExchangeListWhereInput = { AND: customFilter };

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
    @UseGuards(ActiveGuard)
    private async unique(@Req() req: any, @Param() param: { id: string }) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];
        const action = this.getPermit(user.rolReference.name).list;

        // validación de permisos
        const valid = permit.includes(action);
        if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT }

        // validar eliminación
        const filter: Prisma.ExchangeListWhereInput = { id: param.id };

        const responsePromise = this.service.find({ filter });

        // LOG

        const response = await responsePromise;

        if (response.error) {
            return {
                message: response.message,
                error: response.error
            }
        }

        return response;
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
        console.log(`PERMISO: ${valid}`);
        // if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT };

        // validación de datos
        let data: Prisma.ExchangeListCreateInput = {
            name: body.name,
            userReference: { connect: { id: user.id } }
        }

        if (body.ration) data = { ...data, ration: body.ration };
        if (body.unity) data = { ...data, unityReference: { connect: { id: body.unity.id } } };
        const responsePromise = this.service.create({ data });

        // LOG

        const response = await responsePromise;

        // create foods
        const exchangeId = response.body.id;
        const foods: { unity?: { id: string, label: string }, food: { id: string, label: string }, ration?: string | number }[] = body.foods;

        foods.forEach(async (food) => {
            const create: Prisma.ExchangeListFoodsCreateInput = {
                exchangeListReference: { connect: { id: exchangeId } },
                foodReference: { connect: { id: Number(food.food.id) } },
            };
            await this.service.createManyFood({ data: create });
        });

        if (response.error) {
            return {
                message: response.message,
                error: response.error
            }
        }

        await this.history.create({
            // userId:user.id,
            userReference: { connect: { id: user.id } },
            eventName: this.appEvents.EVENT_QUOTE_EXCHANGE_LIST_CREATE,
            objectName: this.objectName(),
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
        // if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT }

        // validación de datos
        let data: Prisma.ExchangeListUpdateInput = {
            name: body.name
        }

        const responsePromise = this.service.udpate({ data, id: param.id });

        // LOG
        await this.history.create({
            // userId:user.id,
            userReference: { connect: { id: user.id } },
            eventName: this.appEvents.EVENT_QUOTE_EXCHANGE_LIST_UPDATE,
            objectName: this.objectName(),
            objectReferenceId: param.id
        });

        const response = await responsePromise;

        // create foods
        // const exchangeId = response.body.id;
        const foods: { id: string, food: { id: string, label: string } }[] = body.foods;
        // foods.forEach(async (food) => {
        //     const create: Prisma.ExchangeListFoodsCreateInput = {
        //         exchangeListReference: { connect:{id:exchangeId} },
        //         foodReference: { connect:{id:Number(food.food.id)} },
        //     };
        //     await this.service.createManyFood({ data: create });
        // });
        foods.forEach(async (food) => {
            const foodFound = await this.prisma.exchangeListFoods.findFirst({ where: { AND:[{id: food.id},{exchangeListId:param.id}] } });
            if (!foodFound || food.id === undefined || food.id === null) {
                const create: Prisma.ExchangeListFoodsCreateInput = {
                    exchangeListReference: { connect: { id: param.id } },
                    foodReference: { connect: { id: Number(food.food.id) } },
                };
                // this.service.udpateFood({ data: create, id:param.id });
                await this.service.createManyFood({ data: create });
            }
        });

        // eliminar alimentos que no estén
        const deleteFood: { id: string, food: { id: string, label: string } }[] = body.delete;
        if (deleteFood) {
            deleteFood.forEach(async (food) => {
                await this.prisma.exchangeListFoods.delete({ where: { id: food.id } });
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
            userReference: { connect: { id: user.id } },
            eventName: this.appEvents.EVENT_QUOTE_EXCHANGE_LIST_DELETE,
            objectName: this.objectName(),
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

    private getActionsList(permit: string[]) {
        const response = this.service.getActionsList(permit);
        return response;
    }

    private getActionsUnique(permit: string[]) {
        const response = this.service.getActionsUnique(permit);
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

    private objectName() { return `exchangelist` }
}
