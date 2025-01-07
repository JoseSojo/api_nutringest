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
const AppActions_1 = require("../../../AppActions");
const AuthGuard_1 = require("../../../guards/AuthGuard");
let DashboardGuiController = class DashboardGuiController {
    constructor(permit) {
        this.permit = permit;
    }
    async sidebar(req) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const actions = [];
        const nutri = [];
        const master = [];
        const quote = [];
        const propietary = [];
        if (permit.includes(this.permit.APP_PERMIT_USER_LIST))
            actions.push({ ico: `users`, label: `Usuarios`, path: `/dashboard/user` });
        if (permit.includes(this.permit.APP_PERMIT_PERMIT_LIST))
            actions.push({ ico: `permit`, label: `Permisos`, path: `/dashboard/permit` });
        if (permit.includes(this.permit.APP_PERMIT_COIN_LIST))
            master.push({ ico: `money`, label: `Monedas`, path: `/dashboard/money` });
        if (permit.includes(this.permit.APP_PERMIT_COUNTRY_LIST))
            master.push({ ico: `country`, label: `Paises`, path: `/dashboard/country` });
        if (permit.includes(this.permit.APP_PERMIT_STATE_LIST))
            master.push({ ico: `state`, label: `Estados`, path: `/dashboard/state` });
        if (permit.includes(this.permit.APP_PERMIT_CITY_LIST))
            master.push({ ico: `city`, label: `Ciudades`, path: `/dashboard/city` });
        if (permit.includes(this.permit.APP_PERMIT_PAYMENT_METHOD_LIST))
            master.push({ ico: `payment`, label: `Métodos Pago`, path: `/dashboard/payment` });
        if (permit.includes(this.permit.APP_PERMIT_SUBSCRIPTION_LIST))
            master.push({ ico: `subscription`, label: `Subscripciones`, path: `/dashboard/subscription` });
        if (permit.includes(this.permit.APP_PERMIT_FOOD_LIST))
            nutri.push({ ico: `primitive`, label: `Alimentos`, path: `/dashboard/primitive` });
        if (permit.includes(this.permit.APP_PERMIT_PRESENTATION_LIST))
            nutri.push({ ico: `presentation`, label: `Presentaciones`, path: `/dashboard/presentation` });
        if (permit.includes(this.permit.APP_PERMIT_SUPPLEMENT_LIST))
            nutri.push({ ico: `supplement`, label: `Suplementos`, path: `/dashboard/supplement` });
        if (permit.includes(this.permit.APP_PERMIT_UNITY_MEASURE_LIST))
            nutri.push({ ico: `unity`, label: `Unidades de medida`, path: `/dashboard/unity` });
        if (permit.includes(this.permit.APP_PERMIT_EXCHANGE_LIST_LIST))
            quote.push({ ico: `exchange`, label: `Listas de intercambio`, path: `/dashboard/exchange` });
        if (permit.includes(this.permit.APP_PERMIT_FOOD_LIST))
            quote.push({ ico: `food`, label: `Alimentos`, path: `/dashboard/food` });
        if (permit.includes(this.permit.APP_PERMIT_MENU_LIST))
            quote.push({ ico: `menu`, label: `Menus`, path: `/dashboard/menu` });
        if (permit.includes(this.permit.APP_PERMIT_QUOTE_LIST))
            quote.push({ ico: `quote`, label: `Citas`, path: `/dashboard/quote` });
        if (permit.includes(this.permit.APP_PERMIT_PROPIETARY_EXCHANGE_LIST_LIST))
            propietary.push({ ico: `exchange`, label: `Mis listas de intercambio`, path: `/dashboard/exchange` });
        if (permit.includes(this.permit.APP_PERMIT_PROPIETARY_MENU_LIST))
            propietary.push({ ico: `menu`, label: `Mis menús`, path: `/dashboard/menu` });
        if (permit.includes(this.permit.APP_PERMIT_PROPIETARY_QUOTE))
            propietary.push({ ico: `quote`, label: `Mis citas`, path: `/dashboard/quote` });
        if (permit.includes(this.permit.APP_PERMIT_PROPIETARY_PATIENT))
            propietary.push({ ico: `users`, label: `Mis pacientes`, path: `/dashboard/patient` });
        if (permit.includes(this.permit.APP_PERMIT_PROPIETARY_NUTRICIONIST))
            propietary.push({ ico: `nutricionist`, label: `Mis nutricionistas`, path: `/dashboard/nutricionist` });
        if (permit.includes(this.permit.APP_PERMIT_FOOD_LIST) && propietary.length > 0)
            propietary.push({ ico: `primitive`, label: `Alimentos`, path: `/dashboard/primitive` });
        if (master.length > 0)
            actions.push({ ico: `master`, label: `Maestros`, path: null, chils: master });
        if (nutri.length > 0)
            actions.push({ ico: `nutri`, label: `Nutrición`, path: null, chils: nutri });
        if (quote.length > 0)
            actions.push({ ico: `quote`, label: `Citas`, path: null, chils: quote });
        if (propietary.length > 0)
            actions.push({ ico: `propietary`, label: `Citas`, path: null, chils: propietary });
        const customAction = propietary.length > 0 ? propietary : actions;
        customAction.unshift({ ico: `agend`, label: `Agenda`, path: `/calendar/` });
        customAction.unshift({ ico: `dashboard`, label: `Dashboard`, path: `/dashboard/` });
        customAction.unshift({ ico: `finanza`, label: `Finanzas`, path: `/finanzas/` });
        return {
            sidebar: customAction
        };
    }
};
__decorate([
    (0, common_1.Get)(`sidebar`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DashboardGuiController.prototype, "sidebar", null);
DashboardGuiController = __decorate([
    (0, common_1.Controller)(`gui/dashboard`),
    __metadata("design:paramtypes", [AppActions_1.default])
], DashboardGuiController);
exports.default = DashboardGuiController;
//# sourceMappingURL=dashboard.gui.controller.js.map