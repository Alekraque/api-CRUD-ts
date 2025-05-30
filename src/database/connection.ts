import { DataSource } from "typeorm";
import 'reflect-metadata'
import { config } from 'dotenv'

config()

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.HOST_DB,
    port: Number(process.env.PORT_DB),
    username: process.env.USERNAME_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.NAME_DB,
    synchronize: true,
    logging: false,
    entities: [
      __dirname + '/../entities/*entity.{ts,js}'
      // arrumar caminho correto - feito
    ],
})

AppDataSource.initialize()
             .then(()=> console.log('connected'))
             .catch((error)=> console.error(error))

export default AppDataSource
