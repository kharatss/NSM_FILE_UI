
import React, { useRef, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faFileArrowUp, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useUploadFile } from '../query';
import { uploadFilevalidationSchema } from '../validation';

interface FormValues {
    file: File | null;
    description: string;
    folderId: number | null;
}

interface UploadModalProps {
    folder: any;
}



const UploadModal: React.FC<UploadModalProps> = ({ folder }) => {
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [fileName, setFileName] = useState<string>('');
    const [progress, setProgress] = useState<number>(0); // Progress state
    const { mutateAsync, isPending } = useUploadFile(setProgress);

    const handleUploadDocument = () => {
        setIsUploadOpen(!isUploadOpen);
    };

    const handleSubmit = async (values: FormValues) => {
        try {
            await mutateAsync({ ...values, folderId: folder.id });
        } catch (error) {
            console.error(error);
        }
        setIsUploadOpen(!isUploadOpen);
    };

    const handleFileClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files ? e.currentTarget.files[0] : null;
        setFileName(file ? file.name : ''); 
    };

    return (
        <div>
            <button
                onClick={handleUploadDocument}
                className="block px-4 py-2 text-sm text-gray-700 rounded-b-lg hover:bg-gray-100 w-full text-left border-t border-gray-300"
            >
                <FontAwesomeIcon icon={faFileArrowUp} className="mr-1" /> Upload Document
            </button>

            {isUploadOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg w-96">
                        <div className="flex justify-between items-center border-b border-gray-300 mb-4">
                            <p className="text-sm font-semibold px-5 py-3">Upload Document</p>
                            <FontAwesomeIcon icon={faXmark} onClick={handleUploadDocument} className='mr-5' />
                        </div>

                        <Formik
                            initialValues={{ file: null, description: '', folderId: null }}
                            validationSchema={uploadFilevalidationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ setFieldValue, isSubmitting, isValid }) => (
                                <Form>
                                    <div className='px-5'>
                                        <label className="block text-sm font-semibold text-gray-700" htmlFor="file">
                                            Choose a file:
                                        </label>
                                        <div
                                            className="relative w-full h-12 border border-gray-300 rounded-md cursor-pointer flex items-center justify-start px-3"
                                            onClick={handleFileClick}
                                        >
                                            <FontAwesomeIcon
                                                icon={faFile}
                                                className="text-gray-500 mr-2"
                                            />
                                            <div className="text-gray-500 truncate">
                                                {fileName || 'Upload Document'}
                                            </div>
                                        </div>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            className="hidden"
                                            onChange={(e) => {
                                                const file = e.currentTarget.files ? e.currentTarget.files[0] : null;
                                                setFieldValue('file', file);
                                                handleFileChange(e);
                                            }}
                                        />
                                        <div className="text-red-500 text-sm mt-1">
                                            <ErrorMessage name="file" />
                                        </div>
                                    </div>

                                    <div className="mt-4 px-5">
                                        <label className="block text-sm font-semibold text-gray-700" htmlFor="description">
                                            Description:
                                        </label>
                                        <Field
                                            type="text"
                                            name="description"
                                            id="description"
                                            placeholder="Enter a description"
                                            className="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                                        />
                                        <div className="text-red-500 text-sm mt-1">
                                            <ErrorMessage name="description" />
                                        </div>
                                    </div>

                                    <div className='border-t border-gray-300 mt-5' />
                                    
                                    <div className="mt-4 flex justify-end space-x-4 px-5 mb-4">
                                        <button
                                            type="button"
                                            onClick={handleUploadDocument}
                                            className="px-4 py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting || !isValid}
                                            className="px-4 py-1 bg-blue-900 text-white rounded-md hover:bg-blue-700"
                                        >
                                            Upload
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>

                        {isPending && (
                            <div className="px-5 py-3">
                                <div className="w-full bg-gray-300 h-2.5 rounded-full">
                                    <div
                                        className="bg-blue-500 h-2.5 rounded-full"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                                <div className="text-center mt-2 text-sm text-gray-500">
                                    {progress}% Uploading...
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadModal;
