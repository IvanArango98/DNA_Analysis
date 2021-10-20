import React from 'react';
import './index.css'
import 'materialize-css/dist/css/materialize.min.css'
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {   
            isLogged:false,                
          }
          this.responseFacebook = this.responseFacebook.bind(this);
          this.onFailure = this.onFailure.bind(this);
          this.responseGoogle = this.responseGoogle.bind(this);
    }

    componentWillMount()
    {
        if(localStorage.getItem("fbData")|| localStorage.getItem("googleData"))    
        {
            this.setState({isLogged:true})
        }
    }
    responseFacebook(response)
    {
        //console.log(response)
        localStorage.setItem("fbData",JSON.stringify({
            token: response.token,
            email: response.email,
            name: response.name,
            picture: response.picture.data.url,
            social: "fb"
        }))

        this.setState({isLogged:true})                
    }

    responseGoogle(response)
    {
        console.log(response)
        localStorage.setItem("googleData", 
        JSON.stringify(
            {
                token: response.token,
                email: response.profileObj.email,
                name: response.profileObj.name,
                picture: response.profileObj.imageUrl,
                social: "google"
            }
        )
        )
        this.setState({isLogged:true})    
    }
    onFailure(error)
    {
        console.log(error)
    }
    render() { 
        if(this.state.isLogged)
        {
            window.location.href = "/Inicio"
        }

        const handleSubmit = (event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            // eslint-disable-next-line no-console
            console.log({
              email: data.get('email'),
              password: data.get('password'),
            });
          };
          const theme = createTheme();

        return (             
            <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
              <CssBaseline />
              <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                  backgroundImage: 'url(https://media.giphy.com/media/3o7TKz2eMXx7dn95FS/giphy.gif)',
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: (t) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              
              <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>

              <hr></hr>
              <hr></hr>
              <hr></hr>
              <hr></hr>
              <hr></hr>
              <hr></hr>
                <Box
                  sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Avatar style={{backgroundColor:"#0d6efd"}}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Inicio de sesión
                  </Typography>
                  <Box component="form" noValidate sx={{ mt: 1 }}>

                  <br></br>
                  <br></br>
                  <Grid item xs={12} lg={9} md={9}>

                            <FacebookLogin
                            appId="464888234829756"
                            autoLoad={false}   
                            fields="name,email,picture.width(120)"  
                            callback={ this.responseFacebook}                       
                            onFailure={this.onFailure}
                            textButton="Facebook"     
                            cssClass="waves-effect waves-light btn  light-blue darken-4"
                            icon="fa fa-facebook"                                                         
                            />    
                    </Grid>                        
                                <br></br>

                            <GoogleLogin
                            clientId="627355732789-aieiidihm7qb0ri5intqtb4a4lpb827o.apps.googleusercontent.com"
                            autoLoad={false}
                            onSuccess={this.responseGoogle}
                            onFailure={this.onFailure}                            
                            className="waves-effect waves-light btn  red darken-2"                            
                            >
                            <span className="Titulo">
                                GMAIL</span>
                            </GoogleLogin>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </ThemeProvider>
         );
    }
}
 
export default Login;