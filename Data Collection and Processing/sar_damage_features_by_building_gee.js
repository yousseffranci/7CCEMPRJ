//Per-Building Synthetic Aperture Radar Feature Extraction for Conflict-Driven Damage Assessment Using Sentinel-1 and Google Earth Engine

// Load building footprints 
var buildings = ee.FeatureCollection("projects/gee-gazastrip/assets/buildings_shp_minimal");

// Updated to match your Planet.com images 
var preStart = '2023-08-01';
var preEnd =   '2023-08-31';

var postStart = '2025-02-01';
var postEnd =   '2025-02-28';


// Load Sentinel-1 SAR data (VV + VH) 
var s1 = ee.ImageCollection('COPERNICUS/S1_GRD')
  .filterBounds(buildings)
  .filter(ee.Filter.eq('instrumentMode', 'IW'))
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
  .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
  .select(['VV', 'VH']);

// Aggregate pre- and post-event composites
var preSAR = s1.filterDate(preStart, preEnd).median();
var postSAR = s1.filterDate(postStart, postEnd).median();

// Compute per-building mean backscatter
var withPre = preSAR.reduceRegions({
  collection: buildings,
  reducer: ee.Reducer.mean().setOutputs(['VV_pre', 'VH_pre']),
  scale: 10
});

var withPost = postSAR.reduceRegions({
  collection: withPre,
  reducer: ee.Reducer.mean().setOutputs(['VV_post', 'VH_post']),
  scale: 10
});

// Compute deltas: post - pre 
var withDeltas = withPost.map(function(feature) {
  var vvDelta = ee.Number(feature.get('VV_post')).subtract(feature.get('VV_pre'));
  var vhDelta = ee.Number(feature.get('VH_post')).subtract(feature.get('VH_pre'));
  return feature.set({
    'VV_delta': vvDelta,
    'VH_delta': vhDelta
  });
});

// Export to Google Drive 
Export.table.toDrive({
  collection: withDeltas,
  description: 'building_SAR_features',
  fileFormat: 'CSV'
});
