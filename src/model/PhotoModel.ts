import query from '../sql/query';
// 获取照片详情信息
const getPhotoInfo = async (id: number): Promise<any> =>
  await query(`SELECT * FROM photo WHERE id = '${id}';`);

// 获取照片及相关用户列表
const getPhotoJoinUserList = async (id: number): Promise<any> =>
  await query(`
    select
      a.*,
      b.telephone,
      b.avatar_url,
      b.display_name as author_name,
      b.username as author_username
    from photo
    a LEFT JOIN user b
      ON a.user_id = b.id;
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
  order by
    update_date
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
  tags,
  mood,
  shootingDate,
}: any): Promise<any> =>
  await query(
    `INSERT INTO photo(user_id, url, width, height, title, description, theme_color, place, tags, mood, shooting_date, create_date, update_date) VALUES('${userId}', '${url||''}', '${width}', '${height}', '${title||''}', '${description||''}', '${themeColor||''}', '${place||''}', '${tags||''}', '${mood||''}', '${shootingDate||''}');`,
  );

export default {
  getPhotoJoinUserList,
  getPhotoList,
  getPhotoInfo,
  insertPhotoInfo,
};
