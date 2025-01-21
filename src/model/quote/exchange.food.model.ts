import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export default class ExchangeListFoodModel {

    constructor (
        private prisma: PrismaService
    ) {}

    public async create ({data}: {data:Prisma.FoodExchangeListCreateInput}) {
        const result = this.prisma.foodExchangeList.create({ data });
        // estadistica
        return result;
    }

    public async findAll({ skip, take, filter, select }: { skip?:number,take?:number,filter?:Prisma.FoodExchangeListWhereInput, select?:Prisma.UserSelect }) {
        const result = this.prisma.foodExchangeList.findMany({ 
            skip, 
            take, 
            where: filter,
        });

        return result;
    }

    public async find({ filter, select }: { filter?:Prisma.FoodExchangeListWhereInput, select?:Prisma.UserSelect }) {
        const result = this.prisma.foodExchangeList.findFirst({ 
            where: filter, 
        });

        return result;
    }

    public async count({ filter }: { filter?:Prisma.FoodExchangeListWhereInput }) {
        const result = this.prisma.foodExchangeList.count({ 
            where: filter,
        });

        return result;
    }

    public async update({ filter, data }: { filter?:Prisma.FoodExchangeListWhereUniqueInput, data: Prisma.FoodExchangeListUpdateInput}) {
        const result = this.prisma.foodExchangeList.update({
            data,
            where: filter
        });
        // estadistica
        return result;
    }

    public async delete({ id }: { id:string }) {
        const result = this.prisma.foodExchangeList.delete({
            where: { id:Number(id) }
        });
        // estadistica
        return result;
    }
}
