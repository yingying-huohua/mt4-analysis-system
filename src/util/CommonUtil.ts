/**
 * 工具类
 *@author kyy
 *@date 2020/10/24 15:57
 */
export class CommonUtil {

  /**
   * 金额格式化（CNY）
   * @param money
   */
  static formatCNY(money) {
    new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
    }).format(money); // 'CN¥ 10,000.00'
  }

  /**
   * 金额格式化（$）
   * @param money
   */
  static formatUSD(money) {
    new Intl.NumberFormat('en-US',
      { style: 'currency', currency: 'USD' }
    ).format(money); // '$100.00'
  }
}
