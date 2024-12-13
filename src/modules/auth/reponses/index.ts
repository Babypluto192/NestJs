import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"


class userReponse {
  @ApiProperty()
  @IsString()
  username: string
   @ApiProperty()
  @IsString()
  email: string
}


export class AuthUserResponse {

  @ApiProperty()
  user: userReponse

   @ApiProperty()
  @IsString()
  token: string
}