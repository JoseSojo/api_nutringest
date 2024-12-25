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
const auth_service_1 = require("../../../auth/auth.service");
const AuthGuard_1 = require("../../../guards/AuthGuard");
const languaje_service_1 = require("../../../languaje/languaje.service");
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
const exchange_service_1 = require("../../../service/quote/exchange.service");
const food_service_2 = require("../../../service/quote/food.service");
const menu_service_1 = require("../../../service/quote/menu.service");
const quote_service_1 = require("../../../service/quote/quote.service");
const user_service_1 = require("../../../service/user.service");
let FromGuiController = class FromGuiController {
    constructor(authService, userService, countryService, stateService, cityService, moneyService, paymentMethodService, subscriptionService, primitiveFoodService, presentationService, supplementService, unityService, exchangeListService, menuService, foodAllService, quoteService, languaje) {
        this.authService = authService;
        this.userService = userService;
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
        this.languaje = languaje;
        this.lang = this.languaje.GetTranslate();
    }
    async formGuiLogin(req) {
        const form = this.authService.formLogin();
        return form;
    }
    async formGuiRegister(req) {
        const form = this.authService.formRegister();
        return form;
    }
    async formGuiUserCreate(req) {
        const form = this.userService.formCreate();
        return form;
    }
    async formGuiUserUpdate(req, param) {
        const userFound = await this.userService.find({ filter: { id: param.id } });
        const form = this.userService.formUpdate(userFound.body.data);
        return form;
    }
    async formGuiUserDelete(req, param) {
        const form = this.userService.formDelete();
        return form;
    }
    async formGuiCountryCreate(req) {
        const form = this.countryService.formCreate();
        return form;
    }
    async formGuiCountryUpdate(req, param) {
        const countryFound = await this.countryService.find({ filter: { id: param.id } });
        const form = this.countryService.formUpdate(countryFound.body);
        return form;
    }
    async formGuiCountryDelete(req, param) {
        const form = this.countryService.formDelete();
        return form;
    }
    async formGuiStateCreate(req) {
        const form = this.stateService.formCreate();
        return form;
    }
    async formGuiStateUpdate(req, param) {
        const entity = await this.stateService.find({ filter: { id: param.id } });
        const form = this.stateService.formUpdate(entity.body);
        return form;
    }
    async formGuiStateDelete(req, param) {
        const form = this.countryService.formDelete();
        return form;
    }
    async formGuiCityCreate(req) {
        const form = this.cityService.formCreate();
        return form;
    }
    async formGuiCityUpdate(req, param) {
        const entity = await this.cityService.find({ filter: { id: param.id } });
        const form = this.cityService.formUpdate(entity.body);
        return form;
    }
    async formGuiCityDelete(req, param) {
        const form = this.cityService.formDelete();
        return form;
    }
    async formGuiMoneyCreate(req) {
        const form = this.moneyService.formCreate();
        return form;
    }
    async formGuiMoneyUpdate(req, param) {
        const entity = await this.moneyService.find({ filter: { id: param.id } });
        const form = this.moneyService.formUpdate(entity.body);
        return form;
    }
    async formGuiMoneyDelete(req, param) {
        const form = this.moneyService.formDelete();
        return form;
    }
    async formGuiPaymentMethodCreate(req) {
        const form = this.paymentMethodService.formCreate();
        return form;
    }
    async formGuiPaymentMethodUpdate(req, param) {
        const entity = await this.paymentMethodService.find({ filter: { id: param.id } });
        const form = this.paymentMethodService.formUpdate(entity.body);
        return form;
    }
    async formGuiPaymentMethodDelete(req, param) {
        const form = this.paymentMethodService.formDelete();
        return form;
    }
    async formGuisubscriptionCreate(req) {
        const form = this.subscriptionService.formCreate();
        return form;
    }
    async formGuisubscriptionUpdate(req, param) {
        const entity = await this.subscriptionService.find({ filter: { id: param.id } });
        const form = this.subscriptionService.formUpdate(entity.body);
        return form;
    }
    async formGuisubscriptionDelete(req, param) {
        const form = this.subscriptionService.formDelete();
        return form;
    }
    async formGuiPrimitiveFoodCreate(req) {
        const form = this.primitiveFoodService.formCreate();
        return form;
    }
    async formGuiPrimitiveFoodUpdate(req, param) {
        const entity = await this.primitiveFoodService.find({ filter: { id: param.id } });
        const form = this.primitiveFoodService.formUpdate(entity.body);
        return form;
    }
    async formGuiPrimitiveFoodDelete(req, param) {
        const form = this.primitiveFoodService.formDelete();
        return form;
    }
    async formGuiPresentationCreate(req) {
        const form = this.presentationService.formCreate();
        return form;
    }
    async formGuiPresentationUpdate(req, param) {
        const entity = await this.presentationService.find({ filter: { id: param.id } });
        const form = this.presentationService.formUpdate(entity.body);
        return form;
    }
    async formGuiPresentationDelete(req, param) {
        const form = this.presentationService.formDelete();
        return form;
    }
    async formGuiSupplementCreate(req) {
        const form = this.supplementService.formCreate();
        return form;
    }
    async formGuiSupplementUpdate(req, param) {
        const entity = await this.supplementService.find({ filter: { id: param.id } });
        const form = this.supplementService.formUpdate(entity.body);
        return form;
    }
    async formGuiSupplementDelete(req, param) {
        const form = this.supplementService.formDelete();
        return form;
    }
    async formGuiUnityMeasureCreate(req) {
        const form = this.unityService.formCreate();
        return form;
    }
    async formGuiUnityMeasureUpdate(req, param) {
        const entity = await this.unityService.find({ filter: { id: param.id } });
        const form = this.unityService.formUpdate(entity.body);
        return form;
    }
    async formGuiUnityMeasureDelete(req, param) {
        const form = this.unityService.formDelete();
        return form;
    }
    async formGuiExchageListCreate(req) {
        const form = this.exchangeListService.formCreate();
        return form;
    }
    async formGuiExchageListUpdate(req, param) {
        const form = this.exchangeListService.formUpdate();
        return form;
    }
    async formGuiExchageListDelete(req, param) {
        const form = this.exchangeListService.formDelete();
        return form;
    }
    async formGuiMenuCreate(req) {
        const form = this.menuService.formCreate();
        return form;
    }
    async formGuiMenuUpdate(req, param) {
        const form = this.menuService.formUpdate();
        return form;
    }
    async formGuiMenuDelete(req, param) {
        const form = this.menuService.formDelete();
        return form;
    }
    async formGuiFoodAllCreate(req) {
        const form = this.foodAllService.formCreate();
        return form;
    }
    async formGuiFoodAllUpdate(req, param) {
        const form = this.foodAllService.formUpdate();
        return form;
    }
    async formGuiFoodAllDelete(req, param) {
        const form = this.primitiveFoodService.formDelete();
        return form;
    }
    async formGuiQuoteCreate(req) {
        const form = this.quoteService.formCreate();
        return form;
    }
    async formGuiQuoteUpdate(req, param) {
        const form = this.quoteService.formUpdate();
        return form;
    }
    async formGuiQuoteDelete(req, param) {
        const form = this.quoteService.formDelete();
        return form;
    }
};
__decorate([
    (0, common_1.Get)(`login`),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FromGuiController.prototype, "formGuiLogin", null);
__decorate([
    (0, common_1.Get)(`register`),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FromGuiController.prototype, "formGuiRegister", null);
__decorate([
    (0, common_1.Get)(`user/create`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FromGuiController.prototype, "formGuiUserCreate", null);
__decorate([
    (0, common_1.Get)(`user/update/:id`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FromGuiController.prototype, "formGuiUserUpdate", null);
__decorate([
    (0, common_1.Get)(`user/delete/:id`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FromGuiController.prototype, "formGuiUserDelete", null);
__decorate([
    (0, common_1.Get)(`country/create`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FromGuiController.prototype, "formGuiCountryCreate", null);
__decorate([
    (0, common_1.Get)(`country/update/:id`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FromGuiController.prototype, "formGuiCountryUpdate", null);
__decorate([
    (0, common_1.Get)(`country/delete/:id`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FromGuiController.prototype, "formGuiCountryDelete", null);
__decorate([
    (0, common_1.Get)(`state/create`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FromGuiController.prototype, "formGuiStateCreate", null);
__decorate([
    (0, common_1.Get)(`state/update/:id`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FromGuiController.prototype, "formGuiStateUpdate", null);
__decorate([
    (0, common_1.Get)(`state/delete/:id`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FromGuiController.prototype, "formGuiStateDelete", null);
__decorate([
    (0, common_1.Get)(`city/create`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FromGuiController.prototype, "formGuiCityCreate", null);
__decorate([
    (0, common_1.Get)(`city/update/:id`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FromGuiController.prototype, "formGuiCityUpdate", null);
__decorate([
    (0, common_1.Get)(`city/delete/:id`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FromGuiController.prototype, "formGuiCityDelete", null);
__decorate([
    (0, common_1.Get)(`money/create`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FromGuiController.prototype, "formGuiMoneyCreate", null);
__decorate([
    (0, common_1.Get)(`money/update/:id`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FromGuiController.prototype, "formGuiMoneyUpdate", null);
__decorate([
    (0, common_1.Get)(`money/delete/:id`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FromGuiController.prototype, "formGuiMoneyDelete", null);
__decorate([
    (0, common_1.Get)(`payment/create`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FromGuiController.prototype, "formGuiPaymentMethodCreate", null);
__decorate([
    (0, common_1.Get)(`payment/update/:id`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FromGuiController.prototype, "formGuiPaymentMethodUpdate", null);
__decorate([
    (0, common_1.Get)(`payment/delete/:id`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FromGuiController.prototype, "formGuiPaymentMethodDelete", null);
__decorate([
    (0, common_1.Get)(`subscription/create`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FromGuiController.prototype, "formGuisubscriptionCreate", null);
__decorate([
    (0, common_1.Get)(`subscription/update/:id`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FromGuiController.prototype, "formGuisubscriptionUpdate", null);
__decorate([
    (0, common_1.Get)(`subscription/delete/:id`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FromGuiController.prototype, "formGuisubscriptionDelete", null);
__decorate([
    (0, common_1.Get)(`primitive/create`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FromGuiController.prototype, "formGuiPrimitiveFoodCreate", null);
__decorate([
    (0, common_1.Get)(`primitive/update/:id`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FromGuiController.prototype, "formGuiPrimitiveFoodUpdate", null);
__decorate([
    (0, common_1.Get)(`primitive/delete/:id`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FromGuiController.prototype, "formGuiPrimitiveFoodDelete", null);
__decorate([
    (0, common_1.Get)(`presentation/create`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FromGuiController.prototype, "formGuiPresentationCreate", null);
__decorate([
    (0, common_1.Get)(`presentation/update/:id`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FromGuiController.prototype, "formGuiPresentationUpdate", null);
__decorate([
    (0, common_1.Get)(`presentation/delete/:id`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FromGuiController.prototype, "formGuiPresentationDelete", null);
__decorate([
    (0, common_1.Get)(`supplement/create`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FromGuiController.prototype, "formGuiSupplementCreate", null);
__decorate([
    (0, common_1.Get)(`supplement/update/:id`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FromGuiController.prototype, "formGuiSupplementUpdate", null);
__decorate([
    (0, common_1.Get)(`supplement/delete/:id`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FromGuiController.prototype, "formGuiSupplementDelete", null);
__decorate([
    (0, common_1.Get)(`unity/create`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FromGuiController.prototype, "formGuiUnityMeasureCreate", null);
__decorate([
    (0, common_1.Get)(`unity/update/:id`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FromGuiController.prototype, "formGuiUnityMeasureUpdate", null);
__decorate([
    (0, common_1.Get)(`unity/delete/:id`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FromGuiController.prototype, "formGuiUnityMeasureDelete", null);
__decorate([
    (0, common_1.Get)(`exchange/create`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FromGuiController.prototype, "formGuiExchageListCreate", null);
__decorate([
    (0, common_1.Get)(`exchange/update/:id`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FromGuiController.prototype, "formGuiExchageListUpdate", null);
__decorate([
    (0, common_1.Get)(`exchange/delete/:id`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FromGuiController.prototype, "formGuiExchageListDelete", null);
__decorate([
    (0, common_1.Get)(`menu/create`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FromGuiController.prototype, "formGuiMenuCreate", null);
__decorate([
    (0, common_1.Get)(`menu/update/:id`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FromGuiController.prototype, "formGuiMenuUpdate", null);
__decorate([
    (0, common_1.Get)(`menu/delete/:id`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FromGuiController.prototype, "formGuiMenuDelete", null);
__decorate([
    (0, common_1.Get)(`food/create`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FromGuiController.prototype, "formGuiFoodAllCreate", null);
__decorate([
    (0, common_1.Get)(`food/update/:id`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FromGuiController.prototype, "formGuiFoodAllUpdate", null);
__decorate([
    (0, common_1.Get)(`food/delete/:id`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FromGuiController.prototype, "formGuiFoodAllDelete", null);
__decorate([
    (0, common_1.Get)(`quote/create`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FromGuiController.prototype, "formGuiQuoteCreate", null);
__decorate([
    (0, common_1.Get)(`quote/update/:id`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FromGuiController.prototype, "formGuiQuoteUpdate", null);
__decorate([
    (0, common_1.Get)(`quote/delete/:id`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FromGuiController.prototype, "formGuiQuoteDelete", null);
FromGuiController = __decorate([
    (0, common_1.Controller)(`gui/form`),
    __metadata("design:paramtypes", [auth_service_1.default,
        user_service_1.default,
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
        languaje_service_1.LanguajeService])
], FromGuiController);
exports.default = FromGuiController;
//# sourceMappingURL=form.gui.controller.js.map