import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export default class CalendarModel {

    constructor(
        private prisma: PrismaService
    ) { }

    public async create({ data }: { data: Prisma.CalendarCreateInput }) {
        const result = this.prisma.calendar.create({ data });
        // estadistica
        return result;
    }

    public async findForMonthAll({ month, year, status, quote, user }: { user?:string,quote?: string, status: string, month: number, year: number }) {
        
        const where: Prisma.CalendarWhereInput[] = [];

        where.push({ monthNumber: month });
        where.push({ year: year });
        if(quote) where.push({ quoteId:quote });
        if(status) where.push({ status:status });
        if(user) where.push({ createById:user });

        const result = this.prisma.calendar.groupBy({
            by: ['day'],
            where: { AND: where },
            _count: {
                day: true, // Contar cuántas citas hay por día
            }
        });

        return result;
    }

    public async findAll({ skip, take, filter, select }: { skip?: number, take?: number, filter?: Prisma.CalendarWhereInput, select?: Prisma.UserSelect }) {
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

    public async find({ filter, select }: { filter?: Prisma.CalendarWhereInput, select?: Prisma.UserSelect }) {
        const result = this.prisma.calendar.findFirst({
            where: filter,
            include: {
                createByReference: true,
                quoteReference: true
            }
        });

        return result;
    }

    public async count({ filter }: { filter?: Prisma.CalendarWhereInput }) {
        const result = this.prisma.calendar.count({
            where: filter,
        });

        return result;
    }

    public async update({ filter, data }: { filter?: Prisma.CalendarWhereUniqueInput, data: Prisma.CalendarUpdateInput }) {
        const result = this.prisma.calendar.update({
            data,
            where: filter
        });
        // estadistica
        return result;
    }

    public async softDelete({ id }: { id: string }) {
        const date = new Date();
        const result = this.prisma.calendar.update({
            data: { isDelete: true },
            where: { id }
        });
        // estadistica
        return result;
    }

    public async recovery({ id }: { id: string }) {
        const result = this.prisma.calendar.update({
            data: { isDelete: false },
            where: { id }
        });
        // estadistica
        return result;
    }

    // HISTORY STATUS
    public async createHistory({ data }: { data: Prisma.CalendarHistoryStatusCreateInput }) {
        const result = this.prisma.calendarHistoryStatus.create({ data });
        // estadistica
        return result;
    }

    public async findAllHistory({ skip, take, filter, select }: { skip?: number, take?: number, filter?: Prisma.CalendarHistoryStatusWhereInput, select?: Prisma.UserSelect }) {
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

    public async countHistory({ filter }: { filter?: Prisma.CalendarHistoryStatusWhereInput }) {
        const result = this.prisma.calendarHistoryStatus.count({
            where: { AND: [{ ...filter }, { isDelete: false }] },
        });

        return result;
    }

    public async softDeleteHistory({ id }: { id: string }) {
        const date = new Date();
        const result = this.prisma.calendarHistoryStatus.update({
            data: { isDelete: true },
            where: { id }
        });
        // estadistica
        return result;
    }

    public async recoveryHistory({ id }: { id: string }) {
        const result = this.prisma.calendarHistoryStatus.update({
            data: { isDelete: false },
            where: { id }
        });
        // estadistica
        return result;
    }
}
