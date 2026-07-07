import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UserController } from './user/user.controller';
// import { ProductService } from './product/product.service';
// import { ProductController } from './product/product.controller';
import { EmployeeModule } from './employee/employee.module';
import { CategoryModule } from './category/category.module';
import { StudentModule } from './student/student.module';
import { CustomerModule } from './customer/customer.module';
import { MynameController } from './myname/myname.controller';
import { UserRolesController } from './user-roles/user-roles.controller';
import { ExceptionController } from './exception/exception.controller';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { DatabaseController } from './database/database.controller';
import { DatabaseService } from './database/database.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EvService } from './ev/ev.service';
import { EvController } from './ev/ev.controller';
import { MongooseModule } from '@nestjs/mongoose';
// import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { LibraryModule } from './library/library.module';
import { ProjectModule } from './project/project.module';
import { PostgresuserModule } from './postgresuser/postgresuser.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesModule } from './employees/employees.module';
import { SupabaseModule } from './supabase/supabase.module';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import strict from 'assert/strict';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [EmployeeModule, CategoryModule, StudentModule, CustomerModule, ConfigModule.forRoot({
    isGlobal: true,
  }),
GraphQLModule.forRoot<ApolloDriverConfig>({
  driver:ApolloDriver,
  autoSchemaFile: join(process.cwd(),'src/schema.gql'),

  sortSchema: true,
  playground: true,
}),  
MongooseModule.forRoot(process.env.MONGO_URL!),
SupabaseModule,
UserModule,
ProductModule,
LibraryModule,
ProjectModule,
PostgresuserModule,
TypeOrmModule.forRoot({
  type: 'postgres',
  url: process.env.POSTGRES_URL,
  autoLoadEntities: true,
  synchronize:true
}),
EmployeesModule,
AuthModule,
BookModule,
],
  controllers: [AppController, MynameController, UserRolesController, ExceptionController, DatabaseController, EvController],
  providers: [AppService, DatabaseService, EvService, 
    // UserController, ProductService, ProductController, UserService 
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); 
  }
}
