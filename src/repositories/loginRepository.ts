import AppDataSource from "@/database/connection";
import { LoginEntity } from "@/entities/loginEntity";
import { Repository } from "typeorm";

export default class LoginRepository {
  private repository: Repository<LoginEntity>

  constructor() {
    this.repository = AppDataSource.getRepository(LoginEntity)
  }

  async getOneUser(email: string): Promise<LoginEntity | null> {
    return await this.repository.findOneBy({ email })
  }
}
