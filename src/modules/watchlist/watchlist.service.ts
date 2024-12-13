import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WatchList } from './models/watchlist.model';
import { WatchListDto } from './dto';
import { createAssetReposnse } from './respones';

@Injectable()
export class WatchlistService {
  constructor(@InjectModel(WatchList) private readonly watchlistRepository: typeof WatchList) {}

  async createAsset(user: {id: number}, watchListDto: WatchListDto): Promise<createAssetReposnse> {
    try {
       const watchlist = {
      user: user.id, 
      name: watchListDto.name,
      assetId: watchListDto.assetId
    }

    await this.watchlistRepository.create(watchlist)

    return watchlist
    } catch(e) {
      throw new Error(e)
    }
   
  }


  async deleteAsset(userId: number, assetId: string): Promise<boolean> {
    try {
       await this.watchlistRepository.destroy({where: {id: assetId, user: userId}})
       return true
    } catch(e) {
      throw new Error(e)
    }
   
  }

}
