import "./buttonSignUp.css"
import {useState,useContext} from "react"
import {Modal,Alert} from "react-bootstrap"
import {useNavigate} from "react-router-dom"
import {ShowModalContext} from "../../context/showModalContext"

import {API} from "../../config/api"


function BtnSignUp() {

    const [form,setForm] = useState({
        email:"",
        password:"",
        fullName:""
    })

    const [message,setMessage] = useState(null)
    
    const {email,password,fullName} = form

    const [state,dispacth]= useContext(ShowModalContext)


    const handleClose = () => {

        dispacth({
            type:'SHOW_MODAL',
            payload:{
                showSignUp:false,
                showSignIn:false
            }
        })

        setMessage(null)


    }
    const handleShow = () =>{

        // const showSignUp = true
    
        dispacth({
            type:'SHOW_MODAL',
            payload:{
                showSignUp:true,
                showSignIn:false
            }
        })
        
    } 

    const navigate = useNavigate()

    // const handleSignUp= ()=>{
    //         navigate("/home")
    // }

    const handleHere =()=>{
        dispacth({
            type:'SHOW_MODAL',
            payload:{
                showSignUp:false,
                showSignIn:true
            }
        })
    }

    const handleChange =(e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value,
        })
    }

    const handleSubmit = async(e) =>{
        try {
            e.preventDefault();

            // configuratton content-type
            const config ={
                headers:{
                    "Content-type":"application/json"
                }
            }

            // conver form data to string
            const body = JSON.stringify(form)

            //insert data to database
            const response = await API.post("/register",body,config)
            console.log(response);


            if(response.data.status == "success"){

                const alert = <Alert variant="success" className="py-1" > success </Alert>

                setMessage(alert)
                // navigate("/home")
            }else{
                const alert = <Alert variant="danger" className="py-1" > failed </Alert>

                setMessage(alert)
            }

        } catch (error) {
            console.log(error);
            const alert = (
                <Alert variant="danger" className="py-1" >
                    failed
                </Alert>
            );
            setMessage(alert);
        }


        setForm({
            email:"",
            password:"",
            fullName:""
        })
    }

    return (
    <>
        <button className="buttonSignUp" onClick={handleShow}>
        Sign Up
        </button>

        <Modal className="modalFromBosstrap mt-5" show={state.show.showSignUp}  onHide={handleClose}> 
            <div class="modalSignUp">
                <form className="d-inline" onSubmit={handleSubmit}>
                    <h3>Sign Up</h3>
                    {message}
                    <div>
                        <input type="email" name="email" placeholder="Email" onChange={handleChange} value={email}/>
                    </div>
                    <div>
                        <input type="password" name="password" placeholder="Password" onChange={handleChange} value={password}/>          
                    </div>
                    <div>
                        <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} value={fullName}/>          
                    </div>
                    <button type="submit" >
                        Sign Up
                    </button>
                    <p>Already have an account ? Klik <b onClick={handleHere} style={{cursor:"pointer"}}>Here</b> </p>

                </form>
            </div>                  
        </Modal>
    </>
    );
}

//   render(<BtnLogin />);

export default BtnSignUp