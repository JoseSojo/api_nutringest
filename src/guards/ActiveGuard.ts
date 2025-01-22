import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
import UserModel from 'src/model/user.model';
import { PrismaService } from 'src/prisma/prisma.service';
  
  @Injectable()
  export class ActiveGuard implements CanActivate {
    constructor(
      private jwtService: JwtService, 
      private user: UserModel,
      private prisma: PrismaService,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const reponse = context.switchToHttp().getResponse();
      const token = request.headers.token;// this.extractTokenFromHeader(request);
      
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        const user = await this.user.find({ filter:{token:token} });

        const subscription = await this.prisma.subscriptionInUser.findFirst({ where:{ userById:user.id } });
        console.log(subscription.active)
        if(subscription && subscription.active === false) {
          reponse.status(403).json({error:true,message:`Tu cuenta está deshabilitada.`});
          return false;
        }

      } catch {
        reponse.status(403).json({error:true,message:`Tu cuenta está deshabilitada.`});
        return false;
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }