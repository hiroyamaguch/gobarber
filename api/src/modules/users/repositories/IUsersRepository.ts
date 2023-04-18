import User from '../infra/typeorm/entities/User';

import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IFindAllProviders from '../dtos/IFindAllProviders';

export default interface IUsersRepository {
  findAllProviders(data: IFindAllProviders): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
