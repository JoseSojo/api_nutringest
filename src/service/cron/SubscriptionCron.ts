import { Injectable, Logger } from "@nestjs/common";
import { Cron, Interval, Timeout } from "@nestjs/schedule";
import { PrismaService } from "src/prisma/prisma.service";
import ConfigSubscriptionHandlerService from "../master/subsccription.detail.service";

@Injectable()
export default class SubscriptionCron {

    constructor(
        private prisma: PrismaService,
        private suscriptionUser: ConfigSubscriptionHandlerService
    ) { }

    private readonly logger = new Logger(SubscriptionCron.name);
    private date = new Date();

    @Cron(`0 0 2 * * *`)
    async subscriptionRenove() {
        let skip = 0;
        let take = 100;

        const day = this.date.getDate();
        const month = this.date.getMonth() + 1;
        const year = this.date.getFullYear();

        const count = await this.prisma.subscriptionInUser.count({
            where: {
                AND: [
                    { dayEnd: day },
                    { monthEnd: month },
                    { yearEnd: year },
                ],
            },
        })
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

        await this.prisma.logs.create({
            data: {
                day,
                month,
                year,
                hour: this.date.getHours(),
                minute: this.date.getMinutes(),
                second: this.date.getSeconds(),
                start: true,
                description: {
                    name: `SUBSCRIPTION_RENOVAR`,
                    executeIn: `0 0 2 * * *`,
                    renovar: renovar.length,
                    count: count
                }
            }
        });

        renovar.forEach(async (free) => {
            await this.ActiveSusbcriptionRenovar(free.userById)
        });
    }

    @Cron(`0 0 3 * * *`)
    async subscriptionFreeTrial() {
        let skip = 0;
        let take = 100;

        const day = this.date.getDate();
        const month = this.date.getMonth() + 1;
        const year = this.date.getFullYear();

        const count = await this.prisma.subscriptionInUser.count({
            where: {
                AND: [
                    { dayEnd: day },
                    { monthEnd: month },
                    { yearEnd: year },
                ],
            },
        })
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

        await this.prisma.logs.create({
            data: {
                day,
                month,
                year,
                hour: this.date.getHours(),
                minute: this.date.getMinutes(),
                second: this.date.getSeconds(),
                start: true,
                description: {
                    name: `SUBSCRIPTION_FREE_TRIAL`,
                    executeIn: `0 0 3 * * *`,
                    renovar: declineFreeTrial.length,
                    count: count
                }
            }
        });

        declineFreeTrial.forEach(async (free) => {
            await this.ActiveSusbcriptionFree(free.userById)
        });
    }

    private async ActiveSusbcriptionFree(userId: string) {
        const subscriptionFound = await this.prisma.taskSeondPlanSubscription.findFirst({
            where: {
                AND: [
                    { completed: false },
                    { userId },
                    { isDelete: false },
                ]
            }
        });
        if (!subscriptionFound) return;

        const extra = subscriptionFound.extra as any;

        const walletPromise = this.prisma.wallet.findFirst({ where: { userId } });
        const subsctiptionPromise = this.prisma.subscription.findFirst({ where: { id: extra.to } })
        const subscriptionInUserFound = this.prisma.subscriptionInUser.findFirst({ where: { userById: userId }, include: { subscriptionReference: true } });

        const wallet = await walletPromise;
        const subscription = await subsctiptionPromise;
        const subscriptionInUser = await subscriptionInUserFound;

        // restar a la wallet
        const sumary = subscription.defaultMount * subscription.countMonth;

        // task second programming
        await this.prisma.taskSeondPlanSubscription.update({ data: { completed: true }, where: { id: subscriptionFound.id } });

        let dates = this.suscriptionUser.GetDateSubscription1Month();

        if (subscriptionInUser.subscriptionReference.countMonth === 3) dates = this.suscriptionUser.GetDateSubscription3Month();
        if (subscriptionInUser.subscriptionReference.countMonth === 6) dates = this.suscriptionUser.GetDateSubscription6Month();
        if (subscriptionInUser.subscriptionReference.countMonth === 12) dates = this.suscriptionUser.GetDateSubscriptionYear();

        // change status
        await this.prisma.taskSeondPlanSubscription.update({ data: { completed: true }, where: { id: subscriptionFound.id } });
        // activar subscripción en usuario
        if (subscriptionInUser) {
            const subscriptionToUser = await this.prisma.subscription.findFirst({ where: { id: extra.id } });
            const stone = await this.prisma.subscription.findFirst({ where: { name: `STONE` } });

            const id = subscriptionToUser ? subscriptionToUser.id : stone.id

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

            await this.prisma.logs.create({
                data: {
                    day: this.date.getDate(),
                    month: this.date.getMonth() + 1,
                    year: this.date.getFullYear(),
                    hour: this.date.getHours(),
                    minute: this.date.getMinutes(),
                    second: this.date.getSeconds(),
                    start: true,
                    description: {
                        name: `SUBSCRIPTION_FREE_TRIAL`,
                        usuarioId: userId,
                        subscriptionId: id,
                        dates,

                    }
                }
            });
        } else {
            const subscriptionToUser = await this.prisma.subscription.findFirst({ where: { id: extra.id } });
            const stone = await this.prisma.subscription.findFirst({ where: { name: `STONE` } });

            const id = subscriptionToUser ? subscriptionToUser.id : stone.id

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

            await this.prisma.logs.create({
                data: {
                    day: this.date.getDate(),
                    month: this.date.getMonth() + 1,
                    year: this.date.getFullYear(),
                    hour: this.date.getHours(),
                    minute: this.date.getMinutes(),
                    second: this.date.getSeconds(),
                    start: true,
                    description: {
                        name: `SUBSCRIPTION_FREE_TRIAL`,
                        usuarioId: userId,
                        subscriptionId: id,
                        dates,

                    }
                }
            });
        }
        const customWallet = await this.prisma.wallet.update({ data: { mount: { decrement: sumary } }, where: { id: wallet.id } });

        await this.prisma.logs.create({
            data: {
                day: this.date.getDate(),
                month: this.date.getMonth() + 1,
                year: this.date.getFullYear(),
                hour: this.date.getHours(),
                minute: this.date.getMinutes(),
                second: this.date.getSeconds(),
                start: true,
                description: {
                    name: `SUBSCRIPTION_FREE_TRIAL`,
                    usuarioId: userId,
                    decrementWallet: sumary,
                    wallet: customWallet.mount,
                    oldWallet: Number(customWallet.mount) + sumary
                }
            }
        });
    }

    private async ActiveSusbcriptionRenovar(userId: string) {
        try {
            const subscriptionFound = await this.prisma.taskSeondPlanSubscription.findFirst({
                where: {
                    AND: [
                        { completed: false },
                        { userId },
                        { isDelete: false },
                    ]
                }
            });

            const userSub = await this.prisma.subscriptionInUser.findFirst({ where: { AND: [{ userById: userId }, { isDelete: false }] }, include: { subscriptionReference: true } })
            const extra = subscriptionFound && subscriptionFound.extra ? subscriptionFound.extra : { to: userSub.subscriptionReference.id } as any;
            const walletPromise = this.prisma.wallet.findFirst({ where: { userId } });
            const subsctiptionPromise = this.prisma.subscription.findFirst({ where: { id: extra.to } })
            const subscriptionInUserFound = this.prisma.subscriptionInUser.findFirst({ where: { userById: userId }, include: { subscriptionReference: true } });

            const wallet = await walletPromise;
            const subscription = await subsctiptionPromise;
            const subscriptionInUser = await subscriptionInUserFound;

            // restar a la wallet
            const sumary = subscription.defaultMount * subscription.countMonth;

            let dates = this.suscriptionUser.GetDateSubscription1Month();

            if (subscriptionInUser.subscriptionReference.countMonth === 3) dates = this.suscriptionUser.GetDateSubscription3Month();
            if (subscriptionInUser.subscriptionReference.countMonth === 6) dates = this.suscriptionUser.GetDateSubscription6Month();
            if (subscriptionInUser.subscriptionReference.countMonth === 12) dates = this.suscriptionUser.GetDateSubscriptionYear();

            if (subscriptionFound) {
                // task second programming
                await this.prisma.taskSeondPlanSubscription.update({ data: { completed: true }, where: { id: subscriptionFound.id } });

                // activar subscripción en usuario
                if (subscriptionInUser) {
                    const subscriptionToUser = await this.prisma.subscription.findFirst({ where: { id: subscription.id } });
                    const stone = await this.prisma.subscription.findFirst({ where: { name: `STONE` } });

                    const id = subscriptionToUser ? subscriptionToUser.id : stone.id

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

                    await this.prisma.logs.create({
                        data: {
                            day: this.date.getDate(),
                            month: this.date.getMonth() + 1,
                            year: this.date.getFullYear(),
                            hour: this.date.getHours(),
                            minute: this.date.getMinutes(),
                            second: this.date.getSeconds(),
                            start: false,
                            description: {
                                name: `SUBSCRIPTION_RENOVAR`,
                                usuarioId: userId,
                                subscriptionName: subscriptionInUser.subscriptionReference.name,
                                subscriptionCountMount: subscriptionInUser.subscriptionReference.countMonth,
                            }
                        }
                    });
                } else {
                    const subscriptionToUser = await this.prisma.subscription.findFirst({ where: { id: extra.id } });
                    const stone = await this.prisma.subscription.findFirst({ where: { name: `STONE` } });

                    const id = subscriptionToUser ? subscriptionToUser.id : stone.id

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
                const customWallet = await this.prisma.wallet.update({ data: { mount: { decrement: sumary } }, where: { id: wallet.id } });
            
                await this.prisma.logs.create({
                    data: {
                        day: this.date.getDate(),
                        month: this.date.getMonth() + 1,
                        year: this.date.getFullYear(),
                        hour: this.date.getHours(),
                        minute: this.date.getMinutes(),
                        second: this.date.getSeconds(),
                        start: false,
                        description: {
                            name: `SUBSCRIPTION_RENOVAR`,
                            usuarioId: userId,
                            decremetnWallet: sumary,
                            wallet: customWallet.mount,
                            oldWallet: Number(customWallet.mount) + sumary,
                            subscriptionName: subscriptionInUser.subscriptionReference.name,
                            subscriptionCountMount: subscriptionInUser.subscriptionReference.countMonth,
                        }
                    }
                });
            } else {
                if (subscriptionInUser) {
                    const subscriptionToUser = await this.prisma.subscription.findFirst({ where: { id: extra.id } });
                    const stone = await this.prisma.subscription.findFirst({ where: { name: `STONE` } });

                    const id = subscriptionToUser ? subscriptionToUser.id : stone.id

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
                    await this.prisma.logs.create({
                        data: {
                            day: this.date.getDate(),
                            month: this.date.getMonth() + 1,
                            year: this.date.getFullYear(),
                            hour: this.date.getHours(),
                            minute: this.date.getMinutes(),
                            second: this.date.getSeconds(),
                            start: true,
                            description: {
                                name: `SUBSCRIPTION_RENOVAR`,
                                usuarioId: userId,
                                subscriptionName: subscriptionInUser.subscriptionReference.name,
                                subscriptionCountMount: subscriptionInUser.subscriptionReference.countMonth,
                            }
                        }
                    });
                } else {
                    const subscriptionToUser = await this.prisma.subscription.findFirst({ where: { id: extra.id } });
                    const stone = await this.prisma.subscription.findFirst({ where: { name: `STONE` } });

                    const id = subscriptionToUser ? subscriptionToUser.id : stone.id

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
                    await this.prisma.logs.create({
                        data: {
                            day: this.date.getDate(),
                            month: this.date.getMonth() + 1,
                            year: this.date.getFullYear(),
                            hour: this.date.getHours(),
                            minute: this.date.getMinutes(),
                            second: this.date.getSeconds(),
                            start: false,
                            description: {
                                name: `SUBSCRIPTION_RENOVAR`,
                                usuarioId: userId,
                                subscriptionName: subscriptionInUser.subscriptionReference.name,
                                subscriptionCountMount: subscriptionInUser.subscriptionReference.countMonth,
                            }
                        }
                    });
                }
                await this.prisma.wallet.update({ data: { mount: { decrement: sumary } }, where: { id: wallet.id } });
            }
        } catch (error) {
            await this.prisma.logs.create({
                data: {
                    day: this.date.getDate(),
                    month: this.date.getMonth() + 1,
                    year: this.date.getFullYear(),
                    hour: this.date.getHours(),
                    minute: this.date.getMinutes(),
                    second: this.date.getSeconds(),
                    start: false,
                    description: {
                        error: true,
                        errorMessage: error.message,
                        name: `SUBSCRIPTION_RENOVAR`,
                        usuarioId: userId,
                    }
                }
            });
        }


    }
}
