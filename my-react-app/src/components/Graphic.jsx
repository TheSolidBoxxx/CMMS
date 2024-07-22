import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Paper } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';

export default function Graphic({data}) { //Tasks[req].map((value) => {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    }
  }, []);

  var correctivo = 0, preventivo = 0, predictivo = 0;
  var p1 = 0, p2 = 0, p3 = 0;
  var onTime = 0, overdue = 0;
  var pending = 0, made = 0;
  let monthsCount = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

  const currentDate = new Date();
  for(let i = 0; i < data.length; i++){
    const date_plan = new Date(data[i].fecha_plan);
    const date_fin = new Date(data[i].fin);

    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };

    data[i].grado == 1 ? correctivo++ : data[i].grado == 2 ? preventivo++ : predictivo++;
    data[i].prioridad == 1 ? p1++ : data[i].prioridad == 2 ? p2++ : p3++;

    const regDate = new Date(data[i].fecha_plan);
    let dayDiff = Math.round((regDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
    dayDiff >= 0 ? onTime++ : overdue++;

    data[i].fecha_plan = date_plan.toLocaleDateString('en', options);
    data[i].fin = date_fin.toLocaleDateString('en', options);

    let index_to_fill = 0;
    if(data[i].hecho == false && dayDiff >= 0) index_to_fill = 0; // Pending on-time
    else if(data[i].hecho == false && dayDiff < 0) index_to_fill = 1; // Pending overdue
    else if(data[i].hecho == true && data[i].fecha_plan >= data[i].fin) index_to_fill = 2; // Completed on-time,
    else if(data[i].hecho == true && data[i].fecha_plan < data[i].fin) index_to_fill = 3; // Completed overdue

    monthsCount[regDate.getMonth()][index_to_fill]++;

    data[i].hecho == true ? made++ : pending++
  }

  let transposed = [];

  // Initialize the transposed array with empty subarrays
  for (let i = 0; i < monthsCount[0].length; i++) {
      transposed.push([]);
  }

  // Fill the transposed array with values from the original array
  for (let i = 0; i < monthsCount.length; i++) {
      for (let j = 0; j < monthsCount[i].length; j++) {
          transposed[j].push(monthsCount[i][j]);
      }
  }

  function formatDateTime() {
    const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const dayOfWeek = daysOfWeek[time.getDay()];
    const day = time.getDate();
    const month = months[time.getMonth()];
    const year = time.getFullYear();
    const hours = String(time.getHours()).padStart(2, '0');
    const minutes = String(time.getMinutes()).padStart(2, '0');
    const seconds = String(time.getSeconds()).padStart(2, '0');

    const timezoneOffset = -time.getTimezoneOffset() / 60;
    const timezone = `GMT${timezoneOffset >= 0 ? '+' : ''}${timezoneOffset}`;

    return `${dayOfWeek} ${day} de ${month}, ${year}. ${hours}:${minutes}:${seconds} ${timezone}`;
  }

  const username = localStorage.getItem("username");
  const apellido = localStorage.getItem("apellido");
  const initials = username.charAt(0) + username.split(".")[1].charAt(0);

  return (
    <div>
      <Box width={1320} sx={{display:'flex', flexWrap:'wrap', justifyContent:'space-between'}}>
        
        <Box sx={{padding: 2, borderRadius: 2, mt:3, ml:3, backgroundColor: '#e6e6ee', width:'500px'}}>
          <Stack direction="row" spacing={2}>  <Avatar sx={{ bgcolor: deepOrange[500] }}>{initials}</Avatar>
            <h2>Bienvenido de vuelta, {apellido}</h2>
          </Stack>
        </Box>

        <Box sx={{padding: 2, borderRadius: 2, mt:3, ml:3, mr:12.5, backgroundColor: '#e6e6ee', width:'600px'}}>
        <Stack direction="row" spacing={2}>
        <h3>{formatDateTime()}</h3>
          </Stack>
        </Box>
        
      </Box>

      <Box width={1320} sx={{display:'flex', flexWrap:'wrap'}}>
        <Paper elevation={3} sx={{padding: 2, borderRadius: 5, boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', mt:2, ml:3}}>
          <h2 style={{textAlign: 'center'}}>Tiempos de tareas</h2>
          <BarChart
            series={[
              { data: [onTime, overdue] },
            ]}
            width={250}
            height={300}
            xAxis={[{ data: ['A tiempo', 'Overdue'], scaleType: 'band',colorMap: {
              type: 'ordinal',
              colors: ['#3bb143', '#f94449'],
            } }]}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
          />
        </Paper>

        <Paper elevation={3} sx={{padding: 2, borderRadius: 5, boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', mt:2, ml:5}}>
          <h2 style={{textAlign: 'center'}}>Tipos de mantenimiento</h2>
          <PieChart
            series={[
              {
              data: [
                  { id: 0, value: correctivo, label: 'Correctivo', color: '#FFC000'},
                  { id: 1, value: preventivo, label: 'Preventivo', color: '#2F75B5' },
                  { id: 2, value: predictivo, label: 'Predictivo', color: '#F4B084' },
              ],
              },
            ]}
            width={400}
            height={230}
          />
        </Paper>

        <Paper elevation={3} sx={{padding: 2, borderRadius: 5, boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', mt:2, ml:5}}>
        <h2 style={{textAlign: 'center'}}>Prioridades</h2>
          <PieChart
              series={[
                  {
                  data: [
                      { id: 0, value: p1, label: 'Prioridad 1', color: 'green' },
                      { id: 1, value: p2, label: 'Prioridad 2', color: 'yellow' },
                      { id: 2, value: p3, label: 'Prioridad 3', color: 'red' },
                  ],
                  },
              ]}
              width={400}
              height={230}
          />
        </Paper>

        <Paper elevation={3} sx={{padding: 2, borderRadius: 5, boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', mt:5, ml:3}}>
        <h2 style={{textAlign: 'center'}}>Prioridades</h2>
          <BarChart
            series={[
              { data: [pending, made] },
            ]}
            width={250}
            height={300}
            xAxis={[{ data: ['Pendientes', 'Realizados'], scaleType: 'band',colorMap: {
              type: 'ordinal',
              colors: ['#708090', '#151b54'],
            } }]}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
          />
        </Paper>

        <Paper elevation={3} sx={{padding: 2, borderRadius: 5, boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', mt:5, ml:5, mr:9}}>
        <h2 style={{textAlign: 'center'}}>Estado de tareas por mes</h2>
          <BarChart
            series={[
              { data: transposed[0], label: 'Pendiente a tiempo' }, //Pending on-time, pending overdue, completed on-time, completed overdue
              { data: transposed[1], label: 'Pendiente overdue' },
              { data: transposed[2], label: 'Completado a tiempo' },
              { data: transposed[3], label: 'Completado overdue' },
            ]}
            height={300}
            width={870}
            xAxis={[{ data: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Dciembre'], scaleType: 'band' }]}
            yAxis={[{label: 'Cantidad', tickMaxStep:1, tickMinStep:1}]}
            margin={{ top: 50, bottom: 20, left: 40, right: 10 }}
          />
        </Paper>
      </Box>
    </div>
  );
}