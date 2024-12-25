import { PrismaService } from "src/prisma/prisma.service";
export default class ConfigSubscriptionHandlerModel {
    private prisma;
    constructor(prisma: PrismaService);
    createInUser({ dateEnd, dateStart, subscription, user }: {
        subscription: string;
        user: string;
        dateStart: {
            day: number;
            month: number;
            year: number;
        };
        dateEnd: {
            day: number;
            month: number;
            year: number;
        };
    }): Promise<{
        id: string;
        isDelete: boolean;
        createAt: Date;
        updateAt: Date;
        status: string;
        active: boolean;
        dayStart: number;
        monthStart: number;
        yearStart: number;
        dayEnd: number;
        monthEnd: number;
        yearEnd: number;
        subscriptionId: string;
        userById: string | null;
    }>;
    findMySubscription({ user }: {
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
        status: string;
        active: boolean;
        dayStart: number;
        monthStart: number;
        yearStart: number;
        dayEnd: number;
        monthEnd: number;
        yearEnd: number;
        subscriptionId: string;
        userById: string | null;
    }>;
}
