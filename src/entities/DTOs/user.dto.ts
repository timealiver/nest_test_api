import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  readonly email: string;
  
  @IsNotEmpty({ message: "Password shouldn't be empty" })
  @MinLength(8, { message: 'Password must contain at least 8 symbols' })
  @Matches(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/[0-9]/, { message: 'Password must contain at least one number' })
  readonly password: string;
}
export class AuthUserDto {
  @IsEmail()
  readonly email: string;

  @IsNotEmpty({ message: "Password shouldn't be empty" })
  readonly password: string;
}
