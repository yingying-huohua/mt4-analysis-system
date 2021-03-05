/**
 * 期货相关url配置
 *@author kyy
 *@date 2020/10/24 10:21
 */
import {environment} from '../environments/environment';

export class FuturesUrlConfig {
  // Domain
  private static domain  = environment.domain;
  // 用户列表 （参数逗号分隔字符串）
  public static userList         = `${FuturesUrlConfig.domain}/futures/tradingAccount/user/list`;
  // 用户收益列表（排行）
  public static userProfitList   = `${FuturesUrlConfig.domain}/futures/orderRh/user/list`;
  // 品种列表
  public static symbolList       = `${FuturesUrlConfig.domain}/futures/product/list`;
  // 品种收益列表
  public static symbolProfitList = `${FuturesUrlConfig.domain}/futures/orderRh/product/list`;
  // 持仓列表
  public static positionList     = `${FuturesUrlConfig.domain}/futures/position/list`;
  // 资金列表
  public static accountList      = `${FuturesUrlConfig.domain}/futures/tradingAccount/account/list`;
  // 品种多空分布
  public static bbd              = `${FuturesUrlConfig.domain}/futures/orderRh/bbd`
  // 多空盈亏分布
  public static bbp              = `${FuturesUrlConfig.domain}/futures/orderRh/bbp`
  // 持仓时间分布
  public static positionDistribute = `${FuturesUrlConfig.domain}/futures/orderRh/position/distribute`
}
