import { Router, Request, Response } from "express";
import UsersController from "@/controllers/UsersController";


const userRoutes = Router()
userRoutes.get("/", UsersController.getAll)
userRoutes.get('/:id', UsersController.showOneUser)
userRoutes.put('/:id', UsersController.update)
userRoutes.delete('/:id', UsersController.delete)
userRoutes.post('/', UsersController.create)
userRoutes.get('/', (_: Request, res: Response) => {
  res.status(200).send({
    success: true
  })
})
userRoutes.get("*", (_: Request, res: Response) => {
  res.status(404).send({
    error: "Not Found"
  })
})

export default userRoutes
