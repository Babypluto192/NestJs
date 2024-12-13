import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class createUserDto {
  @ApiProperty()
  @IsString()
  username: string

  @ApiProperty()
  @IsString()
  email: string

  @ApiProperty()
  @IsString()
  password: string
}

export class updateUserDto {
  @ApiProperty()
  @IsString()
  username: string

  @ApiProperty()
  @IsString()
  email: string

}