import { Controller, Get, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Controller()
export class ProductsController {
    constructor(@Inject('PRODUCTS_SERVICE') private productClient: ClientProxy) { }
    
    @Get("students")
        getStudents() {
            return this.productClient.send('product-get', 'salom-products');
        }
}