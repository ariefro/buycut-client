import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="flex justify-center w-full mt-10 px-4 sm:px-6 lg:px-8">
      <input
        type="text"
        className="border-2 text-sm text-black border-gray-300 px-4 py-3 rounded-full w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Cari merek"
      />
    </div>
  );
};

export default SearchBar;
