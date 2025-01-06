import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export default class MenuModel {

    constructor (
        private prisma: PrismaService
    ) {}

    public async create ({data}: {data:Prisma.MenuCreateInput}) {
        const result = this.prisma.menu.create({ data });
        // estadistica
        return result;
    }

    public async findAll({ skip, take, filter, select }: { skip?:number,take?:number,filter?:Prisma.MenuWhereInput, select?:Prisma.UserSelect }) {
        const result = this.prisma.menu.findMany({ 
            skip, 
            take, 
            where: {AND:[{...filter},{ isDelete:false }]}, 
            include: {
                _count: {
                    select: {
                        details: true,
                        foods: true
                    }
                },
                createByReference:true,
            }
        });

        return result;
    }

    public async find({ filter, select }: { filter?:Prisma.MenuWhereInput, select?:Prisma.UserSelect }) {
        const result = this.prisma.menu.findFirst({ 
            where: {AND:[{...filter},{ isDelete:false }]}, 
            include: {
                _count: true,
                createByReference: true,
                foods: {
                    include: {
                        foodPrimitiveReference: true,
                        unityMeasureReference: true
                    }
                }
            }
        });

        return result;
    }

    public async count({ filter }: { filter?:Prisma.MenuWhereInput }) {
        const result = this.prisma.menu.count({ 
            where: filter,
        });

        return result;
    }

    public async update({ filter, data }: { filter?:Prisma.MenuWhereUniqueInput, data: Prisma.MenuUpdateInput}) {
        const result = this.prisma.menu.update({
            data,
            where: filter
        });
        // estadistica
        return result;
    }

    public async softDelete({ id }: { id:string }) {
        const date = new Date();
        const result = this.prisma.menu.update({
            data: { isDelete: true },
            where: { id }
        });
        // estadistica
        return result;
    }

    public async delete({ id }: { id:string }) {
        const result = this.prisma.menuDetail.delete({
            where: { id }
        });
        // estadistica
        return result;
    }

    public async recovery({ id }: { id:string }) {
        const result = this.prisma.menu.update({
            data: { isDelete: false },
            where: { id }
        });
        // estadistica
        return result;
    }
}
