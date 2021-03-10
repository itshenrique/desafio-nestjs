// scripts/seed.ts
import * as _ from 'lodash';
import { createConnection, ConnectionOptions } from 'typeorm';
import { configService } from '../config/config.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { CreateUserDto } from '../users/dto/createUser.dto';

async function run() {
  const opt = {
    ...configService.getTypeOrmConfig(),
    debug: true,
  };

  const connection = await createConnection(opt as ConnectionOptions);
  const userService = new UsersService(connection.getRepository(User));

  const dto = CreateUserDto.from({
    email: 'master@teste.com',
    cpf: '04342357097',
    password: '123456',
    role: 'admin',
    permissions: ['create', 'edit', 'view', 'list'],
  });

  const work = await userService
    .register(dto)
    .then((r) => (console.log('done ->', r.email), r));

  return work;
}

run()
  .then((_) => console.log('...wait for script to exit'))
  .catch((error) => console.error('seed error', error));
