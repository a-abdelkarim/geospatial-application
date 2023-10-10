$("#clearSelection").click((e) => {
    const graphicsLayersToRemove = [];

    map.layers.forEach(function (layer) {
        if (layer.type === "graphics") {
            graphicsLayersToRemove.push(layer);
        }
    });

    graphicsLayersToRemove.forEach(function (graphicsLayer) {
        map.remove(graphicsLayer);
    });

    if (map.layers.every((layer) => layer instanceof customGraphicsLayer != true))
        document.getElementById('clearSelection').style.display = 'none';

    if (doughnutChart) 
        doughnutChart.destroy();
});