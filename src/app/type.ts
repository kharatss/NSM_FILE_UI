export type TreeNode = {
    name: string;
    type: "file" | "folder";
    children?: TreeNode[];
  };

  export interface IFolder {
    id: number;
    name: string;
    description: string;
    parentFolder?: IFolder | null; // Parent folder can be null if no parent
    subFolders: IFolder[]; // Subfolders can be an array of Folder objects
    files: File[]; // List of files related to this folder
    createdAt: Date;
      updatedAt: Date;
  }

 export  interface TransformedFolder {
    id: number;
    name: string;
    description:string;
    createdAt: Date;
    updatedAt: Date;
    children: any[]; 
    type:'file'|'folder'
  }