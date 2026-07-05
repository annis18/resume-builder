import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { useAuth } from './hooks/useAuth';
import AuthLayout from './components/layout/AuthLayout';
import AppLayout from './components/layout/AppLayout';
import LoadingScreen from './components/layout/LoadingScreen';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ResumeEditor from './pages/ResumeEditor';
import NotFound from './pages/NotFound';

// Sends "/" to the dashboard if already signed in, or to login otherwise —
// there's no separate public marketing page in this build.
const RootRedirect = () => {
  const { user, isLoading } = useAuth();
  if (isLoading) return <LoadingScreen />;
  return <Navigate to={user ? '/dashboard' : '/login'} replace />;
};

const router = createBrowserRouter([
  { path: '/', element: <RootRedirect /> },
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: '/dashboard', element: <Dashboard /> },
          { path: '/editor/:id', element: <ResumeEditor /> },
        ],
      },
    ],
  },
  { path: '*', element: <NotFound /> },
]);

// AuthProvider wraps the router (rather than living inside it) so every
// route — including the router config's own RootRedirect/ProtectedRoute —
// can call useAuth().
const App = () => (
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);

export default App;
