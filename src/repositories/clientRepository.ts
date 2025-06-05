import AppDataSource from "@/database/connection"
import { createClientDTO } from "@/dto/create.clientDto"
import { updateClientDTO } from "@/dto/update.clientDto"
import { ClientEntity } from "@/entities/clientEntity"
import { DeleteResult, ILike, Like, Repository } from "typeorm"

export default class ClientRepository {

  private repository: Repository<ClientEntity>

  constructor() {
    this.repository = AppDataSource.getRepository(ClientEntity)
  }

  async getAllClients(name:string, page: number = 1, limitPage: number = 10):Promise<object>{
    const offset = ( page - 1 ) * limitPage
    const result = await this.repository.find({
      where: {
        name: ILike(`%${name}%`),
      },

      select: {
        id: true,
        name: true,
        user_id: true
      },
      skip: offset,
      take: limitPage
    })

    const count = await this.repository.count()

    const totalPage = Math.ceil( count / limitPage)

    return { totalPage, page, limitPage, result }
  }

  async getAllClientsByUserId(name:string, page: number = 1, user_id: string, limitPage: number = 10):Promise<object>{
    const offset = ( page - 1 ) * limitPage
    const result = await this.repository.find({
      where: {
        name: ILike(`%${name}%`),

      },

      select: {
        id: true,
        name: true,
        user_id: true
      },
      skip: offset,
      take: limitPage
    })
    const count = await this.repository.count()

    const totalPage = Math.ceil( count / limitPage)

    return { totalPage, page, limitPage, result, user_id }

  }

      // {
      //   total: 'total de registro de clientes de um usuario',
      //   page: 'numero da pagina',
      //   data: {
      //     "conteudo total de clientes"
      //   }
      // }

  async getOneCLient(id:string):Promise<ClientEntity | null>{
      return await this.repository.findOneBy({ id })
    }

    async createClient(client: createClientDTO):Promise<ClientEntity> {
      const newClient = new ClientEntity
      newClient.name = client.name
      newClient.email = client.email
      newClient.phone = client.phone
      newClient.user_id = client.user_id

      const returnCLient = await this.repository.save(newClient)

      return returnCLient

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

    async verifyEmail(email:string):Promise<boolean> {
      const verify = await this.repository.findOneBy({email})
      if (verify) {
        return true
      }
      return false
    }


}



