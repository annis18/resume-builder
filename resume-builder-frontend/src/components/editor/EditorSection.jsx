import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

// Each of the 6 editor sections uses this. Independently collapsible (not a
// strict one-at-a-time accordion — you often want two sections open at once,
// e.g. Experience and Projects side by side while cross-referencing dates).
// Defaults to open: collapsing is an option you reach for, never something
// that hides your own data on load.
const EditorSection = ({ title, description, action, defaultOpen = true, children }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section className="py-6 border-t border-rule first:border-t-0 first:pt-0">
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          className="flex items-center gap-3 text-left cursor-pointer group"
        >
          <ChevronDown
            className={`w-4 h-4 text-ink-muted shrink-0 transition-transform ${isOpen ? '' : '-rotate-90'}`}
          />
          <h2 className="font-display text-2xl text-ink group-hover:text-signal transition-colors">
            {title}
          </h2>
        </button>
        {action}
      </div>

      {description && isOpen && <p className="text-sm text-ink-muted mt-1 ml-7">{description}</p>}
      {isOpen && <div className="mt-6">{children}</div>}
    </section>
  );
};

export default EditorSection;
