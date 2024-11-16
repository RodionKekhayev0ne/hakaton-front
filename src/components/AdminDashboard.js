import React from 'react';
import TrainerList from './TrainerList';
import ReportDownload from './ReportDownload';

const AdminDashboard = ({ trainers = [], students = [], sections = [] }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Админ Панель</h1>
      <TrainerList trainers={trainers} />
      <ReportDownload sections={sections} />
    </div>
  );
};

export default AdminDashboard;
