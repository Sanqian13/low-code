import { JWTTokenModel } from "@delon/auth";

export class MyJwtModel extends JWTTokenModel {
  // token
  token: string;
  // 系统名称
  sysName?: string;
  tabImageUrl?: string; // 系统页签icon
  username?: string;  // 用户名
  userType?: number;  // 用户类型
  unitName?: string;  // 单位名称
  expirationTime?: string;  // 账号过期时间
  permission?: {
    mediaVersionAttention?: boolean;  // 媒体传播权限
    communicationHealth?: boolean;  // 传播健康度权限
    mediaGovernmentAffairsVersionAttention?: boolean; // 媒体关注度(政务版)权限
    singleSpread?: boolean; // 单篇传播权限
    siteSpread?: boolean; // 站点传播权限
    dataOverview?: boolean; // 数据总览权限
    netizenDiffusion?: boolean; // 网民扩散度权限
  }
}

