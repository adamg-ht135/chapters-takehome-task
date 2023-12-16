import { useState } from 'react';
import chevrondown from '../../../assets/chevron-down.svg';
import tick from '../../../assets/tick.svg';

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
            <div className={option === "reader" ? "font-semibold py-[19px] mt-[6px] pl-[14px] hover:bg-gray-300 flex items-center" : "py-[19px] mt-[6px] pl-[14px] hover:bg-gray-300 flex items-center"} onClick={() => handleSelect("reader")}>
              <div className="flex-grow">Reader</div>
              {option === "reader" && <img className="h-[22px] w-[22px] mr-[11px] float-right" src={tick}></img>}
            </div>
            <hr className="text-left solid border-primary"></hr>
            <div className={option === "author" ? "font-semibold py-[19px] pl-[14px] hover:bg-gray-300 flex items-center" : "py-[19px] pl-[14px] hover:bg-gray-300 flex items-center"} onClick={() => handleSelect("author")}>
              <div className="flex-grow">Author</div>
              {option === "author" && <img className="h-[22px] w-[22px] mr-[11px] float-right" src={tick}></img>}
            </div>
            <hr className="text-left solid border-primary"></hr>
            <div className={option === "admin" ? "font-semibold py-[19px] mb-[8px] pl-[14px] hover:bg-gray-300 flex items-center" : "py-[19px] mb-[8px] pl-[14px] hover:bg-gray-300 flex items-center"} onClick={() => handleSelect("admin")}>
            <div className="flex-grow">Admin</div>
              {option === "admin" && <img className="h-[22px] w-[22px] mr-[11px] float-right" src={tick}></img>}
            </div>
        </div>
    </div>
  );
};

export default Dropdown;
