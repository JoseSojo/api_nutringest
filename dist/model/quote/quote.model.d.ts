import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";
export default class QuoteModel {
    private prisma;
    constructor(prisma: PrismaService);
    create({ data }: {
        data: Prisma.QuoteCreateInput;
    }): Promise<{
        id: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        description: string | null;
        weightNow: Prisma.Decimal | null;
        weightPreview: Prisma.Decimal | null;
        weightObjective: Prisma.Decimal | null;
        nutricionistId: string;
        patientId: string;
        exercise: string | null;
        sleep: string | null;
        proteinas: Prisma.Decimal | null;
        lipidos: Prisma.Decimal | null;
        Carbohidratos: Prisma.Decimal | null;
    }>;
    findAll({ skip, take, filter, select }: {
        skip?: number;
        take?: number;
        filter?: Prisma.QuoteWhereInput;
        select?: Prisma.UserSelect;
    }): Promise<({
        _count: {
            history: number;
            menus: number;
            exchange: number;
            foodAllQuote: number;
        };
        nutricionistReference: {
            id: string;
            name: string;
            email: string;
            lastname: string;
        };
        patientReference: {
            id: string;
            name: string;
            email: string;
            lastname: string;
        };
    } & {
        id: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        description: string | null;
        weightNow: Prisma.Decimal | null;
        weightPreview: Prisma.Decimal | null;
        weightObjective: Prisma.Decimal | null;
        nutricionistId: string;
        patientId: string;
        exercise: string | null;
        sleep: string | null;
        proteinas: Prisma.Decimal | null;
        lipidos: Prisma.Decimal | null;
        Carbohidratos: Prisma.Decimal | null;
    })[]>;
    find({ filter, select }: {
        filter?: Prisma.QuoteWhereInput;
        select?: Prisma.UserSelect;
    }): Promise<{
        _count: {
            nutricionistReference: number;
            patientReference: number;
            history: number;
            exchange: number;
            photos: number;
            calendar: number;
            menus: number;
            foodAllQuote: number;
        };
        nutricionistReference: {
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
        patientReference: {
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
        description: string | null;
        weightNow: Prisma.Decimal | null;
        weightPreview: Prisma.Decimal | null;
        weightObjective: Prisma.Decimal | null;
        nutricionistId: string;
        patientId: string;
        exercise: string | null;
        sleep: string | null;
        proteinas: Prisma.Decimal | null;
        lipidos: Prisma.Decimal | null;
        Carbohidratos: Prisma.Decimal | null;
    }>;
    count({ filter }: {
        filter?: Prisma.QuoteWhereInput;
    }): Promise<number>;
    update({ filter, data }: {
        filter?: Prisma.QuoteWhereUniqueInput;
        data: Prisma.QuoteUpdateInput;
    }): Promise<{
        id: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        description: string | null;
        weightNow: Prisma.Decimal | null;
        weightPreview: Prisma.Decimal | null;
        weightObjective: Prisma.Decimal | null;
        nutricionistId: string;
        patientId: string;
        exercise: string | null;
        sleep: string | null;
        proteinas: Prisma.Decimal | null;
        lipidos: Prisma.Decimal | null;
        Carbohidratos: Prisma.Decimal | null;
    }>;
    softDelete({ id }: {
        id: string;
    }): Promise<{
        id: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        description: string | null;
        weightNow: Prisma.Decimal | null;
        weightPreview: Prisma.Decimal | null;
        weightObjective: Prisma.Decimal | null;
        nutricionistId: string;
        patientId: string;
        exercise: string | null;
        sleep: string | null;
        proteinas: Prisma.Decimal | null;
        lipidos: Prisma.Decimal | null;
        Carbohidratos: Prisma.Decimal | null;
    }>;
    recovery({ id }: {
        id: string;
    }): Promise<{
        id: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        description: string | null;
        weightNow: Prisma.Decimal | null;
        weightPreview: Prisma.Decimal | null;
        weightObjective: Prisma.Decimal | null;
        nutricionistId: string;
        patientId: string;
        exercise: string | null;
        sleep: string | null;
        proteinas: Prisma.Decimal | null;
        lipidos: Prisma.Decimal | null;
        Carbohidratos: Prisma.Decimal | null;
    }>;
    findAllHistory({ skip, take, filter }: {
        skip?: number;
        take?: number;
        filter?: Prisma.HistoryQuoteWhereInput;
    }): Promise<{
        id: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        description: string | null;
        quoteId: string;
    }[]>;
    countHistory({ filter }: {
        filter?: Prisma.HistoryQuoteWhereInput;
    }): Promise<number>;
    findAllHistoryPhoto({ skip, take, filter }: {
        skip?: number;
        take?: number;
        filter?: Prisma.HistoryPhotoWhereInput;
    }): Promise<{
        id: string;
        createById: string;
        isDelete: string | null;
        createAt: Date;
        updateAt: Date;
        description: string | null;
        date: string | null;
        quoteId: string;
        size: Prisma.Decimal;
        originalName: string;
        path: string;
        donwload: string;
        mimyType: string;
    }[]>;
    countHistoryPhoto({ filter }: {
        filter?: Prisma.HistoryPhotoWhereInput;
    }): Promise<number>;
}
