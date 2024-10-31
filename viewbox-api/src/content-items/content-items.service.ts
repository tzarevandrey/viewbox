import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ContentItem } from './content-items.model';
import { ImageItem } from './image-items.model';
import { VideoItem } from './video-items.model';
import { WebpageItem } from './webpage-items.model';
import { ContentItemCreateDto } from './dto/content-items.create.dto';
import { FilesService } from 'src/files/files.service';
import { ContentType } from 'src/core/enums/content-types.enum';

@Injectable()
export class ContentItemsService {

    constructor(
        @InjectModel(ContentItem) private contentRepository: typeof ContentItem,
        @InjectModel(ImageItem) private iamgeRepository: typeof ImageItem,
        @InjectModel(VideoItem) private videoRepository: typeof VideoItem,
        @InjectModel(WebpageItem) private webpageRepository: typeof WebpageItem,
        private filesService: FilesService
    ) {}

    async getAll() {
        return await this.contentRepository.findAll({
            include: [{model: ImageItem}, {model: VideoItem}, {model: WebpageItem}]
        });
    }

    async getOne(id: number) {
        return await this.contentRepository.findByPk(id, {
            include: [{model: ImageItem}, {model: VideoItem}, {model: WebpageItem}]
        })
    }

    async addContent(dto: ContentItemCreateDto, file?: Express.Multer.File) {
        const content = await this.contentRepository.create({contentType: dto.contentType, description: dto.description});
        let name = dto.itemName;
        if ([ContentType.Picture, ContentType.Video].includes(Number(dto.contentType))) {
            name = await this.filesService.saveFile(file);
        }
        switch (Number(dto.contentType)) {
            case ContentType.Picture: 
                await this.iamgeRepository.create({
                    name,
                    originalName: file.originalname,
                    contentItemId: content.id
                });
                break;
            case ContentType.Video: 
                await this.videoRepository.create({
                    name,
                    originalName: file.originalname,
                    contentItemId: content.id
                });
                break;
            case ContentType.WebPage: 
                await this.webpageRepository.create({
                    link: name,
                    contentItemId: content.id
                });
                break;
        }
        return content;
    }

    async deleteContent(id: number) {
        const content = await this.contentRepository.findByPk(id, {include: [{model: ImageItem},{model: VideoItem},{model: WebpageItem}]});
        switch(content.contentType) {
            case ContentType.Picture:
                await this.filesService.deleteFile(content.imageItem.name);
                await this.iamgeRepository.destroy({where: {contentItemId: id}});                
                break;
            case ContentType.Video:
                await this.filesService.deleteFile(content.videoItem.name);
                await this.videoRepository.destroy({where: {contentItemId: id}});
                break;
            case ContentType.WebPage:
                await this.webpageRepository.destroy({where: {contentItemId: id}});
                break;
        }
        await this.contentRepository.destroy({where: {id: id}});
    }

}
