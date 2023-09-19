import { DataSource } from 'typeorm';
import config from '../config';

import { User } from './entity/User.entity';

export default new DataSource({
    type: config.db[config.app_env].type, 
    port: +config.db[config.app_env].port, 
    username: config.db[config.app_env].username, 
    password: config.db[config.app_env].password, 
    database: config.db[config.app_env].database_name, 
    synchronize: true, 
    entities: [User]
});