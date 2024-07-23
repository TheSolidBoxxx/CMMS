import * as React from 'react';
import { Link } from 'react-router-dom';
import PathConstants from "../routes/pathConstants";
import TasksModal from "./Modals/TasksModal"
import ReactDOM from "react-dom/client";
import Tasks from "../databases/tareas.json"

import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';

import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import Send from '../icons/Send'
import { green } from '@mui/material/colors';

import "./Schedule_table.css"

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

function mapDates(){
  const year = 2024;
  const weeksStartDates = [];
  let currentDate = new Date(year, 0, 1);

  // Ensure the current date is the start of the week (Monday)
  while (currentDate.getDay() !== 1) {
      currentDate.setDate(currentDate.getDate() + 1);
  }

  // Loop through the year, adding one week at a time
  while (currentDate.getFullYear() === year) {
      weeksStartDates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 7);
  }

  const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
  const formattedWeeks = weeksStartDates.map(date => date.toLocaleDateString('en-US', options));
  return formattedWeeks;
}

function createData(id, no_responsable, apellido, no_req, inicio, fin, tiempo, intervalo, fecha_plan, grado, tiempo_real, tipo) {
  const date_inicio = new Date(inicio);
  const options = { month: '2-digit', day: '2-digit', year: 'numeric' };

  inicio == null ? '' : date_inicio.toLocaleDateString('en', options);

  const date_fin = new Date(fin);
  fin == null ? '' : date_fin.toLocaleDateString('en', options);

  const date_plan = new Date(fecha_plan);
  fecha_plan = date_plan.toLocaleDateString('en', options);

  return {
        id,
        no_responsable, 
        apellido, 
        no_req, 
        inicio, 
        fin, 
        tiempo,
        intervalo,
        fecha_plan,
        grado,
        tiempo_real,
        tipo
    };
  }

  function createTaskData(id, status, inicio, fin, tiempo_real, hecho, pos) {
    const date_inicio = new Date(inicio);
    const options = { month: '2-digit', day: '2-digit', year: 'numeric' };

    inicio == null ? '' : date_inicio.toLocaleDateString('en', options);

    const date_fin = new Date(fin);
    fin == null ? '' : date_fin.toLocaleDateString('en', options);

    return {
          id,
          status, 
          inicio, 
          fin, 
          tiempo_real, 
          hecho, 
          pos,
      };
    }
  
  // const rows = [
  //   createData(1, 'Máquina 1', 'PUT001', 'FCK001', 'Alcohol, isopos y trapo', 3, 'Diseño', 'Limpiar', 'Semanal', 'Preventivo', 15),
  //   createData(6913, 'Hassell Pulido', 'PUT002', '15/01/2024', '15/01/2024', 120),
  // ];
  
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  // Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
  // stableSort() brings sort stability to non-modern browsers (notably IE11). If you
  // only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
  // with exampleArray.slice().sort(exampleComparator)
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  
  const headCells = [
    {
      id: 'id',
      numeric: false,
      disablePadding: true,
      label: 'ID',
    },
    {
      id: 'no_responsable',
      numeric: false,
      disablePadding: true,
      label: 'Número de responsable',
    },
    {
      id: 'apellido',
      numeric: false,
      disablePadding: false,
      label: 'Apellido',
    },
    {
      id: 'no_req',
      numeric: false,
      disablePadding: false,
      label: 'Número de requerimiento',
    },
    {
      id: 'inicio',
      numeric: false,
      disablePadding: false,
      label: 'Fecha de inicio',
    },
    {
      id: 'fin',
      numeric: false,
      disablePadding: false,
      label: 'Fecha de fin',
    },
    {
      id: 'tiempo',
      numeric: false,
      disablePadding: false,
      label: 'Tiempo real',
    },
  ];
  
  function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
      props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    const currentDate = new Date();
  
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
          {mapDates().map((data, i) => {
            const d = new Date(data);
            let time_diff = d.getTime() - currentDate.getTime();
            let day_diff = time_diff / (1000 * 60 * 60 * 24);

            return(
            <TableCell style={{backgroundColor: day_diff > -7 && day_diff < 0 ? '#f94449' : 'white', color: day_diff > -7 && day_diff < 0 ? 'white' : 'black', minWidth:'25px', borderRadius:'25%', fontWeight:'bold'}}
              key={i}
              align={'left'}
              padding={'normal'}
            >
              <div style={{writingMode: 'vertical-lr', width:'5px'}}>{data}</div>
              {orderBy === i ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableCell>
            )
          })}
        </TableRow>
      </TableHead>
    );
  }
  
  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };
  
  function EnhancedTableToolbar(props) {
    const { numSelected } = props;
  
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%', fontWeight:'bold' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Cronograma
          </Typography>
        )}
  
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
  }
  
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  function RegistryTask(dbData){
    let nw_list = []

    for(let i = 0; i < 16; i++)
      nw_list[i] = 0;

    for(let i = 1; i < dbData.status.length; i++){
      nw_list[parseInt(dbData.status[i].substring(0,1)) - 1] = 1;
    }

    let reversed = nw_list.reverse();

    const parseArray = arr => {
      return arr.reduce((acc, val) => {
        return (acc << 1) | val;
      });
    };

    dbData.status = parseArray(reversed);
    dbData.pos = dbData.mtArray.indexOf(dbData.pos);
    delete dbData["mtArray"];

    //console.log(dbData);
    fetch('/api', {
      method: 'PATCH',
      
      body: JSON.stringify(dbData),
      headers: {'Content-Type': 'application/json'},
    })
    .then((incoming) => incoming.json())
    .then((response) => {
      //console.log(response.header);
      //Alert.alert(JSON.stringify(response.body));
    });

    fetch('/tasks', {
      method: 'POST',
      
      body: JSON.stringify(dbData),
      headers: {'Content-Type': 'application/json'},
    })
    .then((incoming) => incoming.json())
    .then((response) => {
      //console.log(response.header);
      //Alert.alert(JSON.stringify(response.body));
    });

    window.location.reload();
  }

export default function Schedule_table({data}) {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('id');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);

    const [open, setOpen] = React.useState(false);
    const [req, setReq] = React.useState("TAREA C215-A");
    const [ph_id, setPh_id] = React.useState(0);
    const [pos, setPos] = React.useState(0);
    const [mtArr, setMtArr] = React.useState([]);
    const [compTasks, setCompTasks] = React.useState({});
    const [checked, setChecked] = React.useState([0]);
    const handleOpen = (key, id, pos, mtArr, compTasks) => {setOpen(true); setReq(key); setPh_id(id); setPos(pos); setMtArr(mtArr); setCompTasks(compTasks);}
    const handleClose = () => {setOpen(false); checked.fill(0)};

    const currentDate = new Date();    

    const [task, setTask] = React.useState('');
    const [responsible, setResponsible] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [mtType, setMtType] = React.useState('');
    const [priority, setPriority] = React.useState('');
    const [date, setDate] = React.useState(dayjs());
    const [denominacion, setDenominacion] = React.useState('');
    const [desc, setDesc] = React.useState('');
    const [interval, setInterval] = React.useState(7);
    const [realTime, setRealTime] = React.useState('');

    const [startDate, setStartDate] = React.useState(dayjs());
    const [endDate, setEndDate] = React.useState(dayjs());

    const handleDenominacion = (event) => {
      setDenominacion(event.target.value);
    };

    const handleChangeTask = (event) => {
      setTask(event.target.value);
    };

    const handleChangeResponsible = (event) => {
      setResponsible(event.target.value);
    };

    const handleChangeLocation = (event) => {
      setLocation(event.target.value);
    };

    const handleChangeMtType = (event) => {
      setMtType(event.target.value);

      switch(event.target.value){
        case 1:
          setInterval(0);
          setPriority(3);
          break;
        
        case 2:
        case 3:
          setInterval(7);
          break;
      }
    };

    const handleChangePriority = (event) => {
      setPriority(event.target.value);
    };

    const handleChangeDesc = (event) => {
      setDesc(event.target.value);
    };

    const handleChangeInterval = (event) => {
      event.target.value = event.target.value < 7 ? 7 : event.target.value;
      event.target.value = event.target.value > 365 ? 365 : event.target.value;
      console.log(event.target.value < 7);
      setInterval(event.target.value);
    };

    const handleChangeRealTime = (event) => {
      setRealTime(event.target.value);
    };

    const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setChecked(newChecked);
    };

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 800,
      height: 800,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };

    let rows = [];
    let rowsTasks = [];
    const today = dayjs();
    const nextYear = dayjs().add(1, 'year');

    for(let i = 0; i < data.data.length; i++){
      rows[i] = createData(Object.values(data.data)[i].id, Object.values(data.data)[i].no_responsable, Object.values(data.data)[i].apellido, Object.values(data.data)[i].no_req,
                          Object.values(data.data)[i].inicio, Object.values(data.data)[i].fin, Object.values(data.data)[i].tiempo, Object.values(data.data)[i].intervalo,
                          Object.values(data.data)[i].fecha_plan, Object.values(data.data)[i].grado, Object.values(data.data)[i].tiempo_real,
                          Object.values(data.data)[i].tipo);
    }

    for(let i = 0; i < data.tasksData.length; i++){
      rowsTasks[i] = createTaskData(Object.values(data.tasksData)[i].order_id, Object.values(data.tasksData)[i].status,
                          Object.values(data.tasksData)[i].inicio, Object.values(data.tasksData)[i].fin, Object.values(data.tasksData)[i].tiempo_real, Object.values(data.tasksData)[i].hecho,
                          Object.values(data.tasksData)[i].pos);
    }

    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelected = rows.map((n) => n.id);
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    };
  
    const handleClick = (event, id) => {
      const selectedIndex = selected.indexOf(id);
      let newSelected = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
      setSelected(newSelected);
    };
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const handleChangeDense = (event) => {
      setDense(event.target.checked);
    };
  
    const isSelected = (id) => selected.indexOf(id) !== -1;
  
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  
    const visibleRows = React.useMemo(
      () =>
        stableSort(rows, getComparator(order, orderBy)).slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage,
        ),
      [order, orderBy, page, rowsPerPage],
    );
  
    return (
      <div style={{marginTop:25, marginLeft:15}}>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2, borderRadius: 5, boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  let mt_array = []
  
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onClick={(event) => handleClick(event, row.id)}
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell align="left">{row.id}</TableCell>
                      <TableCell align="left">{row.no_responsable}</TableCell>
                      <TableCell align="left">{row.apellido}</TableCell>
                      <TableCell align="left">{row.no_req}</TableCell>
                      <TableCell align="left">{row.inicio}</TableCell>
                      <TableCell align="left">{row.fin}</TableCell>
                      <TableCell align="left">{row.tiempo_real != null ? `${row.tiempo_real} minutos` : ''}</TableCell>
                      {mapDates().map(function(data, i){
                        const d1 = new Date(row.fecha_plan)
                        const d2 = new Date(data);
                        let time_diff = d2.getTime() - d1.getTime();  
                        let day_diff = time_diff / (1000 * 60 * 60 * 24);
                        
                        if((row.intervalo - ((i*7) % row.intervalo) <= 7 && row.grado != 1 && day_diff > -7) || (day_diff > -7 && day_diff <= 0 && row.grado == 1)){
                          let Ctime_diff = d2.getTime() - currentDate.getTime();  
                          let Cday_diff = Ctime_diff / (1000 * 60 * 60 * 24);
                          
                          mt_array.push(i);

                          for(let j = 0; j < rowsTasks.length; j++){
                            if(rowsTasks[j].id == row.id && rowsTasks[j].pos == mt_array.length - 1){
                              return(
                                <TableCell align="center" key={i} style={{backgroundColor: '#3bb143', color:'white', borderRadius:'50%'}}
                                onClick={() => handleOpen(row.tipo, row.id, i, mt_array, rowsTasks[j])}>
                                  {row.grado == 1? 'MC': row.grado == 2? 'MPT': 'MPD'}</TableCell>
                              )     
                            } 
                          }
                          
                          return(
                            <TableCell className={Cday_diff > -7 && Cday_diff < 0 ? 'blink' : ''} align="center" key={i} style={{backgroundColor: row.grado == 1? '#FFC000': row.grado == 2? '#2F75B5': '#F4B084', color:'white', borderRadius:'50%'}}
                            onClick={() => handleOpen(row.tipo, row.id, i, mt_array, {})}>
                              {row.grado == 1? 'MC': row.grado == 2? 'MPT': 'MPD'}</TableCell>
                          )                       
                        }else{
                          return(
                            <TableCell align="left" key={i}></TableCell>
                          )
                        }
                      })}
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>

    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h4" component="h2" align='center' sx={{ mt: 2, mb: 2, color:'black'}}>
            {req}
          </Typography>
          <Typography id="transition-modal-description" component="span" sx={{ mt: 2, color:'black', fontSize: 16, m: 1 }}>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {Tasks[req].map((value, i) => {
                const labelId = `checkbox-list-label-${value}`;
                return (
                  <ListItem
                    key={value}
                    disablePadding
                  >
                    <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                      <ListItemIcon>
                        <Checkbox
                          disabled={compTasks.hecho == false || compTasks.hecho == undefined ? false : true}
                          edge="start"
                          checked={compTasks.hecho == false || compTasks.hecho == undefined ? checked.indexOf(value) !== -1 : (compTasks.status & (1 << i)) !== 0}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={`${value}`} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Typography>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker minDate={today} maxDate={nextYear}
              label="Fecha inicio"
              value={compTasks.hecho == true ? dayjs(compTasks.inicio) : startDate}
              disabled={compTasks.hecho == true ? true : false}
              onChange={(newValue) => setStartDate(newValue)}
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker minDate={today} maxDate={nextYear}
              label="Fecha fin"
              value={compTasks.hecho == true ? dayjs(compTasks.fin) : endDate}
              disabled={compTasks.hecho == true ? true : false}
              onChange={(newValue) => setEndDate(newValue)}
            />
          </LocalizationProvider>

          <TextField  style = {{width: 150}}
            id="outlined-number"
            label="Tiempo real (mins)"
            type="number"
            disabled={compTasks.hecho == true ? true : false}
            value={compTasks.hecho == true ? compTasks.tiempo_real : realTime}
            onChange={handleChangeRealTime}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <Box sx={{mt:4}} textAlign='center'>
            <Button variant="contained" disabled={compTasks.hecho == true ? true : false} endIcon={<Send />} onClick={() => RegistryTask(
              {
                "id": ph_id,
                "status": checked,
                "inicio": startDate,
                "fin": endDate,
                "tiempo_real": realTime,
                "hecho": true,
                "pos": pos,
                "mtArray": mtArr
              }
            )}>
              ENVIAR
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
    </div>
    );
}
