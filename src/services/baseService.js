/*
 * @Description: 服务基础类
 * @Author: DiChen Liu
 * @Date: 2024-05-16
 * @LastEditTime: 2024-07-04 10:26:57
 */
const connectDB = require("../db/mongo.js");
const Com = require("../models/comModel.js");
const Scores = require("../models/comScores.js");
const POI = require("../models/POIModel.js");
const { queryPolygon } = require("../utils/mapboxAPI.js");
//点查询poi
const queryPoint = async (data) => {
  try {
    const queryResult = {
      polygon: null,
      pois: null,
      types: null,
    };
    const queryPolygonRes = await queryPolygon(data);
    queryResult.polygon = queryPolygonRes;
    console.log("queryPolygonRes", queryPolygonRes.features[0].geometry);
    // const res = await axios.get(tdtAPI.getPolygonQuery(point));
    if (queryPolygonRes != undefined) {
      connectDB();
      // 查询 POI 集合中落在该面数据内的点
      const queryPOI = await POI.find({
        location: {
          $geoWithin: {
            $geometry: queryPolygonRes.features[0].geometry,
          },
        },
      })
        .then((pois) => {
          queryResult.pois = paraseGeojson(pois);
          queryResult.types = countTypes(paraseGeojson(pois));
        })
        .then((data) => {})
        .catch((err) => {
          console.error(err);
        });

      return queryResult;
    }
  } catch (e) {
    console.log(e);
  }
};
//查询单个住宅区
const queryOne = async (id) => {
  try {
    connectDB();
    const res = await Com.findOne({ id: id })
      .then((data) => {
        console.log("One record found in com:", data);
        return data;
      })
      .catch((err) => {
        console.error("Error querying com data:", err);
      });
    console.log("res", res);
    return res;
  } catch (e) {
    console.log(e);
  }
};

//分页查询住宅区

//查询各住宅区评分
const queryScores = async () => {
  try {
    connectDB();
    const res = await Scores.find()
      .sort({ ["scores"]: -1 })
      .then((data) => {
        console.log("All records found in com:", data);
        return data;
      })
      .catch((err) => {
        console.error("Error querying com data:", err);
      });
    return res;
  } catch (e) {
    console.log(e);
  }
};
// 统计函数
function countTypes(geojson) {
  const counts = {
    total: 0,
    types: {},
  };
  console.log("geojson", geojson);
  geojson.features.forEach((feature) => {
    counts.total += 1;
    const type = feature.properties.type;
    if (counts.types[type]) {
      counts.types[type] += 1;
    } else {
      counts.types[type] = 1;
    }
  });

  return counts;
}
function paraseGeojson(pois) {
  // 转换为GeoJSON格式
  let geojson = {
    type: "FeatureCollection",
    features: pois.map((item) => ({
      id: item.id,
      type: "Feature",
      geometry: item.location,
      properties: {
        name: item.name,
        type: item.type,
        firstClass: item.firstClass,
        secondClass: item.secondClass,
        province: item.province,
        city: item.city,
        county: item.county,
        id: item.id,
      },
    })),
  };
  return geojson;
}
module.exports = { queryPoint, queryOne, queryScores };
