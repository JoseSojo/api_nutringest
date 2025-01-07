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
const languaje_service_1 = require("../languaje/languaje.service");
const calendar_model_1 = require("../model/calendar.model");
const city_model_1 = require("../model/master/city.model");
const country_model_1 = require("../model/master/country.model");
const money_model_1 = require("../model/master/money.model");
const payment_model_1 = require("../model/master/payment.model");
const state_model_1 = require("../model/master/state.model");
const subsccription_model_1 = require("../model/master/subsccription.model");
const food_model_1 = require("../model/nutri/food.model");
const presentation_model_1 = require("../model/nutri/presentation.model");
const supplement_model_1 = require("../model/nutri/supplement.model");
const unity_model_1 = require("../model/nutri/unity.model");
const exchange_model_1 = require("../model/quote/exchange.model");
const food_model_2 = require("../model/quote/food.model");
const menu_model_1 = require("../model/quote/menu.model");
const quote_model_1 = require("../model/quote/quote.model");
const user_model_1 = require("../model/user.model");
const wallet_service_1 = require("./wallet.service");
const prisma_service_1 = require("../prisma/prisma.service");
let GuiService = class GuiService {
    constructor(permit, prisma, userModel, countryModel, stateModel, cityModel, moneyModel, paymentMethodModel, subscriptionModel, primitiveFoodModel, presentationModel, supplementModel, unityModel, exchangeListModel, menuModel, foodAllModel, quoteModel, calendarModel, wallet, languaje) {
        this.permit = permit;
        this.prisma = prisma;
        this.userModel = userModel;
        this.countryModel = countryModel;
        this.stateModel = stateModel;
        this.cityModel = cityModel;
        this.moneyModel = moneyModel;
        this.paymentMethodModel = paymentMethodModel;
        this.subscriptionModel = subscriptionModel;
        this.primitiveFoodModel = primitiveFoodModel;
        this.presentationModel = presentationModel;
        this.supplementModel = supplementModel;
        this.unityModel = unityModel;
        this.exchangeListModel = exchangeListModel;
        this.menuModel = menuModel;
        this.foodAllModel = foodAllModel;
        this.quoteModel = quoteModel;
        this.calendarModel = calendarModel;
        this.wallet = wallet;
        this.languaje = languaje;
        this.lang = languaje.GetTranslate();
    }
    async getAllCards({ permits, name, userId }) {
        let currentCards = [];
        const wallet = await this.wallet.findUser({ id: userId });
        currentCards.push({ ico: `wallet`, label: `Billetera`, value: wallet ? wallet.mount.toString() : 0 });
        if (permits.includes(this.permit.APP_PERMIT_USER_COUNT)) {
            const countUserPromise = this.userModel.count({ filter: { AND: [{ isDelete: false }, { rolReference: { name: { not: this.permit.USER_SUPER_ADMIN } } }] } });
            const countAdminPromise = this.userModel.count({ filter: { AND: [{ isDelete: false }, { rolReference: { name: this.permit.USER_APP_ADMIN } }] } });
            const countNutriromise = this.userModel.count({ filter: { AND: [{ isDelete: false }, { rolReference: { name: this.permit.USER_NUTRI_ADMIN } }] } });
            const countNutricionistromise = this.userModel.count({ filter: { AND: [{ isDelete: false }, { rolReference: { name: this.permit.USER_NUTRICIONISTA } }] } });
            const countPatientPromise = this.userModel.count({ filter: { AND: [{ isDelete: false }, { rolReference: { name: this.permit.USER_PACIENTE } }] } });
            const countUser = await countUserPromise;
            const countAdmin = await countAdminPromise;
            const countNutr = await countNutriromise;
            const countNutricionis = await countNutricionistromise;
            const countPatient = await countPatientPromise;
            currentCards.push({
                ico: `users`,
                label: `Usuarios`,
                value: countUser,
                child: [
                    { label: `Usuarios`, value: countUser.toString() },
                    { label: `Administradores`, value: countAdmin.toString() },
                    { label: `Nutri Admin`, value: countNutr.toString() },
                    { label: `Nutricionistas`, value: countNutricionis.toString() },
                    { label: `Pacientes`, value: countPatient.toString() }
                ]
            });
        }
        if (permits.includes(this.permit.APP_PERMIT_FOOD_COUNT)) {
            const countPromise = this.primitiveFoodModel.count({ filter: { isDelete: false } });
            const count = await countPromise;
            currentCards.push({
                ico: `food`,
                label: `Alimentos`,
                value: count,
            });
        }
        if (permits.includes(this.permit.APP_PERMIT_QUOTE_COUNT)) {
            const countPromise = this.quoteModel.count({ filter: { isDelete: false } });
            const count = await countPromise;
            currentCards.push({
                ico: `quote`,
                label: `Citas`,
                value: count,
            });
        }
        if (permits.includes(this.permit.APP_PERMIT_PAYMENT_METHOD_COUNT)) {
            const countPromise = this.paymentMethodModel.count({ filter: { isDelete: false } });
            const count = await countPromise;
            currentCards.push({
                ico: `food`,
                label: `Métodos de pago`,
                value: count,
            });
        }
        if (permits.includes(this.permit.APP_PERMIT_PROPIETARY_EXCHANGE_LIST_COUNT)) {
            const countPromise = this.exchangeListModel.count({ filter: { AND: [{ isDelete: false }, { userId }] } });
            const count = await countPromise;
            currentCards.push({
                ico: `food`,
                label: `Mis listas de intercambio`,
                value: count,
            });
        }
        if (permits.includes(this.permit.APP_PERMIT_PROPIETARY_MENU_COUNT)) {
            const countPromise = this.menuModel.count({ filter: { AND: [{ isDelete: false }, { createById: userId }] } });
            const count = await countPromise;
            currentCards.push({
                ico: `food`,
                label: `Mis Menús`,
                value: count,
            });
        }
        if (permits.includes(this.permit.APP_PERMIT_PROPIETARY_QUOTE_COUNT)) {
            const countPromise = this.quoteModel.count({ filter: { AND: [{ isDelete: false }, { nutricionistId: userId }] } });
            const count = await countPromise;
            currentCards.push({
                ico: `food`,
                label: `Mis Citas`,
                value: count,
            });
        }
        if (permits.includes(this.permit.APP_PERMIT_CALENDAR_PROPIETARY_COUNT)) {
            const countPromise = this.calendarModel.count({ filter: { AND: [{ isDelete: false }, { status: `ACTIVA` }, { createById: userId }] } });
            const count = await countPromise;
            currentCards.push({
                ico: `agend`,
                label: `Agenda Activa`,
                value: count,
            });
        }
        return currentCards;
    }
    async getCardWallet({ permits, name, userId }) {
        let currentCards = [];
        const walletPromise = this.wallet.findUser({ id: userId });
        const paymentAllPromise = this.prisma.paymentFinance.count({
            where: {
                AND: [
                    { userReference: { id: userId } },
                ]
            }
        });
        const paymentAprovadoPromise = this.prisma.paymentFinance.count({
            where: {
                AND: [
                    { userReference: { id: userId } },
                    { status: `APROVADO` }
                ]
            }
        });
        const paymentRechazadoPromise = this.prisma.paymentFinance.count({
            where: {
                AND: [
                    { userReference: { id: userId } },
                    { status: `RECHAZADO` }
                ]
            }
        });
        const wallet = await walletPromise;
        currentCards.push({ ico: `wallet`, label: `Billetera`, value: wallet ? wallet.mount.toString() : 0 });
        const all = await paymentAllPromise;
        currentCards.push({ ico: `all`, label: `Pagos totales`, value: all ? all.toString() : 0 });
        const aprovado = await paymentAprovadoPromise;
        currentCards.push({ ico: `aprovado`, label: `APROVADOS`, value: aprovado ? aprovado.toString() : 0 });
        const rechazado = await paymentRechazadoPromise;
        currentCards.push({ ico: `rechazado`, label: `RECHAZADOS`, value: rechazado ? rechazado.toString() : 0 });
        return currentCards;
    }
    async getCardsAppAdmin() {
        const custonCards = [];
        return custonCards;
    }
    async getCardsNutriAdmin() {
        const custonCards = [];
        return custonCards;
    }
    async getCardsPatient() {
        const custonCards = [];
        return custonCards;
    }
    async getCardsNutricionist() {
        const custonCards = [];
        return custonCards;
    }
};
GuiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [AppActions_1.default,
        prisma_service_1.PrismaService,
        user_model_1.default,
        country_model_1.default,
        state_model_1.default,
        city_model_1.default,
        money_model_1.default,
        payment_model_1.default,
        subsccription_model_1.default,
        food_model_1.default,
        presentation_model_1.default,
        supplement_model_1.default,
        unity_model_1.default,
        exchange_model_1.default,
        menu_model_1.default,
        food_model_2.default,
        quote_model_1.default,
        calendar_model_1.default,
        wallet_service_1.default,
        languaje_service_1.LanguajeService])
], GuiService);
exports.default = GuiService;
//# sourceMappingURL=gui.service.js.map