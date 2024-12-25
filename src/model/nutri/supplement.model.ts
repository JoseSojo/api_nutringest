import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export default class SupplementModel {

    constructor (
        private prisma: PrismaService
    ) {}

    public async create ({data}: {data:Prisma.SupplementCreateInput}) {
        const result = this.prisma.supplement.create({ data });
        // estadistica
        return result;
    }

    public async findAll({ skip, take, filter, select }: { skip?:number,take?:number,filter?:Prisma.SupplementWhereInput, select?:Prisma.UserSelect }) {
        const result = this.prisma.supplement.findMany({ 
            skip, 
            take, 
            where: filter, 
            include: {
                createByReference: true,
            }
        });

        return result;
    }

    public async find({ filter, select }: { filter?:Prisma.SupplementWhereInput, select?:Prisma.UserSelect }) {
        const result = this.prisma.supplement.findFirst({ 
            where: filter, 
            include: {
                createByReference: true,
                _count: {
                    select: {
                        presentaciones: true
                    }
                }
            }
        });

        return result;
    }

    public async count({ filter }: { filter?:Prisma.SupplementWhereInput }) {
        const result = this.prisma.supplement.count({ 
            where: filter,
        });

        return result;
    }

    public async update({ filter, data }: { filter?:Prisma.SupplementWhereUniqueInput, data: Prisma.SupplementUpdateInput}) {
        const result = this.prisma.supplement.update({
            data,
            where: filter
        });
        // estadistica
        return result;
    }

    public async softDelete({ id }: { id:string }) {
        const date = new Date();
        const result = this.prisma.supplement.update({
            data: { isDelete: true },
            where: { id }
        });
        // estadistica
        return result;
    }

    public async recovery({ id }: { id:string }) {
        const result = this.prisma.supplement.update({
            data: { isDelete: false },
            where: { id }
        });
        // estadistica
        return result;
    }
}
