import React from 'react';
import Image from 'next/image';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };
  return (
    <div className="flex items-center sm:w-96">
      <div className="relative flex items-center w-full">
        <Image
          src="/assets/icons/search.png" // Adjust the path if needed
          alt="Search Icon"
          width={24}
          height={24}
          className="absolute left-4"
        />
        <input
          type="text"
          placeholder="Search ingredients to make a salad..."
          className="pl-12 pr-4 py-3 rounded-xl w-full focus:outline-none"
        onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default SearchBar;
