import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
    // private products = [
    //     { id: 1, name: "Mobile", price: 20000},
    //     { id: 2, name: "Tablet", price: 40000},
    //     { id: 3, name: "Laptop", price: 80000},
    // ];
    // getALLProducts(){
    //     return this.products;
    // }
    // getProductById(id:number){
    //     return this.products.find((product) =>
    //          product.id === id);
    // }
    constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>){}
    async  createProduct(): Promise<Product>{
        const product = new  this.productModel({
            title: 'Gaming Laptop',
            tags: [
                {name: 'electronics'},
                {name: 'gaming'},
                {name: 'laptop'},
            ]
        }) 
        return product.save();
    }
    async getAllProducts(): Promise<Product[]>
    {
        return this.productModel.find();
    }
}
