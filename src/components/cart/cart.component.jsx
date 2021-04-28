import React from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faPlus, faMinus, faRubleSign } from '@fortawesome/free-solid-svg-icons'

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


import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

import TextField from '@material-ui/core/TextField';


import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';

import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import { blue } from '@material-ui/core/colors';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import itemsStore from '../../stores/items-store';
import { autorun } from "mobx"

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

const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {
    const classes = useStyles();
    const { onClose, selectedValue, open } = props;
  
    const handleClose = () => {
      onClose(selectedValue);
    };
  
    const handleListItemClick = (value) => {
      onClose(value);
    };
  
    return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
        <List>
          {emails.map((email) => (
            <ListItem button onClick={() => handleListItemClick(email)} key={email}>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={email} />
            </ListItem>
          ))}
  
          <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add account" />
          </ListItem>
        </List>
      </Dialog>
    );
  }
  
  SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };
  
function SimpleDialogDemo() {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(emails[1]);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = (value) => {
      setOpen(false);
      setSelectedValue(value);
    };
  
    return (
      <div>
        <Typography variant="subtitle1">Selected: {selectedValue}</Typography>
        <br />
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Open simple dialog
        </Button>
        <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
      </div>
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
            all_addr: [],
            
            cartItems_main: [],
            cartItems_dop: [],
            cartItems_need_dop: []
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
        
        let cartItems = itemsStore.getItems();
        let allItems = itemsStore.getAllItems();
        
        let cartItems_new = [];
        
        if( cartItems.length > 0 && allItems.length > 0 ){
            cartItems.map((item) => {
                let thisitem = allItems.filter( (item_) => item_.id == item.item_id )[0];
                
                if(thisitem){
                    cartItems_new.push({
                        id: item.item_id,
                        cat_id: thisitem.cat_id,
                        name: item.name,
                        desc: thisitem.tmp_desc,
                        count: item.count,
                        allPrice: item.all_price,
                        img: thisitem.img,
                        imgUpdate: thisitem.img_date_update,
                    })
                }
            })
            
            let main = cartItems_new.filter( (item_) => parseInt(item_.cat_id) !== 7 );
            let dop = cartItems_new.filter( (item_) => parseInt(item_.cat_id) == 7 );
            let need_dop = itemsStore.check_need_dops();
            
            this.setState({
                cartItems_main: main,
                cartItems_dop: dop,
                cartItems_need_dop: need_dop
            })
        }
        
        autorun(() => {
            let cartItems = itemsStore.getItems();
            let allItems = itemsStore.getAllItems();
            let need_dop = itemsStore.check_need_dops();
            
            let cartItems_new = [];
            
            cartItems.map((item) => {
                let thisitem = allItems.filter( (item_) => item_.id == item.item_id )[0];
                
                if(thisitem){
                    cartItems_new.push({
                        id: item.item_id,
                        cat_id: thisitem.cat_id,
                        name: item.name,
                        desc: thisitem.tmp_desc,
                        count: item.count,
                        allPrice: item.all_price,
                        img: thisitem.img,
                        imgUpdate: thisitem.img_date_update,
                    })
                }
            })
            
            let main = cartItems_new.filter( (item_) => parseInt(item_.cat_id) !== 7 );
            let dop = cartItems_new.filter( (item_) => parseInt(item_.cat_id) == 7 );
            
            let dop_new = [];
            
            need_dop.map((item) => {
                let cart_item = cartItems_new.filter( (item_) => parseInt(item_.id) == parseInt(item.id) )[0];
                
                if( !cart_item ){
                    dop_new.push({
                        id: item.id,
                        cat_id: item.cat_id,
                        name: item.name,
                        desc: item.tmp_desc,
                        count: 0,
                        allPrice: 0,
                        img: item.img,
                        imgUpdate: item.img_date_update,
                    })
                }else{
                    dop_new.push({
                        id: item.id,
                        cat_id: item.cat_id,
                        name: item.name,
                        desc: item.tmp_desc,
                        count: cart_item.count,
                        allPrice: cart_item.allPrice,
                        img: item.img,
                        imgUpdate: item.img_date_update,
                    })
                }
            })
            
            console.log( 'main', main )
            console.log( 'dop', dop )
            console.log( 'need_dop', need_dop )
            
            this.setState({
                cartItems_main: main,
                cartItems_dop: dop_new,
                cartItems_need_dop: need_dop
            })
        })
    }
    
    changeTab = (event, newValue) => {
        this.setState({
            valueTab: newValue
        })
    }
    
    add(item_id){
        itemsStore.AddItem(item_id);
    }
    
    minus(item_id){
        itemsStore.MinusItem(item_id);
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
                            <RadioGroup name="addrs" >
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
                    
                    <div>
                        <form noValidate autoComplete="off">
                            <TextField
                                style={{ width: '100%' }}
                                id="outlined-multiline-flexible"
                                label="Комментарий курьеру"
                                multiline
                                rowsMax={2}
                                //value={value}
                                //onChange={handleChange}
                                variant="outlined"
                            />
                        </form>
                    </div>
                    <div>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Оплата</FormLabel>
                            <RadioGroup name="pays" value={1}>
                                <FormControlLabel value={1} control={<Radio />} label='Наличными' />
                                <FormControlLabel value={2} control={<Radio />} label='Онлайн' />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Когда приготовить?</FormLabel>
                            <RadioGroup name="pays" value={1}>
                                <FormControlLabel value={1} control={<Radio />} label='Как можно быстрее' />
                                <FormControlLabel value={2} control={<Radio />} label='Предзаказ' />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl style={{ width: '30%' }}>
                            <InputLabel htmlFor="age-native-simple">День</InputLabel>
                            <Select
                              native
                              //value={state.age}
                              //onChange={handleChange}
                              inputProps={{
                                name: 'age',
                                id: 'age-native-simple',
                              }}
                            >
                              <option value={1}>Сегодня, 27 апреля, 2021г.</option>
                              <option value={2}>Завтра, 28 апреля, 2021г.</option>
                              <option value={3}>30 апреля, 2021г.</option>
                              <option value={4}>1 Мая, 2021г.</option>
                              <option value={5}>2 Мая, 2021г.</option>
                            </Select>
                        </FormControl>
                        <FormControl style={{ width: '20%' }}>
                            <InputLabel htmlFor="age-native-simple">Время</InputLabel>
                            <Select
                              native
                              //value={state.age}
                              //onChange={handleChange}
                              inputProps={{
                                name: 'age',
                                id: 'age-native-simple',
                              }}
                            >
                              <option value={1}>10:40 - 11:00</option>
                              <option value={2}>10:40 - 11:00</option>
                              <option value={3}>10:40 - 11:00</option>
                              <option value={4}>10:40 - 11:00</option>
                              <option value={5}>10:40 - 11:00</option>
                              <option value={6}>10:40 - 11:00</option>
                              <option value={7}>10:40 - 11:00</option>
                              <option value={8}>10:40 - 11:00</option>
                              <option value={9}>10:40 - 11:00</option>
                              <option value={10}>10:40 - 11:00</option>
                              <option value={11}>10:40 - 11:00</option>
                              <option value={12}>10:40 - 11:00</option>
                              <option value={13}>10:40 - 11:00</option>
                              <option value={14}>10:40 - 11:00</option>
                            </Select>
                        </FormControl>
                    </div>
                    
                    <div>
                        <Typography variant="h5" component="h2">Моя корзина</Typography>
                    </div>
                    <div>
                        <table className="tableCart">
                            <tbody>
                                {this.state.cartItems_main.map((item, key) =>
                                    <tr key={key}>
                                        <td style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            <img src={"https://newjacofood.ru/src/img/items/"+item.img+'?'+item.imgUpdate} />
                                        
                                            <div>
                                                <Typography variant="h5" component="span" className="nameItem">{item.name}</Typography>
                                                <Typography variant="h5" component="span" className="descItem">{item.desc}</Typography>
                                            </div>
                                        </td>
                                        <td>
                                            <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="count">
                                                <Button variant="contained" className="BtnCardMain" onClick={this.minus.bind(this, item.id)}>
                                                    <FontAwesomeIcon icon={faMinus} style={{ fontSize: '1rem' }} />
                                                </Button>
                                                <Button variant="contained" className="BtnCardMain" >
                                                    <Typography component="span" className="CardCountItem">{item.count}</Typography>
                                                </Button>
                                                <Button variant="contained" className="BtnCardMain" onClick={this.add.bind(this, item.id)}> 
                                                    <FontAwesomeIcon icon={faPlus} style={{ fontSize: '1rem' }} />
                                                </Button>
                                            </ButtonGroup>
                                        </td>
                                        <td>
                                            <Typography gutterBottom variant="h5" component="span" className="namePrice">{item.allPrice} <FontAwesomeIcon icon={faRubleSign} /></Typography>
                                        </td>
                                    </tr>
                                )}
                                <tr className="rowAboutDop">
                                    <td colSpan='3'>
                                        <Typography gutterBottom variant="h5" component="span" className="">Соевый соус, имбирь и васаби приобретаются отдельно!</Typography>
                                        <br />
                                        <Typography gutterBottom variant="h5" component="span" className="">Не забудь добавить нужные позиции в корзину.</Typography>
                                    </td>
                                </tr>
                                {this.state.cartItems_dop.map((item, key) =>
                                    <tr key={key}>
                                        <td style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            <img src={"https://newjacofood.ru/src/img/items/"+item.img+'?'+item.imgUpdate} />
                                        
                                            <div>
                                                <Typography variant="h5" component="span" className="nameItem">{item.name}</Typography>
                                                <Typography variant="h5" component="span" className="descItem">{item.desc}</Typography>
                                            </div>
                                        </td>
                                        <td>
                                            <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="count">
                                                <Button variant="contained" className="BtnCardMain" onClick={this.minus.bind(this, item.id)}>
                                                    <FontAwesomeIcon icon={faMinus} style={{ fontSize: '1rem' }} />
                                                </Button>
                                                <Button variant="contained" className="BtnCardMain" >
                                                    <Typography component="span" className="CardCountItem">{item.count}</Typography>
                                                </Button>
                                                <Button variant="contained" className="BtnCardMain" onClick={this.add.bind(this, item.id)}> 
                                                    <FontAwesomeIcon icon={faPlus} style={{ fontSize: '1rem' }} />
                                                </Button>
                                            </ButtonGroup>
                                        </td>
                                        <td>
                                            <Typography gutterBottom variant="h5" component="span" className="namePrice">{item.allPrice} <FontAwesomeIcon icon={faRubleSign} /></Typography>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                </Grid>
                
            </Grid>
        )
    }
}