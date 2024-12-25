import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export default class ConfigCountryModel {

    constructor (
        private prisma: PrismaService
    ) {}

    public async create ({data}: {data:Prisma.ConfigCountryCreateInput}) {
        const result = this.prisma.configCountry.create({ data });
        // estadistica
        return result;
    }

    public async findAll({ skip, take, filter, select }: { skip?:number,take?:number,filter?:Prisma.ConfigCountryWhereInput, select?:Prisma.UserSelect }) {
        const result = this.prisma.configCountry.findMany({ 
            skip, 
            take, 
            where: filter, 
            include: {
                _count: true,
                createByReference: true,
                coinReference: true
            }
        });

        return result;
    }

    public async find({ filter, select }: { filter?:Prisma.ConfigCountryWhereInput, select?:Prisma.UserSelect }) {
        const result = this.prisma.configCountry.findFirst({ 
            where: filter, 
            include: {
                createByReference: true
            }
        });

        return result;
    }

    public async count({ filter }: { filter?:Prisma.ConfigCountryWhereInput }) {
        const result = this.prisma.configCountry.count({ 
            where: filter,
        });

        return result;
    }

    public async update({ filter, data }: { filter?:Prisma.ConfigCountryWhereUniqueInput, data: Prisma.ConfigCountryUpdateInput}) {
        const result = this.prisma.configCountry.update({
            data,
            where: filter
        });
        // estadistica
        return result;
    }

    public async softDelete({ id }: { id:string }) {
        const date = new Date();
        const result = this.prisma.configCountry.update({
            data: { isDelete: true },
            where: { id }
        });
        // estadistica
        return result;
    }

    public async recovery({ id }: { id:string }) {
        const result = this.prisma.configCountry.update({
            data: { isDelete: false },
            where: { id }
        });
        // estadistica
        return result;
    }
}
