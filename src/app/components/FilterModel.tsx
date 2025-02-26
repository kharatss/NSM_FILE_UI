import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faTrash, faFilter } from "@fortawesome/free-solid-svg-icons";
import { createFilterValidationSchema } from "../validation"; // Assuming a validation schema for filter

const FilterModal = () => {
  const [clear, setClear] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setClear(false);
    setIsOpen(!isOpen);
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const initialValues = {
    name: "",
    description: "",
    dateFiled: "",
  };

  const handleSubmit = async (values: any) => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <FontAwesomeIcon
        icon={faFilter}
        className="text-gray-600 cursor-pointer"
        onClick={handleClick}
      />

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-md w-96">
            <div className="border-b border-gray-300 mb-4 flex justify-between items-center">
              <p className="text-sm font-semibold px-5 py-3">Filter</p>
              <div className="flex space-x-3">
                <FontAwesomeIcon
                  icon={faXmark}
                  onClick={handleClose}
                  className="cursor-pointer text-gray-600 mr-5"
                />
              </div>
            </div>

            <Formik
              initialValues={clear ? initialValues : initialValues}
              validationSchema={createFilterValidationSchema} // You can define this validation schema
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting, isValid }) => (
                <Form>
                  <div className="mb-4 px-5">
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Name
                    </label>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      className="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                    {errors.name && touched.name && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.name}
                      </div>
                    )}
                  </div>

                  <div className="mb-4 px-5">
                    <label
                      htmlFor="description"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Description
                    </label>
                    <Field
                      type="text"
                      id="description"
                      name="description"
                      className="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                    {errors.description && touched.description && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.description}
                      </div>
                    )}
                  </div>

                  <div className="mb-4 px-5">
                    <label
                      htmlFor="dateFiled"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Date
                    </label>
                    <Field
                      type="date"
                      id="dateFiled"
                      name="dateFiled"
                      className="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                    {errors.dateFiled && touched.dateFiled && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.dateFiled}
                      </div>
                    )}
                  </div>

                  <div className="border-t border-gray-300" />
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
                      Apply
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

export default FilterModal;
