import osmnx as ox
import networkx as nx
import geopandas as gpd
import matplotlib.pyplot as plt
from shapely.geometry import Point

# 获取道路网络，选择一个地理范围，例如一个城市
place_name = "黄浦区, Shanghai, China"

G_loaded = ox.load_graphml(filepath="hp.graphml")

# 选择起始点，转换为图中的最近节点
start_point = (31.243422233002534, 121.40535043325849)  # 例如东方明珠
start_node = ox.distance.nearest_nodes(G_loaded, start_point[1], start_point[0])
distance_threshold = 1  # 公里

# 使用Dijkstra算法计算从起始节点到其他节点的最短路径
lengths, paths = nx.single_source_dijkstra(G_loaded, source=start_node, cutoff=distance_threshold * 1000, weight='length')

# 过滤出在距离阈值内的节点
reachable_nodes = [node for node, length in lengths.items() if length <= distance_threshold * 1000]

# 获取节点坐标
positions = {node: (data['x'], data['y']) for node, data in G_loaded.nodes(data=True)}

# 创建GeoDataFrame来存储这些节点的位置
geometry = [Point(positions[node]) for node in reachable_nodes]
gdf = gpd.GeoDataFrame({'geometry': geometry})
gdf_boundary = gdf.unary_union.convex_hull

# 绘制等时圈
fig, ax = plt.subplots(figsize=(30, 30))
# ox.plot_graph(G, ax=ax, node_color='lightblue', edge_color='gray', show=False, close=False)
# gdf.plot(ax=ax, color='yellow', markersize=5)
# gpd.GeoSeries([boundary_gdf.geometry[0]]).plot(ax=ax, color='blue', alpha=0.3)
# gpd.GeoSeries([gdf_boundary]).plot(ax=ax, color='red', alpha=0.3)

gdf1 = gpd.GeoDataFrame(geometry=[gdf_boundary])['geometry'][0]
# gdf2 = gpd.GeoDataFrame(geometry=[boundary_gdf.geometry[0]])

# 取两个GeoDataFrame的几何体的交集
# intersection = gpd.overlay(gdf1, gdf2, how='intersection')['geometry'][0]

gpd.GeoSeries([gdf1]).plot(ax=ax, color='green', alpha=0.3)
plt.show()
#
#
#
# place_name = '曹杨新村街道, 上海, 中国'
# boundary_gdf = ox.geocode_to_gdf(place_name)
#
# # 选择起始点，转换为图中的最近节点
# start_point = (31.243422233002534, 121.40535043325849)  # 例如东方明珠
# start_node = ox.distance.nearest_nodes(G_loaded, start_point[1], start_point[0])
# distance_threshold = 1  # 公里
#
# center_point = Point(start_point[1], start_point[0])
# radius = 1 / 111
# circle = center_point.buffer(radius)
#
# circle_gdf = gpd.GeoDataFrame({'geometry': [circle]})
#
# # 使用Dijkstra算法计算从起始节点到其他节点的最短路径
# lengths, paths = nx.single_source_dijkstra(G_loaded, source=start_node, cutoff=distance_threshold * 1000, weight='length')
#
# # 过滤出在距离阈值内的节点
# reachable_nodes = [node for node, length in lengths.items() if length <= distance_threshold * 1000]
#
# # 获取节点坐标
# positions = {node: (data['x'], data['y']) for node, data in G_loaded.nodes(data=True)}
#
# # 创建GeoDataFrame来存储这些节点的位置
# geometry = [Point(positions[node]) for node in reachable_nodes]
# gdf = gpd.GeoDataFrame({'geometry': geometry})
# gdf_boundary = gdf.unary_union.convex_hull
#
# # 绘制等时圈
# fig, ax = plt.subplots(figsize=(30, 30))
# ox.plot_graph(G, ax=ax, node_color='lightblue', edge_color='gray', show=False, close=False)
# # gdf.plot(ax=ax, color='yellow', markersize=5)
# # gpd.GeoSeries([boundary_gdf.geometry[0]]).plot(ax=ax, color='blue', alpha=0.3)
# # gpd.GeoSeries([gdf_boundary]).plot(ax=ax, color='red', alpha=0.3)
#
# gdf1 = gpd.GeoDataFrame(geometry=[gdf_boundary])
# gdf2 = gpd.GeoDataFrame(geometry=[boundary_gdf.geometry[0]])
#
# # 取两个GeoDataFrame的几何体的交集
# intersection = gpd.overlay(gdf1, gdf2, how='intersection')['geometry'][0]
#
# gpd.GeoSeries([circle_gdf['geometry'][0]]).plot(ax=ax, color='blue', alpha=0.3)
# # gpd.GeoSeries([geo_data['geometry'][0]]).plot(ax=ax, color='blue', alpha=0.3)
# # gpd.GeoSeries([gdf_boundary]).plot(ax=ax, color='green', alpha=0.3)
#
# plt.show()
