import { LanguajeService } from 'src/languaje/languaje.service';
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
export default class AuthService {
    private userService;
    private languajeService;
    private jwt;
    private permit;
    private appPermit;
    private prisma;
    private coupon;
    private couponService;
    private subscripitonDetail;
    private lang;
    constructor(userService: UserService, languajeService: LanguajeService, jwt: JwtService, permit: PermitService, appPermit: AppActions, prisma: PrismaService, coupon: AppCoupon, couponService: CouponService, subscripitonDetail: ConfigSubscriptionHandlerService);
    login({ data }: {
        data: AuthLogin;
    }): Promise<{
        message: string;
        error: boolean;
        errorMessage: string;
        body: any[];
    } | {
        message: string;
        error: boolean;
        body: {
            user: {
                id: string;
                name: string | null;
                isDelete: boolean;
                createAt: Date;
                updateAt: Date | null;
                email: string;
                username: string;
                password: string;
                ci: string | null;
                name2: string | null;
                lastname2: string | null;
                nacionality: string | null;
                email2: string | null;
                phone: string | null;
                phone2: string | null;
                propietaryCode: string;
                code: string | null;
                age: number | null;
                genero: string | null;
                lastname: string | null;
                passwordRequetsAt: Date | null;
                passwordRequetsToken: string | null;
                token: string | null;
                parentId: string | null;
                rolId: string | null;
                languajeId: string | null;
                cityId: string | null;
            };
            token: string;
        };
        errorMessage?: undefined;
    } | {
        message: string;
        error: boolean;
        errorMessage: any;
        body: {};
    }>;
    register({ data }: {
        data: AuthRegister;
    }): Promise<{
        message: string;
        error: boolean;
        errorMessage?: undefined;
        body?: undefined;
    } | {
        message: string;
        error: boolean;
        errorMessage: any;
        body: any;
    }>;
    formLogin(): FORM;
    formRegister(): FORM;
}
