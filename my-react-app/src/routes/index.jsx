import React from "react"
import PathConstants from "./pathConstants"
import Home from "../pages/Home"
import Program from "../pages/Program"
import Schedule from "../pages/Schedule"
import Login from "../pages/Login"

const routes = [
    { path: PathConstants.HOME, element: <Home /> },
    { path: PathConstants.WORK_ORDERS, element: <Program /> },
    { path: PathConstants.SCHEDULE, element: <Schedule /> },
]

export const emptyRoutes = [
    { path: PathConstants.LOGIN, element: <Login /> },
]

export default routes
