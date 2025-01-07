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
const history_service_1 = require("../../../service/history.service");
const unity_service_1 = require("../../../service/nutri/unity.service");
let UnityMeasureController = class UnityMeasureController {
    constructor(service, appEvents, history, permit, languaje) {
        this.service = service;
        this.appEvents = appEvents;
        this.history = history;
        this.permit = permit;
        this.languaje = languaje;
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
            customFilter.push({ name: { contains: query.param } });
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
        const action = this.getPermit().list;
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
        const title = response.body.name;
        return {
            message: response.message,
            error: response.error,
            body: response.body,
            header: this.service.HeaderUnique(),
            extract: this.service.HeaderUniqueExtract(),
            title
        };
    }
    async create(req, body) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const action = this.getPermit().udpate;
        const valid = permit.includes(action);
        if (!valid)
            return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT };
        const data = {
            name: body.name,
            createByReference: { connect: { id: user.id } },
            abr: body.abr
        };
        const responsePromise = this.service.create({ data });
        const response = await responsePromise;
        if (response.error) {
            return {
                message: response.message,
                error: response.error
            };
        }
        await this.history.create({
            userReference: { connect: { id: user.id } },
            eventName: this.appEvents.EVENT_NUTRI_UNITY_CREATE,
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
        const action = this.getPermit().udpate;
        const valid = permit.includes(action);
        if (!valid)
            return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT };
        const data = {
            name: body.name,
            abr: body.abr
        };
        const responsePromise = this.service.udpate({ data, id: param.id });
        await this.history.create({
            userReference: { connect: { id: user.id } },
            eventName: this.appEvents.EVENT_NUTRI_UNITY_UPDATE,
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
    async delete(req, body, param) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const action = this.getPermit().delete;
        const valid = permit.includes(action);
        if (!valid)
            return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT };
        const responsePromise = this.service.delete({ id: param.id });
        await this.history.create({
            userReference: { connect: { id: user.id } },
            eventName: this.appEvents.EVENT_NUTRI_UNITY_DELETE,
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
        const response = this.service.getActionsList(permit);
        return response;
    }
    getPermit() {
        const response = this.service.getPermits();
        return response;
    }
    objectName() { return `supplement`; }
};
__decorate([
    (0, common_1.Get)(``),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UnityMeasureController.prototype, "paginate", null);
__decorate([
    (0, common_1.Get)(`:id/unique`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UnityMeasureController.prototype, "unique", null);
__decorate([
    (0, common_1.Post)(`create`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UnityMeasureController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(`:id/update`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UnityMeasureController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(`:id/delete`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UnityMeasureController.prototype, "delete", null);
UnityMeasureController = __decorate([
    (0, common_1.Controller)(`unity`),
    __metadata("design:paramtypes", [unity_service_1.default,
        AppEvent_1.default,
        history_service_1.default,
        AppActions_1.default,
        languaje_service_1.LanguajeService])
], UnityMeasureController);
exports.default = UnityMeasureController;
//# sourceMappingURL=unity.controller.js.map