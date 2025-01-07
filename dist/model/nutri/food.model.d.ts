import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";
export default class PrimitiveFoodModel {
    private prisma;
    constructor(prisma: PrismaService);
    create({ data }: {
        data: Prisma.PrimitiveFoodCreateInput;
    }): Promise<{
        id: string;
        name: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date;
        code: number;
        quantity: Prisma.Decimal;
        calorias: Prisma.Decimal;
        humed: Prisma.Decimal;
        proteina: Prisma.Decimal;
        fosforo: Prisma.Decimal;
        potasio: Prisma.Decimal;
        grasas: Prisma.Decimal;
        carbohidratosDisponibles: Prisma.Decimal;
        carbohidratosTotales: Prisma.Decimal;
        fibraTotal: Prisma.Decimal;
        fibraInsolub: Prisma.Decimal;
        cenizas: Prisma.Decimal;
        calcio: Prisma.Decimal;
        hierro: Prisma.Decimal;
        magnesio: Prisma.Decimal;
        zinc: Prisma.Decimal;
        cobre: Prisma.Decimal;
        sodio: Prisma.Decimal;
        vitaminaA: Prisma.Decimal;
        carotenoEquivTotal: Prisma.Decimal;
        tiamina: Prisma.Decimal;
        riboflavina: Prisma.Decimal;
        niacina: Prisma.Decimal;
        vitaminaB6: Prisma.Decimal;
        acidAscorb: Prisma.Decimal;
    }>;
    findAll({ skip, take, filter, select }: {
        skip?: number;
        take?: number;
        filter?: Prisma.PrimitiveFoodWhereInput;
        select?: Prisma.UserSelect;
    }): Promise<({
        _count: {
            foodAll: number;
            exchangeList: number;
            menuDetail: number;
        };
    } & {
        id: string;
        name: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date;
        code: number;
        quantity: Prisma.Decimal;
        calorias: Prisma.Decimal;
        humed: Prisma.Decimal;
        proteina: Prisma.Decimal;
        fosforo: Prisma.Decimal;
        potasio: Prisma.Decimal;
        grasas: Prisma.Decimal;
        carbohidratosDisponibles: Prisma.Decimal;
        carbohidratosTotales: Prisma.Decimal;
        fibraTotal: Prisma.Decimal;
        fibraInsolub: Prisma.Decimal;
        cenizas: Prisma.Decimal;
        calcio: Prisma.Decimal;
        hierro: Prisma.Decimal;
        magnesio: Prisma.Decimal;
        zinc: Prisma.Decimal;
        cobre: Prisma.Decimal;
        sodio: Prisma.Decimal;
        vitaminaA: Prisma.Decimal;
        carotenoEquivTotal: Prisma.Decimal;
        tiamina: Prisma.Decimal;
        riboflavina: Prisma.Decimal;
        niacina: Prisma.Decimal;
        vitaminaB6: Prisma.Decimal;
        acidAscorb: Prisma.Decimal;
    })[]>;
    find({ filter, select }: {
        filter?: Prisma.PrimitiveFoodWhereInput;
        select?: Prisma.UserSelect;
    }): Promise<{
        _count: {
            foodAll: number;
            exchangeList: number;
            menuDetail: number;
        };
    } & {
        id: string;
        name: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date;
        code: number;
        quantity: Prisma.Decimal;
        calorias: Prisma.Decimal;
        humed: Prisma.Decimal;
        proteina: Prisma.Decimal;
        fosforo: Prisma.Decimal;
        potasio: Prisma.Decimal;
        grasas: Prisma.Decimal;
        carbohidratosDisponibles: Prisma.Decimal;
        carbohidratosTotales: Prisma.Decimal;
        fibraTotal: Prisma.Decimal;
        fibraInsolub: Prisma.Decimal;
        cenizas: Prisma.Decimal;
        calcio: Prisma.Decimal;
        hierro: Prisma.Decimal;
        magnesio: Prisma.Decimal;
        zinc: Prisma.Decimal;
        cobre: Prisma.Decimal;
        sodio: Prisma.Decimal;
        vitaminaA: Prisma.Decimal;
        carotenoEquivTotal: Prisma.Decimal;
        tiamina: Prisma.Decimal;
        riboflavina: Prisma.Decimal;
        niacina: Prisma.Decimal;
        vitaminaB6: Prisma.Decimal;
        acidAscorb: Prisma.Decimal;
    }>;
    count({ filter }: {
        filter?: Prisma.PrimitiveFoodWhereInput;
    }): Promise<number>;
    update({ filter, data }: {
        filter?: Prisma.PrimitiveFoodWhereUniqueInput;
        data: Prisma.PrimitiveFoodUpdateInput;
    }): Promise<{
        id: string;
        name: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date;
        code: number;
        quantity: Prisma.Decimal;
        calorias: Prisma.Decimal;
        humed: Prisma.Decimal;
        proteina: Prisma.Decimal;
        fosforo: Prisma.Decimal;
        potasio: Prisma.Decimal;
        grasas: Prisma.Decimal;
        carbohidratosDisponibles: Prisma.Decimal;
        carbohidratosTotales: Prisma.Decimal;
        fibraTotal: Prisma.Decimal;
        fibraInsolub: Prisma.Decimal;
        cenizas: Prisma.Decimal;
        calcio: Prisma.Decimal;
        hierro: Prisma.Decimal;
        magnesio: Prisma.Decimal;
        zinc: Prisma.Decimal;
        cobre: Prisma.Decimal;
        sodio: Prisma.Decimal;
        vitaminaA: Prisma.Decimal;
        carotenoEquivTotal: Prisma.Decimal;
        tiamina: Prisma.Decimal;
        riboflavina: Prisma.Decimal;
        niacina: Prisma.Decimal;
        vitaminaB6: Prisma.Decimal;
        acidAscorb: Prisma.Decimal;
    }>;
    softDelete({ id }: {
        id: string;
    }): Promise<{
        id: string;
        name: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date;
        code: number;
        quantity: Prisma.Decimal;
        calorias: Prisma.Decimal;
        humed: Prisma.Decimal;
        proteina: Prisma.Decimal;
        fosforo: Prisma.Decimal;
        potasio: Prisma.Decimal;
        grasas: Prisma.Decimal;
        carbohidratosDisponibles: Prisma.Decimal;
        carbohidratosTotales: Prisma.Decimal;
        fibraTotal: Prisma.Decimal;
        fibraInsolub: Prisma.Decimal;
        cenizas: Prisma.Decimal;
        calcio: Prisma.Decimal;
        hierro: Prisma.Decimal;
        magnesio: Prisma.Decimal;
        zinc: Prisma.Decimal;
        cobre: Prisma.Decimal;
        sodio: Prisma.Decimal;
        vitaminaA: Prisma.Decimal;
        carotenoEquivTotal: Prisma.Decimal;
        tiamina: Prisma.Decimal;
        riboflavina: Prisma.Decimal;
        niacina: Prisma.Decimal;
        vitaminaB6: Prisma.Decimal;
        acidAscorb: Prisma.Decimal;
    }>;
    recovery({ id }: {
        id: string;
    }): Promise<{
        id: string;
        name: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date;
        code: number;
        quantity: Prisma.Decimal;
        calorias: Prisma.Decimal;
        humed: Prisma.Decimal;
        proteina: Prisma.Decimal;
        fosforo: Prisma.Decimal;
        potasio: Prisma.Decimal;
        grasas: Prisma.Decimal;
        carbohidratosDisponibles: Prisma.Decimal;
        carbohidratosTotales: Prisma.Decimal;
        fibraTotal: Prisma.Decimal;
        fibraInsolub: Prisma.Decimal;
        cenizas: Prisma.Decimal;
        calcio: Prisma.Decimal;
        hierro: Prisma.Decimal;
        magnesio: Prisma.Decimal;
        zinc: Prisma.Decimal;
        cobre: Prisma.Decimal;
        sodio: Prisma.Decimal;
        vitaminaA: Prisma.Decimal;
        carotenoEquivTotal: Prisma.Decimal;
        tiamina: Prisma.Decimal;
        riboflavina: Prisma.Decimal;
        niacina: Prisma.Decimal;
        vitaminaB6: Prisma.Decimal;
        acidAscorb: Prisma.Decimal;
    }>;
}
