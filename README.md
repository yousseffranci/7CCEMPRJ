# AI-Enabled Low-Carbon Reconstruction in Conflict Zones: Engineering Scalable Solutions for Post-War Recovery - *A Case Study of the Gaza Strip*
This repository supports the Master of Science thesis submitted by Youssef Alan Franci at King's College London, presented on August 4th, 2025.

Access is currently restricted to authorized assessors and relevant parties. The contents herein provide a concise overview of the methodologies and techniques employed throughout the project and serve to document the processes used to produce the final deliverables.

## Data Collection and Processing
### 1. Geospatial Tiling and KML Export of Satellite Imagery
The script automates the segmentation of a high-resolution raster image of Gaza City into 500 uniformly sized geographic tiles, arranged in a 25×20 grid. Each tile is extracted based on calculated spatial bounds and represented as a polygon using the `shapely` and `geopandas` libraries. These polygons are reprojected into WGS84 (EPSG:4326) and exported as individual KML files, enabling seamless integration with mapping platforms such as Google Earth. This tiling process forms a foundational step in the damage assessment pipeline, allowing for localized analysis, efficient annotation, and targeted application of machine learning models across spatial subsets of the urban landscape.
```
Relevant Chapters
Chapter 3
```

### 2. Spatiotemporal SAR Backscatter Differencing for Conflict-Induced Damage Mapping in the Gaza Strip
This repository contains a Google Earth Engine script designed for automated damage detection in the Gaza Strip using Sentinel-1 synthetic aperture radar (SAR) imagery. The script compares pre- and post-conflict backscatter values to identify structural changes and debris accumulation resulting from armed conflict. Results are intended for use in AI-driven post-conflict reconstruction pipelines and sustainable rebuilding efforts.

### 3. Grid-Based Overpass Querying and KML Visualization for Gaza Urban Data
This notebook automates the extraction of building footprint data from OpenStreetMap (OSM) for the Gaza Strip. It first generates a 30-zone spatial grid using KML for visualization and reference, then queries the Overpass API to extract building polygons for each zone. The output includes individual GeoJSON files per zone, suitable for use in QGIS, Google Earth Engine, or further geospatial analysis.

### 4. Temporal Filtering of UNOSAT Damage Assessment Data
This notebook processes UNOSAT multi-date building damage data for the Gaza Strip by generating a 30-zone spatial grid for systematic querying and visual reference, and extracting the observation date closest to February 18, 2025 for each damage point. It automates the identification of the temporally nearest assessment from multiple `SensorDate` fields and optionally filters results within a specified time window. Outputs include a QGIS-compatible KML grid and a GeoJSON file containing filtered damage points for focused temporal analysis.
