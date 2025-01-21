import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";
import ExchangeListModel from "src/model/quote/exchange.model";
import AppActions from "src/AppActions";
import { ActionCrudInterface } from "src/validation/types/ActionSlideInterface";
import { ActionsInterface } from "src/validation/types/ActionsInterface";
import { FORM } from "src/validation/types/FromInterface";
import { LanguajeService } from "src/languaje/languaje.service";
import { LanguajeInterface } from "src/languaje/guard/languaje.interface";

@Injectable()
export default class ExchangeListService {

    private lang: LanguajeInterface;
    constructor (
        private prisma: PrismaService,
        private permit: AppActions,
        private model: ExchangeListModel,

        private languaje: LanguajeService
    ) {
        this.lang = languaje.GetTranslate();
    }
    
    public async create({ data }: { data:Prisma.ExchangeListCreateInput }) {
        try {
            
            const resultPromise = this.model.create({ data });

            const result = await resultPromise;

            return {
                message: this.lang.ACTIONS.SUCCESS.CREATE,
                error: false,
                body: result
            }

        } catch (error) {
            console.log(error);
            return {
                message: this.lang.ACTIONS.NOT_FOUND,
                error: true
            }
        }
    }

    public async createManyFood ({ data }:{data:Prisma.ExchangeListFoodsCreateInput}) {
        return await this.prisma.exchangeListFoods.create({ data });
    }

    public async udpateFood ({ data,id }:{id:string,data:Prisma.ExchangeListFoodsUpdateInput}) {
        return await this.prisma.exchangeListFoods.update({ data, where:{ id } });
    }

    public async udpate({ data,id }: { data:Prisma.ExchangeListUpdateInput, id:string }) {
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

    public async paginate({ skip, take, filter }: { skip:number, take:number, filter:Prisma.ExchangeListWhereInput }) {
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
                    headerMin: this.HeaderMinList(),
                    extratMin: this.HeaderMinListExtract(),
                }
            }

        } catch (error) {
            return {
                message: this.lang.ACTIONS.NOT_FOUND,
                error: true
            }
        }
    }

    public async find({ filter }: { filter:Prisma.ExchangeListWhereInput }) {
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
        return [`Nombre`,`Contabilidad alimentos`,`Contabilidad citas`,`Creador`]
    }

    public HeaderListExtract (): string[] {
        return [`name`,`_count.foods`,`_count.exchange`,`userReference.email`]
    }

    public HeaderMinList (): string[] {
        return [`Nombre`,`Contabilidad alimentos`];
    }

    public HeaderMinListExtract (): string[] {
        return [`name`,`_count.foods`];
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
            path: `/exchange/create`,
            fields: [
                {
                    beforeType: `text`,
                    type: `input`,
                    id: `input`,
                    label: `Nombre`,
                    name: `name`,
                    placeholder: `Nombre...`,
                    required: true
                }, 
            ]
        }
    }
    
    public async formUpdate() {}

    public async formDelete() {}

    public getActionsList(actions: string[]): ActionCrudInterface[] {
        const permit = this.getPermitsPropietary();
        const customActions: ActionCrudInterface[] = [];

        if (actions.includes(permit.list)) customActions.push({ ico: `list`, label: `Lista`, path: `/dashboard/user`, use: `page` });
        if (actions.includes(permit.create)) customActions.push({ ico: `create`, label: `Crear`, path: `/dashboard/exchange/create`, use: `page` });
        // if(actions.includes(permit.list)) customActions.push({ ico:`list`,label:`Lista`, path:`/user`, use:`page` });

        return customActions;
    }

    public getActionsUnique(actions: string[], p?: boolean): ActionCrudInterface[] {
        const permit = p ? this.getPermitsPropietary() : this.getPermits();
        const customActions: ActionCrudInterface[] = [];

        if (actions.includes(permit.list)) customActions.push({ ico: `unique`, label: `Ver`, path: `/dashboard/user`, use: `page` });
        if (actions.includes(permit.delete)) customActions.push({ ico: `delete`, label: `Eliminar`, path: `/dashboard/user`, use: `modal` });
        if (actions.includes(permit.udpate)) customActions.push({ ico: `update`, label: `Actualizar`,path: `/dashboard/exchange/update`, use: `page` });
        if (actions.includes(permit.add)) customActions.push({ ico: `add`, label: `Asignar`, path: `/dashboard/user`, use: `modal` });
        // if (actions.includes(permit.recovery)) customActions.push({ ico: `recovery`, label: `Recuperar`, path: `/dashboard/user`, use: `page` });
        // if(actions.includes(permit.list)) customActions.push({ ico:`list`,label:`Lista`, path:`/user`, use:`page` });

        return customActions;
    }

    public getActionsUniqueInQuote(actions: string[], p?: boolean): ActionCrudInterface[] {
        const permit = p ? this.getPermitsPropietary() : this.getPermits();
        const customActions: ActionCrudInterface[] = [];

        if (actions.includes(permit.list)) customActions.push({ ico: `unique`, label: `Ver`, path: `/dashboard/user`, use: `page` });
        if (actions.includes(permit.delete)) customActions.push({ ico: `remove`, label: `Remover`, path: `/dashboard/user`, use: `modal` });
        // if (actions.includes(permit.recovery)) customActions.push({ ico: `recovery`, label: `Recuperar`, path: `/dashboard/user`, use: `page` });
        // if(actions.includes(permit.list)) customActions.push({ ico:`list`,label:`Lista`, path:`/user`, use:`page` });

        return customActions;
    }

    public getActionsUniquePropietary(actions: string[]): ActionCrudInterface[] {
        const permit = this.getPermits();
        const customActions: ActionCrudInterface[] = [];

        if (actions.includes(permit.list)) customActions.push({ ico: `unique`, label: `Ver`, path: `/dashboard/user`, use: `page` });
        if (actions.includes(permit.delete)) customActions.push({ ico: `delete`, label: `Eliminar`, path: `/dashboard/user`, use: `modal` });
        if (actions.includes(permit.udpate)) customActions.push({ ico: `update`, label: `Actualizar`, path: `/dashboard/exchange/update`, use: `page` });
        if (actions.includes(permit.add)) customActions.push({ ico: `add`, label: `Asignar`, path: `/dashboard/user`, use: `modal` });
        // if (actions.includes(permit.recovery)) customActions.push({ ico: `recovery`, label: `Recuperar`, path: `/dashboard/user`, use: `page` });
        // if(actions.includes(permit.list)) customActions.push({ ico:`list`,label:`Lista`, path:`/user`, use:`page` });

        return customActions;
    }

    public getPermits(): ActionsInterface {
        return {
            list: this.permit.APP_PERMIT_EXCHANGE_LIST_LIST ? this.permit.APP_PERMIT_EXCHANGE_LIST_LIST : undefined,
            create: this.permit.APP_PERMIT_EXCHANGE_LIST_CREATE ? this.permit.APP_PERMIT_EXCHANGE_LIST_CREATE : undefined,
            delete: undefined,
            recovery: this.permit.APP_PERMIT_EXCHANGE_LIST_RECOVERY ? this.permit.APP_PERMIT_EXCHANGE_LIST_RECOVERY : undefined,
            udpate: undefined,
            add: this.permit.APP_PERMIT_EXCHANGE_LIST_ADD ? this.permit.APP_PERMIT_EXCHANGE_LIST_ADD : undefined,
        }
    }

    public getPermitsPropietary(): ActionsInterface {
        return {
            list: this.permit.APP_PERMIT_PROPIETARY_EXCHANGE_LIST_LIST ? this.permit.APP_PERMIT_PROPIETARY_EXCHANGE_LIST_LIST : undefined,
            create: this.permit.APP_PERMIT_PROPIETARY_EXCHANGE_LIST_CREATE ? this.permit.APP_PERMIT_PROPIETARY_EXCHANGE_LIST_CREATE : undefined,
            delete: this.permit.APP_PERMIT_PROPIETARY_EXCHANGE_LIST_DELETE ? this.permit.APP_PERMIT_PROPIETARY_EXCHANGE_LIST_DELETE : undefined,
            recovery: this.permit.APP_PERMIT_PROPIETARY_EXCHANGE_LIST_RECOVERY ? this.permit.APP_PERMIT_PROPIETARY_EXCHANGE_LIST_RECOVERY : undefined,
            udpate: this.permit.APP_PERMIT_PROPIETARY_EXCHANGE_LIST_UPDATE ? this.permit.APP_PERMIT_PROPIETARY_EXCHANGE_LIST_UPDATE : undefined,
        }
    }
}
