import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { BookRoutes } from '../modules/book/book.route';
import { ReviewRoutes } from '../modules/review/review.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes
  },
  {
    path: '/auth',
    route: AuthRoutes
  },
  {
    path: '/books',
    route: BookRoutes
  },
  {
    path: '/reviews',
    route: ReviewRoutes
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
