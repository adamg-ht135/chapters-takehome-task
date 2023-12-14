import { Layout } from '../components/Layout';
import eye from '../../../assets/eye.svg';
import eyeclosed from '../../../assets/eye-closed.svg';
import chevronleft from '../../../assets/chevron-left.svg';
import { Link } from 'react-router-dom';
import splash from '../../../assets/girl-with-books.png';
import { useState } from 'react';

export const Login = () => {
  const [eyes,setEyes] = useState(0);
  const [password, setPassword] = useState('');

  const handleEyes = () => {
    setEyes(eyes === 0 ? 1 : 0);
  }

  const handlePassInput = (password : string) =>{
    setPassword(password);
  }
  return (
    <Layout title={''}>
      <div className="w-screen h-screen flex flex-col justify-center">
          <div className="flex text-primary text-2xl font-semibold items-center">
            <img className="mr-[10px] w-[8px] h-[13px]" src={chevronleft}></img>
            Back
          </div>
          <img className="absolute object-left-bottom -ml-5 h-screen " src={splash} />
          <div className="relative w-[95%] max-w-[810px] h-[717px] mx-auto flex flex-col px-3 rounded-lg bg-white self-center">
            <div>
              <h2 className="pb-4 mb-[44px] mt-[63px] text-center text-4xl md:text-5xl lg:text-6xl font-bold text-primary">Welcome Back</h2>
            </div>
            <hr className="solid border-primary"></hr>
            <div className="m-auto max-w-[613px] w-full h-full flex flex-col ">
                <label className="mt-[58px] mb-4 text-2xl text-primary font-semibold">Email</label>
                <input type="text" className="pl-[26px] text-2xl text-primary font-normal w-full h-[86px] self-center rounded-[7px] border-2 border-mint"></input>
                <label className="mt-5 mb-4 text-2xl text-primary font-semibold">Password</label>
                <div className="relative w-full h-[86px]">
                  <input className="pl-[26px] text-2xl text-primary font-normal absolute w-full h-[86px] self-center rounded-[7px]  border-2 border-mint" type={eyes === 0 ? "password" : "text"} value={password} onChange={(e) => handlePassInput(e.target.value)} ></input>
                  <button className="relative float-right my-8 mr-6 w-8 h-6 border-none z-5" onClick={handleEyes}>
                    <img src={eyes === 0 ? eye : eyeclosed}></img>
                  </button>
                </div>
                <button className="ml-auto mt-11 bg-primary rounded-md text-2xl text-white w-[191px] h-[70px]">
                  Login
                </button>
              </div>
            </div>
      </div>
    </Layout>
  );
};
