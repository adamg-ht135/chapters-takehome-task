import { Layout } from '../components/Layout';
import chevronleft from '../../../assets/chevron-left.svg';
import splash from '../../../assets/woman-reading-book.png';
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import Dropdown from '../components/Dropdown';
import PasswordBox from '../components/PasswordBox';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler, FormProvider} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { registerSchema } from '@/features/schemas/registerschemas';
import ellipse from '../../../assets/ellipse.svg';
import ellipseTick from '../../../assets/ellipse-tick.svg';
import checkbox from '../../../assets/checkbox.svg';
import checkboxTick from '../../../assets/checkbox-ticked.svg';
import ApiClient from '@/api';
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
  const registerForm = useRef<HTMLFormElement>(null);

  const [registerStep, setRegisterStep] = useState(0);
  const [privPolicy, setPrivPolicy] = useState(false);
  const [tnc, setTnc] = useState(false);
  const [marketConsent, setMC] = useState(false);
  const [option, setOption] = useState('');
  const navigate = useNavigate();

  const {register , 
         handleSubmit, 
         formState:{ errors }, 
         setValue,
         watch,
         trigger
        } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
    defaultValues:{
      email: '',
      first_name: '',
      last_name: '',
      username: '',
      role: 'Reader',
      password: '',
      confirm_password: '',
      marketing_consent: false,
    }
  });

  function randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  const handleBack = () => {
    if (registerStep > 0){
      setRegisterStep(registerStep - 1);
    } else {
      navigate("/");
    }
  }

  const handlePrivPolicy = () => {
    setPrivPolicy(!privPolicy);
  }

  const handleTnc = () => {
    setTnc(!tnc);
  }

  const handleMarketing = () => {
    setMC(!marketConsent);
    setValue("marketing_consent", !marketConsent);
  }

  const handleKeyPress = (event: { key: string; preventDefault: () => void; }) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  } 

  const handleStep = async (step : number) => {
    switch(step){
      case 0:
        const emailValid = await trigger('email');
        if (emailValid){
          setRegisterStep(1);
        }
        break;
      case 1:
        const fnameValid = await trigger('first_name');
        const lnameValid = await trigger('last_name');
        if (fnameValid && lnameValid){
          setValue("role", option)
          setRegisterStep(2);
        }
        break;
    }
  }

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
        setRegisterStep(3);
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

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const fUser = watch('first_name').toLowerCase();
    const lUser = watch('last_name').toLowerCase();
    const suffix = randomNumber(100,9999)
    const username = fUser[0] + lUser[0] + suffix.toString();
    const {confirm_password, ...rest} = data
    rest.username = username;
    ApiClient.users.register(rest).then((response) => {
      toast.success("Successfully registered");
      ApiClient.users.login({email: rest.email, password: rest.password}).then((LoginResponse) => {
        const responseData = JSON.parse(JSON.stringify(LoginResponse));
        console.log(responseData);
        sessionStorage.setItem('role', responseData.user.role);
        sessionStorage.setItem('token', responseData.token);
        sessionStorage.setItem('id', responseData.user.id);
        sessionStorage.setItem('auth', 'true');
        navigate('/');
      });
    }).catch((error) => {
        toast(<div className="absolute top-[29px] left-[39px] font-toast font-medium text-white text-[24px]">{error.response.data.message}
          <p className="mt-[8px] font-toast font-normal text-white text-[20px]">Please try again</p>
          </div>,{
          autoClose: false,
          closeOnClick: false,
          draggable: false,
          closeButton: CloseButton,
          position: toast.POSITION.BOTTOM_RIGHT,
          className:"auth-error"
        })
    })
  }  

  return (
    <Layout title="Register your account">
      <div onClick={handleBack} className="absolute left-[117px] top-[123px] flex text-primary text-2xl font-semibold items-center cursor-pointer">
            <img className="mt-[2px] mr-[10px] w-[8px] h-[13px]" src={chevronleft}></img>
            Back
      </div>
      <div className="absolute right-[107px] top-[100px] text-primary text-5xl font-normal font-serif">
            Chapters
      </div>
      <div className="w-screen h-screen flex flex-col justify-center">
          <img className="absolute right-0 bottom-0 h-screen" src={splash} />
          <form ref={registerForm} onSubmit={handleSubmit(onSubmit)}>
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
                  <input type="text" className="pl-[26px] text-2xl text-primary font-normal w-full h-[86px] self-center rounded-[7px] border-2 border-mint" {...register("email")}></input>
                  <span className="text-lg text-red-500">{errors.email?.message}</span>
                  <div className="mt-7 text-xl text-primary font-normal">Already have an account? <Link className="font-semibold" to="/auth/login">Log in.</Link></div>
                  <button 
                    type="button" 
                    onClick={() => {handleStep(0)}} 
                    disabled={(watch("email").length == 0)} 
                    className="ml-auto mt-11 bg-primary rounded-md text-2xl text-white w-[161.6px] h-[74.4px] disabled:bg-zinc-400">
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
                      <input type="text" className="pl-[26px] text-2xl text-primary font-normal w-full h-[86px] self-center rounded-[7px] border-2 border-mint" {...register("first_name")}></input>
                      <span className="text-lg text-red-500">{errors.first_name?.message}</span>
                    </div>
                    <div className="w-[430px] flex flex-col">
                      <label className="mb-[11px] text-2xl text-primary font-semibold">
                        Last Name
                      </label>
                      <input type="text" className="pl-[26px] text-2xl text-primary font-normal w-full h-[86px] self-center rounded-[7px] border-2 border-mint" {...register("last_name")}></input>
                      <span className="text-lg text-red-500">{errors.last_name?.message}</span>
                    </div>
                  </div>
                  <label className="mt-[27px] mb-[11px] text-2xl text-primary font-semibold">
                        Account type
                  </label>
                  <Dropdown dropdownOption={option} setDropdown={setOption}/>
                  <button 
                    type="button" 
                    onClick={() => {handleStep(1)}} 
                    disabled={watch('first_name').length == 0 || watch('last_name').length == 0 || option == ""} 
                    className="absolute right-[105.23px] bottom-[76.89px] mt-11 bg-primary rounded-md text-2xl text-white w-[161.6px] h-[74.4px] disabled:bg-zinc-400">
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
                  disabled={watch("password").length == 0 || watch("confirm_password").length == 0} 
                  className="float-right mt-[52px] bg-primary rounded-md font-semibold text-2xl text-white w-[161.6px] h-[74.4px] disabled:bg-zinc-400">
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
         {registerStep === 3 && (
              <div className="relative w-[95vw] h-[75vh] max-w-[861px] max-h-[631px] mx-auto flex flex-col px-3 rounded-lg bg-white self-center">
              <div>
                <h2 className="pb-4 mb-[44px] mt-[63px] text-center text-4xl md:text-5xl lg:text-6xl font-bold text-primary">Let's sign you up</h2>
              </div>
              <hr className="solid border-primary"></hr>
              <div className="m-auto max-w-[613px] w-full flex flex-col text-primary text-[22.11px] font-semibold leading-9 gap-[11.53px]">
                  <div className="flex items-center">
                    <button onClick={handlePrivPolicy} type="button"><img className="h-[25px] w-[25px]" src={privPolicy ? checkboxTick : checkbox}></img></button>
                    <div className="ml-[14.89px]">I agree to Chapters <a className="underline underline-offset-[4.86px] decoration-1">Privacy Policy</a></div>
                  </div>
                  <div className="flex items-center">
                    <button onClick={handleTnc} type="button"><img className="h-[25px] w-[25px]" src={tnc ? checkboxTick : checkbox}></img></button>
                    <div className="ml-[14.89px]">I agree to Chapters <a className="underline underline-offset-[4.86px] decoration-1">Terms and Conditions</a></div>
                  </div>
                  <div className="flex items-start">
                    <button onClick={handleMarketing} className="mt-1.5" type="button"><img className="h-[25px] w-[25px]" src={marketConsent ? checkboxTick : checkbox}></img></button>
                    <div className="ml-[14.89px]">I would like to receive marketing communications and <br></br>offers from Chapters by email</div>
                  </div>
                  <button 
                    type="submit" 
                    disabled={!privPolicy || !tnc} 
                    className="ml-auto mt-11 bg-primary rounded-md text-2xl text-white w-[161.6px] h-[74.4px] disabled:bg-zinc-400">
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
