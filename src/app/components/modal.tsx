import React from "react";
import ShareBar from "./shareBar";
import Image from "next/image";
import Link from "next/link";

interface Company {
  id: number;
  name: string;
  slug: string;
  description: string;
  image_url: string;
}

interface Brand {
  id: number;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  company: Company;
  proof: string[];
  type: string;
  created_at: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: Brand;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  const bold = data?.name && "font-bold";

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center p-7">
      <div className={`bg-white sm:w-3/4 lg:w-1/3 rounded-md shadow-lg`}>
        <div className="flex justify-between items-center p-5">
          <h2 className="text-xl font-bold"></h2>
          <button
            onClick={onClose}
            className="text-xl text-zinc-400 hover:text-zinc-500"
          >
            &times;
          </button>
        </div>
        <div className="flex justify-center">
          {data.type == "company" && (
            <Image
              src={data.image_url}
              width={96}
              height={96}
              alt="company-logo"
            />
          )}
          {data.type == "product" && (
            <div className="flex justify-center items-center">
              <Image
                src={data.company.image_url}
                width={96}
                height={96}
                alt="company-logo"
              />
              <p>==</p>
              <Image
                src={data.image_url}
                width={96}
                height={96}
                alt="company-logo"
              />
            </div>
          )}
        </div>
        <p className={`mt-10 px-5 text-gray-700 ${bold}`}>{data.name}</p>
        <p className={`mt-2 mb-12 px-5 text-gray-700`}>{data.description}</p>
        <div className="flex flex-col items-center mb-5">
          {data?.proof?.map((proof, index) => (
            <Link
              key={index}
              href={proof}
              target="_blank"
              rel="noopener noreferrer"
              className="w-24 px-6 py-2 bg-secondary text-gray-700 rounded-md text-sm text-center hover:bg-opacity-85"
            >
              Bukti
            </Link>
          ))}
        </div>
        <ShareBar />
      </div>
    </div>
  );
};

export default Modal;
