import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";
export default class PermitModel {
    private prisma;
    constructor(prisma: PrismaService);
    create({ data }: {
        data: Prisma.PermitsCreateInput;
    }): Promise<{
        id: string;
        name: string;
        createById: string | null;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date;
        roles: Prisma.JsonValue;
    }>;
    findAll({ skip, take, filter, select }: {
        skip?: number;
        take?: number;
        filter?: Prisma.PermitsWhereInput;
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
            users: number;
            createByReference: number;
        };
    } & {
        id: string;
        name: string;
        createById: string | null;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date;
        roles: Prisma.JsonValue;
    })[]>;
    find({ filter, select }: {
        filter?: Prisma.PermitsWhereInput;
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
        createById: string | null;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date;
        roles: Prisma.JsonValue;
    }>;
    count({ filter }: {
        filter?: Prisma.PermitsWhereInput;
    }): Promise<number>;
    update({ filter, data }: {
        filter?: Prisma.PermitsWhereUniqueInput;
        data: Prisma.PermitsUpdateInput;
    }): Promise<{
        id: string;
        name: string;
        createById: string | null;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date;
        roles: Prisma.JsonValue;
    }>;
    softDelete({ id }: {
        id: string;
    }): Promise<{
        id: string;
        name: string;
        createById: string | null;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date;
        roles: Prisma.JsonValue;
    }>;
    recovery({ id }: {
        id: string;
    }): Promise<{
        id: string;
        name: string;
        createById: string | null;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date;
        roles: Prisma.JsonValue;
    }>;
}
