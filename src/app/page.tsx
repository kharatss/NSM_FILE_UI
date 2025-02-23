"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FolderTree from "./components/FolderTree";
import { useFetchFolder } from "./query";
import { faFile, faFolder, } from "@fortawesome/free-solid-svg-icons";
import MenuPopover from "./components/MenuPopover";
import LeftFolderTree from "./components/LeftFolderTree";
import FilterModal from "./components/FilterModel";


export default function Home() {

  const { data, isLoading } = useFetchFolder()

  return (
    <div className="grid grid-cols-12 w-full h-screen bg-gray-100">
      {/* Left Section */}
      <div className="bg-gray-100 p-3 shadow-lg sm:col-span-5 md:col-span-3 xl:col-span-3">
        <div className="flex flex-row">
          <div className="flex flex-col items-center w-1/2">
            <FontAwesomeIcon icon={faFolder} size="2x" />
            <p className="mt-2 text-sm">Folders</p>
            <p className="mb-2 text-sm font-bold">200+</p>
          </div>

          <div className="flex flex-col items-center w-1/2">
            <FontAwesomeIcon icon={faFile} size="2x" />
            <p className="mt-2 text-sm">Documents</p>
            <p className="mb-2 text-sm font-bold">200+</p>
          </div>
        </div>

        {!isLoading && <LeftFolderTree data={data?.folders} />}
      </div>


      {/* Right Section */}
      <div className="bg-gray-50 sm:col-span-7 md:col-span-9 xl:col-span-9">
        <div className="flex justify-end items-center bg-white p-4 shadow-md h-12 mb-4">
          <div className="space-x-5 flex items-center justify-center">
            <FilterModal/>
            <MenuPopover />
          </div>
        </div>

        <div className="flex w-full mb-3">
          <div className="w-[40%] font-semibold pl-10">Name</div>
          <div className="w-[30%] font-semibold pl-10">Description</div>
          <div className="w-[15%] font-semibold pr-10">Created At</div>
          <div className="w-[15%] font-semibold">Updated At</div>
        </div>

        {!isLoading && <FolderTree data={data?.folders} rightSection />}
      </div>
    </div>

  );
}
