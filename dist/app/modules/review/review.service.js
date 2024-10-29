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
exports.ReviewService = void 0;
const http_status_1 = __importDefault(require('http-status'));
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const review_model_1 = require('./review.model');
const book_model_1 = require('../book/book.model');
const getReviewsByBookId = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.find({ book: id })
      .sort({ createdAt: 1 })
      .lean();
    return result;
  });
// const getBookById = async (id: string): Promise<IBook | null> => {
//   const result = await Book.findById(id).lean();
//   if (!result) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Book Not Found !');
//   }
//   return result;
// };
// const addReview = async (data: IReview): Promise<IReview | null> => {
//   const session = await mongoose.startSession();
//   let result: IReview | null = null;
//   try {
//     session.startTransaction();
//     const createdReview = await Review.create([data], { session });
//     result = createdReview[0];
//     if (!result) {
//       throw new ApiError(
//         httpStatus.INTERNAL_SERVER_ERROR,
//         'Failed to create review!'
//       );
//     }
//     await Book.findByIdAndUpdate(
//       data.book, // Ensure data.book is a valid ObjectId
//       {
//         $push: { reviews: result._id }
//       },
//       { session }
//     );
//     await session.commitTransaction();
//     return result;
//   } catch (error) {
//     console.error('Error in addReview:', error);
//     await session.abortTransaction();
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create review !');
//   } finally {
//     session.endSession();
//   }
// };
//todo: delete the code below and uncomment the code above
const addReview = data =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const result = yield review_model_1.Review.create(data);
      if (!result) {
        throw new ApiError_1.default(
          http_status_1.default.INTERNAL_SERVER_ERROR,
          'Failed to create review!'
        );
      }
      yield book_model_1.Book.findByIdAndUpdate(
        data.book, // Ensure data.book is a valid ObjectId
        {
          $push: { reviews: result._id }
        }
      );
      return result;
    } catch (error) {
      console.error('Error in addReview:', error);
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Failed to create review !'
      );
    }
  });
const updateReview = (id, data, userId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const review = yield review_model_1.Review.findOne({ _id: id });
    if (!review) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Review does not exist !'
      );
    }
    if (review.createdBy.toString() !== userId) {
      throw new ApiError_1.default(
        http_status_1.default.FORBIDDEN,
        'You do not have permission to update this review !'
      );
    }
    const result = yield review_model_1.Review.findOneAndUpdate(
      { _id: id },
      data,
      {
        new: true
      }
    ).lean();
    return result;
  });
// const deleteReview = async (
//   id: string,
//   userId: string
// ): Promise<IReview | null> => {
//   const session = await mongoose.startSession();
//   let result: IReview | null = null;
//   const review = await Review.findOne({ _id: id });
//   if (!review) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Review does not exist !');
//   }
//   if (review.createdBy.toString() !== userId) {
//     throw new ApiError(
//       httpStatus.FORBIDDEN,
//       'You do not have permission to delete this review !'
//     );
//   }
//   try {
//     // Remove the review reference from the corresponding book document
//     await Book.findByIdAndUpdate(
//       review.book,
//       {
//         $pull: { reviews: review._id } // Use $pull to remove the review ID from the array
//       },
//       { session }
//     );
//     // Delete the review
//     result = await Review.findOneAndDelete({ _id: id }).session(session).lean();
//     // Commit the transaction
//     await session.commitTransaction();
//     return result;
//   } catch (error) {
//     console.error('Error in deleteReview:', error);
//     await session.abortTransaction();
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to delete review!');
//   } finally {
//     session.endSession();
//   }
// };
//TODO: uncomment the above function and comment out the below function
const deleteReview = (id, userId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // Find the review first
    const review = yield review_model_1.Review.findOne({ _id: id });
    if (!review) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Review does not exist!'
      );
    }
    // Check if the user is authorized to delete the review
    if (review.createdBy.toString() !== userId) {
      throw new ApiError_1.default(
        http_status_1.default.FORBIDDEN,
        'You do not have permission to delete this review.'
      );
    }
    // Remove the review reference from the corresponding book document
    yield book_model_1.Book.findByIdAndUpdate(review.book, {
      $pull: { reviews: review._id } // Use $pull to remove the review ID from the array
    });
    // Delete the review
    const result = yield review_model_1.Review.findOneAndDelete({
      _id: id
    }).lean();
    return result;
  });
exports.ReviewService = {
  getReviewsByBookId,
  //   getBookById,
  addReview,
  updateReview,
  deleteReview
};
