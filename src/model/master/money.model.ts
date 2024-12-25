import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export default class ConfigMoneyModel {

    constructor (
        private prisma: PrismaService
    ) {}

    public async create ({data}: {data:Prisma.CoinCreateInput}) {
        const result = this.prisma.coin.create({ data });
        // estadistica
        return result;
    }

    public async findAll({ skip, take, filter, select }: { skip?:number,take?:number,filter?:Prisma.CoinWhereInput, select?:Prisma.UserSelect }) {
        const result = this.prisma.coin.findMany({ 
            skip, 
            take, 
            where: filter, 
            include: {
                _count: true,
                createByReference: true,
                country: true,
                paymentMethods: true
            }
        });

        return result;
    }

    public async find({ filter, select }: { filter?:Prisma.CoinWhereInput, select?:Prisma.UserSelect }) {
        const result = this.prisma.coin.findFirst({ 
            where: filter, 
            include: {
                createByReference: true,
                _count: true,
                country: true,
                paymentMethods: true
            }
        });

        return result;
    }

    public async count({ filter }: { filter?:Prisma.CoinWhereInput }) {
        const result = this.prisma.coin.count({ 
            where: filter,
        });

        return result;
    }

    public async update({ filter, data }: { filter?:Prisma.CoinWhereUniqueInput, data: Prisma.CoinUpdateInput}) {
        const result = this.prisma.coin.update({
            data,
            where: filter
        });
        // estadistica
        return result;
    }

    public async softDelete({ id }: { id:string }) {
        const date = new Date();
        const result = this.prisma.coin.update({
            data: { isDelete: true },
            where: { id }
        });
        // estadistica
        return result;
    }

    public async recovery({ id }: { id:string }) {
        const result = this.prisma.coin.update({
            data: { isDelete: false },
            where: { id }
        });
        // estadistica
        return result;
    }
}
