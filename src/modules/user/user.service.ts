import {  Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from "bcrypt"
import { createUserDto, updateUserDto } from './dto';
import { WatchList } from '../watchlist/models/watchlist.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly userRepoistory: typeof User) {}
  

  private async hashPasword(password: string): Promise<String> {
    try {
      return await bcrypt.hash(password, 10)
    } catch(e) {
      throw new Error(e)
    }
    
  }

  async findUserByEmail(email: string): Promise<User> {
    try {
      return this.userRepoistory.findOne({where: {email: email}})
    } catch(e) {
      throw new Error(e)
    }
    
  }


  async createUser  (dto:createUserDto): Promise<createUserDto> {
    try {
       dto.password = (await this.hashPasword(dto.password)).toString()
    const newUser = {
      username: dto.username,
      email: dto.email,
      password: dto.password
    }
    await this.userRepoistory.create(newUser)
    return dto
    } catch(e) {
      throw new Error(e)
    }
   
  }


  async publicUser(email: string): Promise<User> {
    try {
      return this.userRepoistory.findOne(
      {where: {email}, 
      attributes: {exclude: ['password']}, 
      include: {
        model: WatchList,
        required: false
    }})
    } catch(e) {
      throw new Error(e)
    }
    
  } 

  async updateUser(email: string, dto: updateUserDto): Promise<updateUserDto> {
    try {
      await this.userRepoistory.update(dto, {where: {email}})
      return dto
    } catch(e) {
      throw new Error(e)
    }
    
  }

  async deleteUser(email: string): Promise<boolean> {
    try {
    await this.userRepoistory.destroy({where: {email}})
    return true
    } catch(e) {
      throw new Error(e)
    }
   
  }
}
