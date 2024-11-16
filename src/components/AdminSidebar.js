import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserTie, FaClipboardList, FaUserGraduate, FaBook, FaFileInvoice, FaCog } from 'react-icons/fa';

const AdminSidebar = ({ logout }) => {
  const adminLinks = [
    { path: '/admin/dashboard', label: 'Главная', icon: <FaClipboardList /> },
    { path: '/admin/trainers', label: 'Тренеры', icon: <FaUserTie /> },
    { path: '/admin/sections', label: 'Секции', icon: <FaBook /> },
    { path: '/admin/students', label: 'Студенты', icon: <FaUserGraduate /> },
    { path: '/admin/reports', label: 'Отчеты', icon: <FaFileInvoice /> },
    { path: '/admin/settings', label: 'Настройки', icon: <FaCog /> },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col min-h-screen">
      <div className="flex items-center justify-center p-4 border-b border-gray-700">
        <h1 className="text-2xl font-bold">Admin</h1>
      </div>
      <nav className="mt-4 flex-grow">
        {adminLinks.map((link, index) => (
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

export default AdminSidebar;
