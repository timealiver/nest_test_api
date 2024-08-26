import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthUserDto, CreateUserDto } from '../entities/DTOs/user.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }
  @Post('/reg')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(ValidationPipe)
  async registration(@Body() createUserDto: CreateUserDto) : Promise<{token: string}> {
    return await this.authService.registration(createUserDto);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  async authorization(@Body() authUserDto: AuthUserDto) : Promise<{token:string}>{
    return await this.authService.authorization(authUserDto);
  }
}
