import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import { MatrixController, MatrixElement } from "chartjs-chart-matrix";
import { motion } from "framer-motion";

Chart.register(MatrixController, MatrixElement);

const fileMap = {
  verticalEcommerce: {
    metrics: "/analytics/vertical_ecommerce_performance_metrics.json",
    roc: "/analytics/vertical_ecommerce_roc_data.json",
  },
  oil: {
    metrics: "/analytics/oil_performance_metrics.json",
    roc: "/analytics/oil_roc_data.json",
  },
  tire: {
    metrics: "/analytics/tire_performance_metrics.json",
    roc: "/analytics/tire_roc_data.json",
  },
};

const PerformanceMetricsViewer = ({ advertiser = "verticalEcommerce" }) => {
  const [metrics, setMetrics] = useState(null);
  const [rocData, setRocData] = useState(null);
  const matrixRef = useRef(null);
  const rocRef = useRef(null);
  const matrixChart = useRef(null);
  const rocChart = useRef(null);

  useEffect(() => {
    const { metrics: metricsPath, roc: rocPath } = fileMap[advertiser];

    // Load metrics
    fetch(metricsPath)
      .then((res) => res.json())
      .then(setMetrics)
      .catch((err) => console.error("Error loading metrics:", err));

    // Load ROC data
    fetch(rocPath)
      .then((res) => res.json())
      .then(setRocData)
      .catch((err) => console.error("Error loading ROC:", err));
  }, [advertiser]);

  // Confusion Matrix
  useEffect(() => {
    if (!metrics || !matrixRef.current) return;
    if (matrixChart.current) matrixChart.current.destroy();

    const {
      confusion_matrix: {
        true_positive,
        false_positive,
        true_negative,
        false_negative,
      },
    } = metrics;

    const matrixData = [
      { x: "No Click", y: "No Click", v: true_negative },
      { x: "Click", y: "No Click", v: false_positive },
      { x: "No Click", y: "Click", v: false_negative },
      { x: "Click", y: "Click", v: true_positive },
    ];

    const ctx = matrixRef.current.getContext("2d");

    matrixChart.current = new Chart(ctx, {
      type: "matrix",
      data: {
        datasets: [
          {
            label: "Confusion Matrix",
            data: matrixData,
            backgroundColor: (ctx) => {
              const value = ctx.raw.v;
              return value > 50000 ? "#00bcd4" : "#ff8a65";
            },
            borderWidth: 1,
            borderColor: "#fff",
            width: ({ chart }) =>
              chart.chartArea ? chart.chartArea.width / 2 - 10 : 100,
            height: ({ chart }) =>
              chart.chartArea ? chart.chartArea.height / 2 - 10 : 100,
          },
        ],
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label: (ctx) =>
                `${ctx.raw.y} predicted as ${ctx.raw.x}: ${ctx.raw.v}`,
            },
          },
          datalabels: {
            color: "#fff",
            font: {
              weight: "bold",
            },
            formatter: (value) => value.v, // display raw count
          },
        },
        scales: {
          x: {
            type: "category",
            labels: ["No Click", "Click"],
            title: { display: true, text: "Predicted" },
          },
          y: {
            type: "category",
            labels: ["Click", "No Click"],
            title: { display: true, text: "Actual" },
          },
        },
      },
    });

    return () => matrixChart.current?.destroy();
  }, [metrics]);

  // ROC Curve
  useEffect(() => {
    if (!rocData || !rocRef.current) return;
    if (rocChart.current) rocChart.current.destroy();

    const ctx = rocRef.current.getContext("2d");

    rocChart.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: rocData.fpr,
        datasets: [
          {
            label: "ROC Curve",
            data: rocData.fpr.map((fpr, i) => ({ x: fpr, y: rocData.tpr[i] })),
            borderColor: "#4ade80",
            backgroundColor: "rgba(74, 222, 128, 0.2)",
            fill: true,
            tension: 0.8,
            pointRadius: 0,
          },
          {
            label: "Random Classifier",
            data: Array.from({ length: 100 }, (_, i) => ({
              x: i / 100,
              y: i / 100,
            })),
            borderColor: "#ccc",
            borderDash: [5, 5],
            fill: false,
            pointRadius: 0,
          },
        ],
      },
      options: {
        scales: {
          x: {
            title: { display: true, text: "False Positive Rate" },
            min: 0,
            max: 1,
          },
          y: {
            title: { display: true, text: "True Positive Rate" },
            min: 0,
            max: 1,
          },
        },
      },
    });

    return () => rocChart.current?.destroy();
  }, [rocData]);

  if (!metrics) return <p className="text-white">Loading...</p>;

  const {
    auc_roc,
    precision,
    recall,
    f1_score,
    class_distribution: { clicked, not_clicked },
    confusion_matrix,
  } = metrics;

  return (
    <motion.div
      className="max-w-6xl mx-auto text-white px-4 py-8"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-center mb-6 capitalize">
        Performance - {advertiser}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div className="bg-gray-900 p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Metrics Summary</h3>
          <ul className="text-lg space-y-2">
            <li>
              <strong>AUC-ROC:</strong> {auc_roc}
            </li>
            <li>
              <strong>Precision:</strong> {precision}
            </li>
            <li>
              <strong>Recall:</strong> {recall}
            </li>
            <li>
              <strong>F1 Score:</strong> {f1_score}
            </li>
            <li>
              <strong>Clicked:</strong> {clicked}
            </li>
            <li>
              <strong>Not Clicked:</strong> {not_clicked}
            </li>
          </ul>
        </motion.div>

        <motion.div className="bg-gray-900 p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Confusion Matrix</h3>
          <canvas ref={matrixRef} height={260} />
          <div className="mt-2 text-sm text-center">
            TP: {confusion_matrix.true_positive}, FP:{" "}
            {confusion_matrix.false_positive}, <br />
            TN: {confusion_matrix.true_negative}, FN:{" "}
            {confusion_matrix.false_negative}
          </div>
        </motion.div>
      </div>

      <div className="bg-gray-900 p-6 rounded-xl shadow-md mt-8">
        <h3 className="text-xl font-semibold mb-4 text-center">ROC Curve</h3>
        <canvas ref={rocRef} height={260} />
      </div>
    </motion.div>
  );
};

export default PerformanceMetricsViewer;
