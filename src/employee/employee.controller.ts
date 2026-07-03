import { Controller, Get, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { create } from 'domain';

@Controller('employee')
export class EmployeeController {
    // @Get()
    //     getEmployee(){
    //         return 'Employee data fetched successfully!'; 
    //     }
    constructor(private readonly employeeService:EmployeeService){}
    @Post()
            create(){
             return this.employeeService.createEmployee();   
            }
    @Get()
    getAll(){
        return this.employeeService.findAll();
    }        
}
