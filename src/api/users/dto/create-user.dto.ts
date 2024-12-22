import { IsEmail, IsStrongPassword } from 'class-validator';
import { UserType } from '../schemas/user.schema';

export class CreateUserDto {
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsStrongPassword()
  password: string;

  readonly userType: UserType;
  readonly reviews: string[];
}
