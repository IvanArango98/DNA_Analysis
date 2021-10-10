import React, { Component } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Grid,
} from "@material-ui/core";
import {Mensajes_Inicio} from './Mensajes/MensajeInicio'
import BasicTabs from './Separador/Index'

const Main = () => {
  return (
    <div>      
      <Grid container xs={12} md={12} lg={12} style={{display:"flex",justifyContent:"center",backgroundColor:"#FFFAFA",marginTop:"30px"}}>
        <Grid item xs={11} md={11} lg={11}>
            <Card>
            <br/>  
            <h2>{Mensajes_Inicio.Titulo}</h2>
              <CardContent>
              <p>{Mensajes_Inicio.Instrucciones}</p>
              <BasicTabs/>

              </CardContent>
            </Card>
          </Grid>
      </Grid>
      <br/>  
    </div>
  );
};

export default Main;
