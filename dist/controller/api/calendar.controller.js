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
const calendar_model_1 = require("../../model/calendar.model");
const calendar_service_1 = require("../../service/calendar.service");
let CalendarController = class CalendarController {
    constructor(CalendarFoodModel, service, permit, languaje) {
        this.CalendarFoodModel = CalendarFoodModel;
        this.service = service;
        this.permit = permit;
        this.languaje = languaje;
        this.lang = this.languaje.GetTranslate();
    }
    async today(req, query) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const action = this.getPermit(user.rolReference.name).list;
        const valid = permit.includes(action);
        if (!valid)
            return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT };
        const date = new Date();
        const skip = query.skip ? Number(query.skip) : 0;
        const take = query.take ? Number(query.take) : 10;
        const customFilter = [];
        if (user.rolReference.name === this.permit.USER_NUTRICIONISTA)
            customFilter.push({ createByReference: { id: user.id } });
        if (user.rolReference.name !== this.permit.USER_PACIENTE && query.quote)
            customFilter.push({ quoteId: query.quote });
        customFilter.push({ day: date.getDate() });
        customFilter.push({ isDelete: false });
        const filter = { AND: customFilter };
        const responsePromise = this.service.paginate({ skip, take, filter });
        const response = await responsePromise;
        return response;
    }
    async release(req, param, query) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const action = this.getPermit(user.rolReference.name).list;
        const valid = permit.includes(action);
        if (!valid)
            return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT };
        const date = new Date();
        const skip = query.skip ? Number(query.skip) : 0;
        const take = query.take ? Number(query.take) : 10;
        const customFilter = [];
        const currentForMonth = { AND: [{ monthNumber: { lt: date.getMonth() + 1 } }, { day: { lt: date.getDate() } }, { year: { lt: date.getFullYear() } }] };
        const currentOtherMonth = { OR: [{ monthNumber: { lt: date.getMonth() + 1 } }, { day: { lt: date.getDate() } }, { year: { lt: date.getFullYear() } }] };
        customFilter.push({ isDelete: false });
        customFilter.push({ status: `ACTIVA` });
        customFilter.push({ OR: [currentForMonth, currentOtherMonth] });
        if (user.rolReference.name === this.permit.USER_NUTRICIONISTA)
            customFilter.push({ createByReference: { id: user.id } });
        if (user.rolReference.name !== this.permit.USER_PACIENTE && query.quote)
            customFilter.push({ quoteId: query.quote });
        const filter = { AND: customFilter };
        const responsePromise = this.service.paginate({ skip, take, filter });
        const response = await responsePromise;
        return response;
    }
    async findForMonth(req, query) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const action = this.getPermit(user.rolReference.name).list;
        const valid = permit.includes(action);
        if (!valid)
            return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT };
        const responsePromise = this.service.findForMonth({
            quote: query.quote ? query.quote : ``,
            month: Number(query.month),
            status: query.status ? query.status : ``,
            year: Number(query.year),
            user: user.id
        });
        const response = await responsePromise;
        return response;
    }
    async dropHistory(req, param) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const action = this.getPermit(user.rolReference.name).list;
        const valid = permit.includes(action);
        await this.CalendarFoodModel.softDeleteHistory({ id: param.id });
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
            customFilter.push({ OR: [{ description: { contains: query.param } }] });
        if (user.rolReference.name === this.permit.USER_NUTRICIONISTA)
            customFilter.push({ createByReference: { id: user.id } });
        if (user.rolReference.name !== this.permit.USER_PACIENTE && query.quote)
            customFilter.push({ quoteId: query.quote });
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
            createByReference: { connect: { id: user.id } },
            day: Number(body.day),
            monthName: ``,
            monthNumber: Number(body.monthNumber),
            year: Number(body.year),
            status: `ACTIVA`,
            hours: body.hours,
            description: body.description,
        };
        if (body.quote)
            data.quoteReference = { connect: { id: body.quote } };
        const responsePromise = this.service.create({ data });
        const response = await responsePromise;
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
        let data = {};
        if (body.description)
            data = { ...data, description: body.description };
        if (body.status)
            data = { ...data, status: body.status };
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
    async reprogramming(req, body, param) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const action = this.getPermit(user.rolReference.name).udpate;
        const valid = permit.includes(action);
        if (!valid)
            return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT };
        let data = {
            day: Number(body.day),
            monthName: ``,
            monthNumber: Number(body.monthNumber),
            year: Number(body.year),
            status: `ACTIVA`,
            hours: body.hours,
        };
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
        const action = this.getPermit(user.rolReference.name).delete;
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
    async status(req, body, param) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const action = this.getPermit(user.rolReference.name).udpate;
        if (user.rolReference.name !== this.permit.USER_NUTRICIONISTA)
            return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT };
        const valid = permit.includes(action);
        if (!valid)
            return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT };
        const responsePromise = this.service.udpate({ id: param.id, data: { status: param.status } });
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
};
__decorate([
    (0, common_1.Get)(`today`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CalendarController.prototype, "today", null);
__decorate([
    (0, common_1.Get)(`release/`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CalendarController.prototype, "release", null);
__decorate([
    (0, common_1.Get)(`specify`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CalendarController.prototype, "findForMonth", null);
__decorate([
    (0, common_1.Put)(`/history/:id/delete`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CalendarController.prototype, "dropHistory", null);
__decorate([
    (0, common_1.Get)(``),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CalendarController.prototype, "paginate", null);
__decorate([
    (0, common_1.Get)(`:id/unique`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CalendarController.prototype, "unique", null);
__decorate([
    (0, common_1.Post)(`create`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CalendarController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(`:id/update`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CalendarController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(`:id/reprogramming`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CalendarController.prototype, "reprogramming", null);
__decorate([
    (0, common_1.Put)(`:id/delete`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CalendarController.prototype, "delete", null);
__decorate([
    (0, common_1.Put)(`:id/status/:status`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CalendarController.prototype, "status", null);
CalendarController = __decorate([
    (0, common_1.Controller)(`calendar`),
    __metadata("design:paramtypes", [calendar_model_1.default,
        calendar_service_1.default,
        AppActions_1.default,
        languaje_service_1.LanguajeService])
], CalendarController);
exports.default = CalendarController;
//# sourceMappingURL=calendar.controller.js.map