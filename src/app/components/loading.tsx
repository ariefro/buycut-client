import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen absolute top-0 left-0">
      <div className="flex items-center justify-center rounded-full w-14 h-14 bg-gradient-to-tr from-[#B7B597] to-white animate-spin">
        <div className="h-12 w-12 rounded-full bg-white"></div>
      </div>
    </div>
  );
};

export default Loading;
