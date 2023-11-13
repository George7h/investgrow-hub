import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';
import '../styles/Navigationstyle.css';

export default function Navigationhome() {
  return (
    <nav className="navbar">
      <span className="material-symbols-outlined">
        menu
      </span>
      <Link to="/">
        <h6>
          INVESTGROW-HUB
        </h6>
      </Link>
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
