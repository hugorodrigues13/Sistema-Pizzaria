import {Router, Request, Response} from 'express'
import multer from 'multer';

import { AuthUserController } from './controllers/user/AuthUserController';
import { CreateUserController } from './controllers/user/CreateUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import { CreateProductController } from './controllers/product/CreateProductController';
import { ListByCategoryController } from './controllers/product/ListByCategoryController';
import { CreateOrderController } from './controllers/order/CreateOrderController';
import { RemoveOrderController } from './controllers/order/RemoveOrderController';
import { AddItemController } from './controllers/order/AddItemController';
import { RemoveItemController } from './controllers/order/RemoveItemController';
import { SendOrderController } from './controllers/order/SendOrderController';
import { ListOrdersController } from './controllers/order/ListOrdersController';
import { DetailOrderController } from './controllers/order/DetailOrderController';
import { FinishOrderController } from './controllers/order/FinishOrderController';
import { CancelOrderController } from './controllers/order/CancelOrderController';
import { RemoveCategoryController } from './controllers/category/RemoveCategoryController';
import { RemoveProductController } from './controllers/product/RemoveProductController';
import { ListProductController } from './controllers/product/ListProductController';
import { UpdateProductController } from './controllers/product/UpdateProductController';
import { UpdateCategoryController } from './controllers/category/UpdateCategoryController';

import { isAuthenticated } from './middlewares/isAuthenticated';

import uploadConfig from './config/multer'

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"))

// ROTAS USER
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/me', isAuthenticated, new DetailUserController().handle)

//-- ROTAS CATEGORY
router.post('/category', isAuthenticated, new CreateCategoryController().handle)
router.get('/category', isAuthenticated, new ListCategoryController().handle)
router.delete('/category/remove', isAuthenticated, new RemoveCategoryController().handle)
router.put('/category/update', isAuthenticated, new UpdateCategoryController().handle)

//-- ROTAS PRODUCT
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)
router.get('/category/product', isAuthenticated, new ListByCategoryController().handle)
router.delete('/product/remove', isAuthenticated, new RemoveProductController().handle)
router.get('/product', isAuthenticated, new ListProductController().handle)
router.put('/product/update', isAuthenticated, upload.single('file'), new UpdateProductController().handle)

//-- ROTAS ORDER
router.post('/order', isAuthenticated, new CreateOrderController().handle)
router.delete('/order', isAuthenticated, new RemoveOrderController().handle)
router.put('/order/send', isAuthenticated, new SendOrderController().handle)
router.put('/order/cancel', isAuthenticated, new CancelOrderController().handle)
router.get('/orders', isAuthenticated, new ListOrdersController().handle)
router.put('/order/finish', isAuthenticated, new FinishOrderController().handle)

//-- ROTAS ITEM
router.post('/order/add', isAuthenticated, new AddItemController().handle)
router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle)
router.get('/order/detail', isAuthenticated, new DetailOrderController().handle)


export {router}