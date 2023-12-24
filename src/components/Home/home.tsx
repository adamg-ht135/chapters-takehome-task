import bookshelves from '../../assets/bookshelves.png';
import { Link } from 'react-router-dom';

const Home = () => {
    return ( 
        <div className="w-screen h-screen flex bg-mint">
            <div className="m-auto font-serif text-white font-normal text-[100px] flex flex-col items-center">
                <div className='w-[479px] h-[188px]'>Chapters</div>
                <Link className="flex items-center justify-center mt-[17px] w-[295.99px] h-[97.36px] font-sans text-[33.38px] font-semibold bg-primary text-white rounded-md" to="/auth/login">Login</Link>
                <Link className="flex items-center justify-center mt-[34.27px] w-[295.99px] h-[97.36px] font-sans text-[33.38px] font-semibold text-primary rounded-md border-2 border-primary" to="/auth/register">Sign Up</Link>
            </div>
            <img className="self-end h-screen" src={bookshelves}></img>
        </div>
    );
}
 
export default Home;