import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export default class ExchangeListModel {

    constructor (
        private prisma: PrismaService
    ) {}

    public async create ({data}: {data:Prisma.ExchangeListCreateInput}) {
        const result = this.prisma.exchangeList.create({ data });
        // estadistica
        return result;
    }

    public async findAll({ skip, take, filter, select }: { skip?:number,take?:number,filter?:Prisma.ExchangeListWhereInput, select?:Prisma.UserSelect }) {
        const result = this.prisma.exchangeList.findMany({ 
            skip, 
            take, 
            where: {...filter, isDelete: false}, 
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

    public async find({ filter, select }: { filter?:Prisma.ExchangeListWhereInput, select?:Prisma.UserSelect }) {
        const result = this.prisma.exchangeList.findFirst({ 
            where: filter, 
            include: {
                _count: true,
                exchange: true,
                foods: {
                    include: {
                        exchangeListReference: true,foodReference:true,unityMeasureReference:true
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

    public async count({ filter }: { filter?:Prisma.ExchangeListWhereInput }) {
        const result = this.prisma.exchangeList.count({ 
            where: {...filter, isDelete: false},
        });

        return result;
    }

    public async update({ filter, data }: { filter?:Prisma.ExchangeListWhereUniqueInput, data: Prisma.ExchangeListUpdateInput}) {
        const result = this.prisma.exchangeList.update({
            data,
            where: filter
        });
        // estadistica
        return result;
    }

    public async softDelete({ id }: { id:string }) {
        const date = new Date();
        const result = this.prisma.exchangeList.update({
            data: { isDelete: true },
            where: { id }
        });
        // estadistica
        return result;
    }

    public async recovery({ id }: { id:string }) {
        const result = this.prisma.exchangeList.update({
            data: { isDelete: false },
            where: { id }
        });
        // estadistica
        return result;
    }
}
