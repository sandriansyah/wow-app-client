import React,{useContext, useEffect, useState} from "react";
import "./profile.css";
import Logo from "../../media/Icon.png";
import ImgProfile from "../../media/Ellipse 1.png";
import IconProfile from "../../media/user 1.png";
import IconSubscribe from "../../media/bill 1.png";
import IconLogout from "../../media/logout 1.png";
import {useNavigate,Link} from "react-router-dom"
// import {SubsContext} from "../../context/subsContext"
import {ShowModalContext} from "../../context/showModalContext"
import {UserContext} from "../../context/userContex"

import {API} from "../../config/api"



function Profile() {

  // const userData = props.userData
  // console.log(userData);


  // const [state,dispacth] =useContext(SubsContext)
  const [showModal,setShowModal] =useContext(ShowModalContext)
  
  const [dataUser,setDataUser] = useState("")
  const [profile,setProfile] = useState([])


  const [user,setUser] =useContext(UserContext)
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

  

  const getProfile= async()=>{
    try {
        const response = await API.get("/profile")
        setProfile(response.data.data)
    } catch (error) {
        console.log(error);
    }
}

 useEffect(()=>{
  getProfile()
 },[])


  const navigate=useNavigate()

  function handleLogOut(){

    setUser({
      type:'LOGOUT',
    })

    setShowModal({
      type:'SHOW_MODAL',
      payload:false
    })

    setDataUser({})
    setProfile({})
      navigate("/")
    
  }

  const handleSubscribe = ()=>{
    navigate("/subscribe")
  }

  const handleProfile = ()=>{
    navigate("/profile")
  }

  // const [statusSubs,setStatusSubs] =useState(state)
  
  return (
    <div className="profile">
      <div className="sectionProfile">
        <div className="logo">
          <Link to="/home">
            <img src={Logo} alt="" />
          </Link>         
        </div>
        <div className="imgProfile">
          <img src={profile.fotoProfile} alt="" />
        </div>
        <h3>{dataUser.fullName}</h3>
        
          {dataUser.status == "admin" ? null : dataUser.isSubs=="true" && dataUser.status=="user" ? <p className="text-success" >Subscribed</p>: 
          <p>not subscribed Yet</p>}

          {dataUser.status=="admin"? <button className="bg-danger text-light w-100 rounded" onClick={()=>{navigate("/listtrans")}}>Admin</button> : null }
      </div>
      <hr /> 
        <button onClick={handleProfile}>
          <div className="profileIcon">
            <div className="icon">
              <img src={IconProfile} alt="" />
            </div>
            <div className="iconName">
              <p>Profile</p>
            </div>
          </div>
        </button>
        <br/>

      {dataUser.status=="admin"? null :
        <button onClick={handleSubscribe}>
          <div className="subscribeIcon">
            <div className="icon">
              <img src={IconSubscribe} alt="" />
            </div>
            <div className="iconName">
              <p>Subscribe</p>
            </div>
          </div>
        </button> 
        }

      <hr />
        <button onClick={handleLogOut}>
          <div className="logoutIcon">
            <div className="icon">
              <img src={IconLogout} alt="" />
            </div>
            <div className="iconName">
              <p>Log Out</p>
            </div>
          </div>
        </button>
    </div>
  );
}

export default Profile;
