"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const constant_1 = require("./constant");
const jwt_1 = require("@nestjs/jwt");
const languaje_service_1 = require("./languaje/languaje.service");
const prisma_service_1 = require("./prisma/prisma.service");
const validation_service_1 = require("./validation/validation.service");
const auth_service_1 = require("./auth/auth.service");
const auth_controller_1 = require("./auth/auth.controller");
const app_controller_1 = require("./app.controller");
const AuthGuard_1 = require("./guards/AuthGuard");
const storage_service_1 = require("./storage/storage.service");
const AppEvent_1 = require("./AppEvent");
const user_model_1 = require("./model/user.model");
const permit_model_1 = require("./model/permit.model");
const country_model_1 = require("./model/master/country.model");
const city_model_1 = require("./model/master/city.model");
const state_model_1 = require("./model/master/state.model");
const money_model_1 = require("./model/master/money.model");
const payment_model_1 = require("./model/master/payment.model");
const subsccription_model_1 = require("./model/master/subsccription.model");
const food_model_1 = require("./model/quote/food.model");
const food_model_2 = require("./model/nutri/food.model");
const presentation_model_1 = require("./model/nutri/presentation.model");
const supplement_model_1 = require("./model/nutri/supplement.model");
const unity_model_1 = require("./model/nutri/unity.model");
const exchange_model_1 = require("./model/quote/exchange.model");
const menu_model_1 = require("./model/quote/menu.model");
const quote_model_1 = require("./model/quote/quote.model");
const user_service_1 = require("./service/user.service");
const permit_service_1 = require("./service/permit.service");
const country_service_1 = require("./service/master/country.service");
const state_service_1 = require("./service/master/state.service");
const city_service_1 = require("./service/master/city.service");
const money_service_1 = require("./service/master/money.service");
const payment_service_1 = require("./service/master/payment.service");
const subsccription_service_1 = require("./service/master/subsccription.service");
const food_service_1 = require("./service/nutri/food.service");
const presentation_service_1 = require("./service/nutri/presentation.service");
const supplement_service_1 = require("./service/nutri/supplement.service");
const unity_service_1 = require("./service/nutri/unity.service");
const food_service_2 = require("./service/quote/food.service");
const exchange_service_1 = require("./service/quote/exchange.service");
const menu_service_1 = require("./service/quote/menu.service");
const quote_service_1 = require("./service/quote/quote.service");
const AppActions_1 = require("./AppActions");
const create_fixtures_1 = require("./fixtures/create.fixtures");
const user_controller_1 = require("./controller/api/user.controller");
const city_controller_1 = require("./controller/api/master/city.controller");
const country_controller_1 = require("./controller/api/master/country.controller");
const money_controller_1 = require("./controller/api/master/money.controller");
const payment_controller_1 = require("./controller/api/master/payment.controller");
const subscription_controller_1 = require("./controller/api/master/subscription.controller");
const food_controller_1 = require("./controller/api/nutri/food.controller");
const presentation_controller_1 = require("./controller/api/nutri/presentation.controller");
const supplement_controller_1 = require("./controller/api/nutri/supplement.controller");
const unity_controller_1 = require("./controller/api/nutri/unity.controller");
const exchange_controller_1 = require("./controller/api/quote/exchange.controller");
const food_controller_2 = require("./controller/api/quote/food.controller");
const menu_controller_1 = require("./controller/api/quote/menu.controller");
const quote_controller_1 = require("./controller/api/quote/quote.controller");
const form_gui_controller_1 = require("./controller/api/gui/form.gui.controller");
const dashboard_gui_controller_1 = require("./controller/api/gui/dashboard.gui.controller");
const crud_gui_controller_1 = require("./controller/api/gui/crud.gui.controller");
const select_controller_1 = require("./controller/api/select/select.controller");
const state_controller_1 = require("./controller/api/master/state.controller");
const permit_controller_1 = require("./controller/api/permit.controller");
const patient_controller_1 = require("./controller/api/quote/patient.controller");
const nutricionist_controller_1 = require("./controller/api/quote/nutricionist.controller");
const exchange_food_model_1 = require("./model/quote/exchange.food.model");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const card_gui_controller_1 = require("./controller/api/gui/card.gui.controller");
const gui_service_1 = require("./service/gui.service");
const calendar_controller_1 = require("./controller/api/calendar.controller");
const calendar_model_1 = require("./model/calendar.model");
const calendar_service_1 = require("./service/calendar.service");
const history_service_1 = require("./service/history.service");
const AppCoupon_1 = require("./AppCoupon");
const coupon_service_1 = require("./service/coupon.service");
const coupon_model_1 = require("./model/coupon.model");
const coupon_controller_1 = require("./controller/api/coupon.controller");
const subsccription_detail_model_1 = require("./model/master/subsccription.detail.model");
const subsccription_detail_service_1 = require("./service/master/subsccription.detail.service");
const subscription_detail_controller_1 = require("./controller/api/subscription.detail.controller");
const wallet_service_1 = require("./service/wallet.service");
const schedule_1 = require("@nestjs/schedule");
const SubscriptionCron_1 = require("./service/cron/SubscriptionCron");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public'),
            }),
            jwt_1.JwtModule.register({
                global: true,
                secret: constant_1.jwtConstants.secret,
                signOptions: { expiresIn: "1d" }
            }),
            schedule_1.ScheduleModule.forRoot()
        ],
        controllers: [
            select_controller_1.default,
            auth_controller_1.AuthController,
            app_controller_1.AppController,
            user_controller_1.default,
            permit_controller_1.default,
            city_controller_1.default,
            country_controller_1.default,
            state_controller_1.default,
            money_controller_1.default,
            payment_controller_1.default,
            subscription_controller_1.default,
            food_controller_1.default,
            presentation_controller_1.default,
            supplement_controller_1.default,
            unity_controller_1.default,
            exchange_controller_1.default,
            food_controller_2.default,
            menu_controller_1.default,
            quote_controller_1.default,
            patient_controller_1.default,
            nutricionist_controller_1.default,
            subscription_detail_controller_1.default,
            calendar_controller_1.default,
            coupon_controller_1.default,
            form_gui_controller_1.default,
            dashboard_gui_controller_1.default,
            crud_gui_controller_1.default,
            card_gui_controller_1.default
        ],
        providers: [
            AppActions_1.default,
            AppCoupon_1.default,
            AppEvent_1.default,
            jwt_1.JwtService,
            languaje_service_1.LanguajeService,
            AuthGuard_1.AuthGuard,
            prisma_service_1.PrismaService,
            validation_service_1.ValidationService,
            auth_service_1.default,
            storage_service_1.StorageService,
            user_model_1.default,
            permit_model_1.default,
            country_model_1.default,
            state_model_1.default,
            city_model_1.default,
            money_model_1.default,
            payment_model_1.default,
            subsccription_model_1.default,
            subsccription_detail_model_1.default,
            food_model_2.default,
            presentation_model_1.default,
            supplement_model_1.default,
            unity_model_1.default,
            food_model_1.default,
            exchange_model_1.default,
            menu_model_1.default,
            quote_model_1.default,
            calendar_model_1.default,
            coupon_model_1.default,
            exchange_food_model_1.default,
            user_service_1.default,
            permit_service_1.default,
            country_service_1.default,
            state_service_1.default,
            city_service_1.default,
            money_service_1.default,
            payment_service_1.default,
            subsccription_service_1.default,
            subsccription_detail_service_1.default,
            food_service_1.default,
            presentation_service_1.default,
            supplement_service_1.default,
            unity_service_1.default,
            food_service_2.default,
            exchange_service_1.default,
            menu_service_1.default,
            quote_service_1.default,
            gui_service_1.default,
            wallet_service_1.default,
            calendar_service_1.default,
            history_service_1.default,
            coupon_service_1.default,
            SubscriptionCron_1.default,
            create_fixtures_1.default,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map