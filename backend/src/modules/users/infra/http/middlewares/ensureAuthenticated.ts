import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AuthConfig from '@config/auth';

interface TokenPayLoad {
  iat: number | undefined;
  exp: number;
  sub: string | undefined | (() => string);
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new Error('JWT token is missing!');
  }

  const [, token] = authorization.split(' ');

  try {
    const decode = verify(token, AuthConfig.Jwt.secret);

    const { sub } = decode as TokenPayLoad;

    if (typeof(sub) == "string") {
      request.user = {
        id: sub,
      };
    }

    return next();
  } catch (err) {
    throw new Error(err);
  }
}
