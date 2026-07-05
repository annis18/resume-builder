import { Plus } from 'lucide-react';
import ProjectEntry from './ProjectEntry';
import EditorSection from './EditorSection';
import { createBlankProject } from '../../utils/resumeDefaults';

const ProjectForm = ({ projects, onChange }) => {
  const addEntry = () => {
    onChange([...projects, createBlankProject()]);
  };

  const updateEntry = (index, updatedEntry) => {
    const next = [...projects];
    next[index] = updatedEntry;
    onChange(next);
  };

  const removeEntry = (index) => {
    onChange(projects.filter((_, i) => i !== index));
  };

  return (
    <EditorSection
      title="Projects"
      description="Personal, academic, or side projects worth showing off."
      action={
        <button
          type="button"
          onClick={addEntry}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-signal transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add project
        </button>
      }
    >
      {projects.length === 0 ? (
        <p className="text-sm text-ink-muted">No projects added yet.</p>
      ) : (
        <div className="space-y-6">
          {projects.map((entry, index) => (
            <ProjectEntry
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

export default ProjectForm;
