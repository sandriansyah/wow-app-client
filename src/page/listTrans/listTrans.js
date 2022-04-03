import "./listTrans.css"
import Navbar from "../../component/navbar/navbar"
import{Dropdown,Table} from "react-bootstrap"

import {API} from "../../config/api"
import { useState,useEffect } from "react"
import { Navigate } from "react-router-dom"

function ListTrans(){

    const [transaction,setTransaction] =useState([])
    const [detailTrans,setDetailTrans] = useState({
        userStatus:"active",
        remainingActive:30,
        paymentStatus:"approve",
    }) 

    const [cancel,setCancel] = useState({
        userStatus:"",
        remainingActive:0,
        paymentStatus:"cancel",
    })

    // const [idTrans,setIdTrans] = useState(null)
    // console.log(idTrans);

    const getTransaction = async()=>{
        
        try {
            const response = await API.get("/transaction")       
            setTransaction(response.data.data.transaction)
        
        } catch (error) {
            console.log(error);
        }
    }
    // const [timeCoba,setTimeCoba] = useState("")
    // const getActiveTransaction = async ()=>{
    //     try {
    //         let time = new Date()
    //         const response = await API.get("/transactionActive")
            
    //         setTimeCoba(response.data.data.transaction[0].timeApprove)
    //         let distence = time - timeCoba

    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    useEffect(()=>{
        getTransaction()
       
    },[])


    const approveTrans = async(id,idUser)=>{
        try {

            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            setDetailTrans({
                userStatus:"active",
                timeApprove: new Date() ,
                remainingActive:30,
                paymentStatus:"approve",
            })

            const response = await API.patch(`/transaction/${id}`,detailTrans,config) 
            // const response = await API.patch(`/transaction/${id}`,detailTrans,config) 
            getTransaction()
            // Navigate("/listtrans")

            

        } catch (error) {
            console.log(error);
        }
    }

    const cancelTrans = async(id)=>{
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const response = await API.patch(`/transaction/${id}`,cancel,config) 
            console.log(response);
            getTransaction()
            Navigate("/listtrans")

            

        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div className="listTrans">
            <nav>
                <Navbar/>
            </nav>
            <div className="tableListTrans">
                {/* <button>cek time</button> */}
                <div className="titleTableListTrans">
                    <h5>Incoming Transaction</h5>
                </div>
                <table>     
                    <tr className="rowHead" >
                        <th>No</th>
                        <th>User</th>
                        <th>number Account</th>
                        <th>Bukti Transfer</th>
                        <th>Remaining Active</th>
                        <th>Status User</th>
                        <th>Status Payment</th>
                        <th>Action</th>
                    </tr>
                
                {transaction.map((item,index)=>{
                    let number = index + 1
                    if (number % 2 === 1) {
                        return( 
                    <tr className="rowBody1 " key = {item.id} >
                        <td >{number}</td>
                        <td>{item.user.fullName}</td>
                        <td>{item.numberAccount}</td>
                        <td>{item.transferProof}</td>
                        <td>{item.remainingActive}/Hari</td>
                        <td> 
                            {item.userStatus ? 
                            <p className="my-0 text-success fw-bold" >Active</p>: 
                            <p className="my-0 text-danger fw-bold">No-Active</p>}
                        </td>
                        <td>
                        {item.paymentStatus =="approve"?
                                    <p className="my-0 text-success fw-bold" >Approve</p>:
                                    item.paymentStatus =="cancel"? <p className="my-0 text-danger fw-bold" >Cancel</p>:
                                    <p className="my-0 text-warning fw-bold" >Pending ..</p> }
                        </td>
                        <td>
                            <Dropdown>
                                <Dropdown.Toggle variant="" id="dropdown-basic" className="shadow-none">
                                    <div className="triangle"></div>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={()=>{ approveTrans(item.id,item.idUser)}} style={{color:"#0ACF83",fontWeight:"bold"}} >Approved</Dropdown.Item>
                                    <Dropdown.Item onClick={()=>{ cancelTrans(item.id,item.idUser)}} style={{color:"red",fontWeight:"bold"}}>Cancel</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </td>
                    </tr>
                    )
                    }else{
                        return( 
                            <tr className="rowBody2 " key = {item.id} >
                                <td >{number}</td>
                                <td>{item.user.fullName}</td>
                                <td >{item.numberAccount}</td>
                                <td>{item.transferProof}</td>
                                <td>{item.remainingActive}/Hari</td>
                                <td> 
                                    {item.userStatus ? 
                                    <p className="my-0 text-success fw-bold" >Active</p>: 
                                    <p className="my-0 text-danger fw-bold">No-Active</p>}
                                </td>
                                <td>
                                    {item.paymentStatus =="approve"?
                                    <p className="my-0 text-success fw-bold" >Approve</p>:
                                    item.paymentStatus =="cancel"? <p className="my-0 text-danger fw-bold" >Cancel</p>:
                                    <p className="my-0 text-warning fw-bold" >Pending ..</p> }
                                </td>
                                <td>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="" id="dropdown-basic" className="shadow-none">
                                            <div className="triangle"></div>
                                        </Dropdown.Toggle>
        
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={()=>{ approveTrans(item.id)}} style={{color:"#0ACF83",fontWeight:"bold"}} >Approved</Dropdown.Item>
                                            <Dropdown.Item onClick={()=>{ cancelTrans(item.id)}} style={{color:"red",fontWeight:"bold"}}>Cancel</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                            </tr>
                            )
                    }                  
                })}
                </table>
            
            </div>
        </div>
    )
}

export default ListTrans