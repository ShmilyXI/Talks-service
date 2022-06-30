import {
  JsonController,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Ctx,
  QueryParams,
} from 'routing-controllers';

import { setTime } from '../utils/util';
import { Context } from 'koa';
import PhotoModel from '../model/PhotoModel';
import * as PhotoTypes from '../types/PhotoTypes';
import _ from 'lodash';

@JsonController('/photo')
export default class PhotoController {
  // 获取照片列表
  @Post('/gallery-photo-list')
  async galleryPhotoList(@Body() data: any): Promise<any> {
    const { pageIndex, pageSize } = data || {};
    if (!pageIndex || !pageSize) {
      return {
        code: '-1',
        message: '参数错误',
      };
    }
    const photoData = await PhotoModel.getPhotoList(pageIndex, pageSize);
    const list = (photoData?.list).map((item: any) => ({
      ..._.omit(item, [
        'exif_aperture',
        'exif_brand',
        'exif_focal_length',
        'exif_iso',
        'exif_model',
        'exif_shutter_speed',
        'user_id',
        'author_name',
        'view_count',
        'avatar_url',
        'comment_id',
        'gallery_id',
        'theme_color',
        'create_date',
        'update_date'
      ]),
      userId: item.user_id,
      authorName: item.author_name,
      viewCount: item.view_count,
      avatarUrl: item.avatar_url,
      commentId: item.comment_id,
      galleryId: item.gallery_id,
      themeColor: item.theme_color,
      createDate: item.create_date,
      updateDate: item.update_date,
    }));
    return {
      code: '0',
      data: {
        list,
        total: photoData.total || 0,
      },
    };
  }

  // 获取照片详情
  @Get('/photo-detail-info')
  async photoDetailInfo(
    @Ctx() ctx: Context,
    @QueryParams() params: PhotoTypes.PhotoDetailInfoRequest,
  ): Promise<PhotoTypes.PhotoDetailInfoResponse> {
    const photoInfo = (await PhotoModel.getPhotoInfo(params?.id))?.[0] || {};
    const tags = photoInfo.tags?.split(',') || [];
    const exifData = {
      brand: photoInfo.exif_brand,
      model: photoInfo.exif_model,
      aperture: photoInfo.exif_aperture,
      focalLength: photoInfo.exif_focal_length,
      shutterSpeed: photoInfo.exif_shutter_speed,
      iso: photoInfo.exif_iso,
    };
    const data = {
      id: photoInfo.id,
      userId: photoInfo.user_id,
      commentId: photoInfo.comment_id,
      galleryId: photoInfo.gallery_id,
      src: photoInfo.src,
      width: photoInfo.width,
      height: photoInfo.height,
      title: photoInfo.title,
      description: photoInfo.description,
      viewCount: photoInfo.view_count,
      themeColor: photoInfo.theme_color,
      place: photoInfo.place,
      tags,
      mood: photoInfo.mood,
      exifData,
      createDate: photoInfo.create_date,
      updateDate: photoInfo.update_date,
    };
    return {
      code: '0',
      data,
    };
  }
  // 获取评论列表
  @Get('/photo-detail-comments')
  async photoDetailComments(
    @Ctx() ctx: Context,
    @QueryParams() data: any,
  ): Promise<any> {
    return {
      code: '0',
      data: {
        id: '1',
        authorName: 'authorName',
        authorId: 123,
        avatarSrc: 'https://via.placeholder.com/48x48',
        title: 'articleTitle',
        descriptionBody:
          "<div style='font-size: 20px'><p>asdadasdaqweqeqeqwqe</p><p>1231231312313123132</p></div>",
        linkTags: [
          {
            name: '#111',
            link: '/111',
          },
          {
            name: '#222',
            link: '/222',
          },
          {
            name: '#333',
            link: '/333',
          },
          {
            name: '#444',
            link: '/444',
          },
          {
            name: '#555',
            link: '/555',
          },
        ],
        mood: 'good',
        location: {
          name: '湖南长沙',
          value: 'hunan changsha',
        },
        view: 33,
        galleries: [{}],
        exifData: {
          brand: 'NIKON CORPORATION',
          model: 'NIKON D5200',
          aperture: 'ƒ/10.0',
          focalLength: '55mm',
          shutterSpeed: '1/400s',
          iso: '100',
        },
        photoList: [
          {
            src: 'https://via.placeholder.com/450x300?text=1',
            width: 450,
            height: 300,
            backgroundColor: '#000000',
            timeSpan: 'Yesterday',
            date: '2022-06-07T14:05:33+00:00',
          },
          {
            src: 'https://via.placeholder.com/450x300?text=2',
            width: 450,
            height: 300,
            backgroundColor: '#000000',
            timeSpan: 'Week',
            date: '2022-06-07T14:05:33+00:00',
          },
          {
            src: 'https://via.placeholder.com/450x300?text=3',
            width: 450,
            height: 300,
            backgroundColor: '#000000',
            timeSpan: 'Month',
            date: '2022-06-07T14:05:33+00:00',
          },
          {
            src: 'https://via.placeholder.com/450x300?text=4',
            width: 450,
            height: 300,
            backgroundColor: '#000000',
            timeSpan: '1 year',
            date: '2022-06-07T14:05:33+00:00',
          },
          {
            src: 'https://via.placeholder.com/450x300?text=5',
            width: 450,
            height: 300,
            backgroundColor: '#000000',
            timeSpan: '2 year',
            date: '2022-06-07T14:05:33+00:00',
          },
        ],
        date: '2022-06-07T14:05:33+00:00',
      },
    };
  }
  // 获取里程碑列表
  @Get('/photo-milestone-list')
  async photoMilestoneList(
    @Ctx() ctx: Context,
    @QueryParams() data: any,
  ): Promise<any> {
    return {
      code: '0',
      data: {
        id: '1',
        authorName: 'authorName',
        authorId: 123,
        avatarSrc: 'https://via.placeholder.com/48x48',
        title: 'articleTitle',
        descriptionBody:
          "<div style='font-size: 20px'><p>asdadasdaqweqeqeqwqe</p><p>1231231312313123132</p></div>",
        linkTags: [
          {
            name: '#111',
            link: '/111',
          },
          {
            name: '#222',
            link: '/222',
          },
          {
            name: '#333',
            link: '/333',
          },
          {
            name: '#444',
            link: '/444',
          },
          {
            name: '#555',
            link: '/555',
          },
        ],
        mood: 'good',
        location: {
          name: '湖南长沙',
          value: 'hunan changsha',
        },
        view: 33,
        galleries: [{}],
        exifData: {
          brand: 'NIKON CORPORATION',
          model: 'NIKON D5200',
          aperture: 'ƒ/10.0',
          focalLength: '55mm',
          shutterSpeed: '1/400s',
          iso: '100',
        },
        photoList: [
          {
            src: 'https://via.placeholder.com/450x300?text=1',
            width: 450,
            height: 300,
            backgroundColor: '#000000',
            timeSpan: 'Yesterday',
            date: '2022-06-07T14:05:33+00:00',
          },
          {
            src: 'https://via.placeholder.com/450x300?text=2',
            width: 450,
            height: 300,
            backgroundColor: '#000000',
            timeSpan: 'Week',
            date: '2022-06-07T14:05:33+00:00',
          },
          {
            src: 'https://via.placeholder.com/450x300?text=3',
            width: 450,
            height: 300,
            backgroundColor: '#000000',
            timeSpan: 'Month',
            date: '2022-06-07T14:05:33+00:00',
          },
          {
            src: 'https://via.placeholder.com/450x300?text=4',
            width: 450,
            height: 300,
            backgroundColor: '#000000',
            timeSpan: '1 year',
            date: '2022-06-07T14:05:33+00:00',
          },
          {
            src: 'https://via.placeholder.com/450x300?text=5',
            width: 450,
            height: 300,
            backgroundColor: '#000000',
            timeSpan: '2 year',
            date: '2022-06-07T14:05:33+00:00',
          },
        ],
        date: '2022-06-07T14:05:33+00:00',
      },
    };
  }
}
