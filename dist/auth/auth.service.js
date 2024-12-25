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
const languaje_service_1 = require("../languaje/languaje.service");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../service/user.service");
const permit_service_1 = require("../service/permit.service");
const AppActions_1 = require("../AppActions");
const AppCoupon_1 = require("../AppCoupon");
const coupon_service_1 = require("../service/coupon.service");
const prisma_service_1 = require("../prisma/prisma.service");
const subsccription_detail_service_1 = require("../service/master/subsccription.detail.service");
let AuthService = class AuthService {
    constructor(userService, languajeService, jwt, permit, appPermit, prisma, coupon, couponService, subscripitonDetail) {
        this.userService = userService;
        this.languajeService = languajeService;
        this.jwt = jwt;
        this.permit = permit;
        this.appPermit = appPermit;
        this.prisma = prisma;
        this.coupon = coupon;
        this.couponService = couponService;
        this.subscripitonDetail = subscripitonDetail;
        this.lang = this.languajeService.GetTranslate();
    }
    async login({ data }) {
        try {
            const userFoundPromise = await this.userService.find({ filter: { email: data.param } });
            const userFound = userFoundPromise.body.data;
            const tokenPromise = this.jwt.signAsync({ id: userFound.id }, { privateKey: `api` });
            if (!userFound) {
                return {
                    message: this.lang.ACTIONS.DANGER.LOGIN,
                    error: true,
                    errorMessage: `email.not.found`,
                    body: []
                };
            }
            const compare = await this.userService.Compare({ password: data.password, dbPassword: userFound.password });
            if (!compare) {
                return {
                    message: this.lang.ACTIONS.DANGER.LOGIN,
                    error: true,
                    errorMessage: `password.not.match`,
                    body: []
                };
            }
            userFound.token = await tokenPromise;
            const entity = {
                user: userFound,
                token: await tokenPromise
            };
            await this.userService.udpate({ id: userFound.id, data: { token: entity.token } });
            return {
                message: this.lang.ACTIONS.SUCCESS.LOGIN,
                error: false,
                body: entity
            };
        }
        catch (error) {
            return {
                message: this.lang.ACTIONS.DANGER.LOGIN,
                error: true,
                errorMessage: error.message,
                body: {}
            };
        }
    }
    async register({ data }) {
        try {
            const dataCreate = {
                email: data.email,
                password: data.password,
                username: data.email.split(`@`)[0],
                code: data.ref ? data.ref : ``,
                name: data.name,
                lastname: data.lastname,
                rolReference: { connect: { id: this.appPermit.USER_NUTRICIONISTA } },
                propietaryCode: await this.userService.generateCode()
            };
            const user = await this.userService.create({ data: dataCreate });
            if (data.ref) {
                await this.couponService.CreateCoupon({ code: data.ref, description: this.coupon.NUTRICIONIST_CREATE_BY_CODE });
            }
            const dates = this.subscripitonDetail.GetDateFreeTrial();
            const sub = await this.prisma.subscription.findFirst({ where: { name: `STONE` } });
            const dataSubscriptionDetail = {
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
            };
            await this.subscripitonDetail.CreateSubscription({ data: dataSubscriptionDetail });
            return {
                message: this.lang.ACTIONS.SUCCESS.REGISTER,
                error: false,
            };
        }
        catch (error) {
            return {
                message: this.lang.ACTIONS.DANGER.REGISTER,
                error: true,
                errorMessage: error.message,
                body: null
            };
        }
    }
    formLogin() {
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
        };
    }
    formRegister() {
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
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.default,
        languaje_service_1.LanguajeService,
        jwt_1.JwtService,
        permit_service_1.default,
        AppActions_1.default,
        prisma_service_1.PrismaService,
        AppCoupon_1.default,
        coupon_service_1.default,
        subsccription_detail_service_1.default])
], AuthService);
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map