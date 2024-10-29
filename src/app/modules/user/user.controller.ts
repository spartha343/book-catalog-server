import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { UserService } from './user.service';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import httpStatus from 'http-status';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';
import { Types } from 'mongoose';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createUser(req.body);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, password, ...resultWithoutPassword } = result as IUser & {
    _id: Types.ObjectId;
  };
  const { email, role } = resultWithoutPassword;

  const token = jwtHelpers.createToken(
    { email, role, userId: _id },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true
  };

  res.cookie('token', token, { ...cookieOptions, sameSite: 'none' });

  sendResponse<Omit<IUser, 'password'>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: resultWithoutPassword,
    message: 'User created successfully !'
  });
});

export const UserController = {
  createUser
};
