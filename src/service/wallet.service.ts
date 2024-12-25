import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import AppActions from "src/AppActions";
import { LanguajeInterface } from "src/languaje/guard/languaje.interface";
import { LanguajeService } from "src/languaje/languaje.service";
import CouponModel from "src/model/coupon.model";
import UserModel from "src/model/user.model";
import { PrismaService } from "src/prisma/prisma.service";
import { ActionsInterface } from "src/validation/types/ActionsInterface";
import { ActionCrudInterface } from "src/validation/types/ActionSlideInterface";
import { FORM } from "src/validation/types/FromInterface";

@Injectable()
export default class WalletService {

    private lang: LanguajeInterface;
    constructor(
        private prisma: PrismaService,
        private userModel: UserModel,

        private permit: AppActions,
        private model: CouponModel,

        private languaje: LanguajeService
    ) {
        this.lang = languaje.GetTranslate();
    }

    public async increment({id,mount}:{id:string,mount:number}) {
        const result = this.prisma.wallet.update({ where:{id}, data:{mount:{increment:mount}} })
        return await result;
    } 
    
    public async decrement({id,mount}:{id:string,mount:number}) {
        const result = this.prisma.wallet.update({ where:{id}, data:{mount:{decrement:mount}} })
        return await result;
    } 

    public async get({id,mount}:{id:string,mount:number}) {
        const result = this.prisma.wallet.findFirst({ where:{id} });
        return await result;
    } 

    public async findUser({id}:{id:string}) {
        const result = this.prisma.wallet.findFirst({ where:{userId:id} });
        return await result;
    } 

    public async create({userId,mount,}:{userId:string,mount:number}) {
        const result = this.prisma.wallet.create({ data:{mount,userReference:{connect:{id:userId}}} });
        return result;
    } 

}
