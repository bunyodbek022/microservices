import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Injectable()
export class TeachersService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateTeacherDto) {
    try {
      return this.prisma.teacher.create({ data });
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException({
        message: 'Teacher create qilishda xatolik yuz berdi ',
        error,
      });
    }
  }

  findAll() {
    try {
      return this.prisma.teacher.findMany();
      
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException({
        message: 'Teachers topishda xatolik yuz berdi ',
        error,
      });
    }
  }

  async findOne(id: string) {
    try {
      const teacher = await this.prisma.teacher.findUnique({ where: { id } });
      if (!teacher) throw new NotFoundException('Teacher not found');
      return teacher;
      
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException({
        message: 'Teacher topishda xatolik yuz berdi ',
        error,
      });
    }
  }

  async update(id: string, data: UpdateTeacherDto) {
    try {
      await this.findOne(id);
      return this.prisma.teacher.update({ where: { id }, data });
      
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException({
        message: 'Teacher update qilishda xatolik yuz berdi ',
        error,
      });
    }
  }

  async remove(id: string) {
    try {
      await this.findOne(id);
      return this.prisma.teacher.delete({ where: { id } });
      
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException({
        message: 'Teacher remove qilishda xatolik yuz berdi ',
        error,
      });
    }
  }
}
