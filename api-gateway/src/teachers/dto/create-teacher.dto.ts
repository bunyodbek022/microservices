import { IsString, IsEmail, Length } from 'class-validator';

export class CreateTeacherDto {
  @IsString()
  @Length(2, 50)
  firstName: string;

  @IsString()
  @Length(2, 50)
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  subject: string;
}
