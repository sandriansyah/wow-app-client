import "./buttonSendSubscribe.css"
import {Modal,Button} from "react-bootstrap"
import {useState,useContext} from "react" 

import {SubsContext} from "../../context/subsContext"

function BtnSendSubs() {

    const [state,dispacth] =useContext(SubsContext)

    const [show, setShow] = useState(false);

    const handleClose = () => {

        const statusSubs = true

        setShow(false)
        
        dispacth({
            type:'SUBSCRIBED',
            payload:statusSubs
        })

    };
    function handleShow(){
        setShow(true);
    } 

    const handleSubs = ()=>{
    
        const statusSubs = true
    
        dispacth({
            type:'SUBSCRIBED',
            payload:statusSubs
        })

        setShow(false)
        
    }
    
    return (
    <>
        <Button className="btnSendSubs"  onClick={handleShow}>
        Send
        </Button>

        <Modal onClick={handleSubs} className="modalSubs" show={show} onHide={handleClose}> 
        <div className="Paragraf">
            <p> Thank you for subscribing to premium, your premium package will be active after our admin approves your transaction, thank you </p>
        </div>                                                      
        </Modal>
    </>
    );
}

//   render(<BtnLogin />);

export default BtnSendSubs

