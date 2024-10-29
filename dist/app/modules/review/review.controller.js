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
exports.ReviewController = void 0;
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'));
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'));
const http_status_1 = __importDefault(require('http-status'));
const review_service_1 = require('./review.service');
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const getReviewsByBookId = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield review_service_1.ReviewService.getReviewsByBookId(id);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      data: result,
      message: 'All reviews retrieved successfully'
    });
  })
);
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
const addReview = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = req.body;
    const result = yield review_service_1.ReviewService.addReview(
      Object.assign(Object.assign({}, data), {
        createdBy:
          (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId
      })
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      data: result,
      message: 'Review Added Successfully !'
    });
  })
);
const updateReview = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const { id } = req.params;
    // Type guard to check if user is not null
    if (!req.user) {
      throw new ApiError_1.default(
        http_status_1.default.UNAUTHORIZED,
        'User not authenticated.'
      );
    }
    const { userId } = req.user;
    const result = yield review_service_1.ReviewService.updateReview(
      id,
      data,
      userId
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      data: result,
      message: 'Review Updated Successfully !'
    });
  })
);
const deleteReview = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!req.user) {
      throw new ApiError_1.default(
        http_status_1.default.UNAUTHORIZED,
        'User not authenticated.'
      );
    }
    const { userId } = req.user;
    const result = yield review_service_1.ReviewService.deleteReview(
      id,
      userId
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      data: result,
      message: 'Review Deleted Successfully !'
    });
  })
);
exports.ReviewController = {
  getReviewsByBookId,
  // getBookById,
  addReview,
  updateReview,
  deleteReview
};
