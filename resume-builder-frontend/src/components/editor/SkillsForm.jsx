import { useState } from 'react';
import { X } from 'lucide-react';
import EditorSection from './EditorSection';

const SkillsForm = ({ skills, onChange }) => {
  const [input, setInput] = useState('');

  const commitInput = () => {
    const trimmed = input.trim();
    if (trimmed && !skills.includes(trimmed)) {
      onChange([...skills, trimmed]);
    }
    setInput('');
  };

  const removeSkill = (skill) => {
    onChange(skills.filter((s) => s !== skill));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      commitInput();
    }
  };

  return (
    <EditorSection title="Skills" description="Press Enter or comma to add each one.">
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1.5 border border-rule px-3 py-1.5 text-sm text-ink"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                aria-label={`Remove ${skill}`}
                className="text-ink-muted hover:text-danger transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>
      )}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={commitInput}
        placeholder="React, Project Management, SQL…"
        className="w-full border-0 border-b border-rule bg-transparent py-2 text-ink placeholder:text-ink-muted/50 focus:outline-none focus:border-signal transition-colors"
      />
    </EditorSection>
  );
};

export default SkillsForm;
