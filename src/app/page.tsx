"use client";

import React, { useState, useEffect } from "react";
import SearchBar from "@/app/components/searchBar";
import { searchBoycottedBrand } from "./services/brandService";
import BoycottedList from "./components/boycottedList";

const Home: React.FC = () => {
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");
  const [showScrollToTop, setShowScrollToTop] = useState<boolean>(false);

  const handleSearch = async (keyword: string) => {
    try {
      setKeyword(keyword);

      const res = await searchBoycottedBrand(keyword);
      setSearchResult(res.message);
      setIsModalOpen(true);
    } catch (error) {
      const errorMessage =
        (error as any).response?.data?.message || "An error occurred";
      setSearchResult(errorMessage);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleScroll = () => {
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

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center">
      <h1 className="text-md lg:text-xl lg:w-1/2 text-black mt-10 text-center px-4 sm:px-6 lg:px-8 font-semibold">
        Sebuah platform yang mempromosikan konsumerisme yang bijaksana dengan
        memfasilitasi akses informasi mengenai perusahaan-perusahaan yang
        mendukung pendudukan ilegal Israel di Palestina.
      </h1>

      <div className="w-full max-w-4xl space-y-6">
        <SearchBar onSearch={handleSearch} />
        <BoycottedList keyword={keyword} />
      </div>
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

export default Home;
