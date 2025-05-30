import loginController from "@/controllers/loginController";
import { Router } from "express";


const loginRoutes = Router()

loginRoutes.post('/', loginController.login)
