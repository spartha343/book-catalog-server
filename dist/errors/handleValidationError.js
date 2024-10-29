"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError = (error) => {
    const errors = Object.values(error.errors).map(e => {
        return {
            path: e === null || e === void 0 ? void 0 : e.path,
            message: e === null || e === void 0 ? void 0 : e.message
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        errorMessages: errors,
        message: 'Validation Error'
    };
};
exports.default = handleValidationError;
