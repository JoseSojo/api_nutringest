import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import AppActions from "src/AppActions";
import { LanguajeInterface } from "src/languaje/guard/languaje.interface";
import { LanguajeService } from "src/languaje/languaje.service";
import { PrismaService } from "src/prisma/prisma.service";
import { ActionsInterface } from "src/validation/types/ActionsInterface";
import { ActionCrudInterface } from "src/validation/types/ActionSlideInterface";


@Injectable()
export default class HistoryService {

    private lang: LanguajeInterface;
    constructor(
        private permit: AppActions,
        private prisma: PrismaService,

        private languaje: LanguajeService
    ) {
        this.lang = languaje.GetTranslate();
    }

    public async create (data: Prisma.HistoryCreateInput) {
        const result = await this.prisma.history.create({ data });
        return result;
    }

    public async paginate({ skip, take, filter }: { skip: number, take: number, filter: Prisma.HistoryWhereInput }) {
        try {
            const resultPromise = this.prisma.history.findMany({ where:filter, skip, take });
            const countPromise = this.prisma.history.count({ where:filter });

            const result = await resultPromise;
            const count = await countPromise;
            const next    = skip+take > count ? false : true;
            const previw = skip < take ? false : true;

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

    public HeaderList(): string[] {
        return [`Nombre`, `Apellido`,`Usuario`,`Correo`,`Permisos`]
    }

    public HeaderListExtract(): string[] {
        return [`name`, `lastname`,`username`,`email`,`rolReference.name`]
    }

    public getPermits(): ActionsInterface {
        return {
            list: this.permit.APP_PERMIT_HISTORY_LIST ? this.permit.APP_PERMIT_HISTORY_LIST : undefined,
            create: this.permit.APP_PERMIT_HISTORY_CREATE ? this.permit.APP_PERMIT_HISTORY_CREATE : undefined,
            delete: undefined,
            recovery: undefined,
            udpate: undefined,
        }
    }

    public getActionsList(actions: string[]): ActionCrudInterface[] {
        const permit = this.getPermits();
        const customActions: ActionCrudInterface[] = [];

        if (actions.includes(permit.list)) customActions.push({ ico: `list`, label: `Lista`, path: `/dashboard/history`, use: `page` });
        // if (actions.includes(permit.create)) customActions.push({ ico: `create`, label: `Crear`, path: `/dashboard/user`, use: `modal` });
        // if (actions.includes(this.permit.APP_PERMIT_PROPIETARY_PATIENT)) customActions.push({ ico:`create`,label:`Crear Paciente`, path:`/patient`, use:`page` });

        return customActions;
    }
}
