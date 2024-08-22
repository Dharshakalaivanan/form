import { Router } from 'express' //router is not initialised in  index.js
import { getUser, registerUser } from '../handlers/index.js';

export const appRouter = Router()

appRouter.get('/users', getUser);

appRouter.post('/register', registerUser);



