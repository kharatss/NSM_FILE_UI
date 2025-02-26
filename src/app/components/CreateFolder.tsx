import React, { useCallback, useMemo, useState } from "react";
import { Field, Form, Formik } from "formik";
import { useCreateFolder, useUpdateFolder } from "../query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus, faEdit, faXmark } from "@fortawesome/free-solid-svg-icons";
import { createFolderValidationSchema } from "../validation";

interface TFolderModal {
  folder?: { id: string; name: string; description: string };
  isFromMiddleSection: boolean;
}

type Mode = "ADD" | "EDIT";

const CreateFolderModal: React.FC<TFolderModal> = ({ folder, isFromMiddleSection }) => {
  const [mode, setMode] = useState<Mode>("ADD");
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync, isPending } = useCreateFolder();
  const {mutateAsync:editMutentAsync,isPending:isUpdatePending}=useUpdateFolder();

  const handleToggleModal = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
console.log('mode',mode)
  const handleEditClick = useCallback(() => {
    setMode("EDIT");
    handleToggleModal();
  }, [handleToggleModal]);

  const initialValues = useMemo(
    () => ({
      name: mode === "EDIT" && folder ? folder.name : "",
      description: mode === "EDIT" && folder ? folder.description : "",
    }),
    [mode, folder]
  );

  const handleSubmit = useCallback(
    async (values: { name: string; description: string }) => {
      try {
        if(mode==='ADD'){
        await mutateAsync({
          ...values,
          parentFolderId: isFromMiddleSection && folder ? folder.id : "",
        });}
        else{
          await editMutentAsync({
           payload:{ ...values},
            id:folder?.id ?? '' ,
          });
        }
      } catch (error) {
        console.error(error);
      }
      handleToggleModal();
    },
    [mutateAsync,editMutentAsync,mode, isFromMiddleSection, folder, handleToggleModal]
  );

  return (
    <div>
      {isFromMiddleSection && (
        <button
          onClick={handleEditClick}
          className="block px-4 py-2 text-sm text-gray-700 border-y border-gray-300 hover:bg-gray-100 w-full text-left"
        >
          <FontAwesomeIcon icon={faEdit} className="mr-2" /> Edit
        </button>
      )}
      <button
        onClick={handleToggleModal}
        className="block px-4 py-2 text-sm text-gray-700 rounded-t-lg hover:bg-gray-100 w-full text-left border-b last:border-0"
      >
        <FontAwesomeIcon icon={faFolderPlus} className="mr-1" />
        Create Folder
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-md w-96">
            <div className="border-b border-gray-300 mb-4 flex justify-between items-center">
              <p className="text-sm font-semibold px-5 py-3">
                {mode === "ADD" ? "Create Folder" : "Edit Folder"}
              </p>
              <FontAwesomeIcon
                icon={faXmark}
                onClick={handleToggleModal}
                className="mr-5 cursor-pointer"
              />
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={createFolderValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting, isValid, dirty }) => (
                <Form>
                  <div className="mb-4 px-5">
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                      Name
                    </label>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      className="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                    {errors.name && touched.name && (
                      <div className="text-red-500 text-sm mt-1">{errors.name}</div>
                    )}
                  </div>

                  <div className="mb-4 px-5">
                    <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
                      Description
                    </label>
                    <Field
                      type="text"
                      id="description"
                      name="description"
                      className="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                    {errors.description && touched.description && (
                      <div className="text-red-500 text-sm mt-1">{errors.description}</div>
                    )}
                  </div>
                  <div className="border-t border-gray-300" />
                  <div className="flex justify-end space-x-5 my-4 px-5">
                    <button
                      type="button"
                      onClick={handleToggleModal}
                      className="px-4 py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1 bg-blue-900 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                      disabled={isSubmitting || !isValid || (mode === "EDIT" && !dirty)}
                    >
                      {mode === "ADD" ? "Create" : "Save"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateFolderModal;