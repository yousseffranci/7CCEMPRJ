// Download SAR VH Band of Gaza using GEE

// Define export area (Gaza bounds)
var region = ee.Geometry.Rectangle([34.15, 31.19, 34.58, 31.60]);

// Set common SAR filters
var baseFilter = ee.ImageCollection('COPERNICUS/S1_GRD')
  .filterBounds(region)
  .filter(ee.Filter.eq('instrumentMode', 'IW'))
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
  .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
  .select('VH');

// --- Pre-conflict: August 2023 ---
var preVH = baseFilter
  .filterDate('2023-08-01', '2023-08-31')
  .median()
  .clip(region);

// --- Post-conflict: February 2025 ---
var postVH = baseFilter
  .filterDate('2025-02-01', '2025-02-28')
  .median()
  .clip(region);

// Export Pre VH
Export.image.toDrive({
  image: preVH,
  description: 'SAR_VH_Gaza_2023_08',
  folder: 'earthengine',
  fileNamePrefix: 'SAR_VH_Gaza_2023_08',
  region: region,
  scale: 10,
  crs: 'EPSG:4326',
  maxPixels: 1e13
});

// Export Post VH
Export.image.toDrive({
  image: postVH,
  description: 'SAR_VH_Gaza_2025_02',
  folder: 'earthengine',
  fileNamePrefix: 'SAR_VH_Gaza_2025_02',
  region: region,
  scale: 10,
  crs: 'EPSG:4326',
  maxPixels: 1e13
});
