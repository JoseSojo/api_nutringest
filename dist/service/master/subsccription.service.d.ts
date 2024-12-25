import { PrismaService } from "src/prisma/prisma.service";
import { Prisma, Subscription } from "@prisma/client";
import ConfigSubscriptionModel from "src/model/master/subsccription.model";
import AppActions from "src/AppActions";
import { ActionCrudInterface } from "src/validation/types/ActionSlideInterface";
import { ActionsInterface } from "src/validation/types/ActionsInterface";
import { FORM } from "src/validation/types/FromInterface";
import { LanguajeService } from "src/languaje/languaje.service";
export default class ConfigSubscriptionService {
    private permit;
    private model;
    private prisma;
    private languaje;
    private lang;
    constructor(permit: AppActions, model: ConfigSubscriptionModel, prisma: PrismaService, languaje: LanguajeService);
    findAllDetails(id: string): Promise<{
        id: string;
        name: string;
        createById: string | null;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date;
        mount: Prisma.Decimal;
        dayStart: number;
        monthStart: number;
        yearStart: number;
        dayEnd: number;
        monthEnd: number;
        yearEnd: number;
        subscriptionId: string;
        paymentMethodId: string;
    }[]>;
    deleteDetails({ id }: {
        id: string;
    }): Promise<{
        id: string;
        name: string;
        createById: string | null;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date;
        mount: Prisma.Decimal;
        dayStart: number;
        monthStart: number;
        yearStart: number;
        dayEnd: number;
        monthEnd: number;
        yearEnd: number;
        subscriptionId: string;
        paymentMethodId: string;
    }>;
    create({ data }: {
        data: Prisma.SubscriptionCreateInput;
    }): Promise<{
        message: string;
        error: boolean;
        body: {
            id: string;
            name: string | null;
            createById: string | null;
            isDelete: boolean;
            createAt: Date;
            updateAt: Date;
            countMonth: number;
            defaultMount: number;
        };
    } | {
        message: string;
        error: boolean;
        body?: undefined;
    }>;
    udpate({ data, id }: {
        data: Prisma.SubscriptionUpdateInput;
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
            updateAt: Date;
            countMonth: number;
            defaultMount: number;
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
            updateAt: Date;
            countMonth: number;
            defaultMount: number;
        };
    } | {
        message: string;
        error: boolean;
        body?: undefined;
    }>;
    paginate({ skip, take, filter }: {
        skip: number;
        take: number;
        filter: Prisma.SubscriptionWhereInput;
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
                    createByReference: number;
                    users: number;
                };
                details: {
                    id: string;
                    name: string;
                    createById: string | null;
                    isDelete: boolean;
                    createAt: Date;
                    updateAt: Date;
                    mount: Prisma.Decimal;
                    dayStart: number;
                    monthStart: number;
                    yearStart: number;
                    dayEnd: number;
                    monthEnd: number;
                    yearEnd: number;
                    subscriptionId: string;
                    paymentMethodId: string;
                }[];
            } & {
                id: string;
                name: string | null;
                createById: string | null;
                isDelete: boolean;
                createAt: Date;
                updateAt: Date;
                countMonth: number;
                defaultMount: number;
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
        filter: Prisma.SubscriptionWhereInput;
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
                createByReference: number;
                users: number;
            };
            details: {
                id: string;
                name: string;
                createById: string | null;
                isDelete: boolean;
                createAt: Date;
                updateAt: Date;
                mount: Prisma.Decimal;
                dayStart: number;
                monthStart: number;
                yearStart: number;
                dayEnd: number;
                monthEnd: number;
                yearEnd: number;
                subscriptionId: string;
                paymentMethodId: string;
            }[];
        } & {
            id: string;
            name: string | null;
            createById: string | null;
            isDelete: boolean;
            createAt: Date;
            updateAt: Date;
            countMonth: number;
            defaultMount: number;
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
    formUpdate(data: Subscription): FORM;
    formDelete(): Promise<void>;
    getActionsList(actions: string[]): ActionCrudInterface[];
    getActionsUnique(actions: string[]): ActionCrudInterface[];
    getPermits(): ActionsInterface;
}
