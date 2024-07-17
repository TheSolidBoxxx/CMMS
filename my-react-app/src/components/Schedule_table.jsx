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

function createData(id, no_responsable, apellido, no_req, inicio, fin, tiempo, intervalo, fecha_plan, grado, tiempo_real) {
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
        tiempo_real
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
          {mapDates().map((data, i) => (
            <TableCell
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
            sx={{ flex: '1 1 100%' }}
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

export default function Schedule_table({data}) {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('id');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);

    const [open, setOpen] = React.useState(false);
    const [req, setReq] = React.useState("TAREA C215-A");
    const handleOpen = (key) => {setOpen(true); setReq(key);}
    const handleClose = () => setOpen(false);

    const [checked, setChecked] = React.useState([0]);

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
    for(let i = 0; i < data.length; i++){
      rows[i] = createData(Object.values(data)[i].id, Object.values(data)[i].no_responsable, Object.values(data)[i].apellido, Object.values(data)[i].no_req,
                          Object.values(data)[i].inicio, Object.values(data)[i].fin, Object.values(data)[i].tiempo, Object.values(data)[i].intervalo,
                          Object.values(data)[i].fecha_plan, Object.values(data)[i].grado, Object.values(data)[i].tiempo_real);
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
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
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
                      <TableCell align="left" onClick={() => handleOpen(row.no_req)} style={{ color: 'blue', cursor: 'pointer' }}>{row.no_req}</TableCell>
                      <TableCell align="left">{row.inicio}</TableCell>
                      <TableCell align="left">{row.fin}</TableCell>
                      <TableCell align="left">{row.tiempo_real != null ? `${row.tiempo_real} minutos` : ''}</TableCell>
                      {mapDates().map(function(data, i){
                        const d1 = new Date(row.fecha_plan)
                        const d2 = new Date(data);
                        var time_diff = d2.getTime() - d1.getTime();  
                        var day_diff = time_diff / (1000 * 60 * 60 * 24);
                        
                        //console.log(`${data} e ${row.intervalo - ((i*7) % row.intervalo)} p ${day_diff}`);
                        if((row.intervalo - ((i*7) % row.intervalo) <= 7 && row.grado != 1 && day_diff > -7) || (day_diff > -7 && day_diff <= 0 && row.grado == 1)){
                          return(
                            <TableCell align="left" key={i} style={{backgroundColor: row.grado == 1? '#FFC000': row.grado == 2? '#2F75B5': '#F4B084', color:'white'}}>
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
          <Box sx={{mt:4}} textAlign='center'>
            <Button variant="contained" endIcon={<Send />} onClick={() => {handleClose}}>
              ENVIAR
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
    </div>
    );
}
