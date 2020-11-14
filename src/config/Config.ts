/**
 * 配置
 *@author kyy
 *@date 2020/10/24 14:31
 */
import * as echarts from 'echarts';
export class Config {
  // 倒序
  public static DESC = 'DESC';
  // 升序
  public static ASC  = 'ASC';
  // 默认数据条数
  public static defaultPageSize = 20;
  // 默认页码
  public static defaultPageNo   = 1;

  public static pageSize_1000 = 1000;
  // 默认排序字段
  public static sortField = 'id';
  // 默认排序 desc||asc
  public static direction = Config.DESC

  // 品种看板，活跃用户数据条数
  public static symbolDashboardPageSize = 15;

  // 默认选中的品种
  public static defaultSelectedSymbol = 'XNGUSD';

  static ECHARTS_PIE_Distribution_COLOR = [
    new echarts.graphic.LinearGradient(
      0, 0, 0, 1,
      [
        {offset: 0, color: '#FE5A02'},
        {offset: 1, color: '#FFA507'},
      ]
    ),
    new echarts.graphic.LinearGradient(
      0, 0, 0, 1,
      [
        {offset: 0, color: '#AA0D7E'},
        {offset: 1, color: '#FF00B8'},
      ]
    ),
    new echarts.graphic.LinearGradient(
      0, 0, 0, 1,
      [
        {offset: 0, color: '#4EDB3E'},
        {offset: 1, color: '#3EA333'},
      ]
    ),
    new echarts.graphic.LinearGradient(
      0, 0, 0, 1,
      [
        {offset: 0, color: '#0E78EB'},
        {offset: 1, color: '#3993F5'},
      ]
    ),
    new echarts.graphic.LinearGradient(
      0, 0, 0, 1,
      [
        {offset: 0, color: '#620099'},
        {offset: 1, color: '#9510DF'},
      ]
    )
  ];

  static ECHARTS_BEHAVIOR_COLOR = ['#ff6600', '#808bc6', '#2db7f5', '#f5bf58', '#535', '#4CAF50'];
  // 扇形图颜色
  static ECHARTS_PIE_COLOR = ['#fe5702', '#424157'];
  // oms 扇形图颜色
  static ECHARTS_PIE_COLOR_1 = ['#10a5b4', '#147be8'];
}
