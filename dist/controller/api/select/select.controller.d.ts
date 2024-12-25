import AuthService from "src/auth/auth.service";
import ConfigCityService from "src/service/master/city.service";
import ConfigCountryService from "src/service/master/country.service";
import ConfigMoneyService from "src/service/master/money.service";
import PaymentMethodService from "src/service/master/payment.service";
import ConfigStateService from "src/service/master/state.service";
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
export default class SelectController {
    private authService;
    private permitService;
    private userService;
    private countryService;
    private stateService;
    private cityService;
    private moneyService;
    private paymentMethodService;
    private primitiveFoodService;
    private presentationService;
    private supplementService;
    private unityService;
    private exchangeListService;
    private menuService;
    private foodAllService;
    private quoteService;
    constructor(authService: AuthService, permitService: PermitService, userService: UserService, countryService: ConfigCountryService, stateService: ConfigStateService, cityService: ConfigCityService, moneyService: ConfigMoneyService, paymentMethodService: PaymentMethodService, primitiveFoodService: PrimitiveFoodService, presentationService: PresentationService, supplementService: SupplementService, unityService: UnityMeasureService, exchangeListService: ExchangeListService, menuService: MenuService, foodAllService: FoodAllService, quoteService: QuoteService);
    private type;
    private permit;
    private money;
    private mypatient;
    private country;
    private state;
    private city;
    private supplement;
    private unity;
    private primitive;
}