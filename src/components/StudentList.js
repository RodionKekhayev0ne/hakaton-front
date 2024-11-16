import React, { useState } from 'react';
import AddStudentForm from './AddStudentForm';

const StudentList = ({ onStudentClick }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [trainerFilter, setTrainerFilter] = useState('');
  const [sectionFilter, setSectionFilter] = useState('');
  const [students, setStudents] = useState([
    { id: 1, firstName: 'Иван', lastName: 'Иванов', trainer: 'Тренер 1', sections: ['Секция 1'] },
    { id: 2, firstName: 'Мария', lastName: 'Петрова', trainer: 'Тренер 2', sections: ['Секция 2'] },
    { id: 3, firstName: 'Алексей', lastName: 'Смирнов', trainer: 'Тренер 1', sections: ['Секция 1', 'Секция 3'] },
  ]);

  const allTrainers = ['Тренер 1', 'Тренер 2', 'Тренер 3']; // Пример списка тренеров
  const allSections = ['Секция 1', 'Секция 2', 'Секция 3', 'Секция 4']; // Пример списка всех доступных секций

  const handleAddStudent = () => {
    setShowAddForm(true);
    setSelectedStudent(null);
  };

  const handleStudentClick = (student, event) => {
    // Открываем форму только при клике на строку, но не на чекбокс
    if (event.target.type !== 'checkbox') {
      setSelectedStudent(student);
      setShowAddForm(true);
      if (onStudentClick) {
        onStudentClick(student);
      }
    }
  };

  const handleSelectStudent = (id) => {
    setSelectedStudents((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((studentId) => studentId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const handleDeleteSelected = () => {
    setStudents((prevStudents) =>
      prevStudents.filter((student) => !selectedStudents.includes(student.id))
    );
    setSelectedStudents([]); // Сброс выбора
  };

  const handleAssignSections = (section) => {
    const updatedStudents = students.map((student) => {
      if (selectedStudents.includes(student.id)) {
        return {
          ...student,
          sections: student.sections.includes(section) ? student.sections : [...student.sections, section],
        };
      }
      return student;
    });
    setStudents(updatedStudents);
    setSelectedStudents([]); // Сброс выбора после назначения секций
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setSelectedStudent(null);
  };

  // Фильтрация студентов по выбранным тренеру и секции
  const filteredStudents = students.filter((student) => {
    const matchesTrainer = trainerFilter ? student.trainer === trainerFilter : true;
    const matchesSection = sectionFilter ? student.sections.includes(sectionFilter) : true;
    return matchesTrainer && matchesSection;
  });

  return (
    <div>
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white"
        onClick={handleAddStudent}
      >
        Добавить студента
      </button>
      <button
        className="mb-4 ml-2 px-4 py-2 bg-red-500 text-white"
        onClick={handleDeleteSelected}
        disabled={selectedStudents.length === 0}
      >
        Удалить выбранных
      </button>
      <select
        className="mb-4 ml-2 px-4 py-2 border"
        onChange={(e) => {
          if (e.target.value) {
            handleAssignSections(e.target.value);
            e.target.value = ''; // Сбрасываем выбор после назначения
          }
        }}
      >
        <option value="" disabled>Выберите секцию для назначения</option>
        {allSections.map((section, index) => (
          <option key={index} value={section}>{section}</option>
        ))}
      </select>
      <div className="flex mb-4">
        <select
          className="px-4 py-2 border mr-2"
          value={trainerFilter}
          onChange={(e) => setTrainerFilter(e.target.value)}
        >
          <option value="">Все тренеры</option>
          {allTrainers.map((trainer, index) => (
            <option key={index} value={trainer}>{trainer}</option>
          ))}
        </select>
        <select
          className="px-4 py-2 border"
          value={sectionFilter}
          onChange={(e) => setSectionFilter(e.target.value)}
        >
          <option value="">Все секции</option>
          {allSections.map((section, index) => (
            <option key={index} value={section}>{section}</option>
          ))}
        </select>
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedStudents(filteredStudents.map((student) => student.id));
                  } else {
                    setSelectedStudents([]);
                  }
                }}
                checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
              />
            </th>
            <th className="px-4 py-2 border">Имя</th>
            <th className="px-4 py-2 border">Фамилия</th>
            <th className="px-4 py-2 border">Тренер</th>
            <th className="px-4 py-2 border">Секции</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr
              key={student.id}
              className="hover:bg-gray-200 cursor-pointer"
              onClick={(event) => handleStudentClick(student, event)}
            >
              <td className="px-4 py-2 border">
                <input
                  type="checkbox"
                  checked={selectedStudents.includes(student.id)}
                  onChange={(e) => {
                    e.stopPropagation(); // Останавливаем событие, чтобы не открывать форму при нажатии на чекбокс
                    handleSelectStudent(student.id);
                  }}
                />
              </td>
              <td className="px-4 py-2 border">{student.firstName}</td>
              <td className="px-4 py-2 border">{student.lastName}</td>
              <td className="px-4 py-2 border">{student.trainer}</td>
              <td className="px-4 py-2 border">{student.sections.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {showAddForm && (
        <AddStudentForm
          selectedStudent={selectedStudent}
          allSections={allSections}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default StudentList;
