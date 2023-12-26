import ApiClient from "@/api";
import { useState, useCallback } from "react";
import Navbar from "@/components/Dashboard/navbar";
import chevronRight from "../../../assets/chevron-right.svg";
import fileUpload from "../../../assets/file-upload.svg";
import imageFile from "../../../assets/image.png";
import pdfFile from "../../../assets/pdf.png";
import closeUpload from "../../../assets/close-upload.svg";
import { useForm, SubmitHandler} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookSchema } from '@/features/schemas/bookschemas';
import {useDropzone} from 'react-dropzone'
import Genre from "@/features/auth/components/Genre";
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import CloseButton from '@/components/Form/CloseButton';
import '../../stylesheets/toasts.css'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

type FormData = {
    title: string;
    author: number;
    date_published: string;
}

const AddBook = () => {
    const [cover, setCover] = useState<any>(undefined);
    const [authorName, setAuthorName] = useState('');
    const [placeholder, setPlaceholder] = useState(true);
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');

    const token = sessionStorage.getItem('token');
    const authorId = parseInt(sessionStorage.getItem('id') || '1');
    
    const onDrop = useCallback((acceptedFiles: any) => {
        setCover(acceptedFiles)
    }, [cover])

    const removeCover = () => {
        setCover(undefined);
    }
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop,
        accept: {
            'image/png': ['.png'],
            'image/jpg': ['.jpg', '.jpeg', '.jfif', '.pjpeg', '.pjp'],
            'image/pdf': ['.pdf'],
        },
        maxFiles:1})
    const {register , handleSubmit, watch, setValue} = useForm<FormData>({
        resolver: zodResolver(bookSchema),
        defaultValues:{
            title: '',
            author: authorId,
        }
    });

    const handleFocus = () => {
        setPlaceholder(false);
    }
    const handleBlur = () => {
        const dateValue = watch('date_published');
        if (!dateValue) {
          setPlaceholder(true);
        }
    }
    const handleAuthor = (name:string) => {
        setAuthorName(name);
    }
    const handleDescription = (text: string) => {
        setDescription(text);
    }
    
    const onSubmit: SubmitHandler<FormData> = (data) => {
        if (token == null) {
            return;
        }
        ApiClient.books.createBook(token, data).then((response) => {
            toast.success('Book successfully added!');
            setValue('title', '');
            setValue('date_published', '');
            setPlaceholder(true);
            setAuthorName('');
            setGenre('');
            setDescription('');
            setCover(undefined);
        }).catch((error: any) => {
            console.log(error)
            toast(<div className="absolute top-[29px] left-[39px] font-toast font-medium text-white text-[24px]">Could not add book
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
        <div className="w-screen h-screen">
            <Navbar page={2}/>
            <div className="mt-[5.23vh] ml-[8.125vw] mr-[8.854166vw]">
                <div className="flex items-center gap-[16px] text-primary text-2xl font-semibold">
                    <Link to="/mybooks">My Books</Link>
                    <img src={chevronRight}></img>
                    <div>Add Book</div>
                </div>
                <h1 className="mt-[15px] text-primary text-6xl font-bold font-sans">Add Book</h1>
            </div>
            <form className="mt-[56px] mx-auto w-[83.3333vw] h-[66.76vh] flex gap-[118px]" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-[24px]">
                    <div className="flex gap-[26px]">
                        <div className="flex flex-col gap-[7px]">
                            <label className="text-xl text-primary font-normal">Name of Book</label>
                            <input type="text" className="px-[23px] text-xl text-primary font-semibold w-[403px] h-[73px] rounded-md border-2 border-primary" {...register('title')}></input>
                        </div>
                        <div className="flex flex-col gap-[7px]">
                            <label className="text-xl text-primary font-normal">Name of Author</label>
                            <input type="text" className="px-[23px] text-xl text-primary font-semibold w-[403px] h-[73px] rounded-md border-2 border-primary" onChange={(event) => {handleAuthor(event.target.value)}} value={authorName}></input>
                        </div>
                        <div className="flex flex-col gap-[7px]">
                            <label className="text-xl text-primary font-normal">Date Published</label>
                            <input 
                                type={placeholder ? "text" : "date"}
                                className={placeholder ? "px-[23px] text-xl font-normal w-[403px] h-[73px] rounded-md border-2 border-primary placeholder:text-[#90b3d8]" : "px-[23px] text-xl text-primary font-semibold w-[403px] h-[73px] rounded-md border-2 border-primary"} 
                                placeholder="DD/MM/YY" 
                                {...register('date_published')}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            >
                            </input>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex flex-col gap-[7px]">
                            <label className="text-xl text-primary font-normal">Genre</label>
                            <div className="w-[405px] h-[73px]">
                                <Genre dropdownOption={genre} setDropdown={setGenre}/>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-[31px]">
                        <div className="flex flex-col gap-[7px]">
                            <label className="text-xl text-primary font-normal">Cover Image</label>
                            <div className="p-[13px] w-[627px] h-[329px] border-2 border-primary rounded-md">
                                {cover === undefined ?
                                <div className="w-full h-full rounded-md border-2 border-dashed border-sky-700 border-opacity-25" {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    {
                                        isDragActive ?
                                        <div className="w-full h-full flex flex-col items-center justify-center">
                                        <img src={fileUpload}></img>
                                        <div className="mt-[12px] w-[46.36%] text-center text-xl text-primary font-medium">Drop your files...</div>
                                        </div> :
                                        <div className="w-full h-full flex flex-col items-center justify-center">
                                            <img src={fileUpload}></img>
                                            <div className="mt-[12px] w-[46.36%] text-center text-xl text-primary font-medium">Drag and drop your file here to start uploading</div>
                                            <div className="w-[36%] h-[27px] mt-[12.6px]">
                                                <hr className="relative top-[65%] w-auto solid border-slate-400"></hr>
                                                <div className="relative top-0 left-[41%] w-[37px] text-center text-sky-700 text-opacity-50 text-xl font-normal font-toast bg-white">or</div>
                                            </div>
                                            <div className="mt-[11px] px-[42.15px] py-[14px] bg-primary text-white text-xl font-semibold cursor-pointer rounded-md">
                                                Browse Files
                                            </div>
                                        </div>
                                    }
                                </div> : 
                                <div className="w-full h-full rounded-md border-2 border-dashed border-sky-700 border-opacity-25 flex items-center justify-center">
                                    <div className="w-[555px] h-[267px] p-[16px] rounded-md border-2 border-primary">
                                        <div className="w-full h-[67px] flex">
                                            <div className="flex-grow flex items-center overflow-clip hover:overflow-auto">
                                                <img className="ml-[11px]" width="34.5px" src={cover[0].path.split('.')[1] === "pdf" ? pdfFile : imageFile}></img>
                                                <div className="ml-[20.5px] text-primary text-lg font-semibold">{cover[0].path}</div>
                                            </div>
                                            <div>
                                                <img className="cursor-pointer" onClick={removeCover} src={closeUpload}></img>
                                            </div>
                                        </div>
                                        <div className="w-full flex items-center justify-center">
                                            {cover[0].path.split('.')[1] === "pdf" ?
                                            <div className="rounded-md w-[522px] h-[169px] overflow-hidden">
                                                <Document file={cover[0]}>
                                                    <Page pageNumber={1} width={522} />
                                                </Document>
                                            </div> :                                             
                                            <img className="rounded-md w-[522px] h-[169px] object-cover" src={URL.createObjectURL(cover[0])} alt={cover.name} />}
                                        </div>
                                    </div>
                                </div>
                                }
                            </div>
                            <div className="mt-[4px] text-xl text-primary font-medium">Supported File Types: PDF, PNG & JPG</div>
                        </div>
                        <div>
                            <div className="flex flex-col gap-[7px]">
                                <label className="text-xl text-primary font-normal">Description</label>
                                <textarea onChange={(event) => handleDescription(event.target.value)} value={description} className="text-xl font-normal py-[22px] px-[25px] rounded-md border-2 border-primary placeholder:text-sky-700 placeholder:text-opacity-50" placeholder="Describe your book..." rows={4} cols={50}>
                                </textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-full flex">
                    <button disabled={watch("title") === '' || !watch("date_published") || authorName === '' || genre === '' || cover === undefined} className="self-end mt-auto h-[70px] w-[213px] bg-primary text-white text-2xl font-semibold rounded-md disabled:bg-zinc-400">Add Book</button>
                </div>
            </form>
        </div>
    );
}
 
export default AddBook;