import { useState } from 'react';
import eye from '../../../assets/eye.svg';
import eyeclosed from '../../../assets/eye-closed.svg';

const PasswordBox = ({ resolver } : { resolver: any }) => {
    const [eyes,setEyes] = useState(true);
    const handleEyes = () => {
        setEyes(!eyes);
    }
    return(
        <div className="relative h-[86px]">
            <input 
            className="pl-[26px] text-2xl text-primary font-normal absolute w-full h-[86px] rounded-[7px]  border-2 border-mint" 
            type={eyes ? "password" : "text"} 
            {...resolver}>
            </input>
            <button type="button" className="relative float-right my-8 mr-6 w-8 h-6 border-none z-5" onClick={handleEyes}>
            <img src={eyes ? eye : eyeclosed}></img>
            </button>
        </div>
    )
}

export default PasswordBox;