const OPTIONS = [
  { id: 'modern', name: 'Modern' },
  { id: 'classic', name: 'Classic' },
  { id: 'minimal', name: 'Minimal' },
  { id: 'tech', name: 'Tech' },
];

const TemplatePicker = ({ value, onChange }) => (
  <div className="inline-flex border border-rule">
    {OPTIONS.map((opt) => (
      <button
        key={opt.id}
        type="button"
        onClick={() => onChange(opt.id)}
        className={`px-3 py-1.5 text-sm transition-colors cursor-pointer ${
          value === opt.id ? 'bg-ink text-paper' : 'text-ink-muted hover:text-ink'
        }`}
      >
        {opt.name}
      </button>
    ))}
  </div>
);

export default TemplatePicker;
