import { Prisma } from "@prisma/client";
import FoodAllModel from "src/model/quote/food.model";
import AppActions from "src/AppActions";
import { ActionCrudInterface } from "src/validation/types/ActionSlideInterface";
import { ActionsInterface } from "src/validation/types/ActionsInterface";
import { FORM } from "src/validation/types/FromInterface";
import { LanguajeService } from "src/languaje/languaje.service";
export default class FoodAllService {
    private permit;
    private model;
    private languaje;
    private lang;
    constructor(permit: AppActions, model: FoodAllModel, languaje: LanguajeService);
    create({ data }: {
        data: Prisma.FoodAllCreateInput;
    }): Promise<{
        message: string;
        error: boolean;
        body: {
            id: string;
            isDelete: boolean;
            createAt: Date;
            updateAt: Date | null;
            foodId: string;
            quoteId: string;
            type: string;
        };
    } | {
        message: string;
        error: boolean;
        body?: undefined;
    }>;
    udpate({ data, id }: {
        data: Prisma.FoodAllUpdateInput;
        id: string;
    }): Promise<{
        message: string;
        error: boolean;
        body: {
            id: string;
            isDelete: boolean;
            createAt: Date;
            updateAt: Date | null;
            foodId: string;
            quoteId: string;
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
            isDelete: boolean;
            createAt: Date;
            updateAt: Date | null;
            foodId: string;
            quoteId: string;
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
        filter: Prisma.FoodAllWhereInput;
    }): Promise<{
        message: string;
        error: boolean;
        body: {
            next: boolean;
            previw: boolean;
            now: string;
            list: ({
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
                isDelete: boolean;
                createAt: Date;
                updateAt: Date | null;
                foodId: string;
                quoteId: string;
                type: string;
            })[];
            header: string[];
            headerMin: string[];
            extrat: string[];
            extratMin: string[];
        };
    } | {
        message: string;
        error: boolean;
        body?: undefined;
    }>;
    find({ filter }: {
        filter: Prisma.FoodAllWhereInput;
    }): Promise<{
        message: string;
        error: boolean;
        body: {
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
            isDelete: boolean;
            createAt: Date;
            updateAt: Date | null;
            foodId: string;
            quoteId: string;
            type: string;
        };
    } | {
        message: string;
        error: boolean;
        body?: undefined;
    }>;
    HeaderMinList(): string[];
    HeaderMinListExtract(): string[];
    HeaderList(): string[];
    HeaderListExtract(): string[];
    HeaderUnique(): string[];
    HeaderUniqueExtract(): string[];
    formCreate(): FORM;
    formUpdate(): Promise<void>;
    formDelete(): Promise<void>;
    getActionsList(actions: string[]): ActionCrudInterface[];
    getActionsUnique(actions: string[]): ActionCrudInterface[];
    getActionsUniqueInQuote(actions: string[], p?: boolean): ActionCrudInterface[];
    getPermits(): ActionsInterface;
    getPermitsPropietary(): ActionsInterface;
}
