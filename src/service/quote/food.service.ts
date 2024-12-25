import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";
import FoodAllModel from "src/model/quote/food.model";
import AppActions from "src/AppActions";
import { ActionCrudInterface } from "src/validation/types/ActionSlideInterface";
import { ActionsInterface } from "src/validation/types/ActionsInterface";
import { FORM } from "src/validation/types/FromInterface";
import { LanguajeService } from "src/languaje/languaje.service";
import { LanguajeInterface } from "src/languaje/guard/languaje.interface";

@Injectable()
export default class FoodAllService {

    private lang: LanguajeInterface;
    constructor (
        private permit: AppActions,
        private model: FoodAllModel,

        private languaje: LanguajeService
    ) {
        this.lang = languaje.GetTranslate();
    }
    
    public async create({ data }: { data:Prisma.FoodAllCreateInput }) {
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

    public async udpate({ data,id }: { data:Prisma.FoodAllUpdateInput, id:string }) {
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

    public async paginate({ skip, take, filter }: { skip:number, take:number, filter:Prisma.FoodAllWhereInput }) {
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
                    headerMin: this.HeaderMinList(),
                    extrat: this.HeaderListExtract(),
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

    public async find({ filter }: { filter:Prisma.FoodAllWhereInput }) {
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

    public HeaderMinList (): string[] {
        return [`Tipo`,`Alimento`,]
    }

    public HeaderMinListExtract (): string[] {
        return [`type`,`foodReference.name`]
    }

    public HeaderList (): string[] {
        return [`Tipo`,`Alimento`,`Cita Nutricionista`,`Cita Paciente`]
    }

    public HeaderListExtract (): string[] {
        return [`type`,`foodReference.name`,`quoteReference.nutricionistReference.email`,`quoteReference.patientReference.email`]
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
            path: `/food/create`,
            fields: [
                {
                    beforeType: `text`,
                    type: `input`,
                    id: ``,
                    label: ``,
                    name: ``,
                    placeholder: ``,
                    required: true
                }
            ]
        }
    }
    public async formUpdate() {}

    public async formDelete() {}

    public getActionsList(actions: string[]): ActionCrudInterface[] {
        const permit = this.getPermits();
        const customActions: ActionCrudInterface[] = [];

        if (actions.includes(permit.list)) customActions.push({ ico: `list`, label: `Lista`, path: `/dashboard/user`, use: `page` });
        if (actions.includes(permit.create)) customActions.push({ ico: `create`, label: `Crear`, path: `/dashboard/user`, use: `modal` });
        // if (actions.includes(permit.create)) customActions.push({ ico: `assing`, label: `Asignar`, path: `/dashboard/user`, use: `modal` });
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

    public getActionsUniqueInQuote(actions: string[], p?: boolean): ActionCrudInterface[] {
        const permit = p ? this.getPermitsPropietary() : this.getPermits();
        const customActions: ActionCrudInterface[] = [];

        if (actions.includes(permit.list)) customActions.push({ ico: `unique`, label: `Ver`, path: `/dashboard/user`, use: `page` });
        if (actions.includes(permit.udpate)) customActions.push({ ico: `remove`, label: `Remover`, path: `/dashboard/user`, use: `modal` });
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

    public getPermitsPropietary(): ActionsInterface {
        return {
            list: this.permit.APP_PERMIT_PROPIETARY_QUOTE_LIST ? this.permit.APP_PERMIT_PROPIETARY_QUOTE_LIST : undefined,
            create: this.permit.APP_PERMIT_PROPIETARY_QUOTE_CREATE ? this.permit.APP_PERMIT_PROPIETARY_QUOTE_CREATE : undefined,
            delete: this.permit.APP_PERMIT_PROPIETARY_QUOTE_DELETE ? this.permit.APP_PERMIT_PROPIETARY_QUOTE_DELETE : undefined,
            recovery: this.permit.APP_PERMIT_PROPIETARY_QUOTE_RECOVERY ? this.permit.APP_PERMIT_PROPIETARY_QUOTE_RECOVERY : undefined,
            udpate: this.permit.APP_PERMIT_PROPIETARY_QUOTE_UPDATE ? this.permit.APP_PERMIT_PROPIETARY_QUOTE_UPDATE : undefined,
        }
    }
}
