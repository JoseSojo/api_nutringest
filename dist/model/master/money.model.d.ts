import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";
export default class ConfigMoneyModel {
    private prisma;
    constructor(prisma: PrismaService);
    create({ data }: {
        data: Prisma.CoinCreateInput;
    }): Promise<{
        id: string;
        name: string;
        createById: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        prefix: string;
        description: string;
    }>;
    findAll({ skip, take, filter, select }: {
        skip?: number;
        take?: number;
        filter?: Prisma.CoinWhereInput;
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
            country: number;
            paymentMethods: number;
            createByReference: number;
        };
        country: {
            id: string;
            name: string;
            createById: string;
            isDelete: boolean;
            createAt: Date;
            updateAt: Date;
            coinId: string;
            prefixPhone: string;
        };
        paymentMethods: {
            id: string;
            name: string;
            createById: string;
            isDelete: boolean;
            createAt: Date;
            updateAt: Date | null;
            description: string;
            required: Prisma.JsonValue | null;
            moneyId: string;
        }[];
    } & {
        id: string;
        name: string;
        createById: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        prefix: string;
        description: string;
    })[]>;
    find({ filter, select }: {
        filter?: Prisma.CoinWhereInput;
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
            country: number;
            paymentMethods: number;
            createByReference: number;
        };
        country: {
            id: string;
            name: string;
            createById: string;
            isDelete: boolean;
            createAt: Date;
            updateAt: Date;
            coinId: string;
            prefixPhone: string;
        };
        paymentMethods: {
            id: string;
            name: string;
            createById: string;
            isDelete: boolean;
            createAt: Date;
            updateAt: Date | null;
            description: string;
            required: Prisma.JsonValue | null;
            moneyId: string;
        }[];
    } & {
        id: string;
        name: string;
        createById: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        prefix: string;
        description: string;
    }>;
    count({ filter }: {
        filter?: Prisma.CoinWhereInput;
    }): Promise<number>;
    update({ filter, data }: {
        filter?: Prisma.CoinWhereUniqueInput;
        data: Prisma.CoinUpdateInput;
    }): Promise<{
        id: string;
        name: string;
        createById: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        prefix: string;
        description: string;
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
        prefix: string;
        description: string;
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
        prefix: string;
        description: string;
    }>;
}
