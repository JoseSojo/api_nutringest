import { ConfigCity, Prisma } from "@prisma/client";
import ConfigCityModel from "src/model/master/city.model";
import AppActions from "src/AppActions";
import { ActionsInterface } from "src/validation/types/ActionsInterface";
import { ActionCrudInterface } from "src/validation/types/ActionSlideInterface";
import { FORM } from "src/validation/types/FromInterface";
import { LanguajeService } from "src/languaje/languaje.service";
export default class ConfigCityService {
    private permit;
    private model;
    private languaje;
    private lang;
    constructor(permit: AppActions, model: ConfigCityModel, languaje: LanguajeService);
    create({ data }: {
        data: Prisma.ConfigCityCreateInput;
    }): Promise<{
        message: string;
        error: boolean;
        body: {
            id: string;
            name: string;
            stateId: string;
            createById: string;
            isDelete: boolean;
            createAt: Date;
            updateAt: Date;
        };
    } | {
        message: string;
        error: boolean;
        body?: undefined;
    }>;
    udpate({ data, id }: {
        data: Prisma.UserUpdateInput;
        id: string;
    }): Promise<{
        message: string;
        error: boolean;
        body: {
            id: string;
            name: string;
            stateId: string;
            createById: string;
            isDelete: boolean;
            createAt: Date;
            updateAt: Date;
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
            stateId: string;
            createById: string;
            isDelete: boolean;
            createAt: Date;
            updateAt: Date;
        };
    } | {
        message: string;
        error: boolean;
        body?: undefined;
    }>;
    paginate({ skip, take, filter }: {
        skip: number;
        take: number;
        filter: Prisma.ConfigCityWhereInput;
    }): Promise<{
        message: string;
        error: boolean;
        body: {
            next: boolean;
            previw: boolean;
            now: string;
            list: ({
                stateReference: {
                    id: string;
                    name: string;
                    createById: string;
                    isDelete: boolean;
                    createAt: Date;
                    updateAt: Date;
                    countryId: string;
                };
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
                    stateReference: number;
                    createByReference: number;
                    users: number;
                };
            } & {
                id: string;
                name: string;
                stateId: string;
                createById: string;
                isDelete: boolean;
                createAt: Date;
                updateAt: Date;
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
        filter: Prisma.ConfigCityWhereInput;
    }): Promise<{
        message: string;
        error: boolean;
        body: {
            stateReference: {
                id: string;
                name: string;
                createById: string;
                isDelete: boolean;
                createAt: Date;
                updateAt: Date;
                countryId: string;
            };
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
            users: {
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
            }[];
            _count: {
                stateReference: number;
                createByReference: number;
                users: number;
            };
        } & {
            id: string;
            name: string;
            stateId: string;
            createById: string;
            isDelete: boolean;
            createAt: Date;
            updateAt: Date;
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
    formUpdate(data: ConfigCity): FORM;
    formDelete(): Promise<void>;
    getActionsList(actions: string[]): ActionCrudInterface[];
    getActionsUnique(actions: string[]): ActionCrudInterface[];
    getPermits(): ActionsInterface;
}
