import AppDataSource from "@/database/connection"
import { createClientDTO } from "@/dto/create.clientDto"
import { updateClientDTO } from "@/dto/update.clientDto"
import { ClientEntity } from "@/entities/clientEntity"
import { DeleteResult, Repository } from "typeorm"

export default class ClientRepository {

    private repository: Repository<ClientEntity>

    constructor() {
        this.repository = AppDataSource.getRepository(ClientEntity)
    }

    async getAllClients():Promise<ClientEntity[]>{
      return await this.repository.find()
    }

    async getOneCLient(id:string):Promise<ClientEntity | null>{
      return await this.repository.findOneBy({ id })
    }

    async createClient(client: createClientDTO):Promise<ClientEntity | null> {
      const newClient = new ClientEntity

      newClient.name = client.name
      newClient.email = client.email
      newClient.phone = client.phone

      return await this.repository.save(newClient)
    }

    async updateClient(client: updateClientDTO):Promise<ClientEntity>{
      // busca cliente? - feito
      const updateClient = await this.getOneCLient(client.id)
      if(!updateClient) {
        return null
      }

      updateClient.name = client.name
      updateClient.email = client.email
      updateClient.phone = client.phone

      return await this.repository.save(updateClient)
    }

    //padronizar nomes dos metodos ....Client - feito
    async deleteClient(id:string):Promise<DeleteResult> {
      return await this.repository.delete(id)
    }

    //padronizar nomes dos metodos ....Client - feito
    async selectDeleteClient(ids:any):Promise<DeleteResult[]> {
      return await ids.map((ids:any) => this.repository.delete(ids))
    }



}



