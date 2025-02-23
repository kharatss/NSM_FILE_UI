export type TreeNode = {
    name: string;
    type: "file" | "folder";
    children?: TreeNode[];
  };