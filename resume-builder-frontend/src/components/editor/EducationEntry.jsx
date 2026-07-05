import { Trash2 } from 'lucide-react';
import FormField from './FormField';

const EducationEntry = ({ entry, onChange, onRemove }) => {
  const update = (field) => (e) => {
    onChange({ ...entry, [field]: e.target.value });
  };

  return (
    <div className="border border-rule p-6 relative">
      <button
        type="button"
        onClick={onRemove}
        aria-label="Remove this education entry"
        className="absolute top-4 right-4 text-ink-muted hover:text-danger transition-colors"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 pr-8">
        <FormField
          label="Institution"
          value={entry.institution}
          onChange={update('institution')}
          placeholder="University of Delhi"
        />
        <FormField
          label="Degree"
          value={entry.degree}
          onChange={update('degree')}
          placeholder="B.Tech"
        />
        <FormField
          label="Field of study"
          value={entry.fieldOfStudy}
          onChange={update('fieldOfStudy')}
          placeholder="Computer Science"
        />
        <FormField
          label="Grade"
          value={entry.grade}
          onChange={update('grade')}
          placeholder="8.5 CGPA"
        />
        <div className="grid grid-cols-2 gap-4 sm:col-span-2">
          <FormField
            label="Start date"
            value={entry.startDate}
            onChange={update('startDate')}
            placeholder="2019"
          />
          <FormField
            label="End date"
            value={entry.endDate}
            onChange={update('endDate')}
            placeholder="2023"
          />
        </div>
      </div>
    </div>
  );
};

export default EducationEntry;
