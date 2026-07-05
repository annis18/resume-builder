import { Trash2 } from 'lucide-react';
import FormField from './FormField';

const CertificationEntry = ({ entry, onChange, onRemove }) => {
  const update = (field) => (e) => {
    onChange({ ...entry, [field]: e.target.value });
  };

  return (
    <div className="border border-rule p-6 relative">
      <button
        type="button"
        onClick={onRemove}
        aria-label="Remove this certification"
        className="absolute top-4 right-4 text-ink-muted hover:text-danger transition-colors"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 pr-8">
        <FormField
          label="Certification title"
          value={entry.title}
          onChange={update('title')}
          placeholder="AWS Certified Solutions Architect"
        />
        <FormField
          label="Issuer"
          value={entry.issuer}
          onChange={update('issuer')}
          placeholder="Amazon Web Services"
        />
        <FormField label="Date" value={entry.date} onChange={update('date')} placeholder="Jun 2025" />
        <FormField
          label="Description"
          value={entry.description}
          onChange={update('description')}
          placeholder="Optional — a line of extra context"
        />
      </div>
    </div>
  );
};

export default CertificationEntry;
