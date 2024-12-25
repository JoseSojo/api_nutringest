import { Controller, Get, Param, Req, UseGuards } from "@nestjs/common";
import { ConfigState, User } from "@prisma/client";
import { Request } from "express";
import AuthService from "src/auth/auth.service";
import { AuthGuard } from "src/guards/AuthGuard";
import { LanguajeInterface } from "src/languaje/guard/languaje.interface";
import { LanguajeService } from "src/languaje/languaje.service";
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
import ExchangeListService from "src/service/quote/exchange.service";
import FoodAllService from "src/service/quote/food.service";
import MenuService from "src/service/quote/menu.service";
import QuoteService from "src/service/quote/quote.service";
import UserService from "src/service/user.service";

@Controller(`gui/form`)
export default class FromGuiController {

    private lang: LanguajeInterface;

    constructor(
        private authService: AuthService,

        // APP
        private userService: UserService,
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
        private languaje: LanguajeService 
    ) {
        this.lang = this.languaje.GetTranslate()
    }

    @Get(`login`)
    private async formGuiLogin(@Req() req: Request) {
        const form = this.authService.formLogin();
        return form;
    }

    @Get(`register`)
    private async formGuiRegister(@Req() req: Request) {
        const form = this.authService.formRegister();
        return form;
    }
    
    /**
     * USUARIO
     */
    @Get(`user/create`)
    @UseGuards(AuthGuard)
    private async formGuiUserCreate(@Req() req: Request) {
        const form = this.userService.formCreate();
        return form;
    }  
    @Get(`user/update/:id`)
    @UseGuards(AuthGuard)
    private async formGuiUserUpdate(@Req() req: Request, @Param() param: {id:string}) {
        const userFound = await this.userService.find({ filter:{id:param.id} });
        const form = this.userService.formUpdate(userFound.body.data);
        return form;
    } 
    @Get(`user/delete/:id`)
    @UseGuards(AuthGuard)
    private async formGuiUserDelete(@Req() req: Request, @Param() param: {id:string}) {
        const form = this.userService.formDelete();
        return form;
    } 

    /**
     * PAIS (COUNTRY)
     */    
    @Get(`country/create`)
    @UseGuards(AuthGuard)
    private async formGuiCountryCreate(@Req() req: Request) {
        const form = this.countryService.formCreate();
        return form;
    } 
    @Get(`country/update/:id`)
    @UseGuards(AuthGuard)
    private async formGuiCountryUpdate(@Req() req: Request, @Param() param: {id:string}) {
        const countryFound = await this.countryService.find({ filter:{ id:param.id } });
        const form = this.countryService.formUpdate(countryFound.body);
        return form;
    }
    @Get(`country/delete/:id`)
    @UseGuards(AuthGuard)
    private async formGuiCountryDelete(@Req() req: Request, @Param() param: {id:string}) {
        const form = this.countryService.formDelete();
        return form;
    }

    /**
     * ESTADOS (STATE)
     */    
    @Get(`state/create`)
    @UseGuards(AuthGuard)
    private async formGuiStateCreate(@Req() req: Request) {
        const form = this.stateService.formCreate();
        return form;
    } 
    @Get(`state/update/:id`)
    @UseGuards(AuthGuard)
    private async formGuiStateUpdate(@Req() req: Request, @Param() param: {id:string}) {
        const entity = await this.stateService.find({ filter:{id:param.id} });
        const form = this.stateService.formUpdate(entity.body);
        return form;
    }
    @Get(`state/delete/:id`)
    @UseGuards(AuthGuard)
    private async formGuiStateDelete(@Req() req: Request, @Param() param: {id:string}) {
        const form = this.countryService.formDelete();
        return form;
    }

    /**
     * CIUDAD (CITY)
     */    
    @Get(`city/create`)
    @UseGuards(AuthGuard)
    private async formGuiCityCreate(@Req() req: Request) {
        const form = this.cityService.formCreate();
        return form;
    } 
    @Get(`city/update/:id`)
    @UseGuards(AuthGuard)
    private async formGuiCityUpdate(@Req() req: Request, @Param() param: {id:string}) {
        const entity = await this.cityService.find({ filter:{id:param.id} });
        const form = this.cityService.formUpdate(entity.body);
        return form;
    }
    @Get(`city/delete/:id`)
    @UseGuards(AuthGuard)
    private async formGuiCityDelete(@Req() req: Request, @Param() param: {id:string}) {
        const form = this.cityService.formDelete();
        return form;
    }

    /**
     * MONEDA (MONEY)
     */    
    @Get(`money/create`)
    @UseGuards(AuthGuard)
    private async formGuiMoneyCreate(@Req() req: Request) {
        const form = this.moneyService.formCreate();
        return form;
    } 
    @Get(`money/update/:id`)
    @UseGuards(AuthGuard)
    private async formGuiMoneyUpdate(@Req() req: Request, @Param() param: {id:string}) {
        const entity = await this.moneyService.find({ filter:{id:param.id} });
        const form = this.moneyService.formUpdate(entity.body);
        return form;
    }
    @Get(`money/delete/:id`)
    @UseGuards(AuthGuard)
    private async formGuiMoneyDelete(@Req() req: Request, @Param() param: {id:string}) {
        const form = this.moneyService.formDelete();
        return form;
    }

    /**
     * Método de pago (PAYMENT METHOD)
     */    
    @Get(`payment/create`)
    @UseGuards(AuthGuard)
    private async formGuiPaymentMethodCreate(@Req() req: Request) {
        const form = this.paymentMethodService.formCreate();
        return form;
    } 
    @Get(`payment/update/:id`)
    @UseGuards(AuthGuard)
    private async formGuiPaymentMethodUpdate(@Req() req: Request, @Param() param: {id:string}) {
        const entity = await this.paymentMethodService.find({ filter:{id:param.id} });
        const form = this.paymentMethodService.formUpdate(entity.body);
        return form;
    }
    @Get(`payment/delete/:id`)
    @UseGuards(AuthGuard)
    private async formGuiPaymentMethodDelete(@Req() req: Request, @Param() param: {id:string}) {
        const form = this.paymentMethodService.formDelete();
        return form;
    }

    /**
     * Método de pago (PAYMENT METHOD)
     */    
    @Get(`subscription/create`)
    @UseGuards(AuthGuard)
    private async formGuisubscriptionCreate(@Req() req: Request) {
        const form = this.subscriptionService.formCreate();
        return form;
    } 
    @Get(`subscription/update/:id`)
    @UseGuards(AuthGuard)
    private async formGuisubscriptionUpdate(@Req() req: Request, @Param() param: {id:string}) {
        const entity = await this.subscriptionService.find({ filter:{id:param.id} });
        const form = this.subscriptionService.formUpdate(entity.body);
        return form;
    }
    @Get(`subscription/delete/:id`)
    @UseGuards(AuthGuard)
    private async formGuisubscriptionDelete(@Req() req: Request, @Param() param: {id:string}) {
        const form = this.subscriptionService.formDelete();
        return form;
    }

    /**
     * Alimentos primitivos (Primitive Food)
     */    
    @Get(`primitive/create`)
    @UseGuards(AuthGuard)
    private async formGuiPrimitiveFoodCreate(@Req() req: Request) {
        const form = this.primitiveFoodService.formCreate();
        return form;
    } 
    @Get(`primitive/update/:id`)
    @UseGuards(AuthGuard)
    private async formGuiPrimitiveFoodUpdate(@Req() req: Request, @Param() param: {id:string}) {
        const entity = await this.primitiveFoodService.find({ filter:{id:param.id} });
        const form = this.primitiveFoodService.formUpdate(entity.body);
        return form;
    }
    @Get(`primitive/delete/:id`)
    @UseGuards(AuthGuard)
    private async formGuiPrimitiveFoodDelete(@Req() req: Request, @Param() param: {id:string}) {
        const form = this.primitiveFoodService.formDelete();
        return form;
    }

    /**
     * Presetaciones (PRESENTATIONS)
     */    
    @Get(`presentation/create`)
    @UseGuards(AuthGuard)
    private async formGuiPresentationCreate(@Req() req: Request) {
        const form = this.presentationService.formCreate();
        return form;
    } 
    @Get(`presentation/update/:id`)
    @UseGuards(AuthGuard)
    private async formGuiPresentationUpdate(@Req() req: Request, @Param() param: {id:string}) {
        const entity = await this.presentationService.find({ filter:{id:param.id} });
        const form = this.presentationService.formUpdate(entity.body);
        return form;
    }
    @Get(`presentation/delete/:id`)
    @UseGuards(AuthGuard)
    private async formGuiPresentationDelete(@Req() req: Request, @Param() param: {id:string}) {
        const form = this.presentationService.formDelete();
        return form;
    }

    /**
     * Suplementos (SUPPLEMENT)
     */    
    @Get(`supplement/create`)
    @UseGuards(AuthGuard)
    private async formGuiSupplementCreate(@Req() req: Request) {
        const form = this.supplementService.formCreate();
        return form;
    } 
    @Get(`supplement/update/:id`)
    @UseGuards(AuthGuard)
    private async formGuiSupplementUpdate(@Req() req: Request, @Param() param: {id:string}) {
        const entity = await this.supplementService.find({ filter:{id:param.id} });
        const form = this.supplementService.formUpdate(entity.body);
        return form;
    }
    @Get(`supplement/delete/:id`)
    @UseGuards(AuthGuard)
    private async formGuiSupplementDelete(@Req() req: Request, @Param() param: {id:string}) {
        const form = this.supplementService.formDelete();
        return form;
    }

    /**
     * Unidades de medida (UNITY MEASURE)
     */    
    @Get(`unity/create`)
    @UseGuards(AuthGuard)
    private async formGuiUnityMeasureCreate(@Req() req: Request) {
        const form = this.unityService.formCreate();
        return form;
    } 
    @Get(`unity/update/:id`)
    @UseGuards(AuthGuard)
    private async formGuiUnityMeasureUpdate(@Req() req: Request, @Param() param: {id:string}) {
        const entity = await this.unityService.find({ filter:{id:param.id} });
        const form = this.unityService.formUpdate(entity.body);
        return form;
    }
    @Get(`unity/delete/:id`)
    @UseGuards(AuthGuard)
    private async formGuiUnityMeasureDelete(@Req() req: Request, @Param() param: {id:string}) {
        const form = this.unityService.formDelete();
        return form;
    }

    /**
     * LISTA DE INTERCAMBIO (EXCHANGE LIST)
     */    
    @Get(`exchange/create`)
    @UseGuards(AuthGuard)
    private async formGuiExchageListCreate(@Req() req: Request) {
        const form = this.exchangeListService.formCreate();
        return form;
    } 
    @Get(`exchange/update/:id`)
    @UseGuards(AuthGuard)
    private async formGuiExchageListUpdate(@Req() req: Request, @Param() param: {id:string}) {
        const form = this.exchangeListService.formUpdate();
        return form;
    }
    @Get(`exchange/delete/:id`)
    @UseGuards(AuthGuard)
    private async formGuiExchageListDelete(@Req() req: Request, @Param() param: {id:string}) {
        const form = this.exchangeListService.formDelete();
        return form;
    }

    /**
     * MENUS (MENU)
     */    
    @Get(`menu/create`)
    @UseGuards(AuthGuard)
    private async formGuiMenuCreate(@Req() req: Request) {
        const form = this.menuService.formCreate();
        return form;
    } 
    @Get(`menu/update/:id`)
    @UseGuards(AuthGuard)
    private async formGuiMenuUpdate(@Req() req: Request, @Param() param: {id:string}) {
        const form = this.menuService.formUpdate();
        return form;
    }
    @Get(`menu/delete/:id`)
    @UseGuards(AuthGuard)
    private async formGuiMenuDelete(@Req() req: Request, @Param() param: {id:string}) {
        const form = this.menuService.formDelete();
        return form;
    }

    /**
     * Todos Los Alimentos (FOOD ALL)
     */    
    @Get(`food/create`)
    @UseGuards(AuthGuard)
    private async formGuiFoodAllCreate(@Req() req: Request) {
        const form = this.foodAllService.formCreate();
        return form;
    } 
    @Get(`food/update/:id`)
    @UseGuards(AuthGuard)
    private async formGuiFoodAllUpdate(@Req() req: Request, @Param() param: {id:string}) {
        const form = this.foodAllService.formUpdate();
        return form;
    }
    @Get(`food/delete/:id`)
    @UseGuards(AuthGuard)
    private async formGuiFoodAllDelete(@Req() req: Request, @Param() param: {id:string}) {
        const form = this.primitiveFoodService.formDelete();
        return form;
    }

    /**
     * CITAS (QUOTE)
     */    
    @Get(`quote/create`)
    @UseGuards(AuthGuard)
    private async formGuiQuoteCreate(@Req() req: Request) {
        const form = this.quoteService.formCreate();
        return form;
    } 
    @Get(`quote/update/:id`)
    @UseGuards(AuthGuard)
    private async formGuiQuoteUpdate(@Req() req: Request, @Param() param: {id:string}) {
        const form = this.quoteService.formUpdate();
        return form;
    }
    @Get(`quote/delete/:id`)
    @UseGuards(AuthGuard)
    private async formGuiQuoteDelete(@Req() req: Request, @Param() param: {id:string}) {
        const form = this.quoteService.formDelete();
        return form;
    }
}
