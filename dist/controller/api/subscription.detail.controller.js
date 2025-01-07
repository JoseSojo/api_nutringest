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
const history_service_1 = require("../../service/history.service");
const subsccription_detail_service_1 = require("../../service/master/subsccription.detail.service");
let ConfigSubscriptionDetailController = class ConfigSubscriptionDetailController {
    constructor(service, appEvents, history, permit, languaje) {
        this.service = service;
        this.appEvents = appEvents;
        this.history = history;
        this.permit = permit;
        this.languaje = languaje;
        this.lang = this.languaje.GetTranslate();
    }
    async singChangeSubscription(req, body, param) {
        const user = req.user;
        const permit = user.rolReference.roles;
        await this.service.ChangeSubscription({ subscription: param.id, userId: user.id });
        return {
            message: `Cambio realizado.`
        };
    }
    async assingUser(req, body, param) {
        const user = req.user;
        const permit = user.rolReference.roles;
    }
    async FindMySub(req) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const responseService = this.service.FindMySub({ user: user.id });
        return {
            body: await responseService
        };
    }
    async FindAllSub(req) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const responseService = this.service.FindMySub({ user: user.id });
        return {
            body: await responseService
        };
    }
};
__decorate([
    (0, common_1.Post)(`change/:id`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ConfigSubscriptionDetailController.prototype, "singChangeSubscription", null);
__decorate([
    (0, common_1.Post)(`/assing/:id`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ConfigSubscriptionDetailController.prototype, "assingUser", null);
__decorate([
    (0, common_1.Get)(`/my/`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ConfigSubscriptionDetailController.prototype, "FindMySub", null);
__decorate([
    (0, common_1.Get)(`/my/`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ConfigSubscriptionDetailController.prototype, "FindAllSub", null);
ConfigSubscriptionDetailController = __decorate([
    (0, common_1.Controller)(`/subscription/detail`),
    __metadata("design:paramtypes", [subsccription_detail_service_1.default,
        AppEvent_1.default,
        history_service_1.default,
        AppActions_1.default,
        languaje_service_1.LanguajeService])
], ConfigSubscriptionDetailController);
exports.default = ConfigSubscriptionDetailController;
//# sourceMappingURL=subscription.detail.controller.js.map