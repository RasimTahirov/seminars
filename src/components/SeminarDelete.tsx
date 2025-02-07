import { ISeminar } from '../types/type';

interface SeminarDeleteProps {
  onDelete: (seminar: string) => void;
  closeModal: () => void;
  seminar: ISeminar;
}

const SeminarDelete: React.FC<SeminarDeleteProps> = ({ onDelete, closeModal, seminar }) => {
  return (
    <div className="flex flex-col justify-self-center">
      <div className="title mb-2.5">Хотите удалить семинар?</div>
      <div className="flex justify-center gap-2.5 text-lg">
        <button className="btn" onClick={() => onDelete(seminar.id)}>
          Удалить
        </button>
        <button className="btn" onClick={closeModal}>
          Отмена
        </button>
      </div>
    </div>
  );
};

export default SeminarDelete;
