
import { CreateUserDTO } from '@/dto/create.userDto'
import { UpdateUserDTO } from '@/dto/update.userDto'
import UserRepository from '@/repositories/userRepository'
import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import { DeleteResult } from 'typeorm'


class usersController {

    private userRepository: UserRepository

    constructor() {
      this.userRepository = new UserRepository()
    }

      //arrumar nome da função - feito
    getAll = async(req: Request, res: Response):Promise<Response> => {
      const allUsers = await this.userRepository.getAllUsers()
      //validacao de encontrou usuarios
       if(!allUsers || allUsers.length === 0) {
        return res.status(404).json({
          error: "you don't have users's in your sistem"
        })
       }
      return res.status(200).json({
        data: allUsers
      })
    }

    showOneUser = async (req:Request, res:Response):Promise<Response> => {
      const { id } = req.params
      // validação preenchimento
      if (!id || id.trim() === "") {
        return res.status(400).json({
        error: "Client ID is required"
        });
      }
      const user = await this.userRepository.getOneUserById(id)
      if(!user) {
        return res.status(404).json({
          errorMessage: "User not found"
        })
      }
      return res.status(201).json({
        data: user
      })
    }

    create = async(req:Request, res:Response, next:NextFunction):Promise<Response> => {

      const {name, cpf, email, role, password, confirmPassword } = req.body

      if(password !== confirmPassword) {
        return res.status(400).json({
          errorMessage: "the password does not match the confirmed password"
        })
      }


      const newUser = new CreateUserDTO()
      newUser.name = name
      newUser.email = email
      newUser.cpf = cpf
      newUser.password = password
      newUser.role = role

      const errors = await validate(newUser)
      if (errors.length > 0) {
        return res.status(422).send({
          error: errors
        })
      }


      try {
        const userDataBase = await this.userRepository.createUser(newUser)
        return res.status(userDataBase.status).json({
          data: userDataBase
        })
      } catch (error) {
        next(error)
        return res.status(500).json({
          error: "Internal server error"
        })
      }
    }

    update = async(req:Request, res:Response):Promise<Response> => {
      const { id } = req.params
      const {name, cpf, email, password, confirmPassword, newPassword} = req.body


      if(newPassword !== confirmPassword) {
        return res.status(400).json({
          errorMessage: "the password does not match the confirmed password"
        })
      }

      const updateUserDTO = new UpdateUserDTO()

      updateUserDTO.name = name
      updateUserDTO.email = email
      updateUserDTO.cpf = cpf
      updateUserDTO.password = password
      updateUserDTO.newPassword = newPassword
      updateUserDTO.id = id



      const errors = await validate(updateUserDTO)
      if (errors.length > 0) {
        return res.status(422).json({
          error: errors
        })
      }

      try {
        const userDataBase = await this.userRepository.updateUser(updateUserDTO)

        if(!userDataBase) return res.status(404).json({ errorMessage: "Was not possible to update user" })

        return res.status(200).json({
          data: userDataBase
        })
      } catch (error) {
        return res.status(500).json({
          error: "Internal server error"
        })
      }
    }


    delete = async (req: Request, res: Response): Promise<Response> => {
      const { id } = req.params;

      // Validação do ID
      if (!id || id.trim() === "") {
        return res.status(400).json({
          error: "Client ID is required"
        })
      }

      try {
        const deleteResult: DeleteResult = await this.userRepository.deleteUser(id);

        if (deleteResult.affected === 0) {
          return res.status(404).json({
            message: "Client not found"
          });
        }

        return res.status(200).json({
          data: req.body,
          message: "Client deleted successfully"
        });

      } catch (error) {
        return res.status(500).json({
          error: "Internal server error",
          details: error.message
        });
      }
    }
}

export default new usersController()
