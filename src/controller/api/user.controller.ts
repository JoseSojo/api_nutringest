import { Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import AppActions from "src/AppActions";
import { AuthGuard } from "src/guards/AuthGuard";
import { LanguajeInterface } from "src/languaje/guard/languaje.interface";
import { LanguajeService } from "src/languaje/languaje.service";
import PermitModel from "src/model/permit.model";
import UserModel from "src/model/user.model";
import PaymentMethodService from "src/service/master/payment.service";
import UserService from "src/service/user.service";
import WalletService from "src/service/wallet.service";

@Controller(`user`)
export default class UserController {

    private lang: LanguajeInterface;
    constructor(
        private service: UserService,
        private model: UserModel,
        private paymentService: PaymentMethodService,
        private permit: AppActions,
        private permitModel: PermitModel,
        private languaje: LanguajeService, 
        private wallet: WalletService
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
        const customFilter: Prisma.UserWhereInput[] = [];

        // lógica
        if (query.param) customFilter.push({ OR: [{ name: { contains: query.param } }, { lastname: { contains: query.param } }, { username: { contains: query.param } }] });

        // validar eliminación
        if (true) customFilter.push({ isDelete: false });
        const filter: Prisma.UserWhereInput = { AND: customFilter };

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

    @Post(`create/finance`)
    @UseGuards(AuthGuard)
    private async createFinance(@Req() req: any, @Body() body: any) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];
        const action = this.getPermit().udpate;

            // validación de permisos
        // const valid = permit.includes(action);
        // if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT }

        // validación de datos

        
        // validar subscripción
        // validar ciudad

        const responsePromise = this.service.Finance({ date:body.date,mount:Number(body.mount),payment:body.payment,userId:user.id });

        // LOG

        const response = await responsePromise;

        return {
            message: this.lang.ACTIONS.SUCCESS.CREATE,
            error: false,
            body: response
        }
    }

    @Put(`update/:id/finance`)
    @UseGuards(AuthGuard)
    private async udpateStatusFinance(@Req() req: any, @Body() body: any, @Param() param: {id:string}, @Query() query:{status:string}) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];
        const action = this.getPermit().udpate;

        const responsePromise = this.service.FinanceUpdate({ id:param.id,status:query.status });

        // LOG

        const response = await responsePromise;

        if(query.status === `APROVADO`) {
            const findWallet = await this.wallet.findUser({ id:response.userId });
            if(findWallet) {
                await this.wallet.increment({ id:findWallet.id, mount:response.mount });
            }
            else {
                await this.wallet.create({ userId:response.userId,mount:response.mount });
            }
        }

        return {
            message: this.lang.ACTIONS.SUCCESS.UPDATE,
            error: false,
            body: response
        }
    }

    @Get(`finance/`)
    @UseGuards(AuthGuard)
    private async financePaginate(@Req() req: any, @Query() query: { skip?: string, take?: string, param?: string }) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];

        // const action = this.getPermit().list;

        // validación de permisos
        // const valid = permit.includes(action);
        // if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT }

        // validación de datos
        const skip = query.skip ? Number(query.skip) : 0;
        const take = query.take ? Number(query.take) : 10;
        const customFilter: Prisma.PaymentFinanceWhereInput[] = [];

        // lógica
        // if (query.param) customFilter.push({  });

        if(user.rolReference.name === this.permit.USER_NUTRICIONISTA) customFilter.push({ userId:user.id });

        // validar eliminación
        // if (true) customFilter.push({ isDelete: false });
        const filter: Prisma.PaymentFinanceWhereInput = { AND: customFilter };

        const responsePromise = this.service.paginateFinance({ skip, take, filter });

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

    @Get(`wallet/`)
    @UseGuards(AuthGuard)
    private async findWallet(@Req() req: any, @Query() query: { skip?: string, take?: string, param?: string }) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];

        // const action = this.getPermit().list;

        // validación de permisos
        // const valid = permit.includes(action);
        // if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT }

        // filters
        // const customFilter: Prisma.WhereInput[] = [];

        // lógica
        // if (query.param) customFilter.push({  });

        // validar eliminación
        // if (true) customFilter.push({ isDelete: false });
        // const filter: Prisma.WhereInput = { AND: customFilter };

        const responsePromise = this.wallet.findUser({ id:user.id });

        const response = await responsePromise;

        return {
            message: this.lang.ACTIONS.SUCCESS.LIST,
            error: false,
            body: response
        };
    }

    @Post(`create/payment`)
    @UseGuards(AuthGuard)
    private async createPayment(@Req() req: any, @Body() body: any) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];
        const action = this.getPermit().udpate;

            // validación de permisos
        // const valid = permit.includes(action);
        // if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT }

        // validación de datos

        const data: Prisma.PaymetInUserCreateInput = {
            userReference: { connect: { id: user.id } },
            paymentReference: { connect:{ id:body.payment } },
            description: body.description
        }

        // validar subscripción
        // validar ciudad

        const responsePromise = this.service.createPaymentMethod({ data });

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
    }

    @Get(`payment/all`)
    @UseGuards(AuthGuard)
    private async paymentAll(@Req() req: any, @Query() query: { skip?: string, take?: string, param?: string }) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];

        // const action = this.getPermit().list;

        // validación de permisos
        // const valid = permit.includes(action);
        // if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT }

        // validación de datos
        const skip = query.skip ? Number(query.skip) : 0;
        const take = query.take ? Number(query.take) : 10;
        const customFilter: Prisma.PaymentMethodWhereInput[] = [];

        // lógica
        if (query.param) customFilter.push({ name: { contains: query.param } });

        // validar eliminación
        if (true) customFilter.push({ isDelete: false });
        const filter: Prisma.PaymentMethodWhereInput = { AND: customFilter };

        const responsePromise = this.paymentService.paginate({ skip, take, filter });

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

    @Get(`payment/my`)
    @UseGuards(AuthGuard)
    private async paymentMy(@Req() req: any, @Query() query: { skip?: string, take?: string, param?: string }) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];

        // const action = this.getPermit().list;

        // validación de permisos
        // const valid = permit.includes(action);
        // if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT }

        // validación de datos
        const skip = query.skip ? Number(query.skip) : 0;
        const take = query.take ? Number(query.take) : 10;
        const customFilter: Prisma.PaymetInUserWhereInput[] = [];
        customFilter.push({ userId:user.id });

        // lógica
        if (query.param) customFilter.push({ description: { contains: query.param } });
        if (query.param) customFilter.push({ paymentReference: {name:{ contains: query.param }} });

        // validar eliminación
        if (true) customFilter.push({ isDelete: false });
        const filter: Prisma.PaymetInUserWhereInput = { AND: customFilter };

        const responsePromise = this.service.paginatePayment({ skip, take, filter });

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
        const filter: Prisma.UserWhereInput = { id: param.id };

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
            body: response.body
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

        const findPermit = await this.permitModel.find({ filter: { id: body.rolId } });

        const data: Prisma.UserCreateInput = {
            username: body.username,
            email: body.email,
            password: body.password,
            parentReference: { connect: { id: user.id } },
            rolReference: { connect: { id: findPermit.id } }
        }

        if(findPermit.id === this.permit.USER_NUTRICIONISTA) {
            data.propietaryCode = await this.service.generateCode();
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
        const valid = permit.includes(action) || param.id === user.id;
        if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT }

        // validación de datos

        const data: Prisma.UserUpdateInput = {}

        if(body.name) data.name = body.name;
        if(body.lastname) data.lastname = body.lastname;
        if(body.username) data.username = body.username;
        if(body.email) data.email = body.email;
        if(body.genero) data.genero = body.genero;
        if(body.ci) data.ci = body.ci;
        if(body.age) data.age = Number(body.age);
        if(body.lastname2) data.lastname2 = body.lastname2;
        if(body.name2) data.name2 = body.name2;
        if(body.nacionality) data.nacionality = body.nacionality;

        if(body.email) data.email = body.email;
        if(body.phone) data.phone = body.phone;
        if(body.email2) data.email2 = body.email2;
        if(body.phone2) data.phone2 = body.phone2;


        if(body.city) data.cityReference = { connect:{ id:body.city } }

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
        const action = this.getPermit().delete;

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

}
