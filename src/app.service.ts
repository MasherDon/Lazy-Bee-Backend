import { Injectable } from '@nestjs/common';
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { GamesInterface } from './interface/games.interface';
import { AboutInterface } from './interface/about.interface';

@Injectable()
export class AppService {
  async getGames(): Promise<GamesInterface> {
    const directoryPath = join(__dirname, '..', 'games');
    const directory = readdirSync(directoryPath);
    const textArray = [];

    for (const game of directory) {
      if (!/[.]txt$/.test(game)) {
        const files = readdirSync(join(directoryPath, game));
        const project = {
          image: '',
          title: '',
          text: '',
          game: '',
          linkGoogle: '',
          linkYandex: '',
        };
        for (const file of files) {
          if (/[.]txt$/.test(file)) {
            const text = readFileSync(join(directoryPath, game, file), 'utf8');
            project.title = text.match(/.+/)[0];
            project.linkGoogle = text.match(/https:\/\/play.google.+/)[0];
            project.linkYandex = text.match(/https:\/\/yandex.+.+/)[0];
            project.text = text.slice(project.title.length + project.linkGoogle.length + project.linkYandex.length + 5,);
            project.game = game;
          } else {
            project.image = file;
          }
        }
        textArray.push(project);
      }
    }

    return { games: textArray };
  }

  async getAbout(): Promise<AboutInterface> {
    const directoryPath = join(__dirname, '..', 'games');
    const directory = readdirSync(directoryPath);
    let text;
    for (const game of directory) {
      if (/[.]txt$/.test(game)) {
        text = readFileSync(join(directoryPath, game), 'utf8');
      }
    }
    return { about: text };
  }
}
