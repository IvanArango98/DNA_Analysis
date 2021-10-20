import React,{useEffect,useState} from 'react';
import {Card,CardContent,Grid} from '@mui/material';
const Compartir = () => {

    const queryParams = new URLSearchParams(window.location.search);
    const Porcentaje = queryParams.get('Porcentaje');
    const name = queryParams.get('name');
    const Parezenteco = queryParams.get('Parezenteco');

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
                Similitud: {Parezenteco}             
            </h4>
            <h4 style={{color:"black"}}>
                Porcentaje: {Porcentaje}             
            </h4>
            </CardContent>
            </Card>
            </Grid>
        </div>
    )
}

export default Compartir;