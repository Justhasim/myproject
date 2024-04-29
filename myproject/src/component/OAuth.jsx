import React from "react";
import "boxicons";

export default function OAuth() {
  return (
    <button className="bg-gray-800 p-3 rounded-lg uppercase text-opacity-80 hover:opacity-90 border-blue-600 border-2 border-x-4 disabled:opacity-80 flex items-center justify-center shadow-lg shadow-blue-500/30">
      <box-icon
        name="google"
        type="logo"
        color="#ffffff"
        className="flex items-center"
      />
      continue with google
    </button>
  );
}
