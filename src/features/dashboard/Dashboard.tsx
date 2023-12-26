import ApiClient from "@/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Dashboard/navbar";
const Dashboard = () => {
    const token = sessionStorage.getItem('token');
    const role = sessionStorage.getItem('role');
    const [books, setBooks] = useState<any>(undefined);

    const getRandomColor = () => {
        const colors = [
            'bg-red-500',
            'bg-red-600',
            'bg-red-700',
            'bg-orange-500',
            'bg-orange-600',
            'bg-orange-700',
            'bg-blue-500',
            'bg-blue-600',
            'bg-blue-700',
            'bg-green-500',
            'bg-yellow-500',
            'bg-slate-500',
            'bg-slate-700',
            'bg-slate-900',
            'bg-slate-950',
            'bg-amber-900',
            'bg-amber-700',
            'bg-yellow-700',
            'bg-slate-950',
            'bg-lime-500',
            'bg-lime-600',
            'bg-green-600',
            'bg-green-700',
            'bg-teal-700',
            'bg-emerald-700',
            'bg-cyan-700',
            'bg-violet-700',
            'bg-purple-700',
            'bg-fuchsia-700',
            'bg-pink-700',
        ];
      
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    };
    useEffect(() => {
        if (token != null){
            ApiClient.books.listBooks(token).then((response) => {
                setBooks(response);
            })
        }
        console.log(books)
      }, []);

    return ( 
        <div className="w-screen h-screen">
            <Navbar page={1}/>
            <div className="mt-[5.23vh] ml-[8.125vw] mr-[8.854166vw]">
                {role === 'Reader' && <h1 className="text-primary text-6xl font-bold font-sans">Books</h1>}
                {(role === 'Author' || role === 'Admin') && <h1 className="text-primary text-6xl font-bold font-sans">View All Books</h1>}
            </div>
            <div className="mx-auto mt-[52px] w-[83vw] flex gap-x-[19px] gap-y-[20px] flex-wrap">
                {books && books.map((book: any, index: number) => (
                    <Link to={`/books/${index + 1}`}>
                    <div className={`relative h-[243px] w-[303px] rounded-md text-white flex flex-col-reverse ${getRandomColor()}`} key={index}>
                        <div className="absolute h-full w-full opacity-30 bg-gradient-to-b from-zinc-300 to-stone-700">
                        </div>
                        <div className="ml-[28px] mb-[20px] z-10">
                            <h1 className="text-white text-xl font-bold font-sans">{book.title}</h1>
                            <p className="text-white text-lg font-medium">Author</p>
                        </div>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
 
export default Dashboard;