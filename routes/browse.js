const router = require('koa-router')();

router.prefix('/browse');

router.post('/gallery-photo-list', function (ctx, next) {
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值
  }

  ctx.body = {
    retCode: 0,
    total: 5,
    list: new Array(Number(200)).fill(null).map((_, index) => {
      const width = 400 + getRandomIntInclusive(20, 500);
      const height = 300 + getRandomIntInclusive(10, 1000);
      return {
        title: `Title${index + 1}`,
        description: `description123123211`,
        src: `https://via.placeholder.com/${width}x${height}`,
        width,
        height,
        placeholderSrc: `https://via.placeholder.com/${width}x${height}?text=placeholder`,
        avatar: 'https://via.placeholder.com/32',
        author: `test${index + 1}`,
        workCount: 1000 + index * 10,
        answerCount: 20 + index,
        date: new Date(),
        dateStr: '2022年5月21日 21:00:21',
      };
    }),
  };
});

module.exports = router;
