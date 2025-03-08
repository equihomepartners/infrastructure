import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      <svg
        width="40"
        height="40"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Roof */}
        <path
          d="M10 50L50 10L90 50"
          stroke="#0047AB"
          strokeWidth="20"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Green Squares */}
        <rect x="35" y="55" width="12" height="12" rx="3" fill="#4ade80" />
        <rect x="53" y="55" width="12" height="12" rx="3" fill="#4ade80" />
        <rect x="35" y="73" width="12" height="12" rx="3" fill="#4ade80" />
        <rect x="53" y="73" width="12" height="12" rx="3" fill="#4ade80" />
      </svg>
      <span className="text-xl font-semibold text-gray-900">
        Equihome Partners
      </span>
    </div>
  );
};

export default Logo;