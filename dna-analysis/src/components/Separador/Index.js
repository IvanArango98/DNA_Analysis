import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ImageIcon from '@mui/icons-material/Image';
import LinkedCameraIcon from '@mui/icons-material/LinkedCamera';
import ImagenComp from '../Images/Images'
import WebCampComp from '../Images/WebCam'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const Mensaje = (valor) => {
      switch(valor)
      {
        case "1" :
          return(
            <div>   
            <p>
             Imagen               
            <ImageIcon style={{marginLeft:"5px",marginBottom:"5px"}}/> 
            </p>
            
            </div>
          )
          break;

          case "2" : 
          return(
          <div>             
           <p>
           Cámara Web               
            <LinkedCameraIcon style={{marginLeft:"5px",marginBottom:"5px"}}/> 
            </p>               
        </div>
          )
          break;
      }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label={Mensaje("1")} {...a11yProps(0)} />
          <Tab label={Mensaje("2")} {...a11yProps(1)} />          
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <ImagenComp/>      
      </TabPanel>
      <TabPanel value={value} index={1}>
      <WebCampComp/>            
      </TabPanel>      
    </Box>
  );
}
