import React from 'react';
import StudentTable from './StudentTable';
import AddStudentForm from './AddStudentForm';

const TrainerDashboard = ({ students = [], sections = [] }) => {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Тренер Панель</h1>
        {sections.length > 0 ? (
          sections.map((section) => (
            <div key={section.id} className="mb-6">
              <h2 className="text-xl font-semibold">{section.name}</h2>
              <StudentTable students={students.filter(student => student.sectionId === section.id)} />
            </div>
          ))
        ) : (
          <p>Секции не найдены</p>
        )}
      </div>
    );
  };
    
export default TrainerDashboard;
