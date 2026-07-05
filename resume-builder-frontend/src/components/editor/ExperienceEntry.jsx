import { useState } from 'react';
import { Sparkles, Loader2, Trash2, X, Plus } from 'lucide-react';
import FormField from './FormField';
import api from '../../services/api';

const ExperienceEntry = ({ entry, onChange, onRemove }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateError, setGenerateError] = useState('');

  const update = (field) => (e) => {
    onChange({ ...entry, [field]: e.target.value });
  };

  const updateBullet = (index, value) => {
    const description = [...entry.description];
    description[index] = value;
    onChange({ ...entry, description });
  };

  const removeBullet = (index) => {
    onChange({ ...entry, description: entry.description.filter((_, i) => i !== index) });
  };

  const addBlankBullet = () => {
    onChange({ ...entry, description: [...entry.description, ''] });
  };

  const handleGenerate = async () => {
    if (!entry.jobTitle.trim() || !entry.companyName.trim()) {
      setGenerateError('Add a job title and company above first.');
      return;
    }
    setGenerateError('');
    setIsGenerating(true);
    try {
      const { data } = await api.post('/ai/generate-bullets', {
        jobTitle: entry.jobTitle,
        companyName: entry.companyName,
      });
      onChange({ ...entry, description: [...entry.description, ...data.bulletPoints] });
    } catch (err) {
      setGenerateError(err.response?.data?.message || 'Could not generate bullet points. Try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="border border-rule p-6 relative">
      <button
        type="button"
        onClick={onRemove}
        aria-label="Remove this experience"
        className="absolute top-4 right-4 text-ink-muted hover:text-danger transition-colors"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-6 pr-8">
        <FormField
          label="Job title"
          value={entry.jobTitle}
          onChange={update('jobTitle')}
          placeholder="Product Manager"
        />
        <FormField
          label="Company"
          value={entry.companyName}
          onChange={update('companyName')}
          placeholder="Acme Corp"
        />
        <FormField
          label="Location"
          value={entry.location}
          onChange={update('location')}
          placeholder="Remote"
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Start date"
            value={entry.startDate}
            onChange={update('startDate')}
            placeholder="Jan 2023"
          />
          <FormField
            label="End date"
            value={entry.currentlyWorking ? '' : entry.endDate}
            onChange={update('endDate')}
            placeholder={entry.currentlyWorking ? 'Present' : 'Dec 2024'}
            disabled={entry.currentlyWorking}
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-ink-muted mb-6 cursor-pointer">
        <input
          type="checkbox"
          checked={entry.currentlyWorking}
          onChange={(e) => onChange({ ...entry, currentlyWorking: e.target.checked })}
          className="accent-signal"
        />
        I currently work here
      </label>

      <div className="flex items-center justify-between mb-3">
        <span className="block text-xs font-semibold uppercase tracking-wider text-ink-muted">
          Bullet points
        </span>
        <button
          type="button"
          onClick={handleGenerate}
          disabled={isGenerating}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-signal-warm hover:text-signal-warm/80 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        >
          {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          {isGenerating ? 'Generating…' : 'Generate with AI'}
        </button>
      </div>

      {generateError && <p className="text-sm text-danger mb-3">{generateError}</p>}

      <div className="space-y-2">
        {entry.description.map((bullet, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              value={bullet}
              onChange={(e) => updateBullet(index, e.target.value)}
              placeholder="Led a cross-functional team of [X] to deliver..."
              className="w-full border-0 border-b border-rule bg-transparent py-1.5 text-sm text-ink placeholder:text-ink-muted/50 focus:outline-none focus:border-signal transition-colors"
            />
            <button
              type="button"
              onClick={() => removeBullet(index)}
              aria-label="Remove bullet point"
              className="text-ink-muted hover:text-danger transition-colors shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addBlankBullet}
        className="inline-flex items-center gap-1 text-sm text-ink-muted hover:text-ink transition-colors mt-3"
      >
        <Plus className="w-3.5 h-3.5" />
        Add bullet manually
      </button>
    </div>
  );
};

export default ExperienceEntry;
