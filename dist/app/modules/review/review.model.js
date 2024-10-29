'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Review = void 0;
const mongoose_1 = require('mongoose');
const ReviewSchema = new mongoose_1.Schema(
  {
    content: {
      type: String,
      required: true
    },
    rating: {
      type: String
    },
    createdBy: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    book: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: 'Book',
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    }
  }
);
exports.Review = (0, mongoose_1.model)('Review', ReviewSchema);
