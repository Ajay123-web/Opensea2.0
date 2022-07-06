import React from "react";

function EmptyBox({ message }) {
  return (
    <div className="w-full h-[250px] flex rounded-lg mx-[30px] justify-center items-center border-[1px] border-gray-300">
      <div className="text-3xl text-gray-500 font-semibold">
        No items to display
      </div>
    </div>
  );
}

export default EmptyBox;
