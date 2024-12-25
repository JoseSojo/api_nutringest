import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import AppActions from 'src/AppActions';
import { AuthGuard } from 'src/guards/AuthGuard';
import { LanguajeInterface } from 'src/languaje/guard/languaje.interface';
import { LanguajeService } from 'src/languaje/languaje.service';
import HistoryService from 'src/service/history.service';

@Controller('app')
export class AppController {

    private lang: LanguajeInterface;

    constructor(
        private service: HistoryService,
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
        const customFilter: Prisma.HistoryWhereInput[] = [];

        // lógica
        if (query.param) customFilter.push({ OR: [{ eventName:{contains:query.param} }] });

        // validar eliminación
        const filter: Prisma.HistoryWhereInput = { AND: customFilter };

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
        const valid = permit.includes(action) ? true : user.id === param.id ? true : false;
        if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT }

        // validar eliminación
        const filter: Prisma.HistoryWhereInput = { id: param.id };

        /*
        const responsePromise = this.service.({ filter });

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
            body: response.body
        }
        */
        return {}
    }

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
}
