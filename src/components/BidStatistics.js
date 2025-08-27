import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";

const fileMap = {
  verticalEcommerce: {
    clicked: "/analytics/vertical_ecommerce_bids_clicked_histogram.json",
    unclicked: "/analytics/vertical_ecommerce_bids_unclicked_histogram.json",
  },
  oil: {
    clicked: "/analytics/oil_bids_clicked_histogram.json",
    unclicked: "/analytics/oil_bids_unclicked_histogram.json",
  },
  tire: {
    clicked: "/analytics/tire_bids_clicked_histogram.json",
    unclicked: "/analytics/tire_bids_unclicked_histogram.json",
  },
};

const BidStatistics = ({ advertiser, clicked }) => {
  const [histData, setHistData] = useState(null);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const fileKey = clicked ? "clicked" : "unclicked";
    const jsonFile = fileMap[advertiser][fileKey];

    fetch(jsonFile)
      .then((res) => res.json())
      .then((data) => setHistData(data))
      .catch((err) => console.error("Error loading histogram JSON:", err));
  }, [advertiser, clicked]);

  useEffect(() => {
    if (!histData) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: histData.labels.map((v) => v.toFixed(2)),
        datasets: [
          {
            label: clicked ? "Clicked Bids" : "Unclicked Bids",
            data: histData.counts,
            backgroundColor: clicked
              ? "rgba(0, 191, 255, 0.85)" // Deep Sky Blue, more vivid
              : "rgba(255, 69, 0, 0.85)", // Orange Red, more vivid
            borderColor: clicked
              ? "rgba(0, 149, 182, 1)" // Darker blue border
              : "rgba(178, 34, 34, 1)", // Darker red border
            borderWidth: 2,
            hoverBackgroundColor: clicked
              ? "rgba(30, 144, 255, 1)" // Dodger Blue on hover
              : "rgba(255, 99, 71, 1)", // Tomato on hover
            hoverBorderColor: "#222",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: "#fff", // White legend text for dark bg
              font: { size: 16, weight: "bold" },
            },
          },
          tooltip: {
            enabled: true,
            backgroundColor: "rgba(0,0,0,0.75)",
            titleColor: "#fff",
            bodyColor: "#ddd",
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Bid Value",
              color: "#eee",
              font: { size: 14, weight: "bold" },
            },
            ticks: {
              color: "#eee",
              font: { size: 12 },
              maxRotation: 45,
              minRotation: 45,
            },
            grid: {
              color: "rgba(255, 255, 255, 0.15)",
            },
          },
          y: {
            title: {
              display: true,
              text: "Frequency",
              color: "#eee",
              font: { size: 14, weight: "bold" },
            },
            ticks: {
              color: "#eee",
              font: { size: 12 },
              beginAtZero: true,
            },
            grid: {
              color: "rgba(255, 255, 255, 0.15)",
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [histData, clicked]);

  return (
    <div
      style={{
        backgroundColor: "#0a2a4f",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <canvas ref={chartRef} />
      {!histData && <p style={{ color: "#eee" }}>Loading histogram data...</p>}
    </div>
  );
};

export default BidStatistics;
