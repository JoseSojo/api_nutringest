import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";
export default class MenuFoodModel {
    private prisma;
    constructor(prisma: PrismaService);
    create({ data }: {
        data: Prisma.MenuDetailCreateInput;
    }): Promise<{
        id: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        unityMeasureId: string | null;
        quentity: number | null;
        menuId: string;
        foodPrimitiveId: string;
    }>;
    findAll({ skip, take, filter, select }: {
        skip?: number;
        take?: number;
        filter?: Prisma.MenuDetailWhereInput;
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
        menuReference: {
            id: string;
            name: string | null;
            createById: string | null;
            isDelete: boolean;
            createAt: Date;
            updateAt: Date | null;
            description: string | null;
            type: string;
        };
        foodPrimitiveReference: {
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
        unityMeasureId: string | null;
        quentity: number | null;
        menuId: string;
        foodPrimitiveId: string;
    })[]>;
    find({ filter, select }: {
        filter?: Prisma.MenuDetailWhereInput;
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
        menuReference: {
            id: string;
            name: string | null;
            createById: string | null;
            isDelete: boolean;
            createAt: Date;
            updateAt: Date | null;
            description: string | null;
            type: string;
        };
        foodPrimitiveReference: {
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
        unityMeasureId: string | null;
        quentity: number | null;
        menuId: string;
        foodPrimitiveId: string;
    }>;
    count({ filter }: {
        filter?: Prisma.MenuDetailWhereInput;
    }): Promise<number>;
    update({ filter, data }: {
        filter?: Prisma.MenuDetailWhereUniqueInput;
        data: Prisma.MenuDetailUpdateInput;
    }): Promise<{
        id: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        unityMeasureId: string | null;
        quentity: number | null;
        menuId: string;
        foodPrimitiveId: string;
    }>;
    softDelete({ id }: {
        id: string;
    }): Promise<{
        id: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        unityMeasureId: string | null;
        quentity: number | null;
        menuId: string;
        foodPrimitiveId: string;
    }>;
    delete({ id }: {
        id: string;
    }): Promise<{
        id: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        unityMeasureId: string | null;
        quentity: number | null;
        menuId: string;
        foodPrimitiveId: string;
    }>;
    recovery({ id }: {
        id: string;
    }): Promise<{
        id: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        unityMeasureId: string | null;
        quentity: number | null;
        menuId: string;
        foodPrimitiveId: string;
    }>;
}
