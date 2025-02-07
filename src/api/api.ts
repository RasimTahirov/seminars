import axios from "axios";

export const getAllSeminars = async () => {
  try {
    const res = await axios.get("http://localhost:3000/seminars");
    return res.data;
  } catch (error) {
    console.log("Ошибка в получении данных", error);
  }
};
