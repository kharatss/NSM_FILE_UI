import React from "react";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import MenuPopover from "./MenuPopover";
import { LuFolder, LuFolderOpen } from "react-icons/lu";
import { FaCaretRight } from "react-icons/fa";

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

const RightCollapsibleTable: React.FC<CollapsibleTableProps> = ({
  data,
  expandedNodes,
  toggleExpand,
}) => {
  return (
    <div className="w-full overflow-x-auto pl-3 min-h-screen">
      <div className="p-4 grid grid-cols-[3fr_2fr_1.75fr_1.75fr_25px] gap-4 text-sm font-semibold">
        <div className="pl-12">Name</div>
        <div>Description</div>
        <div>Created At</div>
        <div>Updated At</div>
      </div>

      <div className="space-y-2">
        {data.map((node) => (
          <div
            key={node.id}
            className="bg-white rounded-md shadow-md border border-gray-200"
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
        } ${level > 0 ? "bg-gray-50" : ""}${
          level === 0 && isExpanded ? "bg-gray-200" : ""
        } `}
      >
        <div className="grid grid-cols-[3fr_2fr_1.75fr_1.75fr_25px] gap-4 items-center">
          <div
            className="flex items-center"
            style={{ paddingLeft: `${level * 20}px` }}
          >
            {node.type === "folder" && (
              <span className="mr-2">
                {isExpanded && (
                  <FaCaretRight
                    onClick={() => toggleExpand(node.id)}
                    className=" cursor-pointer"
                  />
                )}
              </span>
            )}
            <span className="flex items-center space-x-3">
              {node.type === "folder" ? (
                isExpanded ? (
                  <LuFolderOpen
                    size={24}
                    onClick={() => toggleExpand(node.id)}
                    className=" cursor-pointer"
                  />
                ) : (
                  <LuFolder
                    size={24}
                    onClick={() => toggleExpand(node.id)}
                    className=" cursor-pointer"
                  />
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

          <div
            className="text-sm text-gray-600 truncate w-40"
            title={node.description}
          >
            {node.description}
          </div>

          <div className="text-sm text-gray-600">
            {format(new Date(node.createdAt), "dd-MM-yyyy HH:mm")}
          </div>

          <div className="text-sm text-gray-600">
            {format(new Date(node.updatedAt), "dd-MM-yyyy HH:mm")}
          </div>

          {node.type === "folder" && (
            <div className="text-right">
              <MenuPopover isFromMiddleSection folder={node} />
            </div>
          )}
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

export default RightCollapsibleTable;
