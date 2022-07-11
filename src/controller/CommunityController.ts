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
import CommunityModel from '../model/CommunityModel';
import * as CommunityTypes from '../types/CommunityTypes';

@JsonController('/community')
export default class CommunityController {
  // 获取照片列表
  @Post('/gallery-photo-list')
  async galleryCommunityList(@Body() data: any): Promise<any> {
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
      retCode:'0',
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

  // 最新信息列表
  @Get('/latest-list')
  async latestList(
    @Ctx() ctx: Context,
    @QueryParams() data: any,
  ): Promise<any> {
    return {
      retCode:'0',
      total: 10,
      list: new Array(Number(25)).fill(null).map((_, index) => ({
        avatar: 'https://via.placeholder.com/150/666666?Text=avatar',
        avatarLink: '/avatarLink',
        tag: 'Featured',
        title: `${
          index + 1
        }-Long live Tookapic 💪 The announcement of the new owner 🎉`,
        link: '/link' + index,
        author: 'Test author',
        authorLink: '/authorLink',
        date: 'Feb 21st, 2022',
        answerCount: index,
        answerList: [
          {
            avatar: 'https://via.placeholder.com/150/ff0000?Text=answer1',
            link: '/answer1',
          },
          {
            avatar: 'https://via.placeholder.com/150/ffff00?Text=answer2',
            link: '/answer2',
          },
          {
            avatar: 'https://via.placeholder.com/150/0000ff?Text=answer3',
            link: '/answer3',
          },
        ],
      })),
    };
  }

  // 获取主要贡献者列表
  @Get('/top-contributor-list')
  async topContributorList(
    @Ctx() ctx: Context,
    @QueryParams() data: any,
  ): Promise<any> {
    return {
      retCode:'0',
      total: 10,
      list: new Array(Number(10)).fill(null).map((_, index) => ({
        avatar: 'https://via.placeholder.com/150/999999?Text=contributors',
        link: '/link' + index,
        name: `${index + 1}-Test author`,
        answerCount: index,
      })),
    };
  }

  // 获取没有回复的列表
  @Get('/unanswered-talk-list')
  async unansweredTalkList(
    @Ctx() ctx: Context,
    @QueryParams() data: any,
  ): Promise<any> {
    return {
      retCode:'0',
      total: 5,
      list: new Array(Number(5)).fill(null).map((_, index) => ({
        avatar: 'https://via.placeholder.com/150/999999?Text=contributors',
        articleTitle: `${index + 1}-ArticleTitle`,
        articleLink: '/link' + index,
        author: 'Test author',
        authorLink: '/authorLink',
        answerCount: 0,
      })),
    };
  }

  // 获取帖子详情
  @Get('/detail-info')
  async detailInfo(
    @Ctx() ctx: Context,
    @QueryParams() data: any,
  ): Promise<any> {
    return {
      retCode:'0',
      data: {
        title: 'Test title',
        avatarSrc: 'https://via.placeholder.com/48x48',
        authorId: '1',
        authorName: 'test name',
        date: '2022-06-07T14:05:33+00:00',
        content: '<div><h1>Test content</h1></div>',
        commentList: [
          {
            avatarSrc: 'https://via.placeholder.com/24x24',
            authorName: 'comment1',
            authorId: 1,
            content:
              '12313131qeqweqe12313131qeqweqe12313131qeqweqe12313131qeqweqe12313131qeqweqe12313131qeqweqe12313131qeqweqe',
            date: '2022-06-03T14:05:33+00:00',
            likes: 5,
            commentList: [
              {
                avatarSrc: 'https://via.placeholder.com/24x24',
                authorName: 'comment-child-1',
                authorId: 1,
                content: '12313131qeqweqe',
                date: '2022-06-01T14:05:33+00:00',
                likes: 5,
              },
              {
                avatarSrc: 'https://via.placeholder.com/24x24',
                authorName: 'comment-child-2',
                authorId: 1,
                content:
                  'qeqweqeqeasdasdasdasdcxzczxczzxcasd asda sdsad adas asd asdadsa sa',
                date: '2022-06-02T14:05:33+00:00',
                likes: 3,
              },
            ],
          },
          {
            avatarSrc: 'https://via.placeholder.com/24x24',
            authorName: 'comment2',
            authorId: 1,
            content: 'ioppippopkpkopkppkokpok',
            date: '2022-06-07T14:05:33+00:00',
            likes: 5,
            commentList: [
              {
                avatarSrc: 'https://via.placeholder.com/24x24',
                authorName: 'comment-child-1',
                authorId: 1,
                content: '12313131qeqweqe',
                date: '2022-06-08T14:05:33+00:00',
                likes: 5,
              },
              {
                avatarSrc: 'https://via.placeholder.com/24x24',
                authorName: 'comment-child-2',
                authorId: 1,
                content:
                  'qeqweqeqeasdasdasdasdcxzczxczzxcasd asda sdsad adas asd asdadsa sa',
                date: '2022-06-09T14:05:33+00:00',
                likes: 3,
              },
            ],
          },
          {
            avatarSrc: 'https://via.placeholder.com/24x24',
            authorName: 'comment2',
            authorId: 1,
            content: 'ioppippopkpkopkppkokpok',
            date: '2022-06-11T14:05:33+00:00',
            likes: 5,
            commentList: [
              {
                avatarSrc: 'https://via.placeholder.com/24x24',
                authorName: 'comment-child-1',
                authorId: 1,
                content: '12313131qeqweqe',
                date: '2022-06-12T14:05:33+00:00',
                likes: 5,
              },
              {
                avatarSrc: 'https://via.placeholder.com/24x24',
                authorName: 'comment-child-2',
                authorId: 1,
                content:
                  'qeqweqeqeasdasdasdasdcxzczxczzxcasd asda sdsad adas asd asdadsa sa',
                date: '2022-06-13T14:05:33+00:00',
                likes: 3,
              },
            ],
          },
          {
            avatarSrc: 'https://via.placeholder.com/24x24',
            authorName: 'comment2',
            authorId: 1,
            content: 'ioppippopkpkopkppkokpok',
            date: '2022-06-14T14:05:33+00:00',
            likes: 5,
            commentList: [
              {
                avatarSrc: 'https://via.placeholder.com/24x24',
                authorName: 'comment-child-1',
                authorId: 1,
                content: '12313131qeqweqe',
                date: '2022-06-15T14:05:33+00:00',
                likes: 5,
              },
              {
                avatarSrc: 'https://via.placeholder.com/24x24',
                authorName: 'comment-child-2',
                authorId: 1,
                content:
                  'qeqweqeqeasdasdasdasdcxzczxczzxcasd asda sdsad adas asd asdadsa sa',
                date: '2022-06-07T14:05:33+00:16',
                likes: 3,
              },
            ],
          },
          {
            avatarSrc: 'https://via.placeholder.com/24x24',
            authorName: 'comment2',
            authorId: 1,
            content: 'ioppippopkpkopkppkokpok',
            date: '2022-06-07T14:05:33+00:11',
            likes: 5,
            commentList: [
              {
                avatarSrc: 'https://via.placeholder.com/24x24',
                authorName: 'comment-child-1',
                authorId: 1,
                content: '12313131qeqweqe',
                date: '2022-06-07T14:05:33+00:22',
                likes: 5,
              },
              {
                avatarSrc: 'https://via.placeholder.com/24x24',
                authorName: 'comment-child-2',
                authorId: 1,
                content:
                  'qeqweqeqeasdasdasdasdcxzczxczzxcasd asda sdsad adas asd asdadsa sa',
                date: '2022-06-07T14:05:33+00:33',
                likes: 3,
              },
            ],
          },
          {
            avatarSrc: 'https://via.placeholder.com/24x24',
            authorName: 'comment2',
            authorId: 1,
            content: 'ioppippopkpkopkppkokpok',
            date: '2022-06-07T14:05:33+00:44',
            likes: 5,
            commentList: [
              {
                avatarSrc: 'https://via.placeholder.com/24x24',
                authorName: 'comment-child-1',
                authorId: 1,
                content: '12313131qeqweqe',
                date: '2022-06-07T14:05:33+00:55',
                likes: 5,
              },
              {
                avatarSrc: 'https://via.placeholder.com/24x24',
                authorName: 'comment-child-2',
                authorId: 1,
                content:
                  'qeqweqeqeasdasdasdasdcxzczxczzxcasd asda sdsad adas asd asdadsa sa',
                date: '2022-06-07T14:05:33+00:66',
                likes: 3,
              },
            ],
          },
        ],
      },
    };
  }
}
