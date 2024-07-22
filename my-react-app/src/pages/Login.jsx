import React from "react";
import Button from '@mui/material/Button';
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Alert from '@mui/material/Alert';
//import users from "./../../data/users";
//import image from "./Images/image.jpg";
import authService from "./../service/authService";
import { useNavigate } from "react-router-dom";

function Copyright() {
  return
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Login(props) {
  const navigateTo = useNavigate();

  if(authService.isLoggedIn()){

    React.useEffect(() => {
    navigateTo("/dashboard");
    }, []);

  }

  const [account, setAccount] = React.useState({username:"",password:""});

  const handleAccount = (property,event)=>{

    const accountCopy = {...account};
    accountCopy[property] = event.target.value;

    setAccount(accountCopy);

  }

  const isVerifiedUser=(dbData)=>{    
    //return users.find((user)=> user.username === username && user.password === password);
  };


  const handleLogin = ()=>{
    var dbData = {"username":account.username,"passwd":account.password}

    fetch('/usrs', {
      method: 'POST',
      
      body: JSON.stringify(dbData),
      headers: {'Content-Type': 'application/json'},
    })
    .then((incoming) => incoming.json())
    .then((response) => {
      if(response.length > 0){
        authService.doLogIn(account.username, response[0].no_responsable, response[0].apellido, response[0].ocupacion);
        setAccount({username:"",password:""});

        // React.useEffect(() => {
        navigateTo("/dashboard");
        // }, []);
        
      }else{
          {<Alert variant="outlined" severity="error">
            This is an outlined error Alert.
          </Alert>}
      }
      //Alert.alert(JSON.stringify(response.body));
    });
      
  };

  return (
    <Grid container component="main" >
      <CssBaseline />
      {/* <Grid item xs={false} sm={4} md={7} className={classes.image} /> */}
      <Grid
        
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={1}
        square
      >
        <div >
          <Typography component="h1" variant="h5">
            Inicio de sesión
          </Typography>
          <form  noValidate>
            <TextField
            onChange={(event)=>handleAccount("username",event)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Nombre de usuario"
              name="username"
              autoFocus
            />
            <TextField
            onChange={(event)=>handleAccount("password",event)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recuérdame"
            />
            <Button
              //type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick = {handleLogin}
            >
              Iniciar sesión
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
