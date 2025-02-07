import { useEffect, useState } from "react"
import { deleteSeminar, getAllSeminars } from "../api/api"
import { ISeminar, ModalType } from "../types/type"
import { Pencil, Trash2 } from "lucide-react"
import Modal from "./Modal"

const Seminar = () => {
  const [seminars, setSeminars] = useState<ISeminar[]>([])
  const [modalState, setModalState] = useState<{ type: ModalType; id: string | null }>({ type: null, id: null });

  const openModal = (id: string, type: ModalType) => setModalState({ type, id })
  const closeModal = () => setModalState({ type: null, id: null })

  const onDelete = (id: string) => {
    deleteSeminar(id)
    closeModal()
  }

  useEffect(() => {
    const fetchSeminars = async () => {
      const data = await getAllSeminars()
      if (data) {
        setSeminars(data)
      }
    }
    fetchSeminars()
  }, [])

  return (
    <div className="grid justify-self-center grid-cols-2 gap-5 my-5">
      {seminars.map((seminar) => (
        <div key={seminar.id}>
          <div className="bg-card shadow-card cursor-pointer max-w-[25rem] rounded-xl overflow-hidden transform hover:scale-105 transition-transform ease-linear duration-200 card">
            <div className="relative" onClick={() => openModal(seminar.id, 'view')}>
              <img className="object-cover" src={seminar.photo} alt={seminar.title} />
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
              <button className="edit" onClick={() => console.log('Изменить')}>
                <Pencil />
                <div>Изменить</div>
              </button>
              <button className="delete" onClick={() => openModal(seminar.id, 'delete')}>
                <Trash2 />
                <div>Удалить</div>
              </button>
            </div>
          </div>
          {modalState.type === 'view' && modalState.id === seminar.id && (
            <Modal isOpen={true} onClose={closeModal}>
              <div className="mb-2.5">
                <img className="object-cover rounded-xl" src={seminar.photo} alt={seminar.time} />
              </div>
              <div className="flex items-center justify-between font-medium">
                <h2 className="title">{seminar.title}</h2>
                <div className="flex gap-x-1.5">
                  <div>{seminar.date}</div>
                  <div>{seminar.time}</div>
                </div>
              </div>
              <p>{seminar.description}</p>
            </Modal>
          )}
          {modalState.type === 'delete' && modalState.id === seminar.id && (
            <Modal isOpen={true} onClose={closeModal}>
              <div className="flex flex-col justify-self-center">
                <div className="title mb-2.5">Хотите удалить семинар?</div>
                <div className="flex justify-center gap-2.5 text-lg">
                  <button className="hover:opacity-60 cursor-pointer transition-opacity duration-100 ease-linear" onClick={() => onDelete(seminar.id)}>Удалить</button>
                  <button className="hover:opacity-60 cursor-pointer transition-opacity duration-100 ease-linear" onClick={closeModal}>Отмена</button>
                </div>
              </div>
            </Modal>
          )}
        </div>
      ))}
    </div>
  )
}

export default Seminar


