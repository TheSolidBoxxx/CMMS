import React, { useState, useEffect } from 'react';
import ScheduleTable from "../components/Schedule_table"
import "./box.css"
import authService from "./../service/authService";
import { useNavigate } from "react-router-dom";

export default function WorkOrders_main() {
  const [data, setData] = React.useState([]);
  const [tasksData, setTasksData] = React.useState([]);
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
    fetch("/tasks")
      .then((response) => response.json())
      .then((data) => {
        setTasksData(data);
      });
  }, []);

  if(data.length == 0 && tasksData.length == 0) return;

  for(let i = 0; i < data.length; i++){
    if(data[i].inicio == null && data[i].fin == null) continue;
    const date2 = new Date(data[i].inicio);
    const date3 = new Date(data[i].fin);

    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    data[i].inicio = date2.toLocaleDateString('en', options);
    data[i].fin = date3.toLocaleDateString('en', options);
  }

  return (
    <div className='rowC'>
      <ScheduleTable data={{data, tasksData}}/>
    </div>
  );
}