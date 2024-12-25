import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma, Subscription } from "@prisma/client";
import ConfigSubscriptionModel from "src/model/master/subsccription.model";
import AppActions from "src/AppActions";
import { ActionCrudInterface } from "src/validation/types/ActionSlideInterface";
import { ActionsInterface } from "src/validation/types/ActionsInterface";
import { FORM } from "src/validation/types/FromInterface";
import { LanguajeService } from "src/languaje/languaje.service";
import { LanguajeInterface } from "src/languaje/guard/languaje.interface";

@Injectable()
export default class ConfigSubscriptionService {

    private lang: LanguajeInterface;
    constructor (
        private permit: AppActions,
        private model: ConfigSubscriptionModel,
        private prisma: PrismaService,

        private languaje: LanguajeService
    ) {
        this.lang = languaje.GetTranslate();
    }
    
    public async findAllDetails (id: string) {
        return await this.prisma.subscriptionDetail.findMany({ where:{ AND:[{subscriptionId:id},{isDelete:false}] } });
    }

    public async deleteDetails ({ id }:{id:string}) {
        return await this.prisma.subscriptionDetail.delete({ where:{id} });
    }

    public async create({ data }: { data:Prisma.SubscriptionCreateInput }) {
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

    public async udpate({ data,id }: { data:Prisma.SubscriptionUpdateInput, id:string }) {
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

    public async paginate({ skip, take, filter }: { skip:number, take:number, filter:Prisma.SubscriptionWhereInput }) {
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

    public async find({ filter }: { filter:Prisma.SubscriptionWhereInput }) {
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
        return [`Nombre`,`Meses`,`Monto`];
    }

    public HeaderListExtract (): string[] {
        return [`name`,`countMonth`,`defaultMount`];
    }

    public HeaderUnique (): string[] {
        return [`Nombre`,`Meses`,`Monto`];
    }

    public HeaderUniqueExtract (): string[] {
        return [`name`,`countMonth`,`defaultMount`]
    }

    public formCreate(): FORM {
        return {
            method: `POST`,
            name: `Crear`,
            path: `/subscription/create`,
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
                    type: `input`,
                    id: `input.create.money.countMonth`,
                    label: `Cantidad de meses`,
                    name: `countMonth`,
                    placeholder: ``,
                    required: true,
                }, {
                    beforeType: `number`,
                    type: `input`,
                    id: `input.create.money.defaultMount`,
                    label: `Costo`,
                    name: `defaultMount`,
                    placeholder: ``,
                    required: true,
                }
            ]
        }
    }
    
    public formUpdate(data: Subscription): FORM {
        return {
            method: `PUT`,
            name: `Actualizar ${data.name}`,
            path: `/subscription/${data.id}/update`,
            fields: [
                {
                    beforeType: `text`,
                    type: `input`,
                    id: `input.update.money.name`,
                    label: `Nombre`,
                    name: `name`,
                    placeholder: data.name,
                    required: true,
                }, {
                    beforeType: `text`,
                    type: `input`,
                    id: `input.update.money.countMonth`,
                    label: `Cantidad de meses`,
                    name: `countMonth`,
                    placeholder: data.countMonth.toString(),
                    required: true,
                }, {
                    beforeType: `number`,
                    type: `input`,
                    id: `input.update.money.defaultMount`,
                    label: `Costo`,
                    name: `defaultMount`,
                    placeholder: data.defaultMount.toString(),
                    required: true,
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
        // if (actions.includes(permit.udpate)) customActions.push({ ico: `add`, label: `Agregar`, path: ``, use: `page` });
        // if (actions.includes(permit.recovery)) customActions.push({ ico: `recovery`, label: `Recuperar`, path: `/dashboard/user`, use: `page` });
        // if(actions.includes(permit.list)) customActions.push({ ico:`list`,label:`Lista`, path:`/user`, use:`page` });

        return customActions;
    }

    public getPermits(): ActionsInterface {
        return {
            list: this.permit.APP_PERMIT_SUBSCRIPTION_LIST ? this.permit.APP_PERMIT_SUBSCRIPTION_LIST : undefined,
            create: this.permit.APP_PERMIT_SUBSCRIPTION_CREATE ? this.permit.APP_PERMIT_SUBSCRIPTION_CREATE : undefined,
            delete: this.permit.APP_PERMIT_SUBSCRIPTION_DELETE ? this.permit.APP_PERMIT_SUBSCRIPTION_DELETE : undefined,
            recovery: this.permit.APP_PERMIT_SUBSCRIPTION_RECOVERY ? this.permit.APP_PERMIT_SUBSCRIPTION_RECOVERY : undefined,
            udpate: this.permit.APP_PERMIT_SUBSCRIPTION_UPDATE ? this.permit.APP_PERMIT_SUBSCRIPTION_UPDATE : undefined,
        }
    }
}
