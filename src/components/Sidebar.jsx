import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white text- p-6 min-h-screen hidden md:block">
      <h2 className="text-2xl font-bold mb-6">Menu</h2>
      <nav>
        <ul>
          <li className="mb-4">
            <NavLink
              to="/"
              className="w-full text-left px-3 py-2  rounded hover:text-blue-700"
              activeClassName="bg-gray-700"
            >
              Templates
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink
              to="/emails"
              className="w-full text-left px-3 py-2 rounded hover:text-blue-700"
              activeClassName="bg-gray-700"
            >
              Emails
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink
              to="/recipients"
              className="w-full text-left px-3 py-2 rounded hover:text-blue-700"
              activeClassName="bg-gray-700"
            >
              Recipients
            </NavLink>
          </li>
          {/* Add more navigation items here */}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;