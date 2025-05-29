import { IsNotEmpty } from "class-validator";
import { CreateUserDTO } from "./create.userDto";

export class UpdateUserDTO extends CreateUserDTO {
  @IsNotEmpty()
  id: string
}
