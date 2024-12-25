import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";
export default class ConfigCountryModel {
    private prisma;
    constructor(prisma: PrismaService);
    create({ data }: {
        data: Prisma.ConfigCountryCreateInput;
    }): Promise<{
        id: string;
        name: string;
        createById: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date;
        coinId: string;
        prefixPhone: string;
    }>;
    findAll({ skip, take, filter, select }: {
        skip?: number;
        take?: number;
        filter?: Prisma.ConfigCountryWhereInput;
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
            coinReference: number;
            states: number;
            createByReference: number;
        };
        coinReference: {
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
        updateAt: Date;
        coinId: string;
        prefixPhone: string;
    })[]>;
    find({ filter, select }: {
        filter?: Prisma.ConfigCountryWhereInput;
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
    } & {
        id: string;
        name: string;
        createById: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date;
        coinId: string;
        prefixPhone: string;
    }>;
    count({ filter }: {
        filter?: Prisma.ConfigCountryWhereInput;
    }): Promise<number>;
    update({ filter, data }: {
        filter?: Prisma.ConfigCountryWhereUniqueInput;
        data: Prisma.ConfigCountryUpdateInput;
    }): Promise<{
        id: string;
        name: string;
        createById: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date;
        coinId: string;
        prefixPhone: string;
    }>;
    softDelete({ id }: {
        id: string;
    }): Promise<{
        id: string;
        name: string;
        createById: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date;
        coinId: string;
        prefixPhone: string;
    }>;
    recovery({ id }: {
        id: string;
    }): Promise<{
        id: string;
        name: string;
        createById: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date;
        coinId: string;
        prefixPhone: string;
    }>;
}
