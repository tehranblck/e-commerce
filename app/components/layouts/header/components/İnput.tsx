"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent, useRef } from "react";
import { usePathname } from "next/navigation";

interface Product {
  id: number;
  name: string;
  // Add other product fields as needed
}

interface InputSearchProps {
  onSearch: (query: string) => void;
}

const InputSearch: React.FC<InputSearchProps> = ({ onSearch }) => {
  const pathname = usePathname();
  const [searchValue, setSearchValue] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const fetchProducts = async (query: string) => {
    if (query.trim().length < 2) {
      setProducts([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://admin.raelli.az/api/products/?search=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    await fetchProducts(value);
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedValue = searchValue.trim();

    if (trimmedValue !== "") {
      onSearch(trimmedValue);
      setProducts([]);
    }
  };

  const handleProductClick = (product: Product) => {
    setSearchValue(product.name);
    setProducts([]);
    onSearch(product.name);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setProducts([]);
      }
    };

    if (products.length > 0) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [products]);

  useEffect(() => {
    setSearchValue("");
    setProducts([]);
  }, [pathname]);

  return (
    <div ref={wrapperRef} className="flex flex-col items-center w-full p-2 md:p-4 relative">
      <form onSubmit={handleSearch} className="relative w-full max-w-md">
        <input
          aria-label="Axtarın"
          placeholder="Axtarın..."
          type="text"
          name="text"
          className="z-50 text-gray-200 bg-transparent outline-none placeholder-gray-400 w-full px-4 py-2 rounded-md border-2 border-[#988d57] dark:border-gray-600 focus:ring-2 focus:ring-[#988d57]"
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

        {loading && (
          <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#988d57] border-t-transparent"></div>
          </div>
        )}

        {products.length > 0 && (
          <ul
            role="listbox"
            className="absolute bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md mt-2 w-full z-50 shadow-lg"
          >
            {products.map((product) => (
              <li
                key={product.id}
                onClick={() => handleProductClick(product)}
                className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white text-black cursor-pointer"
              >
                {product.name}
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
};

export default InputSearch;
