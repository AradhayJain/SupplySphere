import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

// Context
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import HandleLogin from "./components/HandleLogin";
import DevDashboardRouter from "./DevDashboardRouter";

// Pages
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";

// Dashboards
import ManufacturerDashboard from "./dashboards/ManufacturerDashboard";
import RetailerDashboard from "./dashboards/RetailerDashboard";
import ConsumerDashboard from "./dashboards/ConsumerDashboard";
import LogisticsDashboard from "./dashboards/LogisticsDashboard";

// Manufacturer subpages
import ManufacturerHome from "./dashboards/manufacturer/ManufacturerHome";
import ManufacturerInventory from "./dashboards/manufacturer/ManufacturerInventory";
import ManufacturerSalesHistory from "./dashboards/manufacturer/ManufacturerSalesHistory";
import ManufacturerProfile from "./dashboards/manufacturer/ManufacturerProfile";

// Retailer subpages
import RetailerHome from "./dashboards/retailer/RetailerHome";
import RetailerOrderHistory from "./dashboards/retailer/RetailerOrderHistory";
import RetailerCreateMarket from "./dashboards/retailer/RetailerCreateMarket";
import RetailerSalesHistory from "./dashboards/retailer/RetailerSalesHistory";
import RetailerProfile from "./dashboards/retailer/RetailerProfile";

// Consumer subpages
import ConsumerHome from "./dashboards/consumer/ConsumerHome";
import ConsumerCart from "./dashboards/consumer/ConsumerCart";
import ConsumerOrderHistory from "./dashboards/consumer/ConsumerOrderHistory";
import ConsumerSupport from "./dashboards/consumer/ConsumerSupport";
import ConsumerProfile from "./dashboards/consumer/ConsumerProfile";

// Logistics subpages
import LogisticsHome from "./dashboards/logistics/LogisticsHome";
import LogisticsShipments from "./dashboards/logistics/LogisticsShipments";
import LogisticsFleet from "./dashboards/logistics/LogisticsFleet";
import LogisticsTracking from "./dashboards/logistics/LogisticsTracking";
import LogisticsProfile from "./dashboards/logistics/LogisticsProfile";

// providers
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <CartProvider>
          <Router>
            <Routes>
              {/* --- PUBLIC ROUTES --- */}
              <Route path="/" element={<LandingPage />} />
              <Route
                path="/auth/login"
                element={
                  <HandleLogin>
                    <AuthPage type="login" />
                  </HandleLogin>
                }
              />
              <Route
                path="/auth/signup"
                element={
                  <HandleLogin>
                    <AuthPage type="signup" />
                  </HandleLogin>
                }
              />

              {/* --- PROTECTED DASHBOARD ROUTES --- */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Outlet />
                  </ProtectedRoute>
                }
              >
                {/* Manufacturer dashboard */}
                <Route path="manufacturer" element={<ManufacturerDashboard />}>
                  <Route index element={<ManufacturerHome />} />
                  <Route path="home" element={<ManufacturerHome />} />
                  <Route path="inventory" element={<ManufacturerInventory />} />
                  <Route
                    path="sales-history"
                    element={<ManufacturerSalesHistory />}
                  />
                  <Route path="profile" element={<ManufacturerProfile />} />
                </Route>

                {/* Retailer dashboard */}
                <Route path="retailer" element={<RetailerDashboard />}>
                  <Route index element={<RetailerHome />} />
                  <Route path="home" element={<RetailerHome />} />
                  <Route path="order-history" element={<RetailerOrderHistory />} />
                  <Route path="create-market" element={<RetailerCreateMarket />} />
                  <Route path="sales-history" element={<RetailerSalesHistory />} />
                  <Route path="profile" element={<RetailerProfile />} />
                </Route>

                {/* Consumer dashboard */}
                <Route path="consumer" element={<ConsumerDashboard />}>
                  <Route index element={<ConsumerHome />} />
                  <Route path="home" element={<ConsumerHome />} />
                  <Route path="cart" element={<ConsumerCart />} />
                  <Route
                    path="order-history"
                    element={<ConsumerOrderHistory />}
                  />
                  <Route path="support" element={<ConsumerSupport />} />
                  <Route path="profile" element={<ConsumerProfile />} />
                </Route>

                {/* Logistics dashboard */}
                <Route path="logistics" element={<LogisticsDashboard />}>
                  <Route index element={<LogisticsHome />} />
                  <Route path="home" element={<LogisticsHome />} />
                  <Route path="shipments" element={<LogisticsShipments />} />
                  <Route path="fleet" element={<LogisticsFleet />} />
                  <Route path="tracking" element={<LogisticsTracking />} />
                  <Route path="profile" element={<LogisticsProfile />} />
                </Route>
              </Route>

              {/* --- DEVELOPMENT ROUTES --- */}
              <Route path="/dev/:role" element={<DevDashboardRouter />} />
            </Routes>
          </Router>
        </CartProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
