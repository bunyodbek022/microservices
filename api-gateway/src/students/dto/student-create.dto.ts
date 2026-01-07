import {
  IsString,
  IsEmail,
  IsInt,
  IsOptional,
  Min,
  Length,
} from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @Length(2, 50)
  firstName: string;

  @IsString()
  @Length(2, 50)
  lastName: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  age?: number;
}
