$("#openRemoveModal").click((e) => {

    const layerSelect = document.getElementById('layerSelect');
    layerSelect.innerHTML = "";

    map.layers.forEach((layer) => {
        const option = document.createElement('option');
        option.value = layer.id;
        option.textContent = layer.title;
        layerSelect.appendChild(option);
    });

    const removeLayerButton = document.getElementById('removeLayer');

    removeLayerButton.addEventListener('click', (e) => {
        const selectedLayerId = layerSelect.value;

        // Find the selected layer by its ID
        const layerToRemove = map.findLayerById(selectedLayerId);

        if (layerToRemove) {
            map.remove(layerToRemove);
            $("#layerSelect option[value='" + selectedLayerId + "']").remove();
        }
    });


});