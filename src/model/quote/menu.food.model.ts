import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export default class MenuFoodModel {

    constructor (
        private prisma: PrismaService
    ) {}

    public async create ({data}: {data:Prisma.MenuDetailCreateInput}) {
        const result = this.prisma.menuDetail.create({ data });
        // estadistica
        return result;
    }

    public async findAll({ skip, take, filter, select }: { skip?:number,take?:number,filter?:Prisma.MenuDetailWhereInput, select?:Prisma.UserSelect }) {
        const result = this.prisma.menuDetail.findMany({ 
            skip, 
            take, 
            where: filter, 
            include: {
                foodPrimitiveReference: true,
                menuReference: true,
                unityMeasureReference: true,
            }
        });

        return result;
    }

    public async find({ filter, select }: { filter?:Prisma.MenuDetailWhereInput, select?:Prisma.UserSelect }) {
        const result = this.prisma.menuDetail.findFirst({ 
            where: filter, 
            include: {
                unityMeasureReference: true,
                foodPrimitiveReference: true,
                menuReference: true
            }
        });

        return result;
    }

    public async count({ filter }: { filter?:Prisma.MenuDetailWhereInput }) {
        const result = this.prisma.menuDetail.count({ 
            where: filter,
        });

        return result;
    }

    public async update({ filter, data }: { filter?:Prisma.MenuDetailWhereUniqueInput, data: Prisma.MenuDetailUpdateInput}) {
        const result = this.prisma.menuDetail.update({
            data,
            where: filter
        });
        // estadistica
        return result;
    }

    public async softDelete({ id }: { id:string }) {
        const date = new Date();
        const result = this.prisma.menuDetail.update({
            data: { isDelete: true },
            where: { id }
        });
        // estadistica
        return result;
    }

    public async delete({ id }: { id:string }) {
        const date = new Date();
        const result = this.prisma.menuDetail.delete({
            where: { id }
        });
        // estadistica
        return result;
    }

    public async recovery({ id }: { id:string }) {
        const result = this.prisma.menuDetail.update({
            data: { isDelete: false },
            where: { id }
        });
        // estadistica
        return result;
    }
}
