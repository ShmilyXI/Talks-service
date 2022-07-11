import Router from 'koa-router';
const router = new Router();

router.prefix('/community');

router.get('/latest-list', function (ctx, next) {
  ctx.body = {
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
});

router.get('/top-contributor-list', function (ctx, next) {
  ctx.body = {
    retCode:'0',
    total: 10,
    list: new Array(Number(10)).fill(null).map((_, index) => ({
      avatar: 'https://via.placeholder.com/150/999999?Text=contributors',
      link: '/link' + index,
      name: `${index + 1}-Test author`,
      answerCount: index,
    })),
  };
});

router.get('/unanswered-talk-list', function (ctx, next) {
  ctx.body = {
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
});

router.get('/detail-info', function (ctx, next) {
  ctx.body = {
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
});

module.exports = router;
