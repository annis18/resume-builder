import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Loader2, Plus } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';
import ResumeCard from '../components/dashboard/ResumeCard';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchResumes = async () => {
      try {
        const { data } = await api.get('/resumes');
        if (isMounted) setResumes(data);
      } catch {
        if (isMounted) setError('Could not load your resumes. Try refreshing the page.');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    fetchResumes();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleCreate = async () => {
    setIsCreating(true);
    setError('');
    try {
      const { data } = await api.post('/resumes', {});
      navigate(`/editor/${data._id}`);
    } catch {
      setError('Could not create a new resume. Try again.');
      setIsCreating(false);
    }
  };

  const handleDelete = async (resume) => {
    const confirmed = window.confirm(`Delete "${resume.title}"? This can't be undone.`);
    if (!confirmed) return;

    const previous = resumes;
    setResumes((prev) => prev.filter((r) => r._id !== resume._id));
    try {
      await api.delete(`/resumes/${resume._id}`);
    } catch {
      setResumes(previous);
      setError('Could not delete that resume. Try again.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-display text-3xl text-ink mb-1">Welcome, {user?.name}</h1>
          <p className="text-ink-muted text-sm">
            {resumes.length > 0
              ? `${resumes.length} resume${resumes.length === 1 ? '' : 's'} saved`
              : 'Build your first resume to get started.'}
          </p>
        </div>
        <button
          type="button"
          onClick={handleCreate}
          disabled={isCreating}
          className="inline-flex items-center gap-2 bg-ink text-paper px-5 py-2.5 font-medium hover:bg-signal transition-colors disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed shrink-0"
        >
          {isCreating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          New Resume
        </button>
      </div>

      {error && (
        <div role="alert" className="mb-6 text-sm text-danger border border-danger/30 bg-danger/5 px-4 py-3">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-24">
          <Loader2 className="w-6 h-6 animate-spin text-ink-muted" />
        </div>
      ) : resumes.length === 0 ? (
        <div className="text-center py-24 border border-dashed border-rule">
          <FileText className="w-8 h-8 text-ink-muted mx-auto mb-4" strokeWidth={1} />
          <h2 className="font-display text-xl text-ink mb-2">No resumes yet</h2>
          <p className="text-ink-muted text-sm mb-6">Create your first resume to get started.</p>
          <button
            type="button"
            onClick={handleCreate}
            className="inline-flex items-center gap-2 bg-ink text-paper px-5 py-2.5 font-medium hover:bg-signal transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            New Resume
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <ResumeCard key={resume._id} resume={resume} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
