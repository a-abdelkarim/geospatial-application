var totalLayerAreaInKm=0;

function loadLayer(geojsonObject)
{
    require([
        "esri/layers/GeoJSONLayer"
      ], function (GeoJSONLayer) {
        
        const geoJSONBlob = new Blob([JSON.stringify(geojsonObject)], {
            type: "application/geo+json",
        });

        const geoJSONBlobUrl = URL.createObjectURL(geoJSONBlob);
        
        const geoJsonLayer = new GeoJSONLayer({
            title: geojsonObject.title,
            url: geoJSONBlobUrl,
            renderer: {
                type: "simple",
                symbol: {
                    type: "simple-fill",
                    color: [255, 0, 0, 0.5],
                    outline: {
                        color: [255, 0, 0, 1],
                        width: 1 
                    }
                }
            },
            opacity: 0.7
        });

        map.add(geoJsonLayer);


        const query = geoJsonLayer.createQuery();
        geoJsonLayer.queryFeatures(query)
            .then(function (result) {
                result.features.forEach(function (feature) {
                    // Calculate the area of each selected feature in square meters
                    const featureAreaInSquareMeters = customGeometryEngine.planarArea(feature.geometry);

                    // Add the area of this feature to the total
                    totalLayerAreaInKm += featureAreaInSquareMeters;
                });
            })
            .catch(function (error) {
                console.error("Error querying features:", error);
            });
      });      
}