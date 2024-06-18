/*
 * @Description: 天地图查询
 * @Author: DiChen Liu
 * @Date: 2024-05-16
 * @LastEditTime: 2024-05-16
 */
class tdtAPI {
  postStr = {
    keyWord: "",
    polygon:
      "118.93232636500011,27.423305726000024,118.93146426300007,27.30976105800005,118.80356153600007,27.311829507000027,118.80469010700006,27.311829508000073,118.8046900920001,27.32381604300008,118.77984777400002,27.32381601800006,118.77984779100007,27.312213007000025,118.76792266100006,27.31240586100006,118.76680145600005,27.429347074000077,118.93232636500011,27.423305726000024",
    queryType: 10,
    start: 0,
    count: 10,
  };

  static getPolygonQuery(postStr) {
    const t = new tdtAPI();
    t.setData(postStr);
    let polygonQuery =
      "http://api.tianditu.gov.cn/v2/search?postStr=" +
      JSON.stringify(t.postStr) +
      "&type=query&tk=65e5c3aab1686721a1b190dcd57d38dc";
    return polygonQuery;
  }
  setData(postStr) {
    this.postStr = postStr;
  }
}
module.exports = tdtAPI;
