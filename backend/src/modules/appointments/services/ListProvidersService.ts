import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  except_user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ except_user_id }: IRequest): Promise<User[]> {
    const user = await this.usersRepository.findAllProviders({
      except_user_id,
    });

    return user;
  }
}

export default ListProvidersService;
