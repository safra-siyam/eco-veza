import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User';
import { Types } from 'mongoose';
// import bcrypt from 'bcryptjs';

export interface AuthRequest extends Request {
  user?: IUser;
}
export const authMiddleware = (allowedRoles: string[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    console.log('Auth Middleware');
    const token = req.cookies.jwt;

    if (allowedRoles.includes("Public")) {
      next();
      return;
    }

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: Types.ObjectId };
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        return res.status(401).json({ message: 'Token is not valid' });
      }
      (req as AuthRequest).user = user;

      const role = user.userType;
      console.log(`User Type : ${role}`);
      if (allowedRoles.includes(role)) {
        next();
        return;
      }
      res.status(401).json({ message: `Only ${allowedRoles} Are Allowed !!!` });
    } catch (err) {
      res.status(401).json({ message: 'Token is not valid' });
    }
  }
};
