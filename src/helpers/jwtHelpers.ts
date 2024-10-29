import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string
): string => {
  return jwt.sign(payload, secret, { expiresIn: expireTime });
};

const verifyToken = (
  token: string,
  secret: Secret
): JwtPayload & {
  userId: string; // or Types.ObjectId, depending on your implementation
  email: string;
  role: string;
} => {
  return jwt.verify(token, secret) as JwtPayload & {
    userId: string; // or Types.ObjectId, depending on your implementation
    email: string;
    role: string;
  };
};

export const jwtHelpers = {
  createToken,
  verifyToken
};
