"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const review_controller_1 = require("./review.controller");
const router = express_1.default.Router();
router.get('/:id', review_controller_1.ReviewController.getReviewsByBookId);
// router.get('/:id', BookController.getBookById);
router.post('/', (0, auth_1.default)('user'), review_controller_1.ReviewController.addReview);
router.patch('/:id', (0, auth_1.default)('user'), review_controller_1.ReviewController.updateReview);
router.delete('/:id', (0, auth_1.default)('user'), review_controller_1.ReviewController.deleteReview);
exports.ReviewRoutes = router;
