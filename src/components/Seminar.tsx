import { useEffect, useState } from "react"
import { getAllSeminars } from "../api/api"
import { ISeminar } from "../types/type"
import { Pencil, Trash2 } from "lucide-react"
import Modal from "./Modal"

const Seminar = () => {
  const [seminars, setSeminars] = useState<ISeminar[]>([])
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalOpenId, setModalOpenId] = useState<string | null>(null);

  const openModal = (id: string) => {
    setModalOpen(true)
    setModalOpenId(id)
    console.log(id)
  }
  const closeModal = () => setModalOpen(false);

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
            <div className="relative" onClick={() => openModal(seminar.id)}>
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
              <button className="delete" onClick={() => console.log('Удалить')}>
                <Trash2 />
                <div>Удалить</div>
              </button>
            </div>
          </div>
          {isModalOpenId === seminar.id && (
            <Modal isOpen={isModalOpen} onClose={closeModal}>
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
        </div>
      ))}
    </div>
  )
}

export default Seminar