import { faEdit, faEllipsisVertical,faPlusSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect, useRef } from 'react';
import FolderModal from './CreateFolder';
import UploadModal from './UploadFile';

type TMenuPopover = {
  isFromMiddleSection?: boolean;
  folder?: any;
};

const MenuPopover: React.FC<TMenuPopover> = ({ isFromMiddleSection = false, folder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const popoverRef = useRef<HTMLDivElement | null>(null); 
  const buttonRef = useRef<HTMLDivElement | null>(null); 

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false); 
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Clean up event listener
    };
  }, []);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 z-40"></div>
      )}
      <div className="relative inline-block text-left">
        <div ref={buttonRef} onClick={togglePopover}>
          {isFromMiddleSection ? <FontAwesomeIcon icon={faEllipsisVertical} className="text-blue-500" />
            : <FontAwesomeIcon icon={faPlusSquare} className="text-gray-600 cursor-pointer" />}
        </div>

        {isOpen && (
          <div
            ref={popoverRef} 
            className="origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
          >
            <div>
              {isFromMiddleSection &&
                (<><button
                  className="block px-4 py-2 text-sm text-gray-700 rounded-t-lg hover:bg-gray-100 w-full text-left"
                >
                  <FontAwesomeIcon icon={faEdit} className="mr-2" /> Edit
                </button>
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left border-y border-gray-300"
                  >
                    <FontAwesomeIcon icon={faTrash} className="mr-2" />
                    Delete
                  </button>
                </>)
              }
              <FolderModal folder={folder} isFromMiddleSection={isFromMiddleSection}/>
              <UploadModal folder={folder} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MenuPopover;
