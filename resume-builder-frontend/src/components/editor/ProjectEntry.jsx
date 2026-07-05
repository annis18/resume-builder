import { useState } from 'react';
import { Sparkles, Loader2, Trash2, X, Plus } from 'lucide-react';
import FormField from './FormField';
import api from '../../services/api';

const ProjectEntry = ({ entry, onChange, onRemove }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateError, setGenerateError] = useState('');

  const update = (field) => (e) => {
    onChange({ ...entry, [field]: e.target.value });
  };

  const updateBullet = (index, value) => {
    const bulletPoints = [...entry.bulletPoints];
    bulletPoints[index] = value;
    onChange({ ...entry, bulletPoints });
  };

  const removeBullet = (index) => {
    onChange({ ...entry, bulletPoints: entry.bulletPoints.filter((_, i) => i !== index) });
  };

  const addBlankBullet = () => {
    onChange({ ...entry, bulletPoints: [...entry.bulletPoints, ''] });
  };

  const handleGenerate = async () => {
    if (!entry.title.trim() || !entry.technologies.trim()) {
      setGenerateError('Add a project title and technologies above first.');
      return;
    }
    setGenerateError('');
    setIsGenerating(true);
    try {
      // Note: this is a different endpoint than the Experience section uses.
      // Sending {title, technologies} to /generate-bullets would produce a
      // prompt like "Company: React, Node.js" — semantically wrong. This one
      // has its own project-aware prompt on the backend.
      const { data } = await api.post('/ai/generate-project-bullets', {
        title: entry.title,
        technologies: entry.technologies,
      });
      onChange({ ...entry, bulletPoints: [...entry.bulletPoints, ...data.bulletPoints] });
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
        aria-label="Remove this project"
        className="absolute top-4 right-4 text-ink-muted hover:text-danger transition-colors"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-6 pr-8">
        <FormField
          label="Project title"
          value={entry.title}
          onChange={update('title')}
          placeholder="E-commerce Platform"
        />
        <FormField
          label="Technologies"
          value={entry.technologies}
          onChange={update('technologies')}
          placeholder="React, Node.js, MongoDB"
        />
        <FormField
          label="Link"
          value={entry.link}
          onChange={update('link')}
          placeholder="github.com/you/project"
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Start date"
            value={entry.startDate}
            onChange={update('startDate')}
            placeholder="Jan 2024"
          />
          <FormField
            label="End date"
            value={entry.endDate}
            onChange={update('endDate')}
            placeholder="Mar 2024"
          />
        </div>
      </div>

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
        {entry.bulletPoints.map((bullet, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              value={bullet}
              onChange={(e) => updateBullet(index, e.target.value)}
              placeholder="Built a REST API handling [X] requests per day..."
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

export default ProjectEntry;
