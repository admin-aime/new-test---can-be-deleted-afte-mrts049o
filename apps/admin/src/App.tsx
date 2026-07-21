import { useEffect } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { AdminProvider } from './store/AdminContext';
import Layout from './components/Layout';
import UserDashboard from './pages/UserDashboard';
import UserList from './pages/UserList';
import UserDetail from './pages/UserDetail';
import RolePermissions from './pages/RolePermissions';
import AuditLog from './pages/AuditLog';
import ImportUsers from './pages/ImportUsers';
import ModelOverview from './pages/ModelOverview';

declare global {
  interface Window {
    __APP_ROUTES__?: string[];
    __CAPTURE_MODE__?: boolean;
  }
}

export default function App() {
  useEffect(() => {
    window.__APP_ROUTES__ = [
      '/',
      '/users',
      '/users/usr-1',
      '/roles',
      '/audit-log',
      '/import',
      '/model-overview',
    ];
  }, []);

  return (
    <HashRouter>
      <AdminProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<UserDashboard />} />
            <Route path="users" element={<UserList />} />
            <Route path="users/:id" element={<UserDetail />} />
            <Route path="roles" element={<RolePermissions />} />
            <Route path="audit-log" element={<AuditLog />} />
            <Route path="import" element={<ImportUsers />} />
            <Route path="model-overview" element={<ModelOverview />} />
            <Route path="*" element={
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <h1 className="text-4xl font-bold text-gray-300 mb-4">404</h1>
                <p className="text-gray-500 mb-6">Page not found</p>
                <Link to="/" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">Go to Dashboard</Link>
              </div>
            } />
          </Route>
        </Routes>
      </AdminProvider>
    </HashRouter>
  );
}
