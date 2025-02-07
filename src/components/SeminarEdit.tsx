import React from 'react';
import { ISeminar } from '../types/type';

interface SeminarEditProps {
  onSumbit: (e: React.FormEvent, seminar: string) => void;
  seminar: ISeminar;
  formData: ISeminar;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SeminarEdit: React.FC<SeminarEditProps> = ({ seminar, formData, onSumbit, handleChange }) => {
  return (
    <div>
      <h3 className="flex justify-center text-2xl font-medium mb-5">Изменение семинара</h3>
      <form className="grid gap-y-2.5 w-[70%] mx-auto" onSubmit={e => onSumbit(e, seminar.id)}>
        <input
          className="input"
          placeholder="Название семинара"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <input
          className="input"
          placeholder="Дата"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        <input
          className="input"
          placeholder="Время"
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
        />
        <input
          className="input"
          placeholder="Ссылка на изображение"
          type="url"
          name="photo"
          value={formData.photo}
          onChange={handleChange}
        />
        <input
          className="input"
          placeholder="Описание"
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <button className="btn" type="submit">
          Сохранить изменение
        </button>
      </form>
    </div>
  );
};

export default SeminarEdit;
