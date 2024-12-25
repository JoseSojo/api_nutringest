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
const AppActions_1 = require("../../AppActions");
const languaje_service_1 = require("../../languaje/languaje.service");
const subsccription_detail_model_1 = require("../../model/master/subsccription.detail.model");
const AppEvent_1 = require("../../AppEvent");
let ConfigSubscriptionHandlerService = class ConfigSubscriptionHandlerService {
    constructor(events, permit, model, prisma, languaje) {
        this.events = events;
        this.permit = permit;
        this.model = model;
        this.prisma = prisma;
        this.languaje = languaje;
        this.lang = languaje.GetTranslate();
    }
    async ChangeSubscription({ subscription, userId }) {
        const result = this.prisma.taskSeondPlanSubscription.create({
            data: {
                userReference: { connect: { id: userId } },
                task: this.events.CHANGE_SUSBCTION,
                extra: { to: subscription },
            }
        });
        return await result;
    }
    GetDateSubscription1Month() {
        const date = new Date();
        const start = {
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear()
        };
        const end = { ...start };
        end.month += 1;
        if (end.month > 12) {
            end.month = 1;
            end.year += 1;
        }
        const daysInMonth = new Date(end.year, end.month, 0).getDate();
        if (end.day > daysInMonth) {
            end.day = daysInMonth;
        }
        return { start, end };
    }
    GetDateSubscription3Month() {
        const date = new Date();
        const start = {
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear()
        };
        const end = { ...start };
        end.month += 3;
        if (end.month > 12) {
            end.month = end.month - 12;
            end.year += 1;
        }
        const daysInMonth = new Date(end.year, end.month, 0).getDate();
        if (end.day > daysInMonth) {
            end.day = daysInMonth;
        }
        return { start, end };
    }
    GetDateSubscription6Month() {
        const date = new Date();
        const start = {
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear()
        };
        const end = { ...start };
        end.month += 6;
        if (end.month > 12) {
            end.month = end.month - 12;
            end.year += 1;
        }
        const daysInMonth = new Date(end.year, end.month, 0).getDate();
        if (end.day > daysInMonth) {
            end.day = daysInMonth;
        }
        return { start, end };
    }
    GetDateSubscriptionYear() {
        const date = new Date();
        const start = {
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear()
        };
        const end = { ...start };
        end.year += 1;
        const daysInMonth = new Date(end.year, end.month, 0).getDate();
        if (end.day > daysInMonth) {
            end.day = daysInMonth;
        }
        return { start, end };
    }
    GetDateFreeTrial() {
        const date = new Date();
        const start = {
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear()
        };
        const end = { ...start };
        end.day += 5;
        while (true) {
            const daysInMonth = new Date(end.year, end.month, 0).getDate();
            if (end.day <= daysInMonth) {
                break;
            }
            end.day -= daysInMonth;
            end.month += 1;
            if (end.month > 12) {
                end.month = 1;
                end.year += 1;
            }
        }
        return { start, end };
    }
    async CreateSubscription({ data }) {
        const result = this.prisma.subscriptionInUser.create({ data });
        return await result;
    }
    async Create({ data }) {
        const result = this.prisma.subscriptionDetail.create({ data });
        return await result;
    }
    async FindMySub({ user }) {
        const responseModel = this.model.findMySubscription({ user });
        return await responseModel;
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
ConfigSubscriptionHandlerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [AppEvent_1.default,
        AppActions_1.default,
        subsccription_detail_model_1.default,
        prisma_service_1.PrismaService,
        languaje_service_1.LanguajeService])
], ConfigSubscriptionHandlerService);
exports.default = ConfigSubscriptionHandlerService;
//# sourceMappingURL=subsccription.detail.service.js.map