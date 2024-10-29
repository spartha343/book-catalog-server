import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';
import { IBook } from '../book/book.interface';

export type IReview = {
  _id?: Types.ObjectId;
  content: string;
  rating?: string;
  createdBy: Types.ObjectId | IUser;
  book: Types.ObjectId | IBook;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IReviewMethods {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ReviewModel extends Model<IReview, {}, IReviewMethods> {}
