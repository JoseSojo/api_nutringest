import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";
export default class MenuModel {
    private prisma;
    constructor(prisma: PrismaService);
    create({ data }: {
        data: Prisma.MenuCreateInput;
    }): Promise<{
        id: string;
        name: string | null;
        createById: string | null;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        description: string | null;
        type: string;
    }>;
    findAll({ skip, take, filter, select }: {
        skip?: number;
        take?: number;
        filter?: Prisma.MenuWhereInput;
        select?: Prisma.UserSelect;
    }): Promise<({
        createByReference: {
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
        _count: {
            details: number;
            foods: number;
        };
    } & {
        id: string;
        name: string | null;
        createById: string | null;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        description: string | null;
        type: string;
    })[]>;
    find({ filter, select }: {
        filter?: Prisma.MenuWhereInput;
        select?: Prisma.UserSelect;
    }): Promise<{
        createByReference: {
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
        _count: {
            details: number;
            foods: number;
            createByReference: number;
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
        })[];
    } & {
        id: string;
        name: string | null;
        createById: string | null;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        description: string | null;
        type: string;
    }>;
    count({ filter }: {
        filter?: Prisma.MenuWhereInput;
    }): Promise<number>;
    update({ filter, data }: {
        filter?: Prisma.MenuWhereUniqueInput;
        data: Prisma.MenuUpdateInput;
    }): Promise<{
        id: string;
        name: string | null;
        createById: string | null;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        description: string | null;
        type: string;
    }>;
    softDelete({ id }: {
        id: string;
    }): Promise<{
        id: string;
        name: string | null;
        createById: string | null;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        description: string | null;
        type: string;
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
        name: string | null;
        createById: string | null;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        description: string | null;
        type: string;
    }>;
}
