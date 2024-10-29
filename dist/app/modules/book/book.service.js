'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.BookService = void 0;
const http_status_1 = __importDefault(require('http-status'));
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const book_model_1 = require('./book.model');
const review_model_1 = require('../review/review.model');
const getAllBooks = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.find({})
      .sort({ updatedAt: -1 })
      .lean();
    return result;
  });
const getBookById = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findById(id).lean();
    if (!result) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'Book Not Found !'
      );
    }
    return result;
  });
const addBook = book =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.create(book);
    return result;
  });
const updateBook = (id, book, userId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const doesExist = yield book_model_1.Book.findOne({ _id: id });
    if (!doesExist) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Book does not exist !'
      );
    }
    if (doesExist.createdBy.toString() !== userId) {
      throw new ApiError_1.default(
        http_status_1.default.FORBIDDEN,
        'You are not authorized to update this book !'
      );
    }
    const result = yield book_model_1.Book.findOneAndUpdate({ _id: id }, book, {
      new: true
    }).lean();
    return result;
  });
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
const deleteBook = (id, userId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const doesExist = yield book_model_1.Book.findOne({ _id: id });
    if (!doesExist) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Book does not exist!'
      );
    }
    if (doesExist.createdBy.toString() !== userId) {
      throw new ApiError_1.default(
        http_status_1.default.FORBIDDEN,
        'You are not authorized to delete this book!'
      );
    }
    // Delete all reviews associated with the book
    yield review_model_1.Review.deleteMany({ book: id });
    // Delete the book
    const result = yield book_model_1.Book.findOneAndDelete({ _id: id }).lean();
    return result;
  });
exports.BookService = {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook
};
