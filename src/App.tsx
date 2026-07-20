import { useEffect } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { CrmProvider } from './store/CrmContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Accounts from './pages/Accounts';
import AccountDetail from './pages/AccountDetail';
import Contacts from './pages/Contacts';
import ContactDetail from './pages/ContactDetail';
import Opportunities from './pages/Opportunities';
import OpportunityDetail from './pages/OpportunityDetail';
import Pipeline from './pages/Pipeline';
import Activities from './pages/Activities';
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
      '/accounts',
      '/accounts/acc-1',
      '/contacts',
      '/contacts/con-1',
      '/opportunities',
      '/opportunities/opp-1',
      '/pipeline',
      '/activities',
      '/model-overview',
    ];
  }, []);

  return (
    <HashRouter>
      <CrmProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="accounts" element={<Accounts />} />
            <Route path="accounts/:id" element={<AccountDetail />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="contacts/:id" element={<ContactDetail />} />
            <Route path="opportunities" element={<Opportunities />} />
            <Route path="opportunities/:id" element={<OpportunityDetail />} />
            <Route path="pipeline" element={<Pipeline />} />
            <Route path="activities" element={<Activities />} />
            <Route path="model-overview" element={<ModelOverview />} />
            <Route path="*" element={
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <h1 className="text-4xl font-bold text-gray-300 mb-4">404</h1>
                <p className="text-gray-500 mb-6">Page not found</p>
                <Link to="/" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">Go to Dashboard</Link>
              </div>
            } />
          </Route>
        </Routes>
      </CrmProvider>
    </HashRouter>
  );
}
