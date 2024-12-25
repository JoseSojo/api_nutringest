"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const AppActions_1 = require("../../../AppActions");
const AuthGuard_1 = require("../../../guards/AuthGuard");
const gui_service_1 = require("../../../service/gui.service");
let CardGuiController = class CardGuiController {
    constructor(guiService, permit) {
        this.guiService = guiService;
        this.permit = permit;
    }
    async cards(req) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const cards = await this.guiService.getAllCards({ name: user.rolReference.name, permits: permit, userId: user.id });
        return cards;
    }
    async cardsWallet(req) {
        const user = req.user;
        const permit = user.rolReference.roles;
        const cards = await this.guiService.getCardWallet({ name: user.rolReference.name, permits: permit, userId: user.id });
        return cards;
    }
};
__decorate([
    (0, common_1.Get)(``),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CardGuiController.prototype, "cards", null);
__decorate([
    (0, common_1.Get)(`wallet`),
    (0, common_1.UseGuards)(AuthGuard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CardGuiController.prototype, "cardsWallet", null);
CardGuiController = __decorate([
    (0, common_1.Controller)(`gui/card`),
    __metadata("design:paramtypes", [gui_service_1.default,
        AppActions_1.default])
], CardGuiController);
exports.default = CardGuiController;
//# sourceMappingURL=card.gui.controller.js.map