import ApiClient from "@/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Dashboard/navbar";
const MyBooks = () => {
    const token = sessionStorage.getItem('token');
    const [books, setBooks] = useState<any>(undefined);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (token != null){
            ApiClient.books.listBooks(token).then((response) => {
                setBooks(response);
                setLoading(false);
            })
        }
      }, []);
    return ( 
        <div className="w-screen h-screen">
            <Navbar page={2}/>
            <div className="mt-[5.23vh] ml-[8.125vw] mr-[8.854166vw] flex">
                <h1 className="text-primary text-6xl font-bold font-sans">My Books</h1>
                <Link className="ml-auto bg-primary text-white text-2xl font-semibold flex items-center justify-center rounded-md w-[213px] h-[70px]" to="/mybooks/add-book">Add Book</Link>
            </div>
            <div className="mx-auto mt-[52px] w-[83vw] flex gap-x-[19px] gap-y-[20px] flex-wrap">
                <table className="w-full text-left">
                <thead className="text-white text-xl font-bold bg-primary h-[47px] rounded-md">
                    <tr>
                    <th className="pl-[26px] rounded-l-lg">Title</th>
                    <th>Author</th>
                    <th>Date Published</th>
                    <th className="pr-[26px] rounded-r-lg">Date Added to Site</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (<tr><td> Loading ... </td></tr>) :
                        books.map((book: any, index: number) => (
                            <tr key={index} className={(index % 2) == 0 ? "h-[80px] bg-white text-xl text-primary font-medium" : "h-[80px] bg-zinc-100 text-xl text-primary font-medium"}>
                                <td className="pl-[26px]">{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.date_published}</td>
                                <td className="pr-[26px]">{book.date_added}</td>
                            </tr>
                        ))
                    }
                </tbody>
                </table>
            </div>
        </div>
    );
}
 
export default MyBooks;