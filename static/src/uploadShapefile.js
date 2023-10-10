$("#openUploadModal").click((e) => {

    // inject form elements
    $("#poly-div").html(
        `
        <input type="file" id="shapefile" accept=".zip">
        <progress id="progressBar" value="0" max="100"></progress>
        <p id="status"></p>
        <canvas class="my-auto" id="doughnutChart" height="200"></canvas>
        <div id="doughnut-chart-legend" class="mt-5 text-center"></div>
        <button id="drawButton">Start Drawing</button>
        `
    );

    $("#upload-btn").click(function () {
        var formData = new FormData();
        var fileInput = $("#shapefileInput")[0];
        var file = fileInput.files[0];
        formData.append("shapefile", file);

        $.ajax({
            url: "/upload",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            xhr: function () {
                var xhr = new XMLHttpRequest();
                xhr.upload.addEventListener("progress", function (e) {
                    if (e.lengthComputable) {
                        var percent = (e.loaded / e.total) * 100;
                        $("#progressBar").val(percent);
                        $("#status").html(percent.toFixed(2) + "% uploaded");
                    }
                }, false);
                return xhr;
            },
            success: function (data) {
                $("#status").html("Layer successfully uploaded");
                loadLayer(data.data);
            },
            error: function (xhr, status, error) {
                let res = JSON.parse(xhr.responseText);
                $("#status").html(`<div style="color: red;">${res.message}</div>`);
            }
        });
    });

})

