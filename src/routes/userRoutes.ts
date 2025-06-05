import { Router, Request, Response } from "express";
import UsersController from "@/controllers/UsersController";
import { authToken } from "@/middlewares/authToken";
import { checkRole } from "@/middlewares/checkRole";




const userRoutes = Router()
userRoutes.get("/", authToken, checkRole('admin'), UsersController.getAll)
userRoutes.get('/:id', authToken, UsersController.showOneUser)
userRoutes.put('/:id', authToken, UsersController.update)
userRoutes.delete('/:id', authToken, checkRole('admin'), UsersController.delete)
userRoutes.post('/', authToken, checkRole('admin'), UsersController.create)
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
