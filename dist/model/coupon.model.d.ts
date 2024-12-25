import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";
export default class CouponModel {
    private prisma;
    constructor(prisma: PrismaService);
    create({ data }: {
        data: Prisma.CouponsCreateInput;
    }): Promise<{
        id: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        description: string;
        mount: Prisma.Decimal;
        propietaryId: string;
        use: boolean;
    }>;
    findAll({ skip, take, filter, select }: {
        skip?: number;
        take?: number;
        filter?: Prisma.CouponsWhereInput;
        select?: Prisma.UserSelect;
    }): Promise<({
        propietaryReference: {
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
        description: string;
        mount: Prisma.Decimal;
        propietaryId: string;
        use: boolean;
    })[]>;
    find({ filter, select }: {
        filter?: Prisma.CouponsWhereInput;
        select?: Prisma.UserSelect;
    }): Promise<{
        propietaryReference: {
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
        description: string;
        mount: Prisma.Decimal;
        propietaryId: string;
        use: boolean;
    }>;
    count({ filter }: {
        filter?: Prisma.CouponsWhereInput;
    }): Promise<number>;
    update({ filter, data }: {
        filter?: Prisma.CouponsWhereUniqueInput;
        data: Prisma.CouponsUpdateInput;
    }): Promise<{
        id: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        description: string;
        mount: Prisma.Decimal;
        propietaryId: string;
        use: boolean;
    }>;
    softDelete({ id }: {
        id: string;
    }): Promise<{
        id: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        description: string;
        mount: Prisma.Decimal;
        propietaryId: string;
        use: boolean;
    }>;
    recovery({ id }: {
        id: string;
    }): Promise<{
        id: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        description: string;
        mount: Prisma.Decimal;
        propietaryId: string;
        use: boolean;
    }>;
}
