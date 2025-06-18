import express from 'express'
import { addProduct, listProduct, removeProduct, singleProduct } from '../controller/productController.js';
import { upload } from '../middleware/multter.js';


const productRoute = express.Router();

productRoute.post('/add-product',
    upload.fields([{name:'image1',maxCount:1},
    {name:'image2',maxCount:2},
    {name:'image3',maxCount:3},
    {name:'image4',maxCount:4}]),
    addProduct);
productRoute.post('/remove-product',removeProduct);
productRoute.post('/single-product',singleProduct);
productRoute.get('list-product',listProduct)

export default productRoute;