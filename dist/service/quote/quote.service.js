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
const prisma_service_1 = require("../../prisma/prisma.service");
const quote_model_1 = require("../../model/quote/quote.model");
const AppActions_1 = require("../../AppActions");
const AppEvent_1 = require("../../AppEvent");
const languaje_service_1 = require("../../languaje/languaje.service");
let QuoteService = class QuoteService {
    constructor(permit, model, prisma, events, languaje) {
        this.permit = permit;
        this.model = model;
        this.prisma = prisma;
        this.events = events;
        this.languaje = languaje;
        this.lang = languaje.GetTranslate();
    }
    async removeMenu({ id, quote }) {
        const found = await this.prisma.menuInQuote.findFirst({ where: { AND: [{ menuId: id }, { quoteId: quote }] } });
        const resultPromise = this.prisma.menuInQuote.delete({ where: { id: found.id } });
        await this.CreateHistory({ quoteReference: { connect: { id: quote } }, description: this.events.EVENT_REMOVE_MENU_UPDATE });
        return await resultPromise;
    }
    async removeExchange({ quote, id }) {
        const found = await this.prisma.exchangeListInQuote.findFirst({ where: { AND: [{ exchangeId: id }, { quoteId: quote }] } });
        const resultPromise = this.prisma.exchangeListInQuote.delete({ where: { id: found.id } });
        await this.CreateHistory({ quoteReference: { connect: { id: quote } }, description: this.events.EVENT_REMOVE_EXCHANGE_LIST_UPDATE });
        return await resultPromise;
    }
    async removeFood({ quote, id }) {
        const found = await this.prisma.foodAll.findFirst({ where: { OR: [{ AND: [{ foodId: id }, { quoteId: quote }] }, { id }] } });
        const resultPromise = this.prisma.foodAll.delete({ where: { id: found.id } });
        await this.CreateHistory({ quoteReference: { connect: { id: quote } }, description: this.events.EVENT_REMOVE_FOOD_UPDATE });
        return await resultPromise;
    }
    async assingMenu({ quote, item }) {
        const resultPromise = this.prisma.menuInQuote.create({
            data: {
                menuReference: { connect: { id: item } },
                quoteReference: { connect: { id: quote } }
            }
        });
        await this.CreateHistory({ quoteReference: { connect: { id: quote } }, description: this.events.EVENT_ASSING_MENU_UPDATE });
        return await resultPromise;
    }
    async assingExchange({ quote, item }) {
        const resultPromise = this.prisma.exchangeListInQuote.create({
            data: {
                exchangeReference: { connect: { id: item } },
                quoteReference: { connect: { id: quote } }
            }
        });
        await this.CreateHistory({ quoteReference: { connect: { id: quote } }, description: this.events.EVENT_ASSING_EXCHANGE_LIST_UPDATE });
        return await resultPromise;
    }
    async assingFood({ quote, item, type }) {
        const resultPromise = this.prisma.foodAll.create({
            data: {
                quoteReference: { connect: { id: quote } },
                foodReference: { connect: { id: item } },
                type
            }
        });
        await this.CreateHistory({ quoteReference: { connect: { id: quote } }, description: this.events.EVENT_ASSING_FOOD_UPDATE });
        return await resultPromise;
    }
    async create({ data }) {
        try {
            const resultPromise = this.model.create({ data });
            const result = await resultPromise;
            await this.CreateHistory({ quoteReference: { connect: { id: result.id } }, description: this.events.EVENT_QUOTE_CREATE });
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
    async udpate({ data, id }) {
        try {
            const resultPromise = this.model.update({ data, filter: { id } });
            await this.CreateHistory({ quoteReference: { connect: { id } }, description: this.events.EVENT_QUOTE_UPDATE });
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
            await this.CreateHistory({ quoteReference: { connect: { id } }, description: this.events.EVENT_QUOTE_DELETE });
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
        return [`Nutricionista`, `Paciente`, `Listas de intercambio`, `Menús`, `Historial`];
    }
    HeaderListExtract() {
        return [`nutricionistReference.email`, `patientReference.email`, `_count.exchange`, `_count.menus`, `_count.history`];
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
            path: `/quote/create`,
            fields: [
                {
                    beforeType: `text`,
                    type: `input`,
                    id: ``,
                    label: ``,
                    name: ``,
                    placeholder: ``,
                    required: true
                }
            ]
        };
    }
    async formUpdate() { }
    async formDelete() { }
    getActionsList(actions) {
        const permit = this.getPermits();
        const propietary = this.getPermitsPropietary();
        const customActions = [];
        if (actions.includes(permit.list) || actions.includes(propietary.list))
            customActions.push({ ico: `list`, label: `Lista`, path: `/dashboard/quote`, use: `page` });
        if (actions.includes(permit.create))
            customActions.push({ ico: `create`, label: `Crear`, path: `/dashboard/quote/create`, use: `page` });
        return customActions;
    }
    getActionsUnique(actions) {
        const permit = this.getPermits();
        const propietary = this.getPermitsPropietary();
        const customActions = [];
        if (actions.includes(permit.list) || actions.includes(propietary.list))
            customActions.push({ ico: `unique`, label: `Ver`, path: `/dashboard/user`, use: `page` });
        if (actions.includes(permit.delete))
            customActions.push({ ico: `delete`, label: `Eliminar`, path: `/dashboard/user`, use: `modal` });
        if (actions.includes(permit.udpate))
            customActions.push({ ico: `update`, label: `Actualizar`, path: `/dashboard/user`, use: `modal` });
        return customActions;
    }
    getPermits() {
        return {
            list: this.permit.APP_PERMIT_QUOTE_LIST ? this.permit.APP_PERMIT_QUOTE_LIST : undefined,
            create: this.permit.APP_PERMIT_QUOTE_CREATE ? this.permit.APP_PERMIT_QUOTE_CREATE : undefined,
            delete: this.permit.APP_PERMIT_QUOTE_DELETE ? this.permit.APP_PERMIT_QUOTE_DELETE : undefined,
            recovery: this.permit.APP_PERMIT_QUOTE_RECOVERY ? this.permit.APP_PERMIT_QUOTE_RECOVERY : undefined,
            udpate: this.permit.APP_PERMIT_QUOTE_UPDATE ? this.permit.APP_PERMIT_QUOTE_UPDATE : undefined,
        };
    }
    getPermitsPropietary() {
        return {
            list: this.permit.APP_PERMIT_PROPIETARY_QUOTE_LIST ? this.permit.APP_PERMIT_PROPIETARY_QUOTE_LIST : undefined,
            create: this.permit.APP_PERMIT_PROPIETARY_QUOTE_CREATE ? this.permit.APP_PERMIT_PROPIETARY_QUOTE_CREATE : undefined,
            delete: this.permit.APP_PERMIT_PROPIETARY_QUOTE_DELETE ? this.permit.APP_PERMIT_PROPIETARY_QUOTE_DELETE : undefined,
            recovery: this.permit.APP_PERMIT_PROPIETARY_QUOTE_RECOVERY ? this.permit.APP_PERMIT_PROPIETARY_QUOTE_RECOVERY : undefined,
            udpate: this.permit.APP_PERMIT_PROPIETARY_QUOTE_UPDATE ? this.permit.APP_PERMIT_PROPIETARY_QUOTE_UPDATE : undefined,
        };
    }
    async CreateHistory(data) {
        return await this.prisma.historyQuote.create({ data });
    }
    async PaginateHistory({ skip, take, filter }) {
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
                    header: [`Creación`, `Descripción`],
                    extrat: [`createAt`, `description`],
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
    async createPhotoHistory({ data, quote }) {
        const resultPromise = this.prisma.historyPhoto.create({
            data
        });
        await this.CreateHistory({ quoteReference: { connect: { id: quote } }, description: this.events.EVENT_ASSING_FOOD_UPDATE });
        return await resultPromise;
    }
    async PaginatePhoto({ skip, take, filter }) {
        try {
            const resultPromise = this.model.findAllHistoryPhoto({ filter, skip, take });
            const countPromise = this.model.countHistoryPhoto({ filter });
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
                    header: [`Creación`, `Descripción`],
                    extrat: [`createAt`, `description`],
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
};
QuoteService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [AppActions_1.default,
        quote_model_1.default,
        prisma_service_1.PrismaService,
        AppEvent_1.default,
        languaje_service_1.LanguajeService])
], QuoteService);
exports.default = QuoteService;
//# sourceMappingURL=quote.service.js.map