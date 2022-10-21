
export class Manuscript {
  id?: number;  // id
  articleTitle?: string; // 稿件标题
  articleLink?: Array<string>; // 稿件链接
  articleUrl?: string;  // 稿件路径
  createTime?: string;  // 稿件时间
  articlePath?: Array<string>;  // 稿件路径分割数组
  sourceWeb?: string; // 来源网站名
}