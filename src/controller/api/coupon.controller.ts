import { Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import AppActions from "src/AppActions";
import AppEvent from "src/AppEvent";
import { AuthGuard } from "src/guards/AuthGuard";
import { LanguajeInterface } from "src/languaje/guard/languaje.interface";
import { LanguajeService } from "src/languaje/languaje.service";
import CalendarModel from "src/model/calendar.model";
import ExchangeListFoodModel from "src/model/quote/exchange.food.model";
import CalendarService from "src/service/calendar.service";
import CouponService from "src/service/coupon.service";
import HistoryService from "src/service/history.service";

@Controller(`coupon`)
export default class CouponController {

    private lang: LanguajeInterface;
    constructor(
        private service: CouponService,

        private permit: AppActions,
        private languaje: LanguajeService,
        private exchangeListFoodModel: ExchangeListFoodModel,
        private appEvents: AppEvent,
        private history: HistoryService,
    ) {
        this.lang = this.languaje.GetTranslate()
    }

    @Get(``)
    @UseGuards(AuthGuard)
    private async paginate(@Req() req: any, @Query() query: { ignore?: string[] | string, skip?: string, take?: string, param?: string, quote?: string }) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];
        const action = this.getPermit(user.rolReference.name).list;

        // validación de permisos
        const valid = permit.includes(action);
        if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT }

        // validación de datos
        const skip = query.skip ? Number(query.skip) : 0;
        const take = query.take ? Number(query.take) : 10;
        const customFilter: Prisma.CouponsWhereInput[] = [];

        // lógica
        if (user.rolReference.name === this.permit.USER_NUTRICIONISTA) customFilter.push({ propietaryId: user.id });
        if (query.param) customFilter.push({ OR: [{ description: { contains: query.param } }] });

        if (query.ignore) {
            if (typeof query.ignore === `string`) {
                customFilter.push({ id: { not: query.ignore } });
            } else {
                const custonsId: { id: { not: string } }[] = [];

                query.ignore.forEach((id) => {
                    custonsId.push({ id: { not: id } })
                });

                custonsId.forEach(item => {
                    customFilter.push(item);
                });
            }
        }

        // if(user.rolReference.name === this.permit.USER_NUTRICIONISTA) customFilter.push({ createByReference:{id:user.id} });        
        // if(user.rolReference.name === this.permit.USER_PACIENTE) customFilter.push({  });     
        // if(query.quote) customFilter.push({ quoteId: query.quote });

        // validar eliminación
        const filter: Prisma.CouponsWhereInput = { AND: customFilter };

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

    @Get(`code`)
    @UseGuards(AuthGuard)
    private async code(@Req() req: any, @Param() param: { id: string }) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];

        return {
            code: user.propietaryCode
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
        const filter: Prisma.CouponsWhereInput = { id: param.id };

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
