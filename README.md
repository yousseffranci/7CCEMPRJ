# AI-Enabled Low-Carbon Reconstruction in Conflict Zones: Engineering Scalable Solutions for Post-War Recovery - *A Case Study of the Gaza Strip*
This Repository is in support of a Masters of Science Thesis presented by Youssef Alan Franci at King's College London on August 4th 2025. Access to this repository is currenty restricted to assessors and relevant parties. 

## Data Collection and Processing
### 1. Geospatial Tiling and KML Export of Satellite Imagery
The script automates the segmentation of a high-resolution raster image of Gaza City into 500 uniformly sized geographic tiles, arranged in a 25×20 grid. Each tile is extracted based on calculated spatial bounds and represented as a polygon using the `shapely` and `geopandas` libraries. These polygons are reprojected into WGS84 (EPSG:4326) and exported as individual KML files, enabling seamless integration with mapping platforms such as Google Earth. This tiling process forms a foundational step in the damage assessment pipeline, allowing for localized analysis, efficient annotation, and targeted application of machine learning models across spatial subsets of the urban landscape.
```
Relevant Chapters
Chapter 3
```

### 2. Spatiotemporal SAR Backscatter Differencing for Conflict-Induced Damage Mapping in the Gaza Strip
This repository contains a Google Earth Engine script designed for automated damage detection in the Gaza Strip using Sentinel-1 synthetic aperture radar (SAR) imagery. The script compares pre- and post-conflict backscatter values to identify structural changes and debris accumulation resulting from armed conflict. Results are intended for use in AI-driven post-conflict reconstruction pipelines and sustainable rebuilding efforts.
