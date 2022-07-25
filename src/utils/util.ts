import { FilterXSS, getDefaultWhiteList } from 'xss';
// @ts-ignore
import { getDefaultWhiteList as getDefaultCssWhiteList } from 'cssfilter';
import query from '../sql/query';
import _ from 'lodash';

/**
 * 数据安全处理，防止xss注入
 * @param html
 */
export function xssSafeFilter(html?: string): string {
  if (!html) {
    return '';
  }

  const defaultXssWhiterList = getDefaultWhiteList();
  Object.keys(defaultXssWhiterList).forEach(function (key) {
    // 默认都加style,id属性
    defaultXssWhiterList[key]?.push('style');
    defaultXssWhiterList[key]?.push('id');
  });

  const whiteList = Object.assign(defaultXssWhiterList, {
    html: [],
    head: [],
    meta: ['charset'],
    '!doctype': ['html'],
    style: [],
    body: [],
  });
  const cssWhiteList = Object.assign(getDefaultCssWhiteList(), {
    position: true,
    'line-height': true,
  });
  const options = {
    whiteList,
    css: {
      whiteList: cssWhiteList,
    },
    stripIgnoreTagBody: ['script'],
  }; // 自定义规则
  const myXss = new FilterXSS(options);
  const safeHtml = myXss.process(html);
  return safeHtml;
}

/*
 * title: 设置时间
 * @param {'last_login' | 'create' | 'update'} type 时间字段类型
 */
export const setTime = async (
  id: number,
  type: 'last_login' | 'create' | 'update',
): Promise<any> =>
  await query(
    `UPDATE user SET ${type}_date = '${new Date()}' WHERE id = '${id}';`,
  );

// 获取随机整数
export const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值
};
// 获取随机色值
export const getRandomColor = () =>
  '#' + ('00000' + ((Math.random() * 0x1000000) << 0).toString(16)).substr(-6);

// 下划线转驼峰
export const toHump = (str: string): string =>
  str.replace(/\_(\w)/g, (all, letter) => letter.toUpperCase());

// 驼峰转下划线
export const toLine = (str: string): string =>
  str.replace(/([A-Z])/g, '_$1').toLowerCase();

// 格式化照片字段
export const formatPhotoInfo = (data) => {
  const tags = data?.tags ? data?.tags?.split(',') : [];
  const exifData = {
    brand: data.exif_brand,
    model: data.exif_model,
    aperture: data.exif_aperture,
    focalLength: data.exif_focal_length,
    shutterSpeed: data.exif_shutter_speed,
    iso: data.exif_iso,
  };
  return {
    ..._.omit(data, [
      'exif_aperture',
      'exif_brand',
      'exif_focal_length',
      'exif_iso',
      'exif_model',
      'exif_shutter_speed',
      'user_id',
      'author_name',
      'view_count',
      'place_id',
      'avatar_url',
      'comment_id',
      'gallery_ids',
      'theme_color',
      'provincial_name',
      'city_name',
      'area_name',
      'shooting_date',
      'show_comments',
      'create_time',
      'update_time',
      'tags',
    ]),
    userId: data.user_id,
    authorName: data.author_name || data.author_username,
    avatarUrl: data.avatar_url,
    commentId: data.comment_id,
    placeId: data.place_id,
    galleryIds: _.map(data?.gallery_ids?.split(',') || [], Number),
    viewCount: data.view_count,
    themeColor: data.theme_color,
    provincialName: data.provincial_name,
    cityName: data.city_name,
    areaName: data.area_name,
    showComments: data.show_comments === 0,
    tags,
    exifData,
    shootingDate: data.shooting_date,
    createDate: data.create_time,
    updateDate: data.update_time,
  };
};
