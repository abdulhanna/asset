import React from "react";
import { Nodata } from "../atoms/icons";
const NodataPage = ({ className, text }) => {
  return (
    <>
      <div className="border rounded-md flex items-center justify-center h-screen bg-[#F7F7F7] overflow-hidden mt-4">
        <div className="text-center">
          <Nodata className={"flex justify-center"} />
          <div className="mt-3">
            <span className="text-gray-600"> {text}</span>

            {/* <span className='text-blue-600 underline underline-offset-4'>Know how?</span> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default NodataPage;
