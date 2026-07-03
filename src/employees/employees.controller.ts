import { Body, Controller, Delete, Get, Param, Post, Put, Query, Search, UseGuards } from '@nestjs/common';
import { Employees } from './employees.entity';
import { EmployeesService } from './employees.service';
import { SupabaseAuthGuard } from 'src/auth/supabase-auth/supabase-auth.guard';

@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeeService: EmployeesService){}
    @Post()
    async createEmployee(@Body() body: Partial<Employees>): 
    Promise<Employees>{
        return this.employeeService.create(body);

    }

    @UseGuards(SupabaseAuthGuard)
    @Get()
    async findAll(): Promise<Employees[]> {
        return this.employeeService.findAll();
    }

    @Get('search')
    async searchEmployees(@Query('name') name?:string,
        @Query('department') department?:string,
        @Query('position') position?:string,):Promise<Employees[]>{
            return this.employeeService.search({name, department, position})

    }

    @Get(':id')
    async findOne(@Param('id') id: number ): Promise<Employees> {
        return this.employeeService.findOne(id);
    }

    @Put(':id')
    async updateEmployee(
        @Param('id') id: number,
        @Body() body: Partial<Employees>,
    ): Promise<Employees>{
        return this.employeeService.update(id, body);
    }

    @Delete(':id')
    async deleteEmployee(@Param('id') id:number ): Promise<{
        message: string}> {
            return this.employeeService.delete(id);
        }
}
