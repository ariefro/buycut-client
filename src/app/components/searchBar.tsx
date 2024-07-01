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
    <div className="sticky top-0 bg-white z-50 shadow-md">
      <div className="flex items-center justify-between p-4">
        <div className="flex-grow mx-4">
          <input
            type="text"
            className="border-2 text-sm text-black border-gray-300 px-4 py-2 rounded-full w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Cari merek"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
