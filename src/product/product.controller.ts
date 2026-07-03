import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth/auth.guard';

@ApiTags('Product Section')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // @Get()
  // @ApiOperation({ summary: 'Get all products' })
  // @ApiResponse({ status: 200, description: 'Products fetched successfully' })
  // @UseGuards(AuthGuard)
  // getProducts() {
  //   return this.productService.getALLProducts();
  // }

  // @Get(':id')
  // @ApiOperation({ summary: 'Get product by id' })
  // @ApiParam({ name: 'id', description: 'Product ID', example: 1 })
  // @ApiResponse({ status: 200, description: 'Product fetched successfully' })
  // getProduct(@Param('id') id: string) {
  //   return this.productService.getProductById(Number(id));
  // }
  @Post()
  create(){
    return this.productService.createProduct();
  }
  @Get()
  getAll()
  {
    return this.productService.getAllProducts();
  }
}