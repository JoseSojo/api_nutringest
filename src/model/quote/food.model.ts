import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export default class FoodAllModel {

    constructor (
        private prisma: PrismaService
    ) {}

    public async create ({data}: {data:Prisma.FoodAllCreateInput}) {
        const result = this.prisma.foodAll.create({ data });
        // estadistica
        return result;
    }

    public async findAll({ skip, take, filter, select }: { skip?:number,take?:number,filter?:Prisma.FoodAllWhereInput, select?:Prisma.UserSelect }) {
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

    public async find({ filter, select }: { filter?:Prisma.FoodAllWhereInput, select?:Prisma.UserSelect }) {
        const result = this.prisma.foodAll.findFirst({ 
            where: filter, 
            include: {
                foodReference: true,
                quoteReference: true
            }
        });

        return result;
    }

    public async count({ filter }: { filter?:Prisma.FoodAllWhereInput }) {
        const result = this.prisma.foodAll.count({ 
            where: filter,
        });

        return result;
    }

    public async update({ filter, data }: { filter?:Prisma.FoodAllWhereUniqueInput, data: Prisma.FoodAllUpdateInput}) {
        const result = this.prisma.foodAll.update({
            data,
            where: filter
        });
        // estadistica
        return result;
    }

    public async softDelete({ id }: { id:string }) {
        const date = new Date();
        const result = this.prisma.foodAll.update({
            data: { isDelete: true },
            where: { id }
        });
        // estadistica
        return result;
    }

    public async recovery({ id }: { id:string }) {
        const result = this.prisma.foodAll.update({
            data: { isDelete: false },
            where: { id }
        });
        // estadistica
        return result;
    }
}
