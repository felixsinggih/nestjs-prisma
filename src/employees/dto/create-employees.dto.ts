import { IsString, IsEmail, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['INTERN', 'ENGINEER', 'ADMIN'], { message: 'Valid role required' })
  role: 'INTERN' | 'ENGINEER' | 'ADMIN';

  @IsNotEmpty()
  password: string
}
