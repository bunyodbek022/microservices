import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TeachersService } from './app.service';

@Controller()
export class TeachersController {
  constructor(private teachersService: TeachersService) {}

  @MessagePattern('teacher-create')
  create(@Payload() data) {
    return this.teachersService.create(data);
  }

  @MessagePattern('teacher-get')
  findAll() {
    return this.teachersService.findAll();
  }

  @MessagePattern('teacher-get-one')
  findOne(@Payload() id: string) {
    return this.teachersService.findOne(id);
  }

  @MessagePattern('teacher-update')
  update(@Payload() payload) {
    return this.teachersService.update(payload.id, payload.data);
  }

  @MessagePattern('teacher-delete')
  remove(@Payload() id: string) {
    return this.teachersService.remove(id);
  }
}
