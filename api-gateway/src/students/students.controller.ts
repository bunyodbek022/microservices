import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateStudentDto } from './dto/student-create.dto';

@Controller()
export class StudentsController {
  constructor(@Inject('STUDENT_SERVICE') private studentClient: ClientProxy) {}

  @Get('students')
  getStudents() {
    return this.studentClient.send('student.get', { source: 'api-gateway' });
  }

  @Post('students')
  createStudent(@Body() payload: CreateStudentDto) {
    return this.studentClient.send('student.create', payload);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentClient.send('student.getOne', id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data) {
    return this.studentClient.send('student.update', { id, data });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentClient.send('student.delete', id);
  }
}
