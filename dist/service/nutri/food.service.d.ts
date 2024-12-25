import { PrimitiveFood, Prisma } from "@prisma/client";
import AppActions from "src/AppActions";
import { LanguajeService } from "src/languaje/languaje.service";
import PrimitiveFoodModel from "src/model/nutri/food.model";
import { ActionsInterface } from "src/validation/types/ActionsInterface";
import { ActionCrudInterface } from "src/validation/types/ActionSlideInterface";
import { FORM } from "src/validation/types/FromInterface";
export default class PrimitiveFoodService {
    private permit;
    private model;
    private languaje;
    private lang;
    constructor(permit: AppActions, model: PrimitiveFoodModel, languaje: LanguajeService);
    create({ data }: {
        data: Prisma.PrimitiveFoodCreateInput;
    }): Promise<{
        message: string;
        error: boolean;
        body: {
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
    } | {
        message: string;
        error: boolean;
        body?: undefined;
    }>;
    udpate({ data, id }: {
        data: Prisma.PrimitiveFoodUpdateInput;
        id: string;
    }): Promise<{
        message: string;
        error: boolean;
        body: {
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
    } | {
        message: string;
        error: boolean;
        body?: undefined;
    }>;
    paginate({ skip, take, filter }: {
        skip: number;
        take: number;
        filter: Prisma.PrimitiveFoodWhereInput;
    }): Promise<{
        message: string;
        error: boolean;
        body: {
            next: boolean;
            previw: boolean;
            now: string;
            list: ({
                _count: {
                    foodAll: number;
                    exchangeList: number;
                    menuDetail: number;
                };
            } & {
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
        filter: Prisma.PrimitiveFoodWhereInput;
    }): Promise<{
        message: string;
        error: boolean;
        body: {
            _count: {
                foodAll: number;
                exchangeList: number;
                menuDetail: number;
            };
        } & {
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
    formUpdate(data: PrimitiveFood): FORM;
    formDelete(): Promise<void>;
    getActionsList(actions: string[]): ActionCrudInterface[];
    getActionsUnique(actions: string[]): ActionCrudInterface[];
    getPermits(): ActionsInterface;
}
