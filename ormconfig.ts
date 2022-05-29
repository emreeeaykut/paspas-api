const baseUrl = process.env.NODE_ENV === 'development' ? __dirname + '/src' : __dirname + '/dist'

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
    ssl: {
      rejectUnauthorized: false,
    },
    entities: [`${baseUrl}/modules/**/*{.ts,.js}`],
    migrations: [`${baseUrl}/database/migrations/**/*{.ts,.js}`],
    cli: {
      migrationsDir: 'src/database/migrations/',
    },
  },
]
