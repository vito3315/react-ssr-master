import React from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import itemsStore from '../../stores/items-store';

const queryString = require('query-string');

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
          <div>
            {children}
            </div>   
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export function Cart() {
    let { cityName } = useParams();
  
    itemsStore.setCity(cityName);
  
    return (
        <RenderCart cityName={cityName} />
    );
}

class RenderCart extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {      
            is_load: false,
            valueTab: 0,
            city_name: this.props.cityName,
            
            pic_point: [],
            my_addr: [],
            all_addr: []
        };
    }
    
    loadData(){
        fetch('https://jacofood.ru/src/php/test_app.php', {
            method: 'POST',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'},
            body: queryString.stringify({
                type: 'get_by_mi_web', 
                city_id: this.state.city_name,
                user_id: itemsStore.getToken()
            })
            }).then(res => res.json()).then(json => {
                
                this.setState({
                    pic_point: json.get_addr_pic.points,
                    my_addr: json.get_my_addr,
                    all_addr: json.get_addr,
                })
                
                console.log( json )
                
              /*this.setState({ addrDev: json['get_addr'] });
              this.setState({ userDev: json['get_my_addr'] });
              
              let city = JSON.parse(json['get_addr_pic']['city']['xy_center_map'], true),
                  points = json['get_addr_pic']['points'],
                  markers = [];
              
              points.map( (item) => {
                let mark = JSON.parse(item['xy_point'], true);
                
                markers.push({
                  coordinate: {
                    latitude: parseFloat(mark[0]),
                    longitude: parseFloat(mark[1]),
                  },
                  title: item['addr'],
                  description: "График работы: 10:00 - 21:30",
                  id: item['id']
                })
              } )
                  
              this.setState({ region: {
                latitude: parseFloat(city[0]),
                longitude: parseFloat(city[1]),
                latitudeDelta: 0.1922,
                longitudeDelta: 0.0321,
              } });
              
              this.setState({ markers: markers });*/
        });
    }
    
    componentDidMount = () => {
        if( document.querySelector('.activeCat') ){
            document.querySelector('.activeCat').classList.remove('activeCat');
        }
        window.scrollTo(0, 0);
        itemsStore.setPage('cart');
        
        this.loadData();
    }
    
    changeTab = (event, newValue) => {
        this.setState({
            valueTab: newValue
        })
    }
    
    render() {
        return (
            <Grid container className="Cart mainContainer MuiGrid-spacing-xs-3">
                <Grid item xs={12}>
                    <Typography variant="h5" component="h1">Корзина</Typography>
                </Grid>
                
                <Grid item container spacing={3} md={10} sm={12} xs={12} xl={10} className="mainContainer" style={{ paddingTop: 0 }}>
                    <AppBar position="static" style={{ backgroundColor: '#fff', color: '#000', zIndex: 0 }} elevation={0}>
                        <Tabs value={this.state.valueTab} onChange={this.changeTab.bind(this)} aria-label="simple tabs example"  style={{ justifyContent: 'center' }}>
                            <Tab label="Доставка" {...a11yProps(0)} disableRipple={true} />
                            <Tab label="Самовывоз" {...a11yProps(1)} disableRipple={true} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={this.state.valueTab} index={0} style={{ width: '100%' }}>
                        <FormControl component="fieldset">
                            <RadioGroup aria-label="gender" name="gender1" >
                                {this.state.my_addr.map((item, key) => 
                                    <div key={key} className="boxAddr">
                                        <FormControlLabel value={item.id} control={<Radio />} label={item.city_name+', '+item.street+' '+item.home+', Пд. '+item.pd+', Эт. '+item.et+', Кв. '+item.kv} />
                                        <FontAwesomeIcon icon={faTimes}/>
                                    </div>
                                )}
                            </RadioGroup>
                        </FormControl>
                        <Accordion>
                            <AccordionSummary
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography variant="h5" component="span" className="newAddr">Новый адрес</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                
                            </AccordionDetails>
                        </Accordion>
                        
                        
                        
                    </TabPanel>
                    <TabPanel value={this.state.valueTab} index={1}>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                            {this.state.pic_point.map((item, key) => 
                                <div className="boxPic" key={key}>
                                    <Typography variant="h5" component="span">{item.raion}</Typography>
                                    <Typography variant="h5" component="span">{item.addr}, c 10:00 до 21:30</Typography>
                                </div>
                            )}
                        </div>
                    </TabPanel>
                </Grid>
                
            </Grid>
        )
    }
}