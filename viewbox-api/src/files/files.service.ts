import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {

  async saveFile(file: Express.Multer.File): Promise<string> {
    try {
      file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
      const fileName = uuid.v4() + path.extname(file.originalname);
      //const filePath = path.resolve(__dirname, '..', process.env.FILES_STORAGE || 'files_storage');
      const filePath = path.resolve('D:/', process.env.FILES_STORAGE || 'files_storage');

      try {
        await fs.stat(filePath);
      } catch {
        await fs.mkdir(filePath, { recursive: true });
      }

      await fs.writeFile(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteFile(name: string) {
    const filePath = path.resolve('D://', '..', process.env.FILES_STORAGE || 'files_storage');
    try {
      await fs.rm(path.join(filePath, name));
    } catch {
      throw new HttpException('Произошла ошибка при удалении файла', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
