import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

export default function Navigation() {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link to="/">Homepage</Link>
        </li>
        <li>
          <Link to="/Detailspage">Details</Link>
        </li>
      </ul>
    </nav>
  );
}
