import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const AppLayout = () => (
  <div className="min-h-screen bg-paper">
    <Navbar />
    <main>
      <Outlet />
    </main>
  </div>
);

export default AppLayout;
