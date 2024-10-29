import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';
import { IReview } from '../review/review.interface';

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  description: string;
  createdBy: Types.ObjectId | IUser;
  reviews: Types.ObjectId[] | IReview[];
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IBookMethods {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BookModel extends Model<IBook, {}, IBookMethods> {}
