import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { createUserDto } from '../user/dto';
import { AppErrors } from 'src/common/constants/errors';
import { loginUserDto } from './dto';
import * as bcrypt from "bcrypt"
import { AuthUserResponse } from './reponses';
import { TokenService } from '../token/token.service';
@Injectable()
export class AuthService {
  constructor(private readonly UserService: UserService,
    private readonly tokenService: TokenService
  ) {}


  async registerUser(dto: createUserDto): Promise<createUserDto> {
    try {
    const userExist = await this.UserService.findUserByEmail(dto.email)
    if(userExist) throw new BadRequestException(AppErrors.USER_EXIST)
    return this.UserService.createUser(dto)
    }
    catch(e) {
      throw new Error(e)
    }
  }

  async loginUser(dto:loginUserDto): Promise<AuthUserResponse> {
    try {
      const userExist = await this.UserService.findUserByEmail(dto.email)
      if(!userExist) throw new BadRequestException(AppErrors.USER_NOT_EXIST)
      const validatePassword = await bcrypt.compare(dto.password, userExist.password)
      if(!validatePassword) throw new BadRequestException(AppErrors.WRONG_DATA)
      const user = await this.UserService.publicUser(userExist.email)
      const token = await this.tokenService.genereJwtToken(user)
      return {user, token} 
    }
    catch(e) {
      throw new Error(e)
    }
  }
}
