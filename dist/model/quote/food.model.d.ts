import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";
export default class FoodAllModel {
    private prisma;
    constructor(prisma: PrismaService);
    create({ data }: {
        data: Prisma.FoodAllCreateInput;
    }): Promise<{
        id: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        foodId: string;
        quoteId: string;
        type: string;
    }>;
    findAll({ skip, take, filter, select }: {
        skip?: number;
        take?: number;
        filter?: Prisma.FoodAllWhereInput;
        select?: Prisma.UserSelect;
    }): Promise<({
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
        quoteReference: {
            nutricionistReference: {
                id: string;
                name: string | null;
                isDelete: boolean;
                createAt: Date;
                updateAt: Date | null;
                email: string;
                username: string;
                password: string;
                ci: string | null;
                name2: string | null;
                lastname2: string | null;
                nacionality: string | null;
                email2: string | null;
                phone: string | null;
                phone2: string | null;
                propietaryCode: string;
                code: string | null;
                age: number | null;
                genero: string | null;
                lastname: string | null;
                passwordRequetsAt: Date | null;
                passwordRequetsToken: string | null;
                token: string | null;
                parentId: string | null;
                rolId: string | null;
                languajeId: string | null;
                cityId: string | null;
            };
            patientReference: {
                id: string;
                name: string | null;
                isDelete: boolean;
                createAt: Date;
                updateAt: Date | null;
                email: string;
                username: string;
                password: string;
                ci: string | null;
                name2: string | null;
                lastname2: string | null;
                nacionality: string | null;
                email2: string | null;
                phone: string | null;
                phone2: string | null;
                propietaryCode: string;
                code: string | null;
                age: number | null;
                genero: string | null;
                lastname: string | null;
                passwordRequetsAt: Date | null;
                passwordRequetsToken: string | null;
                token: string | null;
                parentId: string | null;
                rolId: string | null;
                languajeId: string | null;
                cityId: string | null;
            };
        } & {
            id: string;
            isDelete: boolean;
            createAt: Date;
            updateAt: Date | null;
            description: string | null;
            weightNow: Prisma.Decimal | null;
            weightPreview: Prisma.Decimal | null;
            weightObjective: Prisma.Decimal | null;
            nutricionistId: string;
            patientId: string;
            exercise: string | null;
            sleep: string | null;
            proteinas: Prisma.Decimal | null;
            lipidos: Prisma.Decimal | null;
            Carbohidratos: Prisma.Decimal | null;
        };
    } & {
        id: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        foodId: string;
        quoteId: string;
        type: string;
    })[]>;
    find({ filter, select }: {
        filter?: Prisma.FoodAllWhereInput;
        select?: Prisma.UserSelect;
    }): Promise<{
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
        quoteReference: {
            id: string;
            isDelete: boolean;
            createAt: Date;
            updateAt: Date | null;
            description: string | null;
            weightNow: Prisma.Decimal | null;
            weightPreview: Prisma.Decimal | null;
            weightObjective: Prisma.Decimal | null;
            nutricionistId: string;
            patientId: string;
            exercise: string | null;
            sleep: string | null;
            proteinas: Prisma.Decimal | null;
            lipidos: Prisma.Decimal | null;
            Carbohidratos: Prisma.Decimal | null;
        };
    } & {
        id: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        foodId: string;
        quoteId: string;
        type: string;
    }>;
    count({ filter }: {
        filter?: Prisma.FoodAllWhereInput;
    }): Promise<number>;
    update({ filter, data }: {
        filter?: Prisma.FoodAllWhereUniqueInput;
        data: Prisma.FoodAllUpdateInput;
    }): Promise<{
        id: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        foodId: string;
        quoteId: string;
        type: string;
    }>;
    softDelete({ id }: {
        id: string;
    }): Promise<{
        id: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        foodId: string;
        quoteId: string;
        type: string;
    }>;
    recovery({ id }: {
        id: string;
    }): Promise<{
        id: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        foodId: string;
        quoteId: string;
        type: string;
    }>;
}
