import { Controller, Get, Param, Req, UseGuards } from "@nestjs/common";
import AppActions from "src/AppActions";
import AuthService from "src/auth/auth.service";
import { AuthGuard } from "src/guards/AuthGuard";
import { LanguajeInterface } from "src/languaje/guard/languaje.interface";
import { LanguajeService } from "src/languaje/languaje.service";
import CalendarService from "src/service/calendar.service";
import ConfigCityService from "src/service/master/city.service";
import ConfigCountryService from "src/service/master/country.service";
import ConfigMoneyService from "src/service/master/money.service";
import PaymentMethodService from "src/service/master/payment.service";
import ConfigStateService from "src/service/master/state.service";
import ConfigSubscriptionService from "src/service/master/subsccription.service";
import PrimitiveFoodService from "src/service/nutri/food.service";
import PresentationService from "src/service/nutri/presentation.service";
import SupplementService from "src/service/nutri/supplement.service";
import UnityMeasureService from "src/service/nutri/unity.service";
import PermitService from "src/service/permit.service";
import ExchangeListService from "src/service/quote/exchange.service";
import FoodAllService from "src/service/quote/food.service";
import MenuService from "src/service/quote/menu.service";
import QuoteService from "src/service/quote/quote.service";
import UserService from "src/service/user.service";
import { ActionCrudInterface, PermitObject } from "src/validation/types/ActionSlideInterface";


/**
 * Retorna al front 
 * Permisos de screen
 * Permisos de list
 * Título
 * 
 * 
 */
@Controller(`gui/crud`)
export default class CrudGuiController {

    private lang: LanguajeInterface;

    constructor(
        private authService: AuthService,
        private appActions: AppActions,

        // APP
        private userService: UserService,
        private permitService: PermitService,
        private countryService: ConfigCountryService,
        private stateService: ConfigStateService,
        private cityService: ConfigCityService,
        private moneyService: ConfigMoneyService,
        private paymentMethodService: PaymentMethodService,
        private subscriptionService: ConfigSubscriptionService,

        // NUTRI
        private primitiveFoodService: PrimitiveFoodService,
        private presentationService: PresentationService,
        private supplementService: SupplementService,
        private unityService: UnityMeasureService,

        // QUOTE
        private exchangeListService: ExchangeListService,
        private menuService: MenuService,
        private foodAllService: FoodAllService,
        private quoteService: QuoteService,

        // 
        private calendarService: CalendarService,
        
        private languaje: LanguajeService 
    ) {
        this.lang = this.languaje.GetTranslate()
    }
    
    /**
     * Finanzas (Validar X)
     */    
    @Get(`finance`)
    @UseGuards(AuthGuard)
    private async formGuiFinance(@Req() req: any) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];

        const actionsList = this.paymentMethodService.getActionsList(permit);
        const actionsUnique: ActionCrudInterface[] = [
            {
                ico: `unique`,
                label: `Ver`,
                path: ``,
                use: `modal`
            }
        ];
        if(user.rolReference.name === this.appActions.USER_SUPER_ADMIN || user.rolReference.name === this.appActions.USER_FINANCE) {
            actionsUnique.push(
                {
                    ico: `success`,
                    label: `Aprobar`,
                    path: ``,
                    use: `modal`
                }
            );
            actionsUnique.push(
                {
                    ico: `cancel`,
                    label: `Cancelar`,
                    path: ``,
                    use: `modal`
                }
            );
        }

        const title = `Finanzas`;

        return { actionsList, actionsUnique, title };
    } 

    /**
     * USUARIO
     */
    @Get(`user`)
    @UseGuards(AuthGuard)
    private async formGuiUser(@Req() req: any) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];

        const actionsList = this.userService.getActionsList(permit);
        const actionsUnique = this.userService.getActionsUnique(permit);
        const title = `Usuarios`;

        return { actionsList, actionsUnique, title };
    }  

    /**
     * USUARIO
     */
    @Get(`permit`)
    @UseGuards(AuthGuard)
    private async formGuiPermit(@Req() req: any) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];

        const actionsList = this.permitService.getActionsList(permit);
        const actionsUnique = this.permitService.getActionsUnique(permit);
        const title = `Permisos`;

        return { actionsList, actionsUnique, title };
    }  

    /**
     * PAIS (COUNTRY)
     */    
    @Get(`country`)
    @UseGuards(AuthGuard)
    private async formGuiCountry(@Req() req: any) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];

        const actionsList = this.countryService.getActionsList(permit);
        const actionsUnique = this.countryService.getActionsUnique(permit);
        const title = `Paises`;

        return { actionsList, actionsUnique, title };
    } 

    /**
     * ESTADOS (STATE)
     */    
    @Get(`state`)
    @UseGuards(AuthGuard)
    private async formGuiState(@Req() req: any) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];

        const actionsList = this.stateService.getActionsList(permit);
        const actionsUnique = this.stateService.getActionsUnique(permit);
        const title = `Estados`;

        return { actionsList, actionsUnique, title };
    }

    /**
     * CIUDAD (CITY)
     */    
    @Get(`city`)
    @UseGuards(AuthGuard)
    private async formGuiCity(@Req() req: any) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];

        const actionsList = this.cityService.getActionsList(permit);
        const actionsUnique = this.cityService.getActionsUnique(permit);
        const title = `Ciudades`;

        return { actionsList, actionsUnique, title };
    }

    /**
     * MONEDA (MONEY)
     */    
    @Get(`money`)
    @UseGuards(AuthGuard)
    private async formGuiMoney(@Req() req: any) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];

        const actionsList = this.moneyService.getActionsList(permit);
        const actionsUnique = this.moneyService.getActionsUnique(permit);
        const title = `Monedas`;

        return { actionsList, actionsUnique, title };
    }

    /**
     * Método de pago (PAYMENT METHOD)
     */    
    @Get(`payment`)
    @UseGuards(AuthGuard)
    private async formGuiPaymentMethod(@Req() req: any) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];

        const actionsList = this.paymentMethodService.getActionsList(permit);
        const actionsUnique = this.paymentMethodService.getActionsUnique(permit);
        const title = `Métodos de pago`;

        return { actionsList, actionsUnique, title };
    } 

    /**
     * Subscripciones (SUBSCRIPTION)
     */    
    @Get(`subscription`)
    @UseGuards(AuthGuard)
    private async formGuiSubscription(@Req() req: any) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];

        const actionsList = this.subscriptionService.getActionsList(permit);
        const actionsUnique = this.subscriptionService.getActionsUnique(permit);
        const title = `Subscripciones`;

        return { actionsList, actionsUnique, title };
    } 
    
    /**
     * Alimentos primitivos (Primitive Food)
     */    
    @Get(`primitive`)
    @UseGuards(AuthGuard)
    private async formGuiPrimitiveFood(@Req() req: any) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];

        const actionsList = this.primitiveFoodService.getActionsList(permit);
        const actionsUnique = this.primitiveFoodService.getActionsUnique(permit);
        const title = `Alimentos`;

        return { actionsList, actionsUnique, title };
    } 

    /**
     * Presetaciones (PRESENTATIONS)
     */    
    @Get(`presentation`)
    @UseGuards(AuthGuard)
    private async formGuiPresentation(@Req() req: any) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];

        const actionsList = this.presentationService.getActionsList(permit);
        const actionsUnique = this.presentationService.getActionsUnique(permit);
        const title = `Presentaciones`;

        return { actionsList, actionsUnique, title };
    } 

    /**
     * Suplementos (SUPPLEMENT)
     */    
    @Get(`supplement`)
    @UseGuards(AuthGuard)
    private async formGuiSupplement(@Req() req: any) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];

        const actionsList = this.supplementService.getActionsList(permit);
        const actionsUnique = this.supplementService.getActionsUnique(permit);
        const title = `Suplementos`;

        return { actionsList, actionsUnique, title };
    } 

    /**
     * Unidades de medida (UNITY MEASURE)
     */    
    @Get(`unity`)
    @UseGuards(AuthGuard)
    private async formGuiUnityMeasure(@Req() req: any) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];

        const actionsList = this.unityService.getActionsList(permit);
        const actionsUnique = this.unityService.getActionsUnique(permit);
        const title = `Unidades de medida`;

        return { actionsList, actionsUnique, title };
    } 

    /**
     * LISTA DE INTERCAMBIO (EXCHANGE LIST)
     */    
    @Get(`exchange`)
    @UseGuards(AuthGuard)
    private async formGuiExchageList(@Req() req: any) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];

        const actionsList = this.exchangeListService.getActionsList(permit);
        const p = 
            user.rolReference.name === this.appActions.USER_PACIENTE || user.rolReference.name === this.appActions.USER_NUTRICIONISTA 
            ? true 
            : false;
        const actionsUnique = this.exchangeListService.getActionsUnique(permit, p);
        const title = `Lista de intercambio`;

        return { actionsList, actionsUnique, title };
    } 

    /**
     * MENUS (MENU)
     */    
    @Get(`menu`)
    @UseGuards(AuthGuard)
    private async formGuiMenu(@Req() req: any) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];

        const actionsList = this.menuService.getActionsList(permit);
        const p = 
            user.rolReference.name === this.appActions.USER_PACIENTE || user.rolReference.name === this.appActions.USER_NUTRICIONISTA 
            ? true 
            : false;
        const actionsUnique = this.menuService.getActionsUnique(permit, p);
        const title = `Menús`;

        return { actionsList, actionsUnique, title };
    } 

    /**
     * Todos Los Alimentos (FOOD ALL)
     */    
    @Get(`food`)
    @UseGuards(AuthGuard)
    private async formGuiFoodAll(@Req() req: any) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];

        const actionsList = this.foodAllService.getActionsList(permit);
        const actionsUnique = this.foodAllService.getActionsUnique(permit);
        const title = `Alimentos`;

        return { actionsList, actionsUnique, title };
    } 

    /**
     * CITAS (QUOTE)
     */    
    @Get(`quote`)
    @UseGuards(AuthGuard)
    private async formGuiQuote(@Req() req: any) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];

        const actionsList = this.quoteService.getActionsList(permit);
        const actionsUnique = this.quoteService.getActionsUnique(permit);
        const title = `Citas`;

        // DATA STRUCT

        return { actionsList, actionsUnique, title };
    }

    @Get(`patient`)
    @UseGuards(AuthGuard)
    private async formGuiPatient(@Req() req: any) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];

        const actionsList = this.userService.getActionsList(permit);
        const actionsUnique = this.userService.getActionsUniqueNutri(permit);
        const title = `Pacientes`;

        return { actionsList, actionsUnique, title };
    }

    @Get(`nutricionist`)
    @UseGuards(AuthGuard)
    private async formGuiNutricionist(@Req() req: any) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];

        const actionsList = this.userService.getActionsList(permit);
        const actionsUnique = this.userService.getActionsUnique(permit);
        const title = `Nutricionista`;

        return { actionsList, actionsUnique, title };
    }

    // QUOTE ITEMS
    /**
     * Todos Los Alimentos (FOOD ALL)
     */    
    @Get(`quote/food`)
    @UseGuards(AuthGuard)
    private async formGuiFoodAllQuote(@Req() req: any) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];

        const actionsList = this.foodAllService.getActionsList(permit);
        const actionsUnique = this.foodAllService.getActionsUniqueInQuote(permit, true);
        const header = this.foodAllService.HeaderMinList();
        const extract = this.foodAllService.HeaderMinListExtract();
        const title = `Alimentos`;

        return { actionsList, actionsUnique, title, header, extract };
    } 

    /**
     * Todos Los Alimentos (FOOD ALL)
     */    
    @Get(`quote/exchange`)
    @UseGuards(AuthGuard)
    private async formGuiExchangeAllQuote(@Req() req: any) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];

        const actionsList = this.exchangeListService.getActionsList(permit);
        const actionsUnique = this.exchangeListService.getActionsUniqueInQuote(permit, true);
        const header = this.exchangeListService.HeaderMinList();
        const extract = this.exchangeListService.HeaderMinListExtract();
        const title = `Listas`;

        return { actionsList, actionsUnique, title, header, extract };
    } 

    /**
     * Todos Los Alimentos (FOOD ALL)
     */    
    @Get(`quote/menu`)
    @UseGuards(AuthGuard)
    private async formGuiMenuAllQuote(@Req() req: any) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];

        const actionsList = this.menuService.getActionsList(permit);
        const actionsUnique = this.menuService.getActionsUniqueInQuote(permit, true);
        const header = this.menuService.HeaderMinList();
        const extract = this.menuService.HeaderMinListExtract();
        const title = `Menus`;

        return { actionsList, actionsUnique, title, header, extract };
    } 

    @Get(`calendar`)
    @UseGuards(AuthGuard)
    private async calendar(@Req() req: any) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];

        const actionsList = this.calendarService.getActionsList(permit);
        const actionsUnique = this.calendarService.getActionsUniquePropietary(permit);
        const title = `Agenda`;

        return { actionsList, actionsUnique, title };
    }
}
