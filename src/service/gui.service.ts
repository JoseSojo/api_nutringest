import { Injectable } from "@nestjs/common";
import AppActions from "src/AppActions";
import { LanguajeInterface } from "src/languaje/guard/languaje.interface";
import { LanguajeService } from "src/languaje/languaje.service";
import CalendarModel from "src/model/calendar.model";
import ConfigCityModel from "src/model/master/city.model";
import ConfigCountryModel from "src/model/master/country.model";
import ConfigMoneyModel from "src/model/master/money.model";
import PaymentMethodModel from "src/model/master/payment.model";
import ConfigStateModel from "src/model/master/state.model";
import ConfigSubscriptionModel from "src/model/master/subsccription.model";
import PrimitiveFoodModel from "src/model/nutri/food.model";
import PresentationModel from "src/model/nutri/presentation.model";
import SupplementModel from "src/model/nutri/supplement.model";
import UnityMeasureModel from "src/model/nutri/unity.model";
import ExchangeListModel from "src/model/quote/exchange.model";
import FoodAllModel from "src/model/quote/food.model";
import MenuModel from "src/model/quote/menu.model";
import QuoteModel from "src/model/quote/quote.model";
import UserModel from "src/model/user.model";
import { Card } from "src/validation/types/DashboardInterface";
import WalletService from "./wallet.service";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export default class GuiService {

    private lang: LanguajeInterface;
    constructor (
        private permit: AppActions,
        private prisma: PrismaService,

        // APP
        private userModel: UserModel,
        private countryModel: ConfigCountryModel,
        private stateModel: ConfigStateModel,
        private cityModel: ConfigCityModel,
        private moneyModel: ConfigMoneyModel,
        private paymentMethodModel: PaymentMethodModel,
        private subscriptionModel: ConfigSubscriptionModel,

        // NUTRI
        private primitiveFoodModel: PrimitiveFoodModel,
        private presentationModel: PresentationModel,
        private supplementModel: SupplementModel,
        private unityModel: UnityMeasureModel,

        // QUOTE
        private exchangeListModel: ExchangeListModel,
        private menuModel: MenuModel,
        private foodAllModel: FoodAllModel,
        private quoteModel: QuoteModel,

        // AGEND
        private calendarModel: CalendarModel,

        // WALLET
        private wallet: WalletService,

        private languaje: LanguajeService
    ) {
        this.lang = languaje.GetTranslate();
    }

    public async getAllCards({permits,name,userId}:{permits: string[],name:string,userId:string}):Promise<Card[]> {

        let currentCards: Card[] = []

        const wallet = await this.wallet.findUser({ id:userId });
        currentCards.push({ ico:`wallet`, label:`Billetera`,value:wallet ? wallet.mount.toString() : 0 })

        if(permits.includes(this.permit.APP_PERMIT_USER_COUNT)) {
            const countUserPromise = this.userModel.count({ filter:{ AND:[{isDelete:false},{rolReference:{name:{not:this.permit.USER_SUPER_ADMIN}}}] } });
            const countAdminPromise = this.userModel.count({ filter:{ AND:[{isDelete:false},{rolReference:{name:this.permit.USER_APP_ADMIN}}] } });
            const countNutriromise = this.userModel.count({ filter:{ AND:[{isDelete:false},{rolReference:{name:this.permit.USER_NUTRI_ADMIN}}] } });
            const countNutricionistromise = this.userModel.count({ filter:{ AND:[{isDelete:false},{rolReference:{name:this.permit.USER_NUTRICIONISTA}}] } });
            const countPatientPromise = this.userModel.count({ filter:{ AND:[{isDelete:false},{rolReference:{name:this.permit.USER_PACIENTE}}] } });

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
                    { label: `Nutri Admin`, value: countNutr.toString()},
                    { label: `Nutricionistas`, value: countNutricionis.toString() },
                    { label: `Pacientes`,value: countPatient.toString() }
                ]
            });
        }

        if(permits.includes(this.permit.APP_PERMIT_FOOD_COUNT)) {
            const countPromise = this.primitiveFoodModel.count({ filter:{ isDelete:false } });
            const count = await countPromise;
            currentCards.push({ 
                ico: `food`,
                label: `Alimentos`,
                value: count,
            });
        }

        if(permits.includes(this.permit.APP_PERMIT_QUOTE_COUNT)) {
            const countPromise = this.quoteModel.count({ filter:{ isDelete:false } });
            const count = await countPromise;
            currentCards.push({ 
                ico: `quote`,
                label: `Citas`,
                value: count,
            });
        }

        if(permits.includes(this.permit.APP_PERMIT_PAYMENT_METHOD_COUNT)) {
            const countPromise = this.paymentMethodModel.count({ filter:{ isDelete:false } });
            const count = await countPromise;
            currentCards.push({ 
                ico: `food`,
                label: `Métodos de pago`,
                value: count,
            });
        }

        if(permits.includes(this.permit.APP_PERMIT_PROPIETARY_EXCHANGE_LIST_COUNT)) {
            const countPromise = this.exchangeListModel.count({ filter:{ AND:[{isDelete:false},{userId}] } });
            const count = await countPromise;
            currentCards.push({ 
                ico: `food`,
                label: `Mis listas de intercambio`,
                value: count,
            });
        }

        if(permits.includes(this.permit.APP_PERMIT_PROPIETARY_MENU_COUNT)) {
            const countPromise = this.menuModel.count({ filter:{ AND:[{isDelete:false},{createById:userId}] } });
            const count = await countPromise;
            currentCards.push({ 
                ico: `food`,
                label: `Mis Menús`,
                value: count,
            });
        }

        if(permits.includes(this.permit.APP_PERMIT_PROPIETARY_QUOTE_COUNT)) {
            const countPromise = this.quoteModel.count({ filter:{ AND:[{isDelete:false},{nutricionistId:userId}] } });
            const count = await countPromise;
            currentCards.push({ 
                ico: `food`,
                label: `Mis Citas`,
                value: count,
            });
        }

        if(permits.includes(this.permit.APP_PERMIT_CALENDAR_PROPIETARY_COUNT)) {
            const countPromise = this.calendarModel.count({ filter:{ AND:[{isDelete:false},{status:`ACTIVA`},{createById:userId}] } });
            const count = await countPromise;
            currentCards.push({ 
                ico: `agend`,
                label: `Agenda Activa`,
                value: count,
            });
        }

        // Pagos por validar
        
        // Citas activas

        // Pagos totales

        // Usuarios Recurentes

        return currentCards;
    }

    public async getCardWallet({permits,name,userId}:{name:string,permits: string[],userId:string}):Promise<Card[]> {
        let currentCards: Card[] = []

        const walletPromise = this.wallet.findUser({ id:userId });
        const paymentAllPromise = this.prisma.paymentFinance.count({ 
            where: {
                AND: [
                    { userReference:{id:userId} },
                ]
            }
        });

        const paymentAprobadoPromise = this.prisma.paymentFinance.count({ 
            where: {
                AND: [
                    { userReference:{id:userId} },
                    { status:`APROBADO` }
                ]
            }
        });

        const paymentRechazadoPromise = this.prisma.paymentFinance.count({ 
            where: {
                AND: [
                    { userReference:{id:userId} },
                    { status:`RECHAZADO` }
                ]
            }
        });

        // saldo actual
        const wallet = await walletPromise;
        currentCards.push({ ico:`wallet`, label:`BILLETERA`,value:wallet ? wallet.mount.toString() : 0 })

        // total de pagos
        const all = await paymentAllPromise;
        currentCards.push({ ico:`all`, label:`PAGOS TOTALES`,value:all ? all.toString() : 0 })
        
        // pagos aporbados
        const aprobado = await paymentAprobadoPromise;
        currentCards.push({ ico:`aprobado`, label:`APROBADOS`,value:aprobado ? aprobado.toString() : 0 })


        // pagos rechazados
        const rechazado = await paymentRechazadoPromise;
        currentCards.push({ ico:`rechazado`, label:`RECHAZADOS`,value:rechazado ? rechazado.toString() : 0 })


        return currentCards;
    } 

    public async getCardsAppAdmin (): Promise<Card[]> {
        const custonCards: Card[] = [];
        return custonCards;
    }

    public async getCardsNutriAdmin (): Promise<Card[]> {
        const custonCards: Card[] = [];
        return custonCards;
    }
    
    public async getCardsPatient (): Promise<Card[]> {
        const custonCards: Card[] = [];
        return custonCards;
    }
    
    public async getCardsNutricionist (): Promise<Card[]> {
        const custonCards: Card[] = [];
        return custonCards;
    }

}
