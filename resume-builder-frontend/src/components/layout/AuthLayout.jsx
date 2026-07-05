import { Outlet } from 'react-router-dom';

const AuthLayout = () => (
  <div className="min-h-screen bg-paper">
    <Outlet />
  </div>
);

export default AuthLayout;
