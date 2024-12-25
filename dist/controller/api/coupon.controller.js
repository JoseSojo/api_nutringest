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
const AppEvent_1 = require("../../AppEvent");
const AuthGuard_1 = require("../../guards/AuthGuard");
const languaje_service_1 = require("../../languaje/languaje.service");
const exchange_food_model_1 = require("../../model/quote/exchange.food.model");
const coupon_service_1 = require("../../service/coupon.service");
const history_service_1 = require("../../service/history.service");
let CouponController = class CouponController {
    constructor(service, permit, languaje, exchangeListFoodModel, appEvents, history) {
        this.service = service;
        this.permit = permit;
        this.languaje = languaje;
        this.exchangeListFoodModel = exchangeListFoodModel;
        this.appEvents = appEvents;
        this.history = history;
        this.lang = this.languaje.GetTranslate();
    }
    async paginate(req, query) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const action = this.getPermit(user.rolReference.name).list;
        const valid = permit.includes(action);
        if (!valid)
            return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT };
        const skip = query.skip ? Number(query.skip) : 0;
        const take = query.take ? Number(query.take) : 10;
        const customFilter = [];
        if (user.rolReference.name === this.permit.USER_NUTRICIONISTA)
            customFilter.push({ propietaryId: user.id });
        if (query.param)
            customFilter.push({ OR: [{ description: { contains: query.param } }] });
        if (query.ignore) {
            if (typeof query.ignore === `string`) {
                customFilter.push({ id: { not: query.ignore } });
            }
            else {
                const custonsId = [];
                query.ignore.forEach((id) => {
                    custonsId.push({ id: { not: id } });
                });
                custonsId.forEach(item => {
                    customFilter.push(item);
                });
            }
        }
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
    async code(req, param) {
        const user = req.user;
        const permit = user.rolReference.roles;
        return {
            code: user.propietaryCode
        };
    }
    async unique(req, param) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const action = this.getPermit(user.rolReference.name).list;
        const valid = permit.includes(action);
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
        return response;
    }
    getActionsList(permit) {
        const response = this.service.getActionsList(permit);
        return response;
    }
    getActionsUnique(permit) {
        const response = this.service.getActionsUnique(permit);
        return response;
    }
    getPermit(rol) {
        let response;
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
};
__decorate([
    (0, common_1.Get)(``),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "paginate", null);
__decorate([
    (0, common_1.Get)(`code`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "code", null);
__decorate([
    (0, common_1.Get)(`:id/unique`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "unique", null);
CouponController = __decorate([
    (0, common_1.Controller)(`coupon`),
    __metadata("design:paramtypes", [coupon_service_1.default,
        AppActions_1.default,
        languaje_service_1.LanguajeService,
        exchange_food_model_1.default,
        AppEvent_1.default,
        history_service_1.default])
], CouponController);
exports.default = CouponController;
//# sourceMappingURL=coupon.controller.js.map