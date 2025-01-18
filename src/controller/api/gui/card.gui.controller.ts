import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import AppActions from "src/AppActions";
import { AuthGuard } from "src/guards/AuthGuard";
import GuiService from "src/service/gui.service";

@Controller(`gui/card`)
export default class CardGuiController {

    constructor(
        private guiService: GuiService,
        private permit: AppActions,
    ) {}

    @Get(``)
    @UseGuards(AuthGuard)
    private async cards(@Req() req: any) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];

        const cards = await this.guiService.getAllCards({ name:user.rolReference.name, permits:permit, userId:user.id });

        return cards;
    }

    @Get(`wallet`)
    @UseGuards(AuthGuard)
    private async cardsWallet(@Req() req: any) {
        const user = req.user as any;
        const permit = user.rolReference.roles as string[];

        const cards = await this.guiService.getCardWallet({ name:user.rolReference.name, permits:permit, userId:user.id });

        return cards;
    }

}
