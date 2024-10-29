import { model, Schema } from 'mongoose';
import { IReview, IReviewMethods, ReviewModel } from './review.interface';

const ReviewSchema = new Schema<IReview, ReviewModel, IReviewMethods>(
  {
    content: {
      type: String,
      required: true
    },
    rating: {
      type: String
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    book: {
      type: Schema.Types.ObjectId,
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

export const Review = model<IReview, ReviewModel>('Review', ReviewSchema);
