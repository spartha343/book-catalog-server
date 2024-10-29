import { model, Schema } from 'mongoose';
import { BookModel, IBook, IBookMethods } from './book.interface';

const BookSchema = new Schema<IBook, BookModel, IBookMethods>(
  {
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    genre: {
      type: String,
      required: true
    },
    publicationDate: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
        default: []
      }
    ]
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    }
  }
);

export const Book = model<IBook, BookModel>('Book', BookSchema);
