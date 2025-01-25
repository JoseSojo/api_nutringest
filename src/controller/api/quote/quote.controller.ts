import { Body, Controller, Get, Param, Post, Put, Query, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Prisma } from "@prisma/client";
import * as fs from 'fs';
import { join } from "path";
import AppActions from "src/AppActions";
import AppEvent from "src/AppEvent";
import { ActiveGuard } from "src/guards/ActiveGuard";
import { AuthGuard } from "src/guards/AuthGuard";
import { LanguajeInterface } from "src/languaje/guard/languaje.interface";
import { LanguajeService } from "src/languaje/languaje.service";
import CalendarService from "src/service/calendar.service";
import HistoryService from "src/service/history.service";
import QuoteService from "src/service/quote/quote.service";

@Controller(`quote`)
export default class QuoteController {

    private lang: LanguajeInterface;
    constructor(
        private service: QuoteService,
        private appEvents: AppEvent,
        private historyService: HistoryService,
        private calendar: CalendarService,
        private permit: AppActions,
        private languaje: LanguajeService 
    ) {
        this.lang = this.languaje.GetTranslate()
    }

    @Get(`report/:id`)
    private async generateReport(@Req() req: any, @Param() param: any, @Body() body: any, @UploadedFile() file: Express.Multer.File) {        
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];
        // const action = this.getPermit(user.rolReference.name).udpate;

        // validación de permisos
        // const valid = permit.includes(action);
        // if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT };

        

        return {
            message: `Descargar Reporte`,
            error: false,
            body: {}
        }
    }

    @UseInterceptors(FileInterceptor(`file`))
    @Post(`:id/upload/photo`)
    @UseGuards(AuthGuard)
    @UseGuards(ActiveGuard)
    private async uploadPhoto(@Req() req: any, @Param() param: any, @Body() body: any, @UploadedFile() file: Express.Multer.File) {        
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];
        const action = this.getPermit(user.rolReference.name).udpate;

        // validación de permisos
        const valid = permit.includes(action);
        if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT };

        const name = `${crypto.randomUUID()}.${file.originalname.split(`.`).pop()}`;
        const path = join(process.cwd(), `public/quote/history/photo`, name);
        const download = `/quote/history/photo/${name}`;

        // CREATE FOTO
        fs.writeFile(path, file.buffer, function (err) {
            if(err) {
                return {
                    error: true,
                    message: `Error al crear el archivo`,
                    body: {}
                }
            }
        });

        const data: Prisma.HistoryPhotoCreateInput = {
            createByRef: { connect:{id:user.id} },
            quoteReference: { connect:{id:param.id} },
            mimyType: file.mimetype,
            originalName: file.originalname,
            path: path,
            size: file.size,
            donwload: download,
            date: body.date,
            description: body.description
        } 

        await this.service.createPhotoHistory({ data, quote:param.id });

        return {
            message: `Foto guardada`,
            error: false,
            body: {}
        }
    }

    @Put(`exchange/remove`)
    @UseGuards(AuthGuard)
    @UseGuards(ActiveGuard)
    private async removeExchange(@Req() req: any, @Body() body: any, @Query() query:{ quote:string,item:string }) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];
        const action = this.getPermit(user.rolReference.name).udpate;

        // validación de permisos
        const valid = permit.includes(action);
        if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT };

        // validar existencia

        if(!query.item) return { error: true, code: 400, message: `No se encuentra la lista.` };
        if(!query.quote) return { error: true, code: 400, message: `No se encuentra la cita.` };

        const result = await this.service.removeExchange({ id:query.item,quote:query.quote });

        return {
            message: `Lista de intercambio removida`,
            error: false,
            body: result
        }
    }

    @Put(`menu/remove`)
    @UseGuards(AuthGuard)
    @UseGuards(ActiveGuard)
    private async removeMenu(@Req() req: any, @Body() body: any, @Query() query:{ quote:string,item:string }) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];
        const action = this.getPermit(user.rolReference.name).udpate;

        // validación de permisos
        const valid = permit.includes(action);
        if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT }
    
        // validar existencia

        if(!query.item) return { error: true, code: 400, message: `No se encuentra la menu.` };
        if(!query.quote) return { error: true, code: 400, message: `No se encuentra la cita.` };

        const result = await this.service.removeMenu({ id:query.item,quote:query.quote });

        return {
            message: `Menú removido`,
            error: false,
            body: result
        }
    }

    @Put(`food/remove`)
    @UseGuards(AuthGuard)
    @UseGuards(ActiveGuard)
    private async removeFood(@Req() req: any, @Body() body: any, @Query() query:{ quote:string,item:string }) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];
        const action = this.getPermit(user.rolReference.name).udpate;

        // validación de permisos
        const valid = permit.includes(action);
        if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT }
    
        // validar existencia

        if(!query.item) return { error: true, code: 400, message: `No se encuentra el alimento.` };
        if(!query.quote) return { error: true, code: 400, message: `No se encuentra la cita.` };

        const result = await this.service.removeFood({ id:query.item,quote:query.quote });

        return {
            message: `Alimento removido`,
            error: false,
            body: result
        }
    }

    @Post(`assing/exchange`)
    @UseGuards(AuthGuard)
    @UseGuards(ActiveGuard)
    private async connectExchange(@Req() req: any, @Body() body: any, @Query() query:{ quote:string,item:string }) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];
        const action = this.getPermit(user.rolReference.name).udpate;

        // validación de permisos
        const valid = permit.includes(action);
        if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT };

        // validar existencia

        if(!query.item) return { error: true, code: 400, message: `No se encuentra la lista.` };
        if(!query.quote) return { error: true, code: 400, message: `No se encuentra la cita.` };

        const result = await this.service.assingExchange(query);

        return {
            message: `Lista de intercambio asignada`,
            error: false,
            body: result
        }
    }

    @Post(`assing/menu`)
    @UseGuards(AuthGuard)
    @UseGuards(ActiveGuard)
    private async connectMenu(@Req() req: any, @Body() body: any, @Query() query:{ quote:string,item:string }) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];
        const action = this.getPermit(user.rolReference.name).udpate;

        // validación de permisos
        const valid = permit.includes(action);
        if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT }
    
        // validar existencia

        if(!query.item) return { error: true, code: 400, message: `No se encuentra la menu.` };
        if(!query.quote) return { error: true, code: 400, message: `No se encuentra la cita.` };

        const result = await this.service.assingMenu(query);

        return {
            message: `Menú Asignado`,
            error: false,
            body: result
        }
    }

    @Post(`assing/primitive`)
    @UseGuards(AuthGuard)
    @UseGuards(ActiveGuard)
    private async connectFood(@Req() req: any, @Body() body: any, @Query() query:{ quote:string,item:string,type:string }) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];
        const action = this.getPermit(user.rolReference.name).udpate;

        // validación de permisos
        const valid = permit.includes(action);
        if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT }
    
        // validar existencia

        if(!query.item) return { error: true, code: 400, message: `No se encuentra el alimento.` };
        if(!query.quote) return { error: true, code: 400, message: `No se encuentra la cita.` };

        const result = await this.service.assingFood(query);

        return {
            message: `Alimento asignado`,
            error: false,
            body: result
        }
    }

    @Get(``)
    @UseGuards(AuthGuard)
    private async paginate(@Req() req: any, @Query() query: { skip?: string, take?: string, param?: string }) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];
        const action = this.getPermit(user.rolReference.name).list;

        // validación de permisos
        const valid = permit.includes(action);
        if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT }

        // validación de datos
        const skip = query.skip ? Number(query.skip) : 0;
        const take = query.take ? Number(query.take) : 10;
        const customFilter: Prisma.QuoteWhereInput[] = [];

        if(permit.includes(this.permit.APP_PERMIT_PROPIETARY_QUOTE_LIST)) {
            customFilter.push({
                OR: [
                    { nutricionistId: user.id },
                    { patientId: user.id }
                ]
            })
        }

        // lógica
        // if (query.param) customFilter.push({ name: { contains: query.param } });

        // validar eliminación
        const filter: Prisma.QuoteWhereInput = { AND: customFilter };

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

    @Get(`history`)
    @UseGuards(AuthGuard)
    private async history(@Req() req: any, @Query() query: { id:string, skip?: string, take?: string, param?: string }) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];
        const action = this.getPermit(user.rolReference.name).list;

        // validación de permisos
        const valid = permit.includes(action);
        if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT }

        // validación de datos
        const skip = query.skip ? Number(query.skip) : 0;
        const take = query.take ? Number(query.take) : 10;
        const customFilter: Prisma.HistoryQuoteWhereInput[] = [];

        // lógica
        // if (query.param) customFilter.push({ name: { contains: query.param } });
        customFilter.push({ quoteId:query.id });

        // validar eliminación
        const filter: Prisma.HistoryQuoteWhereInput = { AND: customFilter };

        const responsePromise = this.service.PaginateHistory({ skip, take, filter });

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

    @Get(`calendar`)
    @UseGuards(AuthGuard)
    private async calendarPaginate(@Req() req: any, @Query() query: { id:string, skip?: string, take?: string, param?: string }) {
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
        // if (query.param) customFilter.push({ name: { contains: query.param } });
        customFilter.push({ quoteId:query.id });

        // validar eliminación
        const filter: Prisma.CalendarWhereInput = { AND: customFilter };

        const responsePromise = this.calendar.paginate({ skip, take, filter });

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

    @Get(`photo`)
    @UseGuards(AuthGuard)
    @UseGuards(ActiveGuard)
    private async photo(@Req() req: any, @Query() query: { id:string, skip?: string, take?: string, param?: string }) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];
        const action = this.getPermit(user.rolReference.name).list;

        // validación de permisos
        const valid = permit.includes(action);
        if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT }

        // validación de datos
        const skip = query.skip ? Number(query.skip) : 0;
        const take = 5;
        const responsePromise = this.service.PaginatePhoto({ skip, take, filter:{quoteId:query.id} });

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
        const filter: Prisma.QuoteWhereInput = { id: param.id };

        const responsePromise = this.service.find({ filter });

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
            body: response.body,
            sections: this.getSections(user.rolReference.name)
        }
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

        const data: Prisma.QuoteCreateInput = {
            Carbohidratos: body.carbohidratos ? Number(body.carbohidratos) : undefined,
            lipidos: body.lipidos ? Number(body.lipidos) : undefined,
            proteinas: body.proteinas ? Number(body.proteinas) : undefined,
            description: body.description ? body.description : undefined,
            exercise: body.exercise ? body.exercise : undefined,
            sleep: body.sleep ? body.sleep : undefined,
            weightNow: body.weightNow ? Number(body.weightNow) : undefined,
            weightObjective: body.weightObjective ? Number(body.weightObjective) : undefined,
            weightPreview: body.weightPreview ? Number(body.weightPreview) : undefined,
            nutricionistReference: { connect: { id: user.id } },
            patientReference: { connect: { id: body.patient } }
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

        // await this.historyService.create({ 
        //     // userId:user.id,
        //     userReference:{connect:{id:user.id}},
        //     eventName:this.appEvents.EVENT_QUOTE_CREATE,
        //     objectName:this.objectName(), 
        //     objectReferenceId: response.body.id
        // });

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

        const data: Prisma.QuoteUpdateInput = {}

        if(body.description) data.description = body.description;
        if(body.exercise) data.exercise = body.exercise;
        if(body.sleep) data.sleep = body.sleep;
        if(body.weightNow) data.weightNow = body.weightNow;
        if(body.weightObjective) data.weightObjective = body.weightObjective;
        if(body.weightPreview) data.weightPreview = body.weightPreview;

        const responsePromise = this.service.udpate({ data, id: param.id });

        // LOG
        await this.historyService.create({ 
            // userId:user.id,
            userReference:{connect:{id:user.id}},
            eventName:this.appEvents.EVENT_QUOTE_UPDATE,
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
        await this.historyService.create({ 
            // userId:user.id,
            userReference:{connect:{id:user.id}},
            eventName:this.appEvents.EVENT_QUOTE_DELETE,
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

    private getSections(rol: string) {

        const sections = []

        if(rol === this.permit.USER_NUTRI_ADMIN) {
            sections.push({ label:`Historial`,value:`HISTORY` });
            sections.push({ label:`Paciente`,value:`PATIENT` });
        }
        if(rol === this.permit.USER_NUTRICIONISTA) {
            sections.push({ label:`Paciente`,value:`PATIENT` });
        }
        
        sections.push({ label:`Agenda`,value:`CALENDAR` });
        sections.push({ label:`Alimentos`,value:`FOOD` });
        sections.push({ label:`Listas Intercambio`,value:`EXCHANGE` });
        sections.push({ label:`Menús`,value:`MENU` });
        // sections.push({ label:`Recomendaciones`,value:`UPDATE` });
        // sections.push({ label:`Historial`,value:`HISTORY` });
        // sections.push({ label:`Detalles`,value:`DETAILS` });
        sections.push({ label:`Recomendaciones`,value:`RECOMENDATIONS` });
        sections.push({ label:`Fotos`,value:`PHOTO` });
        


        return sections;
    }

    private objectName() { return `quote` }

}
