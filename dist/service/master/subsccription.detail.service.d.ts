import { PrismaService } from "src/prisma/prisma.service";
import { Prisma, Subscription } from "@prisma/client";
import AppActions from "src/AppActions";
import { ActionCrudInterface } from "src/validation/types/ActionSlideInterface";
import { ActionsInterface } from "src/validation/types/ActionsInterface";
import { FORM } from "src/validation/types/FromInterface";
import { LanguajeService } from "src/languaje/languaje.service";
import ConfigSubscriptionHandlerModel from "src/model/master/subsccription.detail.model";
import AppEvent from "src/AppEvent";
export default class ConfigSubscriptionHandlerService {
    private events;
    private permit;
    private model;
    private prisma;
    private languaje;
    private lang;
    constructor(events: AppEvent, permit: AppActions, model: ConfigSubscriptionHandlerModel, prisma: PrismaService, languaje: LanguajeService);
    ChangeSubscription({ subscription, userId }: {
        userId: string;
        subscription: string;
    }): Promise<{
        id: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date;
        userId: string;
        task: string;
        completed: boolean;
        extra: Prisma.JsonValue;
    }>;
    GetDateSubscription1Month(): {
        start: {
            day: number;
            month: number;
            year: number;
        };
        end: {
            day: number;
            month: number;
            year: number;
        };
    };
    GetDateSubscription3Month(): {
        start: {
            day: number;
            month: number;
            year: number;
        };
        end: {
            day: number;
            month: number;
            year: number;
        };
    };
    GetDateSubscription6Month(): {
        start: {
            day: number;
            month: number;
            year: number;
        };
        end: {
            day: number;
            month: number;
            year: number;
        };
    };
    GetDateSubscriptionYear(): {
        start: {
            day: number;
            month: number;
            year: number;
        };
        end: {
            day: number;
            month: number;
            year: number;
        };
    };
    GetDateFreeTrial(): {
        start: {
            day: number;
            month: number;
            year: number;
        };
        end: {
            day: number;
            month: number;
            year: number;
        };
    };
    CreateSubscription({ data }: {
        data: Prisma.SubscriptionInUserCreateInput;
    }): Promise<{
        id: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date;
        dayStart: number;
        monthStart: number;
        yearStart: number;
        dayEnd: number;
        monthEnd: number;
        yearEnd: number;
        subscriptionId: string;
        status: string;
        active: boolean;
        userById: string | null;
    }>;
    Create({ data }: {
        data: Prisma.SubscriptionDetailCreateInput;
    }): Promise<{
        id: string;
        name: string;
        createById: string | null;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date;
        mount: Prisma.Decimal;
        paymentMethodId: string;
        dayStart: number;
        monthStart: number;
        yearStart: number;
        dayEnd: number;
        monthEnd: number;
        yearEnd: number;
        subscriptionId: string;
    }>;
    FindMySub({ user }: {
        user: string;
    }): Promise<{
        subscriptionReference: {
            id: string;
            name: string | null;
            createById: string | null;
            isDelete: boolean;
            createAt: Date;
            updateAt: Date;
            countMonth: number;
            defaultMount: number;
        };
        userByReference: {
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
        updateAt: Date;
        dayStart: number;
        monthStart: number;
        yearStart: number;
        dayEnd: number;
        monthEnd: number;
        yearEnd: number;
        subscriptionId: string;
        status: string;
        active: boolean;
        userById: string | null;
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
