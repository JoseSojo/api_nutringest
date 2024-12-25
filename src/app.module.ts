import { Module } from '@nestjs/common';
import { jwtConstants } from './constant';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LanguajeService } from './languaje/languaje.service';
import { PrismaService } from './prisma/prisma.service';
import { ValidationService } from './validation/validation.service';
import AuthService from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AppController } from './app.controller';
import { AuthGuard } from './guards/AuthGuard';
import { StorageService } from './storage/storage.service';
import AppEvent from './AppEvent';
import UserModel from './model/user.model';
import PermitModel from './model/permit.model';
import ConfigCountryModel from './model/master/country.model';
import ConfigCityModel from './model/master/city.model';
import ConfigStateModel from './model/master/state.model';
import ConfigMoneyModel from './model/master/money.model';
import PaymentMethodModel from './model/master/payment.model';
import ConfigSubscriptionModel from './model/master/subsccription.model';
import FoodAllModel from './model/quote/food.model';
import PrimitiveFoodModel from './model/nutri/food.model';
import PresentationModel from './model/nutri/presentation.model';
import SupplementModel from './model/nutri/supplement.model';
import UnityMeasureModel from './model/nutri/unity.model';
import ExchangeListModel from './model/quote/exchange.model';
import MenuModel from './model/quote/menu.model';
import QuoteModel from './model/quote/quote.model';
import UserService from './service/user.service';
import PermitService from './service/permit.service';
import ConfigCountryService from './service/master/country.service';
import ConfigStateService from './service/master/state.service';
import ConfigCityService from './service/master/city.service';
import ConfigMoneyService from './service/master/money.service';
import PaymentMethodService from './service/master/payment.service';
import ConfigSubscriptionService from './service/master/subsccription.service';
import PrimitiveFoodService from './service/nutri/food.service';
import PresentationService from './service/nutri/presentation.service';
import SupplementService from './service/nutri/supplement.service';
import UnityMeasureService from './service/nutri/unity.service';
import FoodAllService from './service/quote/food.service';
import ExchangeListService from './service/quote/exchange.service';
import MenuService from './service/quote/menu.service';
import QuoteService from './service/quote/quote.service';
import AppActions from './AppActions';
import FixtureCreate from './fixtures/create.fixtures';
import UserController from './controller/api/user.controller';
import CityController from './controller/api/master/city.controller';
import CountryController from './controller/api/master/country.controller';
import MoneyController from './controller/api/master/money.controller';
import PaymentMethodController from './controller/api/master/payment.controller';
import SubscriptionController from './controller/api/master/subscription.controller';
import PrimitiveFoodController from './controller/api/nutri/food.controller';
import PresentationController from './controller/api/nutri/presentation.controller';
import SupplementController from './controller/api/nutri/supplement.controller';
import UnityMeasureController from './controller/api/nutri/unity.controller';
import ExchangeListController from './controller/api/quote/exchange.controller';
import FoodController from './controller/api/quote/food.controller';
import MenuController from './controller/api/quote/menu.controller';
import QuoteController from './controller/api/quote/quote.controller';
import FromGuiController from './controller/api/gui/form.gui.controller';
import DashboardGuiController from './controller/api/gui/dashboard.gui.controller';
import CrudGuiController from './controller/api/gui/crud.gui.controller';
import SelectController from './controller/api/select/select.controller';
import StateController from './controller/api/master/state.controller';
import PermitController from './controller/api/permit.controller';
import PatientController from './controller/api/quote/patient.controller';
import NutricionistController from './controller/api/quote/nutricionist.controller';
import ExchangeListFoodModel from './model/quote/exchange.food.model';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import CardGuiController from './controller/api/gui/card.gui.controller';
import GuiService from './service/gui.service';
import CalendarController from './controller/api/calendar.controller';
import CalendarModel from './model/calendar.model';
import CalendarService from './service/calendar.service';
import HistoryService from './service/history.service';
import AppCoupon from './AppCoupon';
import CouponService from './service/coupon.service';
import CouponModel from './model/coupon.model';
import CouponController from './controller/api/coupon.controller';
import ConfigSubscriptionHandlerModel from './model/master/subsccription.detail.model';
import ConfigSubscriptionHandlerService from './service/master/subsccription.detail.service';
import ConfigSubscriptionDetailController from './controller/api/subscription.detail.controller';
import WalletService from './service/wallet.service';
import { ScheduleModule } from '@nestjs/schedule';
import SubscriptionCron from './service/cron/SubscriptionCron';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "1d" }
    }),
    ScheduleModule.forRoot()
  ],
  controllers: [
    // PermitController
    SelectController,
    AuthController,
    AppController,

    // ROOT
    UserController,
    PermitController,

    // MASTER
    CityController,
    CountryController,
    StateController,
    MoneyController,
    PaymentMethodController,
    SubscriptionController,

    // NUTRI ADMIN
    PrimitiveFoodController,
    PresentationController,
    SupplementController,
    UnityMeasureController,

    // QUOTE
    ExchangeListController,
    FoodController,
    MenuController,
    QuoteController,
    PatientController,
    NutricionistController,
    ConfigSubscriptionDetailController,

    // CALENDAR
    CalendarController,
    CouponController,

    // GUI
    FromGuiController,
    DashboardGuiController,
    CrudGuiController,
    CardGuiController


  ],
  providers: [
    AppActions,
    AppCoupon,
    AppEvent,
    // globals
    JwtService,
    LanguajeService,
    AuthGuard,
    PrismaService,
    ValidationService,
    AuthService,
    StorageService,

    // MODELOS
    UserModel,
    PermitModel,
    ConfigCountryModel,
    ConfigStateModel,
    ConfigCityModel,
    ConfigMoneyModel,
    PaymentMethodModel,
    ConfigSubscriptionModel,
    ConfigSubscriptionHandlerModel,

    PrimitiveFoodModel,
    PresentationModel,
    SupplementModel,
    UnityMeasureModel,

    FoodAllModel,
    ExchangeListModel,
    MenuModel,
    QuoteModel,

    CalendarModel,
    CouponModel,

    //
    ExchangeListFoodModel,

    // Servicios
    UserService,
    PermitService,
    ConfigCountryService,
    ConfigStateService,
    ConfigCityService,
    ConfigMoneyService,
    PaymentMethodService,
    ConfigSubscriptionService,
    ConfigSubscriptionHandlerService,

    PrimitiveFoodService,
    PresentationService,
    SupplementService,
    UnityMeasureService,

    FoodAllService,
    ExchangeListService,
    MenuService,
    QuoteService,
    GuiService,

    WalletService,

    CalendarService,
    HistoryService,
    CouponService,

    SubscriptionCron,

    // FIXTURES
    FixtureCreate,
  ],
})
export class AppModule { }
