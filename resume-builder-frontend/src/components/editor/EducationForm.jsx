import { Plus } from 'lucide-react';
import EducationEntry from './EducationEntry';
import EditorSection from './EditorSection';
import { createBlankEducation } from '../../utils/resumeDefaults';

const EducationForm = ({ education, onChange }) => {
  const addEntry = () => {
    onChange([...education, createBlankEducation()]);
  };

  const updateEntry = (index, updatedEntry) => {
    const next = [...education];
    next[index] = updatedEntry;
    onChange(next);
  };

  const removeEntry = (index) => {
    onChange(education.filter((_, i) => i !== index));
  };

  return (
    <EditorSection
      title="Education"
      action={
        <button
          type="button"
          onClick={addEntry}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-signal transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add education
        </button>
      }
    >
      {education.length === 0 ? (
        <p className="text-sm text-ink-muted">No education added yet.</p>
      ) : (
        <div className="space-y-6">
          {education.map((entry, index) => (
            <EducationEntry
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

export default EducationForm;
