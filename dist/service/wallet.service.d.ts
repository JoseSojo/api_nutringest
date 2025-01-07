import { Prisma } from "@prisma/client";
import AppActions from "src/AppActions";
import { LanguajeService } from "src/languaje/languaje.service";
import CouponModel from "src/model/coupon.model";
import UserModel from "src/model/user.model";
import { PrismaService } from "src/prisma/prisma.service";
export default class WalletService {
    private prisma;
    private userModel;
    private permit;
    private model;
    private languaje;
    private lang;
    constructor(prisma: PrismaService, userModel: UserModel, permit: AppActions, model: CouponModel, languaje: LanguajeService);
    increment({ id, mount }: {
        id: string;
        mount: number;
    }): Promise<{
        id: string;
        mount: Prisma.Decimal;
        userId: string;
    }>;
    decrement({ id, mount }: {
        id: string;
        mount: number;
    }): Promise<{
        id: string;
        mount: Prisma.Decimal;
        userId: string;
    }>;
    get({ id, mount }: {
        id: string;
        mount: number;
    }): Promise<{
        id: string;
        mount: Prisma.Decimal;
        userId: string;
    }>;
    findUser({ id }: {
        id: string;
    }): Promise<{
        id: string;
        mount: Prisma.Decimal;
        userId: string;
    }>;
    create({ userId, mount, }: {
        userId: string;
        mount: number;
    }): Promise<{
        id: string;
        mount: Prisma.Decimal;
        userId: string;
    }>;
}
