import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export default class ConfigCityModel {

    constructor (
        private prisma: PrismaService
    ) {}

    public async create ({data}: {data:Prisma.ConfigCityCreateInput}) {
        const result = this.prisma.configCity.create({ data });
        // estadistica
        return result;
    }

    public async findAll({ skip, take, filter, select }: { skip?:number,take?:number,filter?:Prisma.ConfigCityWhereInput, select?:Prisma.UserSelect }) {
        const result = this.prisma.configCity.findMany({ 
            skip, 
            take, 
            where: filter, 
            include: {
                _count: true,
                createByReference: true,
                stateReference: true
            }
        });

        return result;
    }

    public async find({ filter, select }: { filter?:Prisma.ConfigCityWhereInput, select?:Prisma.UserSelect }) {
        const result = this.prisma.configCity.findFirst({ 
            where: filter, 
            include: {
                createByReference: true,
                _count: true,
                stateReference: true,
                users: true
            }
        });

        return result;
    }

    public async count({ filter }: { filter?:Prisma.ConfigCityWhereInput }) {
        const result = this.prisma.configCity.count({ 
            where: filter,
        });

        return result;
    }

    public async update({ filter, data }: { filter?:Prisma.ConfigCityWhereUniqueInput, data: Prisma.ConfigCityUpdateInput}) {
        const result = this.prisma.configCity.update({
            data,
            where: filter
        });
        // estadistica
        return result;
    }

    public async softDelete({ id }: { id:string }) {
        const date = new Date();
        const result = this.prisma.configCity.update({
            data: { isDelete: true },
            where: { id }
        });
        // estadistica
        return result;
    }

    public async recovery({ id }: { id:string }) {
        const result = this.prisma.configCity.update({
            data: { isDelete: false },
            where: { id }
        });
        // estadistica
        return result;
    }
}
