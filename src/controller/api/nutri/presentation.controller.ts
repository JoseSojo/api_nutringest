import { Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import AppActions from "src/AppActions";
import AppEvent from "src/AppEvent";
import { AuthGuard } from "src/guards/AuthGuard";
import { LanguajeInterface } from "src/languaje/guard/languaje.interface";
import { LanguajeService } from "src/languaje/languaje.service";
import HistoryService from "src/service/history.service";
import PaymentMethodService from "src/service/master/payment.service";
import PresentationService from "src/service/nutri/presentation.service";
import PermitService from "src/service/permit.service";

@Controller(`presentation`)
export default class PresentationController {

    private lang: LanguajeInterface;
    constructor(
        private service: PresentationService,
        private appEvents: AppEvent,
        private history: HistoryService,
        private permit: AppActions,
        private languaje: LanguajeService, 
    ) {
        this.lang = this.languaje.GetTranslate()
    }

    @Get(``)
    @UseGuards(AuthGuard)
    private async paginate(@Req() req: any, @Query() query: { skip?: string, take?: string, param?: string }) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];
        const action = this.getPermit().list;

        // validación de permisos
        const valid = permit.includes(action);
        if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT }

        // validación de datos
        const skip = query.skip ? Number(query.skip) : 0;
        const take = query.take ? Number(query.take) : 10;
        const customFilter: Prisma.PresentationWhereInput[] = [];

        // lógica
        if (query.param) customFilter.push({ name: { contains: query.param } });

        // validar eliminación
        const filter: Prisma.PresentationWhereInput = { AND: customFilter };

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
        const action = this.getPermit().list;

        // validación de permisos
        const valid = permit.includes(action);
        if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT }

        // validar eliminación
        const filter: Prisma.PresentationWhereInput = { id:param.id };

        const responsePromise = this.service.find({ filter });

        // LOG

        const response = await responsePromise;

        if (response.error) {
            return {
                message: response.message,
                error: response.error
            }
        }
        const title = response.body.name;

        return {
            message: response.message,
            error: response.error,
            body: response.body,
            header: this.service.HeaderUnique(),
            extract: this.service.HeaderUniqueExtract(),
            title
        }
    }

    @Post(`create`)
    @UseGuards(AuthGuard)
    private async create(@Req() req: any, @Body() body: any) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];
        const action = this.getPermit().udpate;

        // validación de permisos
        const valid = permit.includes(action);
        if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT }

        // validación de datos

        const data: Prisma.PresentationCreateInput = {
            name: body.name,
            SupplementReference: { connect:{ id:body.supplementId } },
            createByReference: { connect:{ id:user.id } },
        }

        // validar subscripción
        // validar ciudad

        const responsePromise = this.service.create({ data });

        // LOG

        const response = await responsePromise;

        if (response.error) {
            return {
                message: response.message,
                error: response.error
            }
        }

        await this.history.create({ 
            // userId:user.id,
            userReference:{connect:{id:user.id}},
            eventName:this.appEvents.EVENT_NUTRI_PRESENTATION_CREATE,
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
    private async update(@Req() req: any, @Body() body: any, @Param() param: { id: string }) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];
        const action = this.getPermit().udpate;

        // validación de permisos
        const valid = permit.includes(action);
        if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT }

        // validación de datos

        const data: Prisma.PresentationUpdateInput = {
            name: body.name
        }

        const responsePromise = this.service.udpate({ data,id:param.id });

        // LOG
        await this.history.create({ 
            // userId:user.id,
            userReference:{connect:{id:user.id}},
            eventName:this.appEvents.EVENT_NUTRI_PRESENTATION_UPDATE,
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

    @Put(`:id/delete`)
    @UseGuards(AuthGuard)
    private async delete(@Req() req: any, @Body() body: any, @Param() param: { id: string }) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];
        const action = this.getPermit().delete;

        // validación de permisos
        const valid = permit.includes(action);
        if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT }

        // validación si es propietario
        // validación si es super admin


        const responsePromise = this.service.delete({ id:param.id });

        // LOG
        await this.history.create({ 
            // userId:user.id,
            userReference:{connect:{id:user.id}},
            eventName:this.appEvents.EVENT_NUTRI_PRESENTATION_DELETE,
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
    //     const action = this.getPermit().recovery;

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
    private getPermit() {
        const response = this.service.getPermits();
        return response;
    }

    private objectName() { return `presentation` }
}
