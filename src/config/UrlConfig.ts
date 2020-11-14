/**
 * url 配置
 *@author kyy
 *@date 2020/10/24 10:21
 */
export class UrlConfig {
  // dev
  private static domain  = 'http://114.214.164.241:9000';
  // prod
  // private static domain  = 'http://47.99.133.60:9000';

  // 用户联想
  public static userList    = `${UrlConfig.domain}/user/list`;
  public static login       = `${UrlConfig.domain}/user/auth/login`

  // 品种列表
  public static symbolList   = `${UrlConfig.domain}/symbol/list`;
  // 品种详情
  public static symbolDetail = `${UrlConfig.domain}/symbol/{{id}}`;
  // 品种新增/修改
  public static symbol       = `${UrlConfig.domain}/symbol`;

  // 用户收益列表
  public static userProfitList       = `${UrlConfig.domain}/order/profit/user/list`;
  // 用户收益列表
  public static userProfitDetail     = `${UrlConfig.domain}/order/profit/user/detail`;
  // 用户组收益列表
  public static groupProfitList      = `${UrlConfig.domain}/order/profit/group/list`;
  // 组用户列表
  public static groupUserList        = `${UrlConfig.domain}/user/group/member/list`
  // 品种收益列表
  public static symbolProfitList     = `${UrlConfig.domain}/order/profit/symbol/list`;
  // 品种收益盈亏用户列表
  public static symbolProfitUserList = `${UrlConfig.domain}/order/profit/symbol/user/list`;


  // 品种看板meta信息
  public static symoblDashboardMeta                = `${UrlConfig.domain}/dashboard/symbol/meta`;
  // 品种看板活跃用户列表
  public static symoblDashboardActiveUserList      = `${UrlConfig.domain}/dashboard/symbol/user/active/list`;
  // 品种看板用户收益列表
  public static symoblDashboardUserProfitList      = `${UrlConfig.domain}/dashboard/symbol/user/profit/list`;
  // 品种看板用户交易额列表
  public static symbolDashboardUserAmountList      = `${UrlConfig.domain}/dashboard/symbol/user/amount/list`;
}
