import express from 'express';
import { BookController } from './book.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/', BookController.getAllBooks);

router.get('/:id', BookController.getBookById);

router.post('/', auth('user'), BookController.addBook);

router.patch('/:id', auth('user'), BookController.updateBook);

router.delete('/:id', auth('user'), BookController.deleteBook);

export const BookRoutes = router;
