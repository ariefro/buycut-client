import React from "react";
import ShareBar from "./shareBar";
import Image from "next/image";
import Link from "next/link";
import { TbArrowsExchange } from "react-icons/tb";
import { IoOpenOutline } from "react-icons/io5";

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

  const renderDescription = (description: string, name: string) => {
    const parts = description.split(new RegExp(`(${name})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === name.toLowerCase() ? (
        <strong key={index}>{part}</strong>
      ) : (
        part
      )
    );
  };

  function capitalizeWords(input: string) {
    if (!input) return input; // handle empty or null inputs
    return input
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center p-7 z-50">
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
            <div>
              <div className="flex justify-center items-center">
                <Image
                  src={data.image_url}
                  width={140}
                  height={140}
                  alt="company-logo"
                  className="flex justify-center items-center"
                />
              </div>
              <p className="mt-10 mb-5 px-5 text-gray-700">
                {renderDescription(data.description, data.name)}
              </p>
            </div>
          )}
          {data.type == "brand" && (
            <div className="w-full">
              <div className="flex justify-center items-center space-x-5">
                <Image
                  src={data.image_url}
                  width={100}
                  height={100}
                  alt="company-logo"
                />
                <TbArrowsExchange className="h-12 w-12 text-[#B7B597]" />
                <Image
                  src={data.company.image_url}
                  width={100}
                  height={100}
                  alt="company-logo"
                />
              </div>
              <p className={`mt-5 px-5 text-gray-700`}>
                <span className="font-bold">{data.name}</span> dimiliki oleh{" "}
                <span className="font-bold">
                  {capitalizeWords(data.company.name)}
                </span>
              </p>
              <p className="mt-5 mb-5 px-5 text-gray-700">
                {renderDescription(data.description, data.company.name)}
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center mb-12">
          {data?.proof?.map((proof, index) => (
            <Link
              key={index}
              href={proof}
              target="_blank"
              rel="noopener noreferrer"
              className="w-44 py-2 flex space-x-2 justify-center items-center bg-secondary text-gray-700 rounded-md text-sm text-center hover:bg-opacity-85"
            >
              <span>Data pendukung</span>
              <IoOpenOutline className="h-4 w-4 font-bold" />
            </Link>
          ))}
        </div>
        <ShareBar />
      </div>
    </div>
  );
};

export default Modal;
