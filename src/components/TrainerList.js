import React, { useState } from 'react';
import AddTrainerForm from './AddTrainerForm';

const TrainerList = ({ onTrainerClick }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [selectedTrainers, setSelectedTrainers] = useState([]);
  const [trainers, setTrainers] = useState([
    { id: 1, name: 'Иван Иванов', subject: 'Математика', sections: ['Секция 1'] },
    { id: 2, name: 'Мария Петрова', subject: 'Физика', sections: ['Секция 2', 'Секция 3'] },
    { id: 3, name: 'Иван Иванов', subject: 'Математика', sections: ['Секция 1'] },
    { id: 4, name: 'Мария Петрова', subject: 'Физика', sections: ['Секция 2', 'Секция 3'] },
    { id: 5, name: 'Иван Иванов', subject: 'Математика', sections: ['Секция 1'] },
    { id: 6, name: 'Мария Петрова', subject: 'Физика', sections: ['Секция 2', 'Секция 3'] },
    // Добавьте больше данных по необходимости
  ]);

  const handleAddTrainer = () => {
    setShowAddForm(true);
    setSelectedTrainer(null);
  };

  const handleTrainerClick = (trainer) => {
    setSelectedTrainer(trainer);
    setShowAddForm(true);
    if (onTrainerClick) {
      onTrainerClick(trainer);
    }
  };

  const handleSelectTrainer = (id) => {
    setSelectedTrainers((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((trainerId) => trainerId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const handleDeleteSelected = () => {
    setTrainers((prevTrainers) =>
      prevTrainers.filter((trainer) => !selectedTrainers.includes(trainer.id))
    );
    setSelectedTrainers([]); // Сбрасываем выбор
  };

  return (
    <div>
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white"
        onClick={handleAddTrainer}
      >
        Добавить тренера
      </button>
      <button
        className="mb-4 ml-2 px-4 py-2 bg-red-500 text-white"
        onClick={handleDeleteSelected}
        disabled={selectedTrainers.length === 0}
      >
        Удалить выбранных
      </button>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedTrainers(trainers.map((trainer) => trainer.id));
                  } else {
                    setSelectedTrainers([]);
                  }
                }}
                checked={selectedTrainers.length === trainers.length && trainers.length > 0}
              />
            </th>
            <th className="px-4 py-2 border">Имя</th>
            <th className="px-4 py-2 border">Предмет</th>
            <th className="px-4 py-2 border">Секции</th>
          </tr>
        </thead>
        <tbody>
          {trainers.map((trainer) => (
            <tr
              key={trainer.id}
              className="hover:bg-gray-200 cursor-pointer"
            >
              <td className="px-4 py-2 border">
                <input
                  type="checkbox"
                  checked={selectedTrainers.includes(trainer.id)}
                  onChange={() => handleSelectTrainer(trainer.id)}
                />
              </td>
              <td className="px-4 py-2 border" onClick={() => handleTrainerClick(trainer)}>
                {trainer.name}
              </td>
              <td className="px-4 py-2 border" onClick={() => handleTrainerClick(trainer)}>
                {trainer.subject}
              </td>
              <td className="px-4 py-2 border" onClick={() => handleTrainerClick(trainer)}>
                {trainer.sections.join(', ')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showAddForm && (
        <AddTrainerForm
          selectedTrainer={selectedTrainer}
          onClose={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
};

export default TrainerList;
