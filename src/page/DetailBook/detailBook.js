import "./detailBook.css"
import { useParams } from "react-router-dom"
import { useState,useEffect } from "react"
import Profile from "../../component/profile/profile"
import IconV from "../../media/V.png"
import ButtonAddMyList from "../../component/button/buttonAddMyList"
import { useNavigate } from "react-router-dom"
import Button from '@mui/material/Button';
import Swal from "sweetalert2"

import {API} from "../../config/api"

function DetailBook(){

    const navigate = useNavigate()

    const [book,setBook]=useState({
        title: "", 
        publicationDate: "", 
        pages: "", 
        author: "", 
        isbn: "", 
        about: "", 
        bookFile: "", 
        imgCover: "",
    })
    const [myBook,setMyBook] = useState({})

    const {id} = useParams()

    const getDetailBook = async()=>{
        try {
            
            const response = await API.get(`/book/${id}`)
            // setTitle(response.data.book.title)
            // console.log(response.data.book);
            setBook(response.data.book)
            
            
        } catch (error) {
            console.log(error);
        }
    }

    const getMyList =async()=>{

        const response = await API.get(`/findbook/${id}`)
        console.log(response.data.data);
        setMyBook(response.data.data)
        // console.log(myBook);
    }

    const [user,setUser] = useState([])
    
    const getUser= async()=>{
        try {
            const response = await API.get("/user")
            // console.log(response.data.data);
            setUser(response.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getDetailBook()
        getMyList()
        getUser()
    },[])

    const handleDelete = async()=>{
        try {
            const response = await API.delete(`/book/${id}`)
            console.log(response);
            if(response.data.status == "success"){
                Swal.fire(
                    'Book Deleted'
                )
            }
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div className="detailBook">
            <div className="detailBookLeft">
                <Profile />
            </div>
            <div className="divScrooll detailBookRight " style={{height:"100vh",overflow:"scroll"}}>
                <div className="informationBook">
                    <div className="informationBookCover">
                        <img src={book.imgCover} alt="" />
                    </div>
                    <div className="informationBookData">
                        <div className="titleBook">
                            <h1>{book.title}</h1>
                            <p>{book.author}</p>
                        </div>
                        <div className="rilisBook">
                            <h6>Publication Date</h6>
                            <p>{book.publicationDate}</p>
                        </div>
                        <div className="pagesBook">
                            <h6>Pages</h6>
                            <p>{book.pages}</p>
                        </div>
                        <div className="isbnBook">
                            <h6>ISBN</h6>
                            <p>{book.isbn}</p>
                        </div>
                        {user.status == "admin" ? <Button onClick={handleDelete} sx={{bgcolor:"error.main"}} variant="contained" size="medium">
                            Delete book
                        </Button> : null }
                        
                    </div>
                </div>
                <div className="aboutBook">
                    <h2>About This Book</h2>
                    <p>{book.about}</p>
                </div>
                <div className="btnDetailBook mt-5">

                    {myBook ? null : <ButtonAddMyList idBook={book.id}/>}

                    
                    {/* <button className="btnDetailBook1" >Add My List <img src={IconSaveList} alt="" /></button> */}
                    <Button variant="contained" className="btnDetailBook2 text-black" onClick={()=>{navigate(`/readbook/${book.id}`)}} >Read Book <img className="ms-3" src={IconV} alt="" /></Button>
                
                </div>
            </div>
        </div> 
    )
}

export default DetailBook
