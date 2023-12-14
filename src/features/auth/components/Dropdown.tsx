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
        <div className="-mt-0.5 relative pl-[19px] pr-[24px] text-2xl text-primary bg-white font-normal w-[430px] h-[211px] rounded-[7px] border-2 border-mint flex flex-col justify-center">
            <div className="py-[19px] mt-[6px] ml-[14px]" onClick={() => handleSelect("reader")}>Reader</div>
            <hr className="text-left solid border-primary"></hr>
            <div className="py-[19px] ml-[14px]" onClick={() => handleSelect("author")}>Author</div>
            <hr className="text-left solid border-primary"></hr>
            <div className="py-[19px] mb-[8px] ml-[14px]" onClick={() => handleSelect("admin")}>Admin</div>
        </div>
    </div>
  );
};

export default Dropdown;
