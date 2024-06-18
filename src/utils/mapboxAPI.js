/*
 * @Description: mapboxAPI
 * @Author: DiChen Liu
 * @Date: 2024-05-27
 * @LastEditTime: 2024-05-27
 */
const axios = require("axios");
//15min
const ACCESS_TOKEN =
  "pk.eyJ1Ijoid3lqcSIsImEiOiJjbDBnZDdwajUxMXRzM2htdWxubDh1MzJrIn0.2e2_rdU2nOUvtwltBIZtZg";
const baseQueryUrl = "https://api.mapbox.com/isochrone/v1/mapbox/";

const profileType = {
  1: "driving",
  2: "driving-traffic",
  3: "walking",
  4: "cycling",
};

const queryPolygon = (data) => {
  //   console.log(data);
  //   console.log(data["lon"]);
  const url =
    baseQueryUrl +
    profileType[data["profile"]] +
    "/" +
    data["lon"] +
    "%2C" +
    data["lat"] +
    "?contours_minutes=15&polygons=true&denoise=1&access_token=" +
    ACCESS_TOKEN;
  //   console.log(url);
  axios.get(url).then((res) => {
    console.log(res.data);
  });
};

module.exports = { queryPolygon };
