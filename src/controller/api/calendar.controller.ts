import { Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import AppActions from "src/AppActions";
import { AuthGuard } from "src/guards/AuthGuard";
import { LanguajeInterface } from "src/languaje/guard/languaje.interface";
import { LanguajeService } from "src/languaje/languaje.service";
import CalendarModel from "src/model/calendar.model";
import CalendarService from "src/service/calendar.service";

@Controller(`calendar`)
export default class CalendarController {

    private lang: LanguajeInterface;
    constructor(
        private CalendarFoodModel: CalendarModel,
        private service: CalendarService,

        private permit: AppActions,
        private languaje: LanguajeService 
    ) {
        this.lang = this.languaje.GetTranslate()
    }

    @Get(`today`)
    @UseGuards(AuthGuard)
    private async today(@Req() req: any, @Query() query: { skip?: string, take?: string, param?: string, quote?:string, month:string, year:string, status:string }) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];
        const action = this.getPermit(user.rolReference.name).list;

        // validación de permisos
        const valid = permit.includes(action);
        if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT }

        const date = new Date();

        // validación de datos
        const skip = query.skip ? Number(query.skip) : 0;
        const take = query.take ? Number(query.take) : 10;
        const customFilter: Prisma.CalendarWhereInput[] = [];

        if(user.rolReference.name === this.permit.USER_NUTRICIONISTA) customFilter.push({ createByReference:{id:user.id} });        
        // if(user.rolReference.name === this.permit.USER_PACIENTE) customFilter.push({  });     
        if(user.rolReference.name !== this.permit.USER_PACIENTE && query.quote) customFilter.push({ quoteId: query.quote });

        
        customFilter.push({ day:date.getDate() });
        customFilter.push({ isDelete: false });

        const filter: Prisma.CalendarWhereInput = { AND:customFilter };

        const responsePromise = this.service.paginate({ skip, take, filter });

        // LOG

        const response = await responsePromise;

        return response;
    }

    @Get(`release/`)
    @UseGuards(AuthGuard)
    private async release(@Req() req: any, @Param() param: {status:string},@Query() query: { skip?: string, take?: string, param?: string, quote?:string, month:string, year:string, status:string }) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];
        const action = this.getPermit(user.rolReference.name).list;

        // validación de permisos
        const valid = permit.includes(action);
        if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT }

        const date = new Date();

        // validación de datos
        const skip = query.skip ? Number(query.skip) : 0;
        const take = query.take ? Number(query.take) : 10;
        const customFilter: Prisma.CalendarWhereInput[] = [];

        const currentForMonth: Prisma.CalendarWhereInput = {AND:[{ monthNumber:{lt:date.getMonth()+1} }, { day:{lt:date.getDate()} }, { year:{lt:date.getFullYear()} }]};
        const currentOtherMonth: Prisma.CalendarWhereInput = {OR:[{ monthNumber:{lt:date.getMonth()+1} }, { day:{lt:date.getDate()} }, { year:{lt:date.getFullYear()} }]};

        // if(user.rolReference.name === this.permit.USER_NUTRICIONISTA) customFilter.push({ createById: user.id });
        // else customFilter.push({ createById: user.id });
        customFilter.push({ isDelete: false });
        customFilter.push({ status: `ACTIVA` });
        customFilter.push({ OR:[currentForMonth,currentOtherMonth] });
        if(user.rolReference.name === this.permit.USER_NUTRICIONISTA) customFilter.push({ createByReference:{id:user.id} });        
        // if(user.rolReference.name === this.permit.USER_PACIENTE) customFilter.push({  });     
        if(user.rolReference.name !== this.permit.USER_PACIENTE && query.quote) customFilter.push({ quoteId: query.quote });


        const filter: Prisma.CalendarWhereInput = { AND:customFilter };

        const responsePromise = this.service.paginate({ skip, take, filter });

        // LOG

        const response = await responsePromise;

        return response;
    }

    @Get(`specify`)
    @UseGuards(AuthGuard)
    private async findForMonth(@Req() req: any, @Query() query: { skip?: string, take?: string, param?: string, quote?:string, month:string, year:string, status:string }) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];
        const action = this.getPermit(user.rolReference.name).list;

        // validación de permisos
        const valid = permit.includes(action);
        if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT }

        const responsePromise = this.service.findForMonth({ 
            quote:query.quote ? query.quote : ``, 
            month:Number(query.month),
            status:query.status ? query.status : ``,
            year:Number(query.year),
            user: user.id
        });

        // LOG

        const response = await responsePromise;

        return response;
    }

    @Put(`/history/:id/delete`)
    @UseGuards(AuthGuard)
    private async dropHistory(@Req() req: any, @Param() param: { id: string }) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];
        const action = this.getPermit(user.rolReference.name).list;

        // validación de permisos
        const valid = permit.includes(action);
        // if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT }

        await this.CalendarFoodModel.softDeleteHistory({ id: param.id });

        return {
            error: false,
            message: `delete success (controller)`,
            body: {}
        }

    }

    @Get(``)
    @UseGuards(AuthGuard)
    private async paginate(@Req() req: any, @Query() query: { skip?: string, take?: string, param?: string, quote?:string }) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];
        const action = this.getPermit(user.rolReference.name).list;

        // validación de permisos
        const valid = permit.includes(action);
        if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT }

        // validación de datos
        const skip = query.skip ? Number(query.skip) : 0;
        const take = query.take ? Number(query.take) : 10;
        const customFilter: Prisma.CalendarWhereInput[] = [];

        // lógica
        if (query.param) customFilter.push({ OR:[{description: { contains: query.param }}] });

        if(user.rolReference.name === this.permit.USER_NUTRICIONISTA) customFilter.push({ createByReference:{id:user.id} });        
        // if(user.rolReference.name === this.permit.USER_PACIENTE) customFilter.push({  });     
        if(user.rolReference.name !== this.permit.USER_PACIENTE && query.quote) customFilter.push({ quoteId: query.quote });

        // validar eliminación
        const filter: Prisma.CalendarWhereInput = { AND: customFilter };

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
        const filter: Prisma.CalendarWhereInput = { id: param.id };

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
    private async create(@Req() req: any, @Body() body: any) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];
        const action = this.getPermit(user.rolReference.name).udpate;

        // validación de permisos
        const valid = permit.includes(action);
        if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT }

        // validación de datos
        let data: Prisma.CalendarCreateInput = {
            createByReference: { connect: { id: user.id } },
            day: Number(body.day),
            monthName: ``,
            monthNumber: Number(body.monthNumber),
            year: Number(body.year),
            status: `ACTIVA`,
            hours: body.hours,
            description: body.description,
        }


        if(body.quote) data.quoteReference = { connect:{id:body.quote} }

        const responsePromise = this.service.create({ data });

        // LOG

        const response = await responsePromise;

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
        const action = this.getPermit(user.rolReference.name).udpate;

        // validación de permisos
        const valid = permit.includes(action);
        if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT }

        // validación de datos
        let data: Prisma.CalendarUpdateInput = {};


        if (body.description) data = { ...data, description: body.description };
        if (body.status) data = { ...data, status: body.status };


        const responsePromise = this.service.udpate({ data, id: param.id });

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
            body: response
        }
    }

    @Put(`:id/reprogramming`)
    @UseGuards(AuthGuard)
    private async reprogramming(@Req() req: any, @Body() body: any, @Param() param: { id: string }) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];
        const action = this.getPermit(user.rolReference.name).udpate;

        // validación de permisos
        const valid = permit.includes(action);
        if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT }

        // validación de datos
        let data: Prisma.CalendarUpdateInput = {
            day: Number(body.day),
            monthName: ``,
            monthNumber: Number(body.monthNumber),
            year: Number(body.year),
            status: `ACTIVA`,
            hours: body.hours,
        };

        const responsePromise = this.service.udpate({ data, id: param.id });

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
            body: response
        }
    }

    @Put(`:id/delete`)
    @UseGuards(AuthGuard)
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

    @Put(`:id/status/:status`)
    @UseGuards(AuthGuard)
    private async status(@Req() req: any, @Body() body: any, @Param() param: { id: string,status:string }) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];
        const action = this.getPermit(user.rolReference.name).udpate;

        if (user.rolReference.name !== this.permit.USER_NUTRICIONISTA) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT }

        // validación de permisos
        const valid = permit.includes(action);
        if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT }

        // validación si es propietario
        // validación si es super admin

        const responsePromise = this.service.udpate({ id: param.id, data:{status:param.status} });

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

}
