var map, view;
async function initMap()
{
    require([
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/FeatureLayer"
      ], function(Map, MapView, FeatureLayer) {
      
        // Create a map
        map = new Map({
          basemap: "topo-vector"
        });
      
        // Create a view
        view = new MapView({
          container: "viewDiv",
          map: map,
          center: [-118.805, 34.027],
          zoom: 12
        });
      
      });
}

initMap();

  