"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: 'First Name is required'
            }),
            middleName: zod_1.z.string().optional(),
            lastName: zod_1.z.string({
                required_error: 'Last Name is required'
            })
        }),
        email: zod_1.z
            .string({
            required_error: 'Email is required'
        })
            .email(),
        password: zod_1.z.string({
            required_error: 'Password is Required'
        }),
        role: zod_1.z.string().optional()
    })
});
exports.UserValidation = {
    createUserZodSchema
};
