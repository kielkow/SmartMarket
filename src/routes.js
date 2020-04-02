import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import ProductController from './app/controllers/ProductController';
import TypeController from './app/controllers/TypeController';
import BrandController from './app/controllers/BrandController';
import FileController from './app/controllers/FileController';

const routes = new Router();
const upload = multer(multerConfig);

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

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
