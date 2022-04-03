import React,{useContext, useState,useEffect} from "react";
import {useNavigate} from "react-router-dom"
import "./profileActiveSubscribe.css"
import Profile from "../../component/profile/profile";
import {Container,Row,Col,Modal,Form,Button,Alert} from "react-bootstrap"
import MailIcon from "../../media/mail.png"
import GenderIcon from "../../media/gender.png"
import PhoneIcon from "../../media/phone.png"
import AddresIcon from "../../media/addres.png"

import {API,setAuthToken} from "../../config/api"

if (localStorage.token) {
    setAuthToken(localStorage.token)
}

function ProfileActiveSubscribe() {

const [myBooks,setMyBooks] = useState([])
const [profile,setProfile] = useState([])
const [user,setUser] = useState([])

const navigate = useNavigate()


    const getMyBooks = async()=>{
        try {
            const response = await API.get("/myListBook")
            setMyBooks(response.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    const getProfile= async()=>{
        try {
            const response = await API.get("/profile")
            setProfile(response.data.data)
        } catch (error) {
            console.log(error);
        }
    }

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
        getMyBooks()
        getProfile()
        getUser()
    },[])

    const [show,setShow]=useState(false)
    const handleEditProfile = ()=>{
        setShow(true)
        navigate()
    }

    const handleCloseForm = ()=>{
        setShow(false);
        setMessage(null)
        getProfile()
        getUser()
    }

    const [message,setMessage] = useState(null)
    const [form,setForm]=useState({
        gender:"",
        phoneNumber:"",
        address:"",
        fotoProfile:"",
    })

    const handleChange = (e) =>{
        setForm({
            ...form,
            [e.target.name]: 
                e.target.type === "file" ? e.target.files : e.target.value
        })
    }

    const handleSubmit= async (e)=>{
        try {
            e.preventDefault()

            const config = {
                headers: { 
                    "Content-type": "multipart/form-data", 
                    },
            }

            const formData = new FormData();
            formData.set("gender",form.gender);
            formData.set("phoneNumber",form.phoneNumber);
            formData.set("address",form.address);
            formData.set("fotoProfile",form.fotoProfile[0],form.fotoProfile[0].name);

            const response = await API.patch("/profile",formData,config)
            console.log(response);

            if(response.data.status == "edit success"){
                const alertSuccess = <Alert variant="success" className="py-1" > Edit profile success </Alert>
                return setMessage(alertSuccess)
                
            }else{
                const alert = <Alert variant="danger" className="py-1"> Edit profile Failed </Alert>
                setMessage(alert)
            }


        } catch (error) {
            console.log(error);
            const alert = <Alert variant="danger" className="py-1"> Edit profile Failed </Alert>
                setMessage(alert)
        }
    }

    return (

        <div>

        <Modal show={show} onHide={handleCloseForm}>
            <Form className="p-3" onSubmit={handleSubmit}>
                {message}
                <h1>Edit Profile</h1>
                <Form.Select name="gender" className="bg-light shadow-none" aria-label="Default select example" onChange={handleChange}>
                    <option>select your gender</option>
                    <option value="male">male</option>
                    <option value="female">female</option>
                </Form.Select>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label >Phone Number</Form.Label>
                    <Form.Control name="phoneNumber" className="bg-light shadow-none" type="text" placeholder="Phone Number" onChange={handleChange}/>
                </Form.Group>
    
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control name="address" className="bg-light shadow-none" as="textarea" rows={3} onChange={handleChange}/>
                </Form.Group>

                <Form.Group controlId="formFileSm" className="mb-3">
                    <Form.Label>Image Profile</Form.Label>
                    <Form.Control name="fotoProfile" className="bg-light shadow-none" type="file" size="sm" onChange={handleChange}/>
                </Form.Group>

                <div>
                    <Button type="submit" style={{width:"100%"}} className="shadow-none" variant="danger">Edit</Button>
                </div>
            </Form>
        </Modal>
        
        <Container fluid className="con">
            <Row className="row">
                <Col className="col position-relative " sm={2}>
                    <div className="position-fixed">
                        <Profile/>
                    </div>
                </Col>
                <Col sm={10}>
                    <div className="detailProfile">
                        <h1>Profile</h1>
                        <div className="profileUser">
                            <div className="profileUserLeft">

                                <div className="data">
                                    <div className="iconImg">
                                        <img src={MailIcon} alt="" />
                                    </div>
                                    <div className="dataProfile">
                                        <p> <b>{user.email}</b> </p>
                                        <p>Email</p>
                                    </div>
                                </div>
                                
                                <div className="data">
                                    <div className="iconImg">
                                        <img src={GenderIcon} alt="" />
                                    </div>
                                    <div className="dataProfile">
                                        <p> <b>{profile.gender}</b> </p>
                                        <p>Gender</p>
                                    </div>
                                </div>

                                <div className="data">
                                    <div className="iconImg">
                                        <img src={PhoneIcon} alt="" />
                                    </div>
                                    <div className="dataProfile">
                                        <p> <b>{profile.phoneNumber}</b> </p>
                                        <p>Mobile Phone</p>
                                    </div>
                                </div>

                                <div className="data">
                                    <div className="iconImg">
                                        <img src={AddresIcon} alt="" />
                                    </div>
                                    <div className="dataProfile">
                                        <p> <b>{profile.address}</b> </p>
                                        <p>Address</p>
                                    </div>
                                </div>

                            </div>
                            <div className="profileUserRight">
                                <div className="imageProfie">
                                    <img src={profile.fotoProfile} alt="" />
                                </div>
                                <div className="btnEditProfile">
                                    <button onClick={handleEditProfile}>Edit Profile</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="myListBook ">
                        <div className="row">
                            <h1>My List Book</h1>
                        </div>
                        <div className="row d-flex text-center ">
                            
                                {myBooks.map((item,index)=>{
                                return(
                                    <div onClick={()=>{navigate(`/bookdetail/${item.book.id}`)}} key={index} className="bookList col-3">
                                        <img src={`https://wow-app-server.herokuapp.com//uploads/imgCover/${item.book.imgCover}`} alt="" />
                                        <div className="text-start ms-3">
                                            <h3>{item.book.title}</h3>
                                            <p >{item.book.author}</p>
                                        </div>
                                    </div>
                                )                            
                            })}
                            
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>

        </div>
    );
}

export default ProfileActiveSubscribe