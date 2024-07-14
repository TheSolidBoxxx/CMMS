import React, { useState, useEffect } from 'react';
import MaintenanceTable from "../components/Maintenance_table"

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

  for(let i = 0; i < data.length; i++){
    const date = new Date(data[i].fecha_plan);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    data[i].fecha_plan = date.toLocaleDateString('en', options);
  }

  return (
    <div>
      <MaintenanceTable data={data}/>
    </div>
  );
}