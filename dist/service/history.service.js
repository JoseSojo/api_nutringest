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
const AppActions_1 = require("../AppActions");
const languaje_service_1 = require("../languaje/languaje.service");
const prisma_service_1 = require("../prisma/prisma.service");
let HistoryService = class HistoryService {
    constructor(permit, prisma, languaje) {
        this.permit = permit;
        this.prisma = prisma;
        this.languaje = languaje;
        this.lang = languaje.GetTranslate();
    }
    async create(data) {
        const result = await this.prisma.history.create({ data });
        return result;
    }
    async paginate({ skip, take, filter }) {
        try {
            const resultPromise = this.prisma.history.findMany({ where: filter, skip, take });
            const countPromise = this.prisma.history.count({ where: filter });
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
    HeaderList() {
        return [`Nombre`, `Apellido`, `Usuario`, `Correo`, `Permisos`];
    }
    HeaderListExtract() {
        return [`name`, `lastname`, `username`, `email`, `rolReference.name`];
    }
    getPermits() {
        return {
            list: this.permit.APP_PERMIT_HISTORY_LIST ? this.permit.APP_PERMIT_HISTORY_LIST : undefined,
            create: this.permit.APP_PERMIT_HISTORY_CREATE ? this.permit.APP_PERMIT_HISTORY_CREATE : undefined,
            delete: undefined,
            recovery: undefined,
            udpate: undefined,
        };
    }
    getActionsList(actions) {
        const permit = this.getPermits();
        const customActions = [];
        if (actions.includes(permit.list))
            customActions.push({ ico: `list`, label: `Lista`, path: `/dashboard/history`, use: `page` });
        return customActions;
    }
};
HistoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [AppActions_1.default,
        prisma_service_1.PrismaService,
        languaje_service_1.LanguajeService])
], HistoryService);
exports.default = HistoryService;
//# sourceMappingURL=history.service.js.map