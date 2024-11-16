import React from 'react';

const StudentTable = ({ students }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border-b">ID</th>
            <th className="px-4 py-2 border-b">Имя студента</th>
            <th className="px-4 py-2 border-b">Email</th>
            <th className="px-4 py-2 border-b">Телефон</th>
            <th className="px-4 py-2 border-b">Адреса</th>
            <th className="px-4 py-2 border-b">Секция</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">{student.id}</td>
              <td className="px-4 py-2 border-b">{student.name}</td>
              <td className="px-4 py-2 border-b">{student.email}</td>
              <td className="px-4 py-2 border-b">{student.phone}</td>
              <td className="px-4 py-2 border-b">{student.address}</td>
              <td className="px-4 py-2 border-b">{student.sectionId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
