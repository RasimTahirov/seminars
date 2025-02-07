import { CircleX } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50" onClick={onClose}>
      <div className="bg-white p-9 rounded-xl w-1/3 relative" onClick={(e) => e.stopPropagation()}>
        <button className="absolute right-2.5 top-2.5 cursor-pointer" onClick={onClose}>
          <CircleX />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;