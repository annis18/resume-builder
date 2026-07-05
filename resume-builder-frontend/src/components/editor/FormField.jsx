// Reusable labeled input — the underline style established on the
// Login/Register pages, reused everywhere in the editor for consistency.
const FormField = ({ label, textarea = false, className = '', ...inputProps }) => {
  const fieldClasses =
    'w-full border-0 border-b border-rule bg-transparent py-2 text-ink placeholder:text-ink-muted/50 focus:outline-none focus:border-signal transition-colors resize-none';

  return (
    <label className={`block ${className}`}>
      {label && (
        <span className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-2">
          {label}
        </span>
      )}
      {textarea ? (
        <textarea {...inputProps} className={fieldClasses} />
      ) : (
        <input {...inputProps} className={fieldClasses} />
      )}
    </label>
  );
};

export default FormField;
