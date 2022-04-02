import React, {useContext} from "react";
import Logo from "../../media/Icon.png";
import "./landingPage.css";
import BtnSignUp from "../../component/button/buttonSignUp";
import BtnSignIn from "../../component/button/buttonSignIn";
import { ShowModalContext } from "../../context/showModalContext";



function LandingPage() {
  const [state,dispacth] = useContext(ShowModalContext)


  return (
    <div className="containerLanding">
      <div className="contentLanding">
        <img src={Logo} alt="" />
        <div>
          <p>
            Sign-up now and subscribe to enjoy all the cool and latest books -
            The best book rental service provider in Indonesia
          </p>
        </div>
        <BtnSignUp/>
        <BtnSignIn />
      </div>
    </div>
  );
}

export default LandingPage;
