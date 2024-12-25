import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";
export default class ExchangeListModel {
    private prisma;
    constructor(prisma: PrismaService);
    create({ data }: {
        data: Prisma.ExchangeListCreateInput;
    }): Promise<{
        id: string;
        name: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        userId: string;
        ration: string | null;
        unityId: string | null;
    }>;
    findAll({ skip, take, filter, select }: {
        skip?: number;
        take?: number;
        filter?: Prisma.ExchangeListWhereInput;
        select?: Prisma.UserSelect;
    }): Promise<({
        _count: {
            foods: number;
            exchange: number;
        };
        userReference: {
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
        unityReference: {
            id: string;
            name: string;
            createById: string;
            isDelete: boolean;
            createAt: Date;
            updateAt: Date;
            abr: string;
        };
    } & {
        id: string;
        name: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        userId: string;
        ration: string | null;
        unityId: string | null;
    })[]>;
    find({ filter, select }: {
        filter?: Prisma.ExchangeListWhereInput;
        select?: Prisma.UserSelect;
    }): Promise<{
        _count: {
            unityReference: number;
            foods: number;
            exchange: number;
            userReference: number;
        };
        userReference: {
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
        unityReference: {
            id: string;
            name: string;
        };
        foods: ({
            unityMeasureReference: {
                id: string;
                name: string;
                createById: string;
                isDelete: boolean;
                createAt: Date;
                updateAt: Date;
                abr: string;
            };
            exchangeListReference: {
                id: string;
                name: string;
                isDelete: boolean;
                createAt: Date;
                updateAt: Date | null;
                userId: string;
                ration: string | null;
                unityId: string | null;
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
        })[];
        exchange: {
            id: string;
            isDelete: boolean;
            createAt: Date;
            updateAt: Date | null;
            quoteId: string;
            exchangeId: string;
        }[];
    } & {
        id: string;
        name: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        userId: string;
        ration: string | null;
        unityId: string | null;
    }>;
    count({ filter }: {
        filter?: Prisma.ExchangeListWhereInput;
    }): Promise<number>;
    update({ filter, data }: {
        filter?: Prisma.ExchangeListWhereUniqueInput;
        data: Prisma.ExchangeListUpdateInput;
    }): Promise<{
        id: string;
        name: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        userId: string;
        ration: string | null;
        unityId: string | null;
    }>;
    softDelete({ id }: {
        id: string;
    }): Promise<{
        id: string;
        name: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        userId: string;
        ration: string | null;
        unityId: string | null;
    }>;
    recovery({ id }: {
        id: string;
    }): Promise<{
        id: string;
        name: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        userId: string;
        ration: string | null;
        unityId: string | null;
    }>;
}
