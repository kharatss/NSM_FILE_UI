import React, { useState } from "react";
import { useDeleteFolder } from "@/app/query";
import Alert from "./Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const DeleteFolder = ({ folderId }: { folderId: number }) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { mutateAsync } = useDeleteFolder();

  const handleDelete = async () => {
    await mutateAsync(folderId);
    setIsAlertOpen(false);
  };

  return (
    <div>
      <button
        onClick={() => setIsAlertOpen(true)}
        className="block px-4 py-2 text-sm text-gray-700 rounded-t-lg hover:bg-gray-100 w-full text-left "
      >
        <FontAwesomeIcon icon={faTrash} className="mr-2" />
        Delete
      </button>

      <Alert
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default DeleteFolder;
