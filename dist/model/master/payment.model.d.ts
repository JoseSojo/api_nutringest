import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";
export default class PaymentMethodModel {
    private prisma;
    constructor(prisma: PrismaService);
    create({ data }: {
        data: Prisma.PaymentMethodCreateInput;
    }): Promise<{
        id: string;
        name: string;
        createById: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        description: string;
        dolar: boolean;
        required: Prisma.JsonValue | null;
        moneyId: string;
    }>;
    findAll({ skip, take, filter, select }: {
        skip?: number;
        take?: number;
        filter?: Prisma.PaymentMethodWhereInput;
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
        moneyReference: {
            id: string;
            name: string;
            createById: string;
            isDelete: boolean;
            createAt: Date;
            updateAt: Date | null;
            prefix: string;
            description: string;
        };
    } & {
        id: string;
        name: string;
        createById: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        description: string;
        dolar: boolean;
        required: Prisma.JsonValue | null;
        moneyId: string;
    })[]>;
    find({ filter, select }: {
        filter?: Prisma.PaymentMethodWhereInput;
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
        moneyReference: {
            id: string;
            name: string;
            createById: string;
            isDelete: boolean;
            createAt: Date;
            updateAt: Date | null;
            prefix: string;
            description: string;
        };
    } & {
        id: string;
        name: string;
        createById: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        description: string;
        dolar: boolean;
        required: Prisma.JsonValue | null;
        moneyId: string;
    }>;
    count({ filter }: {
        filter?: Prisma.PaymentMethodWhereInput;
    }): Promise<number>;
    update({ filter, data }: {
        filter?: Prisma.PaymentMethodWhereUniqueInput;
        data: Prisma.PaymentMethodUpdateInput;
    }): Promise<{
        id: string;
        name: string;
        createById: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        description: string;
        dolar: boolean;
        required: Prisma.JsonValue | null;
        moneyId: string;
    }>;
    softDelete({ id }: {
        id: string;
    }): Promise<{
        id: string;
        name: string;
        createById: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        description: string;
        dolar: boolean;
        required: Prisma.JsonValue | null;
        moneyId: string;
    }>;
    recovery({ id }: {
        id: string;
    }): Promise<{
        id: string;
        name: string;
        createById: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        description: string;
        dolar: boolean;
        required: Prisma.JsonValue | null;
        moneyId: string;
    }>;
}
