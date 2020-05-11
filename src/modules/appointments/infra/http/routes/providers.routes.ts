import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';

const ProvidersRouter = Router();
const appointmentsController = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

ProvidersRouter.use(ensureAuthenticated);

ProvidersRouter.get('/', appointmentsController.index);
ProvidersRouter.get(
  '/:provider_id/month-availability',
  providerMonthAvailabilityController.index,
);
ProvidersRouter.get(
  '/:provider_id/day-availability',
  providerDayAvailabilityController.index,
);

export default ProvidersRouter;
