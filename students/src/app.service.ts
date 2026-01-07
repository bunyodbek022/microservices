import {
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { PrismaService } from './prisma/prisma.service';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    try {
      const users = await this.prisma.student.findMany();
      return {
        success: true,
        data: users,
      };
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException({
        message: 'Studentlarni olishda  xatolik yuz berdi ',
        error,
      });
    }
  }

  async create(data: CreateStudentDto) {
    try {
      const userExists = await this.prisma.student.findUnique({
        where: { email: data.email },
      });
      if (userExists) {
        throw new ConflictException('Bu emaildagi student allaqachon mavjud');
      }

      const newUser = await this.prisma.student.create({ data });

      return {
        success: true,
        data: newUser,
      };
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException({
        message: 'Student create qilishda xatolik yuz berdi ',
        error,
      });
    }
  }

  async findOne(id: string) {
    try {
      const student = await this.prisma.student.findUnique({ where: { id } });
      if (!student) throw new NotFoundException('Student not found');
      return student;
      
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException({
        message: 'Student topishda xatolik yuz berdi ',
        error,
      });
    }
  }

  async update(id: string, data: UpdateStudentDto) {
    try {
      await this.findOne(id);
      return this.prisma.student.update({
        where: { id },
        data,
      });
      
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException({
        message: 'Student update qilishda xatolik yuz berdi ',
        error,
      });
    }
  }

  async remove(id: string) {
    try {
      await this.findOne(id);
      return this.prisma.student.delete({ where: { id } });
      
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException({
        message: 'Student remove qilishda xatolik yuz berdi ',
        error,
      });
    }
  }
}
