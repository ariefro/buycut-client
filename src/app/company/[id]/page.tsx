"use client";

import React, { useState, useEffect } from "react";
import { fetchCompanyDetail } from "../../services/brandService";
import Image from "next/image";
import Modal from "@/app/components/modal";
import Loading from "@/app/components/loading";
import Link from "next/link";
import { IoOpenOutline } from "react-icons/io5";

interface Company {
  id: number;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  brands: Brand[];
  proof: string[];
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

const CompanyPage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showScrollToTop, setShowScrollToTop] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState<Company | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

  const handleScroll = () => {
    // Show scroll-to-top button when SearchBar is sticky
    if (window.scrollY > 200) {
      setShowScrollToTop(true);
    } else {
      setShowScrollToTop(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleOpenModal = (brand: Brand) => {
    setSelectedBrand(brand);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBrand(null);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setLoading(true);
        const res = await fetchCompanyDetail(id);
        setCompany(res.data);
      } catch (error) {
        const errorMessage =
          (error as any).response?.data?.message || "An error occurred";
        console.log(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCompany();
    }
  }, [id]);

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      {loading ? (
        <Loading />
      ) : company ? (
        <div className="max-w-7xl mx-auto py-8">
          <div className="w-full">
            <button
              className="fixed top-8 left-8 text-xs md:text-sm bg-zinc-200 text-gray-500 px-4 py-2 rounded-md shadow-md hover:bg-zinc-300"
              onClick={goBack}
            >
              Kembali
            </button>
          </div>
          <div className="mt-7">
            <div className="flex space-x-5 px-4 py-5 sm:px-6">
              <div className="h-32 py-2 sm:h-44 w-3/12 flex items-center justify-center bg-white rounded-lg">
                <Image
                  src={company.image_url}
                  alt={company.name}
                  width={192}
                  height={192}
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="w-9/12">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {company.name}
                </h3>
                <p className="mt-1 max-w-2xl text-sm md:text-base text-gray-500">
                  {company.description}
                </p>
                <div className="mt-5">
                  {company?.proof?.map((proof, index) => (
                    <Link
                      key={index}
                      href={proof}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-36 py-2 flex space-x-2 justify-center items-center bg-secondary text-gray-700 rounded-md text-xs text-center hover:bg-opacity-85"
                    >
                      <span>Data pendukung</span>
                      <IoOpenOutline className="h-3 w-3 font-bold" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 py-5">
              <h1 className="text-sm  md:text-base px-6 mt-6">
                Merek-merek terkait:
              </h1>
              <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                {company?.brands !== undefined ? (
                  company?.brands.map((brand, index) => (
                    <div
                      className="bg-white flex items-center space-x-3 px-7 sm:flex-col sm:space-x-0 border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:cursor-pointer transition-transform duration-300 transform hover:scale-105"
                      key={brand.id}
                      onClick={(e) => {
                        e.preventDefault();
                        handleOpenModal(brand);
                      }}
                    >
                      <div className="h-16 py-2 w-1/5 sm:w-full sm:h-44 flex items-center justify-center">
                        <Image
                          src={brand.image_url}
                          alt={brand.name}
                          width={192}
                          height={192}
                          className="object-contain w-full h-full"
                        />
                      </div>
                      <div className="sm:pt-4 sm:pb-2">
                        <h2 className="text-sm font-semibold sm:mb-2 text-center">
                          {brand.name}
                        </h2>
                      </div>
                    </div>
                  ))
                ) : (
                  <h1 className="text-sm text-gray-500">
                    Tidak ditemukan merek terkait.
                  </h1>
                )}
                {selectedBrand && (
                  <Modal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    data={selectedBrand}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-black mt-10 text-center px-4 sm:px-6 lg:px-8 font-semibold">
          Company not found.
        </p>
      )}

      {showScrollToTop && (
        <button
          className="fixed bottom-8 right-8 text-xs md:text-sm bg-zinc-200 text-gray-500 px-4 py-2 rounded-md shadow-md hover:bg-zinc-300"
          onClick={scrollToTop}
        >
          Kembali ke Atas
        </button>
      )}
    </div>
  );
};

export default CompanyPage;
