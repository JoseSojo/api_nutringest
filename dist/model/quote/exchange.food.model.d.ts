import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";
export default class ExchangeListFoodModel {
    private prisma;
    constructor(prisma: PrismaService);
    create({ data }: {
        data: Prisma.ExchangeListFoodsCreateInput;
    }): Promise<{
        id: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        ration: string | null;
        unityMeasureId: string | null;
        exchangeListId: string;
        foodId: string;
    }>;
    findAll({ skip, take, filter, select }: {
        skip?: number;
        take?: number;
        filter?: Prisma.ExchangeListFoodsWhereInput;
        select?: Prisma.UserSelect;
    }): Promise<({
        unityMeasureReference: {
            id: string;
            name: string;
            createById: string;
            isDelete: boolean;
            createAt: Date;
            updateAt: Date;
            abr: string;
        };
        foodReference: {
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
        };
    } & {
        id: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        ration: string | null;
        unityMeasureId: string | null;
        exchangeListId: string;
        foodId: string;
    })[]>;
    find({ filter, select }: {
        filter?: Prisma.ExchangeListFoodsWhereInput;
        select?: Prisma.UserSelect;
    }): Promise<{
        unityMeasureReference: {
            id: string;
            name: string;
            createById: string;
            isDelete: boolean;
            createAt: Date;
            updateAt: Date;
            abr: string;
        };
        foodReference: {
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
        };
    } & {
        id: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        ration: string | null;
        unityMeasureId: string | null;
        exchangeListId: string;
        foodId: string;
    }>;
    count({ filter }: {
        filter?: Prisma.ExchangeListFoodsWhereInput;
    }): Promise<number>;
    update({ filter, data }: {
        filter?: Prisma.ExchangeListFoodsWhereUniqueInput;
        data: Prisma.ExchangeListFoodsUpdateInput;
    }): Promise<{
        id: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        ration: string | null;
        unityMeasureId: string | null;
        exchangeListId: string;
        foodId: string;
    }>;
    softDelete({ id }: {
        id: string;
    }): Promise<{
        id: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        ration: string | null;
        unityMeasureId: string | null;
        exchangeListId: string;
        foodId: string;
    }>;
    delete({ id }: {
        id: string;
    }): Promise<{
        id: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        ration: string | null;
        unityMeasureId: string | null;
        exchangeListId: string;
        foodId: string;
    }>;
    recovery({ id }: {
        id: string;
    }): Promise<{
        id: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        ration: string | null;
        unityMeasureId: string | null;
        exchangeListId: string;
        foodId: string;
    }>;
}
