$("#openSelectFeaturesModal").click((e) => {

    const openSelectFeaturesModal = new bootstrap.Modal(document.getElementById("openSelectFeaturesModal"));

    let selectedGeometryType = null;
    let selectedLayer = null;
    let currentGraphicsLayer = null;

    
    // Replace 'layerDropdown' with the ID of your dropdown select element
    const layerDropdown = document.getElementById("layerDropdown");
    

        // Clear existing options
        layerDropdown.innerHTML = "";

        // Add an option for each layer
        map.layers.forEach(function (layer) {
            const option = document.createElement("option");
            option.value = layer.id;
            option.text = layer.title;
            layerDropdown.appendChild(option);

            if (layer instanceof customGraphicsLayer) currentGraphicsLayer = layer;
             
        });
    
        const geometryRadioButtons = document.querySelectorAll('input[name="geometryType"]');

        geometryRadioButtons.forEach(function (radioButton) {
            radioButton.addEventListener("change", function (event) {
                selectedGeometryType = event.target.value;
            });
        }); 

    // Handle the "Start Drawing" button click
    const startDrawingButton = document.getElementById("startDrawing");
    startDrawingButton.addEventListener("click", function () {
        // Get the selected layer index from the dropdown
        const selectedLayerId = layerDropdown.value;

        selectedLayer = map.findLayerById(selectedLayerId);

        if (selectedGeometryType)
        {
            let graphicsLayer = null;
            
            if (currentGraphicsLayer){
                graphicsLayer = currentGraphicsLayer;
            } else {
                graphicsLayer = new customGraphicsLayer({title: "Drawing Features"});
            }
            
        
            sketchWidget = new customSketch({
                view: view,
                layer: graphicsLayer,
            });
            openSelectFeaturesModal.hide();
            getSelectedFeatures(selectedLayer);
            sketchWidget.create(selectedGeometryType);
            map.add(graphicsLayer);

        }
        $('#layerSelectionModal').modal('hide');

        document.getElementById('clearSelection').style.display = 'inline-block';
    });


});