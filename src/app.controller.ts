import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { GamesInterface } from './interface/games.interface';
import { join } from 'path';
import { createReadStream } from 'fs';
import { AboutInterface } from './interface/about.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('games')
  async getGames(): Promise<GamesInterface> {
    return await this.appService.getGames();
  }

  @Get('images/:game/:name')
  getImage(
    @Res() response: Response,
    @Param('name') name: string,
    @Param('game') game: string,
  ) {
    const directoryPath = join(__dirname, '..', 'games');
    const file = createReadStream(join(directoryPath, game, name));
    file.pipe(response);
  }

  @Get('about')
  async getAbout(): Promise<AboutInterface> {
    return await this.appService.getAbout();
  }
}
