import { Plus } from 'lucide-react';
import CertificationEntry from './CertificationEntry';
import EditorSection from './EditorSection';
import { createBlankCertification } from '../../utils/resumeDefaults';

const CertificationForm = ({ certifications, onChange }) => {
  const addEntry = () => {
    onChange([...certifications, createBlankCertification()]);
  };

  const updateEntry = (index, updatedEntry) => {
    const next = [...certifications];
    next[index] = updatedEntry;
    onChange(next);
  };

  const removeEntry = (index) => {
    onChange(certifications.filter((_, i) => i !== index));
  };

  return (
    <EditorSection
      title="Certifications"
      action={
        <button
          type="button"
          onClick={addEntry}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-signal transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add certification
        </button>
      }
    >
      {certifications.length === 0 ? (
        <p className="text-sm text-ink-muted">No certifications added yet.</p>
      ) : (
        <div className="space-y-6">
          {certifications.map((entry, index) => (
            <CertificationEntry
              key={entry._id || entry.key}
              entry={entry}
              onChange={(updated) => updateEntry(index, updated)}
              onRemove={() => removeEntry(index)}
            />
          ))}
        </div>
      )}
    </EditorSection>
  );
};

export default CertificationForm;
