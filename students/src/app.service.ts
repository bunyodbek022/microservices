import { ConflictException, HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService){}
  async findAll() {
    try {
      const users = await this.prisma.student.findMany();
      return {
        success: true,
        data: users
      }
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException({
        message: 'Student create qilishda xatolik yuz berdi ',
        error,
      });
    }
  }

  async create(data: CreateStudentDto) {
    try {
      const userExists = await this.prisma.student.findUnique({ where: { email: data.email } });
      if (userExists) {
        throw new ConflictException("Bu emaildagi student allaqachon mavjud");
      }

      const newUser = await this.prisma.student.create({ data });

      return {
        success: true,
        data: newUser
      } 
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException({
        message: 'Student create qilishda xatolik yuz berdi ',
        error,
      });
    }
  }
}
