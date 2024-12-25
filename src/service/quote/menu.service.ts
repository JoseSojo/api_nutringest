import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";
import MenuModel from "src/model/quote/menu.model";
import { ActionCrudInterface } from "src/validation/types/ActionSlideInterface";
import { ActionsInterface } from "src/validation/types/ActionsInterface";
import AppActions from "src/AppActions";
import { FORM } from "src/validation/types/FromInterface";
import { LanguajeService } from "src/languaje/languaje.service";
import { LanguajeInterface } from "src/languaje/guard/languaje.interface";

@Injectable()
export default class MenuService {

    private lang: LanguajeInterface;
    constructor (
        private prisma: PrismaService,
        private permit: AppActions,
        private model: MenuModel,

        private languaje: LanguajeService
    ) {
        this.lang = languaje.GetTranslate();
    }

    public async createManyFood ({ data }:{data:Prisma.MenuDetailCreateInput}) {
        return await this.prisma.menuDetail.create({ data });
    }

    public async udpateFood ({ data,id }:{id:string,data:Prisma.MenuDetailUpdateInput}) {
        return await this.prisma.menuDetail.update({ data, where:{ id } });
    }
    
    public async create({ data }: { data:Prisma.MenuCreateInput }) {
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

    public async udpate({ data,id }: { data:Prisma.MenuUpdateInput, id:string }) {
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

    public async paginate({ skip, take, filter }: { skip:number, take:number, filter:Prisma.MenuWhereInput }) {
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

    public async find({ filter }: { filter:Prisma.MenuWhereInput }) {
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
        return [`Nombre`,`Tipo`,`Contabilidad alimentos`,`Contabilidad citas`,`Creador`]
    }

    public HeaderListExtract (): string[] {
        return [`name`,`type`,`_count.foods`,`_count.details`,`createByReference.email`]
    }

    public HeaderMinList (): string[] {
        return [`Nombre`,`Tipo`,`Contabilidad alimentos`]
    }

    public HeaderMinListExtract (): string[] {
        return [`name`,`type`,`_count.foods`]
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
            path: `/menu/create`,
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
        const permit = this.getPermitsPropietary();
        const customActions: ActionCrudInterface[] = [];

        if (actions.includes(permit.list)) customActions.push({ ico: `list`, label: `Lista`, path: `/dashboard/user`, use: `page` });
        if (actions.includes(permit.create)) customActions.push({ ico: `create`, label: `Crear`, path: `/dashboard/menu/create`, use: `page` });
        // if(actions.includes(permit.list)) customActions.push({ ico:`list`,label:`Lista`, path:`/user`, use:`page` });

        return customActions;
    }

    public getActionsUnique(actions: string[], p?: boolean): ActionCrudInterface[] {
        const permit = p ? this.getPermitsPropietary() : this.getPermits();
        const customActions: ActionCrudInterface[] = [];

        if (actions.includes(permit.list)) customActions.push({ ico: `unique`, label: `Ver`, path: `/dashboard/user`, use: `page` });
        if (actions.includes(permit.delete)) customActions.push({ ico: `delete`, label: `Eliminar`, path: `/dashboard/user`, use: `modal` });
        if (actions.includes(permit.udpate)) customActions.push({ ico: `update`, label: `Actualizarr`, path: `/dashboard/menu/update`, use: `page` });
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

    public getPermits(): ActionsInterface {
        return {
            list: this.permit.APP_PERMIT_MENU_LIST ? this.permit.APP_PERMIT_MENU_LIST : undefined,
            create: this.permit.APP_PERMIT_MENU_CREATE ? this.permit.APP_PERMIT_MENU_CREATE : undefined,
            delete: undefined,
            recovery: this.permit.APP_PERMIT_MENU_RECOVERY ? this.permit.APP_PERMIT_MENU_RECOVERY : undefined,
            udpate: undefined,
            add: this.permit.APP_PERMIT_MENU_ADD ? this.permit.APP_PERMIT_MENU_ADD : undefined,
        }
    }

    public getPermitsPropietary(): ActionsInterface {
        return {
            list: this.permit.APP_PERMIT_PROPIETARY_MENU_LIST ? this.permit.APP_PERMIT_PROPIETARY_MENU_LIST : undefined,
            create: this.permit.APP_PERMIT_PROPIETARY_MENU_CREATE ? this.permit.APP_PERMIT_PROPIETARY_MENU_CREATE : undefined,
            delete: this.permit.APP_PERMIT_PROPIETARY_MENU_DELETE ? this.permit.APP_PERMIT_PROPIETARY_MENU_DELETE : undefined,
            recovery: this.permit.APP_PERMIT_PROPIETARY_MENU_RECOVERY ? this.permit.APP_PERMIT_PROPIETARY_MENU_RECOVERY : undefined,
            udpate: this.permit.APP_PERMIT_PROPIETARY_MENU_UPDATE ? this.permit.APP_PERMIT_PROPIETARY_MENU_UPDATE : undefined,
        }
    }
}
