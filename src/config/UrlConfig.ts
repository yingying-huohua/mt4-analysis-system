/**
 * url 配置
 *@author kyy
 *@date 2020/10/24 10:21
 */
export class UrlConfig {
  private static domain  = 'http://114.214.164.241:9000';

  // 品种列表
  public static symbolList   = `${UrlConfig.domain}/symbol/list`;
  // 品种详情
  public static symbolDetail = `${UrlConfig.domain}/symbol/{{id}}`;
  // 品种新增/修改
  public static symbol       = `${UrlConfig.domain}/symbol`;

  // 用户收益列表
  public static userProfitList = `${UrlConfig.domain}/order/profit/user/list`;
  // 用户收益列表
  public static userProfitDetail = `${UrlConfig.domain}/order/profit/user/detail`;
  // 用户组收益列表
  public static groupProfitList = `${UrlConfig.domain}/order/profit/group/list`;
  // 品种收益列表
  public static symbolProfitList = `${UrlConfig.domain}/order/profit/symbol/list`;
  // 品种收益盈亏用户列表
  public static symbolProfitUserList = `${UrlConfig.domain}/order/profit/symbol/user/list`;
}
