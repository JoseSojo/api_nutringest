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
const subsccription_model_1 = require("../../model/master/subsccription.model");
const AppActions_1 = require("../../AppActions");
const languaje_service_1 = require("../../languaje/languaje.service");
let ConfigSubscriptionService = class ConfigSubscriptionService {
    constructor(permit, model, prisma, languaje) {
        this.permit = permit;
        this.model = model;
        this.prisma = prisma;
        this.languaje = languaje;
        this.lang = languaje.GetTranslate();
    }
    async findAllDetails(id) {
        return await this.prisma.subscriptionDetail.findMany({ where: { AND: [{ subscriptionId: id }, { isDelete: false }] } });
    }
    async deleteDetails({ id }) {
        return await this.prisma.subscriptionDetail.delete({ where: { id } });
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
        return [`Nombre`, `Meses`, `Monto`];
    }
    HeaderListExtract() {
        return [`name`, `countMonth`, `defaultMount`];
    }
    HeaderUnique() {
        return [`Nombre`, `Meses`, `Monto`];
    }
    HeaderUniqueExtract() {
        return [`name`, `countMonth`, `defaultMount`];
    }
    formCreate() {
        return {
            method: `POST`,
            name: `Crear`,
            path: `/subscription/create`,
            fields: [
                {
                    beforeType: `text`,
                    type: `input`,
                    id: `input.create.money.name`,
                    label: `Nombre`,
                    name: `name`,
                    placeholder: `Nombre`,
                    required: true
                }, {
                    beforeType: `text`,
                    type: `input`,
                    id: `input.create.money.countMonth`,
                    label: `Cantidad de meses`,
                    name: `countMonth`,
                    placeholder: ``,
                    required: true,
                }, {
                    beforeType: `number`,
                    type: `input`,
                    id: `input.create.money.defaultMount`,
                    label: `Costo`,
                    name: `defaultMount`,
                    placeholder: ``,
                    required: true,
                }
            ]
        };
    }
    formUpdate(data) {
        return {
            method: `PUT`,
            name: `Actualizar ${data.name}`,
            path: `/subscription/${data.id}/update`,
            fields: [
                {
                    beforeType: `text`,
                    type: `input`,
                    id: `input.update.money.name`,
                    label: `Nombre`,
                    name: `name`,
                    placeholder: data.name,
                    required: true,
                }, {
                    beforeType: `text`,
                    type: `input`,
                    id: `input.update.money.countMonth`,
                    label: `Cantidad de meses`,
                    name: `countMonth`,
                    placeholder: data.countMonth.toString(),
                    required: true,
                }, {
                    beforeType: `number`,
                    type: `input`,
                    id: `input.update.money.defaultMount`,
                    label: `Costo`,
                    name: `defaultMount`,
                    placeholder: data.defaultMount.toString(),
                    required: true,
                }
            ]
        };
    }
    async formDelete() { }
    getActionsList(actions) {
        const permit = this.getPermits();
        const customActions = [];
        if (actions.includes(permit.list))
            customActions.push({ ico: `list`, label: `Lista`, path: `/dashboard/user`, use: `page` });
        if (actions.includes(permit.create))
            customActions.push({ ico: `create`, label: `Crear`, path: `/dashboard/user`, use: `modal` });
        return customActions;
    }
    getActionsUnique(actions) {
        const permit = this.getPermits();
        const customActions = [];
        if (actions.includes(permit.list))
            customActions.push({ ico: `unique`, label: `Ver`, path: `/dashboard/user`, use: `page` });
        if (actions.includes(permit.delete))
            customActions.push({ ico: `delete`, label: `Eliminar`, path: `/dashboard/user`, use: `modal` });
        if (actions.includes(permit.udpate))
            customActions.push({ ico: `update`, label: `Actualizar`, path: `/dashboard/user`, use: `modal` });
        return customActions;
    }
    getPermits() {
        return {
            list: this.permit.APP_PERMIT_SUBSCRIPTION_LIST ? this.permit.APP_PERMIT_SUBSCRIPTION_LIST : undefined,
            create: this.permit.APP_PERMIT_SUBSCRIPTION_CREATE ? this.permit.APP_PERMIT_SUBSCRIPTION_CREATE : undefined,
            delete: this.permit.APP_PERMIT_SUBSCRIPTION_DELETE ? this.permit.APP_PERMIT_SUBSCRIPTION_DELETE : undefined,
            recovery: this.permit.APP_PERMIT_SUBSCRIPTION_RECOVERY ? this.permit.APP_PERMIT_SUBSCRIPTION_RECOVERY : undefined,
            udpate: this.permit.APP_PERMIT_SUBSCRIPTION_UPDATE ? this.permit.APP_PERMIT_SUBSCRIPTION_UPDATE : undefined,
        };
    }
};
ConfigSubscriptionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [AppActions_1.default,
        subsccription_model_1.default,
        prisma_service_1.PrismaService,
        languaje_service_1.LanguajeService])
], ConfigSubscriptionService);
exports.default = ConfigSubscriptionService;
//# sourceMappingURL=subsccription.service.js.map