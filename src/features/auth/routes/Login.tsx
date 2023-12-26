import { Layout } from '../components/Layout';
import eye from '../../../assets/eye.svg';
import eyeclosed from '../../../assets/eye-closed.svg';
import chevronleft from '../../../assets/chevron-left.svg';
import splash from '../../../assets/girl-with-books.png';
import { useState } from 'react';
import { useForm, SubmitHandler} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { loginSchema } from '@/features/schemas/loginschemas';
import { zodResolver } from '@hookform/resolvers/zod';
import ApiClient from '@/api';
import { toast } from 'react-toastify'
import CloseButton from '@/components/Form/CloseButton';
import '../../stylesheets/toasts.css'

type FormData = {
  email: string;
  password: string;
}

export const Login = () => {
  const [eyes,setEyes] = useState(true);
  const {register , handleSubmit, formState:{ errors }} = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleEyes = () => {
    setEyes(!eyes);
  }

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormData> = (data) => {
      ApiClient.users.login(data).then((response) => {
        const responseData = JSON.parse(JSON.stringify(response));
        toast.success(responseData.message);
        sessionStorage.setItem('role', responseData.user.role);
        sessionStorage.setItem('id', responseData.user.id);
        sessionStorage.setItem('token', responseData.token)
        sessionStorage.setItem('auth', 'true');
        navigate('/');
      }).catch((error) => {
        if (error.response.data.message == "Invalid username or password!!"){
          toast(<div className="absolute top-[29px] left-[39px] font-toast font-medium text-white text-[24px]">Email or Password is Incorrect
            <p className="mt-[8px] font-toast font-normal text-white text-[20px]">Please try again</p>
            </div>,{
            autoClose: false,
            closeOnClick: false,
            draggable: false,
            closeButton: CloseButton,
            position: toast.POSITION.BOTTOM_RIGHT,
            className:"auth-error"
          })
        }
      })
  }

  return (
    <Layout title={''}>
      <div className="absolute left-[117px] top-[123px] flex text-primary text-2xl font-semibold items-center">
            <img className="mt-[2px] mr-[10px] w-[8px] h-[13px]" src={chevronleft}></img>
            Back
      </div>
      <div className="absolute right-[107px] top-[100px] text-primary text-5xl font-normal font-serif">
            Chapters
      </div>
      <div className="w-screen h-screen flex flex-col justify-center">
          <img className="absolute object-left-bottom -ml-5 h-screen " src={splash} />
          <div className="relative w-[95vw] h-[75vh] max-w-[810px] max-h-[717px] mx-auto flex flex-col px-3 rounded-lg bg-white self-center">
            <div>
              <h2 className="pb-4 mb-[44px] mt-[63px] text-center text-4xl md:text-5xl lg:text-6xl font-bold text-primary">Welcome Back</h2>
            </div>
            <hr className="solid border-primary"></hr>
            <form className="m-auto max-w-[613px] w-full flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <label className="mb-4 text-2xl text-primary font-semibold">
                  Email
                </label>
                <input type="text" className="px-[26px] text-2xl text-primary font-normal w-full h-[86px] self-center rounded-[7px] border-2 border-mint" {...register('email')}></input>
                <span className="text-lg text-red-500">{errors.email?.message}</span>
                <label className="mt-5 mb-4 text-2xl text-primary font-semibold">
                  Password
                </label>
                <div className="relative w-full h-[86px]">
                  <input className="px-[26px] text-2xl text-primary font-normal absolute w-full h-[86px] self-center rounded-[7px]  border-2 border-mint" type={eyes ? "password" : "text"} {...register('password')}></input>
                  <button type="button" className="relative float-right my-8 mr-6 w-8 h-6 border-none z-5" onClick={handleEyes}>
                    <img src={eyes ? eye : eyeclosed}></img>
                  </button>
                </div>
                <span className="text-lg text-red-500">{errors.password?.message}</span>
                <button className="ml-auto mt-11 bg-primary rounded-md text-2xl text-white w-[191px] h-[70px]">
                  Login
                </button>
            </form>
          </div>
      </div>
    </Layout>
  );
};