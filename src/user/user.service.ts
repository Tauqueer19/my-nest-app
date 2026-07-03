import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schemas';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(
       @InjectModel(User.name) private readonly userModel: Model<User>,){}

    async createUser(): Promise<User> {
        const user = new this.userModel({
            name: 'Ahmed Ali',
            address: {
                street: '123 Street',
                city: 'Delhi',
            }
        })
        return await user.save();
    }

    async findAll(): Promise<User[]>{
        return this.userModel.find();
    }
}
