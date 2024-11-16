import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaClipboardList, FaClipboardCheck, FaBook, FaCog } from 'react-icons/fa';

const TrainerSidebar = ({ logout }) => {
  const trainerLinks = [
    { path: '/trainer/dashboard', label: 'Главная', icon: <FaClipboardList /> },
    { path: '/trainer/add-student', label: 'Заявки', icon: <FaClipboardCheck /> },
    { path: '/trainer/sections', label: 'Секции', icon: <FaBook /> },
    { path: '/trainer/settings', label: 'Настройки', icon: <FaCog /> },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col min-h-screen">
      <div className="flex items-center justify-center p-4 border-b border-gray-700">
        <h1 className="text-2xl font-bold">Тренер</h1>
      </div>
      <nav className="mt-4 flex-grow">
        {trainerLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={({ isActive }) => `flex items-center px-4 py-2 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
          >
            <span className="mr-2">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>
      <button onClick={logout} className="p-4 bg-red-500 text-white mt-auto">
        Выйти
      </button>
    </div>
  );
};

export default TrainerSidebar;
