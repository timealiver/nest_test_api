import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { verify } from 'jsonwebtoken';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private configService: ConfigService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.get('Authorization'); 
    const token = authorizationHeader.replace("Bearer ", "");
    const isLegit = verify(token,this.configService.get('SECRET'));
    if (isLegit){
        return true;
    }
    return false;
  }
}