import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export default class ExchangeListFoodModel {

    constructor (
        private prisma: PrismaService
    ) {}

    public async create ({data}: {data:Prisma.ExchangeListFoodsCreateInput}) {
        const result = this.prisma.exchangeListFoods.create({ data });
        // estadistica
        return result;
    }

    public async findAll({ skip, take, filter, select }: { skip?:number,take?:number,filter?:Prisma.ExchangeListFoodsWhereInput, select?:Prisma.UserSelect }) {
        const result = this.prisma.exchangeListFoods.findMany({ 
            skip, 
            take, 
            where: filter, 
            include: {
                // exchangeListReference: true,
                foodReference: true,
                unityMeasureReference: true
            }
        });

        return result;
    }

    public async find({ filter, select }: { filter?:Prisma.ExchangeListFoodsWhereInput, select?:Prisma.UserSelect }) {
        const result = this.prisma.exchangeListFoods.findFirst({ 
            where: filter, 
            include: {
                unityMeasureReference: true,
                foodReference: true,
            }
        });

        return result;
    }

    public async count({ filter }: { filter?:Prisma.ExchangeListFoodsWhereInput }) {
        const result = this.prisma.exchangeListFoods.count({ 
            where: filter,
        });

        return result;
    }

    public async update({ filter, data }: { filter?:Prisma.ExchangeListFoodsWhereUniqueInput, data: Prisma.ExchangeListFoodsUpdateInput}) {
        const result = this.prisma.exchangeListFoods.update({
            data,
            where: filter
        });
        // estadistica
        return result;
    }

    public async softDelete({ id }: { id:string }) {
        const date = new Date();
        const result = this.prisma.exchangeListFoods.update({
            data: { isDelete: true },
            where: { id }
        });
        // estadistica
        return result;
    }

    public async delete({ id }: { id:string }) {
        const date = new Date();
        const result = this.prisma.exchangeListFoods.delete({
            where: { id }
        });
        // estadistica
        return result;
    }

    public async recovery({ id }: { id:string }) {
        const result = this.prisma.exchangeListFoods.update({
            data: { isDelete: false },
            where: { id }
        });
        // estadistica
        return result;
    }
}
