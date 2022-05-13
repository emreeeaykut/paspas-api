const baseUrl = __dirname + '/src';

export default [
  {
    name: 'default',
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [`${baseUrl}/entities/**/*{.ts,.js}`],
    migrations: [`${baseUrl}/database/migrations/**/*{.ts,.js}`],
    subscribers: [`${baseUrl}/database/subscribers/**/*{.ts,.js}`],
    seeds: [`${baseUrl}/database/seeds/**/*{.ts,.js}`],
    factories: [`${baseUrl}/database/factories/**/*{.ts,.js}`],
    cli: {
      entitiesDir: 'src/entities/',
      migrationsDir: 'src/database/migrations/',
      subscribersDir: 'src/database/subscribers/'
    }
  }
];
