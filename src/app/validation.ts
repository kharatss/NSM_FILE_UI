import * as Yup from 'yup';
export const createFolderValidationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Folder name must be at least 3 characters long')
      .required('Folder name is required'),
    description: Yup.string().max(500, 'Description must be less than 500 characters'),
  });

  export const uploadFilevalidationSchema = Yup.object({
      file: Yup.mixed().required('A file is required'),
      description: Yup.string()
          .required('Description is required')
          .min(5, 'Description must be at least 5 characters long')
          .max(100, 'Description must be less than 100 characters long'),
  });
  export const createFilterValidationSchema = Yup.object({
    name: Yup.string()
      .max(100, 'Name must be less than 100 characters')
      .optional(), // The name is optional
    description: Yup.string()
      .max(255, 'Description must be less than 255 characters')
      .optional(), // The description is also optional
    dateFiled: Yup.date()
      .max(new Date(), 'Date filed cannot be in the future')
      .optional(), // The date filed is optional
  });