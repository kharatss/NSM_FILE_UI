import { IFolder, TransformedFolder } from "./type";
// mapper function to transform folders into a nested structure
export const mapFoldersData = (folders: IFolder[]): TransformedFolder[] => {
  const folderMap: Record<number, TransformedFolder> = {};

  // Step 1: Create a map of all folders
  folders.forEach((folder) => {
    folderMap[folder.id] = {
      id: folder.id,
      name: folder.name,
      description: folder.description,
      createdAt: folder.createdAt,
      updatedAt: folder.updatedAt,
      type: "folder",
      children: [],
    };
  });

  // Step 2: Build the nested structure
  const rootFolders: TransformedFolder[] = [];

  folders.forEach((folder) => {
    const transformedFolder = folderMap[folder.id];

    // Add subFolders as children
    folder.subFolders.forEach((subFolder) => {
      const transformedSubFolder = folderMap[subFolder.id];
      if (transformedSubFolder) {
        transformedFolder.children.push(transformedSubFolder);
      }
    });

    // Add files as children
    folder.files.forEach((file) => {
      transformedFolder.children.push(file);
    });

    // If the folder has no parent, it's a root folder
    if (!folders.some((f) => f.subFolders.some((sf) => sf.id === folder.id))) {
      rootFolders.push(transformedFolder);
    }
  });

  return rootFolders;
};
