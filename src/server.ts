import 'reflect-metadata'
import express, { Request, Response } from 'express'
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import cors from 'cors'
import AppDataSource from './database/connection';
import routes from './routes';
dotenv.config()


const PORT = 8090


const app = express()
app.use(bodyParser.json())
app.use(cors())

//criar UM arquivo que unifica as rotas e importar apenas ele. - feito
app.use('/', routes);


AppDataSource.initialize()
  .then(() => {
    console.log('success to connect with database')
  })
  .catch((error) => {
    console.log(" [ERROR] database is not connected", error)
  })

app.get('/', (req, res) => {
  res.send('Server UP')
})


app.listen(PORT, () => {
    console.log(`Server is loding on port: ${PORT}`)
})


