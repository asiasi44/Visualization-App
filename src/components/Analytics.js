import { useState } from "react";
import PageContainer from "./PageContainer";
import Particles from "./Particle";
import DecisionTreeZoomImage from "./DecisionTreeZoom";
import TopFeaturesViewer from "./TopFeaturesViewer";
import BidStatistics from "./BidStatistics";
import PerformanceMetricsViewer from "./PerformanceMetricsViewer";
import CalibrationCurveViewer from "./CalibrationCurve";
import LogisticRegression from "./LogisticRegression";

const advertiserOptions = [
  { label: "Vertical Ecommerce Advertiser", value: "verticalEcommerce" },
  { label: "Oil Advertiser", value: "oil" },
  { label: "Tire Advertiser", value: "tire" },
];

const AnalyticsPage = () => {
  const [selectedAdvertiser, setSelectedAdvertiser] =
    useState("verticalEcommerce");

  return (
    <PageContainer className="px-8 relative">
      <Particles />
      <div className="max-w-md mx-auto mt-12 mb-8 text-center">
        <label className="block text-lg font-semibold mb-2 text-white">
          Select Advertiser
        </label>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={selectedAdvertiser}
          onChange={(e) => setSelectedAdvertiser(e.target.value)}
        >
          {advertiserOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-white mb-8 transition-all duration-300 ease-in-out">
        Analytics for{" "}
        <span className="text-indigo-400">
          {
            advertiserOptions.find(
              (option) => option.value === selectedAdvertiser
            )?.label
          }
        </span>
      </h1>
      <DecisionTreeZoomImage advertiser={selectedAdvertiser} />
      <TopFeaturesViewer advertiser={selectedAdvertiser} />
      <BidStatistics advertiser={selectedAdvertiser} clicked={true} />
      <BidStatistics advertiser={selectedAdvertiser} clicked={false} />
      <PerformanceMetricsViewer advertiser={selectedAdvertiser} />
      <CalibrationCurveViewer advertiser={selectedAdvertiser} />
      {selectedAdvertiser === "verticalEcommerce" ? (
        <LogisticRegression advertiser={selectedAdvertiser} />
      ) : (
        ""
      )}
    </PageContainer>
  );
};

export default AnalyticsPage;
