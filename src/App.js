import "bootstrap/dist/css/bootstrap.min.css"

import React,{useContext,useEffect} from "react";
import {UserContext} from "./context/userContex"
import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom"
import {useNavigate } from "react-router-dom"


import LandingPage from "./page/landingPage/landingPage";
import AfterLogin from "./page/afterlogin/afterlogin";
import Subscribe from "./page/subscribe/subsscribe";
import DetailBook from "./page/DetailBook/detailBook";
import ReadBook from "./page/readBook/readBook";
import AddBook from "./page/addBook/addBook";
import ListTrans from "./page/listTrans/listTrans";
import ProfileActiveSubscribe from "./page/profileActiveSubscribe/profileActiveSubscribe";
// import PrivateSubs from "./page/privateRootPage/privetSubs";
import PrivateAdmin from "./page/privateRootPage/privateAdmin";

import {API,setAuthToken} from "./config/api"

if (localStorage.token) {
  setAuthToken(localStorage.token)
}


function App() {

  let navigate = useNavigate();

  // // Init user context here ...
  const [state, dispatch] = useContext(UserContext)
  // console.log(state);

  // // Redirect Auth here ...
  useEffect(() => {

    
    if (!state.isLogin) {
      navigate("/")
    } 
    else {
      if (state.user.status == "admin") {
        navigate("/listtrans");
      } else if (state.user.status == "user") {
        navigate("/home");
      }
    }
    if(!localStorage.token){
      navigate("/")
    }

  }, [state])

  const checkUser = async()=>{
    try {
      
      const response = await API.get("/checkauth")
      if(response.status === 404){
        return dispatch({
          type:"AUTH_ERROR"
        })
      }

      let payload = response.data.data.user 
      payload.token = localStorage.token 

      dispatch({
        type:"USER_SUCCESS",
        payload
      })

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkUser()
  }, [])


  return (
      // <Router>

     
    
        <Routes>

          <Route exact path="/" element={<LandingPage/>} />
          <Route exact path="/home" element={<AfterLogin/>} />        
          <Route exact path="/subscribe" element={<Subscribe/>} />
          <Route exact path="/bookdetail/:id" element={<DetailBook/>} />
          <Route exact path="/readbook/:id" element={<ReadBook/>} />
          
          <Route exact path="/profile" element={<ProfileActiveSubscribe/>} /> 


          <Route exact path="/" element={<PrivateAdmin/>} >
            <Route exact path="/addbook" element={<AddBook/>} />
            <Route exact path="/listtrans" element={<ListTrans/>} /> 
          </Route>

        </Routes>
        
      // </Router>
  );
}

export default App;
