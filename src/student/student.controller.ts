import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { StudentService } from './student.service';
import { CreateStudentDto, UpdateStudentDto } from './dto/student.dto';
import { Student } from './student.schema';

// Normal
// @ApiTags('student')
// @Controller('student')
// export class StudentController {
//   constructor(private readonly studentService: StudentService) {}

//   @Get()
//   @ApiOperation({ summary: 'Get all students' })
//   @ApiResponse({ status: 200, description: 'Students fetched successfully' })
//   getAll() {
//     return this.studentService.getAllStudents();
//   }

//   @Get(':id')
//   @ApiOperation({ summary: 'Get student by id' })
//   @ApiParam({ name: 'id', description: 'Student ID', example: 1 })
//   @ApiResponse({ status: 200, description: 'Student fetched successfully' })
//   getOne(@Param('id') id: string) {
//     return this.studentService.getStudentById(Number(id));
//   }

//   @Post()
//   @ApiOperation({ summary: 'Create student' })
//   @ApiBody({ type: CreateStudentDto })
//   @ApiResponse({ status: 201, description: 'Student created successfully' })
//   create(@Body() body: CreateStudentDto) {
//     return this.studentService.creatStudent(body);
//   }

//   @Put(':id')
//   @ApiOperation({ summary: 'Update student' })
//   @ApiParam({ name: 'id', description: 'Student ID', example: 1 })
//   @ApiBody({ type: UpdateStudentDto })
//   @ApiResponse({ status: 200, description: 'Student updated successfully' })
//   update(@Param('id') id: string, @Body() body: UpdateStudentDto) {
//     return this.studentService.updateStudent(Number(id), body);
//   }

//   @Patch(':id')
//   @ApiOperation({ summary: 'Patch student' })
//   @ApiParam({ name: 'id', description: 'Student ID', example: 1 })
//   @ApiBody({ type: UpdateStudentDto })
//   @ApiResponse({ status: 200, description: 'Student patched successfully' })
//   patch(@Param('id') id: string, @Body() body: UpdateStudentDto) {
//     return this.studentService.PatchStudent(Number(id), body);
//   }

//   @Delete(':id')
//   @ApiOperation({ summary: 'Delete student' })
//   @ApiParam({ name: 'id', description: 'Student ID', example: 1 })
//   @ApiResponse({ status: 200, description: 'Student deleted successfully' })
//   remove(@Param('id') id: string) {
//     return this.studentService.deleteStudent(Number(id));
//      }

// } 

//Mongodb
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}


  @Post()
async addStudent(@Body() data: Partial<Student>) {
  return this.studentService.createStudent(data);
}

@Get()
async getStudents(){
  return this.studentService.getAllStudents();
}
@Get(':id')
async getStudent(@Param('id') id:string){
  return this.studentService.getAllStudentById(id);
}

@Put(':id')
async updateStudent(
  @Param('id') id:string, 
  @Body() data: Partial<Student>,){
  return this.studentService.updateStudent(id,data);
}

@Patch(':id')
async pathchStudent(
  @Param('id') id:string,
  @Body() data: Partial<Student>,
){
  return this.studentService.patchStudent(id,data);
}

@Delete(':id')
async deleteStudent(
  @Param('id') id: string 
) {
  return this.studentService.deleteStudent(id);
}

}

