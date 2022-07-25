import query from '../sql/query';
import { UpdatePhotoRequest } from '../types/PhotoTypes';
// 获取照片详情信息
const getPhotoInfo = async (id: number): Promise<any> =>
  await query(`SELECT * FROM photo WHERE id = '${id}';`);

// 获取照片列表,根据用户id
const getPhotoListByUserId = async (id: number): Promise<any> =>
  await query(`
    select
      a.*,
      b.telephone,
      b.avatar_url,
      b.display_name as author_name,
      b.username as author_username
    from photo
    a LEFT JOIN user b
      ON a.user_id = b.id
    where a.user_id = '${id}' and a.is_delete = 0;
    `);

// 分页获取照片列表
const getPhotoList = async (
  pageIndex: number,
  pageSize: number,
): Promise<any> => {
  const list = await query(`
  select
    a.*,
    b.telephone,
    b.avatar_url,
    b.display_name as author_name,
    b.username as author_username
  from photo
  a LEFT JOIN user b
    ON a.user_id = b.id
  where a.is_delete = 0
  order by
    update_time
  desc LIMIT ${(pageIndex - 1) * pageSize},${pageSize};`);
  const count = (await getPhotoTotalCount())?.[0]?.total;
  return { list, count };
};

// 获取照片总数
const getPhotoTotalCount = async (): Promise<any> =>
  await query(`SELECT FOUND_ROWS() as total;`);

// 保存照片信息
const insertPhotoInfo = async ({
  userId,
  url,
  width,
  height,
  title,
  description,
  themeColor,
  place,
  placeId,
  location,
  provincialName,
  cityName,
  areaName,
  tags,
  mood,
  shootingDate,
  brand,
  model,
  aperture,
  focalLength,
  shutterSpeed,
  iso,
}: any): Promise<any> =>
  await query(
    `INSERT INTO photo(user_id, url, width, height, title, description, theme_color, place, place_id, location, provincial_name, city_name, area_name, tags, mood, shooting_date, exif_brand, exif_model, exif_aperture, exif_focal_length, exif_shutter_speed, exif_iso) VALUES('${userId}', '${
      url || ''
    }', '${width}', '${height}', '${title || ''}', '${description || ''}', '${
      themeColor || ''
    }', '${place || ''}','${placeId || ''}','${location || ''}','${
      provincialName || ''
    }','${cityName || ''}','${areaName || ''}', '${tags || ''}', '${
      mood || ''
    }', '${shootingDate || ''}', '${brand || ''}', '${model || ''}', '${
      aperture || ''
    }', '${focalLength || ''}', '${shutterSpeed || ''}', '${iso || ''}');`,
  );

// 修改照片信息
const updatePhotoInfo = async (values: UpdatePhotoRequest): Promise<any> => {
  return await query(
    `UPDATE photo SET title = '${values.title || ''}',description = '${
      values.description || ''
    }',gallery_ids = '${values.galleryIds || ''}',shooting_date = '${
      values.shootingDate || ''
    }',mood = '${values.mood || ''}',place = '${
      values.place || ''
    }',place_id = '${values.placeId || ''}',location = '${
      values.location || ''
    }',provincial_name = '${values.provincialName || ''}',show_comments = '${
      values.showComments || 0
    }',city_name = '${values.cityName || ''}',area_name = '${
      values.areaName || ''
    }'  WHERE id = '${values.id}';`,
  );
};
export default {
  getPhotoListByUserId,
  getPhotoList,
  getPhotoInfo,
  insertPhotoInfo,
  updatePhotoInfo,
};
