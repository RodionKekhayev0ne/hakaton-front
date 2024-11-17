import React, {useEffect, useState} from 'react';
import AddSectionForm from './AddSectionForm';
import axios from "axios";

const SectionList = ({ onSectionClick }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedSections, setSelectedSections] = useState([]);
  const [sections, setSections] = useState([
    { id: 1, name: 'Секция 1', description: 'Описание секции 1', students: ['Студент 1', 'Студент 2'] },
    { id: 2, name: 'Секция 2', description: 'Описание секции 2', students: ['Студент 3'] },
  ]);

  const [lessonsData, setLessonsData] = useState([]);

  useEffect(() => {
    function getLessonData() {
      axios.get('http://209.38.196.77:3000/admin/lessons', { withCredentials: true })
          .then((response) => setLessonsData(response.data.lessons))
          .catch((err) => console.error(err));
    }
    getLessonData();
  }, []);

  const handleAddSection = () => {
    setShowAddForm(true);
  };


  const handleSectionClick = (section, event) => {
    // Проверяем, было ли событие вызвано из чекбокса
    if (event.target.type === 'checkbox') {
      return;
    }
    setSelectedSection(section);
  };

  const handleSelectSection = (id) => {
    setSelectedSections((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((sectionId) => sectionId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const handleDeleteSelected = () => {
    setSections((prevSections) =>
      prevSections.filter((section) => !selectedSections.includes(section.id))
    );
    setSelectedSections([]); // Сброс выбора
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setSelectedSection(null);
  };

  return (
    <div>
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white"
        onClick={handleAddSection}
      >
        Добавить секцию
      </button>
      <button
        className="mb-4 ml-2 px-4 py-2 bg-red-500 text-white"
        onClick={handleDeleteSelected}
        disabled={selectedSections.length === 0}
      >
        Удалить выбранные
      </button>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedSections(sections.map((section) => section.id));
                  } else {
                    setSelectedSections([]);
                  }
                }}
                checked={selectedSections.length === sections.length && sections.length > 0}
              />
            </th>
            <th className="px-4 py-2 border">Название</th>
            <th className="px-4 py-2 border">Описание</th>
            <th className="px-4 py-2 border">Количество студентов</th>
          </tr>
        </thead>
        <tbody>
          {lessonsData.map((section) => (
            <tr
              key={section.id}
              className="hover:bg-gray-200 cursor-pointer"
              onClick={(e) => handleSectionClick(section, e)}
            >
              <td className="px-4 py-2 border">
                <input
                  type="checkbox"
                  checked={selectedSections.includes(section._id)}
                  onChange={(e) => {
                    e.stopPropagation(); // Останавливает событие, чтобы не открывать модальное окно при нажатии на чекбокс
                    handleSelectSection(section._id);
                  }}
                />
              </td>
              <td className="px-4 py-2 border">{section.title}</td>
              <td className="px-4 py-2 border">{section.description}</td>
              <td className="px-4 py-2 border">{section.students.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {showAddForm && (
        <AddSectionForm onClose={handleCloseForm} />
      )}
      {selectedSection && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Студенты в секции: {selectedSection.name}</h2>
            {selectedSection.students.length > 0 ? (
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 border">№</th>
                    <th className="px-4 py-2 border">Имя студента</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedSection.students.map((student, index) => (
                    <tr key={index} className="hover:bg-gray-200">
                      <td className="px-4 py-2 border">{index + 1}</td>
                      <td className="px-4 py-2 border">{student}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Нет студентов в этой секции.</p>
            )}
            <button onClick={handleCloseForm} className="mt-4 bg-gray-500 text-white px-4 py-2">
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionList;
