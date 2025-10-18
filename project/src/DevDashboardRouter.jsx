import React, { Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';

// Lazy load dashboards for faster dev hot reloads
const ManufacturerDashboard = lazy(() => import('./dashboards/ManufacturerDashboard'));
const RetailerDashboard = lazy(() => import('./dashboards/RetailerDashboard'));
const ConsumerDashboard = lazy(() => import('./dashboards/ConsumerDashboard'));
const LogisticsDashboard = lazy(() => import('./dashboards/LogisticsDashboard'));

const DevDashboardRouter = () => {
  const { role } = useParams();

  // Map role → component
  const dashboardMap = {
    manufacturer: ManufacturerDashboard,
    retailer: RetailerDashboard,
    consumer: ConsumerDashboard,
    logistics: LogisticsDashboard,
  };

  const SelectedDashboard = dashboardMap[role?.toLowerCase()];

  // Invalid role
  if (!SelectedDashboard) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-dark-100 text-light-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Invalid Role</h1>
          <p className="text-light-400">Select a valid role in the URL, e.g., /dev/consumer</p>
          <div className="mt-4 flex gap-4 justify-center">
            {Object.keys(dashboardMap).map((r) => (
              <a
                key={r}
                href={`/dev/${r}`}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Render dashboard with previewMode
  return (
    <DashboardLayout>
      <Suspense fallback={<div className="p-4 text-center">Loading {role} dashboard...</div>}>
        <SelectedDashboard previewMode />
      </Suspense>
    </DashboardLayout>
  );
};

export default DevDashboardRouter;
