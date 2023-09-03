import { Router as createRouter } from 'express';
import { UsersController } from '../controller/users.controller.js';
import { AuthInterceptor } from '../middleware/auth.interceptor.js';
import { UsersMongoRepository } from '../repository/users.mongo.repository.js';

const repo = new UsersMongoRepository();
const userController = new UsersController(repo);
export const userRouter = createRouter();
const authInterceptor = new AuthInterceptor();

userRouter.patch('/login', userController.login.bind(userController));
userRouter.post('/register', userController.create.bind(userController));
userRouter.get(
  '/',
  authInterceptor.authorization.bind(authInterceptor),
  authInterceptor.usersAuthentication.bind(authInterceptor),
  userController.getAll.bind(userController)
);
userRouter.get(
  '/:id',
  authInterceptor.authorization.bind(authInterceptor),
  authInterceptor.usersAuthentication.bind(authInterceptor),
  userController.getById.bind(userController)
);
userRouter.patch(
  '/:id',
  authInterceptor.authorization.bind(authInterceptor),
  authInterceptor.usersAuthentication.bind(authInterceptor),
  userController.update.bind(userController)
);
userRouter.delete(
  '/:id',
  authInterceptor.authorization.bind(authInterceptor),
  authInterceptor.usersAuthentication.bind(authInterceptor),
  userController.delete.bind(userController)
);
