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
import PhotoModel from '../model/PhotoModel';
import * as PhotoTypes from '../types/PhotoTypes';
import _ from 'lodash';
import path from 'path';
import { PicGo } from 'picgo';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import {
  GetGalleryPhotoListRequest,
  PublishPhotoRequest,
  PublishPhotoResponse,
  UploadPhotoResponse,
} from '../types/PhotoTypes';
const getImageColors = require('get-image-colors');
import { exiftool } from 'exiftool-vendored';
import UserModel from '../model/UserModel';
import { formatPhotoInfo } from '../utils/util';
import CommentModel from '../model/CommentModel';

@JsonController('/photo')
export default class PhotoController {
  // 获取照片列表
  @Post('/gallery-photo-list')
  async galleryPhotoList(
    @HeaderParams() header,
    @Body() data: GetGalleryPhotoListRequest,
  ): Promise<PhotoTypes.GetGalleryPhotoListResponse> {
    const { pageIndex, pageSize } = data || {};
    if (!pageIndex || !pageSize) {
      return {
        retCode: '-1',
        message: '参数错误',
      };
    }
    const token = header.authorization;
    const tokenInfo: any = await tools.verToken(token);
    const photoData = await PhotoModel.getPhotoList(pageIndex, pageSize);

    const list = photoData?.list;
    for (let index = 0; index < list.length; index++) {
      const item = list[index];
      // 获取照片评论数量
      const commentCount = (await CommentModel.getCommentListByPhotoId(item.id))
        ?.length;
      // 获取所有用户与当前照片点赞信息
      const likedAllInfo = await UserModel.getUserLikedInfo(
        0,
        item.id,
        null,
        1,
      );
      // 获取当前用户与当前评论点赞信息
      const curLikedInfo = likedAllInfo.find(
        (v) => v.user_id === tokenInfo?.id,
      );
      if (curLikedInfo?.id) {
        list[index].likedStatus = curLikedInfo.liked_status;
      }
      // 当前作品点赞数量
      if (likedAllInfo?.length) {
        list[index].liked_count = likedAllInfo.length;
      }
      list[index] = {
        ..._.omit(item, [
          'exif_aperture',
          'exif_brand',
          'exif_focal_length',
          'exif_iso',
          'exif_model',
          'exif_shutter_speed',
          'user_id',
          'author_name',
          'avatar_url',
          'view_count',
          'place_id',
          'comment_id',
          'gallery_id',
          'theme_color',
          'provincial_name',
          'city_name',
          'area_name',
          'create_time',
          'update_time',
        ]),
        userId: item.user_id,
        authorName: item.author_name || item.author_username,
        viewCount: item.view_count,
        placeId: item.place_id,
        avatarUrl: item.avatar_url,
        commentId: item.comment_id,
        galleryId: item.gallery_id,
        themeColor: item.theme_color,
        commentCount,
        provincialName: item.provincial_name,
        cityName: item.city_name,
        areaName: item.area_name,
        createDate: item.create_time,
        updateDate: item.update_time,
      };
    }
    return {
      retCode: '0',
      data: {
        list,
        total: photoData.total || 0,
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
    const token = header.authorization;
    const tokenInfo: any = await tools.verToken(token);
    const photoInfo = (await PhotoModel.getPhotoInfo(+params?.id))[0];

    const photoList =
      (await PhotoModel.getPhotoListByUserId(photoInfo?.user_id)) || [];

    const index = _.findIndex(photoList, (v) => v.id === +params?.id);

    // 获取当前用户与当前作品点赞信息
    const likedInfo = (
      await UserModel.getUserLikedInfo(0, +params?.id, tokenInfo?.id)
    )[0];
    if (likedInfo?.id) {
      photoList[index].likedStatus = likedInfo.liked_status;
    }

    const data = {
      index,
      list: _.map(photoList, (v) => formatPhotoInfo(v)),
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
    const photoList = (await PhotoModel.getPhotoListByUserId(+id)) || [];

    for (let index = 0; index < photoList.length; index++) {
      const item = photoList[index];
      // 获取照片评论数量
      const commentCount = (await CommentModel.getCommentListByPhotoId(item.id))
        ?.length;
      photoList[index].commentCount = commentCount;
      // 获取所有用户与当前照片点赞信息
      const likedAllInfo = await UserModel.getUserLikedInfo(
        0,
        item.id,
        null,
        1,
      );
      // 获取当前用户与当前评论点赞信息
      const curLikedInfo = likedAllInfo.find(
        (v) => v.user_id === tokenInfo?.id,
      );
      if (curLikedInfo?.id) {
        photoList[index].likedStatus = curLikedInfo.liked_status;
      }
      // 当前作品点赞数量
      if (likedAllInfo?.length) {
        photoList[index].liked_count = likedAllInfo.length;
      }
    }

    const data = {
      list: _.map(photoList, (v) => formatPhotoInfo(v)),
    };
    return {
      retCode: '0',
      data,
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
    const {
      url,
      width,
      height,
      title,
      themeColor,
      photoExifInfo = {},
    } = data || {};
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
    const values = {
      ...data,
      ...photoExifInfo,
      tags: (data?.tags || [])?.join(','),
      userId: tokenInfo?.id,
    };
    const result = await PhotoModel.insertPhotoInfo(values);

    return {
      retCode: '0',
      data: { id: result?.insertId },
    };
  }
}
