import React, { useState, useEffect } from 'react';
import { loadHints } from '../services/postStorage';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  onSearch: () => void;
  onHintClick: (hint: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSearch, onHintClick }) => {
  const [hints, setHints] = useState<string[]>([]);

  useEffect(() => {
    setHints(loadHints());
  }, []);

  return (
    <div className="search-section">
      <div className="search-wrap">
        <input
          type="text"
          placeholder="Search for K-pop artists, songs, and news!"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
        />
        <button className="search-btn" onClick={onSearch}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </button>
      </div>

      <div className="search-hints">
        {hints.map((hint) => (
          <span key={hint} className="hint-tag" onClick={() => onHintClick(hint)}>
            {hint}
          </span>
        ))}
      </div>
    </div>
  );
};
