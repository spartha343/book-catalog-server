import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user:
        | (JwtPayload & {
            userId: string; // or Types.ObjectId, depending on your implementation
            email: string;
            role: string;
          })
        | null;
    }
  }
}
