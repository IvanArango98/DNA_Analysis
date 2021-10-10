import React, { Component } from 'react';
import { Form, Container, Button, Figure, Col, Row, FormGroup } from 'react-bootstrap';
import emailjs from 'emailjs-com';
import {Mensajes_Inicio} from '../Mensajes/MensajeInicio'
import Button_ from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import ImageIcon from '@mui/icons-material/Image';

class ImagenComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            NumeroID_imagen1: [],
            file_imagen1: null,
            dataBuena_imagen1: null,
            binary_string_imagen1: null,

            NumeroID_imagen2: [],
            file_imagen2: null,
            dataBuena_imagen2: null,
            binary_string_imagen2: null,

            confidencia: null,
            similitud: null,

            cargando: false,
            flagData: false
        };
        this.handleFaceID_Image1 = this.handleFaceID_Image1.bind(this);
        this.handleFaceID_Image2 = this.handleFaceID_Image2.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleClickVerify = this.handleClickVerify.bind(this);
    }


    sendResults(e) {
        e.preventDefault();
        emailjs.sendForm('service_xpvvht7', 'template_tx5av2c', e.target, 'user_wTyJEPF2MiECiC1jybwWR')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        e.target.reset();
    }

    handleChange1(event) {
        var reader = new FileReader(),
            resultado = '';
        reader.readAsArrayBuffer(event.target.files[0])
        reader.onload = function () {
            resultado = reader.result;
        }
        reader.onerror = function (error) {
            console.log('Error', error)
        }
        reader.onloadend = function () {
            this.setState({ binary_string_imagen1: resultado })
            console.log('DONE', this.state.binary_string_imagen1); // readyState will be 2
            this.handleFaceID_Image1();
        }.bind(this);

        console.log(reader.readyState)
        //bytes.buffer
        this.setState({
            file_imagen1: URL.createObjectURL(event.target.files[0]),
        })
    }

    handleChange2(event) {
        var reader2 = new FileReader(),
            resultado2 = '';
        reader2.readAsArrayBuffer(event.target.files[0])
        reader2.onload = function () {
            resultado2 = reader2.result;
        }
        reader2.onerror = function (error) {
            console.log('Error', error)
        }
        reader2.onloadend = function () {
            this.setState({ binary_string_imagen2: resultado2 })
            console.log('DONE', this.state.binary_string_imagen2); // readyState will be 2
            this.handleFaceID_Image2();
        }.bind(this);

        console.log(reader2.readyState)
        //bytes.buffer
        this.setState({
            file_imagen2: URL.createObjectURL(event.target.files[0]),
        })

    }


    handleFaceID_Image1() {
        fetch("https://somosfamiliares2021.cognitiveservices.azure.com/face/v1.0/detect", {
            "method": "POST",
            Query: {
                'detectionModel': 'detection_01'
            },
            headers: {
                'Content-Type': 'application/octet-stream',
                'Ocp-Apim-Subscription-Key': '0a79e9e8648d48559c90d8b99a0ccccd'
            },
            body: this.state.binary_string_imagen1
        })
            .then(response => response.json())
            .then(
                (result) => {
                    result.map((datosVarios) => {
                        console.log(datosVarios.faceId)
                        this.setState({ NumeroID_imagen1: datosVarios.faceId })
                    })
                    console.log(result)
                })
            .catch(err => {
                console.log(err);
            })
    }

    handleFaceID_Image2() {
        fetch("https://somosfamiliares2021.cognitiveservices.azure.com/face/v1.0/detect", {
            "method": "POST",
            Query: {
                'detectionModel': 'detection_01'
            },
            headers: {
                'Content-Type': 'application/octet-stream',
                'Ocp-Apim-Subscription-Key': '0a79e9e8648d48559c90d8b99a0ccccd'
            },
            body: this.state.binary_string_imagen2
        })
            .then(response => response.json())
            .then(
                (result) => {
                    result.map((datosVarios2) => {
                        console.log(datosVarios2.faceId)
                        this.setState({ NumeroID_imagen2: datosVarios2.faceId })
                    })
                    console.log(result)
                })
            .catch(err => {
                console.log(err);
            })
    }

    handleClickVerify() {
        this.ADN()
        var myHeaders = new Headers();
        myHeaders.append("Ocp-Apim-Subscription-Key", "0a79e9e8648d48559c90d8b99a0ccccd");
        myHeaders.append("Content-Type", "application/json");

        var data = JSON.stringify({ "faceId1": this.state.NumeroID_imagen1, "faceId2": this.state.NumeroID_imagen2 });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: data,
            redirect: 'follow'
        };

        fetch("https://somosfamiliares2021.cognitiveservices.azure.com//face/v1.0/verify", requestOptions)
            .then(response => response.json())
            .then(
                (result) => {
                    console.log(result.confidence)
                    this.setState({ confidencia: result.confidence })
                    this.Familiaridad(result.confidence)
                })
            .catch(error => console.log('error', error));
    }

    ADN() {
        this.setState({ cargando: true });
        const timer = setTimeout(() => {
            clearTimeout(timer);
            this.setState({ cargando: false });
        }, 1500);
        console.log(this.state.confidencia)
        this.setState({ flagData: true })
    }


    Familiaridad(confidence) {
        if (confidence <= 0.20) {
            this.setState({ similitud: "No hay Ningún Parentesco" })
            console.log("Ningún Parentesco")
        }
        if (confidence > 0.20 & confidence <= 0.40) {
            this.setState({ similitud: "El parentesco es de Primos lejanos" })
            console.log("Primos lejanos")
        }
        if (confidence > 0.40 & confidence <= 0.60) {
            this.setState({ similitud: "El parentesco es de Primos o tíos" })
            console.log("Primos o tíos")
        }
        if (confidence > 0.60 & confidence <= 0.80) {
            this.setState({ similitud: "El parentesco es de Hermanos" })
            console.log("Hermanos")
        }
        if (confidence > 0.80 & confidence <= 0.90) {
            this.setState({ similitud: "Padre/Madre" })
            console.log("Padre/Madre")
        }
        if (confidence > 0.90 & confidence <= 1) {
            this.setState({ similitud: "Es la misma persona" })
            console.log("La misma persona")
        }
    }

    MostrarResultado() {
        return (
            <div>
                <h3>Similitud de: {this.state.confidencia * 100}%</h3>
                <hr></hr>
                <h3>{this.state.similitud}</h3>
            </div>
        );
    }

    MostrarNada() {
        return (
            <div>
            </div>
        );
    }

    Mostrar() {
        const dataCargada = this.state.flagData;
        if (dataCargada) {
            return this.MostrarResultado();
        }
        return this.MostrarNada();
    }

    render()     
    {
        
const Input = styled('input')({
    display: 'none',
  });
        return (
            <div>
                <Grid xs={12} lg={12} md={12} >
                    <br></br>
                    <h3>{Mensajes_Inicio.MensajeImagen}</h3>
                    <br></br>
                    
                        <Grid container xs={12} lg={12} md={12} spacing={1}>                                                            
                            <Grid item xs={12} lg={6} md={6}>   
                            <Paper elevation={2}>
                            <hr/>
                                <label htmlFor="contained-button-file" style={{display:"flex",justifyContent:"center"}}>
                                <Input accept="image/*" id="contained-button-file"  type="file" onChange={this.handleChange1}/>
                                    <Button_ variant="contained" component="span"
                                    endIcon={<ImageIcon/>}
                                    >
                                        {Mensajes_Inicio.Imagen1}
                                    </Button_>
                                </label>                                   
                                <hr/>
                                <Figure style={{display:"flex",justifyContent:"center"}}>
                                        <Figure.Image
                                            width="90%"
                                            height="100%"
                                            src={this.state.file_imagen1}
                                        />
                                        {this.state.flagImagen1 ? (
                                            <img src={"https://media.giphy.com/media/PijzuUzUhm7hcWinGn/giphy.gif"} />
                                        ) : null}
                                    </Figure>
                                    </Paper>
                                    </Grid>     


                                    <Grid item xs={12} lg={6} md={6}> 
                                    <Paper elevation={2}>
                                    <hr/>
                                    <label htmlFor="contained-button-file2" style={{display:"flex",justifyContent:"center"}}>
                                <Input accept="image/*" id="contained-button-file2" type="file" onChange={this.handleChange2}/>
                                    <Button_ variant="contained" component="span"
                                    endIcon={<ImageIcon/>}
                                    >
                                        {Mensajes_Inicio.Imagen2}
                                    </Button_>
                                </label>    

                                <hr/>
                                    <Figure style={{display:"flex",justifyContent:"center"}}>
                                        <Figure.Image
                                            width="90%"
                                            height="100%"
                                            src={this.state.file_imagen2}
                                        />
                                    </Figure>   
                                    </Paper>
                                    </Grid>                                                                                   
                                </Grid>    
                    
                    <Button_  
                        variant="contained" 
                        style={{width:"99%"}}
                        endIcon={<FactCheckIcon/>}
                        onClick={() => this.handleClickVerify()}>Verificar
                        </Button_>  
                        <hr></hr>
                        </Grid>                                            
            </div>
        );
    }
}

export default ImagenComp;