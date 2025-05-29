import { DataSource } from "typeorm";
import 'reflect-metadata'
import { config } from 'dotenv'
import { UserEntity } from "@/entities/userEntity";
import { ClientEntity } from "@/entities/clientEntity";

config()

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
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
