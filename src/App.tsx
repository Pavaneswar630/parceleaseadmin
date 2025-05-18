import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import LoadingSpinner from './components/common/LoadingSpinner';

// Lazy load pages for better performance
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Bookings = lazy(() => import('./pages/Bookings'));
const TrackShipment = lazy(() => import('./pages/TrackShipment'));
const Users = lazy(() => import('./pages/Users'));
const SupportTickets = lazy(() => import('./pages/SupportTickets'));
const Payments = lazy(() => import('./pages/Payments'));
const Vehicles = lazy(() => import('./pages/Vehicles'));
const Faq = lazy(() => import('./pages/Faq'));
const Settings = lazy(() => import('./pages/Settings'));
const Reports = lazy(() => import('./pages/Reports'));

function App() {
  return (
    <AppLayout>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/track" element={<TrackShipment />} />
          <Route path="/users" element={<Users />} />
          <Route path="/support" element={<SupportTickets />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </Suspense>
    </AppLayout>
  );
}

export default App;