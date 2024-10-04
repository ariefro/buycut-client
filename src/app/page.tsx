"use client";

import React, { useState, useEffect } from "react";
import SearchBar from "@/app/components/searchBar";
import BoycottedList from "./components/boycottedList";

const Home: React.FC = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [showScrollToTop, setShowScrollToTop] = useState<boolean>(false);

  const handleSearch = async (keyword: string) => {
    try {
      setKeyword(keyword);
    } catch (error) {
      const errorMessage =
        (error as any).response?.data?.message || "An error occurred";
      console.log(errorMessage);
    }
  };

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

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="bg-white">
      <div className="min-h-screen flex max-w-7xl mx-auto flex-col items-center">
        <div className="w-full space-y-6">
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
    </div>
  );
};

export default Home;
