"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent, useRef } from "react";
import { usePathname } from "next/navigation";

const fuzzySearch = (query: string, dataset: string[]): string[] => {
  const lowerQuery = query.toLowerCase();
  return dataset.filter((item) =>
    item.toLowerCase().includes(lowerQuery)
  );
};

interface InputSearchProps {
  dataset: string[]; // Arama yapılacak veri kümesi
  onSearch: (query: string) => void; // Arama işlevi
}

const InputSearch: React.FC<InputSearchProps> = ({ dataset, onSearch }) => {
  const pathname = usePathname(); // Mevcut yol
  const [searchValue, setSearchValue] = useState<string>(""); // Kullanıcının yazdığı değer
  const [suggestions, setSuggestions] = useState<string[]>([]); // Öneriler
  const wrapperRef = useRef<HTMLDivElement>(null); // Arama kutusunu saran div referansı

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);

    if (value.trim() !== "") {
      const matches = fuzzySearch(value, dataset);
      setSuggestions(matches.slice(0, 5)); // Maksimum 5 öneri
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedValue = searchValue.trim();

    if (trimmedValue !== "") {
      onSearch(trimmedValue);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchValue(suggestion);
    setSuggestions([]);
    onSearch(suggestion);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    };

    if (suggestions.length > 0) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [suggestions]);

  useEffect(() => {
    setSearchValue("");
    setSuggestions([]);
  }, [pathname]);

  return (
    <div ref={wrapperRef} className="flex flex-col items-center w-full p-2 md:p-4 relative">
      <form onSubmit={handleSearch} className="relative w-full max-w-md">
        <input
          aria-label="Axtarın"
          placeholder="Axtarın..."
          type="text"
          name="text"
          className="z-50 dark:text-[#988d57] dark:text-gray-200 bg-transparent outline-none placeholder-gray-400 w-full px-4 py-2 rounded-md border-2 border-[#988d57] dark:border-gray-600 focus:ring-2 focus:ring-[#988d57]"
          value={searchValue}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#988d57] dark:text-gray-300 hover:text-[#514b2c] transition-transform duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 10-10.6-10.6 7.5 7.5 0 0010.6 10.6z"
            />
          </svg>
        </button>

        {suggestions.length > 0 && (
          <ul
            role="listbox"
            className="absolute bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md mt-2 w-full z-50 shadow-lg"
          >
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white text-black cursor-pointer"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
};

export default InputSearch;
