import React, { useState, ChangeEvent, FormEvent } from 'react';

interface InputSearchProps {
  onSearch: (query: string) => void;
}

const InputSearch: React.FC<InputSearchProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState<string>('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchValue);
  };

  return (
    <div className="flex animate-pulseBorder items-center justify-center w-full p-4">
      <form onSubmit={handleSearch} className="flex glow flex-col items-center">
        <div className="grid" />
        <div id="poda" className="relative flex items-center">
          <div className="absolute inset-0 bg-gray-800 opacity-25 blur-md animate-pulse" />
          <div className="absolute inset-0 border border-gray-600" />
          <div className="absolute inset-0 border border-gray-600" />
          <div className="absolute inset-0 border border-gray-600" />
          <div className="absolute inset-0 bg-white opacity-25" />
          <div className="absolute inset-0 border border-gray-300" />
          <div
            id="main"
            className="relative flex items-center bg-gray-900 rounded-md p-3 transform transition-shadow duration-300 focus-within:shadow-lg focus-within:shadow-pink-500/50"
          >
            <input
              placeholder="Axtarın..."
              type="text"
              name="text"
              className="input z-50 text-gray-200 bg-transparent outline-none placeholder-gray-400 w-full focus:ring-0 focus:outline-none focus:animate-pulse"
              value={searchValue}
              onChange={handleInputChange}
            />
            <div id="input-mask" className="absolute inset-0" />
            <div id="pink-mask" className="absolute inset-0 bg-pink-500 opacity-10" />
            <div className="absolute inset-0 border border-pink-500" />
            <div id="filter-icon" className="flex items-center justify-center ml-2 transition-transform duration-200 hover:scale-110">
              <svg preserveAspectRatio="none" height={27} width={27} viewBox="4.8 4.56 14.832 15.408" fill="none">
                <path d="M8.16 6.65002H15.83C16.47 6.65002 16.99 7.17002 16.99 7.81002V9.09002C16.99 9.56002 16.7 10.14 16.41 10.43L13.91 12.64C13.56 12.93 13.33 13.51 13.33 13.98V16.48C13.33 16.83 13.1 17.29 12.81 17.47L12 17.98C11.24 18.45 10.2 17.92 10.2 16.99V13.91C10.2 13.5 9.97 12.98 9.73 12.69L7.52 10.36C7.23 10.08 7 9.55002 7 9.20002V7.87002C7 7.17002 7.52 6.65002 8.16 6.65002Z" stroke="#d6d6e6" strokeWidth={1} strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div id="search-icon" className="flex items-center justify-center ml-2 transition-transform duration-200 hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width={24} viewBox="0 0 24 24" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" height={24} fill="none" className="feather feather-search">
                <circle stroke="url(#search)" r={8} cy={11} cx={11} />
                <line stroke="url(#searchl)" y2="16.65" y1={22} x2="16.65" x1={22} />
                <defs>
                  <linearGradient gradientTransform="rotate(50)" id="search">
                    <stop stopColor="#f8e7f8" offset="0%" />
                    <stop stopColor="#b6a9b7" offset="50%" />
                  </linearGradient>
                  <linearGradient id="searchl">
                    <stop stopColor="#b6a9b7" offset="0%" />
                    <stop stopColor="#837484" offset="50%" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InputSearch;
