import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export default class PrimitiveFoodModel {

    constructor (
        private prisma: PrismaService
    ) {}

    public async create ({data}: {data:Prisma.PrimitiveFoodCreateInput}) {
        const result = this.prisma.primitiveFood.create({ data });
        // estadistica
        return result;
    }

    public async findAll({ skip, take, filter, select }: { skip?:number,take?:number,filter?:Prisma.PrimitiveFoodWhereInput, select?:Prisma.UserSelect }) {
        const result = this.prisma.primitiveFood.findMany({ 
            skip, 
            take, 
            where: filter, 
            include: {
                _count: true,
            }
        });

        return result;
    }

    public async find({ filter, select }: { filter?:Prisma.PrimitiveFoodWhereInput, select?:Prisma.UserSelect }) {
        const result = this.prisma.primitiveFood.findFirst({ 
            where: filter, 
            include: {
                _count: true
            }
        });

        return result;
    }

    public async count({ filter }: { filter?:Prisma.PrimitiveFoodWhereInput }) {
        const result = this.prisma.primitiveFood.count({ 
            where: filter,
        });

        return result;
    }

    public async update({ filter, data }: { filter?:Prisma.PrimitiveFoodWhereUniqueInput, data: Prisma.PrimitiveFoodUpdateInput}) {
        const result = this.prisma.primitiveFood.update({
            data,
            where: filter
        });
        // estadistica
        return result;
    }

    public async softDelete({ id }: { id:string }) {
        const date = new Date();
        const result = this.prisma.primitiveFood.update({
            data: { isDelete: true },
            where: { id }
        });
        // estadistica
        return result;
    }

    public async recovery({ id }: { id:string }) {
        const result = this.prisma.primitiveFood.update({
            data: { isDelete: false },
            where: { id }
        });
        // estadistica
        return result;
    }
}
