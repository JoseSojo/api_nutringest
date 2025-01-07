import { Prisma } from "@prisma/client";
import AppActions from "src/AppActions";
import { LanguajeService } from "src/languaje/languaje.service";
import { PrismaService } from "src/prisma/prisma.service";
import { ActionsInterface } from "src/validation/types/ActionsInterface";
import { ActionCrudInterface } from "src/validation/types/ActionSlideInterface";
export default class HistoryService {
    private permit;
    private prisma;
    private languaje;
    private lang;
    constructor(permit: AppActions, prisma: PrismaService, languaje: LanguajeService);
    create(data: Prisma.HistoryCreateInput): Promise<{
        id: string;
        createAt: Date;
        userId: string;
        eventName: string | null;
        objectName: string | null;
        objectReferenceId: string | null;
    }>;
    paginate({ skip, take, filter }: {
        skip: number;
        take: number;
        filter: Prisma.HistoryWhereInput;
    }): Promise<{
        message: string;
        error: boolean;
        body: {
            next: boolean;
            previw: boolean;
            now: string;
            list: {
                id: string;
                createAt: Date;
                userId: string;
                eventName: string | null;
                objectName: string | null;
                objectReferenceId: string | null;
            }[];
            header: string[];
            extrat: string[];
        };
    } | {
        message: string;
        error: boolean;
        body?: undefined;
    }>;
    HeaderList(): string[];
    HeaderListExtract(): string[];
    getPermits(): ActionsInterface;
    getActionsList(actions: string[]): ActionCrudInterface[];
}
