import LoginRepository from "@/repositories/loginRepository";
import { Request, Response } from "express";
import { Jwt, sign } from "jsonwebtoken";

class loginController {

  private loginRepository: LoginRepository

  constructor() {
    this.loginRepository = new LoginRepository()
  }

  login = async(req:Request, res:Response) => {
    const {email, password} = req.body

    try {
      const user = await this.loginRepository.checkUser(email, password)

      const tokenJwt = sign(
        { email:user.email, id: user.id }, //payload
        process.env.JWT_SECRET_TOKEN as string,
        { expiresIn: '1h' })

    return res.status(200).json({
      message: "Successful login",
      data: {
        id: user.id,
        token: tokenJwt
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
