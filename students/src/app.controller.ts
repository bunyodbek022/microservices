import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateStudentDto } from './dto/create-student.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('student.get')
  getStudents(@Payload() data: any) {
    console.log('INCOMING DATA:', data);

    return this.appService.findAll()
  }

  @MessagePattern('student.create')
  createStudent(@Payload() data: CreateStudentDto) {
    return this.appService.create(data);
  }

  @MessagePattern('student.getOne')
  findOne(@Payload() id: string) {
    return this.appService.findOne(id);
  }

  @MessagePattern('student.update')
  update(@Payload() payload) {
    return this.appService.update(payload.id, payload.data);
  }

  @MessagePattern('student.delete')
  remove(@Payload() id: string) {
    return this.appService.remove(id);
  }
}
