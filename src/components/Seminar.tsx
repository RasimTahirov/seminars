import { useEffect, useState } from 'react';
import { deleteSeminar, editSeminar, getAllSeminars } from '../api/api';
import { ISeminar } from '../types/type';
import Modal from './Modal';
import useModal from '../hooks/useModal';
import SeminarItem from './SeminarItem';
import SeminarView from './SeminarView';
import SeminarEdit from './SeminarEdit';
import SeminarDelete from './SeminarDelete';

const Seminar = () => {
  const [seminars, setSeminars] = useState<ISeminar[]>([]);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    photo: '',
    date: '',
    time: '',
  });

  const { closeModal, openModal, modalState } = useModal();

  const update = async () => {
    const updatedSeminars = await getAllSeminars();
    setSeminars(updatedSeminars);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onDelete = async (id: string) => {
    await deleteSeminar(id);
    closeModal();
    update();
  };

  const onSumbit = async (e: React.FormEvent, id: string) => {
    e.preventDefault();
    const currentSeminar = seminars.find(seminar => seminar.id === id);
    if (!currentSeminar) return;

    const updateSeminar = {
      id: currentSeminar.id,
      title: formData.title || currentSeminar.title,
      description: formData.description || currentSeminar.description,
      date: formData.date || currentSeminar.date,
      time: formData.time || currentSeminar.time,
      photo: formData.photo || currentSeminar.photo,
    };

    await editSeminar(id, updateSeminar);
    closeModal();
    update();
  };

  useEffect(() => {
    const fetchSeminars = async () => {
      const data = await getAllSeminars();
      if (data) {
        setSeminars(data);
      }
    };
    fetchSeminars();
  }, []);

  return (
    <div className="grid justify-self-center grid-cols-2 gap-5 my-5">
      {seminars.map(seminar => (
        <div key={seminar.id}>
          <SeminarItem seminar={seminar} openModal={openModal} />
          {modalState.type === 'view' && modalState.id === seminar.id && (
            <Modal isOpen={true} onClose={closeModal}>
              <SeminarView seminar={seminar} />
            </Modal>
          )}
          {modalState.type === 'delete' && modalState.id === seminar.id && (
            <Modal isOpen={true} onClose={closeModal}>
              <SeminarDelete onDelete={onDelete} closeModal={closeModal} seminar={seminar} />
            </Modal>
          )}
          {modalState.type === 'edit' && modalState.id === seminar.id && (
            <Modal isOpen={true} onClose={closeModal}>
              <SeminarEdit
                onSumbit={onSumbit}
                seminar={seminar}
                formData={formData}
                handleChange={handleChange}
              />
            </Modal>
          )}
        </div>
      ))}
    </div>
  );
};

export default Seminar;
