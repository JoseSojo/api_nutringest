import { Injectable } from '@nestjs/common';
import { LanguajeService } from 'src/languaje/languaje.service';
import { LanguajeInterface } from 'src/languaje/guard/languaje.interface';
import { Prisma, User } from '@prisma/client';
import { AuthLogin, AuthRegister } from './guard/auth.guard';
import { JwtService } from '@nestjs/jwt';
import UserService from 'src/service/user.service';
import PermitService from 'src/service/permit.service';
import { FORM } from 'src/validation/types/FromInterface';
import AppActions from 'src/AppActions';
import AppCoupon from 'src/AppCoupon';
import CouponService from 'src/service/coupon.service';
import { PrismaService } from 'src/prisma/prisma.service';
import ConfigSubscriptionHandlerService from 'src/service/master/subsccription.detail.service';


@Injectable()
export default class AuthService {

    private lang: LanguajeInterface

    constructor(
        private userService: UserService,
        private languajeService: LanguajeService,
        private jwt: JwtService,
        private permit: PermitService,
        private appPermit: AppActions,
        private prisma: PrismaService,
        private coupon: AppCoupon,
        private couponService: CouponService,
        private subscripitonDetail: ConfigSubscriptionHandlerService,
    ) {
        this.lang = this.languajeService.GetTranslate();
    }

    /**
     * LOGIN
     * 
     */
    public async login({ data }: { data: AuthLogin }) {
        try {

            const userFoundPromise = await this.userService.find({ filter: { email: data.param } });
            const userFound = userFoundPromise.body.data as User;

            const tokenPromise = this.jwt.signAsync({ id: userFound.id }, { privateKey: `api` });


            if (!userFound) {
                return {
                    message: this.lang.ACTIONS.DANGER.LOGIN,
                    error: true,
                    errorMessage: `email.not.found`,
                    body: []
                }
            }

            const compare = await this.userService.Compare({ password: data.password, dbPassword: userFound.password });
            if (!compare) {
                return {
                    message: this.lang.ACTIONS.DANGER.LOGIN,
                    error: true,
                    errorMessage: `password.not.match`,
                    body: []
                }
            }

            userFound.token = await tokenPromise;

            const entity = {
                user: userFound,
                token: await tokenPromise
            }

            await this.userService.udpate({ id: userFound.id, data: { token: entity.token } })

            // FIN
            return {
                message: this.lang.ACTIONS.SUCCESS.LOGIN,
                error: false,
                body: entity
            };
        } catch (error) {
            // log
            // log error
            return {
                message: this.lang.ACTIONS.DANGER.LOGIN,
                error: true,
                errorMessage: error.message,
                body: {}
            };
        }
    }

    /**
     * REGISTRO
     * 
     */
    public async register({ data }: { data: AuthRegister }) {
        try {
            const dataCreate: Prisma.UserCreateInput = {
                email: data.email,
                password: data.password,
                username: data.email.split(`@`)[0],
                code: data.ref ? data.ref : ``,
                name: data.name,
                lastname: data.lastname,
                rolReference: { connect: { id: this.appPermit.USER_NUTRICIONISTA } },
                propietaryCode: await this.userService.generateCode()
            }

            const user = await this.userService.create({ data: dataCreate });

            if (data.ref) {
                await this.couponService.CreateCoupon({ code: data.ref, description: this.coupon.NUTRICIONIST_CREATE_BY_CODE })
            }

            const dates = this.subscripitonDetail.GetDateFreeTrial();

            const sub = await this.prisma.subscription.findFirst({ where: { name: `STONE` } })
            const dataSubscriptionDetail: Prisma.SubscriptionInUserCreateInput = {
                active: true,
                status: `FREE_TRIAL`,

                subscriptionReference: {
                    connect: { id: sub.id }
                },

                userByReference: {
                    connect: { id: user.body.id }
                },

                dayEnd: dates.end.day,
                monthEnd: dates.end.month,
                yearEnd: dates.end.year,

                dayStart: dates.start.day,
                monthStart: dates.start.month,
                yearStart: dates.start.year,
            }

            await this.subscripitonDetail.CreateSubscription({ data:dataSubscriptionDetail })

            // FIN
            return {
                message: this.lang.ACTIONS.SUCCESS.REGISTER,
                error: false,
            };
        } catch (error) {
            // log
            // log error
            return {
                message: this.lang.ACTIONS.DANGER.REGISTER,
                error: true,
                errorMessage: error.message,
                body: null
            };
        }
    }

    public formLogin(): FORM {
        return {
            method: `POST`,
            name: `Inicio`,
            path: `/user/create`,
            fields: [
                {
                    beforeType: `text`,
                    type: `input`,
                    id: `input.login.email`,
                    label: `Correo Electrónico`,
                    name: `param`,
                    placeholder: `steven@dominio.com`,
                    required: true,
                    ico: `user`
                }
            ]
        }
    }

    public formRegister(): FORM {
        return {
            method: `POST`,
            name: `Registro`,
            path: `/user/create`,
            fields: [
                {
                    beforeType: `text`,
                    type: `input`,
                    id: ``,
                    label: ``,
                    name: ``,
                    placeholder: ``,
                    required: true
                }
            ]
        }
    }
}
