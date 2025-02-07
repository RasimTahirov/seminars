import { Pencil, Trash2 } from 'lucide-react';
import { ISeminar, ModalType } from '../types/type';

interface SeminarItemProps {
  seminar: ISeminar;
  openModal: (seminar: string, type: ModalType) => void;
}

const SeminarItem: React.FC<SeminarItemProps> = ({ seminar, openModal }) => {
  return (
    <div className="bg-card shadow-card cursor-pointer max-w-[25rem] rounded-xl overflow-hidden transform hover:scale-105 transition-transform ease-linear duration-200 card">
      <div className="relative" onClick={() => openModal(seminar.id, 'view')}>
        <img
          className="object-cover w-[400px] h-[400px]"
          src={seminar.photo}
          alt={seminar.title}
          loading="lazy"
        />
        <div className="bg-card absolute flex gap-1 font-medium top-0 px-2.5 py-1.5 rounded-br-xl">
          <div>{seminar.date}</div>
          <div>{seminar.time}</div>
        </div>
      </div>
      <div className="relative">
        <div className="p-2.5 min-h-[100px] content">
          <h2 className="title">{seminar.title}</h2>
          <p>{seminar.description}</p>
        </div>
        <button className="edit" onClick={() => openModal(seminar.id, 'edit')}>
          <Pencil />
          <div>Изменить</div>
        </button>
        <button className="delete" onClick={() => openModal(seminar.id, 'delete')}>
          <Trash2 />
          <div>Удалить</div>
        </button>
      </div>
    </div>
  );
};

export default SeminarItem;
