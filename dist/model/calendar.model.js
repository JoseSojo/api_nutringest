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
const prisma_service_1 = require("../prisma/prisma.service");
let CalendarModel = class CalendarModel {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create({ data }) {
        const result = this.prisma.calendar.create({ data });
        return result;
    }
    async findForMonthAll({ month, year, status, quote, user }) {
        const where = [];
        where.push({ monthNumber: month });
        where.push({ year: year });
        if (quote)
            where.push({ quoteId: quote });
        if (status)
            where.push({ status: status });
        if (user)
            where.push({ createById: user });
        const result = this.prisma.calendar.groupBy({
            by: ['day'],
            where: { AND: where },
            _count: {
                day: true,
            }
        });
        return result;
    }
    async findAll({ skip, take, filter, select }) {
        const result = this.prisma.calendar.findMany({
            skip,
            take,
            where: filter,
            include: {
                createByReference: {
                    select: {
                        name: true,
                        lastname: true,
                        email: true,
                        id: true
                    }
                },
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
        const result = this.prisma.calendar.findFirst({
            where: filter,
            include: {
                createByReference: true,
                quoteReference: true
            }
        });
        return result;
    }
    async count({ filter }) {
        const result = this.prisma.calendar.count({
            where: filter,
        });
        return result;
    }
    async update({ filter, data }) {
        const result = this.prisma.calendar.update({
            data,
            where: filter
        });
        return result;
    }
    async softDelete({ id }) {
        const date = new Date();
        const result = this.prisma.calendar.update({
            data: { isDelete: true },
            where: { id }
        });
        return result;
    }
    async recovery({ id }) {
        const result = this.prisma.calendar.update({
            data: { isDelete: false },
            where: { id }
        });
        return result;
    }
    async createHistory({ data }) {
        const result = this.prisma.calendarHistoryStatus.create({ data });
        return result;
    }
    async findAllHistory({ skip, take, filter, select }) {
        const result = this.prisma.calendarHistoryStatus.findMany({
            skip,
            take,
            where: { AND: [{ ...filter }, { isDelete: false }] },
            include: {
                createByReference: {
                    select: {
                        name: true,
                        lastname: true,
                        email: true,
                        id: true
                    }
                }
            }
        });
        return result;
    }
    async countHistory({ filter }) {
        const result = this.prisma.calendarHistoryStatus.count({
            where: { AND: [{ ...filter }, { isDelete: false }] },
        });
        return result;
    }
    async softDeleteHistory({ id }) {
        const date = new Date();
        const result = this.prisma.calendarHistoryStatus.update({
            data: { isDelete: true },
            where: { id }
        });
        return result;
    }
    async recoveryHistory({ id }) {
        const result = this.prisma.calendarHistoryStatus.update({
            data: { isDelete: false },
            where: { id }
        });
        return result;
    }
};
CalendarModel = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CalendarModel);
exports.default = CalendarModel;
//# sourceMappingURL=calendar.model.js.map