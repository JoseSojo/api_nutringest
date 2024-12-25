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
const platform_express_1 = require("@nestjs/platform-express");
const fs = require("fs");
const path_1 = require("path");
const AppActions_1 = require("../../../AppActions");
const AppEvent_1 = require("../../../AppEvent");
const AuthGuard_1 = require("../../../guards/AuthGuard");
const languaje_service_1 = require("../../../languaje/languaje.service");
const calendar_service_1 = require("../../../service/calendar.service");
const history_service_1 = require("../../../service/history.service");
const quote_service_1 = require("../../../service/quote/quote.service");
let QuoteController = class QuoteController {
    constructor(service, appEvents, historyService, calendar, permit, languaje) {
        this.service = service;
        this.appEvents = appEvents;
        this.historyService = historyService;
        this.calendar = calendar;
        this.permit = permit;
        this.languaje = languaje;
        this.lang = this.languaje.GetTranslate();
    }
    async uploadPhoto(req, param, body, file) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const action = this.getPermit(user.rolReference.name).udpate;
        const valid = permit.includes(action);
        if (!valid)
            return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT };
        const name = `${crypto.randomUUID()}.${file.originalname.split(`.`).pop()}`;
        const path = (0, path_1.join)(process.cwd(), `public/quote/history/photo`, name);
        const download = `/quote/history/photo/${name}`;
        fs.writeFile(path, file.buffer, function (err) {
            if (err) {
                return {
                    error: true,
                    message: `Error al crear el archivo`,
                    body: {}
                };
            }
        });
        const data = {
            createByRef: { connect: { id: user.id } },
            quoteReference: { connect: { id: param.id } },
            mimyType: file.mimetype,
            originalName: file.originalname,
            path: path,
            size: file.size,
            donwload: download,
            date: body.date,
            description: body.description
        };
        await this.service.createPhotoHistory({ data, quote: param.id });
        return {
            message: `upload success`,
            error: false,
            body: {}
        };
    }
    async removeExchange(req, body, query) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const action = this.getPermit(user.rolReference.name).udpate;
        const valid = permit.includes(action);
        if (!valid)
            return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT };
        if (!query.item)
            return { error: true, code: 400, message: `No se encuentra la lista.` };
        if (!query.quote)
            return { error: true, code: 400, message: `No se encuentra la cita.` };
        const result = await this.service.removeExchange({ id: query.item, quote: query.quote });
        return {
            message: `Exchange assing success (controller)`,
            error: false,
            body: result
        };
    }
    async removeMenu(req, body, query) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const action = this.getPermit(user.rolReference.name).udpate;
        const valid = permit.includes(action);
        if (!valid)
            return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT };
        if (!query.item)
            return { error: true, code: 400, message: `No se encuentra la menu.` };
        if (!query.quote)
            return { error: true, code: 400, message: `No se encuentra la cita.` };
        const result = await this.service.removeMenu({ id: query.item, quote: query.quote });
        return {
            message: `Menú assing success (controller)`,
            error: false,
            body: result
        };
    }
    async removeFood(req, body, query) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const action = this.getPermit(user.rolReference.name).udpate;
        const valid = permit.includes(action);
        if (!valid)
            return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT };
        if (!query.item)
            return { error: true, code: 400, message: `No se encuentra el alimento.` };
        if (!query.quote)
            return { error: true, code: 400, message: `No se encuentra la cita.` };
        const result = await this.service.removeFood({ id: query.item, quote: query.quote });
        return {
            message: `Exchange assing success (controller)`,
            error: false,
            body: result
        };
    }
    async connectExchange(req, body, query) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const action = this.getPermit(user.rolReference.name).udpate;
        const valid = permit.includes(action);
        if (!valid)
            return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT };
        if (!query.item)
            return { error: true, code: 400, message: `No se encuentra la lista.` };
        if (!query.quote)
            return { error: true, code: 400, message: `No se encuentra la cita.` };
        const result = await this.service.assingExchange(query);
        return {
            message: `Exchange assing success (controller)`,
            error: false,
            body: result
        };
    }
    async connectMenu(req, body, query) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const action = this.getPermit(user.rolReference.name).udpate;
        const valid = permit.includes(action);
        if (!valid)
            return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT };
        if (!query.item)
            return { error: true, code: 400, message: `No se encuentra la menu.` };
        if (!query.quote)
            return { error: true, code: 400, message: `No se encuentra la cita.` };
        const result = await this.service.assingMenu(query);
        return {
            message: `Menú assing success (controller)`,
            error: false,
            body: result
        };
    }
    async connectFood(req, body, query) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const action = this.getPermit(user.rolReference.name).udpate;
        const valid = permit.includes(action);
        if (!valid)
            return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT };
        if (!query.item)
            return { error: true, code: 400, message: `No se encuentra el alimento.` };
        if (!query.quote)
            return { error: true, code: 400, message: `No se encuentra la cita.` };
        const result = await this.service.assingFood(query);
        return {
            message: `Exchange assing success (controller)`,
            error: false,
            body: result
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
        if (permit.includes(this.permit.APP_PERMIT_PROPIETARY_QUOTE_LIST)) {
            customFilter.push({
                OR: [
                    { nutricionistId: user.id },
                    { patientId: user.id }
                ]
            });
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
    async history(req, query) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const action = this.getPermit(user.rolReference.name).list;
        const valid = permit.includes(action);
        if (!valid)
            return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT };
        const skip = query.skip ? Number(query.skip) : 0;
        const take = query.take ? Number(query.take) : 10;
        const customFilter = [];
        customFilter.push({ quoteId: query.id });
        const filter = { AND: customFilter };
        const responsePromise = this.service.PaginateHistory({ skip, take, filter });
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
    async calendarPaginate(req, query) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const action = this.getPermit(user.rolReference.name).list;
        const valid = permit.includes(action);
        if (!valid)
            return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT };
        const skip = query.skip ? Number(query.skip) : 0;
        const take = query.take ? Number(query.take) : 10;
        const customFilter = [];
        customFilter.push({ quoteId: query.id });
        const filter = { AND: customFilter };
        const responsePromise = this.calendar.paginate({ skip, take, filter });
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
    async photo(req, query) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const action = this.getPermit(user.rolReference.name).list;
        const valid = permit.includes(action);
        if (!valid)
            return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT };
        const skip = query.skip ? Number(query.skip) : 0;
        const take = query.take ? Number(query.take) : 10;
        const customFilter = [];
        customFilter.push({ quoteId: query.id });
        const filter = { AND: customFilter };
        const responsePromise = this.service.PaginatePhoto({ skip, take, filter });
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
        return {
            message: response.message,
            error: response.error,
            body: response.body,
            sections: this.getSections(user.rolReference.name)
        };
    }
    async create(req, body) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const action = this.getPermit(user.rolReference.name).udpate;
        const valid = permit.includes(action);
        if (!valid)
            return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT };
        const data = {
            Carbohidratos: body.carbohidratos ? Number(body.carbohidratos) : undefined,
            lipidos: body.lipidos ? Number(body.lipidos) : undefined,
            proteinas: body.proteinas ? Number(body.proteinas) : undefined,
            description: body.description ? body.description : undefined,
            exercise: body.exercise ? body.exercise : undefined,
            sleep: body.sleep ? body.sleep : undefined,
            weightNow: body.weightNow ? Number(body.weightNow) : undefined,
            weightObjective: body.weightObjective ? Number(body.weightObjective) : undefined,
            weightPreview: body.weightPreview ? Number(body.weightPreview) : undefined,
            nutricionistReference: { connect: { id: user.id } },
            patientReference: { connect: { id: body.patient } }
        };
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
        const action = this.getPermit(user.rolReference.name).udpate;
        const valid = permit.includes(action);
        if (!valid)
            return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT };
        const data = {};
        if (body.description)
            data.description = body.description;
        if (body.exercise)
            data.exercise = body.exercise;
        if (body.sleep)
            data.sleep = body.sleep;
        if (body.weightNow)
            data.weightNow = body.weightNow;
        if (body.weightObjective)
            data.weightObjective = body.weightObjective;
        if (body.weightPreview)
            data.weightPreview = body.weightPreview;
        const responsePromise = this.service.udpate({ data, id: param.id });
        await this.historyService.create({
            userReference: { connect: { id: user.id } },
            eventName: this.appEvents.EVENT_QUOTE_UPDATE,
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
        const action = this.getPermit(user.rolReference.name).delete;
        const valid = permit.includes(action);
        if (!valid)
            return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT };
        const responsePromise = this.service.delete({ id: param.id });
        await this.historyService.create({
            userReference: { connect: { id: user.id } },
            eventName: this.appEvents.EVENT_QUOTE_DELETE,
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
    getSections(rol) {
        const sections = [
            { label: `Alimentos`, value: `FOOD` },
            { label: `Listas Intercambio`, value: `EXCHANGE` },
            { label: `Menús`, value: `MENU` },
            { label: `Agenda`, value: `CALENDAR` },
            { label: `Fotos`, value: `PHOTO` },
        ];
        if (rol === this.permit.USER_NUTRICIONISTA || rol === this.permit.USER_NUTRI_ADMIN) {
            sections.push({ label: `Historial`, value: `HISTORY` });
            sections.push({ label: `Detalles`, value: `DETAILS` });
        }
        if (rol === this.permit.USER_NUTRICIONISTA) {
            sections.push({ label: `Recomendaciones`, value: `UPDATE` });
        }
        return sections;
    }
    objectName() { return `quote`; }
};
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)(`file`)),
    (0, common_1.Post)(`:id/upload/photo`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], QuoteController.prototype, "uploadPhoto", null);
__decorate([
    (0, common_1.Put)(`exchange/remove`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], QuoteController.prototype, "removeExchange", null);
__decorate([
    (0, common_1.Put)(`menu/remove`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], QuoteController.prototype, "removeMenu", null);
__decorate([
    (0, common_1.Put)(`food/remove`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], QuoteController.prototype, "removeFood", null);
__decorate([
    (0, common_1.Post)(`assing/exchange`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], QuoteController.prototype, "connectExchange", null);
__decorate([
    (0, common_1.Post)(`assing/menu`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], QuoteController.prototype, "connectMenu", null);
__decorate([
    (0, common_1.Post)(`assing/primitive`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], QuoteController.prototype, "connectFood", null);
__decorate([
    (0, common_1.Get)(``),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], QuoteController.prototype, "paginate", null);
__decorate([
    (0, common_1.Get)(`history`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], QuoteController.prototype, "history", null);
__decorate([
    (0, common_1.Get)(`calendar`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], QuoteController.prototype, "calendarPaginate", null);
__decorate([
    (0, common_1.Get)(`photo`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], QuoteController.prototype, "photo", null);
__decorate([
    (0, common_1.Get)(`:id/unique`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], QuoteController.prototype, "unique", null);
__decorate([
    (0, common_1.Post)(`create`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], QuoteController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(`:id/update`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], QuoteController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(`:id/delete`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], QuoteController.prototype, "delete", null);
QuoteController = __decorate([
    (0, common_1.Controller)(`quote`),
    __metadata("design:paramtypes", [quote_service_1.default,
        AppEvent_1.default,
        history_service_1.default,
        calendar_service_1.default,
        AppActions_1.default,
        languaje_service_1.LanguajeService])
], QuoteController);
exports.default = QuoteController;
//# sourceMappingURL=quote.controller.js.map