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
const AppEvent_1 = require("../../../AppEvent");
const AuthGuard_1 = require("../../../guards/AuthGuard");
const languaje_service_1 = require("../../../languaje/languaje.service");
const exchange_food_model_1 = require("../../../model/quote/exchange.food.model");
const history_service_1 = require("../../../service/history.service");
const exchange_service_1 = require("../../../service/quote/exchange.service");
let ExchangeListController = class ExchangeListController {
    constructor(exchangeListFoodModel, service, appEvents, history, permit, languaje) {
        this.exchangeListFoodModel = exchangeListFoodModel;
        this.service = service;
        this.appEvents = appEvents;
        this.history = history;
        this.permit = permit;
        this.languaje = languaje;
        this.lang = this.languaje.GetTranslate();
    }
    async dropFood(req, param) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const action = this.getPermit(user.rolReference.name).list;
        const valid = permit.includes(action);
        await this.exchangeListFoodModel.delete({ id: param.id });
        return {
            error: false,
            message: `delete success (controller)`,
            body: {}
        };
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
        if (query.param)
            customFilter.push({ name: { contains: query.param } });
        if (user.rolReference.name === this.permit.USER_NUTRICIONISTA)
            customFilter.push({ userReference: { id: user.id } });
        if (user.rolReference.name === this.permit.USER_PACIENTE)
            customFilter.push({ exchange: { some: { quoteReference: { patientId: user.id } } } });
        if (query.quote)
            customFilter.push({ exchange: { some: { quoteId: query.quote } } });
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
    async create(req, body) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const action = this.getPermit(user.rolReference.name).udpate;
        const valid = permit.includes(action);
        if (!valid)
            return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT };
        let data = {
            name: body.name,
            userReference: { connect: { id: user.id } }
        };
        if (body.ration)
            data = { ...data, ration: body.ration };
        if (body.unity)
            data = { ...data, unityReference: { connect: { id: body.unity.id } } };
        const responsePromise = this.service.create({ data });
        const response = await responsePromise;
        const exchangeId = response.body.id;
        const foods = body.foods;
        foods.forEach(food => {
            const create = {
                exchangeListReference: { connect: { id: exchangeId } },
                foodReference: { connect: { id: food.food.id } },
            };
            if (food.unity)
                create.unityMeasureReference = { connect: { id: food.unity.id } };
            if (food.ration)
                create.ration = food.ration.toString();
            this.service.createManyFood({ data: create });
        });
        if (response.error) {
            return {
                message: response.message,
                error: response.error
            };
        }
        await this.history.create({
            userReference: { connect: { id: user.id } },
            eventName: this.appEvents.EVENT_QUOTE_EXCHANGE_LIST_CREATE,
            objectName: this.objectName(),
            objectReferenceId: response.body.id
        });
        return {
            message: response.message,
            error: response.error,
            body: response
        };
    }
    async update(req, body, param) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const action = this.getPermit(user.rolReference.name).udpate;
        const valid = permit.includes(action);
        if (!valid)
            return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT };
        let data = {
            name: body.name
        };
        if (body.ration)
            data = { ...data, ration: body.ration.toString() };
        if (body.unity)
            data = { ...data, unityReference: { connect: { id: body.unity.id } } };
        const responsePromise = this.service.udpate({ data, id: param.id });
        await this.history.create({
            userReference: { connect: { id: user.id } },
            eventName: this.appEvents.EVENT_QUOTE_EXCHANGE_LIST_UPDATE,
            objectName: this.objectName(),
            objectReferenceId: param.id
        });
        const response = await responsePromise;
        const foods = body.foods;
        foods.forEach(async (food) => {
            const foodFound = await this.exchangeListFoodModel.find({ filter: { id: food.id } });
            if (!foodFound) {
                const create = {
                    exchangeListReference: { connect: { id: param.id } },
                    foodReference: { connect: { id: food.food.id } },
                };
                if (food.unity)
                    create.unityMeasureReference = { connect: { id: food.unity.id } };
                if (food.ration)
                    create.ration = food.ration.toString();
                await this.service.createManyFood({ data: create });
            }
        });
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
        const action = this.getPermit(user.rolReference.name).delete;
        const valid = permit.includes(action);
        if (!valid)
            return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT };
        const responsePromise = this.service.delete({ id: param.id });
        await this.history.create({
            userReference: { connect: { id: user.id } },
            eventName: this.appEvents.EVENT_QUOTE_EXCHANGE_LIST_DELETE,
            objectName: this.objectName(),
            objectReferenceId: param.id
        });
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
    objectName() { return `exchangelist`; }
};
__decorate([
    (0, common_1.Put)(`/food/:id/delete`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ExchangeListController.prototype, "dropFood", null);
__decorate([
    (0, common_1.Get)(``),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ExchangeListController.prototype, "paginate", null);
__decorate([
    (0, common_1.Get)(`:id/unique`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ExchangeListController.prototype, "unique", null);
__decorate([
    (0, common_1.Post)(`create`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ExchangeListController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(`:id/update`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ExchangeListController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(`:id/delete`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ExchangeListController.prototype, "delete", null);
ExchangeListController = __decorate([
    (0, common_1.Controller)(`exchange`),
    __metadata("design:paramtypes", [exchange_food_model_1.default,
        exchange_service_1.default,
        AppEvent_1.default,
        history_service_1.default,
        AppActions_1.default,
        languaje_service_1.LanguajeService])
], ExchangeListController);
exports.default = ExchangeListController;
//# sourceMappingURL=exchange.controller.js.map