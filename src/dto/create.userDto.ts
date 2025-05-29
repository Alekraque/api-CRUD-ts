import { IsCPF } from "@/utils/cpfValidator"
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator"

export class CreateUserDTO {

  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  name: string

  @IsEmail()
  @IsNotEmpty()
  @Length(8, 255)
  email: string

  @IsCPF()
  @IsNotEmpty()
  cpf: string


  @IsNotEmpty()
  @Length(1, 255)
  @IsString()
  password: string

}


