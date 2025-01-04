import osmnx as ox
import networkx as nx
import geopandas as gpd
from shapely.geometry import Point
import sys
import json
import os

ghPath = os.path.join(os.path.dirname(__file__), "hp.graphml")
geoJsonPath = os.path.join(os.path.dirname(__file__), "tmpGeojson/boundary.geojson")
G_loaded = ox.load_graphml(filepath=ghPath)


def boundary(lon, lat):
    # 选择起始点，转换为图中的最近节点
    start_point = (lon, lat)  # 例如东方明珠
    print("start_point",start_point)
    start_node = ox.distance.nearest_nodes(G_loaded, start_point[0], start_point[1])
    print(start_point[1], start_point[0])
    print("start_node",start_node)
    distance_threshold = 1  # 公里

    # 使用Dijkstra算法计算从起始节点到其他节点的最短路径
    lengths, paths = nx.single_source_dijkstra(G_loaded, source=start_node, cutoff=distance_threshold * 1000,
                                               weight='length')

    # 过滤出在距离阈值内的节点
    reachable_nodes = [node for node, length in lengths.items() if length <= distance_threshold * 1000]

    # 获取节点坐标
    positions = {node: (data['x'], data['y']) for node, data in G_loaded.nodes(data=True)}

    # 创建GeoDataFrame来存储这些节点的位置
    geometry = [Point(positions[node]) for node in reachable_nodes]
    gdf = gpd.GeoDataFrame({'geometry': geometry, })
    gdf_boundary = gdf.union_all().convex_hull

    properties = {
        'fill-opacity': 0.33,
        'fillColor': "#bf4040",
        'opacity': 0.33,
        'fill': "#bf4040",
        'fillOpacity': 0.33,
        'color': "#bf4040",
        'contour': 10,
        'metric': "time"
    }
    gdf_end = gpd.GeoDataFrame({'geometry': [gdf_boundary], 'fill-opacity': [0.33], 'color': ["#bf4040"]})

    gdf_end.to_file(geoJsonPath, driver="GeoJSON")


if __name__ == "__main__":
    # 读取标准输入
    input_data = sys.stdin.read()
    # 解析JSON
    params = json.loads(input_data)
    lon = float(params['lon'])

    lat = float(params['lat'])
    print(lon, lat)
    # 计算结果
    boundary(lon, lat)
