import {
  faEllipsisVertical,
  faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useRef } from "react";
import UploadModal from "./UploadFile";
import CreateFolderModal from "./CreateFolder";
import DeleteFolder from "./DeleteFolder";

type TMenuPopover = {
  isFromMiddleSection?: boolean;
  folder?: any;
};

const MenuPopover: React.FC<TMenuPopover> = ({
  isFromMiddleSection = false,
  folder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState<"bottom" | "top">(
    "bottom"
  );

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

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Clean up event listener
    };
  }, []);

  useEffect(() => {
    if (isOpen && buttonRef.current && popoverRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const popoverHeight = popoverRef.current.offsetHeight;
      const spaceBelow = window.innerHeight - buttonRect.bottom;
      const spaceAbove = buttonRect.top;

      if (spaceBelow < popoverHeight && spaceAbove > popoverHeight) {
        setPopoverPosition("top");
      } else {
        setPopoverPosition("bottom");
      }
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 z-40"></div>
      )}
      <div className="relative inline-block text-left">
        <div ref={buttonRef} onClick={togglePopover}>
          {isFromMiddleSection ? (
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              className="cursor-pointer"
            />
          ) : (
            <FontAwesomeIcon
              icon={faPlusSquare}
              className="text-gray-600 cursor-pointer"
            />
          )}
        </div>

        {isOpen && (
          <div
            ref={popoverRef}
            className={`origin-top-right absolute ${
              popoverPosition === "bottom"
                ? "top-full mt-2"
                : "bottom-full mb-2"
            } right-0 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50`}
          >
            <div>
              {isFromMiddleSection && <DeleteFolder folderId={folder.id} />}
              <CreateFolderModal
                folder={folder}
                isFromMiddleSection={isFromMiddleSection}
              />
              <UploadModal folder={folder} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MenuPopover;
