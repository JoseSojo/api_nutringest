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
const unity_model_1 = require("../../model/nutri/unity.model");
const AppActions_1 = require("../../AppActions");
const languaje_service_1 = require("../../languaje/languaje.service");
let UnityMeasureService = class UnityMeasureService {
    constructor(permit, model, languaje) {
        this.permit = permit;
        this.model = model;
        this.languaje = languaje;
        this.lang = languaje.GetTranslate();
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
        return [`Nombre`, `Abreviación`, `Creador`];
    }
    HeaderListExtract() {
        return [`name`, `abr`, `createByReference.email`];
    }
    HeaderUnique() {
        return [`Nombre`, `Abreviación`, `Creador`];
    }
    HeaderUniqueExtract() {
        return [`name`, `abr`, `createByReference.email`];
    }
    formCreate() {
        return {
            method: `POST`,
            name: `Crear`,
            path: `/unity/create`,
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
                    id: `input.create.money.abr`,
                    label: `Abrebiación`,
                    name: `abr`,
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
            path: `/unity/${data.id}/update`,
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
                    id: `input.update.money.abr`,
                    label: `Abrebiación`,
                    name: `abr`,
                    placeholder: data.abr,
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
            list: this.permit.APP_PERMIT_UNITY_MEASURE_LIST ? this.permit.APP_PERMIT_UNITY_MEASURE_LIST : undefined,
            create: this.permit.APP_PERMIT_UNITY_MEASURE_CREATE ? this.permit.APP_PERMIT_UNITY_MEASURE_CREATE : undefined,
            delete: this.permit.APP_PERMIT_UNITY_MEASURE_DELETE ? this.permit.APP_PERMIT_UNITY_MEASURE_DELETE : undefined,
            recovery: this.permit.APP_PERMIT_UNITY_MEASURE_RECOVERY ? this.permit.APP_PERMIT_UNITY_MEASURE_RECOVERY : undefined,
            udpate: this.permit.APP_PERMIT_UNITY_MEASURE_UPDATE ? this.permit.APP_PERMIT_UNITY_MEASURE_UPDATE : undefined,
        };
    }
};
UnityMeasureService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [AppActions_1.default,
        unity_model_1.default,
        languaje_service_1.LanguajeService])
], UnityMeasureService);
exports.default = UnityMeasureService;
//# sourceMappingURL=unity.service.js.map