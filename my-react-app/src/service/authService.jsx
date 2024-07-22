import { useNavigate } from "react-router-dom";

const doLogIn = (username, no_responsable, apellido, ocupacion) => {
    localStorage.setItem("username", username);
    localStorage.setItem("no_responsable", no_responsable);
    localStorage.setItem("apellido", apellido);
    localStorage.setItem("ocupacion", ocupacion);

    localStorage.setItem("isLoggedIn", true);
  };
  
  const isLoggedIn = () => {
    return Boolean(localStorage.getItem("isLoggedIn"));
  };
  
  
  const logOut = () =>{
    //const navigateTo = useNavigate();
  
    localStorage.removeItem("username");
    localStorage.removeItem("no_responsable");
    localStorage.removeItem("apellido");
    localStorage.removeItem("ocupacion");

    localStorage.removeItem("isLoggedIn");
    //navigateTo("/");
  
  };
  
  export default {
    doLogIn,
    isLoggedIn,
    logOut
  };
  