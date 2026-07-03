import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employees } from './employees.entity';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [TypeOrmModule.forFeature([Employees]),
  SupabaseModule,],
  providers: [EmployeesService],
  controllers: [EmployeesController]
})
export class EmployeesModule {}
