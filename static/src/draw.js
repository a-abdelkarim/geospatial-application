function startDraw(selectedLayerId, drawGeometryType, startDrawingBtn){
        require([

        "esri/layers/GraphicsLayer",
        "esri/widgets/Sketch",
        "esri/Graphic"

    ], function (GraphicsLayer, Sketch, Graphic) {
        customGraphicsLayer = GraphicsLayer;
        customGraphic = Graphic;

        // const startDrawingButton = document.getElementById("startDrawingBtn");
        // const drawingOptionsModal = new bootstrap.Modal(document.getElementById("drawingOptionsModal"));
        // const startDrawing = document.getElementById("startDrawing");
        // const radioButtons = document.querySelectorAll('input[name="geometryType"]');

        // let selectedGeometryType = "point";

        // radioButtons.forEach(function (radioButton) {
        //     radioButton.addEventListener("change", function (event) {
        //         selectedGeometryType = event.target.value;
        //     });
        // });

        // Add event listener to the "Start Drawing" button to show the modal
        // startDrawingButton.addEventListener("click", function () {
            const graphicsLayer = new GraphicsLayer();
            map.add(graphicsLayer);
        
            sketchWidget = new Sketch({
                view: view,
                layer: graphicsLayer,
            });
        
        //     drawingOptionsModal.show();
        // });

        // Add event listener to the modal's "Start Drawing" button
        startDrawingBtn.addEventListener("click", function () {
            drawingOptionsModal.hide(); // Close the modal
            initAnalysis();
            sketchWidget.create(selectedGeometryType); // Start drawing
        });

    });
}