import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import AppActions from "src/AppActions";
import { AuthGuard } from "src/guards/AuthGuard";
import { Sidebar, SidebarChild } from "src/validation/types/DashboardInterface";

@Controller(`gui/dashboard`)
export default class DashboardGuiController {

    constructor(

        private permit: AppActions,
    ) { }

    @Get(`sidebar`)
    @UseGuards(AuthGuard)
    private async sidebar(@Req() req: any) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];

        const actions: Sidebar[] = [];

        const nutri: SidebarChild[] = [];
        const master: SidebarChild[] = [];
        const quote: SidebarChild[] = [];

        // acciones de propietario
        const propietary: Sidebar[] = [];

        if(permit.includes(this.permit.APP_PERMIT_USER_LIST)) actions.push({ ico:`users`,label:`Usuarios`,path:`/dashboard/user` });  
        if(permit.includes(this.permit.APP_PERMIT_PERMIT_LIST)) actions.push({ ico:`permit`,label:`Permisos`,path:`/dashboard/permit` });
        
        // MAESTROS
        if(permit.includes(this.permit.APP_PERMIT_COIN_LIST)) master.push({ ico:`money`,label:`Monedas`,path:`/dashboard/money` });  
        if(permit.includes(this.permit.APP_PERMIT_COUNTRY_LIST)) master.push({ ico:`country`,label:`Paises`,path:`/dashboard/country` });  
        if(permit.includes(this.permit.APP_PERMIT_STATE_LIST)) master.push({ ico:`state`,label:`Estados`,path:`/dashboard/state` });  
        if(permit.includes(this.permit.APP_PERMIT_CITY_LIST)) master.push({ ico:`city`,label:`Ciudades`,path:`/dashboard/city` });  
        if(permit.includes(this.permit.APP_PERMIT_PAYMENT_METHOD_LIST)) master.push({ ico:`payment`,label:`Métodos Pago`,path:`/dashboard/payment` });  
        if(permit.includes(this.permit.APP_PERMIT_SUBSCRIPTION_LIST)) master.push({ ico:`subscription`,label:`Subscripciones`,path:`/dashboard/subscription` });  
        
        // NUTRI
        if(permit.includes(this.permit.APP_PERMIT_FOOD_LIST)) nutri.push({ ico:`primitive`,label:`Alimentos`,path:`/dashboard/primitive` });  
        if(permit.includes(this.permit.APP_PERMIT_PRESENTATION_LIST)) nutri.push({ ico:`presentation`,label:`Presentaciones`,path:`/dashboard/presentation` });  
        if(permit.includes(this.permit.APP_PERMIT_SUPPLEMENT_LIST)) nutri.push({ ico:`supplement`,label:`Suplementos`,path:`/dashboard/supplement` });  
        if(permit.includes(this.permit.APP_PERMIT_UNITY_MEASURE_LIST)) nutri.push({ ico:`unity`,label:`Unidades de medida`,path:`/dashboard/unity` });  
        
        // QUOTE
        if(permit.includes(this.permit.APP_PERMIT_EXCHANGE_LIST_LIST)) quote.push({ ico:`exchange`,label:`Listas de intercambio`,path:`/dashboard/exchange` });  
        if(permit.includes(this.permit.APP_PERMIT_FOOD_LIST)) quote.push({ ico:`food`,label:`Alimentos`,path:`/dashboard/food` });  
        if(permit.includes(this.permit.APP_PERMIT_MENU_LIST)) quote.push({ ico:`menu`,label:`Menus`,path:`/dashboard/menu` });  
        if(permit.includes(this.permit.APP_PERMIT_QUOTE_LIST)) quote.push({ ico:`quote`,label:`Citas`,path:`/dashboard/quote` });  
        
        // PROPIETARIOS
        if(permit.includes(this.permit.APP_PERMIT_PROPIETARY_EXCHANGE_LIST_LIST)) propietary.push({ ico:`exchange`,label:`Mis listas de intercambio`,path:`/dashboard/exchange` });  
        if(permit.includes(this.permit.APP_PERMIT_PROPIETARY_MENU_LIST)) propietary.push({ ico:`menu`,label:`Mis menús`,path:`/dashboard/menu` });  
        if(permit.includes(this.permit.APP_PERMIT_PROPIETARY_QUOTE)) propietary.push({ ico:`quote`,label:`Mis citas`,path:`/dashboard/quote` });  
        if(permit.includes(this.permit.APP_PERMIT_PROPIETARY_PATIENT)) propietary.push({ ico:`users`,label:`Mis pacientes`,path:`/dashboard/patient` });  
        if(permit.includes(this.permit.APP_PERMIT_PROPIETARY_NUTRICIONIST)) propietary.push({ ico:`nutricionist`,label:`Mis nutricionistas`,path:`/dashboard/nutricionist` });  
        if(permit.includes(this.permit.APP_PERMIT_FOOD_LIST) && propietary.length > 0) propietary.push({ ico:`primitive`,label:`Alimentos`,path:`/dashboard/primitive` });  
        
        if(master.length > 0) actions.push({ ico:`master`,label:`Maestros`,path:null,chils:master });
        if(nutri.length > 0) actions.push({ ico:`nutri`,label:`Nutrición`,path:null,chils:nutri });
        if(quote.length > 0) actions.push({ ico:`quote`,label:`Citas`,path:null,chils:quote });
        if(propietary.length > 0) actions.push({ ico:`propietary`,label:`Citas`,path:null,chils:propietary });

        const customAction: Sidebar[] = propietary.length > 0 ? propietary :actions ;

        customAction.unshift({ ico:`agend`,label:`Agenda`,path:`/calendar/` });
        customAction.unshift({ ico:`dashboard`,label:`Dashboard`,path:`/dashboard/` });
        customAction.unshift({ ico:`finanza`,label:`Finanzas`,path:`/finanzas/` });
        return {
            sidebar: customAction
        }
    }

}
