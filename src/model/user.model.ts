import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export default class UserModel {

    constructor (
        private prisma: PrismaService
    ) {}

    public async create ({data}: {data:Prisma.UserCreateInput}) {
        const result = this.prisma.user.create({ data });
        // estadistica
        return result;
    }

    public async findAll({ skip, take, filter, select }: { skip?:number,take?:number,filter?:Prisma.UserWhereInput, select?:Prisma.UserSelect }) {
        const result = this.prisma.user.findMany({ 
            skip, 
            take, 
            where: filter, 
            include: {
                _count: true,
                rolReference: true
            }
        });

        return result;
    }

    public async find({ filter, select }: { filter?:Prisma.UserWhereInput, select?:Prisma.UserSelect }) {
        const result = this.prisma.user.findFirst({ 
            where: filter, 
            include: {
                patientData: true,
                cityReference: {
                    select: {
                        name: true,
                        id: true,
                        stateReference: {
                            select: {
                                name: true,
                                id: true,
                                countryReference: {
                                    select: {
                                        name: true,
                                        id: true
                                    }
                                }
                            }
                        }
                    }
                },
                rolReference: true,
                _count: true
            }
        });

        return result;
    }

    public async count({ filter }: { filter?:Prisma.UserWhereInput }) {
        const result = this.prisma.user.count({ 
            where: filter,
        });

        return result;
    }

    public async update({ filter, data }: { filter?:Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput}) {
        const result = this.prisma.user.update({
            data,
            where: filter
        });
        // estadistica
        return result;
    }

    public async softDelete({ id }: { id:string }) {
        const date = new Date();
        const result = await this.prisma.user.update({
            data: { isDelete: true },
            where: { id }
        });
        // estadistica
        return result;
    }

    public async recovery({ id }: { id:string }) {
        const result = this.prisma.user.update({
            data: { isDelete: false },
            where: { id }
        });
        // estadistica
        return result;
    }
}
