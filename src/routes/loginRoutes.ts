import loginController from "@/controllers/loginController"
import { authToken } from "@/middlewares/authToken"
import { Router } from "express"


const loginRoutes = Router()

loginRoutes.post('/', loginController.login)
loginRoutes.get('/teste', authToken, loginController.test)

export default loginRoutes
