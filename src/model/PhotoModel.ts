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
      b.name as author_name
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
    b.name as author_name
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

export default { getPhotoJoinUserList, getPhotoList, getPhotoInfo };
