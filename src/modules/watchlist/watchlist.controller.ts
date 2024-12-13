import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { WatchListDto } from './dto';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { createAssetReposnse } from './respones';

@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @UseGuards(JwtAuthGuard)
  @ApiTags('API')
   @ApiResponse({status: 201, type: createAssetReposnse})
  @Post('create')
  createAsset(@Body() dto: WatchListDto, @Req() request): Promise<createAssetReposnse> {
    const user = request.user
    return this.watchlistService.createAsset(user, dto)
  }


  
   @UseGuards(JwtAuthGuard)
   @ApiTags('API')
   @ApiResponse({status: 200})
  @Delete('')
  deleteAsset(@Query('id') assetId: string,  @Req() request): Promise<boolean> {
    const {id} = request.user
    return this.watchlistService.deleteAsset(id, assetId)
  }

}
