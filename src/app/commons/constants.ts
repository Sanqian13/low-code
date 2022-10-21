/**
 * 前端常量类
 * 统一管理前端所用到的所有常量
 *
 * Created by chenjiawei on 2022/8/12.
 */
export class Constants {
  public static FORMAT_LONG = "yyyy-MM-DD HH:mm:ss";
  public static ServicesBackendUrl = "";
  public static sysName = '';

  public static autoPlayTime = 40000;  // 稿件轮播时间40s

  // 列表请求参数 类型 1 单篇 2 专题 3 站点
  public static dateType = {
    single: 1,
    subject: 2,
    site: 3
  }

  public static menuRouters = [ // 菜单
    {
      url: '/total',
      name: '数据总览',
      showPosition: 'left'
    },
    {
      url: '/single',
      name: '单篇传播',
      showPosition: 'left'
    },
    {
      url: '/single',
      name: '专题传播',
      showPosition: 'right'
    },
    {
      url: '/single',
      name: '站点传播',
      showPosition: 'right'
    }
  ]

  // 检测数组类型
  public static isEmpty(obj: any) {
    // 检验null和undefined
    if (!obj && obj !== 0 && obj !== "") {
      return true;
    }
    // 检验数组
    if (Array.prototype.isPrototypeOf(obj) && obj.length === 0) {
      return true;
    }
    // 检验对象
    if (Object.prototype.isPrototypeOf(obj) && Object.keys(obj).length === 0) {
      return true;
    }
    return false;
  }
  // 计算rem
  public static countSize(res: number) {
    const docEl = document.documentElement;
    const clientWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    if (!clientWidth) return;
    let fontSize = clientWidth / 96;
    return res * fontSize;
  }

  // 设置系统logo
  public static setSystemIcon(res: any) {
    const tabImageUrl = res.tabImageUrl;
    const favicon = document.getElementsByTagName('link');
    // 设置系统icon
    if (tabImageUrl !== '' && tabImageUrl !== null && tabImageUrl !== undefined) {
      if (favicon != null) {
        favicon[0].href = tabImageUrl;
      }
    } else {
      favicon[0].href = 'favicon.ico';
    }
  }
}
