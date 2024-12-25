"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const AppActions_1 = require("../../AppActions");
const AuthGuard_1 = require("../../guards/AuthGuard");
const languaje_service_1 = require("../../languaje/languaje.service");
const permit_model_1 = require("../../model/permit.model");
const user_model_1 = require("../../model/user.model");
const payment_service_1 = require("../../service/master/payment.service");
const user_service_1 = require("../../service/user.service");
const wallet_service_1 = require("../../service/wallet.service");
let UserController = class UserController {
    constructor(service, model, paymentService, permit, permitModel, languaje, wallet) {
        this.service = service;
        this.model = model;
        this.paymentService = paymentService;
        this.permit = permit;
        this.permitModel = permitModel;
        this.languaje = languaje;
        this.wallet = wallet;
        this.lang = this.languaje.GetTranslate();
    }
    async paginate(req, query) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const action = this.getPermit().list;
        const valid = permit.includes(action);
        if (!valid)
            return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT };
        const skip = query.skip ? Number(query.skip) : 0;
        const take = query.take ? Number(query.take) : 10;
        const customFilter = [];
        if (query.param)
            customFilter.push({ OR: [{ name: { contains: query.param } }, { lastname: { contains: query.param } }, { username: { contains: query.param } }] });
        if (true)
            customFilter.push({ isDelete: false });
        const filter = { AND: customFilter };
        const responsePromise = this.service.paginate({ skip, take, filter });
        const response = await responsePromise;
        if (response.error) {
            return {
                message: response.message,
                error: response.error
            };
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
    async createFinance(req, body) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const action = this.getPermit().udpate;
        const responsePromise = this.service.Finance({ date: body.date, mount: Number(body.mount), payment: body.payment, userId: user.id });
        const response = await responsePromise;
        return {
            message: this.lang.ACTIONS.SUCCESS.CREATE,
            error: false,
            body: response
        };
    }
    async udpateStatusFinance(req, body, param, query) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const action = this.getPermit().udpate;
        const responsePromise = this.service.FinanceUpdate({ id: param.id, status: query.status });
        const response = await responsePromise;
        if (query.status === `APROVADO`) {
            const findWallet = await this.wallet.findUser({ id: response.userId });
            if (findWallet) {
                await this.wallet.increment({ id: findWallet.id, mount: response.mount });
            }
            else {
                await this.wallet.create({ userId: response.userId, mount: response.mount });
            }
        }
        return {
            message: this.lang.ACTIONS.SUCCESS.UPDATE,
            error: false,
            body: response
        };
    }
    async financePaginate(req, query) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const skip = query.skip ? Number(query.skip) : 0;
        const take = query.take ? Number(query.take) : 10;
        const customFilter = [];
        if (user.rolReference.name === this.permit.USER_NUTRICIONISTA)
            customFilter.push({ userId: user.id });
        const filter = { AND: customFilter };
        const responsePromise = this.service.paginateFinance({ skip, take, filter });
        const response = await responsePromise;
        if (response.error) {
            return {
                message: response.message,
                error: response.error
            };
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
    async findWallet(req, query) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const responsePromise = this.wallet.findUser({ id: user.id });
        const response = await responsePromise;
        return {
            message: this.lang.ACTIONS.SUCCESS.LIST,
            error: false,
            body: response
        };
    }
    async createPayment(req, body) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const action = this.getPermit().udpate;
        const data = {
            userReference: { connect: { id: user.id } },
            paymentReference: { connect: { id: body.payment } },
            description: body.description
        };
        const responsePromise = this.service.createPaymentMethod({ data });
        const response = await responsePromise;
        if (response.error) {
            return {
                message: response.message,
                error: response.error
            };
        }
        return {
            message: response.message,
            error: response.error,
            body: response.body
        };
    }
    async paymentAll(req, query) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const skip = query.skip ? Number(query.skip) : 0;
        const take = query.take ? Number(query.take) : 10;
        const customFilter = [];
        if (query.param)
            customFilter.push({ name: { contains: query.param } });
        if (true)
            customFilter.push({ isDelete: false });
        const filter = { AND: customFilter };
        const responsePromise = this.paymentService.paginate({ skip, take, filter });
        const response = await responsePromise;
        if (response.error) {
            return {
                message: response.message,
                error: response.error
            };
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
    async paymentMy(req, query) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const skip = query.skip ? Number(query.skip) : 0;
        const take = query.take ? Number(query.take) : 10;
        const customFilter = [];
        customFilter.push({ userId: user.id });
        if (query.param)
            customFilter.push({ description: { contains: query.param } });
        if (query.param)
            customFilter.push({ paymentReference: { name: { contains: query.param } } });
        if (true)
            customFilter.push({ isDelete: false });
        const filter = { AND: customFilter };
        const responsePromise = this.service.paginatePayment({ skip, take, filter });
        const response = await responsePromise;
        if (response.error) {
            return {
                message: response.message,
                error: response.error
            };
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
    async unique(req, param) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const action = this.getPermit().list;
        const valid = permit.includes(action) ? true : user.id === param.id ? true : false;
        if (!valid)
            return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT };
        const filter = { id: param.id };
        const responsePromise = this.service.find({ filter });
        const response = await responsePromise;
        if (response.error) {
            return {
                message: response.message,
                error: response.error
            };
        }
        return {
            message: response.message,
            error: response.error,
            body: response.body
        };
    }
    async create(req, body) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const action = this.getPermit().udpate;
        const valid = permit.includes(action);
        if (!valid)
            return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT };
        const findPermit = await this.permitModel.find({ filter: { id: body.rolId } });
        const data = {
            username: body.username,
            email: body.email,
            password: body.password,
            parentReference: { connect: { id: user.id } },
            rolReference: { connect: { id: findPermit.id } }
        };
        if (findPermit.id === this.permit.USER_NUTRICIONISTA) {
            data.propietaryCode = await this.service.generateCode();
        }
        const responsePromise = this.service.create({ data });
        const response = await responsePromise;
        if (response.error) {
            return {
                message: response.message,
                error: response.error
            };
        }
        return {
            message: response.message,
            error: response.error,
            body: response
        };
    }
    async update(req, body, param) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const action = this.getPermit().udpate;
        const valid = permit.includes(action) || param.id === user.id;
        if (!valid)
            return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT };
        const data = {};
        if (body.name)
            data.name = body.name;
        if (body.lastname)
            data.lastname = body.lastname;
        if (body.username)
            data.username = body.username;
        if (body.email)
            data.email = body.email;
        if (body.genero)
            data.genero = body.genero;
        if (body.ci)
            data.ci = body.ci;
        if (body.age)
            data.age = Number(body.age);
        if (body.lastname2)
            data.lastname2 = body.lastname2;
        if (body.name2)
            data.name2 = body.name2;
        if (body.nacionality)
            data.nacionality = body.nacionality;
        if (body.email)
            data.email = body.email;
        if (body.phone)
            data.phone = body.phone;
        if (body.email2)
            data.email2 = body.email2;
        if (body.phone2)
            data.phone2 = body.phone2;
        if (body.city)
            data.cityReference = { connect: { id: body.city } };
        const responsePromise = this.service.udpate({ data, id: param.id });
        const response = await responsePromise;
        if (response.error) {
            return {
                message: response.message,
                error: response.error
            };
        }
        return {
            message: response.message,
            error: response.error,
            body: response
        };
    }
    async delete(req, body, param) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const action = this.getPermit().delete;
        const valid = permit.includes(action);
        if (!valid)
            return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT };
        const responsePromise = this.service.delete({ id: param.id });
        const response = await responsePromise;
        if (response.error) {
            return {
                message: response.message,
                error: response.error
            };
        }
        return {
            message: response.message,
            error: response.error,
            body: response
        };
    }
    getActionsList(permit) {
        const response = this.service.getActionsList(permit);
        return response;
    }
    getActionsUnique(permit) {
        const response = this.service.getActionsList(permit);
        return response;
    }
    getPermit() {
        const response = this.service.getPermits();
        return response;
    }
};
__decorate([
    (0, common_1.Get)(``),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "paginate", null);
__decorate([
    (0, common_1.Post)(`create/finance`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createFinance", null);
__decorate([
    (0, common_1.Put)(`update/:id/finance`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)()),
    __param(3, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "udpateStatusFinance", null);
__decorate([
    (0, common_1.Get)(`finance/`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "financePaginate", null);
__decorate([
    (0, common_1.Get)(`wallet/`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findWallet", null);
__decorate([
    (0, common_1.Post)(`create/payment`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createPayment", null);
__decorate([
    (0, common_1.Get)(`payment/all`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "paymentAll", null);
__decorate([
    (0, common_1.Get)(`payment/my`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "paymentMy", null);
__decorate([
    (0, common_1.Get)(`:id/unique`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "unique", null);
__decorate([
    (0, common_1.Post)(`create`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(`:id/update`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(`:id/delete`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
UserController = __decorate([
    (0, common_1.Controller)(`user`),
    __metadata("design:paramtypes", [user_service_1.default,
        user_model_1.default,
        payment_service_1.default,
        AppActions_1.default,
        permit_model_1.default,
        languaje_service_1.LanguajeService,
        wallet_service_1.default])
], UserController);
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map