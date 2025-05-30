import { Match } from "@/utils/matchValidator";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, Length, Validate } from "class-validator"

export class createClientDTO {

  @IsNotEmpty({
    message: "The name need to be complete"
  })
  @IsString()
  @Length(3, 255)
  name: string

  @IsNotEmpty()
  @IsEmail()
  @Length(8, 255)
  email: string

  @IsNotEmpty()
  @IsPhoneNumber('BR', {
    message: "Invalid phone number in Brazil, please enter a number like: `+55 11 91234-5678`" // ingles
  })
  phone: string

}


