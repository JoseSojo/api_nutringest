import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";
export default class ConfigCityModel {
    private prisma;
    constructor(prisma: PrismaService);
    create({ data }: {
        data: Prisma.ConfigCityCreateInput;
    }): Promise<{
        id: string;
        name: string;
        stateId: string;
        createById: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date;
    }>;
    findAll({ skip, take, filter, select }: {
        skip?: number;
        take?: number;
        filter?: Prisma.ConfigCityWhereInput;
        select?: Prisma.UserSelect;
    }): Promise<({
        stateReference: {
            id: string;
            name: string;
            createById: string;
            isDelete: boolean;
            createAt: Date;
            updateAt: Date;
            countryId: string;
        };
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
            stateReference: number;
            createByReference: number;
            users: number;
        };
    } & {
        id: string;
        name: string;
        stateId: string;
        createById: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date;
    })[]>;
    find({ filter, select }: {
        filter?: Prisma.ConfigCityWhereInput;
        select?: Prisma.UserSelect;
    }): Promise<{
        stateReference: {
            id: string;
            name: string;
            createById: string;
            isDelete: boolean;
            createAt: Date;
            updateAt: Date;
            countryId: string;
        };
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
        users: {
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
        }[];
        _count: {
            stateReference: number;
            createByReference: number;
            users: number;
        };
    } & {
        id: string;
        name: string;
        stateId: string;
        createById: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date;
    }>;
    count({ filter }: {
        filter?: Prisma.ConfigCityWhereInput;
    }): Promise<number>;
    update({ filter, data }: {
        filter?: Prisma.ConfigCityWhereUniqueInput;
        data: Prisma.ConfigCityUpdateInput;
    }): Promise<{
        id: string;
        name: string;
        stateId: string;
        createById: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date;
    }>;
    softDelete({ id }: {
        id: string;
    }): Promise<{
        id: string;
        name: string;
        stateId: string;
        createById: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date;
    }>;
    recovery({ id }: {
        id: string;
    }): Promise<{
        id: string;
        name: string;
        stateId: string;
        createById: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date;
    }>;
}
