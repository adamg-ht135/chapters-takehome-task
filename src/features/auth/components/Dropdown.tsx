import { useState } from 'react';
import chevrondown from '../../../assets/chevron-down.svg';

const Dropdown = () => {
  const [option, setOption] = useState('');

  // Event handler for option selection
  const handleSelect = (role: string) => {
    setOption(role);
  };

  return (
    <div>
        <div className="text-left pl-[33px] text-2xl text-primary font-normal w-[430px] h-[86px] rounded-[7px] border-2 border-mint flex items-center">
          {option === "" && <div className="flex-grow text-mint">Select</div>}
          {option === "reader" && <div className="flex-grow">Reader</div>}
          {option === "author" && <div className="flex-grow">Author</div>}
          {option === "admin" && <div className="flex-grow">Admin</div>}
          <img className="h-[10.15px] w-[16.5px] mr-[24.5px]" src={chevrondown}></img>      
        </div>
        <div className="-mt-0.5 relative pl-[19px] pr-[24px] text-2xl text-primary bg-white font-normal w-[430px] h-[211px] rounded-[7px] border-2 border-mint flex flex-col">
            <div className={option === 'reader' ? "font-semibold py-[18px] mt-[2px] pl-[14px] hover:bg-gray-300" : "py-[18px] mt-[2px] pl-[14px] hover:bg-gray-300" } onClick={() => handleSelect("reader")}>Reader</div>
            <hr className="text-left solid border-primary"></hr>
            <div className="py-[17px] pl-[14px] hover:bg-gray-300" onClick={() => handleSelect("author")}>Author</div>
            <hr className="text-left solid border-primary hover:bg-gray-300"></hr>
            <div className="py-[18px] mb-[2px] pl-[14px] hover:bg-gray-300" onClick={() => handleSelect("admin")}>Admin</div>
        </div>
    </div>
  );
};

export default Dropdown;
