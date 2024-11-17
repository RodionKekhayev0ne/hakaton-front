import React, { useState } from 'react';
import axios from "axios";

const AddSectionForm = ({ selectedSection, onClose }) => {
  const [name, setName] = useState(selectedSection ? selectedSection.name : '');
  const [description, setDescription] = useState(selectedSection ? selectedSection.description : '');
  const [number, setNumber] = useState(selectedSection ? selectedSection.description : '');

  const handleSubmit = () => {
    axios.post('http://209.38.196.77:3000/admin/createLesson', {
      lesson_title:name,
      description:description,
      phone_number:number,
    },{ withCredentials: true })
        .then((response) => console.log(response.data))
        .catch((err) => console.error(err));

    onClose();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="p-4 bg-white border border-gray-300 rounded shadow-lg w-full max-w-lg">
        <h2 className="text-xl mb-4">{selectedSection ? 'Редактировать секцию' : 'Добавить секцию'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block">Название</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block">Описание</label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2 w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block">Номер телефона Тренера</label>
            <input
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="border p-2 w-full"
            />
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

export default AddSectionForm;
