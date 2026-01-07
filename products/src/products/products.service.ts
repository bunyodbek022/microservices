import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './products.schema';
import { UpdateProductDto } from './dto/update-products.dto';
import { CreateProductDto } from './dto/create-products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {}

  create(data: CreateProductDto) {
    return this.productModel.create(data);
  }

  findAll() {
    return this.productModel.find().exec();
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(id: string, data: UpdateProductDto) {
    const product = await this.productModel.findByIdAndUpdate(
      id,
      data,
      { new: true },
    );
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async remove(id: string) {
    const product = await this.productModel.findByIdAndDelete(id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }
}
