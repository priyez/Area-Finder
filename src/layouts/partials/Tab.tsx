import React from "react";

interface TabProps {
  setSelectedOption: (option: string) => void;
}

const Tab: React.FC<TabProps> = ({
  setSelectedOption,
}) => {


  return (
   
      <div className="home-header pt-0 relative w-full z-40 py-3 px-0 overflow-hidden xl:px-12 top-0">
        <nav className="navbar container overflow-x-auto no-scrollbar text-[12px] scrollB">
          <ul className="flex w-full gap-2 md:gap-1 justify-between">
          <li className="inline-block ">
                <button className="w-full py-1 whitespace-nowrap px-2 bg-white border-solid border-x-zinc-950 rounded-sm" onClick={() => setSelectedOption("schools")}>School</button>
              </li>
              <li className="inline-block">
                <button className="w-full py-1 whitespace-nowrap px-2 bg-white border-solid border-x-zinc-950 rounded-sm" onClick={() => setSelectedOption("hospital")}>Hospital</button>
              </li>
              <li className="inline-block">
                <button className="w-full py-1 whitespace-nowrap px-2 bg-white border-solid border-x-zinc-950 rounded-sm" onClick={() => setSelectedOption("resortPark")}> Resort Park</button>
              </li>


              <li className="inline-block ">
                <button className="w-full py-1 px-2 bg-white whitespace-nowrap border-solid border-x-zinc-950 rounded-sm" onClick={() => setSelectedOption("shoppingMall")}>Shopping Mall</button>
              </li>
              <li className="inline-block">
                <button className="w-full py-1 whitespace-nowrap px-2 bg-white border-solid border-x-zinc-950 rounded-sm" onClick={() => setSelectedOption("demographics")}>Demographics</button>
              </li>
              <li className="inline-block">
                <button
                  className="w-full py-1 px-2 whitespace-nowrap bg-white border-solid border-x-zinc-950 rounded-sm" onClick={() => setSelectedOption("airports")}>Airports</button>
              </li>

              <li className="inline-block ">
                <button className="w-full whitespace-nowrap py-1 px-2 bg-white border-solid border-x-zinc-950 rounded-sm" onClick={() => setSelectedOption("trainStations")}>Train Stations</button>
              </li>
              <li className="inline-block">
                <button className="w-full whitespace-nowrap py-1 px-2 bg-white border-solid border-x-zinc-950 rounded-sm" onClick={() => setSelectedOption("nightLife")}>Night Life</button>
              </li>
              <li className="inline-block">
                <button className="w-full whitespace-nowrap py-1 px-2 bg-white border-solid border-x-zinc-950 rounded-sm" onClick={() => setSelectedOption("parkingLot")}>Parking Lots</button>
              </li>

              <li className="inline-block ">
                <button className="w-full whitespace-nowrap py-1 px-2 bg-white border-solid border-x-zinc-950 rounded-sm" onClick={() => setSelectedOption("security")}>Security</button>
              </li>
              <li className="inline-block">
                <button className="w-full whitespace-nowrap py-1 px-2 bg-white border-solid border-x-zinc-950 rounded-sm" onClick={() => setSelectedOption("publicTP")}>Public Transport</button>
              </li>
              <li className="inline-block">
                <button className="w-full whitespace-nowrap py-1 px-2 bg-white border-solid border-x-zinc-950 rounded-sm" onClick={() => setSelectedOption("adultHome")}>Adult Home</button>
              </li>

            </ul>
        </nav>
      </div>
  
  );
};

export default Tab;
