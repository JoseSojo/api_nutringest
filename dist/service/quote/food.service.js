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
const food_model_1 = require("../../model/quote/food.model");
const AppActions_1 = require("../../AppActions");
const languaje_service_1 = require("../../languaje/languaje.service");
let FoodAllService = class FoodAllService {
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
                    headerMin: this.HeaderMinList(),
                    extrat: this.HeaderListExtract(),
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
    HeaderMinList() {
        return [`Tipo`, `Alimento`,];
    }
    HeaderMinListExtract() {
        return [`type`, `foodReference.name`];
    }
    HeaderList() {
        return [`Tipo`, `Alimento`, `Cita Nutricionista`, `Cita Paciente`];
    }
    HeaderListExtract() {
        return [`type`, `foodReference.name`, `quoteReference.nutricionistReference.email`, `quoteReference.patientReference.email`];
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
            path: `/food/create`,
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
    getActionsUniqueInQuote(actions, p) {
        const permit = p ? this.getPermitsPropietary() : this.getPermits();
        const customActions = [];
        if (actions.includes(permit.list))
            customActions.push({ ico: `unique`, label: `Ver`, path: `/dashboard/user`, use: `page` });
        if (actions.includes(permit.udpate))
            customActions.push({ ico: `remove`, label: `Remover`, path: `/dashboard/user`, use: `modal` });
        return customActions;
    }
    getPermits() {
        return {
            list: this.permit.APP_PERMIT_FOOD_LIST ? this.permit.APP_PERMIT_FOOD_LIST : undefined,
            create: this.permit.APP_PERMIT_FOOD_CREATE ? this.permit.APP_PERMIT_FOOD_CREATE : undefined,
            delete: this.permit.APP_PERMIT_FOOD_DELETE ? this.permit.APP_PERMIT_FOOD_DELETE : undefined,
            recovery: this.permit.APP_PERMIT_FOOD_RECOVERY ? this.permit.APP_PERMIT_FOOD_RECOVERY : undefined,
            udpate: this.permit.APP_PERMIT_FOOD_UPDATE ? this.permit.APP_PERMIT_FOOD_UPDATE : undefined,
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
};
FoodAllService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [AppActions_1.default,
        food_model_1.default,
        languaje_service_1.LanguajeService])
], FoodAllService);
exports.default = FoodAllService;
//# sourceMappingURL=food.service.js.map