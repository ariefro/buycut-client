import React from "react";
import ShareBar from "./shareBar";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  const borderColor = content?.includes("tidak ditemukan")
    ? "border-green-500"
    : "border-red-500";

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div
        className={`bg-white w-11/12 sm:w-3/4 lg:w-1/2 p-5 rounded-md shadow-lg border-2 ${borderColor}`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold"></h2>
          <button
            onClick={onClose}
            className="text-xl text-zinc-400 hover:text-zinc-500"
          >
            &times;
          </button>
        </div>
        <div className="mt-4 mb-7 text-gray-700">{content}</div>
        <ShareBar />
      </div>
    </div>
  );
};

export default Modal;
