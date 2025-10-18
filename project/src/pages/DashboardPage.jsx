import React from "react";
import { Routes, Route } from "react-router-dom";

import ManufacturerDashboard from "../dashboards/ManufacturerDashboard";
import RetailerDashboard from "../dashboards/RetailerDashboard";
import ConsumerDashboard from "../dashboards/ConsumerDashboard";
import LogisticsDashboard from "../dashboards/LogisticsDashboard";
import PurchaseOrders from "./PurchaseOrders";

const DashboardPage = () => {
  return (
    <Routes>
      <Route path="manufacturer" element={<ManufacturerDashboard />} />
      <Route path="retailer" element={<RetailerDashboard />} />
      <Route path="consumer" element={<ConsumerDashboard />} />
      <Route path="logistics" element={<LogisticsDashboard />} />
      <Route path="purchase-orders" element={<PurchaseOrders />} />
    </Routes>
  );
};

export default DashboardPage;
