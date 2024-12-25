import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";
import AppActions from "src/AppActions";
import { ActionCrudInterface } from "src/validation/types/ActionSlideInterface";
import { ActionsInterface } from "src/validation/types/ActionsInterface";
import { FORM } from "src/validation/types/FromInterface";
import CalendarModel from "src/model/calendar.model";
import { LanguajeService } from "src/languaje/languaje.service";
export default class CalendarService {
    private prisma;
    private permit;
    private model;
    private languaje;
    private lang;
    constructor(prisma: PrismaService, permit: AppActions, model: CalendarModel, languaje: LanguajeService);
    findForMonth({ month, year, status, quote, user }: {
        user?: string;
        status?: string;
        month: number;
        year: number;
        quote?: string;
    }): Promise<(Prisma.PickEnumerable<Prisma.CalendarGroupByOutputType, "day"[]> & {
        _count: {
            day: number;
        };
    })[]>;
    create({ data }: {
        data: Prisma.CalendarCreateInput;
    }): Promise<{
        message: string;
        error: boolean;
        body: {
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
        };
    } | {
        message: string;
        error: boolean;
        body?: undefined;
    }>;
    createHistoryStatus({ data }: {
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
    paginateHistoryStatus({ skip, take, filter }: {
        skip: number;
        take: number;
        filter: Prisma.CalendarHistoryStatusWhereInput;
    }): Promise<{
        message: string;
        error: boolean;
        body: {
            next: boolean;
            previw: boolean;
            now: string;
            list: ({
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
            })[];
            header: string[];
            extrat: string[];
            headerMin: string[];
            extratMin: string[];
        };
    } | {
        message: string;
        error: boolean;
        body?: undefined;
    }>;
    udpate({ data, id }: {
        data: Prisma.CalendarUpdateInput;
        id: string;
    }): Promise<{
        message: string;
        error: boolean;
        body: {
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
        };
    } | {
        message: string;
        error: boolean;
        body?: undefined;
    }>;
    delete({ id }: {
        id: string;
    }): Promise<{
        message: string;
        error: boolean;
        body: {
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
        };
    } | {
        message: string;
        error: boolean;
        body?: undefined;
    }>;
    paginate({ skip, take, filter }: {
        skip: number;
        take: number;
        filter: Prisma.CalendarWhereInput;
    }): Promise<{
        message: string;
        error: boolean;
        body: {
            next: boolean;
            previw: boolean;
            now: string;
            list: ({
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
            })[];
            header: string[];
            extrat: string[];
            headerMin: string[];
            extratMin: string[];
        };
    } | {
        message: string;
        error: boolean;
        body?: undefined;
    }>;
    find({ filter }: {
        filter: Prisma.CalendarWhereInput;
    }): Promise<{
        message: string;
        error: boolean;
        body: {
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
        };
    } | {
        message: string;
        error: boolean;
        body?: undefined;
    }>;
    HeaderList(): string[];
    HeaderListExtract(): string[];
    HeaderMinList(): string[];
    HeaderMinListExtract(): string[];
    HeaderUnique(): string[];
    HeaderUniqueExtract(): string[];
    formCreate(): FORM;
    formUpdate(): Promise<void>;
    formDelete(): Promise<void>;
    getActionsList(actions: string[]): ActionCrudInterface[];
    getActionsUnique(actions: string[], p?: boolean): ActionCrudInterface[];
    getActionsUniqueInQuote(actions: string[], p?: boolean): ActionCrudInterface[];
    getActionsUniquePropietary(actions: string[]): ActionCrudInterface[];
    getPermits(): ActionsInterface;
    getPermitsPropietary(): ActionsInterface;
}
