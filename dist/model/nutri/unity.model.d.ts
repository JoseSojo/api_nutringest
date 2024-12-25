import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";
export default class UnityMeasureModel {
    private prisma;
    constructor(prisma: PrismaService);
    create({ data }: {
        data: Prisma.UnityMeasureCreateInput;
    }): Promise<{
        id: string;
        name: string;
        createById: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date;
        abr: string;
    }>;
    findAll({ skip, take, filter, select }: {
        skip?: number;
        take?: number;
        filter?: Prisma.UnityMeasureWhereInput;
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
            createByReference: number;
            exchangeListFood: number;
            menuDetail: number;
            exchangeList: number;
        };
    } & {
        id: string;
        name: string;
        createById: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date;
        abr: string;
    })[]>;
    find({ filter, select }: {
        filter?: Prisma.UnityMeasureWhereInput;
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
            createByReference: number;
            exchangeListFood: number;
            menuDetail: number;
            exchangeList: number;
        };
    } & {
        id: string;
        name: string;
        createById: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date;
        abr: string;
    }>;
    count({ filter }: {
        filter?: Prisma.UnityMeasureWhereInput;
    }): Promise<number>;
    update({ filter, data }: {
        filter?: Prisma.UnityMeasureWhereUniqueInput;
        data: Prisma.UnityMeasureUpdateInput;
    }): Promise<{
        id: string;
        name: string;
        createById: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date;
        abr: string;
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
        abr: string;
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
        abr: string;
    }>;
}
