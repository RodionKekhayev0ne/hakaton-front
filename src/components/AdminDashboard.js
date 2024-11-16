import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CustomCalendar.css';

const sectionsData = [
  { id: 1, name: 'Секция 1', days: ['2024-11-20', '2024-11-22'], time: '10:00 - 12:00' },
  { id: 2, name: 'Секция 2', days: ['2024-11-21', '2024-11-23'], time: '14:00 - 16:00' },
];

const studentsAttendance = {
  '2024-11-20': [
    { name: 'Иван Иванов', attended: true },
    { name: 'Мария Петрова', attended: false },
  ],
  '2024-11-22': [
    { name: 'Алексей Смирнов', attended: true },
    { name: 'Ольга Сидорова', attended: true },
  ],
  // Добавьте данные для других дат
};

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [markedDates, setMarkedDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSectionClick = (section) => {
    setSelectedSection(section);
    setMarkedDates(section.days);
  };

  const handleDateClick = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    if (markedDates.includes(formattedDate)) {
      setSelectedDate(formattedDate);
    } else {
      setSelectedDate(null);
    }
  };

  return (
    <div className="flex">
      {/* Столбец с секциями */}
      <div className="w-1/4 p-4 border-r border-gray-300">
        <h2 className="text-xl font-bold mb-4">Секции</h2>
        {sectionsData.map((section) => (
          <div
            key={section.id}
            className="p-2 mb-2 cursor-pointer hover:bg-gray-200 border rounded"
            onClick={() => handleSectionClick(section)}
          >
            <h3 className="font-semibold">{section.name}</h3>
            <p>{section.time}</p>
          </div>
        ))}
      </div>

      {/* Календарь */}
      <div className="flex-grow p-4">
        <Calendar
          onClickDay={handleDateClick}
          tileClassName={({ date }) => {
            const formattedDate = date.toISOString().split('T')[0];
            if (markedDates.includes(formattedDate)) {
              return 'bg-yellow-300 hover:bg-yellow-400'; // Tailwind CSS классы для пометки занятий
            }
            return null;
          }}
          tileContent={({ date }) => {
            const formattedDate = date.toISOString().split('T')[0];
            if (markedDates.includes(formattedDate)) {
              return (
                <div className="mt-1 text-xs bg-pink-500 text-white px-2 py-1 rounded">
                  Занятие
                </div>
              ); // Tailwind CSS стили для метки
            }
            return null;
          }}
          className="w-full border border-gray-300 shadow-lg"
        />

        {/* Список студентов при выборе даты */}
        {selectedDate && (
          <div className="mt-4 p-4 border border-gray-300 rounded shadow-md">
            <h3 className="text-lg font-bold mb-2">Посещаемость на {selectedDate}</h3>
            <ul>
              {studentsAttendance[selectedDate] ? (
                studentsAttendance[selectedDate]
                  .filter((student) => student.attended) // Фильтруем только присутствующих студентов
                  .map((student, index) => (
                    <li
                      key={index}
                      className="flex justify-between py-1 border-b last:border-none"
                    >
                      <span>{student.name}</span>
                      <span className="text-green-600">Присутствовал</span>
                    </li>
                  ))
              ) : (
                <p>Нет данных о посещаемости на эту дату.</p>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;