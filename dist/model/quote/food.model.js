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
let FoodAllModel = class FoodAllModel {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create({ data }) {
        const result = this.prisma.foodAll.create({ data });
        return result;
    }
    async findAll({ skip, take, filter, select }) {
        const result = this.prisma.foodAll.findMany({
            skip,
            take,
            where: filter,
            include: {
                foodReference: true,
                quoteReference: {
                    include: {
                        nutricionistReference: true,
                        patientReference: true
                    }
                }
            }
        });
        return result;
    }
    async find({ filter, select }) {
        const result = this.prisma.foodAll.findFirst({
            where: filter,
            include: {
                foodReference: true,
                quoteReference: true
            }
        });
        return result;
    }
    async count({ filter }) {
        const result = this.prisma.foodAll.count({
            where: filter,
        });
        return result;
    }
    async update({ filter, data }) {
        const result = this.prisma.foodAll.update({
            data,
            where: filter
        });
        return result;
    }
    async softDelete({ id }) {
        const date = new Date();
        const result = this.prisma.foodAll.update({
            data: { isDelete: true },
            where: { id }
        });
        return result;
    }
    async recovery({ id }) {
        const result = this.prisma.foodAll.update({
            data: { isDelete: false },
            where: { id }
        });
        return result;
    }
};
FoodAllModel = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FoodAllModel);
exports.default = FoodAllModel;
//# sourceMappingURL=food.model.js.map