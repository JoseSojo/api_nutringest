import { Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import AppActions from "src/AppActions";
import AppEvent from "src/AppEvent";
import { AuthGuard } from "src/guards/AuthGuard";
import { LanguajeInterface } from "src/languaje/guard/languaje.interface";
import { LanguajeService } from "src/languaje/languaje.service";
import UserModel from "src/model/user.model";
import { PrismaService } from "src/prisma/prisma.service";
import HistoryService from "src/service/history.service";
import PatientService from "src/service/patient.service";
import QuoteService from "src/service/quote/quote.service";
import UserService from "src/service/user.service";

@Controller(`patient`)
export default class PatientController {

    private lang: LanguajeInterface;
    constructor(
        private model: UserModel,
        private patient: PatientService,
        private service: UserService,
        private permit: AppActions,
        private appEvents: AppEvent,
        private history: HistoryService,
        private languaje: LanguajeService,
        private prisma: PrismaService,
        private quote: QuoteService,
    ) {
        this.lang = this.languaje.GetTranslate()
    }

    @Get(``)
    @UseGuards(AuthGuard)
    private async paginate(@Req() req: any, @Query() query: { skip?: string, take?: string, param?: string }) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];
        const action = this.getPermit(user.rolReference.name).list;

        // validación de permisos
        const valid = permit.includes(action);
        if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT }

        // validación de datos
        const skip = query.skip ? Number(query.skip) : 0;
        const take = query.take ? Number(query.take) : 10;
        const customFilter: Prisma.UserWhereInput[] = [];

        customFilter.push({ rolId: this.permit.USER_PACIENTE });
        customFilter.push({ parentId: user.id });
        customFilter.push({ isDelete: undefined });
        customFilter.push({ isDelete: false });

        // lógica
        // if (query.param) customFilter.push({ name: { contains: query.param } });

        // validar eliminación
        const filter: Prisma.UserWhereInput = { AND: customFilter };

        const responsePromise = this.service.paginate({ skip, take, filter });

        // LOG

        const response = await responsePromise;

        if (response.error) {
            return {
                message: response.message,
                error: response.error
            }
        }

        return {
            message: response.message,
            error: response.error,
            body: {
                ...response.body,
                actionList: this.getActionsList(permit),
                actionUnique: this.getActionsUnique(permit),
            }
        };
    }

    @Get(`:id/unique`)
    @UseGuards(AuthGuard)
    private async unique(@Req() req: any, @Param() param: { id: string }) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];
        const action = this.getPermit(user.rolReference.name).list;

        // validación de permisos
        const valid = permit.includes(action);
        if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT }

        // validar eliminación
        const filter: Prisma.UserWhereInput = { id: param.id };

        const responsePromise = this.service.find({ filter });

        // LOG

        const response = await responsePromise;

        if (response.error) {
            return {
                message: response.message,
                error: response.error
            }
        }

        return {
            message: response.message,
            error: response.error,
            body: response
        }
    }

    @Post(`create`)
    @UseGuards(AuthGuard)
    private async create(@Req() req: any, @Body() body: any) {
        try {
            const user = req.user as any;
            const permit = user.rolReference.roles as string[];
            const action = this.getPermit(user.rolReference.name).create;

            const codePromise = this.service.generateCode();
            // validación de permisos
            const valid = permit.includes(action);
            if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT }

            console.log(body.evaluacionBoiquimica);
            let code = user.propietaryCode;

            const data: Prisma.UserCreateInput = {
                username: body.email.split(`@`)[0],
                email: body.email,
                password: body.email,
                name: body.name,
                lastname: body.lastname,
                genero: body.genero,
                age: Number(body.age),
                code: code,
                phone: body.phone,
                ocupacion: body.ocupacion,
                edoCivil: body.edoCivil,
                fn: new Date(body.birtdate),
                address: body.address ? body.address : ``,

                propietaryCode: await codePromise,
                parentReference: { connect: { id: user.id } },
                rolReference: { connect: { id: this.permit.USER_PACIENTE } }
            }

            // validar subscripción
            // validar ciudad

            const responsePromise = this.service.create({ data });
            // LOG

            const response = await responsePromise;

            if (response.error) {
                console.log(response);
                return {
                    message: response.message,
                    error: response.error
                }
            }

            /**
             * Struct { label:string, value:string }
             */

            const heredofamiliares = body.heredofamiliares ? body.heredofamiliares : [] as any;
            const personalesPatologicos = body.personalesPatologicos ? body.personalesPatologicos : [] as any;
            const personalesNPatologicos = body.personalesNoPatologicos ? body.personalesNoPatologicos : [] as any;
            const ginecoObstretricos = body.ginecoObstretricos ? body.ginecoObstretricos : [] as any;
            const trastornosGastroinstestinales = body.trastornosGastroinstestinales ? body.trastornosGastroinstestinales : [] as any;
            const habitosAlimentacion = body.habitosAlimentacion ? body.habitosAlimentacion : [] as any;
            const redordatorio24Horas = body.redordatorio24Horas ? body.redordatorio24Horas : [] as any;
            const indicadorAntropometico = body.indicadorAntropometico ? body.indicadorAntropometico : [] as any;
            const indicadoresBioquimicos = body.indicadoresBioquimicos ? body.indicadoresBioquimicos : [] as any;
            const evaluacionBoiquimica = body.evaluacionBoiquimica ? body.evaluacionBoiquimica : [] as any;

            type TESTTYPE = {kilo:number,gr:number,rc:number,porcentaje:number};

            const proteinas: TESTTYPE = body.kilocalorias.proteinas ? body.kilocalorias.proteinas : {porcentaje:0,kilo:0,gr:0,rc:0}
            const lipidos: TESTTYPE = body.kilocalorias.lipidos ? body.kilocalorias.lipidos : {porcentaje:0,kilo:0,gr:0,rc:0}
            const carbohidratos: TESTTYPE = body.kilocalorias.carbohidratos ? body.kilocalorias.carbohidratos : {porcentaje:0,kilo:0,gr:0,rc:0}

            const patientData: Prisma.PatientCreateInput = {
                carbohidratosGramos: Number(carbohidratos.gr),
                carbohidratosPercentaje: Number(carbohidratos.porcentaje),                
                carbohidratosKilo: Number(carbohidratos.kilo),
                carbohidratosRacion: Number(carbohidratos.rc),

                proteinasGramos: Number(proteinas.gr),
                proteinasPercentaje: Number(proteinas.porcentaje),                
                proteinasKilo: Number(proteinas.kilo),
                proteinasRacion: Number(proteinas.rc),

                lipidosGramos: Number(lipidos.gr),
                lipidosPercentaje: Number(lipidos.porcentaje),                
                lipidosKilo: Number(lipidos.kilo),
                lipidosRacion: Number(lipidos.rc),

                sleep: body.recomendaciones.sleep,
                exercises: body.recomendaciones.exercies,
                diagnostico: body.recomendaciones.diagnostico,
                heredofamiliares: Object.entries(heredofamiliares),
                ginecoObstretricos: Object.entries(ginecoObstretricos),
                habitosAlimentacion: Object.entries(habitosAlimentacion),
                indicadorAntropometico: Object.entries(indicadorAntropometico),
                indicadoresBioquimicos: Object.entries(indicadoresBioquimicos),
                personalesNPatologicos: Object.entries(personalesNPatologicos),
                personalesPatologicos: Object.entries(personalesPatologicos),
                redordatorio24Horas: Object.entries(redordatorio24Horas),
                trastornosGastroinstestinales: Object.entries(trastornosGastroinstestinales),
                evaluacionBoiquimica: Object.entries(evaluacionBoiquimica),
                userReference: { connect: { id: response.body.id } }
            }

            // Se crea la data del paciente
            const patientPromise = this.prisma.patient.create({ data: patientData });

            // Se crea la cita
            const quotePromise = this.quote.create({
                data: {
                    nutricionistReference: { connect: { id: user.id } },
                    patientReference: { connect: { id: response.body.id } },
                    sleep: body.recomendaciones.sleep,
                    exercise: body.recomendaciones.exercies,
                    description: body.recomendaciones.diagnostico
                }
            })

            // Se guarda en el historial
            await this.history.create({
                // userId:user.id,
                userReference: { connect: { id: user.id } },
                eventName: this.appEvents.EVENT_QUOTE_PATIENT_CREATE,
                objectName: this.objectName(),
                objectReferenceId: response.body.id
            });

            const patient = await patientPromise;
            await quotePromise;


            // Se crea historial de Peso
            const weightPromise = this.patient.registerHistoryWeight({ patientId: patient.id, type:"PESO",value:indicadorAntropometico[`Peso Actual`] })

            // Se crea historial de Talla
            const tallaPromise = this.patient.registerHistoryWeight({ patientId: patient.id, type:"TALLA",value:indicadorAntropometico[`Talla`] })
            

            await weightPromise;
            await tallaPromise;

            return {
                message: response.message,
                error: response.error,
                body: response
            }
        } catch (error) {
            console.log(error);
            return {
                message: `Error al crear paciente`,
                error: true
            }
            
        }
    }

    @Put(`:id/update`)
    @UseGuards(AuthGuard)
    private async update(@Req() req: any, @Body() body: any, @Param() param: { id: string }) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];
        const action = this.getPermit(user.rolReference.name).udpate;

        // validación de permisos
        const valid = permit.includes(action);
        if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT }

        // validación de datos

        const data: Prisma.UserUpdateInput = {}

        if (body.name) data.name = body.name;
        if (body.lastname) data.lastname = body.lastname;
        if (body.username) data.username = body.username;
        if (body.email) data.email = body.email;
        if (body.genero) data.genero = body.genero;

        const responsePromise = this.service.udpate({ data, id: param.id });

        // LOG
        await this.history.create({
            // userId:user.id,
            userReference: { connect: { id: user.id } },
            eventName: this.appEvents.EVENT_QUOTE_PATIENT_UPDATE,
            objectName: this.objectName(),
            objectReferenceId: param.id
        });

        const response = await responsePromise;

        if (response.error) {
            return {
                message: response.message,
                error: response.error
            }
        }

        // obtener id de paciente
        const find = await this.prisma.patient.findFirst({ where:{ userId:param.id } });
        if(find) {
            type TESTTYPE = {porcentaje:number,kilo:number,gr:number,rc:number};

            const proteinas: TESTTYPE = body.kilocalorias.proteinas ? body.kilocalorias.proteinas : {kilo:0,gr:0,rc:0}
            const lipidos: TESTTYPE = body.kilocalorias.lipidos ? body.kilocalorias.lipidos : {kilo:0,gr:0,rc:0}
            const carbohidratos: TESTTYPE = body.kilocalorias.carbohidratos ? body.kilocalorias.carbohidratos : {kilo:0,gr:0,rc:0}


            const heredofamiliares = body.heredofamiliares ? body.heredofamiliares : [] as any;
            const personalesPatologicos = body.personalesPatologicos ? body.personalesPatologicos : [] as any;
            const personalesNPatologicos = body.personalesNoPatologicos ? body.personalesNoPatologicos : [] as any;
            const ginecoObstretricos = body.ginecoObstretricos ? body.ginecoObstretricos : [] as any;
            const trastornosGastroinstestinales = body.trastornosGastroinstestinales ? body.trastornosGastroinstestinales : [] as any;
            const habitosAlimentacion = body.habitosAlimentacion ? body.habitosAlimentacion : [] as any;
            const redordatorio24Horas = body.redordatorio24Horas ? body.redordatorio24Horas : [] as any;
            const indicadorAntropometico = body.indicadorAntropometico ? body.indicadorAntropometico : [] as any;
            const indicadoresBioquimicos = body.indicadoresBioquimicos ? body.indicadoresBioquimicos : [] as any;
            const evaluacionBoiquimica = body.evaluacionBoiquimica ? body.evaluacionBoiquimica : [] as any;

            const patientData: Prisma.PatientCreateInput = {
                carbohidratosGramos: Number(carbohidratos.gr),
                carbohidratosPercentaje: Number(carbohidratos.porcentaje),                
                carbohidratosKilo: Number(carbohidratos.kilo),
                carbohidratosRacion: Number(carbohidratos.rc),

                proteinasGramos: Number(proteinas.gr),
                proteinasPercentaje: Number(proteinas.porcentaje),                
                proteinasKilo: Number(proteinas.kilo),
                proteinasRacion: Number(proteinas.rc),

                lipidosGramos: Number(lipidos.gr),
                lipidosPercentaje: Number(lipidos.porcentaje),                
                lipidosKilo: Number(lipidos.kilo),
                lipidosRacion: Number(lipidos.rc),

                sleep: body.recomendaciones.sleep,
                exercises: body.recomendaciones.exercies,
                diagnostico: body.recomendaciones.diagnostico,
                heredofamiliares: Object.entries(heredofamiliares),
                ginecoObstretricos: Object.entries(ginecoObstretricos),
                habitosAlimentacion: Object.entries(habitosAlimentacion),
                indicadorAntropometico: Object.entries(indicadorAntropometico),
                indicadoresBioquimicos: Object.entries(indicadoresBioquimicos),
                personalesNPatologicos: Object.entries(personalesNPatologicos),
                personalesPatologicos: Object.entries(personalesPatologicos),
                redordatorio24Horas: Object.entries(redordatorio24Horas),
                trastornosGastroinstestinales: Object.entries(trastornosGastroinstestinales),
                userReference: { connect: { id: response.body.id } },
                evaluacionBoiquimica: evaluacionBoiquimica,
            }

            // Se crea historial de Peso
            const weightPromise = this.patient.registerHistoryWeight({ patientId: find.id, type:"PESO",value:indicadorAntropometico[`Peso Actual`] })

            // Se crea historial de Talla
            const tallaPromise = this.patient.registerHistoryWeight({ patientId: find.id, type:"TALLA",value:indicadorAntropometico[`Talla`] })
            
            await weightPromise;
            await tallaPromise;

            await this.prisma.patient.update({ data: patientData, where:{id:find.id} });
        }

        return {
            message: response.message,
            error: response.error,
            body: response
        }
    }

    @Put(`:id/delete`)
    @UseGuards(AuthGuard)
    private async delete(@Req() req: any, @Body() body: any, @Param() param: { id: string }) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];
        const action = this.getPermit(user.rolReference.name).delete;

        // validación de permisos
        const valid = permit.includes(action);
        if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT }

        // validación si es propietario
        // validación si es super admin


        const responsePromise = this.service.delete({ id: param.id });

        // LOG
        await this.history.create({
            // userId:user.id,
            userReference: { connect: { id: user.id } },
            eventName: this.appEvents.EVENT_QUOTE_PATIENT_DELETE,
            objectName: this.objectName(),
            objectReferenceId: param.id
        });

        const response = await responsePromise;

        if (response.error) {
            return {
                message: response.message,
                error: response.error
            }
        }

        return {
            message: response.message,
            error: response.error,
            body: response
        }
    }

    // @Put(`:id/recovery`)
    // @UseGuards(AuthGuard)
    // private async recovery(@Req() req: any, @Body() body: any, @Param() param: { id: string }) {
    //     const user = req.user as any;
    //     const permit = user.rolReference.roles as string[];
    //     const action = this.getPermit(user.rolReference.name).recovery;

    //     // validación de permisos
    //     const valid = permit.includes(action);
    //     if (!valid) return { error: true, code: 401, message: this.lang.ACTIONS.NOT_PERMIT }

    //     // validación si es propietario
    //     // validación si es super admin


    //     // const responsePromise = this.service.recovery({ id:param.id });

    //     // LOG

    // }

    private getActionsList(permit: string[]) {
        const response = this.service.getActionsList(permit);
        return response;
    }

    private getActionsUnique(permit: string[]) {
        const response = this.service.getPermitsNutricionist();
        return response;
    }

    // obtiene permisos en crud
    private getPermit(rol: string) {
        let response: any;


        if (rol === this.permit.USER_NUTRICIONISTA) {
            response = this.service.getPermitsNutricionist();
        }
        else if (rol === this.permit.USER_PACIENTE) {
            response = this.service.getPermitsPaciente();
        }
        else {
            response = this.service.getPermits();
        }

        return response;
    }

    private GenerateCode() {
        const numeros = '0123456789';
        let code = '';

        for (let i = 0; i < 7; i++) {
            const indiceAleatorio = Math.floor(Math.random() * numeros.length);
            code += numeros[indiceAleatorio];
        }

        return code;
    }

    private objectName() { return `patient` }

}
