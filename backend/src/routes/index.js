import { Router } from 'express';
import folders from './folders.js';
import todos from './todos.js';

const routes = Router();

routes.use('/folders', folders);
routes.use('/todos', todos);

export default routes;
