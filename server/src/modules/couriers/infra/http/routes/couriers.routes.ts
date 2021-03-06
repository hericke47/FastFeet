import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import CouriersController from '@modules/couriers/infra/http/controllers/CouriersController';
import CouriersDeliveryController from '@modules/couriers/infra/http/controllers/CouriersDeliveryController';
import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';
import CouriersAvatarController from '@modules/couriers/infra/http/controllers/CouriersAvatarController';

const couriersRouter = Router();
const couriersController = new CouriersController();
const couriersAvatarController = new CouriersAvatarController();
const couriersDeliveryController = new CouriersDeliveryController();

const upload = multer(uploadConfig.multer);

couriersRouter.post('/', couriersController.create);
couriersRouter.get('/', couriersController.index);
couriersRouter.get('/:id', couriersController.show);

couriersRouter.use(ensureAuthentication);

couriersRouter.put('/:id', couriersController.update);
couriersRouter.delete('/:id', couriersController.destroy);
couriersRouter.get('/:id/deliveries', couriersDeliveryController.index);

couriersRouter.patch(
  '/avatar/:id',
  upload.single('avatar'),
  couriersAvatarController.update,
);

export default couriersRouter;
