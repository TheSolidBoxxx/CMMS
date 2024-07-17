import React, { useState, useEffect } from 'react';
import MaintenanceTable from "../components/Maintenance_table"
import authService from "./../service/authService";
import { useNavigate } from "react-router-dom";

export default function WorkOrders_main() {
  const [data, setData] = React.useState([]);
  const [usrData, setUsrData] = React.useState([]);
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

  React.useEffect(() => {
    // Fetch data from the backend
    fetch("/usrs")
      .then((response) => response.json())
      .then((data) => {
        setUsrData(data);
      });
  }, []);

  if(data.length == 0 && usrData.length == 0) return;

  for(let i = 0; i < data.length; i++){
    const date = new Date(data[i].fecha_plan);
    const date2 = new Date(data[i].inicio);
    const date3 = new Date(data[i].fin);

    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    data[i].fecha_plan = date.toLocaleDateString('en', options);
    data[i].inicio = date2.toLocaleDateString('en', options);
    data[i].fin = date3.toLocaleDateString('en', options);
  }

  return (
    <div>
      <MaintenanceTable data={{data, usrData}}/>
    </div>
  );
}