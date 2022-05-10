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
      link: '/link',
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

module.exports = router;
