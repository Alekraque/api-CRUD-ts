import { Router } from "express";
import clientController from "@/controllers/clientController";
import { authToken } from "@/middlewares/authToken";
import { checkRole } from "@/middlewares/checkRole";


const clientRoutes = Router()

clientRoutes.get("/", clientController.getAll)
clientRoutes.get('/list', authToken,checkRole('user'), clientController.getAllClientsByUserId)
clientRoutes.post('/list-one', clientController.showOneCLient)
clientRoutes.put('/:id', clientController.updateClient)
clientRoutes.delete('/:id', clientController.deleteClient)
clientRoutes.post('/', authToken, checkRole('user'), clientController.createCLient)
clientRoutes.delete('/', clientController.deleteMoreCLient)

export default clientRoutes


