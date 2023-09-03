import createDebug from 'debug';
import { NextFunction, Request, Response } from 'express';
import { UsersMongoRepository } from '../repository/users.mongo.repository.js';
import { Auth } from '../services/auth.js';
import { HttpError } from '../types/http.error.js';

const debug = createDebug('W7CHWKND:Middleware:Auth.Interceptor');

debug('Loaded');

// Authorization ¿Esta autorizado?
// Authentication ¿Erres quien dices y tienes derecho a ....?

export class AuthInterceptor {
  authorization(req: Request, _res: Response, next: NextFunction) {
    debug('Call interceptor');
    try {
      const token = req.get('Authorization')?.split(' ')[1];
      if (!token) {
        throw new HttpError(498, 'Invalid token', 'No token provided');
      }

      const { id } = Auth.verifyJWTGettingPayload(token);
      req.body.validatedId = id;
      debug(id);
      next();
    } catch (error) {
      next(error);
    }
  }

  async usersAuthentication(req: Request, _res: Response, next: NextFunction) {
    const userID = req.body.validatedId;

    try {
      const usersRepo = new UsersMongoRepository();
      const user = await usersRepo.getById(userID);
      if (!user) {
        const error = new HttpError(403, 'Forbidden');
        next(error);
      }

      next();
    } catch (error) {
      next(error);
    }
  }
}
