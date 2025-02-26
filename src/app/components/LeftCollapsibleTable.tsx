import React from "react";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LuFolder, LuFolderOpen } from "react-icons/lu";
import { FaPlusCircle } from "react-icons/fa";

interface TransformedFolder {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  children: TransformedFolder[]; // Children can be folders or files
  type: "file" | "folder";
}

interface CollapsibleTableProps {
  data: TransformedFolder[];
  expandedNodes: Set<number>;
  toggleExpand: (id: number) => void;
}

const LeftCollapsibleTable: React.FC<CollapsibleTableProps> = ({
  data,
  expandedNodes,
  toggleExpand,
}) => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="overflow-y-auto border border-gray-200">
        {data.map((node) => (
          <div
            key={node.id}
            className="bg-white shadow-md border border-gray-200"
          >
            <TableRow
              node={node}
              level={0}
              expandedNodes={expandedNodes}
              toggleExpand={toggleExpand}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

interface TableRowProps {
  node: TransformedFolder;
  level: number; // Indicates the depth level (0 for parent, 1 for child, etc.)
  expandedNodes: Set<number>;
  toggleExpand: (id: number) => void;
}

const TableRow: React.FC<TableRowProps> = ({
  node,
  level,
  expandedNodes,
  toggleExpand,
}) => {
  const isExpanded = expandedNodes.has(node.id);

  return (
    <>
      <div
        className={`p-2 border-b border-gray-200 ${
          level === 0 ? "rounded-t-md" : ""
        } ${level > 0 ? "bg-gray-50" : ""}`}
        onClick={() => toggleExpand(node.id)}
      >
        <div className="grid grid-cols-2 gap-4 items-center">
          <div
            className="flex items-center"
            style={{ paddingLeft: `${level * 20}px` }}
          >
            <span className="flex items-center space-x-3">
              {node.type === "folder" ? (
                isExpanded ? (
                  <LuFolderOpen size={24} className="cursor-pointer" />
                ) : (
                  <LuFolder size={24} className="cursor-pointer" />
                )
              ) : (
                <FontAwesomeIcon
                  icon={faFileAlt}
                  className="text-blue-500 mr-2"
                />
              )}
              <span
                className={`${
                  node.type === "folder"
                    ? "font-semibold text-sm"
                    : "text-zinc-500 text-sm"
                }`}
              >
                {node.name}
              </span>
            </span>
          </div>

          <div className="text-right justify-items-end">
            <FaPlusCircle
              className={
                isExpanded && level === 0
                  ? "text-yellow-400 cursor-pointer"
                  : "text-gray-500 cursor-pointer"
              }
            />{" "}
          </div>
        </div>
      </div>

      {isExpanded && node.children && (
        <div className="pl-6">
          {node.children.map((child) => (
            <TableRow
              key={child.id}
              node={child}
              level={level + 1}
              expandedNodes={expandedNodes}
              toggleExpand={toggleExpand}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default LeftCollapsibleTable;
