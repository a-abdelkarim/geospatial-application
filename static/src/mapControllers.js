function initMapControllers() {
    require([
        "esri/widgets/Search",
        "esri/widgets/Fullscreen",
        "esri/widgets/BasemapGallery",
        "esri/widgets/Legend",
        "esri/widgets/LayerList"
    ], function (Search, Fullscreen, BasemapGallery, Legend, LayerList) {

        const searchWidget = new Search({ view });
        view.ui.add(searchWidget, "top-right");

        const fullscreenWidget = new Fullscreen({ view });
        view.ui.add(fullscreenWidget, "top-left");

        const basemapGalleryContainer = generateWidgetContainer("#basemapGallery", "Basemap");
        const basemapGallery = new BasemapGallery({
            view,
            source: {
                portal: {
                    url: "https://www.arcgis.com",
                    useVectorBasemaps: true
                }
            },
            container: basemapGalleryContainer.widgetContainer,
        });
        view.ui.add(basemapGalleryContainer.containerButton, {position: "top-right"});
        view.ui.add(basemapGalleryContainer.widgetContainer, {position: "top-right"});

        const layerListContainer = generateWidgetContainer("#layerList", "Layers");
        const layerList = new LayerList({ 
            view: view,
            container: layerListContainer.widgetContainer
        });
        view.ui.add(layerListContainer.containerButton, "top-left");
        view.ui.add(layerListContainer.widgetContainer, "top-left");
        
        const mapLegendContainer = generateWidgetContainer("#mapLegend", "Legend");
        const legend = new Legend({ 
            view: view,
            container: mapLegendContainer.widgetContainer 
        });
        view.ui.add(mapLegendContainer.containerButton, "top-left");
        view.ui.add(mapLegendContainer.widgetContainer, "top-left");
    });
}

initMapControllers();
