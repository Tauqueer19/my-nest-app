import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument } from "mongoose";
import { ObjectType, Field, ID } from "@nestjs/graphql";

export type BookDocument = HydratedDocument<Book>;

@Schema()
@ObjectType()
export class Book {
    @Field(()=>ID)
    declare readonly _id:string;

    @Prop({ required:true})
    @Field()
    title!: string;

    @Prop()
    @Field({ nullable:true })
    description?: string

    @Prop({ required:true})
    @Field()
    author!: string
}

export const BookSchema = SchemaFactory.createForClass(Book);