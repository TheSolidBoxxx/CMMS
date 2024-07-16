import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Layout from "./components/Layout"
import EmptyLayout from "./components/EmptyLayout"
import routes from './routes'
import {emptyRoutes} from './routes'

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      
      children: routes
    },
    {
      element: <EmptyLayout/>,

      children: emptyRoutes
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
