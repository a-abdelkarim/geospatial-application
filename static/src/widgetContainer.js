function generateWidgetContainer(containerElementId, buttonLabel)
{
    // Create the button to toggle the Basemap Gallery
    const containerButton = document.createElement("button");
    containerButton.type = "button";
    containerButton.className = "btn btn-secondary mt-2";
    containerButton.innerHTML = `${buttonLabel} <i class='bi bi-chevron-right'></i>`;
    const widgetContainer = document.querySelector(containerElementId);
    containerButton.addEventListener("click", function () {
        // Toggle the visibility of the Basemap Gallery
        widgetContainer.classList.toggle("collapse");
        const icon = containerButton.querySelector("i");
        if (widgetContainer.classList.contains("collapse")) {
        icon.classList.remove("bi-chevron-down");
        icon.classList.add("bi-chevron-right");
        } else {
        icon.classList.remove("bi-chevron-right");
        icon.classList.add("bi-chevron-down");
        }
    });

    return {containerButton: containerButton, widgetContainer: widgetContainer}
}