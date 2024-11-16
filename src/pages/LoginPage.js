import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdminForm, setIsAdminForm] = useState(true);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    const role = isAdminForm ? 'admin' : 'trainer';
    if (login(username, password, role)) {
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else if (role === 'trainer') {
        navigate('/trainer/dashboard');
      }
    } else {
      alert('Неверные данные для входа');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl mb-4">
          {isAdminForm ? 'Авторизация для Админа' : 'Авторизация для Тренера'}
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Имя пользователя</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <button
            type="button"
            onClick={handleLogin}
            className={`w-full py-2 mt-2 rounded ${
              isAdminForm ? 'bg-green-500' : 'bg-blue-500'
            } text-white`}
          >
            {isAdminForm ? 'Войти' : 'Войти'}
          </button>
          <button
            type="button"
            onClick={() => setIsAdminForm(!isAdminForm)}
            className="w-full py-2 mt-4 bg-gray-300 text-black rounded"
          >
            Переключить на {isAdminForm ? 'Войти как админ' : 'войти как тренер'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
