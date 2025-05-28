# 7CCEMPRJ
MSc. Thesis Repository

## Data Collection and Processing
### 1. Geospatial Tiling and KML Export of Satellite Imagery
The script automates the segmentation of a high-resolution raster image of Gaza City into 500 uniformly sized geographic tiles, arranged in a 25×20 grid. Each tile is extracted based on calculated spatial bounds and represented as a polygon using the `shapely` and `geopandas` libraries. These polygons are reprojected into WGS84 (EPSG:4326) and exported as individual KML files, enabling seamless integration with mapping platforms such as Google Earth. This tiling process forms a foundational step in the damage assessment pipeline, allowing for localized analysis, efficient annotation, and targeted application of machine learning models across spatial subsets of the urban landscape.
