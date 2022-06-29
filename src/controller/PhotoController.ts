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

@JsonController('/photo')
export default class PhotoController {
  // 获取照片列表
  @Post('/gallery-photo-list')
  async galleryPhotoList(@Body() data: any): Promise<any> {
    // 获取随机整数
    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值
    }
    // 获取随机色值
    const getRandomColor = () =>
      '#' +
      ('00000' + ((Math.random() * 0x1000000) << 0).toString(16)).substr(-6);
    return {
      code: '0',
      total: 5,
      list: new Array(Number(70)).fill(null).map((_, index) => {
        const width = 400 + getRandomIntInclusive(20, 500);
        const height = 300 + getRandomIntInclusive(10, 1000);
        return {
          id: `${index}`,
          userId: `${index}`,
          title: `Title${index + 1}`,
          description: `description123123211`,
          src: `https://via.placeholder.com/${width}x${height}`,
          // src: `https://www.dmoe.cc/random.php`,
          width,
          height,
          placeholderSrc: `https://via.placeholder.com/${width}x${height}?text=placeholder`,
          avatar: 'https://via.placeholder.com/32',
          author: `test${index + 1}`,
          workCount: 1000 + index * 10,
          answerCount: 20 + index,
          date: new Date(),
          dateStr: '2022年5月21日 21:00:21',
          subjectColor: getRandomColor(),
        };
      }),
    };
  }

  // 获取照片详情
  @Get('/photo-detail-info')
  async photoDetailInfo(
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
