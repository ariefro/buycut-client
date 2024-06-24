import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-24">
      <div className="flex items-center justify-center rounded-full w-14 h-14 bg-gradient-to-tr from-[#B7B597] to-[#DAD3BE] animate-spin">
        <div className="h-12 w-12 rounded-full bg-primary"></div>
      </div>
    </div>
  );
};

export default Loading;
