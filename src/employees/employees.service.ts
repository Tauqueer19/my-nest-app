import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employees } from './employees.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
    constructor(
        @InjectRepository(Employees)
        private employeesReprsitory: Repository<Employees>
    ) {}

    async create(employeeData: Partial<Employees>): Promise<Employees> {
        const employee = this.employeesReprsitory.create(employeeData);
        return this.employeesReprsitory.save(employee);
    }

    async findAll(): Promise<Employees[]> {
        return this.employeesReprsitory.find();
    }

    async findOne(id:number): Promise<Employees> {
        const employee = await this.employeesReprsitory.findOneBy({ id });
        if(!employee) {
            throw new NotFoundException(`Employee with ID ${id} not found`);
        }
        return employee;
    }

    async update(id: number, updatedData: Partial<Employees>): Promise<Employees> {
        const employee = await this.employeesReprsitory.findOneBy({id});
        if(!employee) {
            throw new NotFoundException(`Employee with ID ${id} not found`);
        }
        const updated = Object.assign(employee, updatedData);
        return this.employeesReprsitory.save(updated);
    }

    async delete(id:number): Promise<{ message: string }> {
        const result = await this.employeesReprsitory.delete(id); 
        if(result.affected===0){
            throw new NotFoundException(`Employee with ID ${id} not found.`);
        }
        return { message: `Employeee With ID ${id} has been deleted.` }
    }

    async search(filters: {name?: string; department?:string; position?:string; }): Promise<Employees[]>{
        const query =this.employeesReprsitory.createQueryBuilder('employees');
        if(filters.name){
            query.andWhere('Employees.name ILIKE :name',{name: `%${filters.name}%`})
        }
        if(filters.department){
            query.andWhere('Employees.department = :dept',{dept: filters.department})
        }
        if(filters.position){
            query.andWhere('Employees.position ILIKE :position',{position: `%${filters.position}%`})
        }
            return query.getMany();
    }

}
