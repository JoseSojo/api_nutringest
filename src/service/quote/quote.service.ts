import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";
import QuoteModel from "src/model/quote/quote.model";
import AppActions from "src/AppActions";
import { ActionCrudInterface } from "src/validation/types/ActionSlideInterface";
import { ActionsInterface } from "src/validation/types/ActionsInterface";
import { FORM } from "src/validation/types/FromInterface";
import AppEvent from "src/AppEvent";
import { LanguajeService } from "src/languaje/languaje.service";
import { LanguajeInterface } from "src/languaje/guard/languaje.interface";

@Injectable()
export default class QuoteService {

    private lang: LanguajeInterface;
    constructor (
        private permit: AppActions,
        private model: QuoteModel,
        private prisma: PrismaService,
        private events: AppEvent,

        private languaje: LanguajeService
    ) {
        this.lang = languaje.GetTranslate();
    }

    // remueve un menu
    public async removeMenu({id,quote}: { id:string,quote:string }) {
        const found = await this.prisma.menuInQuote.findFirst({ where:{ AND:[{menuId:id},{quoteId:quote}] } });

        const resultPromise = this.prisma.menuInQuote.delete({ where:{id:found.id} });
        await this.CreateHistory({ quoteReference:{ connect:{id:quote} }, description:this.events.EVENT_REMOVE_MENU_UPDATE });
        return await resultPromise;
    }

    // remueve un exchange
    public async removeExchange({quote, id}: { quote:string,id:string }) {

        const found = await this.prisma.exchangeListInQuote.findFirst({ where:{ AND:[{exchangeId:id},{quoteId:quote}] } })

        const resultPromise = this.prisma.exchangeListInQuote.delete({ where:{id:found.id} });
        await this.CreateHistory({ quoteReference:{ connect:{id:quote} }, description:this.events.EVENT_REMOVE_EXCHANGE_LIST_UPDATE });
        return await resultPromise;
    }

    // remueve un alimento
    public async removeFood({quote, id}: { quote:string,id:string }) {
        const found = await this.prisma.foodAll.findFirst({ where:{ OR:[{AND:[{foodId:id},{quoteId:quote}]},{id}] } });

        const resultPromise = this.prisma.foodAll.delete({ where:{id:found.id} });
        await this.CreateHistory({ quoteReference:{ connect:{id:quote} }, description:this.events.EVENT_REMOVE_FOOD_UPDATE });
        return await resultPromise;

    }

    // asigna un menu
    public async assingMenu({quote, item}: { quote:string,item:string }) {
        const resultPromise = this.prisma.menuInQuote.create({ 
            data: {
                menuReference: { connect:{ id:item } },
                quoteReference: { connect:{ id:quote } }
            }
        });
        await this.CreateHistory({ quoteReference:{ connect:{id:quote} }, description:this.events.EVENT_ASSING_MENU_UPDATE });
        return await resultPromise;
    }

    // asigna un exchange
    public async assingExchange({quote, item}: { quote:string,item:string }) {
        const resultPromise = this.prisma.exchangeListInQuote.create({ 
            data: {
                exchangeReference: { connect:{ id:item } },
                quoteReference: { connect:{ id:quote } }
            }
        });
        await this.CreateHistory({ quoteReference:{ connect:{id:quote} }, description:this.events.EVENT_ASSING_EXCHANGE_LIST_UPDATE });
        return await resultPromise;
    }

    // asigna un alimento
    public async assingFood({quote, item, type}: { quote:string,item:string, type:string }) {
        const resultPromise = this.prisma.foodAll.create({ 
            data: {
                quoteReference: { connect:{ id:quote }},
                foodReference: { connect:{ id:item }},
                type
            }
        });
        await this.CreateHistory({ quoteReference:{ connect:{id:quote} }, description:this.events.EVENT_ASSING_FOOD_UPDATE });
        return await resultPromise;

    }

    public async create({ data }: { data:Prisma.QuoteCreateInput }) {
        try {
            
            const resultPromise = this.model.create({ data });

            const result = await resultPromise;

            await this.CreateHistory({ quoteReference:{ connect:{id:result.id} }, description:this.events.EVENT_QUOTE_CREATE });

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

    public async udpate({ data,id }: { data:Prisma.QuoteUpdateInput, id:string }) {
        try {
            
            const resultPromise = this.model.update({ data, filter:{id} });
            await this.CreateHistory({ quoteReference:{ connect:{id} }, description:this.events.EVENT_QUOTE_UPDATE });

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
            await this.CreateHistory({ quoteReference:{ connect:{id} }, description:this.events.EVENT_QUOTE_DELETE });

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

    public async paginate({ skip, take, filter }: { skip:number, take:number, filter:Prisma.QuoteWhereInput }) {
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

    public async find({ filter }: { filter:Prisma.QuoteWhereInput }) {
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
        return [`Nutricionista`,`Paciente`,`Listas de intercambio`,`Menús`,`Historial`]
    }

    public HeaderListExtract (): string[] {
        return [`nutricionistReference.email`,`patientReference.email`,`_count.exchange`,`_count.menus`,`_count.history`]
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
            path: `/quote/create`,
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
        const propietary = this.getPermitsPropietary();
        const customActions: ActionCrudInterface[] = [];


        if (actions.includes(permit.list) || actions.includes(propietary.list)) customActions.push({ ico: `list`, label: `Lista`, path: `/dashboard/quote`, use: `page` });
        if (actions.includes(permit.create)) customActions.push({ ico: `create`, label: `Crear`, path: `/dashboard/quote/create`, use: `page` });
        // if(actions.includes(permit.list)) customActions.push({ ico:`list`,label:`Lista`, path:`/user`, use:`page` });

        return customActions;
    }

    public getActionsUnique(actions: string[]): ActionCrudInterface[] {
        const permit = this.getPermits();
        const propietary = this.getPermitsPropietary();
        const customActions: ActionCrudInterface[] = [];

        if (actions.includes(permit.list) || actions.includes(propietary.list)) customActions.push({ ico: `unique`, label: `Ver`, path: `/dashboard/user`, use: `page` });
        if (actions.includes(permit.delete)) customActions.push({ ico: `delete`, label: `Eliminar`, path: `/dashboard/user`, use: `modal` });
        if (actions.includes(permit.udpate)) customActions.push({ ico: `update`, label: `Actualizar`, path: `/dashboard/user`, use: `modal` });
        // if (actions.includes(permit.recovery)) customActions.push({ ico: `recovery`, label: `Recuperar`, path: `/dashboard/user`, use: `page` });
        // if(actions.includes(permit.list)) customActions.push({ ico:`list`,label:`Lista`, path:`/user`, use:`page` });

        return customActions;
    }

    public getPermits(): ActionsInterface {
        return {
            list: this.permit.APP_PERMIT_QUOTE_LIST ? this.permit.APP_PERMIT_QUOTE_LIST : undefined,
            create: this.permit.APP_PERMIT_QUOTE_CREATE ? this.permit.APP_PERMIT_QUOTE_CREATE : undefined,
            delete: this.permit.APP_PERMIT_QUOTE_DELETE ? this.permit.APP_PERMIT_QUOTE_DELETE : undefined,
            recovery: this.permit.APP_PERMIT_QUOTE_RECOVERY ? this.permit.APP_PERMIT_QUOTE_RECOVERY : undefined,
            udpate: this.permit.APP_PERMIT_QUOTE_UPDATE ? this.permit.APP_PERMIT_QUOTE_UPDATE : undefined,
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

    // HISTORY

    public async CreateHistory (data: Prisma.HistoryQuoteCreateInput) {
        return await this.prisma.historyQuote.create({data});
    }

    public async PaginateHistory({ skip, take, filter }: { skip:number, take:number, filter:Prisma.HistoryQuoteWhereInput }) {
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
                    header: [`Creación`,`Descripción`],
                    extrat: [`createAt`,`description`],
                }
            }

        } catch (error) {
            return {
                message: this.lang.ACTIONS.NOT_FOUND,
                error: true
            }
        }
    }

    // PHOTO

    public async createPhotoHistory({data,quote}: { data:Prisma.HistoryPhotoCreateInput,quote:string }) {
        const resultPromise = this.prisma.historyPhoto.create({ 
            data
        });
        await this.CreateHistory({ quoteReference:{ connect:{id:quote} }, description:this.events.EVENT_ASSING_FOOD_UPDATE });
        return await resultPromise;

    }

    public async PaginatePhoto({ skip, take, filter }: { skip:number, take:number, filter:Prisma.HistoryPhotoWhereInput }) {
        try {
            
            const resultPromise = this.model.findAllHistoryPhoto({ filter,skip,take });
            const countPromise = this.model.countHistoryPhoto({ filter });

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
                    header: [`Creación`,`Descripción`],
                    extrat: [`createAt`,`description`],
                }
            }

        } catch (error) {
            return {
                message: this.lang.ACTIONS.NOT_FOUND,
                error: true
            }
        }
    }
}
