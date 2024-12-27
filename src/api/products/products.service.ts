import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<Product>,
  ) { }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      console.log('DTO перед створенням продукту:', createProductDto); // Логування перед збереженням
      const product = await this.productModel.create(createProductDto);
      console.log('Створений продукт:', product); // Логування після збереження
      return product;
    } catch (error) {
      console.error('Помилка при створенні продукту:', error);
      throw new Error(`Failed to create product: ${error.message}`);
    }
  }



  async findAll(): Promise<Product[]> {
    try {
      return this.productModel.find().exec();
    } catch (error) {
      throw new Error(`Failed to retrieve products: ${error.message}`);
    }
  }

  async remove(id: string): Promise<Product> {
    try {
      return this.productModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new Error(`Failed to delete product: ${error.message}`);
    }
  }
}
