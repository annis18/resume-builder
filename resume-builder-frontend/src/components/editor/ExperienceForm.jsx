import { Plus } from 'lucide-react';
import ExperienceEntry from './ExperienceEntry';
import EditorSection from './EditorSection';
import { createBlankExperience } from '../../utils/resumeDefaults';

const ExperienceForm = ({ experience, onChange }) => {
  const addEntry = () => {
    onChange([...experience, createBlankExperience()]);
  };

  const updateEntry = (index, updatedEntry) => {
    const next = [...experience];
    next[index] = updatedEntry;
    onChange(next);
  };

  const removeEntry = (index) => {
    onChange(experience.filter((_, i) => i !== index));
  };

  return (
    <EditorSection
      title="Experience"
      description="One entry per role. Add a job title and company, then let AI draft the bullet points."
      action={
        <button
          type="button"
          onClick={addEntry}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-signal transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add role
        </button>
      }
    >
      {experience.length === 0 ? (
        <p className="text-sm text-ink-muted">No experience added yet.</p>
      ) : (
        <div className="space-y-6">
          {experience.map((entry, index) => (
            <ExperienceEntry
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

export default ExperienceForm;
