import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';

const createUser = async (user: IUser): Promise<IUser> => {
  const newUser = await User.create(user);
  if (!newUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create new user !');
  }
  return newUser.toObject();
};

export const UserService = {
  createUser
};
