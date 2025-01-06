import { Controller, Get, Query, Req, UseGuards } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import AuthService from "src/auth/auth.service";
import { AuthGuard } from "src/guards/AuthGuard";
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

@Controller(`select`)
export default class SelectController {

    constructor(
        private authService: AuthService,

        // APP
        private permitService: PermitService,
        private userService: UserService,
        private countryService: ConfigCountryService,
        private stateService: ConfigStateService,
        private cityService: ConfigCityService,
        private moneyService: ConfigMoneyService,
        private paymentMethodService: PaymentMethodService,

        // NUTRI
        private primitiveFoodService: PrimitiveFoodService,
        private presentationService: PresentationService,
        private supplementService: SupplementService,
        private unityService: UnityMeasureService,

        // QUOTE
        private exchangeListService: ExchangeListService,
        private menuService: MenuService,
        private foodAllService: FoodAllService,
        private quoteService: QuoteService
    ) {}

    @Get(`type`)
    @UseGuards(AuthGuard)
    private async type (@Req() req: any, @Query() query: {param?:string}) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];

        const customReturn: {id:string,label:string}[] = [
            { id:`DESAYUNO`,label:`DESAYUNO` },
            { id:`MERIENDA`,label:`MERIENDA` },
            { id:`ALMUERZO`,label:`ALMUERZO` },
            { id:`CENA`,label:`CENA` },
        ];

        return customReturn;    
    }

    @Get(`permit`)
    @UseGuards(AuthGuard)
    private async permit (@Req() req: any, @Query() query: {param?:string}) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];

        const customFilter: Prisma.PermitsWhereInput[] = [];

        if(query.param) customFilter.push({ name:{contains:query.param} });

        const filter: Prisma.PermitsWhereInput = { AND:customFilter }; 
        const listPromise = await this.permitService.paginate({ filter, skip:0,take:10 });

        const customReturn: {id:string,label:string}[] = [];
        listPromise.body.list.forEach((item) => {
            customReturn.push({
                id: item.id,
                label: item.name
            })
        });

        return customReturn;    
    }

    @Get(`money`)
    @UseGuards(AuthGuard)
    private async money (@Req() req: any, @Query() query: {param?:string}) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];

        const customFilter: Prisma.CoinWhereInput[] = [];

        if(query.param) customFilter.push({ name:{contains:query.param} });

        const filter: Prisma.CoinWhereInput = { AND:customFilter }; 
        const listPromise = await this.moneyService.paginate({ filter, skip:0,take:10 });

        const customReturn: {id:string,label:string}[] = [];
        listPromise.body.list.forEach((item) => {
            customReturn.push({
                id: item.id,
                label: item.name
            })
        });

        return customReturn;    
    }

    @Get(`mypatient`)
    @UseGuards(AuthGuard)
    private async mypatient (@Req() req: any, @Query() query: {param?:string}) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];

        const customFilter: Prisma.UserWhereInput[] = [];

        customFilter.push({ parentId: user.id });
        customFilter.push({ isDelete: false });
        if(query.param) customFilter.push({ name:{contains:query.param} });

        const filter: Prisma.UserWhereInput = { AND:customFilter }; 
        const listPromise = await this.userService.paginate({ filter, skip:0,take:10 });

        const customReturn: {id:string,label:string}[] = [];
        listPromise.body.list.forEach((item) => {
            customReturn.push({
                id: item.id,
                label: item.name
            })
        });

        return customReturn;    
    }

    @Get(`country`)
    @UseGuards(AuthGuard)
    private async country (@Req() req: any, @Query() query: {param?:string}) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];

        const customFilter: Prisma.ConfigCountryWhereInput[] = [];

        if(query.param) customFilter.push({ name:{contains:query.param} });

        const filter: Prisma.ConfigCountryWhereInput = { AND:customFilter }; 
        const listPromise = await this.countryService.paginate({ filter, skip:0,take:10 });

        const customReturn: {id:string,label:string}[] = [];
        listPromise.body.list.forEach((item) => {
            customReturn.push({
                id: item.id,
                label: item.name
            })
        });

        return customReturn;    
    }

    @Get(`state`)
    @UseGuards(AuthGuard)
    private async state (@Req() req: any, @Query() query: {param?:string,country?:string}) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];

        const customFilter: Prisma.ConfigStateWhereInput[] = [];

        if(query.param) customFilter.push({ name:{contains:query.param} });
        if(query.country) customFilter.push({ countryId: query.country });

        const filter: Prisma.ConfigStateWhereInput = { AND:customFilter }; 
        const listPromise = await this.stateService.paginate({ filter, skip:0,take:10 });

        const customReturn: {id:string,label:string}[] = [];
        listPromise.body.list.forEach((item) => {
            customReturn.push({
                id: item.id,
                label: item.name
            })
        });

        return customReturn;    
    }

    @Get(`city`)
    @UseGuards(AuthGuard)
    private async city (@Req() req: any, @Query() query: {param?:string,state?:string}) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];

        const customFilter: Prisma.ConfigCityWhereInput[] = [];

        if(query.param) customFilter.push({ name:{contains:query.param} });
        if(query.state) customFilter.push({ stateId: query.state });

        const filter: Prisma.ConfigCityWhereInput = { AND:customFilter }; 
        const listPromise = await this.cityService.paginate({ filter, skip:0,take:10 });

        const customReturn: {id:string,label:string}[] = [];
        listPromise.body.list.forEach((item) => {
            customReturn.push({
                id: item.id,
                label: item.name
            })
        });

        return customReturn;    
    }

    @Get(`supplement`)
    @UseGuards(AuthGuard)
    private async supplement (@Req() req: any, @Query() query: {param?:string}) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];

        const customFilter: Prisma.SupplementWhereInput[] = [];

        if(query.param) customFilter.push({ name:{contains:query.param} });

        const filter: Prisma.SupplementWhereInput = { AND:customFilter }; 
        const listPromise = await this.supplementService.paginate({ filter, skip:0,take:10 });

        const customReturn: {id:string,label:string}[] = [];
        listPromise.body.list.forEach((item) => {
            customReturn.push({
                id: item.id,
                label: item.name
            })
        });

        return customReturn;    
    }

    @Get(`unity`)
    @UseGuards(AuthGuard)
    private async unity (@Req() req: any, @Query() query: {param?:string}) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];

        const customFilter: Prisma.UnityMeasureWhereInput[] = [];

        if(query.param) customFilter.push({ name:{contains:query.param} });

        const filter: Prisma.UnityMeasureWhereInput = { AND:customFilter }; 
        const listPromise = await this.unityService.paginate({ filter, skip:0,take:10 });

        const customReturn: {id:string,label:string}[] = [];
        listPromise.body.list.forEach((item) => {
            customReturn.push({
                id: item.id,
                label: item.name
            })
        });

        return customReturn;    
    }

    @Get(`primitive`)
    @UseGuards(AuthGuard)
    private async primitive (@Req() req: any, @Query() query: {param?:string}) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];

        const customFilter: Prisma.PrimitiveFoodWhereInput[] = [];

        if(query.param) customFilter.push({ name:{contains:query.param} });

        const filter: Prisma.PrimitiveFoodWhereInput = { AND:customFilter }; 
        const listPromise = await this.primitiveFoodService.paginate({ filter, skip:0,take:10 });

        const customReturn: {id:string,label:string}[] = [];
        listPromise.body.list.forEach((item) => {
            customReturn.push({
                id: item.id,
                label: item.name
            })
        });

        return customReturn;    
    }

}
