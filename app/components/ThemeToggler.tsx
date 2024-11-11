import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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
    <StyledWrapper>
      <label id="theme-toggle-button">
        <input
          type="checkbox"
          id="toggle"
          checked={isDarkMode}
          onChange={toggleTheme}
        />
        <svg className='mb-4' viewBox="0 0 69.667 44" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(3.5 3.5)" data-name="Component 15 – 1" id="Component_15_1">
            <g filter="url(#container)" transform="matrix(1, 0, 0, 1, -3.5, -3.5)">
              <rect fill="#83cbd8" transform="translate(3.5 3.5)" rx="17.5" height={35} width="60.667" data-name="container" id="container" />
            </g>
            <g transform="translate(2.333 2.333)" id="button" style={{ transform: isDarkMode ? "translate(28px, 2.333px)" : "translate(2.333px, 2.333px)" }}>
              <g data-name="sun" id="sun" style={{ opacity: isDarkMode ? 0 : 1 }}>
                <g filter="url(#sun-outer)" transform="matrix(1, 0, 0, 1, -5.83, -5.83)">
                  <circle fill="#f8e664" transform="translate(5.83 5.83)" r="15.167" cy="15.167" cx="15.167" data-name="sun-outer" id="sun-outer-2" />
                </g>
                <g filter="url(#sun)" transform="matrix(1, 0, 0, 1, -5.83, -5.83)">
                  <path fill="rgba(246,254,247,0.29)" transform="translate(9.33 9.33)" d="M11.667,0A11.667,11.667,0,1,1,0,11.667,11.667,11.667,0,0,1,11.667,0Z" data-name="sun" id="sun-3" />
                </g>
                <circle fill="#fcf4b9" transform="translate(8.167 8.167)" r={7} cy={7} cx={7} id="sun-inner" />
              </g>
              <g data-name="moon" id="moon" style={{ opacity: isDarkMode ? 1 : 0 }}>
                <g filter="url(#moon)" transform="matrix(1, 0, 0, 1, -31.5, -5.83)">
                  <circle fill="#cce6ee" transform="translate(31.5 5.83)" r="15.167" cy="15.167" cx="15.167" data-name="moon" id="moon-3" />
                </g>
                <g fill="#a6cad0" transform="translate(-24.415 -1.009)" id="patches">
                  <circle transform="translate(43.009 4.496)" r={2} cy={2} cx={2} />
                  <circle transform="translate(39.366 17.952)" r={2} cy={2} cx={2} data-name="patch" />
                  <circle transform="translate(33.016 8.044)" r={1} cy={1} cx={1} data-name="patch" />
                  <circle transform="translate(51.081 18.888)" r={1} cy={1} cx={1} data-name="patch" />
                  <circle transform="translate(33.016 22.503)" r={1} cy={1} cx={1} data-name="patch" />
                  <circle transform="translate(50.081 10.53)" r="1.5" cy="1.5" cx="1.5" data-name="patch" />
                </g>
              </g>
            </g>
            <g filter="url(#cloud)" transform="matrix(1, 0, 0, 1, -3.5, -3.5)">
              <path fill="#fff" transform="translate(-3466.47 -160.94)" d="M3512.81,173.815a4.463,4.463,0,0,1,2.243.62.95.95,0,0,1,.72-1.281,4.852,4.852,0,0,1,2.623.519c.034.02-.5-1.968.281-2.716a2.117,2.117,0,0,1,2.829-.274,1.821,1.821,0,0,1,.854,1.858c.063.037,2.594-.049,3.285,1.273s-.865,2.544-.807,2.626a12.192,12.192,0,0,1,2.278.892c.553.448,1.106,1.992-1.62,2.927a7.742,7.742,0,0,1-3.762-.3c-1.28-.49-1.181-2.65-1.137-2.624s-1.417,2.2-2.623,2.2a4.172,4.172,0,0,1-2.394-1.206,3.825,3.825,0,0,1-2.771.774c-3.429-.46-2.333-3.267-2.2-3.55A3.721,3.721,0,0,1,3512.81,173.815Z" data-name="cloud" id="cloud" style={{ opacity: isDarkMode ? 0 : 1 }} />
            </g>
            <g fill="#def8ff" transform="translate(3.585 1.325)" id="stars" style={{ opacity: isDarkMode ? 1 : 0 }}>
              <path transform="matrix(-1, 0.017, -0.017, -1, 24.231, 3.055)" d="M.774,0,.566.559,0,.539.458.933.25,1.492l.485-.361.458.394L1.024.953,1.509.592.943.572Z" />
              <path transform="matrix(-0.777, 0.629, -0.629, -0.777, 23.185, 12.358)" d="M1.341.529.836.472.736,0,.505.46,0,.4.4.729l-.231.46L.605.932l.4.326L.9.786Z" data-name="star" />
              {/* Additional stars can be added here */}
            </g>
          </g>
        </svg>
      </label>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  margin: 0;
  padding: 0;

  /* Switch container styles */
  #theme-toggle-button {
    font-size: 6px;
    position: relative;
    display: inline-block;
    width: 2rem;
    cursor: pointer;
    margin: 0; /* Ensure no extra spacing above the switch */
    padding: 0;
  }

  /* Hide default HTML checkbox */
  #toggle {
    opacity: 0;
    width: 0;
    height: 0;
  }

  #container,
  #patches,
  #stars,
  #button,
  #sun,
  #moon,
  #cloud {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 0.25s;
  }

  /* Night sky background */
  #toggle:checked + svg #container {
    fill: #2b4360;
  }

  /* Move button to right when checked */
  #toggle:checked + svg #button {
    transform: translate(28px, 2.333px);
  }

  /* Show/hide sun and moon based on checkbox state */
  #sun {
    opacity: 1;
  }

  #toggle:checked + svg #sun {
    opacity: 0;
  }

  #moon {
    opacity: 0;
  }

  #toggle:checked + svg #moon {
    opacity: 1;
  }

  /* Show or hide background items based on checkbox state */
  #cloud {
    opacity: 1;
  }

  #toggle:checked + svg #cloud {
    opacity: 0;
  }

  #stars {
    opacity: 0;
  }

  #toggle:checked + svg #stars {
    opacity: 1;
  }

  /* Ensure SVG does not add extra space */
  #theme-toggle-button svg {
    display: block;
  }
`;

export default Switch;
