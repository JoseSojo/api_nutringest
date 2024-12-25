import { Injectable } from "@nestjs/common";
import { PrimitiveFood, Prisma } from "@prisma/client";
import AppActions from "src/AppActions";
import { LanguajeInterface } from "src/languaje/guard/languaje.interface";
import { LanguajeService } from "src/languaje/languaje.service";
import PrimitiveFoodModel from "src/model/nutri/food.model";
import { ActionsInterface } from "src/validation/types/ActionsInterface";
import { ActionCrudInterface } from "src/validation/types/ActionSlideInterface";
import { FORM } from "src/validation/types/FromInterface";

@Injectable()
export default class PrimitiveFoodService {

    private lang: LanguajeInterface;
    constructor (
        private permit: AppActions,
        private model: PrimitiveFoodModel,

        private languaje: LanguajeService
    ) {
        this.lang = languaje.GetTranslate();
    }
    
    public async create({ data }: { data:Prisma.PrimitiveFoodCreateInput }) {
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

    public async udpate({ data,id }: { data:Prisma.PrimitiveFoodUpdateInput, id:string }) {
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

    public async paginate({ skip, take, filter }: { skip:number, take:number, filter:Prisma.PrimitiveFoodWhereInput }) {
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

    public async find({ filter }: { filter:Prisma.PrimitiveFoodWhereInput }) {
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
        return [`Código`,`Nombre`,`Calorias`,`Proteina`];
    }

    public HeaderListExtract (): string[] {
        return [`code`,`name`,`calorias`,`proteina`];
    }

    public HeaderUnique (): string[] {
        return [`Código`,`Nombre`,`Calorias`,`Proteina`];
    }

    public HeaderUniqueExtract (): string[] {
        return [`code`,`name`,`calorias`,`proteina`];
    }

    public formCreate(): FORM {
        return {
            method: `POST`,
            name: `Crear`,
            path: `/city/create`,
            fields: [
                {
                    beforeType: `text`,
                    type: `input`,
                    id: `input.create.food.name`,
                    label: `Código`,
                    name: `code`,
                    placeholder: `Nombre`,
                    required: true
                }, {
                    beforeType: `text`,
                    type: `input`,
                    id: `input.create.food.name`,
                    label: `Nombre`,
                    name: `name`,
                    placeholder: ``,
                    required: true,
                }, {
                    beforeType: `number`,
                    type: `input`,
                    id: `input.create.food.calorias`,
                    label: `Calorías`,
                    name: `calorias`,
                    placeholder: ``,
                    required: true,
                }, {
                    beforeType: `number`,
                    type: `input`,
                    id: `input.create.food.proteina`,
                    label: `Proteínas`,
                    name: `proteina`,
                    placeholder: ``,
                    required: true,
                }
            ]
        }
    }
    
    public formUpdate(data: PrimitiveFood): FORM {
        return {
            method: `PUT`,
            name: `Actualizar ${data.name}`,
            path: `/primitive/${data.id}/update`,
            fields: [
                {
                    beforeType: `text`,
                    type: `input`,
                    id: `input.update.food.name`,
                    label: `Código`,
                    name: `code`,
                    placeholder: data.code.toString(),
                    required: true,
                }, {
                    beforeType: `text`,
                    type: `input`,
                    id: `input.update.food.name`,
                    label: ``,
                    name: `name`,
                    placeholder: data.name,
                    required: true,
                }, {
                    beforeType: `number`,
                    type: `input`,
                    id: `input.update.food.calorias`,
                    label: `Calorías`,
                    name: `calorias`,
                    placeholder: data.calorias.toString(),
                    required: true,
                }, {
                    beforeType: `number`,
                    type: `input`,
                    id: `input.update.food.proteina`,
                    label: `Proteínas`,
                    name: `proteina`,
                    placeholder: data.proteina.toString(),
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
        // if (actions.includes(permit.recovery)) customActions.push({ ico: `recovery`, label: `Recuperar`, path: `/dashboard/user`, use: `page` });
        // if(actions.includes(permit.list)) customActions.push({ ico:`list`,label:`Lista`, path:`/user`, use:`page` });

        return customActions;
    }

    public getPermits(): ActionsInterface {
        return {
            list: this.permit.APP_PERMIT_FOOD_LIST ? this.permit.APP_PERMIT_FOOD_LIST : undefined,
            create: this.permit.APP_PERMIT_FOOD_CREATE ? this.permit.APP_PERMIT_FOOD_CREATE : undefined,
            delete: this.permit.APP_PERMIT_FOOD_DELETE ? this.permit.APP_PERMIT_FOOD_DELETE : undefined,
            recovery: this.permit.APP_PERMIT_FOOD_RECOVERY ? this.permit.APP_PERMIT_FOOD_RECOVERY : undefined,
            udpate: this.permit.APP_PERMIT_FOOD_UPDATE ? this.permit.APP_PERMIT_FOOD_UPDATE : undefined,
        }
    }
}
