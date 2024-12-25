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
let ExchangeListModel = class ExchangeListModel {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create({ data }) {
        const result = this.prisma.exchangeList.create({ data });
        return result;
    }
    async findAll({ skip, take, filter, select }) {
        const result = this.prisma.exchangeList.findMany({
            skip,
            take,
            where: { ...filter, isDelete: false },
            include: {
                _count: {
                    select: {
                        foods: true,
                        exchange: true
                    }
                },
                unityReference: true,
                userReference: true,
            }
        });
        return result;
    }
    async find({ filter, select }) {
        const result = this.prisma.exchangeList.findFirst({
            where: filter,
            include: {
                _count: true,
                exchange: true,
                foods: {
                    include: {
                        exchangeListReference: true, foodReference: true, unityMeasureReference: true
                    }
                },
                unityReference: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                userReference: true
            }
        });
        return result;
    }
    async count({ filter }) {
        const result = this.prisma.exchangeList.count({
            where: { ...filter, isDelete: false },
        });
        return result;
    }
    async update({ filter, data }) {
        const result = this.prisma.exchangeList.update({
            data,
            where: filter
        });
        return result;
    }
    async softDelete({ id }) {
        const date = new Date();
        const result = this.prisma.exchangeList.update({
            data: { isDelete: true },
            where: { id }
        });
        return result;
    }
    async recovery({ id }) {
        const result = this.prisma.exchangeList.update({
            data: { isDelete: false },
            where: { id }
        });
        return result;
    }
};
ExchangeListModel = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ExchangeListModel);
exports.default = ExchangeListModel;
//# sourceMappingURL=exchange.model.js.map