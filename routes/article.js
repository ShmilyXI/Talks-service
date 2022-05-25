const router = require('koa-router')();

router.prefix('/article');

router.get('/latest-list', function (ctx, next) {
  ctx.body = {
    retCode: 0,
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
    retCode: 0,
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
    retCode: 0,
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

module.exports = router;
