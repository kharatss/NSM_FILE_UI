import { faCaretRight,faFile, faFolderClosed, faFolderOpen, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import MenuPopover from "./MenuPopover";


interface TransformedFolder {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  children: any[]; // Children can be folders or files
  type: 'file' | 'folder'
}
interface FolderTreeProps {
  data: TransformedFolder[];
}

const LeftFolderTree: React.FC<FolderTreeProps> = ({ data }) => {
  return (
    <div className="space-y-2 px-3">
      {data.map((node, index) => (
        <div className="rounded-lg bg-white border border-grey-300" key={index}>
          <TreeNodeComponent key={index} node={node}/>
        </div>
      ))}
    </div>
  );
};

interface TreeNodeComponentProps {
  node: any;
}

const TreeNodeComponent: React.FC<TreeNodeComponentProps> = ({ node}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [folderId, setFolderId] = useState<undefined | string>();
  useEffect(() => {

  }, [folderId, isExpanded])

  const toggleExpand = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const nodeId = event.currentTarget.dataset.id;

    if (node.type === "folder") {
      setIsExpanded(!isExpanded);
      setFolderId(nodeId);
    }
  };
 
console.log('node',node);
  return (
    <div >
      <div
        className={`flex items-center cursor-pointer p-3 rounded-lg transition-colors ${node.type === "folder" ? "hover:bg-gray-100" : "hover:bg-gray-50"
          }`}
        key={node.id}
      >
        {node.type === "folder" && (
          <span className="mr-3">
            {(isExpanded) ? (
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faCaretRight} className="text-blue-500" onClick={toggleExpand} />
                <FontAwesomeIcon icon={faFolderOpen} className="text-blue-500" onClick={toggleExpand} />
              </div>
            ) : (
              <FontAwesomeIcon icon={faFolderClosed} className="text-blue-500" onClick={toggleExpand} />
            )}
          </span>
        )}
        {node.type === undefined && (
          <span className="mr-3">
            <FontAwesomeIcon icon={faFile} className="text-blue-500" />
          </span>
        )}
        <span className={`flex-grow ${node.type === "folder" ? "font-semibold" : "text-gray-700"}`}>
          {node.name}
        </span>
        
        {node.type === "folder" && (
          <div className="ml-4">
            <FontAwesomeIcon
              icon={faPlusCircle}
              className="text-blue-500"
              data-id={node.id}
              onClick={toggleExpand}
            />
          </div>
        )}
        
      </div>


      {(isExpanded) && node.children && (
        <div className="pl-6 mt-2 border-l-2 border-gray-200">
          <LeftFolderTree data={node.children}/>
        </div>
      )}
    </div>
  );
};







export default LeftFolderTree;