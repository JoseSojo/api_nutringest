import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";
import MenuModel from "src/model/quote/menu.model";
import { ActionCrudInterface } from "src/validation/types/ActionSlideInterface";
import { ActionsInterface } from "src/validation/types/ActionsInterface";
import AppActions from "src/AppActions";
import { FORM } from "src/validation/types/FromInterface";
import { LanguajeService } from "src/languaje/languaje.service";
export default class MenuService {
    private prisma;
    private permit;
    private model;
    private languaje;
    private lang;
    constructor(prisma: PrismaService, permit: AppActions, model: MenuModel, languaje: LanguajeService);
    createManyFood({ data }: {
        data: Prisma.MenuDetailCreateInput;
    }): Promise<{
        id: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        unityMeasureId: string | null;
        quentity: number | null;
        menuId: string;
        foodPrimitiveId: string;
    }>;
    udpateFood({ data, id }: {
        id: string;
        data: Prisma.MenuDetailUpdateInput;
    }): Promise<{
        id: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date | null;
        unityMeasureId: string | null;
        quentity: number | null;
        menuId: string;
        foodPrimitiveId: string;
    }>;
    create({ data }: {
        data: Prisma.MenuCreateInput;
    }): Promise<{
        message: string;
        error: boolean;
        body: {
            id: string;
            name: string | null;
            createById: string | null;
            isDelete: boolean;
            createAt: Date;
            updateAt: Date | null;
            description: string | null;
            type: string;
        };
    } | {
        message: string;
        error: boolean;
        body?: undefined;
    }>;
    udpate({ data, id }: {
        data: Prisma.MenuUpdateInput;
        id: string;
    }): Promise<{
        message: string;
        error: boolean;
        body: {
            id: string;
            name: string | null;
            createById: string | null;
            isDelete: boolean;
            createAt: Date;
            updateAt: Date | null;
            description: string | null;
            type: string;
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
            name: string | null;
            createById: string | null;
            isDelete: boolean;
            createAt: Date;
            updateAt: Date | null;
            description: string | null;
            type: string;
        };
    } | {
        message: string;
        error: boolean;
        body?: undefined;
    }>;
    paginate({ skip, take, filter }: {
        skip: number;
        take: number;
        filter: Prisma.MenuWhereInput;
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
                    details: number;
                    foods: number;
                };
            } & {
                id: string;
                name: string | null;
                createById: string | null;
                isDelete: boolean;
                createAt: Date;
                updateAt: Date | null;
                description: string | null;
                type: string;
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
        filter: Prisma.MenuWhereInput;
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
            _count: {
                details: number;
                foods: number;
                createByReference: number;
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
                foodPrimitiveReference: {
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
                unityMeasureId: string | null;
                quentity: number | null;
                menuId: string;
                foodPrimitiveId: string;
            })[];
        } & {
            id: string;
            name: string | null;
            createById: string | null;
            isDelete: boolean;
            createAt: Date;
            updateAt: Date | null;
            description: string | null;
            type: string;
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
    getPermits(): ActionsInterface;
    getPermitsPropietary(): ActionsInterface;
}
