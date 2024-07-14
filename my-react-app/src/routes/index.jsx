import React from "react"
import PathConstants from "./pathConstants"
import Home from "../pages/Home"
import Program from "../pages/Program"
import Schedule from "../pages/Schedule"

const routes = [
    { path: PathConstants.HOME, element: <Home /> },
    { path: PathConstants.WORK_ORDERS, element: <Program /> },
    { path: PathConstants.SCHEDULE, element: <Schedule /> },
]
export default routes
