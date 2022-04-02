import "./subscribe.css";
import Profile from "../../component/profile/profile";
import Logo2 from "../../media/Wow.png";
import ImgFile from "../../media/Vector.png";
import {Button, Modal} from "react-bootstrap"
import { UserContext } from "../../context/userContex";

import {API,setAuthToken} from "../../config/api"
import { useContext, useState,useEffect } from "react";
import { Navigate } from "react-router-dom";

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function Subscribe() {

  const [user,setUser] = useContext(UserContext)
  const [show,setShow] =useState(false)

  const [form,setForm] = useState({
    numberAccount:"",
    transferProof:"",
  })

  const closeModal = ()=>{
    setShow(false)
    setForm({
      numberAccount:"",
      transferProof:"",
    })
  }

  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]: 
        e.target.type === "file" ? e.target.files : e.target.value,
    })
  }

  const handleSubmit = async (e)=>{
    try {
      e.preventDefault();

      const config = { 
        headers: { 
        "Content-type": "multipart/form-data", 
        }, 
    }; 
    const formData = new FormData();
    formData.set("numberAccount",form.numberAccount);
    formData.set("transferProof",form.transferProof[0],form.transferProof[0].name);

    console.log(form.numberAccount);
    console.log(form.transferProof[0].name);

    const response = await API.post("/transaction",formData,config)

    console.log(response);
    if(response.status === 200){
      setShow(true)
    }

    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div>

    <Modal className="mt-5" show={show} onHide={closeModal}>
        <p className="text-success fw-bold m-4">Thank you for subscribing to premium, your premium package will be active after our admin approves your transaction, thank you</p>
    </Modal>

    <div className="subscribe">
      <div className="subscribeLeft">
        <Profile />
      </div>
      <div className="subscribeRight">
        <form className="form" onSubmit={handleSubmit}>
          <div className="description">
            <h1>Premium</h1>
            <div className="desc">
              <div className="descChild">
                <p>Pay now and access all the latest books from</p>
                <img src={Logo2} alt="" />
              </div>
              <div className="descChild2">
                <img src={Logo2} alt="" />
                <p>: 0981312323</p>
              </div>
            </div>
          </div>
          <div className="input">
            <input
              className="inputNumber"
              type="text"
              placeholder="Input your account number"
              name="numberAccount"
              onChange={handleChange}
            />
            <label>
              Attache proof of transfer
              <input className="fileInput" type="file" name="transferProof" onChange={handleChange} />
              <img src={ImgFile} alt="" />
            </label>
          </div>
        
          <button type="submit">Send</button>
          {/* <BtnSendSubs />  */}
        </form>
      </div>
    </div>
    </div>
  );
}

export default Subscribe;
