import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getHello(): string {
    return 'Hello World!';
  }
  registration(req,res): string {
    // const errors = validationResult(req); //здесь должна быть валидация полей
    return "";
  }
}
