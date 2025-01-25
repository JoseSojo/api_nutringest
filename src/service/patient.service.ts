import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import UserModel from "src/model/user.model";
import * as bcrypt from "bcrypt";
import { ActionCrudInterface } from "src/validation/types/ActionSlideInterface";
import AppActions from "src/AppActions";
import { ActionsInterface } from "src/validation/types/ActionsInterface";
import { FORM } from "src/validation/types/FromInterface";
import { LanguajeService } from "src/languaje/languaje.service";
import { LanguajeInterface } from "src/languaje/guard/languaje.interface";
import { PrismaService } from "src/prisma/prisma.service";

interface HistoryStruct {
    date: string,
    value: string | number
}

@Injectable()
export default class PatientService {

    private salt = 11;
    private lang: LanguajeInterface;

    constructor(
        private model: UserModel,
        private permit: AppActions,
        private prisma: PrismaService,

        private languaje: LanguajeService
    ) {
        this.lang = languaje.GetTranslate();
    }

    public async registerHistoryWeight({ type, value, patientId }: { patientId: string, type: `PESO` | `TALLA`, value: string | number }) {
        try {
            const found = await this.prisma.historyWeightPatient.findFirst({ where: { AND: [{ patientId }, { type }] } });
            const date = new Date();

            if (found) {
                const prevDataString = found.history as string;
                const prevData = JSON.parse(prevDataString);
                prevData.push({ date: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`, value });
                await this.prisma.historyWeightPatient.update({
                    where: { id: found.id },
                    data: { history: JSON.stringify(prevData) }
                });
            }
            else {
                const data: HistoryStruct[] = [];
                data.push({ date: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`, value });
                await this.prisma.historyWeightPatient.create({
                    data: {
                        history: JSON.stringify(data),
                        type,
                        patientReference: { connect: { id: patientId } }
                    }
                });
            }
    
        } catch(error) {
            return 0;
        }
    }

}
