import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './entities/DTOs/create.user.dto';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }
  @Post()
  @UsePipes(ValidationPipe)
  async registration(@Body() createUserDto: CreateUserDto) : Promise<string> {
    return this.authService.registration(createUserDto);
  }
}
