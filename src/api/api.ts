import axios from 'axios';
import { ISeminar } from '../types/type';

export const getAllSeminars = async () => {
  try {
    const res = await axios.get('http://localhost:3000/seminars');
    return res.data;
  } catch (error) {
    console.log('Ошибка в получении данных', error);
  }
};

export const deleteSeminar = async (id: string) => {
  try {
    const res = await axios.delete(`http://localhost:3000/seminars/${id}`);
    return res;
  } catch (error) {
    console.error('Ошибка при удалении семинара', error);
  }
};

export const editSeminar = async (id: string, formData: ISeminar) => {
  try {
    const res = await axios.patch(`http://localhost:3000/seminars/${id}`, formData);
    return res;
  } catch (error) {
    console.error('Ошибка при изменении семинара', error);
  }
};
