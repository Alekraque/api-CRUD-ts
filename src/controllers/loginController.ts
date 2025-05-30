import LoginRepository from "@/repositories/loginRepository";
import { Request, response, Response } from "express";

class loginController {

  private loginRepository: LoginRepository

  constructor() {
    this.loginRepository = new LoginRepository()
  }

  login = async(req:Request, res:Response) => {
    const {email, password} = req.body

    try {
      const user = await this.loginRepository.checkUser(email, password)

      // inserir json web token aqui dentro

    return res.status(200).json({
      message: "Successful login",
      data: {
        email: user.email,
      }
    });
    } catch (error) {
      return res.status(400).json({
        errorMessage: "E-mail and/or password are invalid"
      })
    }
  }
}

export default new loginController()
