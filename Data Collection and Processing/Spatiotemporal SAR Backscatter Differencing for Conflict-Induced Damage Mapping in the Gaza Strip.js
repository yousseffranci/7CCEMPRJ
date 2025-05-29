// Define the Gaza Strip boundary (bounding box geometry)
var gaza = ee.Geometry.Rectangle([34.19, 31.20, 34.58, 31.60]);

// Set the target date
var targetDate = '2023-08-02';
var bufferDays = 3; // Slight buffer in case of no exact-date coverage

// Define date range
var startDate = ee.Date(targetDate).advance(-bufferDays, 'day');
var endDate = ee.Date(targetDate).advance(bufferDays, 'day');

// Load Sentinel-1 SAR ImageCollection for the date range
var sentinel1 = ee.ImageCollection('COPERNICUS/S1_GRD')
  .filterBounds(gaza)
  .filterDate(startDate, endDate)
  .filter(ee.Filter.eq('instrumentMode', 'IW'))  // Interferometric Wide swath
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
  .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))  // Optional
  .select('VV');

// Get a median composite if multiple images exist in the date window
var sarImage = sentinel1.median().clip(gaza);

// Visualization parameters for SAR (VV band)
var visParams = {
  min: -25,
  max: 0,
  palette: ['black', 'white']
};

// Center map and display the image
Map.centerObject(gaza, 11);
Map.addLayer(sarImage, visParams, 'SAR VV – Aug 02, 2023');
Map.addLayer(gaza, {color: 'red'}, 'Gaza Boundary');

// Export the image to Google Drive for further analysis
Export.image.toDrive({
  image: sarImage,
  description: 'Gaza_SAR_VV_Aug02_2023',
  folder: 'Gaza_Reconstruction',
  fileNamePrefix: 'SAR_VV_Gaza_2023_08_02',
  region: gaza,
  scale: 10,
  maxPixels: 1e13
});
