import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { list, create, update, remove } from '../controllers/resourceController.js';

export function resourceRouter(key) {
  const router = Router();
  router.use(authenticate);
  router.get('/', list(key));
  router.post('/', create(key));
  router.patch('/:id', update(key));
  router.put('/:id', update(key));
  router.delete('/:id', remove(key));
  return router;
}
