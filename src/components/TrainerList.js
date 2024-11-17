import React, {useEffect, useState} from 'react';
import AddTrainerForm from './AddTrainerForm';
import axios from "axios";

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
  const [teachersData, setTeachersData] = useState([]);

  useEffect(() => {
    function getLessonData() {
      axios.get('http://209.38.196.77:3000/admin/teachers', { withCredentials: true })
          .then((response) => setTeachersData(response.data.teachers))
          .catch((err) => console.error(err));
    }
    getLessonData();
  }, []);
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
          <th className="px-4 py-2 border">Тренер</th>
          <th className="px-4 py-2 border">Почта</th>
          <th className="px-4 py-2 border">Секции</th>
          <th className="px-4 py-2 border">Номер телефона</th>
        </tr>
        </thead>
        <tbody>
        {teachersData.map((trainer) => (
            <tr
                key={trainer._id}
                className="hover:bg-gray-200 cursor-pointer"
            >
              <td className="px-4 py-2 border">
                <input
                    type="checkbox"
                    checked={selectedTrainers.includes(trainer._id)}
                    onChange={() => handleSelectTrainer(trainer._id)}
                />
              </td>
              <td className="px-4 py-2 border" onClick={() => handleTrainerClick(trainer)}>
                {trainer.name + " " + trainer.lastName}
              </td>
              <td className="px-4 py-2 border" onClick={() => handleTrainerClick(trainer)}>
                {trainer.email}
              </td>
              <td className="px-4 py-2 border" onClick={() => handleTrainerClick(trainer)}>
                {trainer.lessons.map(lesson => lesson.title)}
                <br/>
                {trainer.lessons.map(lesson => " Кол-во учеников: " + lesson.students.length)}
              </td>
              <td className="px-4 py-2 border" onClick={() => handleTrainerClick(trainer)}>
                {trainer.phoneNumber}

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
