import React,{useEffect,useState} from 'react';
import {Card,CardContent,Grid} from '@mui/material';
import Avatar from '@mui/material/Avatar';

const Compartir = () => {

    const queryParams = new URLSearchParams(window.location.search);
    const Porcentaje = queryParams.get('Porcentaje');    
    const Parezenteco = queryParams.get('Parentesco');
    const url = queryParams.get('url');
    const Nombre = queryParams.get('Nombre');

    function Cambiar(cadena)
    {        
        let tmp = cadena.split("%20%");
            let nuevo = "";
            Object.keys(tmp).forEach(index => {
                nuevo += tmp[index] + " "   
            })

            return nuevo.replace("%","");
    }

    function Cambiar2(cadena)
    {        
        let tmp = cadena.split("%");
            let nuevo = "";
            Object.keys(tmp).forEach(index => {
                nuevo += tmp[index] + " "   
            })

            return nuevo.replace("�","");
    }

console.log(Parezenteco)
    return(
        <div 
        style={{ 
            backgroundSize: "cover",
            position:"fixed",
            width:"100%",
            height:"100%",
            top:0,
            backgroundImage: `url("https://www.cubahora.cu/uploads/imagen/2019/01/21/pruebas-de-adn-online.jpg")`,            
          }}
        >
            <hr/>
            <Grid xs={12} md={8} lg={8} style={{marginLeft:"auto",marginRight:"auto",opacity:"0.7",backgroundColor:"#F0FFFF"}}>
           <Card>
           <CardContent>
            <h1 style={{color:"black"}}>
                Resultados análisis 
            </h1>
            <h4 style={{color:"black"}}>
            <Avatar alt="Sin foto de perfil" src={atob(url)}
                          sx={{ width: 56, height: 56 }}
                        />
                            {
                                Cambiar(Nombre)
                            }
            </h4>
            <h4 style={{color:"black"}}>
                Similitud: {Cambiar2(Parezenteco)}             
            </h4>
            <h4 style={{color:"black"}}>
                {"Porcentaje: "+ (Porcentaje * 100) + " %"}
            </h4>
            
            </CardContent>
            </Card>
            </Grid>
        </div>
    )
}

export default Compartir;