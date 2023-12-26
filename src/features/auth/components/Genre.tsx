import { useState, useEffect, useRef } from 'react';
import tick from '../../../assets/tick.svg';

const Genre = ({dropdownOption, setDropdown}:{dropdownOption: string, setDropdown: any}) => {

  const genres = ['Non-Fiction','Thriller','Mystery','Crime']
  const mappedList = genres.slice(0, -1);
  const lastGenre = genres[genres.length - 1];

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
    if (elementRef.current && !elementRef.current.contains(event.target as Node)) {
      setElementVisible(false);
    }
  };

  const toggleElement = () => {
    setElementVisible(!isElementVisible);
  };

  return (
    <div className="max-w-[405px] absolute" ref={elementRef}>
        <button type="button" onClick={toggleElement} className="text-left pl-[33px] text-xl text-primary font-normal w-[405px] h-[73px] rounded-md border-2 border-primary flex items-center">
          {dropdownOption === "" ? <div className="flex-grow text-[#90b3d8]">Select</div>:<div className="flex-grow text-primary font-semibold">{dropdownOption}</div>}
          <div className="h-[9px] w-[15px] mr-[28px]">
            {isElementVisible ? 
                    <svg width="15" height="9" viewBox="0 0 17 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.36319 0.388282C0.595811 0.139665 0.911271 0 1.2402 0C1.56912 0 1.88458 0.139665 2.1172 0.388282L8.25749 6.95278L14.3978 0.388282C14.6317 0.146711 14.9451 0.0130411 15.2703 0.0160626C15.5956 0.0190842 15.9067 0.158555 16.1367 0.404436C16.3667 0.650317 16.4971 0.982935 16.5 1.33065C16.5028 1.67836 16.3777 2.01336 16.1518 2.26347L9.13449 9.76556C8.90187 10.0142 8.58641 10.1538 8.25749 10.1538C7.92856 10.1538 7.6131 10.0142 7.38048 9.76556L0.36319 2.26347C0.13064 2.01478 0 1.67753 0 1.32588C0 0.974227 0.13064 0.636974 0.36319 0.388282Z" fill="#2F608D"/>
                    </svg> :
                    <svg width="15" height="9" viewBox="0 0 17 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.1368 9.76553C15.9042 10.0141 15.5887 10.1538 15.2598 10.1538C14.9309 10.1538 14.6154 10.0141 14.3828 9.76553L8.24251 3.20103L2.10223 9.76553C1.86827 10.0071 1.55493 10.1408 1.22968 10.1377C0.904438 10.1347 0.593314 9.99525 0.363323 9.74937C0.133331 9.50349 0.00287446 9.17087 4.78e-05 8.82316C-0.00277886 8.47544 0.122254 8.14045 0.348213 7.89033L7.36551 0.388245C7.59813 0.139628 7.91359 -3.79439e-05 8.24251 -3.79152e-05C8.57144 -3.78864e-05 8.8869 0.139628 9.11952 0.388245L16.1368 7.89034C16.3694 8.13903 16.5 8.47628 16.5 8.82793C16.5 9.17958 16.3694 9.51683 16.1368 9.76553Z" fill="#2F608D"/>
                    </svg>                    
            }
        </div>
        </button>
        {isElementVisible &&
        <div className="-mt-0.5 relative px-[7px] text-xl text-primary bg-white font-normal w-[405px] h-[246px] rounded-md border-2 border-primary flex flex-col overflow-auto">
            {mappedList.map((genre) => 
                <div key={genre}>
                    <div className="py-[16px] pl-[14px] hover:bg-gray-300 flex items-center" onClick={() => setDropdown(genre)}>
                        <div className="flex-grow">{genre}</div>
                        {dropdownOption === genre && <img className="h-[22px] w-[22px] mr-[19px] float-right" src={tick}></img>}
                    </div>
                    <hr className="text-left solid border-slate-200"></hr>
                </div>
            )}
            <div className="py-[16px] pl-[14px] hover:bg-gray-300 flex items-center" onClick={() => setDropdown(lastGenre)}>
                <div className="flex-grow">{lastGenre}</div>
                {dropdownOption === lastGenre && <img className="h-[22px] w-[22px] mr-[19px] float-right" src={tick}></img>}
            </div>
        </div>
        }
    </div>
  );
};

export default Genre;
