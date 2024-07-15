import React, { useState, useEffect } from 'react';
import ScheduleTable from "../components/Schedule_table"
import "./box.css"

export default function WorkOrders_main() {
  const [data, setData] = React.useState([]);

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
    <div className='rowC'>
      <ScheduleTable data={data}/>
    </div>
  );
}