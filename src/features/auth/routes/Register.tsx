import { Layout } from '../components/Layout';
import chevronleft from '../../../assets/chevron-left.svg';
import splash from '../../../assets/woman-reading-book.png';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Dropdown from '../components/Dropdown';
import PasswordBox from '../components/PasswordBox';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler, FormProvider} from 'react-hook-form';
import { registerSchema } from '@/features/schemas/registerschemas';
import ellipse from '../../../assets/ellipse.svg';
import ellipseTick from '../../../assets/ellipse-tick.svg';
import { toast } from 'react-toastify'
import CloseButton from '@/components/Form/CloseButton';
import '../../stylesheets/toasts.css'

type FormData = {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  role: string;
  password: string;
  confirm_password: string;
  marketing_consent: boolean;
}
export const Register = () => {
  var registerStep = 2
  const {register , handleSubmit, formState:{ errors }, watch} = useForm<FormData>({
    resolver: zodResolver(registerSchema),
    defaultValues:{
      password: '',
      confirm_password: ''
    }
  });

  const hasUppercase = (password: string) => {
    return /[A-Z]/.test(password);
  };
  const hasLowercase = (password: string) => {
    return /[a-z]/.test(password);
  };
  const hasNumber = (password: string) => {
    return /[0-9]/.test(password);
  };
  const hasSpecial = (password: string) => {
    return /[^\w\s]/.test(password);
  };

  const validatePass = () => {
    var pass = watch("password");
    if (hasUppercase(pass) && hasLowercase(pass) && hasNumber(pass) && hasSpecial(pass)){
      if (pass === watch("confirm_password")){
        registerStep = 0;
      } else {
        toast(<div className="absolute top-[29px] left-[39px] font-toast font-medium text-white text-[24px]">Passwords do not match
        <p className="mt-[8px] font-toast font-normal text-white text-[20px] leading-tight">Make sure your passwords are <br></br> the same.</p>
        </div>,{
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: CloseButton,
        position: toast.POSITION.BOTTOM_RIGHT,
        className:"auth-error"
        })
      }
    } else {
        toast(<div className="absolute top-[29px] left-[39px] font-toast font-medium text-white text-[24px] leading-tight">Password does not meet requirements
        <p className="mt-[8px] font-toast font-normal text-white text-[20px]">Please try again.</p>
        </div>,{
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: CloseButton,
        position: toast.POSITION.BOTTOM_RIGHT,
        className:"auth-error"
        })
    }
  };
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
              <div className="m-auto max-w-[613px] w-full">
                <div className="w-full">
                    <label className="block mb-[11px] text-2xl text-primary font-semibold">
                      Password
                    </label>
                    <PasswordBox resolver={{...register('password')}}></PasswordBox>
                    <label className="block mt-[21px] mb-[11px] text-2xl text-primary font-semibold">
                      Confirm Password
                    </label>
                    <PasswordBox resolver={{...register('confirm_password')}}></PasswordBox>
                    <div className="w-[120%] mt-[28px] font-semibold text-sm text-primary leading-normal">
                      Password requirements:
                      <div className="flex text-sm text-primary font-medium leading-normal gap-[17.72px]">
                        <div className="flex items-center"><img className="w-[17px] h-[17px] mr-[7.86px]" src={hasUppercase(watch("password")) ? ellipseTick : ellipse}></img>1 capital letter</div>
                        <div className="flex items-center"><img className="w-[17px] h-[17px] mr-[7.86px]" src={hasLowercase(watch("password")) ? ellipseTick : ellipse}></img>1 lowercase letter</div>
                        <div className="flex items-center"><img className="w-[17px] h-[17px] mr-[7.86px]" src={hasNumber(watch("password")) ? ellipseTick : ellipse}></img>1 number</div>
                        <div className="flex items-center"><img className="w-[17px] h-[17px] mr-[7.86px]" src={hasSpecial(watch("password")) ? ellipseTick : ellipse}></img>1 special character. (e.g. _!*/)</div>
                      </div>
                    </div>
                  <button 
                  type="button"
                  onClick={validatePass}
                  disabled={!(watch("password").length > 0 && watch("confirm_password").length > 0 )} 
                  className="float-right mt-[52px] bg-primary rounded-md font-semibold text-2xl text-white w-[161.6px] h-[74.4px] disabled:bg-zinc-400">
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
          </form>
      </div>
    </Layout>
  );
};
