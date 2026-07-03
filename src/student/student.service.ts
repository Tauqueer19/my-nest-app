import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto, UpdateStudentDto } from './dto/student.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Student, StudentDocument } from './student.schema';
import { Model } from 'mongoose';

// export class StudentService {
//   private students = [
//     { id: 1, name: 'Demo1', age: 25 },
//     { id: 2, name: 'Demo2', age: 28 },
//   ];

//   getAllStudents() {
//     return this.students;
//   }

//   getStudentById(id: number) {
//     const student = this.students.find((s) => s.id === id);
//     if (!student) throw new NotFoundException('Student Not Found!');
//     return student;
//   }

//   creatStudent(data: CreateStudentDto) {
//     const newStudent = {
//       id: Date.now(),
//       ...data,
//     };
//     this.students.push(newStudent);
//     return newStudent;
//   }

//   updateStudent(id: number, data: Partial<CreateStudentDto>) {
//     const index = this.students.findIndex((s) => s.id === id);
//     if (index === -1) throw new NotFoundException('Student Not Found!');
//     this.students[index] = { ...this.students[index], ...data };
//     return this.students[index];
//   }

//   PatchStudent(id: number, data: Partial<CreateStudentDto>) {
//     const student = this.getStudentById(id);
//     Object.assign(student, data);
//     return student;
//   }

//   deleteStudent(id: number) {
//     const index = this.students.findIndex((s) => s.id === id);
//     if (index === -1) throw new NotFoundException('Student Not Found!');
//     const deleted = this.students.splice(index, 1);
//     return { message: 'Student Deleted', student: deleted[0] };
//   }

// constructor(
//   @InjectModel(Student.name) private studentModel: Model<StudentDocument>
// ){}
//   async createStudent(data: Partial<Student>): Promise<Student>{
//       const  newStudent = new this.studentModel(data);
//       return newStudent.save();
//   } 


// }

//Mongodb
@Injectable()
export class StudentService {
constructor(
  @InjectModel(Student.name) private studentModel: Model<StudentDocument>
){}
  async createStudent(data: Partial<Student>): Promise<Student>{
      const  newStudent = new this.studentModel(data);
      return newStudent.save();
  } 


  async getAllStudents(): Promise<Student[]> {
    return this.studentModel.find().exec();
  }

  async getAllStudentById(id:string): Promise<Student | null> {
    return this.studentModel.findById(id).exec();
  }

  async updateStudent(id: string, data: Partial<Student>):
Promise<Student | null> {
  // return this.studentModel.findByIdAndUpdate(id, data, {new: true}).exec();
  const updated = await this.studentModel.findByIdAndUpdate(id,{
    name: data.name ?? null,
    age: data.age ?? null,
    email: data.email ?? null,
  },{ overwrite: true, new: true });
  return updated;
}

async patchStudent(id: string,data:Partial<Student>):
Promise<Student | null> {
  return this.studentModel.findByIdAndUpdate(id, data, {new: true}).exec();
}

async deleteStudent(id: string): Promise<Student | null> {
  return this.studentModel.findByIdAndDelete(id).exec();
}

}