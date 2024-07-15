import * as React from 'react';
import { Link } from 'react-router-dom';
import PathConstants from "../routes/pathConstants";
import TasksModal from "./Modals/TasksModal"
import ReactDOM from "react-dom/client";
import Tasks from "../databases/tareas.json"
import Locations from "../databases/locations.json"

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
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

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
import Add from '../icons/Add'

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import dayjs from 'dayjs';

function createData(id, no_req, denominacion, tipo, fecha_plan, prioridad, hecho, ubicacion, grado, descripcion, intervalo, dias, dia) {
  return {
        id, 
        no_req,
        denominacion, 
        tipo, 
        fecha_plan, 
        prioridad,
        hecho, 
        ubicacion, 
        grado, 
        descripcion, 
        intervalo,
        dias,
        dia
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
      id: 'no_req',
      numeric: false,
      disablePadding: true,
      label: 'Número de requerimiento',
    },
    {
      id: 'denominacion',
      numeric: false,
      disablePadding: false,
      label: 'Denominación',
    },
    {
      id: 'nomenclatura',
      numeric: false,
      disablePadding: false,
      label: 'Tipo de tarea',
    },
    {
      id: 'dias',
      numeric: false,
      disablePadding: false,
      label: 'Días hábiles',
    },
    {
      id: 'fecha_plan',
      numeric: false,
      disablePadding: false,
      label: 'Fecha planificada',
    },
    {
      id: 'prioridad',
      numeric: false,
      disablePadding: false,
      label: 'Prioridad',
    },
    {
      id: 'dia',
      numeric: false,
      disablePadding: false,
      label: 'Día',
    },
    {
      id: 'hecho',
      numeric: false,
      disablePadding: false,
      label: 'Hecho',
    },
    {
      id: 'ubicacion',
      numeric: false,
      disablePadding: false,
      label: 'Ubicación',
    },
    {
      id: 'grado',
      numeric: false,
      disablePadding: false,
      label: 'Grado',
    },
    {
      id: 'descripcion',
      numeric: false,
      disablePadding: false,
      label: 'Descripción',
    },
    {
      id: 'intervalo',
      numeric: false,
      disablePadding: false,
      label: 'Intérvalo',
    },
  ];
  
  function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
      props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
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
    const { numSelected, selected } = props;
  
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
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Programa
          </Typography>
        )}
  
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton  onClick={() => DeleteData(
              {"selected": selected, "numSelected": numSelected}
            )}>
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

  function DeleteData(dbData){
    fetch('/api', {
      method: 'DELETE',
      
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

  function RegistryTask(dbData){
    var nw_list = []

    for(let i = 0; i < 8; i++)
      nw_list[i] = 0;

    for(let i = 1; i < dbData.status.length; i++){
      nw_list[parseInt(dbData.status[i].substring(0,1)) - 1] = 1;
    }

    const parseArray = arr => {
      return arr.reduce((acc, val) => {
        return (acc << 1) | val;
      });
    };

    dbData.status = parseArray(nw_list);

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

    window.location.reload();
  }

  function RegistryUI(dbData){
    fetch('/api', {
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

export default function Maintenance_table({data}) {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('id');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [open, setOpen] = React.useState(false);
    const [req, setReq] = React.useState("TAREA C215-A");
    const [ph_id, setPh_id] = React.useState(0);
    const handleOpen = (key, id) => {setOpen(true); setReq(key); setPh_id(id)}
    const handleClose = () => setOpen(false);

    const [openReg, setOpenReg] = React.useState(false);
    const [reg, setReg] = React.useState();
    const handleOpenReg = () => {setOpenReg(true)};
    const handleCloseReg = () => setOpenReg(false);

    const [checked, setChecked] = React.useState([0]);

    const [task, setTask] = React.useState('');
    const [responsible, setResponsible] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [mtType, setMtType] = React.useState('');
    const [priority, setPriority] = React.useState('');
    const [date, setDate] = React.useState(dayjs());
    const [denominacion, setDenominacion] = React.useState('');
    const [desc, setDesc] = React.useState('');
    const [interval, setInterval] = React.useState('');
    const [realTime, setRealTime] = React.useState('');

    const [startDate, setStartDate] = React.useState(dayjs());
    const [endDate, setEndDate] = React.useState(dayjs());

    const weekdays = ["DOM", "LUN", "MAR", "MIE", "JUE", "VIE", "SAB"];

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
    };

    const handleChangePriority = (event) => {
      setPriority(event.target.value);
    };

    const handleChangeDesc = (event) => {
      setDesc(event.target.value);
    };

    const handleChangeInterval = (event) => {
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

    var rows = [];
    const currentDate = new Date();
    for(let i = 0; i < data.length; i++){
      
      const regDate = new Date(Object.values(data)[i].fecha_plan);
      var dayDiff = Math.round((regDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));

      rows[i] = createData(Object.values(data)[i].id, Object.values(data)[i].no_req, Object.values(data)[i].denominacion, Object.values(data)[i].tipo,
                    Object.values(data)[i].fecha_plan, Object.values(data)[i].prioridad, Object.values(data)[i].hecho, Object.values(data)[i].ubicacion,
                    Object.values(data)[i].grado, Object.values(data)[i].descripcion, Object.values(data)[i].intervalo, dayDiff, weekdays[regDate.getDay()]);
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
      <div>
        <Button variant="outlined" startIcon={<Add />} onClick={handleOpenReg}>
          Add
        </Button>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} selected={selected}/>
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
  
                  return (
                    <TableRow style={{backgroundColor: row.dias < 0 ? '#ff8787' : 'white'}}
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
                      <TableCell align="left">{row.no_req}</TableCell>
                      <TableCell align="left">{<Link to={PathConstants.HOME}>{row.denominacion}</Link>}</TableCell>
                      <TableCell align="left" onClick={() => handleOpen(row.tipo, row.id)} style={{ color: row.hecho == false ? 'blue' : 'green', cursor: 'pointer' }}>{row.tipo}</TableCell>
                      <TableCell align="left">{row.dias}</TableCell>
                      <TableCell align="left">{row.fecha_plan}</TableCell>
                      <TableCell align="center" style={{backgroundColor: row.prioridad == 1? 'green' : row.prioridad == 2? 'yellow' : 'red', color: row.prioridad == 2? 'black' : 'white'}}>{row.prioridad}</TableCell>
                      <TableCell align="left">{row.dia}</TableCell>
                      <TableCell align="left">{row.hecho == true ? 'Y' : 'N'}</TableCell>
                      <TableCell align="left">{row.ubicacion}</TableCell>
                      <TableCell align="left" style={{backgroundColor: row.grado == 1? '#FFC000': row.grado == 2? '#2F75B5': '#F4B084'}}>{row.grado == 1? 'MC': row.grado == 2? 'MPT': 'MPD'}</TableCell>
                      <TableCell align="left">{row.descripcion}</TableCell>
                      <TableCell align="left">{row.intervalo}</TableCell>
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
              {Tasks[req].map((value) => {
                const labelId = `checkbox-list-label-${value}`;

                return (
                  <ListItem
                    key={value}
                    disablePadding
                  >
                    <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={checked.indexOf(value) !== -1}
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
            <DatePicker
              label="Fecha inicio"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha fin"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
            />
          </LocalizationProvider>

          <TextField  style = {{width: 150}}
            id="outlined-number"
            label="Tiempo real (mins)"
            type="number"
            value={realTime}
            onChange={handleChangeRealTime}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <Box sx={{mt:4}} textAlign='center'>
            <Button variant="contained" endIcon={<Send />} onClick={() => RegistryTask(
              {
                "id": ph_id,
                "no_req": "test",
                "denominacion": denominacion,
                "no_responsable": responsible.split(" | ")[0],
                "apellido": responsible.split(" | ")[1],
                "inicio": startDate,
                "fin": endDate,
                "tiempo_real": realTime,
                "status": checked,
                "hecho": true,
              }
            )}>
              ENVIAR
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>

    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openReg}
      onClose={handleCloseReg}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={openReg}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h4" component="h2" align='center' sx={{ mt: 2, mb: 2, color:'black'}}>
            {}
          </Typography>
          <Typography id="transition-modal-description" component="span" sx={{ mt: 2, color:'black', fontSize: 16, m: 1 }}>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {}
            </List>
          </Typography>
          <Box sx={{mt:4}} textAlign='center'>

      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField style = {{width: 350}}
              id="outlined-read-only-input"
              label="Requerimiento"
              InputProps={{
                readOnly: true,
              }}
              defaultValue="Test"
          />
          <TextField style = {{width: 350}}
            required
            value={denominacion}
            id="outlined-required"
            label="Denominación"
            onChange={handleDenominacion}
          />

          <FormControl required sx={{ m: 1, minWidth: 300 }}>
            <InputLabel id="demo-simple-select-required-label">Tipo de tarea</InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={task}
              label="Tipo de tarea *"
              onChange={handleChangeTask}
            >
              {Object.keys(Tasks).map((choice) => (
                <MenuItem key={choice} value={choice}>
                  {choice}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
          
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha planificada"
              value={date}
              onChange={(newValue) => setDate(newValue)}
            />
          </LocalizationProvider>

          <FormControl required sx={{ m: 1, minWidth: 300 }}>
            <InputLabel id="demo-simple-select-required-label">Responsable</InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={responsible}
              label="Responsable *"
              onChange={handleChangeResponsible}
            >
              <MenuItem value={"69420 | Muniz"}>69420 | Muniz</MenuItem>
              <MenuItem value={"12345 | Garcia"}>12345 | Garcia</MenuItem>
              <MenuItem value={"88644 | Valverde"}>88644 | Valverde</MenuItem>
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>

          <FormControl required sx={{ m: 1, minWidth: 300 }}>
            <InputLabel id="demo-simple-select-required-label">Ubicación</InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={location}
              label="Ubicación *"
              onChange={handleChangeLocation}
            >
              {Locations["Locations"].map((choice) => (
                <MenuItem key={choice} value={choice}>
                {choice}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>

          <FormControl required sx={{ m: 1, minWidth: 300 }}>
            <InputLabel id="demo-simple-select-required-label">Tipo de mantenimiento</InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={mtType}
              label="Tipo de mantenimiento *"
              onChange={handleChangeMtType}
            >
              <MenuItem value="">
              </MenuItem>
              <MenuItem value={1}>Correctivo (MC)</MenuItem>
              <MenuItem value={2}>Preventivo (MPT)</MenuItem>
              <MenuItem value={3}>Predictivo (MPD)</MenuItem>
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>

          <FormControl required sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-required-label">Prioridad</InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={priority}
              label="Prioridad *"
              onChange={handleChangePriority}
            >
              <MenuItem value="">
              </MenuItem>
              <MenuItem value={1}>1 (Baja)</MenuItem>
              <MenuItem value={2}>2 (Media)</MenuItem>
              <MenuItem value={3}>3 (Alta)</MenuItem>
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>

          <TextField  style = {{width: 500}}
            required
            id="outlined-required"
            label="Descripción"
            value={desc}
            onChange={handleChangeDesc}
          />

          <TextField  style = {{width: 120}}
            id="outlined-number"
            label="Intérvalo (días)"
            type="number"
            defaultValue="90"
            value={interval}
            onChange={handleChangeInterval}
            InputLabelProps={{
              shrink: true,
            }}
          />

        </div>
        
      </Box>
            <Button variant="contained" endIcon={<Send />} onClick={() => RegistryUI(
              {
                "no_req": "test",
                "denominacion": denominacion,
                "tipo": task,
                "fecha_plan": date,
                "no_responsable": responsible.split(" | ")[0],
                "apellido": responsible.split(" | ")[1],
                "ubicacion": location,
                "hecho": false,
                "grado": mtType,
                "prioridad": priority,
                "descripcion": desc,
                "intervalo": interval,
              }
            )}>
              REGISTRAR
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
    </div>
    );
}
