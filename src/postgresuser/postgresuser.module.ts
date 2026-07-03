import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postgresuser } from './postgresuser.entity';

@Module({
    imports: [ TypeOrmModule.forFeature([Postgresuser])],
})
export class PostgresuserModule {}
