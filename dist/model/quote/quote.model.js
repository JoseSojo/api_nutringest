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
let QuoteModel = class QuoteModel {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create({ data }) {
        const result = this.prisma.quote.create({ data });
        return result;
    }
    async findAll({ skip, take, filter, select }) {
        const result = this.prisma.quote.findMany({
            skip,
            take,
            where: filter,
            include: {
                _count: {
                    select: {
                        exchange: true,
                        foodAllQuote: true,
                        history: true,
                        menus: true,
                    }
                },
                nutricionistReference: {
                    select: {
                        name: true,
                        lastname: true,
                        id: true,
                        email: true
                    }
                },
                patientReference: {
                    select: {
                        name: true,
                        lastname: true,
                        id: true,
                        email: true
                    }
                },
            }
        });
        return result;
    }
    async find({ filter, select }) {
        const result = this.prisma.quote.findFirst({
            where: filter,
            include: {
                _count: true,
                nutricionistReference: true,
                patientReference: true
            }
        });
        return result;
    }
    async count({ filter }) {
        const result = this.prisma.quote.count({
            where: filter,
        });
        return result;
    }
    async update({ filter, data }) {
        const result = this.prisma.quote.update({
            data,
            where: filter
        });
        return result;
    }
    async softDelete({ id }) {
        const date = new Date();
        const result = this.prisma.quote.update({
            data: { isDelete: true },
            where: { id }
        });
        return result;
    }
    async recovery({ id }) {
        const result = this.prisma.quote.update({
            data: { isDelete: false },
            where: { id }
        });
        return result;
    }
    async findAllHistory({ skip, take, filter }) {
        const result = this.prisma.historyQuote.findMany({
            skip,
            take,
            where: filter,
            orderBy: {
                createAt: "asc"
            }
        });
        return result;
    }
    async countHistory({ filter }) {
        const result = this.prisma.historyQuote.count({
            where: filter,
        });
        return result;
    }
    async findAllHistoryPhoto({ skip, take, filter }) {
        const result = this.prisma.historyPhoto.findMany({
            skip,
            take,
            where: filter,
            orderBy: {
                createAt: "asc"
            }
        });
        return result;
    }
    async countHistoryPhoto({ filter }) {
        const result = this.prisma.historyPhoto.count({
            where: filter,
        });
        return result;
    }
};
QuoteModel = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], QuoteModel);
exports.default = QuoteModel;
//# sourceMappingURL=quote.model.js.map