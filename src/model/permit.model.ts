import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export default class PermitModel {

    constructor (
        private prisma: PrismaService
    ) {}

    public async create ({data}: {data:Prisma.PermitsCreateInput}) {
        const result = this.prisma.permits.create({ data });
        // estadistica
        return result;
    }

    public async findAll({ skip, take, filter, select }: { skip?:number,take?:number,filter?:Prisma.PermitsWhereInput, select?:Prisma.UserSelect }) {
        const result = this.prisma.permits.findMany({ 
            skip, 
            take, 
            where: filter, 
            include: {
                _count: true,
                createByReference: true
            }
        });

        return result;
    }

    public async find({ filter, select }: { filter?:Prisma.PermitsWhereInput, select?:Prisma.UserSelect }) {
        const result = this.prisma.permits.findFirst({ 
            where: filter, 
            include: {
                createByReference: true
            }
        });

        return result;
    }

    public async count({ filter }: { filter?:Prisma.PermitsWhereInput }) {
        const result = this.prisma.permits.count({ 
            where: filter,
        });

        return result;
    }

    public async update({ filter, data }: { filter?:Prisma.PermitsWhereUniqueInput, data: Prisma.PermitsUpdateInput}) {
        const result = this.prisma.permits.update({
            data,
            where: filter
        });
        // estadistica
        return result;
    }

    public async softDelete({ id }: { id:string }) {
        const date = new Date();
        const result = this.prisma.permits.update({
            data: { isDelete: true },
            where: { id }
        });
        // estadistica
        return result;
    }

    public async recovery({ id }: { id:string }) {
        const result = this.prisma.permits.update({
            data: { isDelete: false },
            where: { id }
        });
        // estadistica
        return result;
    }
}
