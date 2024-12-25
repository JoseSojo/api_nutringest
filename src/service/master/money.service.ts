import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Coin, Prisma } from "@prisma/client";
import ConfigMoneyModel from "src/model/master/money.model";
import AppActions from "src/AppActions";
import { ActionCrudInterface } from "src/validation/types/ActionSlideInterface";
import { ActionsInterface } from "src/validation/types/ActionsInterface";
import { FORM } from "src/validation/types/FromInterface";
import HistoryService from "../history.service";
import AppEvent from "src/AppEvent";
import { LanguajeService } from "src/languaje/languaje.service";
import { LanguajeInterface } from "src/languaje/guard/languaje.interface";

@Injectable()
export default class ConfigMoneyService {

    private lang: LanguajeInterface;
    constructor (
        private permit: AppActions,
        private appEvents: AppEvent,
        private history: HistoryService,
        private model: ConfigMoneyModel,

        private languaje: LanguajeService
    ) {
        this.lang = languaje.GetTranslate();
    }
    
    public async create({ data }: { data:Prisma.CoinCreateInput }) {
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

    public async udpate({ data,id }: { data:Prisma.CoinUpdateInput, id:string }) {
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

    public async paginate({ skip, take, filter }: { skip:number, take:number, filter:Prisma.CoinWhereInput }) {
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

    public async find({ filter }: { filter:Prisma.CoinWhereInput }) {
        try {
            
            const resultPromise = this.model.find({ filter });

            const result = await resultPromise;

            return {
                message: `find success. (successs)`,
                error: false,
                body: result,
            }

        } catch (error) {
            return {
                message: this.lang.ACTIONS.NOT_FOUND,
                error: true
            }
        }
    }

    public HeaderList (): string[] {
        return [`Prefijo`,`Nombre`,`Creador`];
    }

    public HeaderListExtract (): string[] {
        return [`prefix`,`name`,`createByReference.name`];
    }

    public HeaderUnique (): string[] {
        return [`Prefijo`,`Nombre`,`Creador`];
    }

    public HeaderUniqueExtract (): string[] {
        return [`prefix`,`name`,`createByReference.name`];
    }

    public formCreate(): FORM {
        return {
            method: `POST`,
            name: `Crear`,
            path: `/money/create`,
            fields: [
                {
                    beforeType: `text`,
                    type: `input`,
                    id: `input.create.money.name`,
                    label: `Nombre`,
                    name: `name`,
                    placeholder: `Moneda`,
                    required: true
                }, {
                    beforeType: `text`,
                    type: `input`,
                    id: `input.create.money.prefix`,
                    label: `Prefijo`,
                    name: `prefix`,
                    placeholder: `Mn`,
                    required: true
                }, {
                    beforeType: `text`,
                    type: `input`,
                    id: `input.create.money.description`,
                    label: `Prefijo`,
                    name: `description`,
                    placeholder: ``,
                    required: true
                }
            ]
        }
    }
    
    public formUpdate(data: Coin): FORM {
        return {
            method: `PUT`,
            name: `Actualizar ${data.name}`,
            path: `/money/${data.id}/update/`,
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
                    id: `input.update.money.prefix`,
                    label: `Prefijo`,
                    name: `prefix`,
                    placeholder: data.prefix,
                    required: true,
                }, {
                    beforeType: `text`,
                    type: `input`,
                    id: `input.update.money.description`,
                    label: `Prefijo`,
                    name: `description`,
                    placeholder: data.description,
                    required: true,
                }
            ]
        }
    }

    public formDelete() {}

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
            list: this.permit.APP_PERMIT_COIN_LIST ? this.permit.APP_PERMIT_COIN_LIST : undefined,
            create: this.permit.APP_PERMIT_COIN_CREATE ? this.permit.APP_PERMIT_COIN_CREATE : undefined,
            delete: this.permit.APP_PERMIT_COIN_DELETE ? this.permit.APP_PERMIT_COIN_DELETE : undefined,
            recovery: this.permit.APP_PERMIT_COIN_RECOVERY ? this.permit.APP_PERMIT_COIN_RECOVERY : undefined,
            udpate: this.permit.APP_PERMIT_COIN_UPDATE ? this.permit.APP_PERMIT_COIN_UPDATE : undefined,
        }
    }
}
