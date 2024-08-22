import { Router } from 'express' //router is not initialised in  index.js
import { getProduct,putProduct ,postProduct,deleteProduct} from '../handlers/index.js';

export const appRouter = Router()

//appRouter.get('/users', getUser);

//appRouter.post('/register', registerUser);

appRouter.get('/product/:productId',getProduct);
appRouter.put('/product/:productId',putProduct);
appRouter.post('/product',postProduct);
appRouter.delete('/product/:productId',deleteProduct)


