import { Contains, IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  readonly email: string;

  @IsNotEmpty({message: 'Password shouldn\'t be empty'})
  @MinLength(8,{message:'Password must contain at least 8 symbols'})
  @Matches(/[A-Z]/,{ message: 'Password must contain at least one uppercase letter' })
  @Contains('0123456789', { message: 'Password must contain at least one number' })
  readonly password: string;
}
