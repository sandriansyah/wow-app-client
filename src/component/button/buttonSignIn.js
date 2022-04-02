import "./buttonSignIn.css"
import {useState,useContext} from "react"
import {Modal,Alert} from "react-bootstrap"
import {renderMatches, useNavigate} from "react-router-dom"
import {ShowModalContext} from "../../context/showModalContext"
import {UserContext} from "../../context/userContex"

import {API, setAuthToken} from "../../config/api"

function BtnSignIn() {

    const [form,setForm] = useState({
        email:"",
        password:"",
    })

    const {email,password} = form
    const [message,setMessage] = useState(null)

    const [show, setShow] = useState(false);
    const [state,dispacth]= useContext(ShowModalContext)
    const [login,setLogin]= useContext(UserContext)

    const handleClose = () => {
        dispacth({
            type:'SHOW_MODAL',
            payload:{
                showSignUp:false,
                showSignIn:false
            }
        })
        setForm({
            email:"",
            password:"",
        })
        setMessage(null)

    }
    const handleShow = () => {
        dispacth({
            type:'SHOW_MODAL',
            payload:{
                showSignUp:false,
                showSignIn:true
            }
        })
    };

    const navigate = useNavigate()

    // const handleSignIn = ()=>{
    //     navigate("/home");
    // }

    const handleHere =()=>{
        dispacth({
            type:'SHOW_MODAL',
            payload:{
                showSignUp:true,
                showSignIn:false
            }
        })
    }

    const handleChange =(e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value,
        })
        // console.log({email})
        // console.log({password})
    }

    const handleSubmit = async(e)=>{
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
        const response = await API.post("/login",body,config)
        setAuthToken(response.data.data.token)

        if(response?.status == 200){
  
            setLogin({
                type:"LOGIN_SUCCESS",
                payload: response.data.data
            })
            const alert =   <Alert variant="success" className="py-1">
                                success
                            </Alert>
            setMessage(alert)

            // navigate("/home")
        }else{
            const alert =   <Alert variant="danger" className="py-1">
                                failed
                            </Alert>

            setMessage(alert)
        }

        //chech status
        if(response.data.data.status === "user"){

            navigate("/home")
        }else{
            navigate("/listtrans")
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

    }

    return (
    <>
        <button className="buttonSignIn" onClick={handleShow}>
        Sign In
        </button>

        <Modal className="modalFromBosstrap mt-5" show={state.show.showSignIn} onHide={handleClose}> 
            <div className="modalSignIn">
                <form onSubmit={handleSubmit} className="d-inline">
                <h3>Sign In</h3>
                {message}
                    <div>
                        <input type="email" name="email" placeholder="Email" onChange={handleChange} value={email}/>
                    </div>
                    <div>
                        <input type="password" name="password" placeholder="Password" onChange={handleChange} value={password}/>          
                    </div>
                    <button type="submit" >
                        Sign In
                    </button>
                    <p>Don't have an account ? Klik <b onClick={handleHere} style={{cursor:"pointer"}} >Here</b> </p>
                </form>
            </div>         
            
        </Modal>
    </>
    );
}

//   render(<BtnLogin />);

export default BtnSignIn