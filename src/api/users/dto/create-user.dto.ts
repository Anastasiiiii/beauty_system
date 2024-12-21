import { UserType } from '../schemas/user.schema';

export class CreateUserDto {
  readonly name: string;
  readonly userType: UserType;
  readonly reviews: string[];
}
