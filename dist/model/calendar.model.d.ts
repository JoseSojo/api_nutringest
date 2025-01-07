import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";
export default class CalendarModel {
    private prisma;
    constructor(prisma: PrismaService);
    create({ data }: {
        data: Prisma.CalendarCreateInput;
    }): Promise<{
        id: string;
        createById: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        description: string;
        status: string;
        quoteId: string | null;
        hours: string | null;
        day: number;
        monthName: string;
        monthNumber: number;
        year: number;
    }>;
    findForMonthAll({ month, year, status, quote, user }: {
        user?: string;
        quote?: string;
        status: string;
        month: number;
        year: number;
    }): Promise<(Prisma.PickEnumerable<Prisma.CalendarGroupByOutputType, "day"[]> & {
        _count: {
            day: number;
        };
    })[]>;
    findAll({ skip, take, filter, select }: {
        skip?: number;
        take?: number;
        filter?: Prisma.CalendarWhereInput;
        select?: Prisma.UserSelect;
    }): Promise<({
        createByReference: {
            id: string;
            name: string;
            email: string;
            lastname: string;
        };
        quoteReference: {
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
        };
    } & {
        id: string;
        createById: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        description: string;
        status: string;
        quoteId: string | null;
        hours: string | null;
        day: number;
        monthName: string;
        monthNumber: number;
        year: number;
    })[]>;
    find({ filter, select }: {
        filter?: Prisma.CalendarWhereInput;
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
        quoteReference: {
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
        };
    } & {
        id: string;
        createById: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        description: string;
        status: string;
        quoteId: string | null;
        hours: string | null;
        day: number;
        monthName: string;
        monthNumber: number;
        year: number;
    }>;
    count({ filter }: {
        filter?: Prisma.CalendarWhereInput;
    }): Promise<number>;
    update({ filter, data }: {
        filter?: Prisma.CalendarWhereUniqueInput;
        data: Prisma.CalendarUpdateInput;
    }): Promise<{
        id: string;
        createById: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        description: string;
        status: string;
        quoteId: string | null;
        hours: string | null;
        day: number;
        monthName: string;
        monthNumber: number;
        year: number;
    }>;
    softDelete({ id }: {
        id: string;
    }): Promise<{
        id: string;
        createById: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        description: string;
        status: string;
        quoteId: string | null;
        hours: string | null;
        day: number;
        monthName: string;
        monthNumber: number;
        year: number;
    }>;
    recovery({ id }: {
        id: string;
    }): Promise<{
        id: string;
        createById: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        description: string;
        status: string;
        quoteId: string | null;
        hours: string | null;
        day: number;
        monthName: string;
        monthNumber: number;
        year: number;
    }>;
    createHistory({ data }: {
        data: Prisma.CalendarHistoryStatusCreateInput;
    }): Promise<{
        id: string;
        createById: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        description: string;
        status: string;
    }>;
    findAllHistory({ skip, take, filter, select }: {
        skip?: number;
        take?: number;
        filter?: Prisma.CalendarHistoryStatusWhereInput;
        select?: Prisma.UserSelect;
    }): Promise<({
        createByReference: {
            id: string;
            name: string;
            email: string;
            lastname: string;
        };
    } & {
        id: string;
        createById: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        description: string;
        status: string;
    })[]>;
    countHistory({ filter }: {
        filter?: Prisma.CalendarHistoryStatusWhereInput;
    }): Promise<number>;
    softDeleteHistory({ id }: {
        id: string;
    }): Promise<{
        id: string;
        createById: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        description: string;
        status: string;
    }>;
    recoveryHistory({ id }: {
        id: string;
    }): Promise<{
        id: string;
        createById: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        description: string;
        status: string;
    }>;
}
