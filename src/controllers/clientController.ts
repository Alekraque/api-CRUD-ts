import { createClientDTO } from "@/dto/create.clientDto"
import { updateClientDTO } from "@/dto/update.clientDto"
import ClientRepository from "@/repositories/clientRepository"
import { validate } from "class-validator"
import { Request, Response } from 'express'


class clientController {
    private repository: ClientRepository

    constructor() {
      this.repository = new ClientRepository()
    }

    getAll = async(req: Request, res: Response):Promise<Response> => {
      const allClients = await this.repository.getAllClients()
       //validação se realmente encontrou algo - feito
       if(!allClients || allClients.length === 0) {
        return res.status(404).json({
          error: "you don't have Client's in your sistem"
        })
       }
      return res.status(200).json({
        data: allClients
      })
    }

    getAllClientsByUserId = async(req:Request, res:Response):Promise<Response> => {
      const user_id = req.user.id
      if (!user_id) {
        return res.status(401).json({
        error: "Unauthorized: User ID not found in token"
      })
    }


      const clientsByUser = await this.repository.getAllClientsByUserId(user_id)
      if (!clientsByUser || clientsByUser.length === 0) {
        return res.status(404).json({
          error: "you don't have Client's in your sistem"
        })
      }
      return res.status(200).json({
        data: clientsByUser
      })
    }

    showOneCLient = async(req:Request, res:Response):Promise<Response> => {
    const { id } = req.body

     //validação se id foi preenchido - feito
    if (!id || id.trim() === "") {
      return res.status(400).json({
      error: "Client ID is required"
      });
    }

    const client = await this.repository.getOneCLient(id)
    if(!client) {
      return res.status(404).json({
      error: "Client not found"
      })
    }
    return res.status(200).json({
      data: client
    })
    }

    createCLient = async(req:Request, res:Response):Promise<Response> => {
      const { name, email, phone } = req.body
      const user_id = req.user.id

      const newClient = new createClientDTO()

      newClient.name = name
      newClient.email = email
      newClient.phone = phone
      newClient.user_id = user_id

      const clientErrors = await validate(newClient)

      if(clientErrors.length > 0) {
        return res.status(400).json({
          error: "Some information is invalid, please try again",
        })
      }

      try {
        console.log('chegou aqui')
        const createdClient = await this.repository.createClient(newClient)
        return res.status(201).json({
          data: createdClient
        })
      } catch (error) {
        return res.status(500).json({
          messageError: "Internal server error",
          error: error
        })
      }
    }

    updateClient = async(req:Request, res:Response):Promise<Response> => {
      const { id } = req.params
      const { name, email, phone } = req.body

      const updatedClient = new updateClientDTO()

      updatedClient.name = name
      updatedClient.email = email
      updatedClient.phone = phone
      updatedClient.id = id

      const updateError = await validate(updatedClient)
      if(updateError.length > 0) {
        return res.status(422).json({
          error: "Some information is invalid, please try again",
        })
      }



      try {
        const updateClient = await this.repository.updateClient(updatedClient)
        return res.status(200).json({
          data: updateClient
        })
      } catch (error) {
        return res.status(500).json({
          errorMessage: "Internal server error",
          error: error
        })
      }
    }

    deleteClient = async(req:Request, res: Response):Promise<Response> => {
      const { id } = req.params
       //validação preenchimento id - feito
      if (!id || id.trim() === "") {
        return res.status(400).json({
        error: "Client ID is required"
        });
      }

      const deletedCLient = await this.repository.deleteClient(id)
      if(!deletedCLient) {
        return res.status(404).json({
          errorMessage: "Client not found"
        })
      }
      return res.status(201).json({
        message: "Client successfully deleted"
      })
    }

    deleteMoreCLient = async(req:Request, res:Response):Promise<Response> => {
      const ids = req.body
      const deleted = await this.repository.selectDeleteClient(ids)
      if (!deleted) {
        return res.status(400).json({
          errorMessage: "Error to delete ID's"
        })
      }

      if(!Array.isArray(ids)) {
        return res.status(400).json({
          error: "The Id's need to be a arrayList"
        })
      }
      // arrumar retorno - feito
      return res.status(200).json({
        data: ids,
        message: "Client's successfully deleted"
      })
    }
}

export default new clientController()
