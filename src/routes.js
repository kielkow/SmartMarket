import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import ProductController from './app/controllers/ProductController';
import TypeController from './app/controllers/TypeController';
import BrandController from './app/controllers/BrandController';
import FileController from './app/controllers/FileController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
