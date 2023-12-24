import { useState, useEffect, useRef } from 'react';
import chevrondown from '../../../assets/chevron-down.svg';
import tick from '../../../assets/tick.svg';

const Dropdown = ({dropdownOption, setDropdown}:{dropdownOption: string, setDropdown: any}) => {

  const [isElementVisible, setElementVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  },[isElementVisible])

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    // Check if the clicked element is outside the element
    if (elementRef.current && !elementRef.current.contains(event.target as Node)) {
      setElementVisible(false);
    }
  };

  const toggleElement = () => {
    setElementVisible(!isElementVisible);
  };

  return (
    <div className="max-w-[431px]"ref={elementRef}>
        <button type="button" onClick={toggleElement} className="text-left pl-[33px] text-2xl text-primary font-normal w-[430px] h-[86px] rounded-[7px] border-2 border-mint flex items-center">
          {dropdownOption === "" ? <div className="flex-grow text-mint">Select</div>:<div className="flex-grow text-primary">{dropdownOption}</div>}
          <img className="h-[10.15px] w-[16.5px] mr-[24.5px]" src={chevrondown}></img>      
        </button>
        {isElementVisible &&
        <div className="-mt-0.5 relative pl-[19px] pr-[24px] text-2xl text-primary bg-white font-normal w-[430px] h-[211px] rounded-[7px] border-2 border-mint flex flex-col justify-center">
            <div className={dropdownOption === "Reader" ? "font-semibold py-[19px] mt-[6px] pl-[14px] hover:bg-gray-300 flex items-center" : "py-[19px] mt-[6px] pl-[14px] hover:bg-gray-300 flex items-center"} onClick={() => setDropdown("Reader")}>
              <div className="flex-grow">Reader</div>
              {dropdownOption === "Reader" && <img className="h-[22px] w-[22px] mr-[11px] float-right" src={tick}></img>}
            </div>
            <hr className="text-left solid border-primary"></hr>
            <div className={dropdownOption === "Author" ? "font-semibold py-[19px] pl-[14px] hover:bg-gray-300 flex items-center" : "py-[19px] pl-[14px] hover:bg-gray-300 flex items-center"} onClick={() => setDropdown("Author")}>
              <div className="flex-grow">Author</div>
              {dropdownOption === "Author" && <img className="h-[22px] w-[22px] mr-[11px] float-right" src={tick}></img>}
            </div>
            <hr className="text-left solid border-primary"></hr>
            <div className={dropdownOption === "Admin" ? "font-semibold py-[19px] mb-[8px] pl-[14px] hover:bg-gray-300 flex items-center" : "py-[19px] mb-[8px] pl-[14px] hover:bg-gray-300 flex items-center"} onClick={() => setDropdown("Admin")}>
            <div className="flex-grow">Admin</div>
              {dropdownOption === "Admin" && <img className="h-[22px] w-[22px] mr-[11px] float-right" src={tick}></img>}
            </div>
        </div>
        }
    </div>
  );
};

export default Dropdown;
