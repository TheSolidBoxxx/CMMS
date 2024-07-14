import React from 'react'
import Graphic from "../components/Graphic"

export default function Home() {
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
    <Graphic data={data}/>
  )
}
