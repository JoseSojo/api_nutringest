import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";
import QuoteModel from "src/model/quote/quote.model";
import AppActions from "src/AppActions";
import { ActionCrudInterface } from "src/validation/types/ActionSlideInterface";
import { ActionsInterface } from "src/validation/types/ActionsInterface";
import { FORM } from "src/validation/types/FromInterface";
import AppEvent from "src/AppEvent";
import { LanguajeService } from "src/languaje/languaje.service";
export default class QuoteService {
    private permit;
    private model;
    private prisma;
    private events;
    private languaje;
    private lang;
    constructor(permit: AppActions, model: QuoteModel, prisma: PrismaService, events: AppEvent, languaje: LanguajeService);
    removeMenu({ id, quote }: {
        id: string;
        quote: string;
    }): Promise<{
        id: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        quoteId: string;
        menuId: string;
    }>;
    removeExchange({ quote, id }: {
        quote: string;
        id: string;
    }): Promise<{
        id: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        quoteId: string;
        exchangeId: string;
    }>;
    removeFood({ quote, id }: {
        quote: string;
        id: string;
    }): Promise<{
        id: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        foodId: string;
        quoteId: string;
        type: string;
    }>;
    assingMenu({ quote, item }: {
        quote: string;
        item: string;
    }): Promise<{
        id: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        quoteId: string;
        menuId: string;
    }>;
    assingExchange({ quote, item }: {
        quote: string;
        item: string;
    }): Promise<{
        id: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        quoteId: string;
        exchangeId: string;
    }>;
    assingFood({ quote, item, type }: {
        quote: string;
        item: string;
        type: string;
    }): Promise<{
        id: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        foodId: string;
        quoteId: string;
        type: string;
    }>;
    create({ data }: {
        data: Prisma.QuoteCreateInput;
    }): Promise<{
        message: string;
        error: boolean;
        body: {
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
    } | {
        message: string;
        error: boolean;
        body?: undefined;
    }>;
    udpate({ data, id }: {
        data: Prisma.QuoteUpdateInput;
        id: string;
    }): Promise<{
        message: string;
        error: boolean;
        body: {
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
    } | {
        message: string;
        error: boolean;
        body?: undefined;
    }>;
    paginate({ skip, take, filter }: {
        skip: number;
        take: number;
        filter: Prisma.QuoteWhereInput;
    }): Promise<{
        message: string;
        error: boolean;
        body: {
            next: boolean;
            previw: boolean;
            now: string;
            list: ({
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
            })[];
            header: string[];
            extrat: string[];
        };
    } | {
        message: string;
        error: boolean;
        body?: undefined;
    }>;
    find({ filter }: {
        filter: Prisma.QuoteWhereInput;
    }): Promise<{
        message: string;
        error: boolean;
        body: {
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
        };
    } | {
        message: string;
        error: boolean;
        body?: undefined;
    }>;
    HeaderList(): string[];
    HeaderListExtract(): string[];
    HeaderUnique(): string[];
    HeaderUniqueExtract(): string[];
    formCreate(): FORM;
    formUpdate(): Promise<void>;
    formDelete(): Promise<void>;
    getActionsList(actions: string[]): ActionCrudInterface[];
    getActionsUnique(actions: string[]): ActionCrudInterface[];
    getPermits(): ActionsInterface;
    getPermitsPropietary(): ActionsInterface;
    CreateHistory(data: Prisma.HistoryQuoteCreateInput): Promise<{
        id: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        description: string | null;
        quoteId: string;
    }>;
    PaginateHistory({ skip, take, filter }: {
        skip: number;
        take: number;
        filter: Prisma.HistoryQuoteWhereInput;
    }): Promise<{
        message: string;
        error: boolean;
        body: {
            next: boolean;
            previw: boolean;
            now: string;
            list: {
                id: string;
                isDelete: boolean;
                createAt: Date;
                updateAt: Date | null;
                description: string | null;
                quoteId: string;
            }[];
            header: string[];
            extrat: string[];
        };
    } | {
        message: string;
        error: boolean;
        body?: undefined;
    }>;
    createPhotoHistory({ data, quote }: {
        data: Prisma.HistoryPhotoCreateInput;
        quote: string;
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
    }>;
    PaginatePhoto({ skip, take, filter }: {
        skip: number;
        take: number;
        filter: Prisma.HistoryPhotoWhereInput;
    }): Promise<{
        message: string;
        error: boolean;
        body: {
            next: boolean;
            previw: boolean;
            now: string;
            list: {
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
            }[];
            header: string[];
            extrat: string[];
        };
    } | {
        message: string;
        error: boolean;
        body?: undefined;
    }>;
}
