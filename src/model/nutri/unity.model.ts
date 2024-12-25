import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export default class UnityMeasureModel {

    constructor (
        private prisma: PrismaService
    ) {}

    public async create ({data}: {data:Prisma.UnityMeasureCreateInput}) {
        const result = this.prisma.unityMeasure.create({ data });
        // estadistica
        return result;
    }

    public async findAll({ skip, take, filter, select }: { skip?:number,take?:number,filter?:Prisma.UnityMeasureWhereInput, select?:Prisma.UserSelect }) {
        const result = this.prisma.unityMeasure.findMany({ 
            skip, 
            take, 
            where: filter, 
            include: {
                _count: true,
                createByReference: true,
            }
        });

        return result;
    }

    public async find({ filter, select }: { filter?:Prisma.UnityMeasureWhereInput, select?:Prisma.UserSelect }) {
        const result = this.prisma.unityMeasure.findFirst({ 
            where: filter, 
            include: {
                createByReference: true,
                _count: true,
            }
        });

        return result;
    }

    public async count({ filter }: { filter?:Prisma.UnityMeasureWhereInput }) {
        const result = this.prisma.unityMeasure.count({ 
            where: filter,
        });

        return result;
    }

    public async update({ filter, data }: { filter?:Prisma.UnityMeasureWhereUniqueInput, data: Prisma.UnityMeasureUpdateInput}) {
        const result = this.prisma.unityMeasure.update({
            data,
            where: filter
        });
        // estadistica
        return result;
    }

    public async softDelete({ id }: { id:string }) {
        const date = new Date();
        const result = this.prisma.unityMeasure.update({
            data: { isDelete: true },
            where: { id }
        });
        // estadistica
        return result;
    }

    public async recovery({ id }: { id:string }) {
        const result = this.prisma.unityMeasure.update({
            data: { isDelete: false },
            where: { id }
        });
        // estadistica
        return result;
    }
}
