import React from "react";

function Header() {
  return (
    <div className="w-full h-16 mb-5 bg-zinc-950 rounded-b-lg shadow-lg py-5">
      <div className="flex justify-between items-center h-full px-5">
        <div className="flex items-center">
          <img
            src="/images/logo.png"
            alt="Flock Logo"
            className="h-10 w-10 rounded-full"
            width={10}
            height={10}
          />
          <h1 className="text-white text-2xl font-bold ml-3">Flockly</h1>
        </div>
        <div className="flex items-center">
          <button className="h-10 w-10 text-sm font-bold px-4 py-2 rounded-full bg-FlockBlue"></button>
        </div>
      </div>
    </div>
  );
}

export default Header;
