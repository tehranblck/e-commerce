import React from "react";

const Loading = () => {
  return (
    <div className="loading-container flex justify-center items-center bg-[#181818] py-20">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ margin: "auto", background: "none", display: "block" }}
        width="100px"
        height="100px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          stroke="#3498db"
          strokeWidth="10"
          r="35"
          strokeDasharray="164.93361431346415 56.97787143782138"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1s"
            keyTimes="0;1"
            values="0 50 50;360 50 50"
          />
        </circle>
      </svg>
    </div>
  );
};

export default Loading;
