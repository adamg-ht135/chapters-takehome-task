import ApiClient from "@/api";
import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import Navbar from "@/components/Dashboard/navbar";
import placeholder from "../../assets/placeholder.jpg"
import chevronRight from "../../assets/chevron-right.svg"
const Book = () => {
    const [book, setBook] = useState<any>(undefined);
    const [loading, setLoading] = useState(true);
    const token = sessionStorage.getItem('token');
    const role = sessionStorage.getItem('role');

    let { bookId } = useParams();

    useEffect(() => {
        if (token != null && bookId != undefined){
            ApiClient.books.readBook(token, parseInt(bookId)).then((response) => {
                setBook(response);
                setLoading(false);
            })
        }
      }, []);

    return ( 
        <div className="w-screen h-screen">
            <Navbar page={1}/>
            <div className="mt-[5.23vh] ml-[8.125vw] mr-[8.854166vw]">
                <div className="flex items-center gap-[16px] text-primary text-2xl font-semibold">
                    <Link to="/" >All Books</Link>
                    <img src={chevronRight}></img>
                    {!loading && <div>{book.title}</div> }
                </div>
            </div>
            <div className="mt-[15px] ml-[8.125vw] mr-[8.854166vw]">
                {role === 'Reader' && <h1 className="text-primary text-6xl font-bold font-sans">Books</h1>}
                {(role === 'Author' || role === 'Admin') && <h1 className="text-primary text-6xl font-bold font-sans">View All Books</h1>}
            </div>
            <div className="mt-[56px] text-black text-2xl font-semibold mx-auto flex gap-[30px] items-center justify-center">
                <div>
                    <img className="rounded-md" width="240px" height="180px" src={placeholder}></img>
                </div>
                {loading ? <div>Loading...</div> :
                <ul>
                    <li>Title: {book.title}</li>
                    <li>Author: {book.author}</li>
                    <li>Published: {book.date_published}</li>
                    <li>Genre:</li>
                    <li>Description:</li>
                </ul>}
            </div>
        </div>
    );
}
 
export default Book;