import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import ProductController from './app/controllers/ProductController';
import TypeController from './app/controllers/TypeController';
import BrandController from './app/controllers/BrandController';
import UserController from './app/controllers/UserController';
import FileController from './app/controllers/FileController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/products', ProductController.index);
routes.post('/products', ProductController.store);
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.delete);

routes.get('/types', TypeController.index);
routes.post('/types', TypeController.store);
routes.put('/types/:id', TypeController.update);

routes.get('/brands', BrandController.index);
routes.post('/brands', BrandController.store);
routes.put('/brands/:id', BrandController.update);

routes.get('/users', UserController.index);
routes.put('/users/:id', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
