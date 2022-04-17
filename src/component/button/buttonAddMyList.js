import { useContext,useState } from "react"
import IconSaveList from "../../media/saveList.png"
import "./buttonAddMyList.css"
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom"

import {API} from "../../config/api"

function ButtonAddMyList(props){
    // console.log(dataBook[0])
    const navigate=useNavigate()

    const id = {
        idBook: props.idBook
    }

    const [book,setBook] = useState({
        idBook: props.idBook,
    })


    const handleButton= async(e)=>{

        try {
            e.preventDefault();
            const config = { 
                headers: { 
                "Content-type": "application/json", 
                }, 
            };
            const body = JSON.stringify(id)
            const response = await API.post("/mylistbook",body,config)
            
            navigate("/profile")
        } catch (error) {
            console.log(error); 
        }

    }
        

    return(
        <div>
            <Button sx={{bgcolor:"primary.dark", marginRight:"15px"}} variant="contained" onClick={handleButton} >Add Mylist Book <img src={IconSaveList} alt="" className="ms-2"/> </Button>
        </div>
    )
}

export default ButtonAddMyList