import React from 'react';

interface PopUpProps {
  hidden?: boolean;
  onClose?: () => void;
  title?: string;
  children?: React.ReactNode;
}

function PopUp({
  hidden = true,
  onClose = () => {},
  title = 'PopUp Title',
  children,
}: PopUpProps) {
  if (hidden) return null;

  return (
    <div className="w-full h-full fixed top-0 left-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-box m-2 p-4 rounded-lg shadow-lg md:max-w-xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            &times;
          </button>
        </div>
        <div className="mb-4">{children}</div>
      </div>
    </div>
  );
}

export default PopUp;
