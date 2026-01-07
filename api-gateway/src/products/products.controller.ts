import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(@Inject('PRODUCTS_SERVICE') private productClient: ClientProxy) {}
  @Post()
  create(@Body() data) {
    return this.productClient.send('product-create', data);
  }

  @Get()
  findAll() {
    return this.productClient.send('product-get', {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productClient.send('product-get-one', id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data) {
    return this.productClient.send('product-update', { id, data });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productClient.send('product-delete', id);
  }
}
