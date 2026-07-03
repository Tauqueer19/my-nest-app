import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './schemas/book.schema';
import { Library } from './schemas/library.schema';

@Injectable()
export class LibraryService {
    constructor(
        @InjectModel(Book.name) private bookModel: Model<Book>,
        @InjectModel(Library.name) private libraryModel: Model<Library>,
    ){}

    async createLibrary(): Promise<Library>{
        const book1 = await this.bookModel.create({
            title: 'Harry Potter', author: 'j k rowling'
        })
        const book2 = await this.bookModel.create({
            title: 'Game Of Thrones', author: 'George R. R. Martin'
        })
        const book3 = await this.bookModel.create({
            title: 'Godaan ', author: 'Premchand'
        })

        const library = new this.libraryModel({
            name: 'Central Library',
            books: [book1._id, book2._id,book3._id]
        })
        return library.save();
    }
    async getLibraries(): Promise<Library[]>{
        return this.libraryModel.find().populate('books');
    } 

}
