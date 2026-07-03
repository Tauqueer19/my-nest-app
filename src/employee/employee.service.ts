import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from './schemas/employee.schema';
import { Profile } from './schemas/profile.schema';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectModel(Employee.name) private readonly employeeModel: Model<Employee>,
        @InjectModel(Profile.name) private readonly profileModel: Model<Profile>,

    ) { }
    async createEmployee(): Promise<Employee> {
        const profile = await new this.profileModel({
            age: 20,
            qualification: 'Masters',
        }).save();
        const employee = new this.employeeModel({
            name: 'Demo2rename',
            profile: profile._id
        });

        return employee.save();
    }
    async findAll(): Promise<Employee[]> {
        return this.employeeModel.find().populate
        ('profile').exec();
    }
}
