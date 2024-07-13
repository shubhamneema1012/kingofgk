import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Dynamically import all files from the 'pages' folder
// Assuming the setup of require.context is correct and doesn't need changes
const pageRequireContext = require.context('./pages', true, /\.jsx$/);

const DynamicRoutes = () => {
  const routes = pageRequireContext.keys().map((filename) => {
    const pagePath = filename.replace('./', '').replace('.jsx', '');
    const PageComponent = React.lazy(() =>
      import(`./pages/${pagePath}.jsx`) // Ensure this path matches your structure
    );

    return (
      <Route
        key={pagePath}
        path={`/${pagePath === 'index' ? '' : pagePath}`}
        element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <PageComponent />
          </React.Suspense>
        }
      />
    );
  });

  // Add a catch-all route for not found pages
  routes.push(
    <Route key="notfound" path="*" element={<Navigate to="/notfound" />} />
  );

  return (
    <Router>
      <Routes>{routes}</Routes>
    </Router>
  );
};

export default DynamicRoutes;
