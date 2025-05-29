// Define Gaza Strip boundary (manually adjusted to local coordinates)
var gaza = ee.Geometry.Rectangle([34.19, 31.20, 34.58, 31.60]);

// Define pre- and post-event dates
var preDate = '2023-09-01';  // Before October 7, 2023 conflict escalation
var postDate = '2023-11-15'; // After major damage phase

// Function to prepare Sentinel-1 image (median, VV polarization, IW mode)
function getSentinel1(dateStart, dateEnd) {
  return ee.ImageCollection('COPERNICUS/S1_GRD')
    .filterBounds(gaza)
    .filterDate(dateStart, dateEnd)
    .filter(ee.Filter.eq('instrumentMode', 'IW'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
    .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING')) // Use 'ASCENDING' optionally
    .select('VV')
    .median()
    .clip(gaza);
}

// Get pre- and post-conflict images
var sarPre = getSentinel1('2023-08-20', preDate);
var sarPost = getSentinel1(postDate, '2023-12-01');

// Compute backscatter difference
var sarDiff = sarPost.subtract(sarPre).rename('VV_Diff');

// Visualization parameters
var visSAR = {min: -25, max: 0, palette: ['black', 'white']};
var visDiff = {min: -5, max: 5, palette: ['blue', 'white', 'red']};

// Display on map
Map.centerObject(gaza, 11);
Map.addLayer(sarPre, visSAR, 'SAR Pre-Conflict');
Map.addLayer(sarPost, visSAR, 'SAR Post-Conflict');
Map.addLayer(sarDiff, visDiff, 'SAR Backscatter Difference');
Map.addLayer(gaza, {color: 'yellow'}, 'Gaza Boundary');

// Export SAR difference image for ML model training
Export.image.toDrive({
  image: sarDiff,
  description: 'Gaza_SAR_ChangeMap',
  folder: 'Gaza_Reconstruction',
  scale: 10,  // Sentinel-1 native resolution
  region: gaza,
  maxPixels: 1e13
});
