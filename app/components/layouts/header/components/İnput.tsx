import React, { useState, useEffect, ChangeEvent, FormEvent, useRef } from "react";

// Fuzzy Match İşlevi
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
    if (searchValue.trim() !== "") {
      onSearch(searchValue.trim());
      setSuggestions([]); // Önerileri temizle
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchValue(suggestion); // Seçilen öneriyi input alanına yaz
    setSuggestions([]); // Öneri listesini temizle
    onSearch(suggestion); // Arama yap
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

  return (
    <div ref={wrapperRef} className="flex flex-col items-center w-full p-2 md:p-4 relative">
      <form onSubmit={handleSearch} className="relative  w-full max-w-md">
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
          className="absolute right-2 text-gray-500 dark:text-gray-300 hover:text-pink-500 transition-transform duration-300"
        >

        </button>

        {/* Öneriler Listesi */}
        {suggestions.length > 0 && (
          <ul className="absolute bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md mt-2 w-full z-50 shadow-lg">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
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
