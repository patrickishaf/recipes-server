import dotenv from 'dotenv';
import { type Knex } from 'knex';

dotenv.config();

const dbConfig: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: './recipes.sqlite',
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './src/db/migrations',
    extension: 'ts',
  },
  seeds: {
    directory: './src/config/db/seeds',
  }
}

export default dbConfig;