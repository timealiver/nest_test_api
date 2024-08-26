import { Injectable } from '@nestjs/common';
import { User} from '../entities/user.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import {compareSync, hashSync} from 'bcryptjs';
import {sign} from 'jsonwebtoken'
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {}
  getHello(): string {
    return 'Hello World!';
  }
  async registration(createUserDto): Promise<{token: string}> {
    try {
    const {email,password} = createUserDto;
    const candidate = await User.findOne({where: {email}})
    console.log("1");
    if (candidate){
      throw new HttpException("Пользователь с таким email уже существует",HttpStatus.BAD_REQUEST);
    }
    const hashPassword =hashSync(password, 10);
    console.log("2");
    const user = new User();
    user.email = email;
    user.password = hashPassword;
    user.confirmed = true; // Не особо нужное поле, планировал сделать валидацию пользователя через сообщение, вскоре понял что этого не требуется в ТЗ
    await user.save();
    console.log("3");
    const token = sign({id: user.id}, this.configService.get('SECRET'), {expiresIn: '48h'});
    console.log(token);
    return {token: token};
          
  } catch (error) {
    if (!(error instanceof HttpException)){
      throw new HttpException(error,HttpStatus.BAD_REQUEST)
    }
    throw error;
  }
  }
  async authorization(authUserDto): Promise<{token:string}>{
    try{
    const {email, password} = authUserDto;
      const user = await User.findOne({where: {email}});
      if (!user){
        throw new HttpException("Email not found", HttpStatus.BAD_REQUEST);
      }
      const validPassword = compareSync(password, user.password);
        if (!validPassword) {
          throw new HttpException("Wrong password", HttpStatus.BAD_REQUEST);
        }
      const token = sign({id: user.id}, this.configService.get('SECRET'), {expiresIn: '48h'});
      return {token: token};
    } catch (error) {
      if (!(error instanceof HttpException)){
        throw new HttpException(error,HttpStatus.BAD_REQUEST)
      }
      throw error;
    }

  }
}
