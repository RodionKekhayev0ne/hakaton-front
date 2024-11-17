import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AdminSidebar from './components/AdminSidebar';
import TrainerSidebar from './components/TrainerSidebar';
import AdminPage from './pages/AdminPage';
import TrainerPage from './pages/TrainerPage';
import LoginPage from './pages/LoginPage';
import TrainerList from './components/TrainerList';
import SectionList from './components/SectionList';
import StudentList from './components/StudentList';
import { AuthContext } from './context/AuthContext';
import AdminDashboard from './components/AdminDashboard';

const AppContent = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // Проверка авторизации пользователя
  const isAuthenticated = user && (user.role === 'admin' || user.role === 'trainer');

  // Определяем, отображать ли сайдбар в зависимости от текущего маршрута
  const shouldShowSidebar = isAuthenticated && location.pathname !== '/';

  return (
    <div className="flex">
      {/* Отображаем сайдбар только на страницах администратора и тренера, кроме страницы авторизации */}
      {shouldShowSidebar && (
        <div>
          {user.role === 'admin' && <AdminSidebar />}
          {user.role === 'trainer' && <TrainerSidebar />}
        </div>
      )}
      <div className="flex-grow">
        <Routes>
          {/* Страница входа */}
          <Route path="/" element={<LoginPage />} />

          {/* Страницы для администратора */}
          {isAuthenticated && user.role === 'admin' && (
            <>
              <Route path="http://209.38.196.77:3001/admin" element={<AdminPage />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/trainers" element={<TrainerList />} />
              <Route path="/admin/sections" element={<SectionList />} />
              <Route path="/admin/students" element={<StudentList />} />
            </>
          )}

          {/* Страницы для тренера */}
          {isAuthenticated && user.role === 'trainer' && (
            <Route path="/trainer" element={<TrainerPage />} />
          )}
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
