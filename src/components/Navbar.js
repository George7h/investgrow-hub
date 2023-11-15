import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';
import '../styles/Navigationstyle.css';

export default function Navigation() {
  return (
    <nav className="navbar">
      <Link to="/">
        <span className="material-symbols-outlined">
          chevron_left
        </span>
      </Link>
      <div>2023</div>
      <div className="controls">
        <span className="material-symbols-outlined">
          mic
        </span>
        <span className="material-symbols-outlined">
          settings
        </span>
      </div>
    </nav>
  );
}
