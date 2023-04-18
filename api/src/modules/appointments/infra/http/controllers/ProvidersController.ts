import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { user } = request;

    const listProviders = container.resolve(ListProvidersService);

    const providers = await listProviders.execute({
      except_user_id: user.id,
    });

    return response.json(instanceToInstance(providers));
  }
}
