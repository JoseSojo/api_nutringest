import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export default class PaymentMethodModel {

    constructor (
        private prisma: PrismaService
    ) {}

    public async create ({data}: {data:Prisma.PaymentMethodCreateInput}) {
        const result = this.prisma.paymentMethod.create({ data });
        // estadistica
        return result;
    }

    public async findAll({ skip, take, filter, select }: { skip?:number,take?:number,filter?:Prisma.PaymentMethodWhereInput, select?:Prisma.UserSelect }) {
        const result = this.prisma.paymentMethod.findMany({ 
            skip, 
            take, 
            where: filter, 
            include: {
                createByReference: true,
                moneyReference: true
            }
        });

        return result;
    }

    public async find({ filter, select }: { filter?:Prisma.PaymentMethodWhereInput, select?:Prisma.UserSelect }) {
        const result = this.prisma.paymentMethod.findFirst({ 
            where: filter, 
            include: {
                createByReference: true,
                moneyReference: true
            }
        });

        return result;
    }

    public async count({ filter }: { filter?:Prisma.PaymentMethodWhereInput }) {
        const result = this.prisma.paymentMethod.count({ 
            where: filter,
        });

        return result;
    }

    public async update({ filter, data }: { filter?:Prisma.PaymentMethodWhereUniqueInput, data: Prisma.PaymentMethodUpdateInput}) {
        const result = this.prisma.paymentMethod.update({
            data,
            where: filter
        });
        // estadistica
        return result;
    }

    public async softDelete({ id }: { id:string }) {
        const date = new Date();
        const result = this.prisma.paymentMethod.update({
            data: { isDelete: true },
            where: { id }
        });
        // estadistica
        return result;
    }

    public async recovery({ id }: { id:string }) {
        const result = this.prisma.paymentMethod.update({
            data: { isDelete: false },
            where: { id }
        });
        // estadistica
        return result;
    }
}
