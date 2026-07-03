import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthUser, AuthUserDocument, } from './auth-user.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(AuthUser.name)
        private authUserModel: Model<AuthUserDocument>,
        private readonly jwtService: JwtService,
    ){}
    async singup(email: string, password: string) {
        const hash = await bcrypt.hash(password, 10);
        const user = new this.authUserModel({
            email,
            password: hash,
        });

        return user.save();
        }
    async login(email:string, password:string){
        const user= await this.authUserModel.findOne({email})
        if(!user) return null;
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return null;
        const payload = {email: user.email, sub: user._id};
        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}
