import { Router } from "express";
import clientController from "@/controllers/clientController";
import { authToken } from "@/middlewares/authToken";
import { checkRole } from "@/middlewares/checkRole";


const clientRoutes = Router()

clientRoutes.get("/", clientController.getAll)
clientRoutes.get('/list', authToken, clientController.getAllClientsByUserId)
clientRoutes.post('/list-one', authToken, clientController.showOneCLient)
clientRoutes.put('/:id', authToken, clientController.updateClient)
clientRoutes.delete('/:id', authToken, clientController.deleteClient)
clientRoutes.post('/', authToken, clientController.createCLient)
clientRoutes.delete('/', authToken, clientController.deleteMoreCLient)

export default clientRoutes


