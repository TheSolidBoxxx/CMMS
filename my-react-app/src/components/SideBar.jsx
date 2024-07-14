import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import PathConstants from "../routes/pathConstants";

import Dashboard from '../icons/Dashboard'
import Program from '../icons/Program'
import Schedule from '../icons/Schedule'

export default function SideBar() {
  return (
    <>
      <Sidebar>
      <Menu
    menuItemStyles={{
      button: {
        backgroundColor: '#222222',
        color: '#ffffff',
        "&:hover": {
          backgroundColor: '#ff0000',
          color: '#000000',
        },
      },
    }}
  >
    <MenuItem component={<Link to={PathConstants.HOME} />} icon={<Dashboard/>}> Dashboard</MenuItem>
    <MenuItem component={<Link to={PathConstants.SCHEDULE} />} icon={<Schedule/>}> Cronograma</MenuItem>
    <MenuItem component={<Link to={PathConstants.WORK_ORDERS} />} icon={<Program/>}> Programa</MenuItem>
  </Menu>
      </Sidebar>
    </>
  );
}
