import { FilterXSS, getDefaultWhiteList } from "xss";
// @ts-ignore
import { getDefaultWhiteList as getDefaultCssWhiteList } from "cssfilter";
import query from "../sql/query";

/**
 * 数据安全处理，防止xss注入
 * @param html
 */
export function xssSafeFilter(html?: string): string {
  if (!html) {
    return "";
  }

  const defaultXssWhiterList = getDefaultWhiteList();
  Object.keys(defaultXssWhiterList).forEach(function (key) {
    // 默认都加style,id属性
    defaultXssWhiterList[key]?.push("style");
    defaultXssWhiterList[key]?.push("id");
  });

  const whiteList = Object.assign(defaultXssWhiterList, {
    html: [],
    head: [],
    meta: ["charset"],
    "!doctype": ["html"],
    style: [],
    body: [],
  });
  const cssWhiteList = Object.assign(getDefaultCssWhiteList(), {
    position: true,
    "line-height": true,
  });
  const options = {
    whiteList,
    css: {
      whiteList: cssWhiteList,
    },
    stripIgnoreTagBody: ["script"],
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
