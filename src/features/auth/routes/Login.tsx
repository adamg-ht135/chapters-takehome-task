import { Layout } from '../components/Layout';
import eye from '../../../assets/eye.svg';
import { Link } from 'react-router-dom';
import splash from '../../../assets/girl-with-books.png';

export const Login = () => {
  return (
    <Layout title={''}>
      <div className="flex flex-col">
        <img className="absolute object-left-bottom -ml-5 h-screen" src={splash} />
        <div className="relative object-center min-h-screen min-w-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="w-[95%] max-w-[810px] h-[717px] mx-auto flex flex-col px-3 rounded-lg bg-white self-center">
            <div>
              <h2 className="pb-4 mb-11 mt-16 text-center text-4xl md:text-5xl lg:text-6xl font-bold text-primary">Welcome Back</h2>
            </div>
            <hr className="solid border-primary"></hr>
            <div className="w-full h-auto">
              <div className="m-auto max-w-[613px] w-full flex-grow">
                <label className="mb-4 text-2xl text-primary font-semibold">Email</label>
                <input type="text" className="pl-[26px] text-2xl text-primary font-normal w-full h-[86px] border-2 border-netural-400 self-center rounded-lg"></input>
                <label className="mt-5 mb-4 text-2xl text-primary font-semibold">Password</label>
                <div className="relative w-full h-[86px]">
                  <input className="pl-[26px] text-2xl text-primary font-normal absolute w-full h-[86px] border-2 border-netural-400 self-center rounded-lg" type="text" ></input>
                  <img className="relative float-right my-8 mr-6 border-none w-8 h-6 z-5" src={eye}></img>
                </div>
                <button className="mt-11 bg-primary rounded-md text-2xl text-white w-[191px] h-[70px]">
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
