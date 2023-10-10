var customMap, 
customMapView, 
customGraphicsLayer, 
customSketch, 
customGraphic, 
customGeoJSONLayer, 
customSearch, 
customFullScreen,
customBasemapGallery,
customLegend,
customGeometryEngine;

async function initRequires()
{
    require([
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/GraphicsLayer",
        "esri/widgets/Sketch",
        "esri/Graphic",
        "esri/layers/GeoJSONLayer",
        "esri/widgets/Search",
        "esri/widgets/Fullscreen",
        "esri/widgets/BasemapGallery",
        "esri/widgets/Legend",
        "esri/widgets/LayerList",
        "esri/geometry/geometryEngine"
      ], function(
        Map, 
        MapView,
        GraphicsLayer, 
        Sketch, 
        Graphic,
        GeoJSONLayer,
        Search, 
        Fullscreen, 
        BasemapGallery, 
        Legend,
        LayerList,
        geometryEngine,
        ) {
            customMap = Map;
            customMapView = MapView;
            customGraphicsLayer = GraphicsLayer;
            customSketch = Sketch;
            customGraphic = Graphic;
            customGeoJSONLayer = GeoJSONLayer;
            customSearch = Search;
            customFullScreen = Fullscreen;
            customBasemapGallery = BasemapGallery;
            customLegend = Legend;
            customLayerList = LayerList;
            customGeometryEngine = geometryEngine;

        
    });
}

initRequires();

  