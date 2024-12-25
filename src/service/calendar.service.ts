import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";
import AppActions from "src/AppActions";
import { ActionCrudInterface } from "src/validation/types/ActionSlideInterface";
import { ActionsInterface } from "src/validation/types/ActionsInterface";
import { FORM } from "src/validation/types/FromInterface";
import CalendarModel from "src/model/calendar.model";
import { LanguajeService } from "src/languaje/languaje.service";
import { LanguajeInterface } from "src/languaje/guard/languaje.interface";

@Injectable()
export default class CalendarService {

    private lang: LanguajeInterface;
    constructor (
        private prisma: PrismaService,
        private permit: AppActions,
        private model: CalendarModel,

        private languaje: LanguajeService
    ) {
        this.lang = languaje.GetTranslate();
    }

    public async findForMonth ({ month,year,status,quote,user }: { user?:string,status?:string,month:number,year:number,quote?:string }) {
        const result = await this.model.findForMonthAll({ user,month,status:status ? status : ``,year,quote: quote ? quote : `` });
        return result;
    }
    
    public async create({ data }: { data:Prisma.CalendarCreateInput }) {
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

    public async createHistoryStatus ({ data }:{data:Prisma.CalendarHistoryStatusCreateInput}) {
        return await this.model.createHistory({ data });
    }

    public async paginateHistoryStatus ({ skip, take, filter }: { skip:number, take:number, filter:Prisma.CalendarHistoryStatusWhereInput }) {
        try {
            
            const resultPromise = this.model.findAllHistory({ filter,skip,take });
            const countPromise = this.model.countHistory({ filter });

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

    public async udpate({ data,id }: { data:Prisma.CalendarUpdateInput, id:string }) {
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

    public async paginate({ skip, take, filter }: { skip:number, take:number, filter:Prisma.CalendarWhereInput }) {
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

    public async find({ filter }: { filter:Prisma.CalendarWhereInput }) {
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
        return [`Estado`,`Descripción`,`Año`,`Mes`,`Día`,`Creador`]
    }

    public HeaderListExtract (): string[] {
        return [`status`,`description`,`year`,`monthNumber`,`day`,`userReference.email`]
    }

    public HeaderMinList (): string[] {
        return [`Estado`,`Descripción`,`Creación`,`Creador`]
    }

    public HeaderMinListExtract (): string[] {
        return [`status`,`description`,`createAt`,`userReference.email`]
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

        if (actions.includes(permit.list)) customActions.push({ ico: `unique`, label: `Ver`, path: `/dashboard/calendar`, use: `modal` });
        if (actions.includes(permit.udpate)) customActions.push({ ico: `cancelar`, label: `Cancelar`, path: `/dashboard/calendar`, use: `modal` });
        if (actions.includes(permit.udpate)) customActions.push({ ico: `reprogramming`, label: `Reprogramar`, path: `/dashboard/calendar`, use: `modal` });
        if (actions.includes(permit.udpate)) customActions.push({ ico: `finish`, label: `Finalizar`, path: `/dashboard/calendar`, use: `modal` });
        if (actions.includes(permit.delete)) customActions.push({ ico: `remove`, label: `Eliminar`, path: `/dashboard/calendar`, use: `modal` });
        
        return customActions;
    }

    public getActionsUniqueInQuote(actions: string[], p?: boolean): ActionCrudInterface[] {
        const permit = p ? this.getPermitsPropietary() : this.getPermits();
        const customActions: ActionCrudInterface[] = [];

        if (actions.includes(permit.list)) customActions.push({ ico: `unique`, label: `Ver`, path: `/dashboard/calendar`, use: `modal` });
        if (actions.includes(permit.udpate)) customActions.push({ ico: `cancelar`, label: `Cancelar`, path: `/dashboard/calendar`, use: `modal` });
        if (actions.includes(permit.udpate)) customActions.push({ ico: `reprogramming`, label: `Reprogramar`, path: `/dashboard/calendar`, use: `modal` });
        if (actions.includes(permit.udpate)) customActions.push({ ico: `finish`, label: `Finalizar`, path: `/dashboard/calendar`, use: `modal` });
        if (actions.includes(permit.delete)) customActions.push({ ico: `remove`, label: `Eliminar`, path: `/dashboard/calendar`, use: `modal` });
        // if (actions.includes(permit.recovery)) customActions.push({ ico: `recovery`, label: `Recuperar`, path: `/dashboard/user`, use: `page` });
        // if(actions.includes(permit.list)) customActions.push({ ico:`list`,label:`Lista`, path:`/user`, use:`page` });

        return customActions;
    }

    public getActionsUniquePropietary(actions: string[]): ActionCrudInterface[] {
        const permit = this.getPermitsPropietary();
        const customActions: ActionCrudInterface[] = [];

        if (actions.includes(permit.list)) customActions.push({ ico: `unique`, label: `Ver`, path: `/dashboard/calendar`, use: `modal` });
        if (actions.includes(permit.udpate)) customActions.push({ ico: `cancelar`, label: `Cancelar`, path: `/dashboard/calendar`, use: `modal` });
        if (actions.includes(permit.udpate)) customActions.push({ ico: `reprogramming`, label: `Reprogramar`, path: `/dashboard/calendar`, use: `modal` });
        if (actions.includes(permit.udpate)) customActions.push({ ico: `finish`, label: `Finalizar`, path: `/dashboard/calendar`, use: `modal` });
        if (actions.includes(permit.delete)) customActions.push({ ico: `remove`, label: `Eliminar`, path: `/dashboard/calendar`, use: `modal` });
        // if (actions.includes(permit.recovery)) customActions.push({ ico: `recovery`, label: `Recuperar`, path: `/dashboard/user`, use: `page` });
        // if(actions.includes(permit.list)) customActions.push({ ico:`list`,label:`Lista`, path:`/user`, use:`page` });

        return customActions;
    }

    public getPermits(): ActionsInterface {
        return {
            list: this.permit.APP_PERMIT_CALENDAR_LIST ? this.permit.APP_PERMIT_CALENDAR_LIST : undefined,
            create: this.permit.APP_PERMIT_CALENDAR_CREATE ? this.permit.APP_PERMIT_CALENDAR_CREATE : undefined,
            delete: undefined,
            recovery: this.permit.APP_PERMIT_CALENDAR_RECOVERY ? this.permit.APP_PERMIT_CALENDAR_RECOVERY : undefined,
            udpate: undefined,
            add: this.permit.APP_PERMIT_CALENDAR_ADD ? this.permit.APP_PERMIT_CALENDAR_ADD : undefined,
        }
    }

    public getPermitsPropietary(): ActionsInterface {
        return {
            list: this.permit.APP_PERMIT_CALENDAR_PROPIETARY_LIST ? this.permit.APP_PERMIT_CALENDAR_PROPIETARY_LIST : undefined,
            create: this.permit.APP_PERMIT_CALENDAR_PROPIETARY_CREATE ? this.permit.APP_PERMIT_CALENDAR_PROPIETARY_CREATE : undefined,
            delete: undefined,
            recovery: undefined,
            udpate: this.permit.APP_PERMIT_CALENDAR_PROPIETARY_UPDATE ? this.permit.APP_PERMIT_CALENDAR_PROPIETARY_UPDATE : undefined,
        }
    }
}
