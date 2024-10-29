import { Model, Types } from 'mongoose';
import { IBook } from '../book/book.interface';
import { IReview } from '../review/review.interface';

interface IReadingListItem {
  book: Types.ObjectId | IBook;
  status: 'to-read' | 'reading' | 'finished';
}

export type IUser = {
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  email: string;
  password: string;
  role: string;
  wishlist?: Types.ObjectId[] | IBook[];
  readingList?: IReadingListItem[];
  reviews?: Types.ObjectId[] | IReview[];
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IUserMethods {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UserModel extends Model<IUser, {}, IUserMethods> {
  isUserExist(
    email: string
  ): Promise<Pick<IUser, 'password' | 'role' | 'email'>>;

  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
}
