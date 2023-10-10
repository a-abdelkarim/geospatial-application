var doughnutChart;

function updateDoughnutChart(selectedCount, selectedLayer, selectedAreaKM) {
    if (doughnutChart) 
        doughnutChart.destroy();

    const query = selectedLayer.createQuery();
    // Use the queryFeatureCount method to count features in the layer
    selectedLayer.queryFeatureCount(query)
    .then(function (count) {
        let unselectedCount = count - selectedCount;
        const doughnutChartCanvas = document.getElementById("doughnutChart");
        const data = [selectedCount, unselectedCount];
        const labels = ["Selected", "Unselected"];
        const backgroundColors = ["rgba(54, 162, 235, 0.7)", "rgba(255, 99, 132, 0.7)"];
        $("#totalSelectedKM").text(`Total Selected in KM: ${selectedAreaKM}`)

        const doughnutChartData = {
            labels: labels,
            datasets: [
                {
                    data: data,
                    backgroundColor: backgroundColors,
                },
            ],
        };

        doughnutChart = new Chart(doughnutChartCanvas, {
            type: 'doughnut',
            data: doughnutChartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
            },
        });
    })
    .catch(function (error) {
        console.error("Error counting features:", error);
    });

}
