import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ClientProxy, Client, Transport } from '@nestjs/microservices';

@Controller('teachers')
export class TeachersController {
  @Client({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'teacher_queue',
      queueOptions: { durable: true },
    },
  })
  private teacherClient: ClientProxy;

  @Post()
  create(@Body() data) {
    return this.teacherClient.send('teacher-create', data);
  }

  @Get()
  findAll() {
    return this.teacherClient.send('teacher-get', {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teacherClient.send('teacher-get-one', id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data) {
    return this.teacherClient.send('teacher-update', { id, data });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teacherClient.send('teacher-delete', id);
  }
}
