import { PrismaService } from "src/prisma/prisma.service";
import ConfigSubscriptionHandlerService from "../master/subsccription.detail.service";
export default class SubscriptionCron {
    private prisma;
    private suscriptionUser;
    constructor(prisma: PrismaService, suscriptionUser: ConfigSubscriptionHandlerService);
    private readonly logger;
    private date;
    subscriptionRenove(): Promise<void>;
    subscriptionFreeTrial(): Promise<void>;
    private ActiveSusbcriptionFree;
    private ActiveSusbcriptionRenovar;
}
