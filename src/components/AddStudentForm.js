import React, { useState } from 'react';

const AddStudentForm = ({ selectedStudent, allSections, onClose }) => {
  const [firstName, setFirstName] = useState(selectedStudent ? selectedStudent.firstName : '');
  const [lastName, setLastName] = useState(selectedStudent ? selectedStudent.lastName : '');
  const [sections, setSections] = useState(selectedStudent ? selectedStudent.sections : []);

  const handleAddSection = (section) => {
    if (!sections.includes(section)) {
      setSections([...sections, section]);
    }
  };

  const handleRemoveSection = (sectionToRemove) => {
    setSections(sections.filter((section) => section !== sectionToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ firstName, lastName, sections });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="p-4 bg-white border border-gray-300 rounded shadow-lg w-full max-w-lg">
        <h2 className="text-xl mb-4">{selectedStudent ? 'Редактировать студента' : 'Добавить студента'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block">Имя</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block">Фамилия</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block">Назначенные секции</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {sections.map((section, index) => (
                <div key={index} className="flex items-center border px-2 py-1 rounded bg-gray-100">
                  {section}
                  <button
                    type="button"
                    onClick={() => handleRemoveSection(section)}
                    className="ml-2 text-red-500"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
            <label className="block">Добавить секции</label>
            <select
              onChange={(e) => {
                handleAddSection(e.target.value);
                e.target.value = ''; // Сбрасываем выбор после добавления
              }}
              className="border p-2 w-full"
            >
              <option value="" disabled>Выберите секцию для добавления</option>
              {allSections
                .filter((section) => !sections.includes(section)) // Исключаем уже назначенные секции
                .map((section, index) => (
                  <option key={index} value={section}>
                    {section}
                  </option>
                ))}
            </select>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-2">
            Сохранить
          </button>
        </form>
        <button onClick={onClose} className="mt-4 bg-gray-500 text-white px-4 py-2">
          Отмена
        </button>
      </div>
    </div>
  );
};

export default AddStudentForm;