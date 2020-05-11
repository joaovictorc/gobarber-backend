import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersService from '@modules/appointments/services/ListProviderService';

export default class ProviderController {
  public async index(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const listProviders = container.resolve(ListProvidersService);

    const appointment = await listProviders.execute({
      user_id,
    });

    return res.json(appointment);
  }
}
