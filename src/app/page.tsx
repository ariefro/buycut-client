"use client";

import SearchBar from "@/components/searchBar";
import type { NextPage } from "next";
import { useState } from "react";
import axios from "@/app/utils/axiosInstance";
import Modal from "@/components/modal";

const Home: NextPage = () => {
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSearch = async (keyword: string) => {
    try {
      const res = await axios.post("/products/search", { keyword });
      setSearchResult(res.data.message);
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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <h1 className="text-md text-black font-semibold mt-10 text-center px-4 sm:px-6 lg:px-8">
        Mencari produk yang diboikot berdasarkan nama merek atau nama produk.
      </h1>
      <SearchBar onSearch={handleSearch} />
      {searchResult && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          content={searchResult}
        />
      )}
    </div>
  );
};

export default Home;
