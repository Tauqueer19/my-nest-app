import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryServices: CategoryService){}
    @Get()
    getAllCategories(){
        return this.categoryServices.getCategories();
    }
}
