import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TeacherController } from "./teachers.controller";

@Module({
    imports: [ClientsModule.register([{
        name: "TEACHER_SERVICE",
        transport: Transport.RMQ,
        options: {
            urls: ['amqp://localhost:5672'],
            queue: "teacher_queue",
            queueOptions: {
                durable: true
            }
            }
    }])],
    controllers: [TeacherController]
})

export class TeacherModule{}