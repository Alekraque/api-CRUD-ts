import { IsNotEmpty } from "class-validator";
import { createClientDTO } from "./create.clientDto";

export class updateClientDTO extends createClientDTO {

  @IsNotEmpty()
  id: string
}
