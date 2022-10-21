// 全局

export class InfoData {
  name?: string; // 名称
  num?: string; // 指数
  rise?: number; // 上升:1 下降:2 0:无
  per?: string; // 百分比显示%
  cityName?: string; //  城市名称
  colorNum?: number; // 颜色判断
  textType?: number; // 判断
}
export class SwiperInfoData {
  id?: number;
  eventTime?: string;
  title?: string;
  county?: string; // 区县
  province?: string;
  hot?: string; // 热度标签
  rise?: number; // 上升:1 下降:2 0:无
  num?: number;
  data?: Array<InfoData> = [];
}
export class SourceData {
  id?: string;
  eventTime?: string;
  title?: string;
  num?: number; // 热度
  origin?: string; // 来源
  type?: number; // 敏1
  similarArticlesNum?: number; //相似文章数
  numDay?: number;
}
