import React, { useState, useEffect } from 'react';

const Switch = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check theme status from localStorage on page load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Function to toggle the theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={toggleTheme}
        className={`relative w-10 sm:12 h-6 flex items-center rounded-full p-1 transition ${isDarkMode ? "bg-gray-700" : "bg-blue-300"
          }`}
      >
        <div
          className={`w-5 h-5 rounded-full bg-white shadow-md transform transition ${isDarkMode ? "translate-x-6" : "translate-x-0"
            }`}
        ></div>
      </button>
    </div>
  );
};

export default Switch;
