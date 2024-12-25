import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export default class ConfigStateModel {

    constructor (
        private prisma: PrismaService
    ) {}

    public async create ({data}: {data:Prisma.ConfigStateCreateInput}) {
        const result = this.prisma.configState.create({ data });
        // estadistica
        return result;
    }

    public async findAll({ skip, take, filter, select }: { skip?:number,take?:number,filter?:Prisma.ConfigStateWhereInput, select?:Prisma.UserSelect }) {
        const result = this.prisma.configState.findMany({ 
            skip, 
            take, 
            where: filter, 
            include: {
                _count: true,
                createByReference: true,
                countryReference: true
            }
        });

        return result;
    }

    public async find({ filter, select }: { filter?:Prisma.ConfigStateWhereInput, select?:Prisma.UserSelect }) {
        const result = this.prisma.configState.findFirst({ 
            where: filter, 
            include: {
                createByReference: true,
                _count: true,
                countryReference: true
            }
        });

        return result;
    }

    public async count({ filter }: { filter?:Prisma.ConfigStateWhereInput }) {
        const result = this.prisma.configState.count({ 
            where: filter,
        });

        return result;
    }

    public async update({ filter, data }: { filter?:Prisma.ConfigStateWhereUniqueInput, data: Prisma.ConfigStateUpdateInput}) {
        const result = this.prisma.configState.update({
            data,
            where: filter
        });
        // estadistica
        return result;
    }

    public async softDelete({ id }: { id:string }) {
        const date = new Date();
        const result = this.prisma.configState.update({
            data: { isDelete: true },
            where: { id }
        });
        // estadistica
        return result;
    }

    public async recovery({ id }: { id:string }) {
        const result = this.prisma.configState.update({
            data: { isDelete: false },
            where: { id }
        });
        // estadistica
        return result;
    }
}
