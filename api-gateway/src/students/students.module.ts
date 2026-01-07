import { Module } from "@nestjs/common";
import { ClientsModule, Transport,  } from "@nestjs/microservices";
import { StudentsController } from "./students.controller";

@Module({
    imports: [
        ClientsModule.register([{
            name: "STUDENT_SERVICE",
            transport: Transport.RMQ,
            options: {
                urls: ['amqp://localhost:5672'],
                queue: 'student_queue',
                queueOptions: {
                    durable: true
                }
            }
        }])
    ],
    controllers : [StudentsController]
})

export class StudentsModule{}