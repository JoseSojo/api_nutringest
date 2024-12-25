import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PaymentMethod, Prisma } from "@prisma/client";
import PaymentMethodModel from "src/model/master/payment.model";
import AppActions from "src/AppActions";
import { ActionsInterface } from "src/validation/types/ActionsInterface";
import { ActionCrudInterface } from "src/validation/types/ActionSlideInterface";
import { FORM } from "src/validation/types/FromInterface";
import HistoryService from "../history.service";
import AppEvent from "src/AppEvent";
import { LanguajeService } from "src/languaje/languaje.service";
import { LanguajeInterface } from "src/languaje/guard/languaje.interface";

@Injectable()
export default class PaymentMethodService {

    private lang: LanguajeInterface;
    constructor (
        private permit: AppActions,
        private model: PaymentMethodModel,

        private languaje: LanguajeService
    ) {
        this.lang = languaje.GetTranslate();
    }
    
    public async create({ data }: { data:Prisma.PaymentMethodCreateInput }) {
        try {
            
            const resultPromise = this.model.create({ data });

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

    public async udpate({ data,id }: { data:Prisma.PaymentMethodUpdateInput, id:string }) {
        try {
            
            const resultPromise = this.model.update({ data, filter:{id} });

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

    public async delete({ id }: { id:string }) {
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

    public async paginate({ skip, take, filter }: { skip:number, take:number, filter:Prisma.PaymentMethodWhereInput }) {
        try {
            
            const resultPromise = this.model.findAll({ filter,skip,take });
            const countPromise = this.model.count({ filter });

            const result = await resultPromise;
            const count = await countPromise;
            const next    = skip+take > count ? false : true;
            const previw = count <= take ? false : true;

            const test = skip+take;
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

    public async find({ filter }: { filter:Prisma.PaymentMethodWhereInput }) {
        try {
            
            const resultPromise = this.model.find({ filter });

            const result = await resultPromise;

            return {
                message: this.lang.ACTIONS.SUCCESS.LIST,
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

    public HeaderList (): string[] {
        return [`Nombre`,`Moneda`,`Creador`]
    }

    public HeaderListExtract (): string[] {
        return [`name`,`moneyReference.name`,`createByReference.email`]
    }

    public HeaderUnique (): string[] {
        return [`Nombre`]
    }

    public HeaderUniqueExtract (): string[] {
        return [`name`]
    }

    public formCreate(): FORM {
        return {
            method: `POST`,
            name: `Crear`,
            path: `/payment/create`,
            fields: [
                {
                    beforeType: `text`,
                    type: `input`,
                    id: `input.create.money.name`,
                    label: `Nombre`,
                    name: `name`,
                    placeholder: `Nombre`,
                    required: true
                }, {
                    beforeType: `text`,
                    type: `select`,
                    id: `input.create.money.moneyId`,
                    label: `Moneda`,
                    name: `moneyId`,
                    placeholder: ``,
                    required: true,
                    select: {
                        active: true,
                        in: `money`
                    }
                }, {
                    beforeType: `text`,
                    type: `input`,
                    id: `input.create.money.description`,
                    label: `Descripción`,
                    name: `description`,
                    placeholder: `Descripción del método de pago`,
                    required: true,
                    select: {
                        active: true,
                        in: `state`
                    }
                }
            ]
        }
    }
    
    public formUpdate(data: PaymentMethod): FORM {
        return {
            method: `PUT`,
            name: `Actualizar ${data.name}`,
            path: `/payment/${data.id}/udpate/`,
            fields: [
                {
                    beforeType: `text`,
                    type: `input`,
                    id: `input.update.money.name`,
                    label: `Nombre`,
                    name: `name`,
                    placeholder: data.name,
                    required: true
                }, {
                    beforeType: `text`,
                    type: `input`,
                    id: `input.update.money.description`,
                    label: `Nombre`,
                    name: `description`,
                    placeholder: data.description,
                    required: true
                }
            ]
        }
    }

    public async formDelete() {}

    public getActionsList(actions: string[]): ActionCrudInterface[] {
        const permit = this.getPermits();
        const customActions: ActionCrudInterface[] = [];

        if (actions.includes(permit.list)) customActions.push({ ico: `list`, label: `Lista`, path: `/dashboard/user`, use: `page` });
        if (actions.includes(permit.create)) customActions.push({ ico: `create`, label: `Crear`, path: `/dashboard/user`, use: `modal` });
        // if(actions.includes(permit.list)) customActions.push({ ico:`list`,label:`Lista`, path:`/user`, use:`page` });

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

    public getPermits(): ActionsInterface {
        return {
            list: this.permit.APP_PERMIT_PAYMENT_METHOD_LIST ? this.permit.APP_PERMIT_PAYMENT_METHOD_LIST : undefined,
            create: this.permit.APP_PERMIT_PAYMENT_METHOD_CREATE ? this.permit.APP_PERMIT_PAYMENT_METHOD_CREATE : undefined,
            delete: this.permit.APP_PERMIT_PAYMENT_METHOD_DELETE ? this.permit.APP_PERMIT_PAYMENT_METHOD_DELETE : undefined,
            recovery: this.permit.APP_PERMIT_PAYMENT_METHOD_RECOVERY ? this.permit.APP_PERMIT_PAYMENT_METHOD_RECOVERY : undefined,
            udpate: this.permit.APP_PERMIT_PAYMENT_METHOD_UPDATE ? this.permit.APP_PERMIT_PAYMENT_METHOD_UPDATE : undefined,
        }
    }    
}
