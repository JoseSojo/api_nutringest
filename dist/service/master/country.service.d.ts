import { ConfigCountry, Prisma } from "@prisma/client";
import ConfigCountryModel from "src/model/master/country.model";
import AppActions from "src/AppActions";
import { ActionCrudInterface } from "src/validation/types/ActionSlideInterface";
import { ActionsInterface } from "src/validation/types/ActionsInterface";
import { FORM } from "src/validation/types/FromInterface";
import HistoryService from "../history.service";
import AppEvent from "src/AppEvent";
import { LanguajeService } from "src/languaje/languaje.service";
export default class ConfigCountryService {
    private history;
    private appEvents;
    private permit;
    private model;
    private languaje;
    private lang;
    constructor(history: HistoryService, appEvents: AppEvent, permit: AppActions, model: ConfigCountryModel, languaje: LanguajeService);
    create({ data }: {
        data: Prisma.ConfigCountryCreateInput;
    }): Promise<{
        message: string;
        error: boolean;
        body: {
            id: string;
            name: string;
            createById: string;
            isDelete: boolean;
            createAt: Date;
            updateAt: Date;
            coinId: string;
            prefixPhone: string;
        };
    } | {
        message: string;
        error: boolean;
        body?: undefined;
    }>;
    udpate({ data, id }: {
        data: Prisma.ConfigCountryUpdateInput;
        id: string;
    }): Promise<{
        message: string;
        error: boolean;
        body: {
            id: string;
            name: string;
            createById: string;
            isDelete: boolean;
            createAt: Date;
            updateAt: Date;
            coinId: string;
            prefixPhone: string;
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
            createById: string;
            isDelete: boolean;
            createAt: Date;
            updateAt: Date;
            coinId: string;
            prefixPhone: string;
        };
    } | {
        message: string;
        error: boolean;
        body?: undefined;
    }>;
    paginate({ skip, take, filter }: {
        skip: number;
        take: number;
        filter: Prisma.ConfigCountryWhereInput;
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
                    coinReference: number;
                    states: number;
                    createByReference: number;
                };
                coinReference: {
                    id: string;
                    name: string;
                    createById: string;
                    isDelete: boolean;
                    createAt: Date;
                    updateAt: Date | null;
                    prefix: string;
                    description: string;
                };
            } & {
                id: string;
                name: string;
                createById: string;
                isDelete: boolean;
                createAt: Date;
                updateAt: Date;
                coinId: string;
                prefixPhone: string;
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
        filter: Prisma.ConfigCountryWhereInput;
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
        } & {
            id: string;
            name: string;
            createById: string;
            isDelete: boolean;
            createAt: Date;
            updateAt: Date;
            coinId: string;
            prefixPhone: string;
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
    formUpdate(data: ConfigCountry): FORM;
    formDelete(): void;
    getActionsList(actions: string[]): ActionCrudInterface[];
    getActionsUnique(actions: string[]): ActionCrudInterface[];
    getPermits(): ActionsInterface;
}
