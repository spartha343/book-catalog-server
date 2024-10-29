import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IBook } from './book.interface';
import { Book } from './book.model';
import { Review } from '../review/review.model';

const getAllBooks = async (): Promise<IBook[]> => {
  const result = await Book.find({}).sort({ updatedAt: -1 }).lean();
  return result;
};

const getBookById = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById(id).lean();
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book Not Found !');
  }
  return result;
};

const addBook = async (book: IBook): Promise<IBook> => {
  const result = await Book.create(book);
  return result;
};

const updateBook = async (
  id: string,
  book: Partial<IBook>,
  userId: string
): Promise<IBook | null> => {
  const doesExist = await Book.findOne({ _id: id });
  if (!doesExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Book does not exist !');
  }

  if (doesExist.createdBy.toString() !== userId) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You are not authorized to update this book !'
    );
  }

  const result = await Book.findOneAndUpdate({ _id: id }, book, {
    new: true
  }).lean();
  return result;
};

// const deleteBook = async (id: string, userId: string): Promise<IBook | null> => {
//   const doesExist = await Book.findOne({ _id: id });
//   if (!doesExist) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Book does not exist !');
//   }
//   if (doesExist.createdBy.toString() !== userId) {
//     throw new ApiError(
//       httpStatus.FORBIDDEN,
//       'You are not authorized to update this book !'
//     );
//   }

//   let result:IBook|null = null;
//   const session = await mongoose.startSession()

//   try {
//     // Delete all reviews associated with the book
//     await Review.deleteMany({ book: id }).session(session);
//     // Delete the book
//     result = await Book.findOneAndDelete({ _id: id }).session(session).lean();
//     await session.commitTransaction();
//   } catch (error) {
//     await session.abortTransaction();
//     throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'An error occurred while deleting the book and its reviews.');
//   }finally{
//     session.endSession();
//   }
//   return result;
// };

//TODO: uncomment the above code and delete the below code before deploying

const deleteBook = async (
  id: string,
  userId: string
): Promise<IBook | null> => {
  const doesExist = await Book.findOne({ _id: id });
  if (!doesExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Book does not exist!');
  }
  if (doesExist.createdBy.toString() !== userId) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You are not authorized to delete this book!'
    );
  }

  // Delete all reviews associated with the book
  await Review.deleteMany({ book: id });

  // Delete the book
  const result = await Book.findOneAndDelete({ _id: id }).lean();

  return result;
};

export const BookService = {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook
};
