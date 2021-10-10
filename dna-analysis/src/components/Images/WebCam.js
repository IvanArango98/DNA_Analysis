import React from "react";
import Webcam from "react-webcam";
import { Container, Col, Row, Button } from 'react-bootstrap';
import $ from "jquery";
import emailjs from "emailjs-com"


const WebCampComp = () => {

    var [NumeroID_imagen1, setNumeroID_imagen1] = React.useState(null);
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
                        'Ocp-Apim-Subscription-Key': '5af66410-c75d-4717-93ee-f8e2a0c5b1d9'
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
        myHeaders.append("Ocp-Apim-Subscription-Key", "91d74c8e362941f9bbce92f931ee40d0");
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
                    console.log(result.confidence)
                    confidencia = result.confidence
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
            <Container className="border border-dark bg-light rounded">
                <br></br>
                <h3>Tomate dos fotografias</h3>
                <hr className="bg-dark" />
                <Row>
                    <Col>
                        <Webcam
                            width="100%"
                            height="100%"
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                        />
                    </Col>

                    <Col>
                        {imgSrc && (
                            <img
                                src={imgSrc}
                            />
                        )}
                    </Col>
                </Row>

                <Row >
                    <Col />
                    <Col>
                        <Button onClick={capture}>Tomar foto</Button>
                    </Col>
                    <Col /><Col /><Col />
                </Row>

                <hr className="bg-dark" />

                <Row>
                    <Col>
                        <Webcam
                            width="100%"
                            height="100%"
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                        />
                    </Col>

                    <Col>
                        {imgSrc2 && (
                            <img
                                src={imgSrc2}
                            />
                        )}
                    </Col>
                </Row>

                <Row>
                    <Col />
                    <Col>
                        <Button onClick={capture2}>Tomar foto</Button>
                    </Col>
                    <Col /><Col /><Col />
                </Row>
                <br />
                <hr className="bg-dark" />
                <br />
                
                <Button size="lg" block
                    variant="success" onClick={() => handleClickVerify()}>Verificar</Button>
                <hr></hr>
            </Container>
        </div>
    );
};


export default WebCampComp;