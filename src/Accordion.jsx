import { useState } from 'react';
import './Accordion.css';

const data = [
  {
    title: 'What is React?',
    content: 'React is a JavaScript library for building user interfaces.'
  },
  {
    title: 'What is an Accordion?',
    content: 'An accordion is a UI component that allows users to expand and collapse sections of content.'
  },
  {
    title: 'Why use Vite?',
    content: 'Vite provides a fast and modern development environment for frontend projects.'
  }
];

export default function Accordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = idx => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="accordion">
      {data.map((item, idx) => (
        <div className="accordion-item" key={idx}>
          <button
            className={`accordion-title${openIndex === idx ? ' open' : ''}`}
            onClick={() => toggle(idx)}
            aria-expanded={openIndex === idx}
          >
            {item.title}
            <span className="arrow">{openIndex === idx ? '▲' : '▼'}</span>
          </button>
          <div
            className="accordion-content"
            style={{ maxHeight: openIndex === idx ? '200px' : '0px' }}
          >
            <div className="accordion-inner">{item.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
