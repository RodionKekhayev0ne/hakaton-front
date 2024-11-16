import React from 'react';

const ReportDownload = ({ sections }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold">Отчеты по секциям</h2>
      {/* Здесь добавьте логику для отображения и скачивания отчетов */}
      <button className="mt-2 px-4 py-2 bg-blue-500 text-white">Скачать отчет</button>
    </div>
  );
};

export default ReportDownload;
