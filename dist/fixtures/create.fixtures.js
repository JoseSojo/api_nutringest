"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const AppActions_1 = require("../AppActions");
const city_model_1 = require("../model/master/city.model");
const country_model_1 = require("../model/master/country.model");
const money_model_1 = require("../model/master/money.model");
const payment_model_1 = require("../model/master/payment.model");
const state_model_1 = require("../model/master/state.model");
const subsccription_model_1 = require("../model/master/subsccription.model");
const unity_model_1 = require("../model/nutri/unity.model");
const permit_model_1 = require("../model/permit.model");
const user_model_1 = require("../model/user.model");
const user_service_1 = require("../service/user.service");
let FixtureCreate = class FixtureCreate {
    constructor(permitModel, userModel, countryModel, stateModel, cityModel, moneyModel, paymentModel, subscriptionModel, unityModel, userService, permit) {
        this.permitModel = permitModel;
        this.userModel = userModel;
        this.countryModel = countryModel;
        this.stateModel = stateModel;
        this.cityModel = cityModel;
        this.moneyModel = moneyModel;
        this.paymentModel = paymentModel;
        this.subscriptionModel = subscriptionModel;
        this.unityModel = unityModel;
        this.userService = userService;
        this.permit = permit;
    }
    async permitFix() {
        const message = [];
        const usperadminFoundPromise = this.permitModel.find({ filter: { name: this.permit.USER_SUPER_ADMIN } });
        const adminAppFoundPromise = this.permitModel.find({ filter: { name: this.permit.USER_APP_ADMIN } });
        const nutriAdminFoundPromise = this.permitModel.find({ filter: { name: this.permit.USER_NUTRI_ADMIN } });
        const nutricionistaFoundPromise = this.permitModel.find({ filter: { name: this.permit.USER_NUTRICIONISTA } });
        const pacienteFoundPromise = this.permitModel.find({ filter: { name: this.permit.USER_PACIENTE } });
        const financeFoundPromise = this.permitModel.find({ filter: { name: this.permit.USER_FINANCE } });
        const usperadminFound = await usperadminFoundPromise;
        const adminAppFound = await adminAppFoundPromise;
        const nutriAdminFound = await nutriAdminFoundPromise;
        const nutricionistaFound = await nutricionistaFoundPromise;
        const pacienteFound = await pacienteFoundPromise;
        const financeFound = await financeFoundPromise;
        if (usperadminFound) {
            message.push(`${this.permit.USER_APP_ADMIN} ya creado.`);
        }
        else {
            await this.permitModel.create({ data: { name: this.permit.USER_SUPER_ADMIN, id: this.permit.USER_SUPER_ADMIN, roles: this.permit.CUSTOM_PERMIT_SUPER_ADMIN } });
            message.push(`${this.permit.USER_APP_ADMIN} creado exitosamente.`);
        }
        if (adminAppFound) {
            message.push(`${this.permit.USER_APP_ADMIN} ya creado.`);
        }
        else {
            await this.permitModel.create({ data: { name: this.permit.USER_APP_ADMIN, id: this.permit.USER_APP_ADMIN, roles: this.permit.CUSTOM_PERMIT_APP_ADMIN } });
            message.push(`${this.permit.USER_APP_ADMIN} creado exitosamente.`);
        }
        if (nutriAdminFound) {
            message.push(`${this.permit.USER_NUTRI_ADMIN} ya creado.`);
        }
        else {
            await this.permitModel.create({ data: { name: this.permit.USER_NUTRI_ADMIN, id: this.permit.USER_NUTRI_ADMIN, roles: this.permit.CUSTOM_PERMIT_NUTRI_ADMIN } });
            message.push(`${this.permit.USER_NUTRI_ADMIN} creado exitosamente.`);
        }
        if (nutricionistaFound) {
            await this.permitModel.update({ data: { roles: this.permit.CUSTOM_PERMIT_NUTRICIONISTA }, filter: { id: this.permit.USER_NUTRICIONISTA } });
            message.push(`${this.permit.USER_NUTRICIONISTA} ya creado.`);
        }
        else {
            await this.permitModel.create({ data: { name: this.permit.USER_NUTRICIONISTA, id: this.permit.USER_NUTRICIONISTA, roles: this.permit.CUSTOM_PERMIT_NUTRICIONISTA } });
            message.push(`${this.permit.USER_NUTRICIONISTA} creado exitosamente.`);
        }
        if (pacienteFound) {
            message.push(`${this.permit.USER_PACIENTE} ya creado.`);
        }
        else {
            await this.permitModel.create({ data: { name: this.permit.USER_PACIENTE, id: this.permit.USER_PACIENTE, roles: this.permit.CUSTOM_PERMIT_PACIENTE } });
            message.push(`${this.permit.USER_PACIENTE} creado exitosamente.`);
        }
        if (financeFound) {
            message.push(`${this.permit.USER_FINANCE} ya creado.`);
        }
        else {
            await this.permitModel.create({ data: { name: this.permit.USER_FINANCE, id: this.permit.USER_FINANCE, roles: this.permit.CUSTOM_PERMIT_FINANCE } });
            message.push(`${this.permit.USER_FINANCE} creado exitosamente.`);
        }
        return message;
    }
    async userFix() {
        const message = [];
        const domEmail = `@example.com`;
        const superadminData = {
            email: `superadmin${domEmail}`,
            password: `abc.12345`,
            username: `superadmin`,
            rolReference: { connect: { id: this.permit.USER_SUPER_ADMIN } }
        };
        let superId = ``;
        const superFound = await this.userModel.find({ filter: { email: superadminData.email } });
        if (superFound) {
            superId = superFound.id;
        }
        else {
            superadminData.password = await this.userService.Hash({ password: superadminData.password });
            const superadminResult = await this.userModel.create({ data: superadminData });
            superId = superadminResult.id;
        }
        const dataCreate = [
            {
                email: `adminApp1${domEmail}`,
                password: `abc.12345`,
                username: `adminApp1`,
                parentReference: { connect: { id: superId } },
                rolReference: { connect: { id: this.permit.USER_APP_ADMIN } }
            }, {
                email: `adminApp2${domEmail}`,
                password: `abc.12345`,
                username: `adminApp2`,
                parentReference: { connect: { id: superId } },
                rolReference: { connect: { id: this.permit.USER_APP_ADMIN } }
            }, {
                email: `nutriAdmin1${domEmail}`,
                password: `abc.12345`,
                username: `nutriAdmin1`,
                parentReference: { connect: { id: superId } },
                rolReference: { connect: { id: this.permit.USER_NUTRI_ADMIN } }
            }, {
                email: `nutriAdmin2${domEmail}`,
                password: `abc.12345`,
                username: `nutriAdmin2`,
                parentReference: { connect: { id: superId } },
                rolReference: { connect: { id: this.permit.USER_NUTRI_ADMIN } }
            }, {
                email: `nutricionista1${domEmail}`,
                password: `abc.12345`,
                username: `nutricionista1`,
                parentReference: { connect: { id: superId } },
                rolReference: { connect: { id: this.permit.USER_NUTRICIONISTA } }
            }, {
                email: `nutricionista2${domEmail}`,
                password: `abc.12345`,
                username: `nutricionista2`,
                parentReference: { connect: { id: superId } },
                rolReference: { connect: { id: this.permit.USER_NUTRICIONISTA } }
            }, {
                email: `nutricionista3${domEmail}`,
                password: `abc.12345`,
                username: `nutricionista3`,
                parentReference: { connect: { id: superId } },
                rolReference: { connect: { id: this.permit.USER_NUTRICIONISTA } }
            }, {
                email: `nutricionista4${domEmail}`,
                password: `abc.12345`,
                username: `nutricionista4`,
                parentReference: { connect: { id: superId } },
                rolReference: { connect: { id: this.permit.USER_NUTRICIONISTA } }
            }, {
                email: `paciente1${domEmail}`,
                password: `abc.12345`,
                username: `paciente1`,
                parentReference: { connect: { id: superId } },
                rolReference: { connect: { id: this.permit.USER_PACIENTE } }
            }, {
                email: `paciente2${domEmail}`,
                password: `abc.12345`,
                username: `paciente2`,
                parentReference: { connect: { id: superId } },
                rolReference: { connect: { id: this.permit.USER_PACIENTE } }
            }, {
                email: `paciente3${domEmail}`,
                password: `abc.12345`,
                username: `paciente3`,
                parentReference: { connect: { id: superId } },
                rolReference: { connect: { id: this.permit.USER_PACIENTE } }
            }, {
                email: `paciente4${domEmail}`,
                password: `abc.12345`,
                username: `paciente4`,
                parentReference: { connect: { id: superId } },
                rolReference: { connect: { id: this.permit.USER_PACIENTE } }
            }, {
                email: `paciente5${domEmail}`,
                password: `abc.12345`,
                username: `paciente5`,
                parentReference: { connect: { id: superId } },
                rolReference: { connect: { id: this.permit.USER_PACIENTE } }
            }, {
                email: `paciente6${domEmail}`,
                password: `abc.12345`,
                username: `paciente6`,
                parentReference: { connect: { id: superId } },
                rolReference: { connect: { id: this.permit.USER_PACIENTE } }
            }, {
                email: `paciente7${domEmail}`,
                password: `abc.12345`,
                username: `paciente7`,
                parentReference: { connect: { id: superId } },
                rolReference: { connect: { id: this.permit.USER_PACIENTE } }
            }, {
                email: `paciente8${domEmail}`,
                password: `abc.12345`,
                username: `paciente8`,
                parentReference: { connect: { id: superId } },
                rolReference: { connect: { id: this.permit.USER_PACIENTE } }
            },
        ];
        const create = async (user) => {
            user.password = await this.userService.Hash({ password: user.password });
            await this.userModel.create({ data: user });
        };
        dataCreate.forEach(async (user) => {
            await create(user);
            message.push(`${user.name} ${user.lastname} CREADO.`);
        });
        return message;
    }
    async regionalFix() {
        const user = await this.userModel.find({ filter: { email: `superadmin@example.com` } });
        if (!user) {
            return;
        }
        const bolivar = {
            prefix: `bs`,
            name: `Bolivares`,
            description: `Moneda venezonala`,
            createByReference: {
                connect: { id: user.id }
            }
        };
        let moneyId = ``;
        let countryId = ``;
        const moneyBolivaresFound = await this.moneyModel.find({ filter: { name: `Bolivares` } });
        if (moneyBolivaresFound) {
            moneyId = moneyBolivaresFound.id;
        }
        else {
            const result = await this.moneyModel.create({ data: bolivar });
            moneyId = result.id;
        }
        if (moneyId) {
            const result = await this.countryModel.create({
                data: {
                    coinReference: { connect: { id: moneyId } },
                    createByReference: { connect: { id: user.id } },
                    name: `Venezuela`,
                    prefixPhone: `+58`
                }
            });
            countryId = result.id;
        }
        if (countryId) {
            const create = async (data) => {
                await this.stateModel.create({ data });
            };
            const states = [
                "Amazonas",
                "Anzoátegui",
                "Apure",
                "Aragua",
                "Barinas",
                "Bolívar",
                "Carabobo",
                "Cojedes",
                "Delta Amacuro",
                "Distrito Capital",
                "Falcón",
                "Guárico",
                "Lara",
                "Mérida",
                "Miranda",
                "Monagas",
                "Nueva Esparta",
                "Portuguesa",
                "Sucre",
                "Táchira",
                "Trujillo",
                "Vargas",
                "Yaracuy",
                "Zulia"
            ];
            states.forEach(async (state) => {
                await create({
                    countryReference: { connect: { id: countryId } },
                    createByReference: { connect: { id: user.id } },
                    name: state
                });
            });
        }
    }
    async paymentFix() {
        const user = await this.userModel.find({ filter: { email: `superadmin@example.com` } });
        if (!user) {
            return;
        }
        let dolarId = ``;
        let bolivarId = ``;
        const moneyBolivaresFound = await this.moneyModel.find({ filter: { name: `Bolivares` } });
        const moneyDolarFound = await this.moneyModel.find({ filter: { name: `Dolar` } });
        if (moneyDolarFound) {
            dolarId = moneyDolarFound.id;
        }
        else {
            const result = await this.moneyModel.create({ data: { createByReference: { connect: { id: user.id } }, description: `Moneda americana`, name: `Dolar`, prefix: `$` } });
            dolarId = result.id;
        }
        if (moneyBolivaresFound) {
            bolivarId = moneyBolivaresFound.id;
        }
        if (!bolivarId)
            return;
        const bcv = await this.paymentModel.find({ filter: { name: `Pago móvil - Venezuela` } });
        const otherBank = await this.paymentModel.find({ filter: { name: `Pago móvil - Otros bancos` } });
        if (bcv) {
            await this.paymentModel.update({
                data: {
                    createByReference: { connect: { id: user.id } },
                    moneyReference: { connect: { id: bolivarId } },
                    description: `0102 04125727034 28482348`,
                    name: `Pago móvil - Venezuela`,
                    required: [`Cédula`, `Teléfono`, `Banco`],
                    dolar: false
                },
                filter: { id: bcv.id }
            });
        }
        else {
            await this.paymentModel.create({
                data: {
                    createByReference: { connect: { id: user.id } },
                    moneyReference: { connect: { id: bolivarId } },
                    description: `0102 04125727034 28482348`,
                    name: `Pago móvil - Venezuela`,
                    required: [`Cédula`, `Teléfono`, `Banco`],
                    dolar: false
                }
            });
        }
        if (otherBank) {
            await this.paymentModel.update({
                data: {
                    createByReference: { connect: { id: user.id } },
                    moneyReference: { connect: { id: bolivarId } },
                    description: `0102 04125727034 28482348`,
                    name: `Pago móvil - Otros bancos`,
                    required: [`Cédula`, `Teléfono`, `Banco`],
                    dolar: false
                },
                filter: { id: otherBank.id }
            });
        }
        else {
            await this.paymentModel.create({
                data: {
                    createByReference: { connect: { id: user.id } },
                    moneyReference: { connect: { id: bolivarId } },
                    description: `0102 04125727034 28482348`,
                    name: `Pago móvil - Otros bancos`,
                    required: [`Cédula`, `Teléfono`, `Banco`],
                    dolar: false
                }
            });
        }
        if (!dolarId)
            return;
        const paypal = await this.paymentModel.find({ filter: { name: `Paypal` } });
        const zinli = await this.paymentModel.find({ filter: { name: `Zinli` } });
        const wally = await this.paymentModel.find({ filter: { name: `Wally` } });
        if (paypal) {
            await this.paymentModel.update({
                data: {
                    createByReference: { connect: { id: user.id } },
                    moneyReference: { connect: { id: bolivarId } },
                    description: `jsojo346@gmail.com`,
                    name: `Paypal`,
                    required: [`Correo`]
                },
                filter: { id: paypal.id }
            });
        }
        else {
            await this.paymentModel.create({
                data: {
                    createByReference: { connect: { id: user.id } },
                    moneyReference: { connect: { id: bolivarId } },
                    description: `jsojo346@gmail.com`,
                    name: `Paypal`,
                    required: [`Correo`]
                }
            });
        }
        if (zinli) {
            await this.paymentModel.update({
                data: {
                    createByReference: { connect: { id: user.id } },
                    moneyReference: { connect: { id: bolivarId } },
                    description: `jsojo346@gmail.com`,
                    name: `Zinli`,
                    required: [`Correo`]
                },
                filter: { id: zinli.id }
            });
        }
        else {
            await this.paymentModel.create({
                data: {
                    createByReference: { connect: { id: user.id } },
                    moneyReference: { connect: { id: bolivarId } },
                    description: `jsojo346@gmail.com`,
                    name: `Zinli`,
                    required: [`Correo`]
                }
            });
        }
        if (wally) {
            await this.paymentModel.update({
                data: {
                    createByReference: { connect: { id: user.id } },
                    moneyReference: { connect: { id: bolivarId } },
                    description: `jsojo346@gmail.com`,
                    name: `Wally`,
                    required: [`Correo`]
                },
                filter: { id: wally.id }
            });
        }
        else {
            await this.paymentModel.create({
                data: {
                    createByReference: { connect: { id: user.id } },
                    moneyReference: { connect: { id: bolivarId } },
                    description: `jsojo346@gmail.com`,
                    name: `Wally`,
                    required: [`Correo`]
                }
            });
        }
        return {};
    }
    async unityFix() {
        const user = await this.userModel.find({ filter: { email: `superadmin@example.com` } });
        if (!user) {
            return;
        }
        const unidad = await this.unityModel.find({ filter: { name: `Unidad` } });
        const trozo = await this.unityModel.find({ filter: { name: `Toroz` } });
        const porcion = await this.unityModel.find({ filter: { name: `Porción` } });
        if (!unidad)
            await this.unityModel.create({ data: { name: `Unidad`, abr: `unidad`, createByReference: { connect: { id: user.id } } } });
        if (!trozo)
            await this.unityModel.create({ data: { name: `Trozo`, abr: `trozo`, createByReference: { connect: { id: user.id } } } });
        if (!porcion)
            await this.unityModel.create({ data: { name: `Porción`, abr: `porción`, createByReference: { connect: { id: user.id } } } });
        return {};
    }
    async subscriptionFix() {
        const user = await this.userModel.find({ filter: { email: `superadmin@example.com` } });
        if (!user) {
            return;
        }
        const stone = await this.unityModel.find({ filter: { name: `STONE` } });
        const iron = await this.unityModel.find({ filter: { name: `IRON` } });
        const diamon = await this.unityModel.find({ filter: { name: `DIAMON` } });
        const gold = await this.unityModel.find({ filter: { name: `GOLD` } });
        if (!stone)
            await this.subscriptionModel.create({ data: { name: `STONE`, countMonth: 1, defaultMount: 39.99, createByReference: { connect: { id: user.id } } } });
        if (!iron)
            await this.subscriptionModel.create({ data: { name: `IRON`, countMonth: 3, defaultMount: 29.99, createByReference: { connect: { id: user.id } } } });
        if (!diamon)
            await this.subscriptionModel.create({ data: { name: `DIAMON`, countMonth: 6, defaultMount: 24.99, createByReference: { connect: { id: user.id } } } });
        if (!gold)
            await this.subscriptionModel.create({ data: { name: `GOLD`, countMonth: 12, defaultMount: 20, createByReference: { connect: { id: user.id } } } });
        return {};
    }
};
FixtureCreate = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [permit_model_1.default,
        user_model_1.default,
        country_model_1.default,
        state_model_1.default,
        city_model_1.default,
        money_model_1.default,
        payment_model_1.default,
        subsccription_model_1.default,
        unity_model_1.default,
        user_service_1.default,
        AppActions_1.default])
], FixtureCreate);
exports.default = FixtureCreate;
//# sourceMappingURL=create.fixtures.js.map