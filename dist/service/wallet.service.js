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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const AppActions_1 = require("../AppActions");
const languaje_service_1 = require("../languaje/languaje.service");
const coupon_model_1 = require("../model/coupon.model");
const user_model_1 = require("../model/user.model");
const prisma_service_1 = require("../prisma/prisma.service");
let WalletService = class WalletService {
    constructor(prisma, userModel, permit, model, languaje) {
        this.prisma = prisma;
        this.userModel = userModel;
        this.permit = permit;
        this.model = model;
        this.languaje = languaje;
        this.lang = languaje.GetTranslate();
    }
    async increment({ id, mount }) {
        const result = this.prisma.wallet.update({ where: { id }, data: { mount: { increment: mount } } });
        return await result;
    }
    async decrement({ id, mount }) {
        const result = this.prisma.wallet.update({ where: { id }, data: { mount: { decrement: mount } } });
        return await result;
    }
    async get({ id, mount }) {
        const result = this.prisma.wallet.findFirst({ where: { id } });
        return await result;
    }
    async findUser({ id }) {
        const result = this.prisma.wallet.findFirst({ where: { userId: id } });
        return await result;
    }
    async create({ userId, mount, }) {
        const result = this.prisma.wallet.create({ data: { mount, userReference: { connect: { id: userId } } } });
        return result;
    }
};
WalletService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        user_model_1.default,
        AppActions_1.default,
        coupon_model_1.default,
        languaje_service_1.LanguajeService])
], WalletService);
exports.default = WalletService;
//# sourceMappingURL=wallet.service.js.map