import { Body, Controller, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import { createUserDto, } from '../user/dto';
import { loginUserDto } from './dto';
import { AuthUserResponse } from './reponses';
import { ApiResponse, ApiTags } from '@nestjs/swagger';


@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @ApiTags('API')
  @ApiResponse({status: 201, type: createUserDto})
  @Post('register')
  register(@Body() dto: createUserDto): Promise<createUserDto> {
    return this.AuthService.registerUser(dto)
  }
  @ApiTags('API')
  @ApiResponse({status: 200, type: AuthUserResponse})
  @Post('login')
  login(@Body() dto: loginUserDto):Promise<AuthUserResponse> {
    return this.AuthService.loginUser(dto)
  }



}
