import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { useCreateFolder } from '../query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons/faFolderPlus';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { createFolderValidationSchema } from '../validation';

interface TFolderModal {
  folder: any;
  isFromMiddleSection: boolean;
}
const FolderModal: React.FC<TFolderModal> = ({ folder, isFromMiddleSection }) => {
  const [isOpen, setIsopen] = useState(false);
  const { mutateAsync, isPending } = useCreateFolder();
  const handleClose = () => {
    setIsopen(!isOpen);
  };

  const handleClick = () => {
    setIsopen(!isOpen);
  };

  
  const initialValues = {
    name: '',
    description: '',
  };

  const handleSubmit = async (values: any) => {
    try {
      await mutateAsync({ ...values, parentFolderId: isFromMiddleSection ? folder.id : '' })
    }
    catch (error) {
      console.error(error)
    }
    setIsopen(!isOpen);
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="block px-4 py-2 text-sm text-gray-700 rounded-t-lg hover:bg-gray-100 w-full text-left border-b last:border-0"
      >
        <FontAwesomeIcon icon={faFolderPlus} className='mr-1' />Create Folder
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-md w-96">
            <div className="border-b border-gray-300 mb-4 flex justify-between items-center">
              <p className="text-sm font-semibold px-5 py-3 ">Create Folder</p>
              <FontAwesomeIcon icon={faXmark}
                onClick={handleClose}
                className='mr-5'
              />
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={createFolderValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting, isValid }) => (
                <Form >
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
                  <div className='border-t border-gray-300' />
                  <div className="flex justify-end space-x-5 my-4 px-5">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-4 py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1 bg-blue-900 text-white rounded-md hover:bg-blue-700"
                      disabled={isSubmitting || !isValid}
                    >
                      Create
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

export default FolderModal;
