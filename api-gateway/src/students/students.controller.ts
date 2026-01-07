import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
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
}
