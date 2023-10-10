function getSelectedFeatures(selectedLayer)
{
    sketchWidget.on("create", function (event) {
        if (event.state === "complete") {

            const drawnGeometry = event.graphic.geometry;

            const selectedSymbol = {
                type: "simple-fill",
                color: [0, 0, 255, 0.5],
                outline: {
                    color: [0, 0, 255],
                    width: 2 
                }
            };

            const layerToQuery = selectedLayer;
            const updatedGraphicsLayer = new customGraphicsLayer({title: "Selected Features"});
            map.add(updatedGraphicsLayer);

            const query = layerToQuery.createQuery();
            query.geometry = drawnGeometry;
            query.spatialRelationship = "intersects";   

            layerToQuery.queryFeatures(query)
                .then(function (result) {
                    console.log("Features that intersect with the drawn geometry:", result.features);

                    let totalAreaInSquareMeters = 0;

                    result.features.forEach(function (feature) {
                        const updatedGraphic = new customGraphic({
                            geometry: feature.geometry,
                            symbol: selectedSymbol
                        });

                        updatedGraphicsLayer.add(updatedGraphic);
                        // Calculate the area of each selected feature in square meters
                        const featureAreaInSquareMeters = customGeometryEngine.planarArea(feature.geometry, "square-meters");

                        // Add the area of this feature to the total
                        totalAreaInSquareMeters += featureAreaInSquareMeters;

                    });

                    layerToQuery.refresh();

                    const selectedCount = result.features.length;
                    const totalAreaInSquareKilometers = totalAreaInSquareMeters / 1000000;
                    updateDoughnutChart(selectedCount, selectedLayer, totalAreaInSquareKilometers);
                })
                .catch(function (error) {
                    console.error("Error querying features:", error);
                });
        }
    });

}