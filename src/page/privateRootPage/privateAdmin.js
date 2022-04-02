import { useContext } from "react";
import { UserContext } from "../../context/userContex";
import {Outlet,Navigate} from "react-router-dom"

const PrivateAdmin = ({element:Component, ...rest}) =>{

    const [state,dispacth]= useContext(UserContext)

    return state.user.status=="admin" ? <Outlet/> : <Navigate to="/home"/>;
};

export default PrivateAdmin