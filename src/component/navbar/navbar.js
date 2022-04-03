import React,{useContext, useState,useEffect} from "react"
import {useNavigate} from "react-router-dom"
import "./navbar.css"
import Logo from "../../media/Icon.png"
import IconAddBook from "../../media/AddBook2.png"
import IconLogout from "../../media/logoutRed.png" 
import IconList from "../../media/list.png" 
import NavProfile from "../../media/Ellipse 2.png"
import {Dropdown,Navbar} from "react-bootstrap"
import {UserContext} from "../../context/userContex"
import {ShowModalContext} from "../../context/showModalContext"

import {API} from "../../config/api"

function Navbarr(){

    const navigate = useNavigate()

    const [logout,setLogout] =useContext(UserContext)
    const [showModal,setShowModal] =useContext(ShowModalContext)
    const [profile,setProfile]= useState({})

    const handleLogout = ()=>{
        setLogout({
            type:"LOGOUT",
        })

        setShowModal({
            type:'SHOW_MODAL',
            payload:false
        })

        navigate("/")
    }

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

    return(
        <Navbar fixed="top" className="navbar">
            <div className="logoNavbar ms-5">
                <img src={Logo} onClick={()=> {navigate("/home")}} />
            </div>
            
            <div className="navProfile me-5">                                
                <Dropdown>
                    <Dropdown.Toggle className="dropdownProfile shadow-none" variant="" id="dropdown-basic">
                    <img src={NavProfile} alt="" />            
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="dropdownMenu" >
                        <Dropdown.Item  onClick={()=>{navigate("/addbook")}}>
                            <img src={IconAddBook}/> Add Book
                        </Dropdown.Item>
                        <hr/>
                        <Dropdown.Item  href="/listtrans">
                            <img src={IconList}/> Transaction
                        </Dropdown.Item>
                        <hr/>
                        <Dropdown.Item  onClick={handleLogout}>
                            <img src={IconLogout} alt=""/>  Log Out
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </Navbar>
    )
}

export default Navbarr