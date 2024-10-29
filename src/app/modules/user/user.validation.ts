import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string({
        required_error: 'First Name is required'
      }),
      middleName: z.string().optional(),
      lastName: z.string({
        required_error: 'Last Name is required'
      })
    }),
    email: z
      .string({
        required_error: 'Email is required'
      })
      .email(),
    password: z.string({
      required_error: 'Password is Required'
    }),
    role: z.string().optional()
  })
});

export const UserValidation = {
  createUserZodSchema
};
