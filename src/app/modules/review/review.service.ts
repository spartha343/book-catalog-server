import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IReview } from './review.interface';
import { Review } from './review.model';
import { Book } from '../book/book.model';

const getReviewsByBookId = async (id: string): Promise<IReview[]> => {
  const result = await Review.find({ book: id }).sort({ createdAt: 1 }).lean();
  return result;
};

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
const addReview = async (data: IReview): Promise<IReview | null> => {
  try {
    const result = await Review.create(data);
    if (!result) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Failed to create review!'
      );
    }
    await Book.findByIdAndUpdate(
      data.book, // Ensure data.book is a valid ObjectId
      {
        $push: { reviews: result._id }
      }
    );
    return result;
  } catch (error) {
    console.error('Error in addReview:', error);
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create review !');
  }
};

const updateReview = async (
  id: string,
  data: Partial<IReview>,
  userId: string
): Promise<IReview | null> => {
  const review = await Review.findOne({ _id: id });
  if (!review) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Review does not exist !');
  }
  if (review.createdBy.toString() !== userId) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You do not have permission to update this review !'
    );
  }
  const result = await Review.findOneAndUpdate({ _id: id }, data, {
    new: true
  }).lean();
  return result;
};

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

const deleteReview = async (
  id: string,
  userId: string
): Promise<IReview | null> => {
  // Find the review first
  const review = await Review.findOne({ _id: id });
  if (!review) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Review does not exist!');
  }

  // Check if the user is authorized to delete the review
  if (review.createdBy.toString() !== userId) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You do not have permission to delete this review.'
    );
  }

  // Remove the review reference from the corresponding book document
  await Book.findByIdAndUpdate(review.book, {
    $pull: { reviews: review._id } // Use $pull to remove the review ID from the array
  });

  // Delete the review
  const result = await Review.findOneAndDelete({ _id: id }).lean();
  return result;
};

export const ReviewService = {
  getReviewsByBookId,
  //   getBookById,
  addReview,
  updateReview,
  deleteReview
};
