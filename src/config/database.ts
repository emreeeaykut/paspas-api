import { createConnection, getConnection, getConnectionOptions } from 'typeorm'

export const databaseConnection = async () => {
  const connectionOptions = await getConnectionOptions()

  await createConnection({ ...connectionOptions })
}

export const closeDatabaseConnection = async () => {
  await getConnection().close()
}
