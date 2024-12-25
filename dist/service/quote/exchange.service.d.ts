import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";
import ExchangeListModel from "src/model/quote/exchange.model";
import AppActions from "src/AppActions";
import { ActionCrudInterface } from "src/validation/types/ActionSlideInterface";
import { ActionsInterface } from "src/validation/types/ActionsInterface";
import { FORM } from "src/validation/types/FromInterface";
import { LanguajeService } from "src/languaje/languaje.service";
export default class ExchangeListService {
    private prisma;
    private permit;
    private model;
    private languaje;
    private lang;
    constructor(prisma: PrismaService, permit: AppActions, model: ExchangeListModel, languaje: LanguajeService);
    create({ data }: {
        data: Prisma.ExchangeListCreateInput;
    }): Promise<{
        message: string;
        error: boolean;
        body: {
            id: string;
            name: string;
            isDelete: boolean;
            createAt: Date;
            updateAt: Date | null;
            userId: string;
            ration: string | null;
            unityId: string | null;
        };
    } | {
        message: string;
        error: boolean;
        body?: undefined;
    }>;
    createManyFood({ data }: {
        data: Prisma.ExchangeListFoodsCreateInput;
    }): Promise<{
        id: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        ration: string | null;
        unityMeasureId: string | null;
        exchangeListId: string;
        foodId: string;
    }>;
    udpateFood({ data, id }: {
        id: string;
        data: Prisma.ExchangeListFoodsUpdateInput;
    }): Promise<{
        id: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        ration: string | null;
        unityMeasureId: string | null;
        exchangeListId: string;
        foodId: string;
    }>;
    udpate({ data, id }: {
        data: Prisma.ExchangeListUpdateInput;
        id: string;
    }): Promise<{
        message: string;
        error: boolean;
        body: {
            id: string;
            name: string;
            isDelete: boolean;
            createAt: Date;
            updateAt: Date | null;
            userId: string;
            ration: string | null;
            unityId: string | null;
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
            name: string;
            isDelete: boolean;
            createAt: Date;
            updateAt: Date | null;
            userId: string;
            ration: string | null;
            unityId: string | null;
        };
    } | {
        message: string;
        error: boolean;
        body?: undefined;
    }>;
    paginate({ skip, take, filter }: {
        skip: number;
        take: number;
        filter: Prisma.ExchangeListWhereInput;
    }): Promise<{
        message: string;
        error: boolean;
        body: {
            next: boolean;
            previw: boolean;
            now: string;
            list: ({
                _count: {
                    foods: number;
                    exchange: number;
                };
                userReference: {
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
                unityReference: {
                    id: string;
                    name: string;
                    createById: string;
                    isDelete: boolean;
                    createAt: Date;
                    updateAt: Date;
                    abr: string;
                };
            } & {
                id: string;
                name: string;
                isDelete: boolean;
                createAt: Date;
                updateAt: Date | null;
                userId: string;
                ration: string | null;
                unityId: string | null;
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
        filter: Prisma.ExchangeListWhereInput;
    }): Promise<{
        message: string;
        error: boolean;
        body: {
            _count: {
                unityReference: number;
                foods: number;
                exchange: number;
                userReference: number;
            };
            userReference: {
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
            unityReference: {
                id: string;
                name: string;
            };
            foods: ({
                unityMeasureReference: {
                    id: string;
                    name: string;
                    createById: string;
                    isDelete: boolean;
                    createAt: Date;
                    updateAt: Date;
                    abr: string;
                };
                exchangeListReference: {
                    id: string;
                    name: string;
                    isDelete: boolean;
                    createAt: Date;
                    updateAt: Date | null;
                    userId: string;
                    ration: string | null;
                    unityId: string | null;
                };
                foodReference: {
                    id: string;
                    name: string;
                    isDelete: boolean;
                    createAt: Date;
                    updateAt: Date;
                    code: number;
                    quantity: Prisma.Decimal;
                    calorias: Prisma.Decimal;
                    humed: Prisma.Decimal;
                    proteina: Prisma.Decimal;
                    fosforo: Prisma.Decimal;
                    potasio: Prisma.Decimal;
                    grasas: Prisma.Decimal;
                    carbohidratosDisponibles: Prisma.Decimal;
                    carbohidratosTotales: Prisma.Decimal;
                    fibraTotal: Prisma.Decimal;
                    fibraInsolub: Prisma.Decimal;
                    cenizas: Prisma.Decimal;
                    calcio: Prisma.Decimal;
                    hierro: Prisma.Decimal;
                    magnesio: Prisma.Decimal;
                    zinc: Prisma.Decimal;
                    cobre: Prisma.Decimal;
                    sodio: Prisma.Decimal;
                    vitaminaA: Prisma.Decimal;
                    carotenoEquivTotal: Prisma.Decimal;
                    tiamina: Prisma.Decimal;
                    riboflavina: Prisma.Decimal;
                    niacina: Prisma.Decimal;
                    vitaminaB6: Prisma.Decimal;
                    acidAscorb: Prisma.Decimal;
                };
            } & {
                id: string;
                isDelete: boolean;
                createAt: Date;
                updateAt: Date | null;
                ration: string | null;
                unityMeasureId: string | null;
                exchangeListId: string;
                foodId: string;
            })[];
            exchange: {
                id: string;
                isDelete: boolean;
                createAt: Date;
                updateAt: Date | null;
                quoteId: string;
                exchangeId: string;
            }[];
        } & {
            id: string;
            name: string;
            isDelete: boolean;
            createAt: Date;
            updateAt: Date | null;
            userId: string;
            ration: string | null;
            unityId: string | null;
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
