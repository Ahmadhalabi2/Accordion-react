import { useState } from 'react';
import './Accordion.css';

const data = [
  {
    category: 'React',
    emoji: '⚛️',
    title: 'What is React and why is it so popular?',
    content:
      'React is a JavaScript library developed by Meta for building fast, interactive user interfaces. Its popularity stems from the Virtual DOM (which minimises real DOM updates), a component-based architecture that encourages reuse, and a massive ecosystem of libraries and tools. React makes it easy to reason about UI state and scale applications from tiny widgets to full enterprise apps.',
  },
  {
    category: 'Hooks',
    emoji: '🪝',
    title: 'How does useState work under the hood?',
    content:
      'useState is a React hook that ties a piece of state to a specific position in the component tree. On the first render React allocates a slot for the state value. On every subsequent call it returns the current value from that slot. When you call the setter, React schedules a re-render and, on the next render, the slot holds the new value. Because slots are positional, hooks must always be called in the same order — never inside conditions or loops.',
  },
  {
    category: 'Performance',
    emoji: '⚡',
    title: 'What is the Virtual DOM and does it make React fast?',
    content:
      'The Virtual DOM is a lightweight in-memory representation of the real DOM. When state changes, React builds a new virtual tree, diffs it against the previous one (reconciliation), and applies only the minimal set of real DOM mutations needed. This batching of updates is what avoids expensive layout reflows on every keystroke. That said, the Virtual DOM itself has overhead — frameworks like Svelte compile away the runtime entirely — so "React is fast" really means "React is fast enough and predictable for most apps".',
  },
  {
    category: 'Vite',
    emoji: '🚀',
    title: 'Why use Vite instead of Create React App?',
    content:
      'Vite leverages native ES Modules in the browser during development, so it never has to bundle your entire app upfront. Cold starts are near-instant regardless of project size. Hot Module Replacement (HMR) updates only the changed module in milliseconds. For production, Vite uses Rollup, producing highly-optimised, tree-shaken bundles. Create React App uses Webpack under the hood, which rebuilds large chunks of the bundle on every change — noticeably slower as projects grow.',
  },
  {
    category: 'CSS',
    emoji: '🎨',
    title: 'What is the difference between CSS Modules and Tailwind?',
    content:
      'CSS Modules scope class names to their component file at build time, eliminating global naming collisions while still writing plain CSS. Tailwind is a utility-first framework — you compose design directly in JSX using atomic classes like `flex`, `gap-4`, or `text-purple-500`. Modules are great when you want full CSS power with zero leakage; Tailwind shines when you want to move fast without leaving JSX and can tolerate verbose markup. Many teams combine both, or use CSS-in-JS solutions like styled-components for dynamic theming.',
  },
  {
    category: 'Patterns',
    emoji: '🧩',
    title: 'When should I use Context vs a state-management library?',
    content:
      'React Context is perfect for low-frequency, global data: the current user, theme, locale, or feature flags. It re-renders every consumer when the value changes, so avoid putting frequently-updated state (search queries, scroll positions) in Context without memoisation. If you have complex derived state, cross-component mutations, or need time-travel debugging, reach for Zustand (lightweight), Jotai (atomic), or Redux Toolkit (structured). A good rule of thumb: start with useState + prop-drilling, lift to Context when drilling gets painful, and add a library only when Context becomes a performance bottleneck.',
  },
  {
    category: 'Accessibility',
    emoji: '♿',
    title: 'How do I make an accordion accessible?',
    content:
      'A fully accessible accordion needs a few key things: each trigger must be a <button> so keyboard users can reach it via Tab and activate it via Enter/Space. Set aria-expanded="true/false" on the button so screen readers announce the state. The content panel should have a unique id and the button should reference it with aria-controls. Optionally link them in reverse with aria-labelledby on the panel. Manage focus carefully — opening a panel should not move focus away from the button. Test with VoiceOver (macOS/iOS), NVDA (Windows), and keyboard-only navigation before shipping.',
  },
];

export default function Accordion() {
  const [openIndex, setOpenIndex] = useState(null);
  const [hovered, setHovered]   = useState(null);

  const toggle = idx => {
    setOpenIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <div className="accordion" role="list">
      {data.map((item, idx) => {
        const isOpen     = openIndex === idx;
        const isHovered  = hovered  === idx;

        return (
          <div
            className={`accordion-item ${isOpen ? 'is-open' : ''} ${isHovered && !isOpen ? 'is-hovered' : ''}`}
            key={idx}
            role="listitem"
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* number + glow line */}
            <div className="item-index" aria-hidden="true">
              {String(idx + 1).padStart(2, '0')}
            </div>

            <div className="item-body">
              {/* category tag */}
              <div className="item-meta" aria-hidden="true">
                <span className="item-emoji">{item.emoji}</span>
                <span className="item-category">{item.category}</span>
              </div>

              {/* trigger button */}
              <button
                className="accordion-trigger"
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
                aria-controls={`panel-${idx}`}
                id={`heading-${idx}`}
              >
                <span className="trigger-text">{item.title}</span>
                <span className="trigger-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </button>

              {/* content panel */}
              <div
                id={`panel-${idx}`}
                role="region"
                aria-labelledby={`heading-${idx}`}
                className="accordion-panel"
                style={{ '--panel-height': isOpen ? '1' : '0' }}
              >
                <div className="panel-inner">
                  <div className="panel-line" aria-hidden="true" />
                  <p className="panel-text">{item.content}</p>
                  <div className="panel-tag" aria-hidden="true">
                    {item.emoji} {item.category}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
