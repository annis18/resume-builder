import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { formatUpdatedAt } from '../../utils/formatDate';

const ResumeCard = ({ resume, onDelete }) => (
  <div className="group relative border border-rule p-6 hover:border-ink transition-colors">
    <Link to={`/editor/${resume._id}`} className="block">
      <p className="font-mono text-xs text-ink-muted mb-3">Updated {formatUpdatedAt(resume.updatedAt)}</p>
      <h3 className="font-display text-xl text-ink mb-1 pr-6">{resume.title}</h3>
      {resume.personalInfo?.jobTitle && (
        <p className="text-sm text-ink-muted">{resume.personalInfo.jobTitle}</p>
      )}
    </Link>
    <button
      type="button"
      onClick={() => onDelete(resume)}
      aria-label={`Delete ${resume.title}`}
      className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity text-ink-muted hover:text-danger cursor-pointer"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  </div>
);

export default ResumeCard;
