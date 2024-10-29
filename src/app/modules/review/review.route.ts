import express from 'express';
import auth from '../../middlewares/auth';
import { ReviewController } from './review.controller';

const router = express.Router();

router.get('/:id', ReviewController.getReviewsByBookId);

// router.get('/:id', BookController.getBookById);

router.post('/', auth('user'), ReviewController.addReview);

router.patch('/:id', auth('user'), ReviewController.updateReview);

router.delete('/:id', auth('user'), ReviewController.deleteReview);

export const ReviewRoutes = router;
