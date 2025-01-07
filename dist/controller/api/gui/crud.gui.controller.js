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
const auth_service_1 = require("../../../auth/auth.service");
const AuthGuard_1 = require("../../../guards/AuthGuard");
const languaje_service_1 = require("../../../languaje/languaje.service");
const calendar_service_1 = require("../../../service/calendar.service");
const city_service_1 = require("../../../service/master/city.service");
const country_service_1 = require("../../../service/master/country.service");
const money_service_1 = require("../../../service/master/money.service");
const payment_service_1 = require("../../../service/master/payment.service");
const state_service_1 = require("../../../service/master/state.service");
const subsccription_service_1 = require("../../../service/master/subsccription.service");
const food_service_1 = require("../../../service/nutri/food.service");
const presentation_service_1 = require("../../../service/nutri/presentation.service");
const supplement_service_1 = require("../../../service/nutri/supplement.service");
const unity_service_1 = require("../../../service/nutri/unity.service");
const permit_service_1 = require("../../../service/permit.service");
const exchange_service_1 = require("../../../service/quote/exchange.service");
const food_service_2 = require("../../../service/quote/food.service");
const menu_service_1 = require("../../../service/quote/menu.service");
const quote_service_1 = require("../../../service/quote/quote.service");
const user_service_1 = require("../../../service/user.service");
let CrudGuiController = class CrudGuiController {
    constructor(authService, appActions, userService, permitService, countryService, stateService, cityService, moneyService, paymentMethodService, subscriptionService, primitiveFoodService, presentationService, supplementService, unityService, exchangeListService, menuService, foodAllService, quoteService, calendarService, languaje) {
        this.authService = authService;
        this.appActions = appActions;
        this.userService = userService;
        this.permitService = permitService;
        this.countryService = countryService;
        this.stateService = stateService;
        this.cityService = cityService;
        this.moneyService = moneyService;
        this.paymentMethodService = paymentMethodService;
        this.subscriptionService = subscriptionService;
        this.primitiveFoodService = primitiveFoodService;
        this.presentationService = presentationService;
        this.supplementService = supplementService;
        this.unityService = unityService;
        this.exchangeListService = exchangeListService;
        this.menuService = menuService;
        this.foodAllService = foodAllService;
        this.quoteService = quoteService;
        this.calendarService = calendarService;
        this.languaje = languaje;
        this.lang = this.languaje.GetTranslate();
    }
    async formGuiFinance(req) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const actionsList = this.paymentMethodService.getActionsList(permit);
        const actionsUnique = [
            {
                ico: `unique`,
                label: `Ver`,
                path: ``,
                use: `modal`
            }
        ];
        if (user.rolReference.name === this.appActions.USER_SUPER_ADMIN || user.rolReference.name === this.appActions.USER_FINANCE) {
            actionsUnique.push({
                ico: `success`,
                label: `Aprobar`,
                path: ``,
                use: `modal`
            });
            actionsUnique.push({
                ico: `cancel`,
                label: `Cancelar`,
                path: ``,
                use: `modal`
            });
        }
        const title = `Finanzas`;
        return { actionsList, actionsUnique, title };
    }
    async formGuiUser(req) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const actionsList = this.userService.getActionsList(permit);
        const actionsUnique = this.userService.getActionsUnique(permit);
        const title = `Usuarios`;
        return { actionsList, actionsUnique, title };
    }
    async formGuiPermit(req) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const actionsList = this.permitService.getActionsList(permit);
        const actionsUnique = this.permitService.getActionsUnique(permit);
        const title = `Permisos`;
        return { actionsList, actionsUnique, title };
    }
    async formGuiCountry(req) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const actionsList = this.countryService.getActionsList(permit);
        const actionsUnique = this.countryService.getActionsUnique(permit);
        const title = `Paises`;
        return { actionsList, actionsUnique, title };
    }
    async formGuiState(req) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const actionsList = this.stateService.getActionsList(permit);
        const actionsUnique = this.stateService.getActionsUnique(permit);
        const title = `Estados`;
        return { actionsList, actionsUnique, title };
    }
    async formGuiCity(req) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const actionsList = this.cityService.getActionsList(permit);
        const actionsUnique = this.cityService.getActionsUnique(permit);
        const title = `Ciudades`;
        return { actionsList, actionsUnique, title };
    }
    async formGuiMoney(req) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const actionsList = this.moneyService.getActionsList(permit);
        const actionsUnique = this.moneyService.getActionsUnique(permit);
        const title = `Monedas`;
        return { actionsList, actionsUnique, title };
    }
    async formGuiPaymentMethod(req) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const actionsList = this.paymentMethodService.getActionsList(permit);
        const actionsUnique = this.paymentMethodService.getActionsUnique(permit);
        const title = `Métodos de pago`;
        return { actionsList, actionsUnique, title };
    }
    async formGuiSubscription(req) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const actionsList = this.subscriptionService.getActionsList(permit);
        const actionsUnique = this.subscriptionService.getActionsUnique(permit);
        const title = `Subscripciones`;
        return { actionsList, actionsUnique, title };
    }
    async formGuiPrimitiveFood(req) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const actionsList = this.primitiveFoodService.getActionsList(permit);
        const actionsUnique = this.primitiveFoodService.getActionsUnique(permit);
        const title = `Alimentos`;
        return { actionsList, actionsUnique, title };
    }
    async formGuiPresentation(req) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const actionsList = this.presentationService.getActionsList(permit);
        const actionsUnique = this.presentationService.getActionsUnique(permit);
        const title = `Presentaciones`;
        return { actionsList, actionsUnique, title };
    }
    async formGuiSupplement(req) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const actionsList = this.supplementService.getActionsList(permit);
        const actionsUnique = this.supplementService.getActionsUnique(permit);
        const title = `Suplementos`;
        return { actionsList, actionsUnique, title };
    }
    async formGuiUnityMeasure(req) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const actionsList = this.unityService.getActionsList(permit);
        const actionsUnique = this.unityService.getActionsUnique(permit);
        const title = `Unidades de medida`;
        return { actionsList, actionsUnique, title };
    }
    async formGuiExchageList(req) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const actionsList = this.exchangeListService.getActionsList(permit);
        const p = user.rolReference.name === this.appActions.USER_PACIENTE || user.rolReference.name === this.appActions.USER_NUTRICIONISTA
            ? true
            : false;
        const actionsUnique = this.exchangeListService.getActionsUnique(permit, p);
        const title = `Lista de intercambio`;
        return { actionsList, actionsUnique, title };
    }
    async formGuiMenu(req) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const actionsList = this.menuService.getActionsList(permit);
        const p = user.rolReference.name === this.appActions.USER_PACIENTE || user.rolReference.name === this.appActions.USER_NUTRICIONISTA
            ? true
            : false;
        const actionsUnique = this.menuService.getActionsUnique(permit, p);
        const title = `Menús`;
        return { actionsList, actionsUnique, title };
    }
    async formGuiFoodAll(req) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const actionsList = this.foodAllService.getActionsList(permit);
        const actionsUnique = this.foodAllService.getActionsUnique(permit);
        const title = `Alimentos`;
        return { actionsList, actionsUnique, title };
    }
    async formGuiQuote(req) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const actionsList = this.quoteService.getActionsList(permit);
        const actionsUnique = this.quoteService.getActionsUnique(permit);
        const title = `Citas`;
        return { actionsList, actionsUnique, title };
    }
    async formGuiPatient(req) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const actionsList = this.userService.getActionsList(permit);
        const actionsUnique = this.userService.getActionsUniqueNutri(permit);
        const title = `Pacientes`;
        return { actionsList, actionsUnique, title };
    }
    async formGuiNutricionist(req) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const actionsList = this.userService.getActionsList(permit);
        const actionsUnique = this.userService.getActionsUnique(permit);
        const title = `Nutricionista`;
        return { actionsList, actionsUnique, title };
    }
    async formGuiFoodAllQuote(req) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const actionsList = this.foodAllService.getActionsList(permit);
        const actionsUnique = this.foodAllService.getActionsUniqueInQuote(permit, true);
        const header = this.foodAllService.HeaderMinList();
        const extract = this.foodAllService.HeaderMinListExtract();
        const title = `Alimentos`;
        return { actionsList, actionsUnique, title, header, extract };
    }
    async formGuiExchangeAllQuote(req) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const actionsList = this.exchangeListService.getActionsList(permit);
        const actionsUnique = this.exchangeListService.getActionsUniqueInQuote(permit, true);
        const header = this.exchangeListService.HeaderMinList();
        const extract = this.exchangeListService.HeaderMinListExtract();
        const title = `Listas`;
        return { actionsList, actionsUnique, title, header, extract };
    }
    async formGuiMenuAllQuote(req) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const actionsList = this.menuService.getActionsList(permit);
        const actionsUnique = this.menuService.getActionsUniqueInQuote(permit, true);
        const header = this.menuService.HeaderMinList();
        const extract = this.menuService.HeaderMinListExtract();
        const title = `Menus`;
        return { actionsList, actionsUnique, title, header, extract };
    }
    async calendar(req) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const actionsList = this.calendarService.getActionsList(permit);
        const actionsUnique = this.calendarService.getActionsUniquePropietary(permit);
        const title = `Agenda`;
        return { actionsList, actionsUnique, title };
    }
};
__decorate([
    (0, common_1.Get)(`finance`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CrudGuiController.prototype, "formGuiFinance", null);
__decorate([
    (0, common_1.Get)(`user`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CrudGuiController.prototype, "formGuiUser", null);
__decorate([
    (0, common_1.Get)(`permit`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CrudGuiController.prototype, "formGuiPermit", null);
__decorate([
    (0, common_1.Get)(`country`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CrudGuiController.prototype, "formGuiCountry", null);
__decorate([
    (0, common_1.Get)(`state`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CrudGuiController.prototype, "formGuiState", null);
__decorate([
    (0, common_1.Get)(`city`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CrudGuiController.prototype, "formGuiCity", null);
__decorate([
    (0, common_1.Get)(`money`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CrudGuiController.prototype, "formGuiMoney", null);
__decorate([
    (0, common_1.Get)(`payment`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CrudGuiController.prototype, "formGuiPaymentMethod", null);
__decorate([
    (0, common_1.Get)(`subscription`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CrudGuiController.prototype, "formGuiSubscription", null);
__decorate([
    (0, common_1.Get)(`primitive`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CrudGuiController.prototype, "formGuiPrimitiveFood", null);
__decorate([
    (0, common_1.Get)(`presentation`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CrudGuiController.prototype, "formGuiPresentation", null);
__decorate([
    (0, common_1.Get)(`supplement`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CrudGuiController.prototype, "formGuiSupplement", null);
__decorate([
    (0, common_1.Get)(`unity`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CrudGuiController.prototype, "formGuiUnityMeasure", null);
__decorate([
    (0, common_1.Get)(`exchange`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CrudGuiController.prototype, "formGuiExchageList", null);
__decorate([
    (0, common_1.Get)(`menu`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CrudGuiController.prototype, "formGuiMenu", null);
__decorate([
    (0, common_1.Get)(`food`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CrudGuiController.prototype, "formGuiFoodAll", null);
__decorate([
    (0, common_1.Get)(`quote`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CrudGuiController.prototype, "formGuiQuote", null);
__decorate([
    (0, common_1.Get)(`patient`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CrudGuiController.prototype, "formGuiPatient", null);
__decorate([
    (0, common_1.Get)(`nutricionist`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CrudGuiController.prototype, "formGuiNutricionist", null);
__decorate([
    (0, common_1.Get)(`quote/food`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CrudGuiController.prototype, "formGuiFoodAllQuote", null);
__decorate([
    (0, common_1.Get)(`quote/exchange`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CrudGuiController.prototype, "formGuiExchangeAllQuote", null);
__decorate([
    (0, common_1.Get)(`quote/menu`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CrudGuiController.prototype, "formGuiMenuAllQuote", null);
__decorate([
    (0, common_1.Get)(`calendar`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CrudGuiController.prototype, "calendar", null);
CrudGuiController = __decorate([
    (0, common_1.Controller)(`gui/crud`),
    __metadata("design:paramtypes", [auth_service_1.default,
        AppActions_1.default,
        user_service_1.default,
        permit_service_1.default,
        country_service_1.default,
        state_service_1.default,
        city_service_1.default,
        money_service_1.default,
        payment_service_1.default,
        subsccription_service_1.default,
        food_service_1.default,
        presentation_service_1.default,
        supplement_service_1.default,
        unity_service_1.default,
        exchange_service_1.default,
        menu_service_1.default,
        food_service_2.default,
        quote_service_1.default,
        calendar_service_1.default,
        languaje_service_1.LanguajeService])
], CrudGuiController);
exports.default = CrudGuiController;
//# sourceMappingURL=crud.gui.controller.js.map