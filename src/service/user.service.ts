import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import UserModel from "src/model/user.model";
import * as bcrypt from "bcrypt";
import { ActionCrudInterface } from "src/validation/types/ActionSlideInterface";
import AppActions from "src/AppActions";
import { ActionsInterface } from "src/validation/types/ActionsInterface";
import { FORM } from "src/validation/types/FromInterface";
import { LanguajeService } from "src/languaje/languaje.service";
import { LanguajeInterface } from "src/languaje/guard/languaje.interface";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export default class UserService {

    private salt = 11;
    private lang: LanguajeInterface;

    constructor(
        private model: UserModel,
        private permit: AppActions,
        private prisma: PrismaService,

        private languaje: LanguajeService
    ) {
        this.lang = languaje.GetTranslate();
    }

    public async create({ data }: { data: Prisma.UserCreateInput }) {
        try {

            const hashPassword = await this.Hash({ password: data.password });

            const resultPromise = this.model.create({
                data: {
                    ...data,
                    password: hashPassword
                }
            });

            const result = await resultPromise;

            return {
                message: this.lang.ACTIONS.SUCCESS.CREATE,
                error: false,
                body: result
            }

        } catch (error) {
            return {
                message: this.lang.ACTIONS.NOT_FOUND,
                error: true
            }
        }
    }

    public async udpate({ data, id }: { data: Prisma.UserUpdateInput, id: string }) {
        try {

            const resultPromise = this.model.update({ data, filter: { id } });

            const result = await resultPromise;

            return {
                message: this.lang.ACTIONS.SUCCESS.UPDATE,
                error: false,
                body: result
            }

        } catch (error) {
            return {
                message: this.lang.ACTIONS.NOT_FOUND,
                error: true
            }
        }
    }

    public async delete({ id }: { id: string }) {
        try {

            const resultPromise = this.model.softDelete({ id });

            const result = await resultPromise;

            return {
                message: this.lang.ACTIONS.SUCCESS.DELETE,
                error: false,
                body: result
            }

        } catch (error) {
            return {
                message: this.lang.ACTIONS.NOT_FOUND,
                error: true
            }
        }
    }

    public async paginate({ skip, take, filter }: { skip: number, take: number, filter: Prisma.UserWhereInput }) {
        try {
            const resultPromise = this.model.findAll({ filter, skip, take });
            const countPromise = this.model.count({ filter });

            const result = await resultPromise;
            const count = await countPromise;
            const next = skip + take > count ? false : true;
            const previw = skip < take ? false : true;

            const test = skip + take;
            const now = `${test < count ? test : count}/${count}`;

            return {
                message: this.lang.ACTIONS.SUCCESS.LIST,
                error: false,
                body: {
                    next,
                    previw,
                    now,
                    list: result,
                    header: this.HeaderList(),
                    extrat: this.HeaderListExtract(),
                }
            }

        } catch (error) {
            return {
                message: this.lang.ACTIONS.NOT_FOUND,
                error: true
            }
        }
    }

    public async find({ filter }: { filter: Prisma.UserWhereInput }) {
        try {

            const resultPromise = this.model.find({ filter });


            const result = await resultPromise;

            return {
                message: this.lang.ACTIONS.SUCCESS.LIST,
                error: false,
                body: {
                    data: result
                }
            }

        } catch (error) {
            return {
                message: this.lang.ACTIONS.NOT_FOUND,
                error: true
            }
        }
    }

    // Create PaymentMethod
    public async createPaymentMethod({ data }: { data: Prisma.PaymetInUserCreateInput }) {
        try {
            const result = this.prisma.paymetInUser.create({ data });

            return {
                error: false,
                message: this.lang.ACTIONS.SUCCESS.CREATE,
                body: await result
            };
        } catch (error) {
            return {
                error: true,
                message: this.lang.ACTIONS.DANGER.CREATE
            }
        }
    }

    public async paginatePayment({ skip, take, filter }: { skip: number, take: number, filter: Prisma.PaymetInUserWhereInput }) {
        try {
            const resultPromise = this.prisma.paymetInUser.findMany({ where:filter, skip, take,include:{paymentReference:true,userReference:true} });
            const countPromise = this.prisma.paymetInUser.count({ where:filter });

            const result = await resultPromise;
            const count = await countPromise;
            const next = skip + take > count ? false : true;
            const previw = skip < take ? false : true;

            const test = skip + take;
            const now = `${test < count ? test : count}/${count}`;

            return {
                message: this.lang.ACTIONS.SUCCESS.LIST,
                error: false,
                body: {
                    next,
                    previw,
                    now,
                    list: result,
                    header: [`Método de pago`,`Propietario`,`Datos`],
                    extrat: [`paymentReference.name`,`userReference.email`,`description`],
                }
            }

        } catch (error) {
            return {
                message: this.lang.ACTIONS.NOT_FOUND,
                error: true
            }
        }
    }

    public async Hash({ password }: { password: string }) {
        return await bcrypt.hash(password, this.salt);
    }

    public async Compare({ password, dbPassword }: { password: string, dbPassword: string }) {
        return await bcrypt.compare(password, dbPassword);
    }

    // FINANCE
    public async Finance({payment,userId,mount,date}:{date:string,userId:string,payment:string,mount:number}) {
        const result = this.prisma.paymentFinance.create({ 
            data:{
                date,
                mount,
                paymentInUser: { connect:{id:payment} },
                userReference: { connect:{id:userId} }
            }
        });
        return await result;
    }

    public async FinanceUpdate({id,status}:{id:string,status:string}) {
        const result = this.prisma.paymentFinance.update({ 
            data:{
                status
            },
            where: {
                id
            },
            include: {
                paymentInUser: {
                    include: {
                        paymentReference: true
                    }
                }
            }
        });

        if(status === `APROVADO`) {

        }

        return await result;
    }

    public async paginateFinance({ skip, take, filter }: { skip: number, take: number, filter: Prisma.PaymentFinanceWhereInput }) {
        try {
            const resultPromise = this.prisma.paymentFinance.findMany({ 
                where:filter, 
                skip, 
                take,
                include:{
                    paymentInUser: {
                        include: {
                            paymentReference: true,
                            userReference: true,
                        },
                    },
                    userReference: true
                }
            });
            const countPromise = this.prisma.paymentFinance.count({ where:filter });

            const result = await resultPromise;
            const count = await countPromise;
            const next = skip + take > count ? false : true;
            const previw = skip < take ? false : true;

            const test = skip + take;
            const now = `${test < count ? test : count}/${count}`;

            return {
                message: this.lang.ACTIONS.SUCCESS.LIST,
                error: false,
                body: {
                    next,
                    previw,
                    now,
                    list: result,
                    header: [`Estado`,`Método de pago`,`Monto`,`Fecha`],
                    extrat: [`status`,`paymentInUser.paymentReference.name`,`mount`,`createAt`],
                }
            }

        } catch (error) {
            return {
                message: this.lang.ACTIONS.NOT_FOUND,
                error: true
            }
        }
    }

    // WALLET

    public HeaderList(): string[] {
        return [`Nombre`, `Apellido`, `Usuario`, `Correo`, `Permisos`]
    }

    public HeaderListExtract(): string[] {
        return [`name`, `lastname`, `username`, `email`, `rolReference.name`]
    }

    public HeaderUnique(): string[] {
        return [`Nombre`, `Apellido`]
    }

    public ExtractUnique(): string[] {
        return [`name`, `lastname`]
    }

    public formCreate(): FORM {
        return {
            method: `POST`,
            name: `Crear`,
            path: `/user/create`,
            fields: [
                {
                    beforeType: `text`,
                    type: `input`,
                    id: `form.user.create.username`,
                    label: `Usuario`,
                    name: `username`,
                    placeholder: `steven001`,
                    required: true
                }, {
                    beforeType: `email`,
                    type: `input`,
                    id: `form.user.create.email`,
                    label: `Coreo`,
                    name: `email`,
                    placeholder: `steven001@gmail.com`,
                    required: true
                }, {
                    beforeType: `password`,
                    type: `input`,
                    id: `form.user.create.password`,
                    label: `Contraseña`,
                    name: `password`,
                    placeholder: `* * * * * * * * *`,
                    required: true
                }, {
                    beforeType: `text`,
                    type: `select`,
                    id: `form.user.create.permit`,
                    label: `Permiso`,
                    name: `rolId`,
                    placeholder: ``,
                    required: true,
                    select: {
                        active: true,
                        in: `permit`
                    }
                }
            ]
        }
    }

    public formUpdate(user: User) {
        return {
            method: `POST`,
            name: `Crear`,
            path: `/user/${user.id}/update`,
            fields: [
                {
                    beforeType: `text`,
                    type: `input`,
                    id: `form.user.create.name`,
                    label: `Nombre`,
                    name: `name`,
                    placeholder: `${user.name ? user.name : ``}`,
                    required: true
                }, {
                    beforeType: `text`,
                    type: `input`,
                    id: `form.user.create.lastname`,
                    label: `Apellido`,
                    name: `lastname`,
                    placeholder: `${user.lastname ? user.lastname : ``}`,
                    required: true
                }, {
                    beforeType: `text`,
                    type: `input`,
                    id: `form.user.create.username`,
                    label: `Usuario`,
                    name: `username`,
                    placeholder: `${user.username ? user.username : ``}`,
                    required: true
                }, {
                    beforeType: `email`,
                    type: `input`,
                    id: `form.user.create.email`,
                    label: `Coreo`,
                    name: `email`,
                    placeholder: `${user.email ? user.email : ``}`,
                    required: true
                }, {
                    beforeType: `password`,
                    type: `input`,
                    id: `form.user.create.password`,
                    label: `Contraseña`,
                    name: `password`,
                    placeholder: `* * * * * * * * *`,
                    required: true
                }
            ]
        }
    }

    public formDelete() { }

    public getActionsList(actions: string[]): ActionCrudInterface[] {
        const permit = this.getPermits();
        const customActions: ActionCrudInterface[] = [];

        if (actions.includes(permit.list)) customActions.push({ ico: `list`, label: `Lista`, path: `/dashboard/user`, use: `page` });
        if (actions.includes(permit.create)) customActions.push({ ico: `create`, label: `Crear`, path: `/dashboard/user`, use: `modal` });
        if (actions.includes(this.permit.APP_PERMIT_PROPIETARY_PATIENT)) customActions.push({ ico: `create`, label: `Crear Paciente`, path: `/patient`, use: `page` });

        return customActions;
    }

    public getActionsUnique(actions: string[]): ActionCrudInterface[] {
        const permit = this.getPermits();
        const customActions: ActionCrudInterface[] = [];

        if (actions.includes(permit.list)) customActions.push({ ico: `unique`, label: `Ver`, path: `/dashboard/user`, use: `page` });
        if (actions.includes(permit.delete)) customActions.push({ ico: `delete`, label: `Eliminar`, path: `/dashboard/user`, use: `modal` });
        if (actions.includes(permit.udpate)) customActions.push({ ico: `update`, label: `Actualizar`, path: `/dashboard/user`, use: `modal` });
        // if (actions.includes(permit.recovery)) customActions.push({ ico: `recovery`, label: `Recuperar`, path: `/dashboard/user`, use: `page` });
        // if(actions.includes(permit.list)) customActions.push({ ico:`list`,label:`Lista`, path:`/user`, use:`page` });

        return customActions;
    }

    public getActionsUniqueNutri(actions: string[]): ActionCrudInterface[] {
        const permit = this.getPermitsNutricionist();
        const customActions: ActionCrudInterface[] = [];

        if (actions.includes(permit.list)) customActions.push({ ico: `unique`, label: `Ver`, path: `/dashboard/user`, use: `page` });
        if (actions.includes(permit.delete)) customActions.push({ ico: `delete`, label: `Eliminar`, path: `/dashboard/user`, use: `modal` });
        // if (actions.includes(permit.udpate)) customActions.push({ ico: `update`, label: `Actualizar`, path: `/dashboard/user`, use: `modal` });
        // if (actions.includes(permit.udpate)) customActions.push({ ico: `update`, label: `Actualizar`, path: `/dashboard/patient/update/`, use: `page` });
        // if (actions.includes(permit.recovery)) customActions.push({ ico: `recovery`, label: `Recuperar`, path: `/dashboard/user`, use: `page` });
        // if(actions.includes(permit.list)) customActions.push({ ico:`list`,label:`Lista`, path:`/user`, use:`page` });

        return customActions;
    }

    public getActionsUniquePatient(actions: string[]): ActionCrudInterface[] {
        const permit = this.getPermitsPaciente();
        const customActions: ActionCrudInterface[] = [];

        if (actions.includes(permit.list)) customActions.push({ ico: `unique`, label: `Ver`, path: `/dashboard/user`, use: `page` });
        if (actions.includes(permit.delete)) customActions.push({ ico: `delete`, label: `Eliminar`, path: `/dashboard/user`, use: `modal` });
        // if (actions.includes(permit.udpate)) customActions.push({ ico: `update`, label: `Actualizar`, path: `/dashboard/user`, use: `modal` });
        if (actions.includes(permit.udpate)) customActions.push({ ico: `update`, label: `Actualizar`, path: `/dashboard/patient/update/`, use: `page` });
        // if (actions.includes(permit.recovery)) customActions.push({ ico: `recovery`, label: `Recuperar`, path: `/dashboard/user`, use: `page` });
        // if(actions.includes(permit.list)) customActions.push({ ico:`list`,label:`Lista`, path:`/user`, use:`page` });

        return customActions;
    }

    public getPermits(): ActionsInterface {
        return {
            list: this.permit.APP_PERMIT_USER_LIST ? this.permit.APP_PERMIT_USER_LIST : undefined,
            create: this.permit.APP_PERMIT_USER_CREATE ? this.permit.APP_PERMIT_USER_CREATE : undefined,
            delete: this.permit.APP_PERMIT_USER_DELETE ? this.permit.APP_PERMIT_USER_DELETE : undefined,
            recovery: this.permit.APP_PERMIT_USER_RECOVERY ? this.permit.APP_PERMIT_USER_RECOVERY : undefined,
            udpate: this.permit.APP_PERMIT_USER_UPDATE ? this.permit.APP_PERMIT_USER_UPDATE : undefined,
        }
    }

    public getPermitsPaciente(): ActionsInterface {
        return {
            list: this.permit.APP_PERMIT_USER_SPECITY_NUTRICIONISTA ? this.permit.APP_PERMIT_USER_SPECITY_NUTRICIONISTA : undefined,
            create: undefined,
            delete: undefined,
            recovery: undefined,
            udpate: undefined,
        }
    }

    public getPermitsNutricionist(): ActionsInterface {
        return {
            list: this.permit.APP_PERMIT_USER_SPECITY_PACIENTE ? this.permit.APP_PERMIT_USER_SPECITY_PACIENTE : undefined,
            create: this.permit.APP_PERMIT_USER_SPECITY_PACIENTE ? this.permit.APP_PERMIT_USER_SPECITY_PACIENTE : undefined,
            delete: this.permit.APP_PERMIT_USER_SPECITY_PACIENTE ? this.permit.APP_PERMIT_USER_SPECITY_PACIENTE : undefined,
            recovery: this.permit.APP_PERMIT_USER_SPECITY_PACIENTE ? this.permit.APP_PERMIT_USER_SPECITY_PACIENTE : undefined,
            udpate: undefined,
        }
    }

    public async generateCode(): Promise<string> {
        let code: string = this.getRandomCode();

        do {
            code = this.getRandomCode();
        } while (await this.model.find({ filter: { propietaryCode: code } }));

        return code;
    }

    private getRandomCode(): string {
        // Generar un número aleatorio entre 0 y 9999999 y luego agregar ceros a la izquierda si es necesario.
        const randomNum = Math.floor(Math.random() * 10000000);
        return randomNum.toString().padStart(7, '0');
    }
}
