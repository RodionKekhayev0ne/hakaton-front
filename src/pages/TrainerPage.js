import React from 'react';
import TrainerSidebar from '../components/TrainerSidebar';
import TrainerDashboard from '../components/TrainerDashboard';

const TrainerPage = () => {
  return (
    <div className="flex">
      <div className="flex-grow p-6 bg-gray-100">
        <TrainerDashboard />
      </div>
    </div>
  );
};

export default TrainerPage;
