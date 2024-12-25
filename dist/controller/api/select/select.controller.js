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
const city_service_1 = require("../../../service/master/city.service");
const country_service_1 = require("../../../service/master/country.service");
const money_service_1 = require("../../../service/master/money.service");
const payment_service_1 = require("../../../service/master/payment.service");
const state_service_1 = require("../../../service/master/state.service");
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
let SelectController = class SelectController {
    constructor(authService, permitService, userService, countryService, stateService, cityService, moneyService, paymentMethodService, primitiveFoodService, presentationService, supplementService, unityService, exchangeListService, menuService, foodAllService, quoteService) {
        this.authService = authService;
        this.permitService = permitService;
        this.userService = userService;
        this.countryService = countryService;
        this.stateService = stateService;
        this.cityService = cityService;
        this.moneyService = moneyService;
        this.paymentMethodService = paymentMethodService;
        this.primitiveFoodService = primitiveFoodService;
        this.presentationService = presentationService;
        this.supplementService = supplementService;
        this.unityService = unityService;
        this.exchangeListService = exchangeListService;
        this.menuService = menuService;
        this.foodAllService = foodAllService;
        this.quoteService = quoteService;
    }
    async type(req, query) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const customReturn = [
            { id: `DESAYUNO`, label: `DESAYUNO` },
            { id: `MERIENDA`, label: `MERIENDA` },
            { id: `ALMUERZO`, label: `ALMUERZO` },
            { id: `MERIENDA`, label: `MERIENDA` },
            { id: `CENA`, label: `CENA` },
        ];
        return customReturn;
    }
    async permit(req, query) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const customFilter = [];
        if (query.param)
            customFilter.push({ name: { contains: query.param } });
        const filter = { AND: customFilter };
        const listPromise = await this.permitService.paginate({ filter, skip: 0, take: 10 });
        const customReturn = [];
        listPromise.body.list.forEach((item) => {
            customReturn.push({
                id: item.id,
                label: item.name
            });
        });
        return customReturn;
    }
    async money(req, query) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const customFilter = [];
        if (query.param)
            customFilter.push({ name: { contains: query.param } });
        const filter = { AND: customFilter };
        const listPromise = await this.moneyService.paginate({ filter, skip: 0, take: 10 });
        const customReturn = [];
        listPromise.body.list.forEach((item) => {
            customReturn.push({
                id: item.id,
                label: item.name
            });
        });
        return customReturn;
    }
    async mypatient(req, query) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const customFilter = [];
        customFilter.push({ parentId: user.id });
        customFilter.push({ isDelete: false });
        if (query.param)
            customFilter.push({ name: { contains: query.param } });
        const filter = { AND: customFilter };
        const listPromise = await this.userService.paginate({ filter, skip: 0, take: 10 });
        const customReturn = [];
        listPromise.body.list.forEach((item) => {
            customReturn.push({
                id: item.id,
                label: item.name
            });
        });
        return customReturn;
    }
    async country(req, query) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const customFilter = [];
        if (query.param)
            customFilter.push({ name: { contains: query.param } });
        const filter = { AND: customFilter };
        const listPromise = await this.countryService.paginate({ filter, skip: 0, take: 10 });
        const customReturn = [];
        listPromise.body.list.forEach((item) => {
            customReturn.push({
                id: item.id,
                label: item.name
            });
        });
        return customReturn;
    }
    async state(req, query) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const customFilter = [];
        if (query.param)
            customFilter.push({ name: { contains: query.param } });
        if (query.country)
            customFilter.push({ countryId: query.country });
        const filter = { AND: customFilter };
        const listPromise = await this.stateService.paginate({ filter, skip: 0, take: 10 });
        const customReturn = [];
        listPromise.body.list.forEach((item) => {
            customReturn.push({
                id: item.id,
                label: item.name
            });
        });
        return customReturn;
    }
    async city(req, query) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const customFilter = [];
        if (query.param)
            customFilter.push({ name: { contains: query.param } });
        if (query.state)
            customFilter.push({ stateId: query.state });
        const filter = { AND: customFilter };
        const listPromise = await this.cityService.paginate({ filter, skip: 0, take: 10 });
        const customReturn = [];
        listPromise.body.list.forEach((item) => {
            customReturn.push({
                id: item.id,
                label: item.name
            });
        });
        return customReturn;
    }
    async supplement(req, query) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const customFilter = [];
        if (query.param)
            customFilter.push({ name: { contains: query.param } });
        const filter = { AND: customFilter };
        const listPromise = await this.supplementService.paginate({ filter, skip: 0, take: 10 });
        const customReturn = [];
        listPromise.body.list.forEach((item) => {
            customReturn.push({
                id: item.id,
                label: item.name
            });
        });
        return customReturn;
    }
    async unity(req, query) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const customFilter = [];
        if (query.param)
            customFilter.push({ name: { contains: query.param } });
        const filter = { AND: customFilter };
        const listPromise = await this.unityService.paginate({ filter, skip: 0, take: 10 });
        const customReturn = [];
        listPromise.body.list.forEach((item) => {
            customReturn.push({
                id: item.id,
                label: item.name
            });
        });
        return customReturn;
    }
    async primitive(req, query) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const customFilter = [];
        if (query.param)
            customFilter.push({ name: { contains: query.param } });
        const filter = { AND: customFilter };
        const listPromise = await this.primitiveFoodService.paginate({ filter, skip: 0, take: 10 });
        const customReturn = [];
        listPromise.body.list.forEach((item) => {
            customReturn.push({
                id: item.id,
                label: item.name
            });
        });
        return customReturn;
    }
};
__decorate([
    (0, common_1.Get)(`type`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SelectController.prototype, "type", null);
__decorate([
    (0, common_1.Get)(`permit`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SelectController.prototype, "permit", null);
__decorate([
    (0, common_1.Get)(`money`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SelectController.prototype, "money", null);
__decorate([
    (0, common_1.Get)(`mypatient`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SelectController.prototype, "mypatient", null);
__decorate([
    (0, common_1.Get)(`country`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SelectController.prototype, "country", null);
__decorate([
    (0, common_1.Get)(`state`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SelectController.prototype, "state", null);
__decorate([
    (0, common_1.Get)(`city`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SelectController.prototype, "city", null);
__decorate([
    (0, common_1.Get)(`supplement`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SelectController.prototype, "supplement", null);
__decorate([
    (0, common_1.Get)(`unity`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SelectController.prototype, "unity", null);
__decorate([
    (0, common_1.Get)(`primitive`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SelectController.prototype, "primitive", null);
SelectController = __decorate([
    (0, common_1.Controller)(`select`),
    __metadata("design:paramtypes", [auth_service_1.default,
        permit_service_1.default,
        user_service_1.default,
        country_service_1.default,
        state_service_1.default,
        city_service_1.default,
        money_service_1.default,
        payment_service_1.default,
        food_service_1.default,
        presentation_service_1.default,
        supplement_service_1.default,
        unity_service_1.default,
        exchange_service_1.default,
        menu_service_1.default,
        food_service_2.default,
        quote_service_1.default])
], SelectController);
exports.default = SelectController;
//# sourceMappingURL=select.controller.js.map