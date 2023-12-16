import { Layout } from '../components/Layout';
import chevronleft from '../../../assets/chevron-left.svg';
import splash from '../../../assets/woman-reading-book.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Dropdown from '../components/Dropdown';
import PasswordBox from '../components/PasswordBox';

export const Register = () => {
  const registerStep = 2

  return (
    <Layout title="Register your account">
      <div className="absolute left-[117px] top-[123px] flex text-primary text-2xl font-semibold items-center">
            <img className="mt-[2px] mr-[10px] w-[8px] h-[13px]" src={chevronleft}></img>
            Back
      </div>
      <div className="absolute right-[107px] top-[100px] text-primary text-5xl font-normal font-serif">
            Chapters
      </div>
      <div className="w-screen h-screen flex flex-col justify-center">
          <img className="absolute right-0 bottom-0 h-screen" src={splash} />
          <form>
          {registerStep === 0 && (
              <div className="relative w-[95vw] h-[75vh] max-w-[861px] max-h-[633px] mx-auto flex flex-col px-3 rounded-lg bg-white self-center">
              <div>
                <h2 className="pb-4 mb-[44px] mt-[63px] text-center text-4xl md:text-5xl lg:text-6xl font-bold text-primary">Let's sign you up</h2>
              </div>
              <hr className="solid border-primary"></hr>
              <div className="m-auto max-w-[613px] w-full flex flex-col">
                  <label className="mb-[11px] text-2xl text-primary font-semibold">
                    Email
                  </label>
                  <input type="text" className="pl-[26px] text-2xl text-primary font-normal w-full h-[86px] self-center rounded-[7px] border-2 border-mint"></input>
                  <div className="mt-7 text-xl text-primary font-normal">Already have an account? <Link className="font-semibold" to="/auth/login">Log in.</Link></div>
                  <button className="ml-auto mt-11 bg-primary rounded-md text-2xl text-white w-[161.6px] h-[74.4px]" disabled>
                    Next
                  </button>
              </div>
            </div>
          )}
          {registerStep === 1 && (
              <div className="relative w-[95vw] h-[75vh] max-w-[1088px] max-h-[678px] mx-auto flex flex-col px-3 rounded-lg bg-white self-center">
              <div>
                <h2 className="pb-4 mb-[44px] mt-[63px] text-center text-4xl md:text-5xl lg:text-6xl font-bold text-primary">Tell us about you</h2>
              </div>
              <hr className="solid border-primary"></hr>
              <div className="mt-[52px] mx-auto max-w-[887px] w-full flex flex-col">
                  <div className="w-full flex">
                    <div className="w-[430px] mr-[27px] flex flex-col">
                      <label className="mb-[11px] text-2xl text-primary font-semibold">
                        First Name
                      </label>
                      <input type="text" className="pl-[26px] text-2xl text-primary font-normal w-full h-[86px] self-center rounded-[7px] border-2 border-mint"></input>
                    </div>
                    <div className="w-[430px] flex flex-col">
                      <label className="mb-[11px] text-2xl text-primary font-semibold">
                        Last Name
                      </label>
                      <input type="text" className="pl-[26px] text-2xl text-primary font-normal w-full h-[86px] self-center rounded-[7px] border-2 border-mint"></input>
                    </div>
                  </div>
                  <label className="mt-[27px] mb-[11px] text-2xl text-primary font-semibold">
                        Account type
                  </label>
                  <Dropdown/>
                  <button className="absolute right-[105.23px] bottom-[76.89px] mt-11 bg-primary rounded-md text-2xl text-white w-[161.6px] h-[74.4px]">
                    Next
                  </button>
              </div>
            </div>
          )}
          {registerStep === 2 && (
              <div className="relative w-[95vw] h-[75vh] max-w-[810px] max-h-[809px] mx-auto flex flex-col px-3 rounded-lg bg-white self-center">
              <div>
                <h2 className="pb-4 mb-[44px] mt-[63px] text-center text-4xl md:text-5xl lg:text-6xl font-bold text-primary">Set your password</h2>
              </div>
              <hr className="solid border-primary"></hr>
              <div className="m-auto max-w-[613px] w-full flex flex-col">
                  <div className="relative w-full h-[86px]">
                    <PasswordBox></PasswordBox>
                  </div>
                  <button className="ml-auto mt-11 bg-primary rounded-md text-2xl text-white w-[161.6px] h-[74.4px]" disabled>
                    Next
                  </button>
              </div>
            </div>
          )}
          </form>
      </div>
    </Layout>
  );
};
