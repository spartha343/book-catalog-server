import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { ReviewService } from './review.service';
import { IReview } from './review.interface';
import ApiError from '../../../errors/ApiError';

const getReviewsByBookId = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ReviewService.getReviewsByBookId(id);

  sendResponse<IReview[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'All reviews retrieved successfully'
  });
});

// const getBookById = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await BookService.getBookById(id);

//   sendResponse<IBook>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     data: result,
//     message: 'Book Retrieved successfully !'
//   });
// });

const addReview = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await ReviewService.addReview({
    ...data,
    createdBy: req.user?.userId
  });

  sendResponse<IReview>(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'Review Added Successfully !'
  });
});

const updateReview = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const { id } = req.params;
  // Type guard to check if user is not null
  if (!req.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User not authenticated.');
  }
  const { userId } = req.user;
  const result = await ReviewService.updateReview(id, data, userId);

  sendResponse<IReview>(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'Review Updated Successfully !'
  });
});

const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!req.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User not authenticated.');
  }
  const { userId } = req.user;

  const result = await ReviewService.deleteReview(id, userId);

  sendResponse<IReview>(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'Review Deleted Successfully !'
  });
});

export const ReviewController = {
  getReviewsByBookId,
  // getBookById,
  addReview,
  updateReview,
  deleteReview
};
