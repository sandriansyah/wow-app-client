import React,{useState,useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom"
// import {SubsContext} from "../../context/subsContext"
import {UserContext} from "../../context/userContex"
import {Modal} from "react-bootstrap"

import Profile from "../../component/profile/profile";
import "./afterlogin.css";
import PosterImg from "../../media/Frame 1.png";

// import {dataBook} from "../fakeData"
// import {myListBook} from "../profileActiveSubscribe/profileActiveSubscribe"

import {API} from "../../config/api"

function AfterLogin() {

  const [user,setUser] = useContext(UserContext)
  // const [state,dispacth] = useContext(SubsContext)
  const [books,setBooks] = useState([])
  console.log(books);

    const navigate=useNavigate()

    const [show, setShow] = useState(false);
    const [dataUser,setDataUser] = useState("")
    const handleClose = () =>{
      setShow(false);
    } 
    
    const getBooks = async()=>{
      try {
        const response = await API.get("/books")       
        setBooks(response.data.data)
        
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(()=>{
      getBooks()
    },[])

    const getUser = async()=>{
      try {
        const response = await API.get("/user") 
        setDataUser(response.data.data)
  
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(()=>{
      getUser()
    },[])

    const handleDetail = (id) => {

      if(dataUser.isSubs =="true" || dataUser.status == "admin"){
        navigate(`/bookdetail/${id}`)
      }else{
        setShow(true)
      }     
    }


  return (
    <div className="afterLogin">

        <Modal className="modalBookList" show={show} onHide={handleClose}> 
        <div className="paragraf">
            <p> <b>please make a payment to read the latest books</b>  </p>
        </div>                                                      
        </Modal>
      

      <div className="afterLoginLeft position-relative">
        <div className="position-fixed">
          <Profile userData ={dataUser}/>
        </div>
      </div>
      <div className="afterLoginRight">
        <div className="posterImg">
          <img src={PosterImg} alt="" />
        </div>
        <div className="list">
          <h1>List Book</h1>
        </div>
        <div className="listBook row ">

            {books.map((item) => {
              return(
                
                <div key={item.id} className="listBook1 col-3" onClick={() => handleDetail(item.id)} >
                  <img src={item.imgCover} alt="" />
                  <h3>{item.title}</h3>
                  <p>{item.author}</p>    
                </div>
                
              )

            })} 
                    
        </div>
      </div>
    </div>
  );
}

export default AfterLogin;






// {/* <div className="listBook1">
//               <button onClick={handleShow}>
//                 <img src={Book1} alt="" />
//                 <h3>Serangkai</h3>
//                 <p>Valerie Patkar</p>
//               </button>
//             </div>
          

//           <div className="listBook1">
//             <button onClick={handleShow}>
//               <img src={Book4} alt="" />
//               <h3>Z1 - Sd/Mi Buku Siswa Tematik T...</h3>
//               <p>Afi Yustiyana</p>
//             </button>
//           </div>

//           <div className="listBook1">
//             <button onClick={handleShow}>
//               <img src={Book3} alt="" />
//               <h3>Kabar Rahasia Dari Alam Kubu ...</h3>
//               <p>DR. Kamil Yusuf Al-Atum</p>
//             </button>
//           </div>

//           <div onClick={} className="listBook1">
//             <button onClick={handleShow}>
//               <img src={Book2} alt="" />
//               <h3>Tess on the Road</h3>
//               <p>Rachel Hartman</p>
//             </button>
//           </div> */}
