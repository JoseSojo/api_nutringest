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
var SubscriptionCron_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const prisma_service_1 = require("../../prisma/prisma.service");
const subsccription_detail_service_1 = require("../master/subsccription.detail.service");
let SubscriptionCron = SubscriptionCron_1 = class SubscriptionCron {
    constructor(prisma, suscriptionUser) {
        this.prisma = prisma;
        this.suscriptionUser = suscriptionUser;
        this.logger = new common_1.Logger(SubscriptionCron_1.name);
        this.date = new Date();
    }
    async subscriptionRenove() {
        let skip = 0;
        let take = 100;
        const day = this.date.getDate();
        const month = this.date.getMonth() + 1;
        const year = this.date.getFullYear();
        const renovar = await this.prisma.subscriptionInUser.findMany({
            where: {
                AND: [
                    { dayEnd: day },
                    { monthEnd: month },
                    { yearEnd: year },
                ],
            },
            skip,
            take
        });
        renovar.forEach(async (free) => {
            await this.ActiveSusbcriptionRenovar(free.userById);
        });
    }
    async subscriptionFreeTrial() {
        let skip = 0;
        let take = 100;
        const day = this.date.getDate();
        const month = this.date.getMonth() + 1;
        const year = this.date.getFullYear();
        const declineFreeTrial = await this.prisma.subscriptionInUser.findMany({
            where: {
                AND: [
                    { dayEnd: day },
                    { monthEnd: month },
                    { yearEnd: year },
                ],
            },
            skip,
            take
        });
        declineFreeTrial.forEach(async (free) => {
            await this.ActiveSusbcriptionFree(free.userById);
        });
    }
    async ActiveSusbcriptionFree(userId) {
        const subscriptionFound = await this.prisma.taskSeondPlanSubscription.findFirst({
            where: {
                AND: [
                    { completed: false },
                    { userId },
                    { isDelete: false },
                ]
            }
        });
        if (!subscriptionFound)
            return;
        const extra = subscriptionFound.extra;
        const walletPromise = this.prisma.wallet.findFirst({ where: { userId } });
        const subsctiptionPromise = this.prisma.subscription.findFirst({ where: { id: extra.to } });
        const subscriptionInUserFound = this.prisma.subscriptionInUser.findFirst({ where: { userById: userId }, include: { subscriptionReference: true } });
        const wallet = await walletPromise;
        const subscription = await subsctiptionPromise;
        const subscriptionInUser = await subscriptionInUserFound;
        const sumary = subscription.defaultMount * subscription.countMonth;
        await this.prisma.taskSeondPlanSubscription.update({ data: { completed: true }, where: { id: subscriptionFound.id } });
        let dates = this.suscriptionUser.GetDateSubscription1Month();
        if (subscriptionInUser.subscriptionReference.countMonth === 3)
            dates = this.suscriptionUser.GetDateSubscription3Month();
        if (subscriptionInUser.subscriptionReference.countMonth === 6)
            dates = this.suscriptionUser.GetDateSubscription6Month();
        if (subscriptionInUser.subscriptionReference.countMonth === 12)
            dates = this.suscriptionUser.GetDateSubscriptionYear();
        await this.prisma.taskSeondPlanSubscription.update({ data: { completed: true }, where: { id: subscriptionFound.id } });
        if (subscriptionInUser) {
            const subscriptionToUser = await this.prisma.subscription.findFirst({ where: { id: extra.id } });
            const stone = await this.prisma.subscription.findFirst({ where: { name: `STONE` } });
            const id = subscriptionToUser ? subscriptionToUser.id : stone.id;
            await this.prisma.subscriptionInUser.update({
                data: {
                    active: true,
                    status: `ACTIVO`,
                    dayStart: dates.start.day,
                    monthStart: dates.start.month,
                    yearStart: dates.start.year,
                    dayEnd: dates.end.day,
                    monthEnd: dates.end.month,
                    yearEnd: dates.end.year,
                    subscriptionReference: {
                        connect: { id }
                    }
                },
                where: {
                    id: subscriptionInUser.id
                }
            });
        }
        else {
            const subscriptionToUser = await this.prisma.subscription.findFirst({ where: { id: extra.id } });
            const stone = await this.prisma.subscription.findFirst({ where: { name: `STONE` } });
            const id = subscriptionToUser ? subscriptionToUser.id : stone.id;
            await this.prisma.subscriptionInUser.create({
                data: {
                    active: true,
                    status: `ACTIVO`,
                    dayStart: dates.start.day,
                    monthStart: dates.start.month,
                    yearStart: dates.start.year,
                    dayEnd: dates.end.day,
                    monthEnd: dates.end.month,
                    yearEnd: dates.end.year,
                    subscriptionReference: {
                        connect: { id }
                    }
                }
            });
        }
        await this.prisma.wallet.update({ data: { mount: { decrement: sumary } }, where: { id: wallet.id } });
    }
    async ActiveSusbcriptionRenovar(userId) {
        const subscriptionFound = await this.prisma.taskSeondPlanSubscription.findFirst({
            where: {
                AND: [
                    { completed: false },
                    { userId },
                    { isDelete: false },
                ]
            }
        });
        const userSub = await this.prisma.subscriptionInUser.findFirst({ where: { AND: [{ userById: userId }, { isDelete: false }] }, include: { subscriptionReference: true } });
        const extra = subscriptionFound && subscriptionFound.extra ? subscriptionFound.extra : { to: userSub.subscriptionReference.id };
        const walletPromise = this.prisma.wallet.findFirst({ where: { userId } });
        const subsctiptionPromise = this.prisma.subscription.findFirst({ where: { id: extra.to } });
        const subscriptionInUserFound = this.prisma.subscriptionInUser.findFirst({ where: { userById: userId }, include: { subscriptionReference: true } });
        const wallet = await walletPromise;
        const subscription = await subsctiptionPromise;
        const subscriptionInUser = await subscriptionInUserFound;
        const sumary = subscription.defaultMount * subscription.countMonth;
        let dates = this.suscriptionUser.GetDateSubscription1Month();
        if (subscriptionInUser.subscriptionReference.countMonth === 3)
            dates = this.suscriptionUser.GetDateSubscription3Month();
        if (subscriptionInUser.subscriptionReference.countMonth === 6)
            dates = this.suscriptionUser.GetDateSubscription6Month();
        if (subscriptionInUser.subscriptionReference.countMonth === 12)
            dates = this.suscriptionUser.GetDateSubscriptionYear();
        if (subscriptionFound) {
            await this.prisma.taskSeondPlanSubscription.update({ data: { completed: true }, where: { id: subscriptionFound.id } });
            await this.prisma.taskSeondPlanSubscription.update({ data: { completed: true }, where: { id: subscriptionFound.id } });
            if (subscriptionInUser) {
                const subscriptionToUser = await this.prisma.subscription.findFirst({ where: { id: extra.id } });
                const stone = await this.prisma.subscription.findFirst({ where: { name: `STONE` } });
                const id = subscriptionToUser ? subscriptionToUser.id : stone.id;
                await this.prisma.subscriptionInUser.update({
                    data: {
                        active: true,
                        status: `ACTIVO`,
                        dayStart: dates.start.day,
                        monthStart: dates.start.month,
                        yearStart: dates.start.year,
                        dayEnd: dates.end.day,
                        monthEnd: dates.end.month,
                        yearEnd: dates.end.year,
                        subscriptionReference: {
                            connect: { id }
                        }
                    },
                    where: {
                        id: subscriptionInUser.id
                    }
                });
            }
            else {
                const subscriptionToUser = await this.prisma.subscription.findFirst({ where: { id: extra.id } });
                const stone = await this.prisma.subscription.findFirst({ where: { name: `STONE` } });
                const id = subscriptionToUser ? subscriptionToUser.id : stone.id;
                await this.prisma.subscriptionInUser.create({
                    data: {
                        active: true,
                        status: `ACTIVO`,
                        dayStart: dates.start.day,
                        monthStart: dates.start.month,
                        yearStart: dates.start.year,
                        dayEnd: dates.end.day,
                        monthEnd: dates.end.month,
                        yearEnd: dates.end.year,
                        subscriptionReference: {
                            connect: { id }
                        }
                    }
                });
            }
            await this.prisma.wallet.update({ data: { mount: { decrement: sumary } }, where: { id: wallet.id } });
        }
        else {
            if (subscriptionInUser) {
                const subscriptionToUser = await this.prisma.subscription.findFirst({ where: { id: extra.id } });
                const stone = await this.prisma.subscription.findFirst({ where: { name: `STONE` } });
                const id = subscriptionToUser ? subscriptionToUser.id : stone.id;
                await this.prisma.subscriptionInUser.update({
                    data: {
                        active: true,
                        status: `ACTIVO`,
                        dayStart: dates.start.day,
                        monthStart: dates.start.month,
                        yearStart: dates.start.year,
                        dayEnd: dates.end.day,
                        monthEnd: dates.end.month,
                        yearEnd: dates.end.year,
                        subscriptionReference: {
                            connect: { id }
                        }
                    },
                    where: {
                        id: subscriptionInUser.id
                    }
                });
            }
            else {
                const subscriptionToUser = await this.prisma.subscription.findFirst({ where: { id: extra.id } });
                const stone = await this.prisma.subscription.findFirst({ where: { name: `STONE` } });
                const id = subscriptionToUser ? subscriptionToUser.id : stone.id;
                await this.prisma.subscriptionInUser.create({
                    data: {
                        active: true,
                        status: `ACTIVO`,
                        dayStart: dates.start.day,
                        monthStart: dates.start.month,
                        yearStart: dates.start.year,
                        dayEnd: dates.end.day,
                        monthEnd: dates.end.month,
                        yearEnd: dates.end.year,
                        subscriptionReference: {
                            connect: { id }
                        }
                    }
                });
            }
            await this.prisma.wallet.update({ data: { mount: { decrement: sumary } }, where: { id: wallet.id } });
        }
    }
};
__decorate([
    (0, schedule_1.Cron)(`55 3 11 * * *`),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubscriptionCron.prototype, "subscriptionRenove", null);
__decorate([
    (0, schedule_1.Cron)(`0 3 * * * *`),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubscriptionCron.prototype, "subscriptionFreeTrial", null);
SubscriptionCron = SubscriptionCron_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        subsccription_detail_service_1.default])
], SubscriptionCron);
exports.default = SubscriptionCron;
//# sourceMappingURL=SubscriptionCron.js.map