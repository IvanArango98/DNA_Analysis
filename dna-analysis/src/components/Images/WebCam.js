import React from "react";
import Webcam from "react-webcam";
import $ from "jquery";
import emailjs from "emailjs-com"
import {Mensajes_Inicio} from '../Mensajes/MensajeInicio'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button_ from '@mui/material/Button';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import FactCheckIcon from '@mui/icons-material/FactCheck';

const WebCampComp = () => {

    var [NumeroID_imagen1, setNumeroID_imagen1] = React.useState(null);
    var [Resultados, setResultados] = React.useState(null);
    var [NumeroID_imagen2, setNumeroID_imagen2] = React.useState(null);
    var [confidencia, setconfidencia] = React.useState(null);
    var [similitud, setSimilitud] = React.useState(null);
    var [cargando, setCargando] = React.useState(null);
    var [flagData, setflagData] = React.useState(null);

    const webcamRef = React.useRef(null);
    const webcamRef2 = React.useRef(null);

    const [imgSrc, setImgSrc] = React.useState(null);
    const [imgSrc2, setImgSrc2] = React.useState(null);

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);

        fetch(imageSrc)
            .then(res => res.blob())
            .then(blobData => {
                $.post({
                    url: "https://somosfamiliares2021.cognitiveservices.azure.com/face/v1.0/detect",
                    contentType: "application/octet-stream",
                    headers: {
                        'Ocp-Apim-Subscription-Key': '0a79e9e8648d48559c90d8b99a0ccccd'
                    },
                    processData: false,
                    data: blobData
                })
                    .done(function (data) {
                        console.log(data)
                        data.map((datosVarios1) => {
                            console.log(datosVarios1.faceId)
                            NumeroID_imagen1 = datosVarios1.faceId
                            setNumeroID_imagen1(NumeroID_imagen1);
                        })
                    })
                    .fail(function (err) {
                        $("#results").text(JSON.stringify(err));
                    })
            });

    }, [webcamRef, setImgSrc]);


    const capture2 = React.useCallback(() => {
        const imageSrc2 = webcamRef.current.getScreenshot();
        setImgSrc2(imageSrc2);
        fetch(imageSrc2)
            .then(res => res.blob())
            .then(blobData => {
                $.post({
                    url: "https://somosfamiliares2021.cognitiveservices.azure.com/face/v1.0/detect",
                    contentType: "application/octet-stream",
                    headers: {
                        'Ocp-Apim-Subscription-Key': '0a79e9e8648d48559c90d8b99a0ccccd'
                    },
                    processData: false,
                    data: blobData
                })
                    .done(function (data) {

                        data.map((datosVarios2) => {
                            console.log(datosVarios2.faceId)
                            NumeroID_imagen2 = datosVarios2.faceId
                            setNumeroID_imagen2(NumeroID_imagen2);
                        })
                    })
                    .fail(function (err) {
                        $("#results").text(JSON.stringify(err));
                    })
            });

    }, [webcamRef2, setImgSrc2]);

    function handleClickVerify() {
        ADN();
        var myHeaders = new Headers();
        myHeaders.append("Ocp-Apim-Subscription-Key", "0a79e9e8648d48559c90d8b99a0ccccd");
        myHeaders.append("Content-Type", "application/json");

        var data = JSON.stringify({ "faceId1": NumeroID_imagen1, "faceId2": NumeroID_imagen2 });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: data,
            redirect: 'follow'
        };

        fetch("https://somosfamiliares2021.cognitiveservices.azure.com/face/v1.0/verify", requestOptions)
            .then(response => response.json())
            .then(
                (result) => {
                    setResultados(JSON.stringify({"Porcentaje de parentezco" : result.confidence, "Bandera parentezco" : result.isIdentical}))
                    confidencia = result                    
                    setconfidencia(confidencia);
                    Familiaridad(result.confidence)
                })
            .catch(error => console.log('error', error));
    }

 
    function ADN() {
        cargando = true
        setCargando(cargando);
        const timer = setTimeout(() => {
            clearTimeout(timer);
            cargando = false
            setCargando(cargando);
        }, 1500);
        flagData = true
        setflagData(flagData);
    }

    function Familiaridad(confidence) {
        if (confidence <= 0.20) {
            similitud = "No hay Ningún Parentesco"
            setSimilitud(similitud);
            console.log("Ningún Parentesco")
        }
        if (confidence > 0.20 & confidence <= 0.40) {
            similitud = "El parentesco es de Primos lejanos"
            setSimilitud(similitud);
            console.log("Primos lejanos")
        }
        if (confidence > 0.40 & confidence <= 0.60) {
            similitud = "El parentesco es de Primos o tíos"
            setSimilitud(similitud);
            console.log("Primos o tíos")
        }
        if (confidence > 0.60 & confidence <= 0.80) {
            similitud = "El parentesco es de Hermanos"
            setSimilitud(similitud);
            console.log("Hermanos")
        }
        if (confidence > 0.80 & confidence <= 0.90) {
            similitud = "El parentesco es de Padre/Madre"
            setSimilitud(similitud);
            console.log("Padre/Madre")
        }
        if (confidence > 0.90 & confidence <= 1) {
            similitud = "Es la misma persona"
            setSimilitud(similitud);
            console.log("La misma persona")
        }
    }

    function MostrarResultado() {
        return (
            <div>
                <h3>Similitud de: {confidencia * 100}%</h3>
                <hr></hr>
                <h3>{similitud}</h3>
            </div>
        );
    }

    function MostrarNada() {
        return (
            <div>
            </div>
        );
    }

    function Mostrar() {
        const dataCargada = flagData;
        if (dataCargada) {
            return MostrarResultado();
        }
        return MostrarNada();
    }


    function sendResults(e) {
        e.preventDefault();
        emailjs.sendForm('service_xpvvht7', 'template_tx5av2c', e.target, 'user_wTyJEPF2MiECiC1jybwWR')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        e.target.reset();
    }

    return (
        <div>
            <Grid xs={12} md={12} lg={12}>
                <br></br>
                <h3>{Mensajes_Inicio.MensajeImagenWeb}</h3>
                <hr/>
                
                <Grid container xs={12} md={12} lg={12} spacing={3}>

                <Grid item xs={12} md={12} lg={12}>
                <Paper elevation={2}>
                <hr/>
                <Button_ onClick={capture} style={{display:"flex",marginLeft:"auto",marginRight:"auto"}} 
                endIcon={<PhotoCameraIcon/>}
                >{Mensajes_Inicio.TomaFoto1}</Button_>
                <hr/>
                <Grid container  spacing={1} style={{display:"flex",marginLeft:"auto",marginRight:"auto"}} >
                <Grid container  xs={12} md={6} lg={6} item >                
                        <Webcam
                            width="90%"
                            height="100%"
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                        />
                        </Grid>
                        <Grid container  xs={12} md={6} lg={6} item >                
                        {imgSrc && (
                            <img
                                src={imgSrc}
                                style={{width:"90%"}}
                            />
                        )}
                        </Grid>
                        </Grid>
                        <hr></hr>
                </Paper>
                </Grid>
                    

                <hr/>
                
                <Grid item xs={12} md={12} lg={12}>
                <Paper elevation={2}>       
                <hr/>         
                <Button_ onClick={capture2} style={{display:"flex",marginLeft:"auto",marginRight:"auto"}}
                endIcon={<PhotoCameraIcon/>}
                >{Mensajes_Inicio.TomaFoto2}</Button_>   
                <hr/>
                <Grid container  spacing={1} style={{display:"flex",marginLeft:"auto",marginRight:"auto"}} >
                <Grid container  xs={12} md={6} lg={6} item >                
                        <Webcam
                            width="90%"
                            height="100%"
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                        />
                        </Grid>
                        <Grid container  xs={12} md={6} lg={6} item >          
                        {imgSrc2 && (
                            <img
                                src={imgSrc2}
                                style={{width:"90%"}}
                            />
                        )}
                        </Grid>
                        </Grid>
                        <hr></hr>
                        </Paper>                 
                        </Grid>                        
                
                </Grid>
                <hr></hr>                
                <Button_ 
                variant="contained" 
                style={{width:"97%"}}
                endIcon={<FactCheckIcon/>}
                onClick={() => handleClickVerify()}>Verificar</Button_>
            </Grid>
            <hr></hr>                
            {Resultados}

        </div>
    );
};


export default WebCampComp;