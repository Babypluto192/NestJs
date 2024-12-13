import { Body, Controller, Delete, Patch, Post, Req, UseGuards } from '@nestjs/common';
import {UserService} from "./user.service"
import {  updateUserDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @ApiTags('API')
  @Patch()
  updateUser(@Body() dto:updateUserDto, @Req() request): Promise<updateUserDto> {
    const user = request.user
    return this.UserService.updateUser(user.email, dto)
  }


  @UseGuards(JwtAuthGuard)
  @ApiTags('API')
  @Delete()
  deleteUser(@Req() request): Promise<boolean> {
     const user = request.user
     return this.UserService.deleteUser(user.email)
  }
}
