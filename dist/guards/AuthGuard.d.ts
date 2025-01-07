import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import UserModel from 'src/model/user.model';
export declare class AuthGuard implements CanActivate {
    private jwtService;
    private user;
    constructor(jwtService: JwtService, user: UserModel);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
