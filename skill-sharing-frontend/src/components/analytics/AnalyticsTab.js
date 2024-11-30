import React, { useState } from "react";

// Import your analytic components
import Metrics from "./Metrics";
import PerDay from "./PerDay";
import BasicAnalytics from "./BasicAnalytics";
import SkillsAnalytics from "./SkillsAnalytics";

const AnalyticsTab = () => {
  // State to track which component should render
  const [activeTab, setActiveTab] = useState("BasicAnalytics");

  // Function to render the correct component based on the active tab
  const renderActiveComponent = () => {
    switch (activeTab) {
      case "BasicAnalytics":
        return <BasicAnalytics />;
      case "PerDay":
        return <PerDay />;
      case "SkillsAnalytics":
        return <SkillsAnalytics />;
      case "Metrics":
        return <Metrics />;
      default:
        return <BasicAnalytics />;
    }
  };

  return (
    <div className="analytics-tab mx-auto max-w-4xl p-4">
      {/* Navigation for the tabs */}
      <div className="tab-navigation flex space-x-4 border-b-2 border-gray-300 pb-2 mb-4">
        <button
          className={`tab-button px-4 py-2 text-sm rounded-md ${
            activeTab === "BasicAnalytics"
              ? "bg-indigo-600 text-white font-semibold"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("BasicAnalytics")}
        >
          Basic Analytics
        </button>
        <button
          className={`tab-button px-4 py-2 text-sm rounded-md ${
            activeTab === "PerDay"
              ? "bg-indigo-600 text-white font-semibold"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("PerDay")}
        >
          Per Day
        </button>
        <button
          className={`tab-button px-4 py-2 text-sm rounded-md ${
            activeTab === "SkillsAnalytics"
              ? "bg-indigo-600 text-white font-semibold"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("SkillsAnalytics")}
        >
          Skills Analytics
        </button>
        <button
          className={`tab-button px-4 py-2 text-sm rounded-md ${
            activeTab === "Metrics"
              ? "bg-indigo-600 text-white font-semibold"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("Metrics")}
        >
          Metrics
        </button>
      </div>

      {/* Render the selected component */}
      <div className="tab-content mt-4 p-6 bg-gray-50 border border-gray-200 rounded-md shadow-sm">
        {renderActiveComponent()}
      </div>
    </div>
  );
};

export default AnalyticsTab;
