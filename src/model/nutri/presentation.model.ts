import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export default class PresentationModel {

    constructor (
        private prisma: PrismaService
    ) {}

    public async create ({data}: {data:Prisma.PresentationCreateInput}) {
        const result = this.prisma.presentation.create({ data });
        // estadistica
        return result;
    }

    public async findAll({ skip, take, filter, select }: { skip?:number,take?:number,filter?:Prisma.PresentationWhereInput, select?:Prisma.UserSelect }) {
        const result = this.prisma.presentation.findMany({ 
            skip, 
            take, 
            where: filter, 
            include: {
                createByReference: true,
                SupplementReference: {
                    select: {
                        name: true,
                        id: true
                    }
                }
            }
        });

        return result;
    }

    public async find({ filter, select }: { filter?:Prisma.PresentationWhereInput, select?:Prisma.UserSelect }) {
        const result = this.prisma.presentation.findFirst({ 
            where: filter, 
            include: {
                createByReference: true,
                SupplementReference: {
                    select: {
                        name: true,
                        id: true
                    }
                }
            }
        });

        return result;
    }

    public async count({ filter }: { filter?:Prisma.PresentationWhereInput }) {
        const result = this.prisma.presentation.count({ 
            where: filter,
        });

        return result;
    }

    public async update({ filter, data }: { filter?:Prisma.PresentationWhereUniqueInput, data: Prisma.PresentationUpdateInput}) {
        const result = this.prisma.presentation.update({
            data,
            where: filter
        });
        // estadistica
        return result;
    }

    public async softDelete({ id }: { id:string }) {
        const date = new Date();
        const result = this.prisma.presentation.update({
            data: { isDelete: true },
            where: { id }
        });
        // estadistica
        return result;
    }

    public async recovery({ id }: { id:string }) {
        const result = this.prisma.presentation.update({
            data: { isDelete: false },
            where: { id }
        });
        // estadistica
        return result;
    }
}
