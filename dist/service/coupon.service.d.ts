import { Prisma } from "@prisma/client";
import AppActions from "src/AppActions";
import { LanguajeService } from "src/languaje/languaje.service";
import CouponModel from "src/model/coupon.model";
import UserModel from "src/model/user.model";
import { PrismaService } from "src/prisma/prisma.service";
import { ActionsInterface } from "src/validation/types/ActionsInterface";
import { ActionCrudInterface } from "src/validation/types/ActionSlideInterface";
import { FORM } from "src/validation/types/FromInterface";
export default class CouponService {
    private prisma;
    private userModel;
    private permit;
    private model;
    private languaje;
    private lang;
    constructor(prisma: PrismaService, userModel: UserModel, permit: AppActions, model: CouponModel, languaje: LanguajeService);
    CreateCoupon({ code, description }: {
        code: string;
        description: string;
    }): Promise<{}>;
    paginate({ skip, take, filter }: {
        skip: number;
        take: number;
        filter: Prisma.CouponsWhereInput;
    }): Promise<{
        message: string;
        error: boolean;
        body: {
            next: boolean;
            previw: boolean;
            now: string;
            list: ({
                propietaryReference: {
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
                description: string;
                mount: Prisma.Decimal;
                propietaryId: string;
                use: boolean;
            })[];
            header: string[];
            extrat: string[];
            headerMin: string[];
            extratMin: string[];
        };
    } | {
        message: string;
        error: boolean;
        body?: undefined;
    }>;
    find({ filter }: {
        filter: Prisma.CouponsWhereInput;
    }): Promise<{
        message: string;
        error: boolean;
        body: {
            propietaryReference: {
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
            description: string;
            mount: Prisma.Decimal;
            propietaryId: string;
            use: boolean;
        };
    } | {
        message: string;
        error: boolean;
        body?: undefined;
    }>;
    HeaderList(): string[];
    HeaderListExtract(): string[];
    HeaderMinList(): string[];
    HeaderMinListExtract(): string[];
    HeaderUnique(): string[];
    HeaderUniqueExtract(): string[];
    formCreate(): FORM;
    formUpdate(): Promise<void>;
    formDelete(): Promise<void>;
    getActionsList(actions: string[]): ActionCrudInterface[];
    getActionsUnique(actions: string[], p?: boolean): ActionCrudInterface[];
    getActionsUniqueInQuote(actions: string[], p?: boolean): ActionCrudInterface[];
    getActionsUniquePropietary(actions: string[]): ActionCrudInterface[];
    getPermits(): ActionsInterface;
    getPermitsPropietary(): ActionsInterface;
}
