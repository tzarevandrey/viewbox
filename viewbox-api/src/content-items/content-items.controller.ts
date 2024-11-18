import { Body, Controller, Get, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ContentItemCreateDto } from './dto/content-items.create.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ContentItemsService } from './content-items.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('content')
export class ContentItemsController {

    constructor(
        private contentService: ContentItemsService,
    ) {}

    @Get()
    async getAll() {
        return await this.contentService.getAll();
    }

    @Get('test')
    async getTest(@Req() req: Request) {
        return req['user'];
    }

    @UseInterceptors(FileInterceptor('file'))
    @Post()
    async addContent(@Body() dto: ContentItemCreateDto, @UploadedFile() file?: Express.Multer.File) {        
        return await this.contentService.addContent(dto, file);
    }

}
