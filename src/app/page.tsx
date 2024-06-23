"use client";

import SearchBar from "@/app/components/searchBar";
import type { NextPage } from "next";
import { useState } from "react";
import Modal from "@/app/components/modal";
import { searchBoycottedBrand } from "./services/brandService";
import BoycottedList from "./components/boycottedList";

const Home: NextPage = () => {
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");

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

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center">
      <h1 className="text-md lg:text-xl lg:w-1/2 text-black mt-10 text-center px-4 sm:px-6 lg:px-8">
        Sebuah platform yang mempromosikan konsumerisme yang bijaksana dengan
        memfasilitasi akses informasi mengenai perusahaan-perusahaan yang
        mendukung atau tidak mendukung pendudukan ilegal Israel di Palestina.
      </h1>
      <div className="w-full max-w-4xl">
        <SearchBar onSearch={handleSearch} />
        <BoycottedList keyword={keyword} />
      </div>
    </div>
  );
};

export default Home;
