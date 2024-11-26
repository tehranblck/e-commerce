"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent, useRef } from "react";
import { usePathname } from "next/navigation";

const fuzzySearch = (query: string, dataset: string[]): string[] => {
  const lowerQuery = query.toLowerCase();
  return dataset.filter((item) =>
    item.toLowerCase().includes(lowerQuery) // Kullanıcının girdiği değere göre eşleşme
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

    // Önerileri filtrele
    if (value.trim() !== "") {
      const matches = fuzzySearch(value, dataset); // En yakın eşleşmeleri bul
      setSuggestions(matches.slice(0, 5)); // Maksimum 5 öneri göster
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedValue = searchValue.trim();

    if (trimmedValue !== "") {
      // Kullanıcının girdisini API'ye gönder
      onSearch(trimmedValue);
      setSuggestions([]); // Önerileri temizle
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchValue(suggestion); // Seçilen öneriyi input alanına yaz
    setSuggestions([]); // Öneri listesini temizle
    onSearch(suggestion); // Öneriyi API'ye gönder
  };

  // Arama kutusu dışında bir yere tıklanırsa önerileri kapatma
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setSuggestions([]); // Önerileri temizle
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Rota değişimini izleyerek input sıfırlama
  useEffect(() => {
    setSearchValue(""); // Yol değiştiğinde input sıfırlanır
    setSuggestions([]); // Öneriler temizlenir
  }, [pathname]); // `pathname` değişimini izler

  return (
    <div ref={wrapperRef} className="flex flex-col items-center w-full p-2 md:p-4 relative">
      <form onSubmit={handleSearch} className="relative w-full max-w-md">
        <input
          placeholder="Axtarın..."
          type="text"
          name="text"
          className="z-50 text-gray-700 dark:text-gray-200 bg-transparent outline-none placeholder-gray-400 w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-pink-500"
          value={searchValue}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 hover:text-pink-500 transition-transform duration-300"
        >
          {/* Arama ikonu */}
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

        {/* Öneriler Listesi */}
        {suggestions.length > 0 && (
          <ul className="absolute bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md mt-2 w-full z-50 shadow-lg">
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
