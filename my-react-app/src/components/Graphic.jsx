import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export default function Graphic({data}) { //Tasks[req].map((value) => {
  var correctivo = 0, preventivo = 0, predictivo = 0;
  var p1 = 0, p2 = 0, p3 = 0;
  var onTime = 0, overdue = 0;
  var pending = 0, made = 0;

  const currentDate = new Date();
  for(let i = 0; i < data.length; i++){
    data[i].grado == 1 ? correctivo++ : data[i].grado == 2 ? preventivo++ : predictivo++;
    data[i].prioridad == 1 ? p1++ : data[i].prioridad == 2 ? p2++ : p3++;

    const regDate = new Date(data[i].fecha_plan);
    var dayDiff = Math.round((regDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
    dayDiff >= 0 ? onTime++ : overdue++;

    data[i].hecho == true ? made++ : pending++
  }

  return (
    <div>
      <Box width={1320}>
        <BarChart
          series={[
            { data: [onTime, overdue] },
          ]}
          width={300}
          height={290}
          xAxis={[{ data: ['A tiempo', 'Overdue'], scaleType: 'band' }]}
          margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        />
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
            height={200}
        />

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
            height={200}
        />

        <TextField style = {{width: 100}}
            id="filled-read-only-input"
            label="Pendientes"
            InputProps={{
              readOnly: true,
            }}
            value={pending}
        />

        <BarChart
          series={[
            { data: [pending, made] },
          ]}
          width={300}
          height={290}
          xAxis={[{ data: ['Pendientes', 'Realizados'], scaleType: 'band' }]}
          margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        />
      </Box>
    </div>
  );
}