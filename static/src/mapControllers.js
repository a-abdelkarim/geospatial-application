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

        const basemapGallery = new BasemapGallery({
            view,
            source: {
                portal: {
                    url: "https://www.arcgis.com",
                    useVectorBasemaps: true
                }
            },
            container: "basemapGallery",
        });

        // Create the button to toggle the Basemap Gallery
        const basemapButton = document.createElement("button");
        basemapButton.type = "button";
        basemapButton.className = "btn btn-secondary mt-2";
        basemapButton.innerHTML = "Basemap Gallery <i class='bi bi-chevron-right'></i>";
        basemapButton.addEventListener("click", function () {
            // Toggle the visibility of the Basemap Gallery
            const galleryContainer = document.querySelector("#basemapGallery");
            galleryContainer.classList.toggle("collapse");
            const icon = basemapButton.querySelector("i");
            if (galleryContainer.classList.contains("collapse")) {
            icon.classList.remove("bi-chevron-down");
            icon.classList.add("bi-chevron-right");
            } else {
            icon.classList.remove("bi-chevron-right");
            icon.classList.add("bi-chevron-down");
            }
        });

        view.ui.add(basemapButton, {
            position: "top-right",
        });
        view.ui.add(basemapGallery, {
            position: "top-right",
        });

        const legend = new Legend({ view });
        view.ui.add(legend, "bottom-left");

        const layerList = new LayerList({ view });
        view.ui.add(layerList, "top-left");
    });
}

initMapControllers();
