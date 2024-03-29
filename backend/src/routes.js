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

routes.post('/sessions', SessionController.store);

routes.post('/users', UserController.store);
routes.get('/users', UserController.index);
routes.put('/users', UserController.update);
routes.delete('/users/:id', UserController.delete);

routes.get('/products', ProductController.index);
routes.post('/products', ProductController.store);
routes.put('/products', ProductController.update);
routes.delete('/products/:id', ProductController.delete);

routes.use(authMiddleware);

routes.get('/types', TypeController.index);
routes.post('/types', TypeController.store);
routes.put('/types/:id', TypeController.update);

routes.get('/brands', BrandController.index);
routes.post('/brands', BrandController.store);
routes.put('/brands/:id', BrandController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
