import {
  JsonController,
  Body,
  Get,
  Post,
  QueryParams,
  UploadedFile,
  HeaderParams,
} from 'routing-controllers';

import tools from '../utils/tool';
import * as PhotoTypes from '../types/PhotoTypes';
import _ from 'lodash';
import path from 'path';
import { PicGo } from 'picgo';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import {
  GetGalleryPhotoListRequest,
  GetGalleryPhotoListResponse,
  PhotoList,
  PublishPhotoRequest,
  PublishPhotoResponse,
  UpdatePhotoRequest,
  UpdatePhotoResponse,
  UploadPhotoResponse,
} from '../types/PhotoTypes';
const getImageColors = require('get-image-colors');
import { exiftool } from 'exiftool-vendored';
import Models from '../utils/mysql/db';
@JsonController('/photo')
export default class PhotoController {
  // 获取照片列表
  @Post('/gallery-photo-list')
  async galleryPhotoList(
    @HeaderParams() header,
    @Body() data: GetGalleryPhotoListRequest,
  ): Promise<GetGalleryPhotoListResponse> {
    const { pageIndex, pageSize } = data || {};
    if (!pageIndex || !pageSize) {
      return {
        retCode: '-1',
        message: '参数错误',
      };
    }
    const token = header.authorization;
    const tokenInfo: any = await tools.verToken(token);
    const { count, rows } = await Models.photos.findAndCountAll({
      where: { is_delete: 0 },
      order: [['update_time', 'desc']],
      include: [
        {
          model: Models.users,
          required: false,
          as: 'user',
          attributes: ['display_name', 'username', 'telephone', 'avatar_url'],
        },
      ],
      nest: true,
      raw: true,
      limit: +pageSize,
      offset: +(pageSize * (pageIndex - 1)),
    });
    const photoList: PhotoList[] = rows || [];
    for (let index = 0; index < photoList.length; index++) {
      const item = photoList[index];
      // 获取照片评论数量
      const commentCount = await Models.comments.count({
        where: { photo_id: item.id },
      });
      photoList[index].commentCount = commentCount;
      // 获取当前用户与当前照片点赞信息
      const likedInfo = await Models.user_likes.findOne({
        where: { liked_id: item.id, user_id: tokenInfo.id, liked_type: 0 },
        raw: true,
      });
      if (likedInfo?.id) {
        photoList[index].likedStatus = likedInfo.liked_status;
      }
      // 获取当前作品点赞数量
      const likedCount = await Models.user_likes.count({
        where: {
          liked_id: item.id,
        },
      });
      photoList[index].likedCount = likedCount;

      // 获取当前用户与当前照片收藏信息
      const favoriteInfo = await Models.photo_favorites.findOne({
        where: { photo_id: item.id, user_id: tokenInfo.id },
        raw: true,
      });
      if (favoriteInfo?.id) {
        photoList[index].favoriteStatus = favoriteInfo.favorite_status;
      }
      // 获取当前作品收藏数量
      const favoriteCount = await Models.photo_favorites.count({
        where: {
          photo_id: item.id,
        },
      });
      photoList[index].favoriteCount = favoriteCount;
    }
    return {
      retCode: '0',
      data: {
        list: photoList,
        total: count,
      },
    };
  }

  // 获取照片详情
  @Get('/photo-detail-info')
  async photoDetailInfo(
    @HeaderParams() header,
    @QueryParams() params: PhotoTypes.PhotoDetailInfoRequest,
  ): Promise<PhotoTypes.PhotoDetailInfoResponse> {
    if (_.isNil(params.id)) {
      return { retCode: '-1', message: '参数错误' };
    }
    const id = +params.id;
    const token = header.authorization;
    const tokenInfo: any = await tools.verToken(token);
    const photoInfo = await Models.photos.findOne({
      where: { id },
      raw: true,
    });
    const photoList: PhotoList[] = await Models.photos.findAll({
      where: { user_id: photoInfo?.user_id, is_delete: 0 },
      include: {
        model: Models.users,
        required: false,
        as: 'user',
        attributes: ['display_name', 'username', 'telephone', 'avatar_url'],
      },
      nest: true, // 展开关联表数据为对象
      raw: true,
    });
    const index = _.findIndex(photoList, (v) => v.id === id);

    // 获取当前用户与当前作品点赞信息
    const likedInfo = await Models.user_likes.findOne({
      where: { liked_id: id, user_id: tokenInfo?.id, liked_type: 0 },
      raw: true,
    });
    if (likedInfo?.id) {
      photoList[index].likedStatus = likedInfo.liked_status;
    }
    // 获取当前用户与当前作品收藏信息
    const favoriteInfo = await Models.photo_favorites.findOne({
      where: { photo_id: id, user_id: tokenInfo?.id },
      raw: true,
    });

    if (favoriteInfo?.id) {
      photoList[index].favoriteStatus = favoriteInfo.favorite_status;
    }

    const data = {
      index,
      list: photoList,
    };
    return {
      retCode: '0',
      data,
    };
  }
  // 获取照片列表,根据用户id
  @Get('/get-photo-list-by-user-id')
  async getPhotoListByUserId(
    @HeaderParams() header,
    @QueryParams() params: PhotoTypes.GetPhotoListByUserIdRequest,
  ): Promise<PhotoTypes.GetPhotoListByUserIdResponse> {
    const { id } = params;
    if (_.isNil(id)) {
      return { retCode: '-1', message: '参数错误' };
    }
    const token = header.authorization;
    const tokenInfo: any = await tools.verToken(token);
    const photoList: PhotoList[] = await Models.photos.findAll({
      where: { user_id: id },
      include: {
        model: Models.users,
        required: false,
        as: 'user',
        attributes: ['display_name', 'username', 'telephone', 'avatar_url'],
      },
      nest: true,
      raw: true,
    });

    for (let index = 0; index < photoList.length; index++) {
      const item = photoList[index];
      // 获取照片评论数量
      const commentCount = await Models.comments.count({
        where: { photo_id: item.id },
      });
      photoList[index].commentCount = commentCount;
      // 获取当前用户与当前照片点赞信息
      const likedInfo = await Models.user_likes.findOne({
        where: { liked_id: item.id, user_id: tokenInfo.id, liked_type: 0 },
        raw: true,
      });
      if (likedInfo?.id) {
        photoList[index].likedStatus = likedInfo.liked_status;
      }
      // 获取当前作品点赞数量
      const likedCount = await Models.user_likes.count({
        where: {
          liked_id: item.id,
        },
      });
      photoList[index].likedCount = likedCount;

      // 获取当前用户与当前照片收藏信息
      const favoriteInfo = await Models.photo_favorites.findOne({
        where: { photo_id: item.id, user_id: tokenInfo.id },
        raw: true,
      });
      if (favoriteInfo?.id) {
        photoList[index].favoriteStatus = favoriteInfo.favorite_status;
      }
      // 获取当前作品收藏数量
      const favoriteCount = await Models.photo_favorites.count({
        where: {
          photo_id: item.id,
        },
      });
      photoList[index].favoriteCount = favoriteCount;
    }

    return {
      retCode: '0',
      data: {
        list: photoList,
      },
    };
  }

  // 上传照片
  @Post('/upload-photo')
  async uploadPhoto(
    @UploadedFile('UploadForm[file]') file: any,
  ): Promise<UploadPhotoResponse> {
    try {
      const picgo = new PicGo(path.join(__dirname, '../../picgo.config.json'));
      const defaultFileName = file.originalname;
      const fileName = `${uuidv4(6)}-${defaultFileName}`;
      // 缓存到本地,上传后删除
      await fs.writeFileSync(fileName, file.buffer);

      // 获取照片exif信息
      const photoExifTags = await exiftool.read(fileName);
      const photoExifInfo = {
        brand: photoExifTags?.Make,
        model: photoExifTags?.Model,
        aperture: photoExifTags?.ApertureValue,
        focalLength: photoExifTags?.FocalLength,
        shutterSpeed: photoExifTags?.ShutterSpeed,
        iso: photoExifTags?.ISO,
      };

      // 获取主题色
      const themeColor = (
        await getImageColors(file.buffer, {
          count: 1,
          type: file.mimetype,
        })
      )?.map((color) => color.hex());

      // 缓存到本地,上传后删除
      await fs.writeFileSync(fileName, file.buffer);
      const response = new Promise((resolve) => {
        picgo.on('finished', (ctx) => {
          resolve({
            retCode: '0',
            data: {
              themeColor: themeColor?.[0],
              photoExifInfo,
              ...ctx?.output?.[0],
            },
          });
        });
        picgo.on('notification', (notice) => {
          resolve({
            retCode: '-1',
            message: notice?.title,
          });
        });
      });
      await picgo.upload([fileName]);
      await fs.unlinkSync(fileName);
      return response;
    } catch (error) {
      return { retCode: '-1', message: error?.message };
    }
  }

  // 新增发布照片
  @Post('/publish-photo')
  async publishPhoto(
    @HeaderParams() header,
    @Body() data: PublishPhotoRequest,
  ): Promise<PublishPhotoResponse> {
    const token = header.authorization;
    const { url, width, height, title, themeColor } = data || {};
    if (
      _.isNil(token) ||
      _.isNil(url) ||
      _.isNil(width) ||
      _.isNil(height) ||
      _.isNil(title) ||
      _.isNil(themeColor)
    ) {
      return { retCode: '-1', message: '参数错误' };
    }
    const tokenInfo: any = await tools.verToken(token);
    const values = _.omitBy(
      {
        user_id: tokenInfo?.id,
        url: data?.url,
        width: data?.width,
        height: data?.height,
        title: data?.title,
        description: data?.description,
        theme_color: data?.themeColor,
        place: data?.place,
        place_id: data?.placeId,
        location: data?.location,
        provincial_name: data?.provincialName,
        city_name: data?.cityName,
        area_name: data?.areaName,
        tags: data?.tags,
        mood: data?.mood,
        shooting_date: data?.shootingDate,
        exif_brand: data?.photoExifInfo?.brand,
        exif_model: data?.photoExifInfo?.model,
        exif_aperture: data?.photoExifInfo?.aperture,
        exif_focal_length: data?.photoExifInfo?.focalLength,
        exif_shutter_speed: data?.photoExifInfo?.shutterSpeed,
        exif_iso: data?.photoExifInfo?.iso,
      },
      _.isNil,
    );

    await Models.photos.create(values);

    return {
      retCode: '0',
    };
  }

  // 编辑照片
  @Post('/update-photo')
  async updatePhoto(
    @Body() data: UpdatePhotoRequest,
  ): Promise<UpdatePhotoResponse> {
    const { id, title } = data || {};
    if (_.isNil(id) || _.isNil(title)) {
      return { retCode: '-1', message: '参数错误' };
    }
    const values = _.omitBy(
      {
        title: data?.title,
        description: data?.description,
        place: data?.place,
        place_id: data?.placeId,
        location: data?.location,
        provincial_name: data?.provincialName,
        city_name: data?.cityName,
        area_name: data?.areaName,
        mood: data?.mood,
        shooting_date: data?.shootingDate,
      },
      _.isNil,
    );

    await Models.photos.update(values, { where: { id: data.id } });

    return {
      retCode: '0',
    };
  }
}
