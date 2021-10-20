import React, { useEffect,useState } from 'react';
import {Navbar,Nav,DropdownButton,Dropdown, Row, Col} from 'react-bootstrap'
import './navbar.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import LogoutIcon from '@mui/icons-material/Logout';

const TopMenu = () => {

    const [Url,setUrl] = useState("")
    const [Nombre,setNombre] = useState("")

    useEffect(() =>{
      let fbdata = JSON.parse(localStorage.getItem('fbData'))
      let googledata = JSON.parse(localStorage.getItem('googleData'))     

      if(fbdata !== null)
      {
          setUrl(fbdata.picture)
          setNombre(fbdata.name)        
      }
      else if(googledata !== null){
        setUrl(googledata.picture)
        setNombre(googledata.name)                
      }

    },[])


    function  logout()
    {
        localStorage.clear()
        window.location.href = "/"
    }

    return(
        <div> 
             <Navbar fixed="top" id="navbar"  variant="dark" style={{backgroundColor:"#1976d2",position:"absolute"}}>
            <Navbar.Brand href="Inicio"><span id="navbar-sub-brand" style={{marginLeft:"20px"}}>¿SOMOS FAMILIARES?</span> </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                         
              </Nav>             
                    <DropdownButton                     
                    style={{marginLeft:"auto",marginRight:"170px"}}
                    >
                    <Dropdown.Header id="Dropdown-header">
                        <Row>
                        <AccountCircleIcon/>
                        </Row>
                        <Row>
                        <Avatar alt="Sin foto de perfil" src={Url}
                          sx={{ width: 56, height: 56 }}
                        />
                            {
                                Nombre
                            }
                        </Row>                    
                    </Dropdown.Header> 
                    <Dropdown.Divider></Dropdown.Divider>
                    <Dropdown.Item 
                        onClick={ () => logout()}                 
                    >
                      <span style={{color:"black"}}>
                      <LogoutIcon/> 
                        {" " + " " +" "+"Cerrar Sesión "}                        
                          </span>                        
                    </Dropdown.Item>                    
                    </DropdownButton>
            </Navbar.Collapse>
          </Navbar> 
        </div> 
    )
}
 
export default TopMenu;