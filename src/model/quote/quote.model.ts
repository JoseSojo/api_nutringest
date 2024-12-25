import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export default class QuoteModel {

    constructor (
        private prisma: PrismaService
    ) {}

    public async create ({data}: {data:Prisma.QuoteCreateInput}) {
        const result = this.prisma.quote.create({ data });
        // estadistica
        return result;
    }

    public async findAll({ skip, take, filter, select }: { skip?:number,take?:number,filter?:Prisma.QuoteWhereInput, select?:Prisma.UserSelect }) {
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

    public async find({ filter, select }: { filter?:Prisma.QuoteWhereInput, select?:Prisma.UserSelect }) {
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

    public async count({ filter }: { filter?:Prisma.QuoteWhereInput }) {
        const result = this.prisma.quote.count({ 
            where: filter,
        });

        return result;
    }

    public async update({ filter, data }: { filter?:Prisma.QuoteWhereUniqueInput, data: Prisma.QuoteUpdateInput}) {
        const result = this.prisma.quote.update({
            data,
            where: filter
        });
        // estadistica
        return result;
    }

    public async softDelete({ id }: { id:string }) {
        const date = new Date();
        const result = this.prisma.quote.update({
            data: { isDelete: true },
            where: { id }
        });
        // estadistica
        return result;
    }

    public async recovery({ id }: { id:string }) {
        const result = this.prisma.quote.update({
            data: { isDelete: false },
            where: { id }
        });
        // estadistica
        return result;
    }

    public async findAllHistory({ skip, take, filter }: { skip?:number,take?:number,filter?:Prisma.HistoryQuoteWhereInput }) {
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

    public async countHistory({ filter }: { filter?:Prisma.HistoryQuoteWhereInput }) {
        const result = this.prisma.historyQuote.count({ 
            where: filter,
        });

        return result;
    }

    public async findAllHistoryPhoto({ skip, take, filter }: { skip?:number,take?:number,filter?:Prisma.HistoryPhotoWhereInput }) {
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

    public async countHistoryPhoto({ filter }: { filter?:Prisma.HistoryPhotoWhereInput }) {
        const result = this.prisma.historyPhoto.count({ 
            where: filter,
        });

        return result;
    }
}
