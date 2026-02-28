import React from 'react';

interface NavbarProps {
  onNavigate: (page: 'home' | 'results' | 'detail' | 'add') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  return (
    <nav>
      <div className="nav-logo" onClick={() => onNavigate('home')}>
        Dig<span className="dot">·</span><span>Wiki</span>
      </div>
      <div className="nav-links">
        <a onClick={() => onNavigate('home')}>Explore</a>
        <a>Community</a>
        <a>My Digs</a>
      </div>
      <div className="nav-right">
        <button className="btn-ghost">Sign in</button>
        <button className="btn-primary" onClick={() => onNavigate('add')}>Start Digging</button>
      </div>
    </nav>
  );
};
