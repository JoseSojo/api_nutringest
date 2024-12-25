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
import ConfigSubscriptionHandlerModel from "src/model/master/subsccription.detail.model";
import AppEvent from "src/AppEvent";

@Injectable()
export default class ConfigSubscriptionHandlerService {

    private lang: LanguajeInterface;
    constructor(
        private events: AppEvent,
        private permit: AppActions,
        private model: ConfigSubscriptionHandlerModel,
        private prisma: PrismaService,

        private languaje: LanguajeService
    ) {
        this.lang = languaje.GetTranslate();
    }

    public async ChangeSubscription ({subscription,userId}:{userId:string,subscription:string}) {
        const result = this.prisma.taskSeondPlanSubscription.create({
            data:{ 
                userReference: { connect:{id:userId} },
                task: this.events.CHANGE_SUSBCTION,
                extra: { to:subscription },   
            }
        });
        return await result;
    }

    public GetDateSubscription1Month() {
        const date = new Date();
        const start = {
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear()
        }

        // Crear el objeto end
        const end = { ...start }; // Crea una copia del objeto start

        // Incrementar el mes
        end.month += 1;

        // Verificar si el mes supera 12 y ajustar
        if (end.month > 12) {
            end.month = 1; // Reiniciar a enero
            end.year += 1; // Incrementar el año
        }

        // Ajustar el día si el nuevo mes no tiene la misma cantidad de días
        const daysInMonth = new Date(end.year, end.month, 0).getDate();
        if (end.day > daysInMonth) {
            end.day = daysInMonth; // Ajustar el día al último día del nuevo mes
        }

        return {start,end};
    }

    public GetDateSubscription3Month() {
        const date = new Date();
        const start = {
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear()
        }

        // Crear el objeto end
        const end = { ...start }; // Crea una copia del objeto start

        // Incrementar el mes
        end.month += 3;

        // Verificar si el mes supera 12 y ajustar
        if (end.month > 12) {
            end.month = end.month - 12; // Reiniciar a enero
            end.year += 1; // Incrementar el año
        }

        // Ajustar el día si el nuevo mes no tiene la misma cantidad de días
        const daysInMonth = new Date(end.year, end.month, 0).getDate();
        if (end.day > daysInMonth) {
            end.day = daysInMonth; // Ajustar el día al último día del nuevo mes
        }

        return {start,end};
    }

    public GetDateSubscription6Month() {
        const date = new Date();
        const start = {
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear()
        }

        // Crear el objeto end
        const end = { ...start }; // Crea una copia del objeto start

        // Incrementar el mes
        end.month += 6;

        // Verificar si el mes supera 12 y ajustar
        if (end.month > 12) {
            end.month = end.month - 12; // Reiniciar a enero
            end.year += 1; // Incrementar el año
        }

        // Ajustar el día si el nuevo mes no tiene la misma cantidad de días
        const daysInMonth = new Date(end.year, end.month, 0).getDate();
        if (end.day > daysInMonth) {
            end.day = daysInMonth; // Ajustar el día al último día del nuevo mes
        }

        return {start,end};
    }

    public GetDateSubscriptionYear() {
        const date = new Date();
        const start = {
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear()
        }

        // Crear el objeto end
        const end = { ...start }; // Crea una copia del objeto start

        // Incrementar el mes
        end.year += 1;


        // Ajustar el día si el nuevo mes no tiene la misma cantidad de días
        const daysInMonth = new Date(end.year, end.month, 0).getDate();
        if (end.day > daysInMonth) {
            end.day = daysInMonth; // Ajustar el día al último día del nuevo mes
        }

        return {start,end};
    }

    public GetDateFreeTrial() {
        const date = new Date();
        const start = {
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear()
        }

        // Crear el objeto end
        const end = { ...start }; // Crea una copia del objeto start

        // Incrementar el día en 5
        end.day += 5;

        // Verificar fechas y ajustar el mes y el año en consecuencia
        while (true) {
            const daysInMonth = new Date(end.year, end.month, 0).getDate(); // Último día del mes
            if (end.day <= daysInMonth) {
                break; // Si el día es válido, salir del bucle
            }
            end.day -= daysInMonth; // Ajustar el día al siguiente mes
            end.month += 1; // Pasar al mes siguiente

            // Verificar si se supera diciembre
            if (end.month > 12) {
                end.month = 1; // Reiniciar a enero
                end.year += 1; // Incrementar el año
            }
        }

        return { start, end }; // Devolver ambos objetos
    }

    public async CreateSubscription({ data }:{ data:Prisma.SubscriptionInUserCreateInput }) {
        const result = this.prisma.subscriptionInUser.create({ data });
        return await result;
    }

    public async Create({ data }:{ data:Prisma.SubscriptionDetailCreateInput }) {
        const result = this.prisma.subscriptionDetail.create({ data });
        return await result;
    }

    public async FindMySub({ user }: { user: string }) {
        const responseModel = this.model.findMySubscription({ user });
        return await responseModel;
    }

    // EXTRA

    public HeaderList(): string[] {
        return [`Nombre`, `Meses`, `Monto`];
    }

    public HeaderListExtract(): string[] {
        return [`name`, `countMonth`, `defaultMount`];
    }

    public HeaderUnique(): string[] {
        return [`Nombre`, `Meses`, `Monto`];
    }

    public HeaderUniqueExtract(): string[] {
        return [`name`, `countMonth`, `defaultMount`]
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

    public async formDelete() { }

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
