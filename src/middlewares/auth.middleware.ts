import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.get('Authorization');
    const token = authorizationHeader.replace('Bearer ', '');
    const isLegit = verify(token, this.configService.get('SECRET')) as JSON;
    console.log(isLegit);
    if ('id' in isLegit) {
        req.body = { userId: isLegit.id, ...req.body };
        next();
    } else {
      return res.status(401).send('Unauthorized');
    }
  }
}
