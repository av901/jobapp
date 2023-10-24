import {Job, User, Skill} from './entity';
import {ConnectionOptions} from "typeorm";

export const mysqlConnectionConfig = {
   "type": "mysql",
   "host": "localhost",
   "port": 3306,
   "username": "admin",
   "password": "Password",
   "database": "jobdb",
   "synchronize": true,
   "logging": true,
   "entities": [Job, User, Skill],
} as ConnectionOptions;