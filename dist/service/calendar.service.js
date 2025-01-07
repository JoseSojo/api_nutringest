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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const AppActions_1 = require("../AppActions");
const calendar_model_1 = require("../model/calendar.model");
const languaje_service_1 = require("../languaje/languaje.service");
let CalendarService = class CalendarService {
    constructor(prisma, permit, model, languaje) {
        this.prisma = prisma;
        this.permit = permit;
        this.model = model;
        this.languaje = languaje;
        this.lang = languaje.GetTranslate();
    }
    async findForMonth({ month, year, status, quote, user }) {
        const result = await this.model.findForMonthAll({ user, month, status: status ? status : ``, year, quote: quote ? quote : `` });
        return result;
    }
    async create({ data }) {
        try {
            const resultPromise = this.model.create({ data });
            const result = await resultPromise;
            return {
                message: this.lang.ACTIONS.SUCCESS.CREATE,
                error: false,
                body: result
            };
        }
        catch (error) {
            return {
                message: this.lang.ACTIONS.NOT_FOUND,
                error: true
            };
        }
    }
    async createHistoryStatus({ data }) {
        return await this.model.createHistory({ data });
    }
    async paginateHistoryStatus({ skip, take, filter }) {
        try {
            const resultPromise = this.model.findAllHistory({ filter, skip, take });
            const countPromise = this.model.countHistory({ filter });
            const result = await resultPromise;
            const count = await countPromise;
            const next = skip + take > count ? false : true;
            const previw = count <= take ? false : true;
            const test = skip + take;
            const now = `${test < count ? test : count}/${count}`;
            return {
                message: this.lang.ACTIONS.SUCCESS.LIST,
                error: false,
                body: {
                    next,
                    previw,
                    now,
                    list: result,
                    header: this.HeaderList(),
                    extrat: this.HeaderListExtract(),
                    headerMin: this.HeaderMinList(),
                    extratMin: this.HeaderMinListExtract(),
                }
            };
        }
        catch (error) {
            return {
                message: this.lang.ACTIONS.NOT_FOUND,
                error: true
            };
        }
    }
    async udpate({ data, id }) {
        try {
            const resultPromise = this.model.update({ data, filter: { id } });
            const result = await resultPromise;
            return {
                message: this.lang.ACTIONS.SUCCESS.UPDATE,
                error: false,
                body: result
            };
        }
        catch (error) {
            return {
                message: this.lang.ACTIONS.NOT_FOUND,
                error: true
            };
        }
    }
    async delete({ id }) {
        try {
            const resultPromise = this.model.softDelete({ id });
            const result = await resultPromise;
            return {
                message: this.lang.ACTIONS.SUCCESS.DELETE,
                error: false,
                body: result
            };
        }
        catch (error) {
            return {
                message: this.lang.ACTIONS.NOT_FOUND,
                error: true
            };
        }
    }
    async paginate({ skip, take, filter }) {
        try {
            const resultPromise = this.model.findAll({ filter, skip, take });
            const countPromise = this.model.count({ filter });
            const result = await resultPromise;
            const count = await countPromise;
            const next = skip + take > count ? false : true;
            const previw = count <= take ? false : true;
            const test = skip + take;
            const now = `${test < count ? test : count}/${count}`;
            return {
                message: this.lang.ACTIONS.SUCCESS.LIST,
                error: false,
                body: {
                    next,
                    previw,
                    now,
                    list: result,
                    header: this.HeaderList(),
                    extrat: this.HeaderListExtract(),
                    headerMin: this.HeaderMinList(),
                    extratMin: this.HeaderMinListExtract(),
                }
            };
        }
        catch (error) {
            return {
                message: this.lang.ACTIONS.NOT_FOUND,
                error: true
            };
        }
    }
    async find({ filter }) {
        try {
            const resultPromise = this.model.find({ filter });
            const result = await resultPromise;
            return {
                message: this.lang.ACTIONS.SUCCESS.LIST,
                error: false,
                body: result
            };
        }
        catch (error) {
            return {
                message: this.lang.ACTIONS.NOT_FOUND,
                error: true
            };
        }
    }
    HeaderList() {
        return [`Estado`, `Descripción`, `Año`, `Mes`, `Día`, `Creador`];
    }
    HeaderListExtract() {
        return [`status`, `description`, `year`, `monthNumber`, `day`, `userReference.email`];
    }
    HeaderMinList() {
        return [`Estado`, `Descripción`, `Creación`, `Creador`];
    }
    HeaderMinListExtract() {
        return [`status`, `description`, `createAt`, `userReference.email`];
    }
    HeaderUnique() {
        return [`Nombre`];
    }
    HeaderUniqueExtract() {
        return [`name`];
    }
    formCreate() {
        return {
            method: `POST`,
            name: `Crear`,
            path: `/exchange/create`,
            fields: [
                {
                    beforeType: `text`,
                    type: `input`,
                    id: `input`,
                    label: `Nombre`,
                    name: `name`,
                    placeholder: `Nombre...`,
                    required: true
                },
            ]
        };
    }
    async formUpdate() { }
    async formDelete() { }
    getActionsList(actions) {
        const permit = this.getPermitsPropietary();
        const customActions = [];
        if (actions.includes(permit.list))
            customActions.push({ ico: `list`, label: `Lista`, path: `/dashboard/user`, use: `page` });
        if (actions.includes(permit.create))
            customActions.push({ ico: `create`, label: `Crear`, path: `/dashboard/exchange/create`, use: `page` });
        return customActions;
    }
    getActionsUnique(actions, p) {
        const permit = p ? this.getPermitsPropietary() : this.getPermits();
        const customActions = [];
        if (actions.includes(permit.list))
            customActions.push({ ico: `unique`, label: `Ver`, path: `/dashboard/calendar`, use: `modal` });
        if (actions.includes(permit.udpate))
            customActions.push({ ico: `cancelar`, label: `Cancelar`, path: `/dashboard/calendar`, use: `modal` });
        if (actions.includes(permit.udpate))
            customActions.push({ ico: `reprogramming`, label: `Reprogramar`, path: `/dashboard/calendar`, use: `modal` });
        if (actions.includes(permit.udpate))
            customActions.push({ ico: `finish`, label: `Finalizar`, path: `/dashboard/calendar`, use: `modal` });
        if (actions.includes(permit.delete))
            customActions.push({ ico: `remove`, label: `Eliminar`, path: `/dashboard/calendar`, use: `modal` });
        return customActions;
    }
    getActionsUniqueInQuote(actions, p) {
        const permit = p ? this.getPermitsPropietary() : this.getPermits();
        const customActions = [];
        if (actions.includes(permit.list))
            customActions.push({ ico: `unique`, label: `Ver`, path: `/dashboard/calendar`, use: `modal` });
        if (actions.includes(permit.udpate))
            customActions.push({ ico: `cancelar`, label: `Cancelar`, path: `/dashboard/calendar`, use: `modal` });
        if (actions.includes(permit.udpate))
            customActions.push({ ico: `reprogramming`, label: `Reprogramar`, path: `/dashboard/calendar`, use: `modal` });
        if (actions.includes(permit.udpate))
            customActions.push({ ico: `finish`, label: `Finalizar`, path: `/dashboard/calendar`, use: `modal` });
        if (actions.includes(permit.delete))
            customActions.push({ ico: `remove`, label: `Eliminar`, path: `/dashboard/calendar`, use: `modal` });
        return customActions;
    }
    getActionsUniquePropietary(actions) {
        const permit = this.getPermitsPropietary();
        const customActions = [];
        if (actions.includes(permit.list))
            customActions.push({ ico: `unique`, label: `Ver`, path: `/dashboard/calendar`, use: `modal` });
        if (actions.includes(permit.udpate))
            customActions.push({ ico: `cancelar`, label: `Cancelar`, path: `/dashboard/calendar`, use: `modal` });
        if (actions.includes(permit.udpate))
            customActions.push({ ico: `reprogramming`, label: `Reprogramar`, path: `/dashboard/calendar`, use: `modal` });
        if (actions.includes(permit.udpate))
            customActions.push({ ico: `finish`, label: `Finalizar`, path: `/dashboard/calendar`, use: `modal` });
        if (actions.includes(permit.delete))
            customActions.push({ ico: `remove`, label: `Eliminar`, path: `/dashboard/calendar`, use: `modal` });
        return customActions;
    }
    getPermits() {
        return {
            list: this.permit.APP_PERMIT_CALENDAR_LIST ? this.permit.APP_PERMIT_CALENDAR_LIST : undefined,
            create: this.permit.APP_PERMIT_CALENDAR_CREATE ? this.permit.APP_PERMIT_CALENDAR_CREATE : undefined,
            delete: undefined,
            recovery: this.permit.APP_PERMIT_CALENDAR_RECOVERY ? this.permit.APP_PERMIT_CALENDAR_RECOVERY : undefined,
            udpate: undefined,
            add: this.permit.APP_PERMIT_CALENDAR_ADD ? this.permit.APP_PERMIT_CALENDAR_ADD : undefined,
        };
    }
    getPermitsPropietary() {
        return {
            list: this.permit.APP_PERMIT_CALENDAR_PROPIETARY_LIST ? this.permit.APP_PERMIT_CALENDAR_PROPIETARY_LIST : undefined,
            create: this.permit.APP_PERMIT_CALENDAR_PROPIETARY_CREATE ? this.permit.APP_PERMIT_CALENDAR_PROPIETARY_CREATE : undefined,
            delete: undefined,
            recovery: undefined,
            udpate: this.permit.APP_PERMIT_CALENDAR_PROPIETARY_UPDATE ? this.permit.APP_PERMIT_CALENDAR_PROPIETARY_UPDATE : undefined,
        };
    }
};
CalendarService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        AppActions_1.default,
        calendar_model_1.default,
        languaje_service_1.LanguajeService])
], CalendarService);
exports.default = CalendarService;
//# sourceMappingURL=calendar.service.js.map