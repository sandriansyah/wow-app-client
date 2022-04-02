import "./detailBook.css"
import { useParams } from "react-router-dom"
import { useState,useEffect } from "react"
import Profile from "../../component/profile/profile"
import CoverBook from "../../media/Rectangle 2.png"
import IconSaveList from "../../media/saveList.png"
import IconV from "../../media/V.png"
import ButtonAddMyList from "../../component/button/buttonAddMyList"
import { useNavigate } from "react-router-dom"

import {API} from "../../config/api"
import { dataBook } from "../fakeData"

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

    useEffect(()=>{
        getDetailBook()
        getMyList()
    },[])

    return(
        <div className="detailBook">
            <div className="detailBookLeft">
                <Profile />
            </div>
            <div className="detailBookRight">
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
                    </div>
                </div>
                <div className="aboutBook">
                    <h2>About This Book</h2>
                    <p>{book.about}</p>
                </div>
                <div className="btnDetailBook mt-5">

                    {myBook ? null : <ButtonAddMyList idBook={book.id}/>}

                    
                    {/* <button className="btnDetailBook1" >Add My List <img src={IconSaveList} alt="" /></button> */}
                    <button className="btnDetailBook2" onClick={()=>{navigate(`/readbook/${book.id}`)}} >Read Book <img src={IconV} alt="" /></button>
                
                </div>
            </div>
        </div> 
    )
}

export default DetailBook
