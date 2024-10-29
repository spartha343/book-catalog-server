import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { BookService } from './book.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IBook } from './book.interface';
import ApiError from '../../../errors/ApiError';

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getAllBooks();

  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'All books retrieved successfully'
  });
});

const getBookById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.getBookById(id);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'Book Retrieved successfully !'
  });
});

const addBook = catchAsync(async (req: Request, res: Response) => {
  const book = req.body;
  const result = await BookService.addBook({
    ...book,
    createdBy: req.user?.userId
  });

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'Book Added Successfully !'
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const book = req.body;
  const { id } = req.params;
  if (!req.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User not authenticated.');
  }
  const { userId } = req.user;
  const result = await BookService.updateBook(id, book, userId);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'Book Updated Successfully !'
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!req.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User not authenticated.');
  }
  const { userId } = req.user;
  const result = await BookService.deleteBook(id, userId);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'Book Deleted Successfully !'
  });
});

export const BookController = {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook
};
