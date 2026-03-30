import type { NextFunction, Request, Response } from 'express';
import { verifyFirebaseToken } from '../lib/firebaseAdmin.js';

declare global {
  namespace Express {
    interface Request {
      user?: {
        uid: string;
        email?: string;
      };
    }
  }
}

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const header = req.headers.authorization;

  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({
      success: false,
      message: 'Missing or invalid authorization header.',
    });
    return;
  }

  try {
    const decoded = await verifyFirebaseToken(header.replace('Bearer ', ''));

    req.user = decoded.email
      ? {
          uid: decoded.uid,
          email: decoded.email,
        }
      : {
          uid: decoded.uid,
        };

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message:
        error instanceof Error ? error.message : 'Could not verify user token.',
    });
  }
}