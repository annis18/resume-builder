import { Link } from 'react-router-dom';
import { FileText, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="border-b border-rule">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-ink">
          <FileText className="w-5 h-5" strokeWidth={1.5} />
          <span className="font-display text-lg">Resumeist</span>
        </Link>

        <div className="flex items-center gap-6">
          <span className="text-sm text-ink-muted hidden sm:inline">{user?.name}</span>
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink transition-colors"
          >
            <LogOut className="w-4 h-4" strokeWidth={1.5} />
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
