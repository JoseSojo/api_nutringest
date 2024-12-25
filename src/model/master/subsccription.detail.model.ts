import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export default class ConfigSubscriptionHandlerModel {

    constructor (
        private prisma: PrismaService
    ) {}

    public async createInUser ({dateEnd,dateStart,subscription,user}:{subscription:string,user:string,dateStart:{day:number,month:number,year:number},dateEnd:{day:number,month:number,year:number}}) {
        const result = this.prisma.subscriptionInUser.create({
            data: {
                active: true,
                dayEnd: dateEnd.day,
                monthEnd: dateEnd.month,
                yearEnd: dateEnd.year,
                dayStart: dateStart.day,
                monthStart: dateStart.month,
                yearStart: dateStart.year,
                status: `ACTIVE`,
                subscriptionReference: { connect:{ id:subscription } },
                userByReference: { connect:{ id:user } }
            }
        });
        return await result;
    }

    public async findMySubscription ({ user }: {user:string}) {
        const result = this.prisma.subscriptionInUser.findFirst({
            where: {
                AND: [
                    { isDelete:false },
                    { active: true },
                    { userById:user },
                ]
            },
            include: {
                subscriptionReference: true,
                userByReference: true,
            }
        });
        return await result; 
    }
}
