import { useNavigate } from "react-router-dom";

const doLogIn = (username) => {
    localStorage.setItem("username", username);
    localStorage.setItem("isLoggedIn", true);
  };
  
  const isLoggedIn = () => {
    return Boolean(localStorage.getItem("isLoggedIn"));
  };
  
  
  const logOut = () =>{
    //const navigateTo = useNavigate();
  
    localStorage.removeItem("username");
    localStorage.removeItem("isLoggedIn");
    //navigateTo("/");
  
  };
  
  export default {
    doLogIn,
    isLoggedIn,
    logOut
  };
  