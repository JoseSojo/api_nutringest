import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import AppActions from "src/AppActions";
import AppEvent from "src/AppEvent";
import { AuthGuard } from "src/guards/AuthGuard";
import { LanguajeInterface } from "src/languaje/guard/languaje.interface";
import { LanguajeService } from "src/languaje/languaje.service";
import HistoryService from "src/service/history.service";
import ConfigSubscriptionHandlerService from "src/service/master/subsccription.detail.service";

@Controller(`/subscription/detail`)
export default class ConfigSubscriptionDetailController {

    private lang: LanguajeInterface;
    constructor(
        private service: ConfigSubscriptionHandlerService,
        private appEvents: AppEvent,
        private history: HistoryService,
        private permit: AppActions,
        private languaje: LanguajeService, 
    ) {
        this.lang = this.languaje.GetTranslate()
    }

    @Post(`change/:id`) 
    @UseGuards(AuthGuard)
    private async singChangeSubscription(@Req() req: any, @Body() body: any, @Param() param: { id: string }) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];
        // const action = this.getPermit(user.rolReference.name).udpate;

        await this.service.ChangeSubscription({ subscription:param.id, userId:user.id });        

        return {
            message: `Cambio realizado.`
        }
        // this.service.({ subscription:param.id,user:user.id });
    }


    @Post(`/assing/:id`)
    @UseGuards(AuthGuard)
    private async assingUser(@Req() req: any, @Body() body: any, @Param() param: { id: string }) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];
        // const action = this.getPermit(user.rolReference.name).udpate;

        // this.service.({ subscription:param.id,user:user.id });
    }

    @Get(`/my/`)
    @UseGuards(AuthGuard)
    private async FindMySub(@Req() req: any) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];
        // const action = this.getPermit(user.rolReference.name).udpate;

        const responseService = this.service.FindMySub({ user:user.id });
        return {
            body: await responseService
        };

    }

    @Get(`/my/`)
    @UseGuards(AuthGuard)
    private async FindAllSub(@Req() req: any) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];
        // const action = this.getPermit(user.rolReference.name).udpate;

        const responseService = this.service.FindMySub({ user:user.id });
        
        return {
            body: await responseService
        };

    }
    
}
