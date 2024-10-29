'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const cors_1 = __importDefault(require('cors'));
const routes_1 = __importDefault(require('./app/routes'));
const http_status_1 = __importDefault(require('http-status'));
const cookie_parser_1 = __importDefault(require('cookie-parser'));
const globalErrorHandler_1 = __importDefault(
  require('./app/middlewares/globalErrorHandler')
);
const app = (0, express_1.default)();
//middlewares
app.use(
  (0, cors_1.default)({
    origin: 'http://localhost:3000', // Your client-side origin
    credentials: true // Required for cookies to be sent
  })
);
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//Application routes
app.use('/api/v1', routes_1.default);
app.use(globalErrorHandler_1.default);
//handle not found route
app.use((req, res) => {
  res.status(http_status_1.default.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found'
      }
    ]
  });
});
// //testing
// app.get('/', (req: Request, res: Response) => {
//   res.send('Working successfully');
// });
exports.default = app;
