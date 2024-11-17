import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CustomCalendar.css';
import axios from "axios";

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [markedDates, setMarkedDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [lessonData, setLessonData] = useState([]);
  const [visitage, setVisitage] = useState([]);

  const handleSectionClick = (id) => {
    axios.post('http://localhost:3000/admin/visits', {
      lessonId: id
    }, { withCredentials: true })
        .then((response) => {
          // Преобразуем данные о посещаемости в нужный формат (дата в формате YYYY-MM-DD)
          const visits = response.data.visits;
          const datesWithVisits = visits.map((visit) => new Date(visit.date).toISOString().split('T')[0]); // Приводим к UTC дате
          setVisitage(visits);
          setMarkedDates(datesWithVisits); // Устанавливаем даты, на которых есть занятия
        })
        .catch((err) => console.error(err));
    setSelectedSection(id);
  };

  useEffect(() => {
    function getLessonData() {
      axios.get('http://localhost:3000/admin/lessons', { withCredentials: true })
          .then((response) => setLessonData(response.data.lessons))
          .catch((err) => console.error(err));
    }
    getLessonData();
  }, []);

  const handleDateClick = (date) => {
    const formattedDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString().split('T')[0]; // Приводим к UTC дате

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
          {lessonData.map(section => (
              <div
                  key={section._id}
                  className="p-2 mb-2 cursor-pointer hover:bg-gray-200 border rounded"
                  onClick={() => handleSectionClick(section._id)}
              >
                <h3 className="font-semibold">{section.title}</h3>
                <p>{section.description}</p>
              </div>
          ))}
        </div>

        {/* Календарь */}
        <div className="flex-grow p-4">
          <Calendar
              onClickDay={handleDateClick}
              tileClassName={({ date }) => {
                const formattedDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString().split('T')[0]; // Приводим к UTC дате
                if (markedDates.includes(formattedDate)) {
                  return 'bg-yellow-300 hover:bg-yellow-400'; // Стиль для дат с занятиями
                }
                return null;
              }}
              tileContent={({ date }) => {
                const formattedDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString().split('T')[0]; // Приводим к UTC дате
                if (markedDates.includes(formattedDate)) {
                  return (
                      <div className="mt-1 text-xs bg-pink-500 text-white px-2 py-1 rounded">
                        Занятие
                      </div>
                  );
                }
                return null;
              }}
              className="w-full border border-gray-300 shadow-lg"
          />

          {/* Список студентов при выборе даты */}
          {selectedDate && (
              <div className="mt-4 p-4 border border-gray-300 rounded shadow-md">
                <h3 className="text-lg font-bold mb-2">Посещаемость на {
                    visitage
                    .filter((visit) => new Date(visit.date).toISOString().split('T')[0] === selectedDate) // Фильтруем по выбранной дате
                    .map((visit, index) => (
                        visit.dateForCrm
                    ))}
          </h3>
                <ul>
                  {visitage
                      .filter((visit) => new Date(visit.date).toISOString().split('T')[0] === selectedDate) // Фильтруем по выбранной дате
                      .map((visit, index) => (
                          <li key={index} className="py-1 border-b last:border-none">
                            <span className="text-[25px]"><b>Тренер -</b> {visit.teacher.name} {visit.teacher.lastName}</span>
                            <ul className="text-[20px]">
                              <b>Ученики</b>
                              {visit.students.map((student, idx) => (
                                  <li key={idx}>
                                    <span className="text-[20px]" >{student.name} {student.lastName}</span>
                                  </li>
                              ))}
                            </ul>
                          </li>
                      ))}
                </ul>
              </div>
          )}
        </div>
      </div>
  );
};

export default AdminDashboard;
