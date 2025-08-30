import { join } from 'path';
import { DataSourceOptions } from 'typeorm';
import 'dotenv/config';
require('dotenv').config();
// console.log('process.env.DATABASE_HOST')
// console.info(process.env.DATABASE_HOST)
// console.log('DATABASE_TYPE: postgres')
// console.log('DATABASE_HOST: '+process.env.DATABASE_HOST)
// console.log('DATABASE_PORT: '+process.env.DATABASE_PORT)
// console.log('DATABASE_username: '+process.env.DATABASE_username)
// console.log('DATABASE_PASSWORD: '+process.env.DATABASE_PASSWORD)
// console.log('DATABASE_NAME: '+process.env.DATABASE_NAME)
export default function commonConfig(): DataSourceOptions {
  const devConfig = {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_username,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    ssl: null,
  };
  /* 
export default function commonConfig(): DataSourceOptions {
  const devConfig = {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    username: process.env.DATABASE_username || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'root',
    database: process.env.DATABASE_NAME || 'nest_cmon',
    ssl: null,
  };
*/
  const prodConfig = {
    url: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  };

  JSON.stringify(devConfig);
  JSON.stringify(prodConfig);
  // console.log('devConfig-')
  // console.info(devConfig);
  // console.log('prodConfig-')
  // console.info(prodConfig)

  return {
    name: 'postgres', // Unique connection name
    type: 'postgres',
    logging: true, //true,
    synchronize: true, // false //true,
    entities: [join(__dirname, '../../**/*.entity{.ts,.js}')],
    migrations: [
      //'../../migrations/**/*{.ts,.js}',
      '@root/migrations/**/*{.ts,.js}',
    ],
    ...(process.env.NODE_ENV === 'production' ? prodConfig : devConfig),
  };
}
