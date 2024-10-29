import { model, Schema } from 'mongoose';
import { IUser, IUserMethods, UserModel } from './user.interface';
import config from '../../../config';
import bcrypt from 'bcrypt';

const UserSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: {
      firstName: {
        type: String,
        required: true
      },
      middleName: {
        type: String
      },
      lastName: {
        type: String,
        required: true
      }
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    role: {
      type: String,
      default: 'user'
    },
    wishlist: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Book'
        }
      ],
      default: []
    },
    readingList: {
      type: [
        {
          book: {
            type: Schema.Types.ObjectId,
            ref: 'Book'
          },
          status: {
            type: String,
            enum: ['to-read', 'reading', 'finished'],
            default: 'to-read'
          }
        }
      ],
      default: []
    },
    reviews: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Review'
        }
      ],
      default: []
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    }
  }
);

// UserSchema.static()
// UserSchema.method()
UserSchema.statics.isUserExist = async function (
  email: string
): Promise<Pick<IUser, 'password' | 'role' | 'email'> | null> {
  const user = await User.findOne(
    { email },
    { email: 1, password: 1, role: 1 }
  );
  return user;
};

UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  const isMatched = await bcrypt.compare(givenPassword, savedPassword);
  return isMatched;
};

UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

export const User = model<IUser, UserModel>('User', UserSchema);
