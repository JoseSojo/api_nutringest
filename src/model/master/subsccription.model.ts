import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export default class ConfigSubscriptionModel {

    constructor (
        private prisma: PrismaService
    ) {}

    public async create ({data}: {data:Prisma.SubscriptionCreateInput}) {
        const result = this.prisma.subscription.create({ data });
        // estadistica
        return result;
    }

    public async findAll({ skip, take, filter, select }: { skip?:number,take?:number,filter?:Prisma.SubscriptionWhereInput, select?:Prisma.UserSelect }) {
        const result = this.prisma.subscription.findMany({ 
            skip, 
            take, 
            where: filter, 
            include: {
                _count: true,
                createByReference: true,
                details: true,
            },
            orderBy: {
                defaultMount: "desc"
            }
        });

        return result;
    }

    public async find({ filter, select }: { filter?:Prisma.SubscriptionWhereInput, select?:Prisma.UserSelect }) {
        const result = this.prisma.subscription.findFirst({ 
            where: filter, 
            include: {
                _count: true,
                createByReference: true,
                details: true,
            }
        });

        return result;
    }

    public async count({ filter }: { filter?:Prisma.SubscriptionWhereInput }) {
        const result = this.prisma.subscription.count({ 
            where: filter,
        });

        return result;
    }

    public async update({ filter, data }: { filter?:Prisma.SubscriptionWhereUniqueInput, data: Prisma.SubscriptionUpdateInput}) {
        const result = this.prisma.subscription.update({
            data,
            where: filter
        });
        // estadistica
        return result;
    }

    public async softDelete({ id }: { id:string }) {
        const date = new Date();
        const result = this.prisma.subscription.update({
            data: { isDelete: true },
            where: { id }
        });
        // estadistica
        return result;
    }

    public async recovery({ id }: { id:string }) {
        const result = this.prisma.subscription.update({
            data: { isDelete: false },
            where: { id }
        });
        // estadistica
        return result;
    }
}
