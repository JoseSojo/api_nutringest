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
const user_model_1 = require("../model/user.model");
const bcrypt = require("bcrypt");
const AppActions_1 = require("../AppActions");
const languaje_service_1 = require("../languaje/languaje.service");
const prisma_service_1 = require("../prisma/prisma.service");
let UserService = class UserService {
    constructor(model, permit, prisma, languaje) {
        this.model = model;
        this.permit = permit;
        this.prisma = prisma;
        this.languaje = languaje;
        this.salt = 11;
        this.lang = languaje.GetTranslate();
    }
    async create({ data }) {
        try {
            const hashPassword = await this.Hash({ password: data.password });
            const resultPromise = this.model.create({
                data: {
                    ...data,
                    password: hashPassword
                }
            });
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
            const previw = skip < take ? false : true;
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
                body: {
                    data: result
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
    async createPaymentMethod({ data }) {
        try {
            const result = this.prisma.paymetInUser.create({ data });
            return {
                error: false,
                message: this.lang.ACTIONS.SUCCESS.CREATE,
                body: await result
            };
        }
        catch (error) {
            return {
                error: true,
                message: this.lang.ACTIONS.DANGER.CREATE
            };
        }
    }
    async paginatePayment({ skip, take, filter }) {
        try {
            const resultPromise = this.prisma.paymetInUser.findMany({ where: filter, skip, take, include: { paymentReference: true, userReference: true } });
            const countPromise = this.prisma.paymetInUser.count({ where: filter });
            const result = await resultPromise;
            const count = await countPromise;
            const next = skip + take > count ? false : true;
            const previw = skip < take ? false : true;
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
                    header: [`Método de pago`, `Propietario`, `Datos`],
                    extrat: [`paymentReference.name`, `userReference.email`, `description`],
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
    async Hash({ password }) {
        return await bcrypt.hash(password, this.salt);
    }
    async Compare({ password, dbPassword }) {
        return await bcrypt.compare(password, dbPassword);
    }
    async Finance({ payment, userId, mount, date }) {
        const result = this.prisma.paymentFinance.create({
            data: {
                date,
                mount,
                paymentInUser: { connect: { id: payment } },
                userReference: { connect: { id: userId } }
            }
        });
        return await result;
    }
    async FinanceUpdate({ id, status }) {
        const result = this.prisma.paymentFinance.update({
            data: {
                status
            },
            where: {
                id
            }
        });
        if (status === `APROVADO`) {
        }
        return await result;
    }
    async paginateFinance({ skip, take, filter }) {
        try {
            const resultPromise = this.prisma.paymentFinance.findMany({
                where: filter,
                skip,
                take,
                include: {
                    paymentInUser: {
                        include: {
                            paymentReference: true,
                            userReference: true,
                        },
                    },
                    userReference: true
                }
            });
            const countPromise = this.prisma.paymentFinance.count({ where: filter });
            const result = await resultPromise;
            const count = await countPromise;
            const next = skip + take > count ? false : true;
            const previw = skip < take ? false : true;
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
                    header: [`Estado`, `Método de pago`, `Monto`, `Fecha`],
                    extrat: [`status`, `paymentInUser.paymentReference.name`, `mount`, `createAt`],
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
    HeaderList() {
        return [`Nombre`, `Apellido`, `Usuario`, `Correo`, `Permisos`];
    }
    HeaderListExtract() {
        return [`name`, `lastname`, `username`, `email`, `rolReference.name`];
    }
    HeaderUnique() {
        return [`Nombre`, `Apellido`];
    }
    ExtractUnique() {
        return [`name`, `lastname`];
    }
    formCreate() {
        return {
            method: `POST`,
            name: `Crear`,
            path: `/user/create`,
            fields: [
                {
                    beforeType: `text`,
                    type: `input`,
                    id: `form.user.create.username`,
                    label: `Usuario`,
                    name: `username`,
                    placeholder: `steven001`,
                    required: true
                }, {
                    beforeType: `email`,
                    type: `input`,
                    id: `form.user.create.email`,
                    label: `Coreo`,
                    name: `email`,
                    placeholder: `steven001@gmail.com`,
                    required: true
                }, {
                    beforeType: `password`,
                    type: `input`,
                    id: `form.user.create.password`,
                    label: `Contraseña`,
                    name: `password`,
                    placeholder: `* * * * * * * * *`,
                    required: true
                }, {
                    beforeType: `text`,
                    type: `select`,
                    id: `form.user.create.permit`,
                    label: `Permiso`,
                    name: `rolId`,
                    placeholder: ``,
                    required: true,
                    select: {
                        active: true,
                        in: `permit`
                    }
                }
            ]
        };
    }
    formUpdate(user) {
        return {
            method: `POST`,
            name: `Crear`,
            path: `/user/${user.id}/update`,
            fields: [
                {
                    beforeType: `text`,
                    type: `input`,
                    id: `form.user.create.name`,
                    label: `Nombre`,
                    name: `name`,
                    placeholder: `${user.name ? user.name : ``}`,
                    required: true
                }, {
                    beforeType: `text`,
                    type: `input`,
                    id: `form.user.create.lastname`,
                    label: `Apellido`,
                    name: `lastname`,
                    placeholder: `${user.lastname ? user.lastname : ``}`,
                    required: true
                }, {
                    beforeType: `text`,
                    type: `input`,
                    id: `form.user.create.username`,
                    label: `Usuario`,
                    name: `username`,
                    placeholder: `${user.username ? user.username : ``}`,
                    required: true
                }, {
                    beforeType: `email`,
                    type: `input`,
                    id: `form.user.create.email`,
                    label: `Coreo`,
                    name: `email`,
                    placeholder: `${user.email ? user.email : ``}`,
                    required: true
                }, {
                    beforeType: `password`,
                    type: `input`,
                    id: `form.user.create.password`,
                    label: `Contraseña`,
                    name: `password`,
                    placeholder: `* * * * * * * * *`,
                    required: true
                }
            ]
        };
    }
    formDelete() { }
    getActionsList(actions) {
        const permit = this.getPermits();
        const customActions = [];
        if (actions.includes(permit.list))
            customActions.push({ ico: `list`, label: `Lista`, path: `/dashboard/user`, use: `page` });
        if (actions.includes(permit.create))
            customActions.push({ ico: `create`, label: `Crear`, path: `/dashboard/user`, use: `modal` });
        if (actions.includes(this.permit.APP_PERMIT_PROPIETARY_PATIENT))
            customActions.push({ ico: `create`, label: `Crear Paciente`, path: `/patient`, use: `page` });
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
    getActionsUniqueNutri(actions) {
        const permit = this.getPermitsNutricionist();
        const customActions = [];
        if (actions.includes(permit.list))
            customActions.push({ ico: `unique`, label: `Ver`, path: `/dashboard/user`, use: `page` });
        if (actions.includes(permit.delete))
            customActions.push({ ico: `delete`, label: `Eliminar`, path: `/dashboard/user`, use: `modal` });
        return customActions;
    }
    getActionsUniquePatient(actions) {
        const permit = this.getPermitsPaciente();
        const customActions = [];
        if (actions.includes(permit.list))
            customActions.push({ ico: `unique`, label: `Ver`, path: `/dashboard/user`, use: `page` });
        if (actions.includes(permit.delete))
            customActions.push({ ico: `delete`, label: `Eliminar`, path: `/dashboard/user`, use: `modal` });
        if (actions.includes(permit.udpate))
            customActions.push({ ico: `update`, label: `Actualizar`, path: `/dashboard/patient/update/`, use: `page` });
        return customActions;
    }
    getPermits() {
        return {
            list: this.permit.APP_PERMIT_USER_LIST ? this.permit.APP_PERMIT_USER_LIST : undefined,
            create: this.permit.APP_PERMIT_USER_CREATE ? this.permit.APP_PERMIT_USER_CREATE : undefined,
            delete: this.permit.APP_PERMIT_USER_DELETE ? this.permit.APP_PERMIT_USER_DELETE : undefined,
            recovery: this.permit.APP_PERMIT_USER_RECOVERY ? this.permit.APP_PERMIT_USER_RECOVERY : undefined,
            udpate: this.permit.APP_PERMIT_USER_UPDATE ? this.permit.APP_PERMIT_USER_UPDATE : undefined,
        };
    }
    getPermitsPaciente() {
        return {
            list: this.permit.APP_PERMIT_USER_SPECITY_NUTRICIONISTA ? this.permit.APP_PERMIT_USER_SPECITY_NUTRICIONISTA : undefined,
            create: undefined,
            delete: undefined,
            recovery: undefined,
            udpate: undefined,
        };
    }
    getPermitsNutricionist() {
        return {
            list: this.permit.APP_PERMIT_USER_SPECITY_PACIENTE ? this.permit.APP_PERMIT_USER_SPECITY_PACIENTE : undefined,
            create: this.permit.APP_PERMIT_USER_SPECITY_PACIENTE ? this.permit.APP_PERMIT_USER_SPECITY_PACIENTE : undefined,
            delete: this.permit.APP_PERMIT_USER_SPECITY_PACIENTE ? this.permit.APP_PERMIT_USER_SPECITY_PACIENTE : undefined,
            recovery: this.permit.APP_PERMIT_USER_SPECITY_PACIENTE ? this.permit.APP_PERMIT_USER_SPECITY_PACIENTE : undefined,
            udpate: undefined,
        };
    }
    async generateCode() {
        let code = this.getRandomCode();
        do {
            code = this.getRandomCode();
        } while (await this.model.find({ filter: { propietaryCode: code } }));
        return code;
    }
    getRandomCode() {
        const randomNum = Math.floor(Math.random() * 10000000);
        return randomNum.toString().padStart(7, '0');
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_model_1.default,
        AppActions_1.default,
        prisma_service_1.PrismaService,
        languaje_service_1.LanguajeService])
], UserService);
exports.default = UserService;
//# sourceMappingURL=user.service.js.map