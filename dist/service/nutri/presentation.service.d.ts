import { Presentation, Prisma } from "@prisma/client";
import PresentationModel from "src/model/nutri/presentation.model";
import { ActionCrudInterface } from "src/validation/types/ActionSlideInterface";
import { ActionsInterface } from "src/validation/types/ActionsInterface";
import AppActions from "src/AppActions";
import { FORM } from "src/validation/types/FromInterface";
import { LanguajeService } from "src/languaje/languaje.service";
export default class PresentationService {
    private permit;
    private model;
    private languaje;
    private lang;
    constructor(permit: AppActions, model: PresentationModel, languaje: LanguajeService);
    create({ data }: {
        data: Prisma.PresentationCreateInput;
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
            supplementId: string;
        };
    } | {
        message: string;
        error: boolean;
        body?: undefined;
    }>;
    udpate({ data, id }: {
        data: Prisma.PresentationUpdateInput;
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
            supplementId: string;
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
            supplementId: string;
        };
    } | {
        message: string;
        error: boolean;
        body?: undefined;
    }>;
    paginate({ skip, take, filter }: {
        skip: number;
        take: number;
        filter: Prisma.PresentationWhereInput;
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
                SupplementReference: {
                    id: string;
                    name: string;
                };
            } & {
                id: string;
                name: string;
                createById: string;
                isDelete: boolean;
                createAt: Date;
                updateAt: Date;
                supplementId: string;
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
        filter: Prisma.PresentationWhereInput;
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
            SupplementReference: {
                id: string;
                name: string;
            };
        } & {
            id: string;
            name: string;
            createById: string;
            isDelete: boolean;
            createAt: Date;
            updateAt: Date;
            supplementId: string;
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
    formUpdate(data: Presentation): FORM;
    formDelete(): Promise<void>;
    getActionsList(actions: string[]): ActionCrudInterface[];
    getActionsUnique(actions: string[]): ActionCrudInterface[];
    getPermits(): ActionsInterface;
}
