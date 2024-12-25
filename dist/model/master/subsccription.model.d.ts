import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";
export default class ConfigSubscriptionModel {
    private prisma;
    constructor(prisma: PrismaService);
    create({ data }: {
        data: Prisma.SubscriptionCreateInput;
    }): Promise<{
        id: string;
        name: string | null;
        createById: string | null;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date;
        countMonth: number;
        defaultMount: number;
    }>;
    findAll({ skip, take, filter, select }: {
        skip?: number;
        take?: number;
        filter?: Prisma.SubscriptionWhereInput;
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
            createByReference: number;
            users: number;
        };
        details: {
            id: string;
            name: string;
            createById: string | null;
            isDelete: boolean;
            createAt: Date;
            updateAt: Date;
            mount: Prisma.Decimal;
            dayStart: number;
            monthStart: number;
            yearStart: number;
            dayEnd: number;
            monthEnd: number;
            yearEnd: number;
            subscriptionId: string;
            paymentMethodId: string;
        }[];
    } & {
        id: string;
        name: string | null;
        createById: string | null;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date;
        countMonth: number;
        defaultMount: number;
    })[]>;
    find({ filter, select }: {
        filter?: Prisma.SubscriptionWhereInput;
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
            createByReference: number;
            users: number;
        };
        details: {
            id: string;
            name: string;
            createById: string | null;
            isDelete: boolean;
            createAt: Date;
            updateAt: Date;
            mount: Prisma.Decimal;
            dayStart: number;
            monthStart: number;
            yearStart: number;
            dayEnd: number;
            monthEnd: number;
            yearEnd: number;
            subscriptionId: string;
            paymentMethodId: string;
        }[];
    } & {
        id: string;
        name: string | null;
        createById: string | null;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date;
        countMonth: number;
        defaultMount: number;
    }>;
    count({ filter }: {
        filter?: Prisma.SubscriptionWhereInput;
    }): Promise<number>;
    update({ filter, data }: {
        filter?: Prisma.SubscriptionWhereUniqueInput;
        data: Prisma.SubscriptionUpdateInput;
    }): Promise<{
        id: string;
        name: string | null;
        createById: string | null;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date;
        countMonth: number;
        defaultMount: number;
    }>;
    softDelete({ id }: {
        id: string;
    }): Promise<{
        id: string;
        name: string | null;
        createById: string | null;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date;
        countMonth: number;
        defaultMount: number;
    }>;
    recovery({ id }: {
        id: string;
    }): Promise<{
        id: string;
        name: string | null;
        createById: string | null;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date;
        countMonth: number;
        defaultMount: number;
    }>;
}
