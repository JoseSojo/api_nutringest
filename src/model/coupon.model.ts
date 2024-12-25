import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export default class CouponModel {

    constructor(
        private prisma: PrismaService
    ) { }

    public async create({ data }: { data: Prisma.CouponsCreateInput }) {
        const result = this.prisma.coupons.create({ data });
        // estadistica
        return result;
    }


    public async findAll({ skip, take, filter, select }: { skip?: number, take?: number, filter?: Prisma.CouponsWhereInput, select?: Prisma.UserSelect }) {
        const result = this.prisma.coupons.findMany({
            skip,
            take,
            where: filter,
            include: {
                propietaryReference: true
            }
        });

        return result;
    }

    public async find({ filter, select }: { filter?: Prisma.CouponsWhereInput, select?: Prisma.UserSelect }) {
        const result = this.prisma.coupons.findFirst({
            where: filter,
            include: {
                propietaryReference: true,
            }
        });

        return result;
    }

    public async count({ filter }: { filter?: Prisma.CouponsWhereInput }) {
        const result = this.prisma.coupons.count({
            where: filter,
        });

        return result;
    }

    public async update({ filter, data }: { filter?: Prisma.CouponsWhereUniqueInput, data: Prisma.CouponsUpdateInput }) {
        const result = this.prisma.coupons.update({
            data,
            where: filter
        });
        // estadistica
        return result;
    }

    public async softDelete({ id }: { id: string }) {
        const date = new Date();
        const result = this.prisma.coupons.update({
            data: { isDelete: true },
            where: { id }
        });
        // estadistica
        return result;
    }

    public async recovery({ id }: { id: string }) {
        const result = this.prisma.coupons.update({
            data: { isDelete: false },
            where: { id }
        });
        // estadistica
        return result;
    }
}
