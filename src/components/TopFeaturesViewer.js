import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";

const TopFeaturesChart = ({ advertiser }) => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  // Updated JSON file paths as requested
  const fileMap = {
    verticalEcommerce: "/analytics/vertical_ecommerce_feature_importances.json",
    oil: "/analytics/oil_feature_importances.json",
    tire: "/analytics/tire_feature_importances.json",
  };

  useEffect(() => {
    if (!advertiser) return;

    fetch(fileMap[advertiser])
      .then((res) => res.json())
      .then((data) => {
        const topFeatures = data
          .sort((a, b) => b.importance - a.importance)
          .slice(0, 8);

        const labels = topFeatures.map((item) => item.feature);
        const values = topFeatures.map((item) => item.importance);

        if (chartInstance) {
          chartInstance.destroy();
        }

        const newChartInstance = new Chart(chartRef.current, {
          type: "bar",
          data: {
            labels,
            datasets: [
              {
                label: "Feature Importance",
                data: values,
                backgroundColor: "rgba(54, 162, 235, 0.7)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            indexAxis: "y",
            scales: {
              x: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Importance",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Feature",
                },
              },
            },
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                enabled: true,
              },
            },
          },
        });

        setChartInstance(newChartInstance);
      })
      .catch((err) => {
        console.error("Failed to load feature importance JSON:", err);
      });
  }, [advertiser]);

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default TopFeaturesChart;
