import AppActions from "src/AppActions";
import AuthService from "src/auth/auth.service";
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
export default class CrudGuiController {
    private authService;
    private appActions;
    private userService;
    private permitService;
    private countryService;
    private stateService;
    private cityService;
    private moneyService;
    private paymentMethodService;
    private subscriptionService;
    private primitiveFoodService;
    private presentationService;
    private supplementService;
    private unityService;
    private exchangeListService;
    private menuService;
    private foodAllService;
    private quoteService;
    private calendarService;
    private languaje;
    private lang;
    constructor(authService: AuthService, appActions: AppActions, userService: UserService, permitService: PermitService, countryService: ConfigCountryService, stateService: ConfigStateService, cityService: ConfigCityService, moneyService: ConfigMoneyService, paymentMethodService: PaymentMethodService, subscriptionService: ConfigSubscriptionService, primitiveFoodService: PrimitiveFoodService, presentationService: PresentationService, supplementService: SupplementService, unityService: UnityMeasureService, exchangeListService: ExchangeListService, menuService: MenuService, foodAllService: FoodAllService, quoteService: QuoteService, calendarService: CalendarService, languaje: LanguajeService);
    private formGuiFinance;
    private formGuiUser;
    private formGuiPermit;
    private formGuiCountry;
    private formGuiState;
    private formGuiCity;
    private formGuiMoney;
    private formGuiPaymentMethod;
    private formGuiSubscription;
    private formGuiPrimitiveFood;
    private formGuiPresentation;
    private formGuiSupplement;
    private formGuiUnityMeasure;
    private formGuiExchageList;
    private formGuiMenu;
    private formGuiFoodAll;
    private formGuiQuote;
    private formGuiPatient;
    private formGuiNutricionist;
    private formGuiFoodAllQuote;
    private formGuiExchangeAllQuote;
    private formGuiMenuAllQuote;
    private calendar;
}
