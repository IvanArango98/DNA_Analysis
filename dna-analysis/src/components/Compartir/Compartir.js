import React,{useEffect,useState} from 'react';
  import { Grid } from '@mui/material';
  import {
    FacebookIcon,    
    TwitterIcon,    
    WhatsappIcon,    
    EmailIcon
  } from "react-share";
  import {    
    FacebookShareButton,    
    TwitterShareButton,    
    WhatsappShareButton,  
    EmailShareButton  
  } from "react-share";

const Compartir = (props) => {
    const {Porcentaje,Parezenteco} =props        
        const [Url_,setUrl] = useState("")
        const [Nombre,setNombre] = useState("")
        const URL = `https://dna-analysis-cb722.web.app/Resultados?Porcentaje=${Porcentaje}&Parentezco=${Parezenteco}&url=${Url_}&Nombre=${Nombre}`          

        useEffect(() =>{
          let fbdata = JSON.parse(localStorage.getItem('fbData'))
          let googledata = JSON.parse(localStorage.getItem('googleData'))     
    
          if(fbdata !== null)
          {
              setUrl(fbdata.picture)
              setNombre(fbdata.name)        
          }
          else if(googledata !== null){
            setUrl(
              btoa(googledata.picture)
              )
            setNombre(googledata.name)                
          }
    
        },[])

    return(
        <div>                    
            <h6>Compartir resultados:</h6>                    
            <hr/>                    
        <Grid container xs={12} md={12} lg={12} spacing={2}>        

        <Grid item xs={6} md={1} lg={1}>    
        <FacebookShareButton url={URL}>        
        <FacebookIcon size={32} round={true}/>  
        </FacebookShareButton>              
        </Grid>

        <Grid item xs={6} md={1} lg={1}> 
        <TwitterShareButton url={URL}>                                 
        <TwitterIcon size={32} round={true} 
         style={{cursor:"pointer"}}         
        />        
        </TwitterShareButton>        
        </Grid>

        <Grid item xs={6} md={1} lg={1}>                       
        <WhatsappShareButton url={URL}>        
        <WhatsappIcon size={32} round={true}
         style={{cursor:"pointer"}}         
        />                
        </WhatsappShareButton>        
        </Grid>
        
        <Grid item xs={6} md={1} lg={1}>               
        <EmailShareButton url={URL}>   
        <EmailIcon size={32} round={true} style={{cursor:"pointer"}}         
        />    
        </EmailShareButton>            
        </Grid>
        </Grid>
    </div>
    )
}

export default Compartir