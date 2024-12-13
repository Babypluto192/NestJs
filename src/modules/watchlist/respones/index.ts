import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class createAssetReposnse {

  @ApiProperty()
  @IsNumber()
  user: number


  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsString()
  assetId: string
}