import React, { useState } from 'react';
import TrainerList from '../components/TrainerList';
import AddTrainerForm from '../components/AddTrainerForm';

const AdminPage = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  const handleAddTrainer = () => {
    setShowAddForm(true);
    setSelectedTrainer(null);
  };

  const handleTrainerClick = (trainer) => {
    setSelectedTrainer(trainer);
    setShowAddForm(true);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Панель Администратора</h1>
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white"
        onClick={handleAddTrainer}
      >
        Добавить тренера
      </button>
      <TrainerList onTrainerClick={handleTrainerClick} />
      {showAddForm && (
        <AddTrainerForm
          selectedTrainer={selectedTrainer}
          onClose={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
};

export default AdminPage;
