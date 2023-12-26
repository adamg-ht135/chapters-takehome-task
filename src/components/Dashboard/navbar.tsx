import { Link, useNavigate } from 'react-router-dom';
const Navbar = ({ page } : {page: number}) => {
    const role = sessionStorage.getItem('role');
    const navigate = useNavigate();

    const handleLogOut = () => {
        sessionStorage.clear();
        navigate("/");
    };

    return (
        <nav className="w-screen h-[12.5vh] bg-mint flex items-center text-primary">
            <div className="ml-[7.96875vw] text-3xl font-serif font-normal">Chapters</div>
            <div className="ml-auto text-2xl font-medium font-sans mr-[8.6979167vw]">
                {(role === 'Author' || role === 'Admin') && <Link to="/" className={page === 1 ? "mr-[2.65625vw] font-bold" : "mr-[2.65625vw]"}>All Books</Link>}
                {role === 'Author' && <Link to="/mybooks" className={page === 2 ? "mr-[2.65625vw] font-bold" : "mr-[2.65625vw]"}>My Books</Link>}
                {role === 'Admin' && <Link to="/users" className={page === 2 ? "mr-[2.65625vw] font-bold" : "mr-[2.65625vw]"}>Users</Link>}
                <button onClick={handleLogOut}>Log out</button>
            </div>
        </nav>
    );
}
export default Navbar;