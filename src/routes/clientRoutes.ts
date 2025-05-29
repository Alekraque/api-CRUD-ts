import { Router } from "express";
import clientController from "@/controllers/clientController";


const clientRoutes = Router()

clientRoutes.get("/", clientController.getAll)
clientRoutes.get('/:id', clientController.showOneCLient)
clientRoutes.put('/:id', clientController.updateClient)
clientRoutes.delete('/:id', clientController.deleteClient)
clientRoutes.post('/', clientController.createCLient)
clientRoutes.delete('/', clientController.deleteMoreCLient)

export default clientRoutes


