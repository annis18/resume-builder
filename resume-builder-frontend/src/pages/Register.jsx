import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsSubmitting(true);
    try {
      await register(form.name, form.email, form.password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 text-ink">
            <FileText className="w-6 h-6" strokeWidth={1.5} />
            <span className="font-display text-xl">Resumeist</span>
          </Link>
        </div>

        <div className="border-t border-rule pt-8">
          <h1 className="font-display text-3xl text-ink mb-1">Create your account</h1>
          <p className="text-ink-muted text-sm mb-8">Free to start. Your first resume in minutes.</p>

          {error && (
            <div role="alert" className="mb-6 text-sm text-danger border border-danger/30 bg-danger/5 px-4 py-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <label className="block">
              <span className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-2">
                Full name
              </span>
              <input
                type="text"
                name="name"
                autoComplete="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full border-0 border-b border-rule bg-transparent py-2 text-ink placeholder:text-ink-muted/50 focus:outline-none focus:border-signal transition-colors"
                placeholder="Jordan Lee"
              />
            </label>

            <label className="block">
              <span className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-2">
                Email
              </span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full border-0 border-b border-rule bg-transparent py-2 text-ink placeholder:text-ink-muted/50 focus:outline-none focus:border-signal transition-colors"
                placeholder="you@example.com"
              />
            </label>

            <label className="block">
              <span className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-2">
                Password
              </span>
              <input
                type="password"
                name="password"
                autoComplete="new-password"
                required
                minLength={6}
                value={form.password}
                onChange={handleChange}
                className="w-full border-0 border-b border-rule bg-transparent py-2 text-ink placeholder:text-ink-muted/50 focus:outline-none focus:border-signal transition-colors"
                placeholder="At least 6 characters"
              />
            </label>

            <label className="block">
              <span className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-2">
                Confirm password
              </span>
              <input
                type="password"
                name="confirmPassword"
                autoComplete="new-password"
                required
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full border-0 border-b border-rule bg-transparent py-2 text-ink placeholder:text-ink-muted/50 focus:outline-none focus:border-signal transition-colors"
                placeholder="••••••••"
              />
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-ink text-paper py-3 font-medium tracking-wide hover:bg-signal transition-colors disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {isSubmitting ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          <p className="text-sm text-ink-muted mt-8 text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-ink underline underline-offset-4 hover:text-signal">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
