import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
    imports: [ClientsModule.register([{
        name: "PRODUCTS_SERVICE", 
        transport: Transport.RMQ,
        options: {
            urls: ['amqp://localhost:5672'],
            queue: 'products_queue',
            queueOptions: {
                durable: true
            }
        }
    }])],
    controllers: [ProductsController]
})

export class ProductsModule{}