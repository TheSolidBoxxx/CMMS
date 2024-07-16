import React from 'react'
import Graphic from "../components/Graphic"
import authService from "./../service/authService";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [data, setData] = React.useState([]);
  const navigateTo = useNavigate();

  if(!authService.isLoggedIn()){

    React.useEffect(() => {
    navigateTo("/");
    }, []);

  }

  React.useEffect(() => {
    // Fetch data from the backend
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  if(data.length == 0) return;

  return (
    <Graphic data={data}/>
  )
}
