import { Body, Controller, Param } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-products.dto';
import { UpdateProductDto } from './dto/update-products.dto';

@Controller()
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @MessagePattern('product-create')
  create(@Payload() data: CreateProductDto) {
    return this.productsService.create(data);
  }

  @MessagePattern('product-get')
  findAll() {
    return this.productsService.findAll();
  }

  @MessagePattern('product-get-one')
  findOne(@Payload() id: string) {
    return this.productsService.findOne(id);
  }

  @MessagePattern('product-update')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productsService.update(id, dto);
  }

  @MessagePattern('product-delete')
  remove(@Payload() id: string) {
    return this.productsService.remove(id);
  }
}
