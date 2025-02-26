"use client";
import { useFetchFolder } from "./query";
import MenuPopover from "./components/MenuPopover";
import FilterModal from "./components/FilterModel";
import LeftCollapsibleTable from "./components/LeftCollapsibleTable";
import { LuFile, LuFolder } from "react-icons/lu";
import RightCollapsibleTable from "./components/RightCollapsibleTable";
import { useMemo, useState } from "react";
import { mapFoldersData } from "./mapper";

export default function FolderWrapper() {
  const [expandedNodes, setExpandedNodes] = useState<Set<number>>(new Set());

  const toggleExpand = (id: number) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const { data, isLoading } = useFetchFolder();
  console.log("data", data);
  const mappedData = useMemo(() => {
    if (!isLoading && data) {
      return mapFoldersData(data.folders);
    }
    return [];
  }, [data, isLoading]);

  return (
    <div className="grid grid-cols-12 w-full h-screen bg-gray-100">
      {/* Left Section */}
      <div className="bg-gray-100 p-3 shadow-lg sm:col-span-5 md:col-span-3 xl:col-span-3 pt-5">
        <div className="flex flex-row">
          <div className="flex flex-col items-center w-1/2">
            <LuFolder size={24} />
            <p className="mt-2 text-sm">Folders</p>
            <p className="mb-2 text-sm font-bold">
              {!isLoading && data?.total}
            </p>
          </div>

          <div className="flex flex-col items-center w-1/2">
            <LuFile size={24} />
            <p className="mt-2 text-sm">Documents</p>
            <p className="mb-2 text-sm font-bold">1</p>
          </div>
        </div>

        {!isLoading && (
          <LeftCollapsibleTable
            data={mappedData}
            expandedNodes={expandedNodes}
            toggleExpand={toggleExpand}
          />
        )}
      </div>

      {/* Right Section */}
      <div className="bg-gray-50 sm:col-span-7 md:col-span-9 xl:col-span-9">
        <div className="flex justify-end items-center bg-white p-4 shadow-md h-12 mb-4">
          <div className="space-x-5 flex items-center justify-center">
            <FilterModal />
            <MenuPopover />
          </div>
        </div>
        {!isLoading && (
          <RightCollapsibleTable
            data={mappedData}
            expandedNodes={expandedNodes}
            toggleExpand={toggleExpand}
          />
        )}
      </div>
    </div>
  );
}
