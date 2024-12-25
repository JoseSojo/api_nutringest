import { Prisma } from "@prisma/client";
import PermitModel from "src/model/permit.model";
import AppActions from "src/AppActions";
import { ActionCrudInterface } from "src/validation/types/ActionSlideInterface";
import { ActionsInterface } from "src/validation/types/ActionsInterface";
import { FORM } from "src/validation/types/FromInterface";
import { LanguajeService } from "src/languaje/languaje.service";
export default class PermitService {
    private permit;
    private model;
    private languaje;
    private lang;
    constructor(permit: AppActions, model: PermitModel, languaje: LanguajeService);
    create({ data }: {
        data: Prisma.PermitsCreateInput;
    }): Promise<{
        message: string;
        error: boolean;
        body: {
            id: string;
            name: string;
            createById: string | null;
            isDelete: boolean;
            createAt: Date;
            updateAt: Date;
            roles: Prisma.JsonValue;
        };
    } | {
        message: string;
        error: boolean;
        body?: undefined;
    }>;
    udpate({ data, id }: {
        data: Prisma.PermitsUpdateInput;
        id: string;
    }): Promise<{
        message: string;
        error: boolean;
        body: {
            id: string;
            name: string;
            createById: string | null;
            isDelete: boolean;
            createAt: Date;
            updateAt: Date;
            roles: Prisma.JsonValue;
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
            createById: string | null;
            isDelete: boolean;
            createAt: Date;
            updateAt: Date;
            roles: Prisma.JsonValue;
        };
    } | {
        message: string;
        error: boolean;
        body?: undefined;
    }>;
    paginate({ skip, take, filter }: {
        skip: number;
        take: number;
        filter: Prisma.PermitsWhereInput;
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
                    users: number;
                    createByReference: number;
                };
            } & {
                id: string;
                name: string;
                createById: string | null;
                isDelete: boolean;
                createAt: Date;
                updateAt: Date;
                roles: Prisma.JsonValue;
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
        filter: Prisma.PermitsWhereInput;
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
            createById: string | null;
            isDelete: boolean;
            createAt: Date;
            updateAt: Date;
            roles: Prisma.JsonValue;
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
}
