import React from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faPlus, faMinus, faRubleSign } from '@fortawesome/free-solid-svg-icons'

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';

import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';


import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

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


import Input from '@material-ui/core/Input';

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
            city_name: this.props.cityName,
            
            sumDiv: 0,
            allPrice: 0,
            
            pic_point: [],
            my_addr: [],
            all_addr: [],
            date_pred: [],
            
            pays: {
                dev: [
                    {id: '0', name: 'Наличными'},
                    {id: '1', name: 'Онлайн'},
                ],
                dev_mini: [
                    {id: '0', name: 'Наличными'},
                ],
                pic: [
                    {id: '0', name: 'В кафе'},
                ]
            },
            renderPay: [
                {id: '0', name: 'Наличными'},
                {id: '1', name: 'Онлайн'},
            ],
            
            cartItems_main: [],
            cartItems_dop: [],
            cartItems_need_dop: [],
            
            timePred: [],
            
            error: {
                title: '', 
                text: ''
            },
            errorOpen: false,
            
            orderType: 0,
            orderAddr: null,
            orderPic: 0,
            orderComment: '',
            orderPay: '0',
            
            orderTimes: '1',
            orderPredDay: '',
            orderPredTime: '',
            
            orderSdacha: '',
            orderPromo: '',
            orderPromoText: ''
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
                    date_pred: json.date_pred
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
                cartItems_need_dop: need_dop,
                
                sumDiv: itemsStore.getSumDiv(),
                allPrice: itemsStore.getAllPrice()
            })
        }
        
        let cartData = itemsStore.getCartData();
        
        if( cartData ){
            this.setState({
                orderType: cartData.orderType,
                orderAddr: cartData.orderAddr,
                orderPic: cartData.orderPic,
                orderComment: cartData.orderComment,
                
                orderTimes: cartData.orderTimes,
                orderPredDay: cartData.orderPredDay,
                orderPredTime: cartData.orderPredTime,                
                
                orderPay: cartData.orderPay,
                orderSdacha: cartData.orderSdacha
            })
            
            if( cartData.orderPredDay != '' ){
                setTimeout(() => {
                    this.loadTimePred();   
                }, 300)
            }
            
            if( cartData.orderAddr.id ){
                let allPrice = itemsStore.getAllPrice();
                
                if( parseInt(cartData.orderAddr.free_drive) == 1 ){
                    if( parseInt(allPrice) > 0 ){
                        itemsStore.setSumDiv(0);
                    }else{
                        itemsStore.setSumDiv(1);
                    }
                }else{
                    itemsStore.setSumDiv(parseInt(cartData.orderAddr.sum_div));
                }
            }
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
            
            this.setState({
                cartItems_main: main,
                cartItems_dop: dop_new,
                cartItems_need_dop: need_dop,
                
                sumDiv: itemsStore.getSumDiv(),
                allPrice: itemsStore.getAllPrice()
            })
        })
    }
    
    changeTab = (event, newValue) => {
        this.setState({
            orderType: newValue
        })
        itemsStore.setSumDiv(0);
        
        this.saveData();
    }
    
    add(item_id){
        itemsStore.AddItem(item_id);
    }
    
    minus(item_id){
        itemsStore.MinusItem(item_id);
    }
    
    changeAddr = (event) => {
        let thisitem = this.state.my_addr.filter( (item) => item.id == event.target.value )[0];
        let allPrice = itemsStore.getAllPrice();
        
        if( parseInt(thisitem.free_drive) == 1 ){
            if( parseInt(allPrice) > 0 ){
                itemsStore.setSumDiv(0);
            }else{
                itemsStore.setSumDiv(1);
            }
        }else{
            itemsStore.setSumDiv(parseInt(thisitem.sum_div));
        }
        
        console.log( thisitem )
        
        
        this.setState({
            orderAddr: thisitem
        })
        
        this.saveData();
    }
    
    choosePic(pointId){
        if( document.querySelector('.boxPic.active') ){
            document.querySelector('.boxPic.active').classList.remove('active');
        }
        document.querySelector('#pic_'+pointId).classList.add('active');
        
        this.setState({
            orderPic: pointId
        })
        
        this.saveData();
    }
    
    changeComment = (event) => {
        let text = event.target.value;
        
        if( text.length <= 50 ){
            this.setState({
                orderComment: event.target.value
            })
        }
        
        this.saveData();
    }
    
    changePay = (event) => {
        this.setState({
            orderPay: event.target.value
        })
        
        this.saveData();
    }
    
    changeTimes = (event) => {
        let type = event.target.value,
            type_order = this.state.orderType;
        
        if( type_order == 0 ){
            if( type == 1 ){
                this.setState({
                    renderPay: this.state.pays.dev,
                })
            }else{
                this.setState({
                    renderPay: this.state.pays.dev_mini,
                })
            }
        }else{
            this.setState({
                renderPay: this.state.pays.pic,
            })
        }
        
        this.setState({
            orderTimes: type,
            orderPay: '0',
        })
        
        this.loadTimePred();
        
        this.saveData();
    }
    
    changeSdacha = (event) => {
        this.setState({
            orderSdacha: event.target.value
        })
        
        this.saveData();
    }
    
    checkPromo(){
        fetch('https://jacofood.ru/src/php/test_app.php', {
            method: 'POST',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'},
            body: queryString.stringify({
                type: 'get_promo_web', 
                point_id: 1,
                city_id: itemsStore.getCity(),
                promo_name: this.state.orderPromo
            })
        }).then(res => res.json()).then(json => {
            itemsStore.setPromo( JSON.stringify(json) );
            let check_promo = itemsStore.checkPromo();
          
            console.log( check_promo )
            
            this.setState({
                orderPromoText: check_promo.text
            })
        })
    }
    
    saveData(){
        setTimeout(()=>{
            let data = {
                orderType: this.state.orderType,
                orderAddr: this.state.orderAddr,
                orderPic: this.state.orderPic,
                orderComment: this.state.orderComment,
                
                orderTimes: this.state.orderTimes,
                orderPredDay: this.state.orderPredDay,
                orderPredTime: this.state.orderPredTime,
                
                orderPay: this.state.orderPay,
                orderSdacha: this.state.orderSdacha,
                
            };
            
            itemsStore.saveCartData(data);
        }, 500)
    }
    
    loadTimePred(){
        let my_cart = [];
        let cartItems = itemsStore.getItems();  
        
        cartItems.forEach(el => {
            my_cart.push({
                item_id: el.item_id,
                count: el.count,
            });
        });
        
        fetch('https://jacofood.ru/src/php/test_app.php', {
            method: 'POST',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'},
            body: queryString.stringify({
                type: 'get_times_pred_web',  
                point_id: this.state.orderType+1 == 1 ? this.state.orderAddr.point_id ?? 0 : this.state.orderPic ?? 0,
                type_order: this.state.orderType+1,
                date: this.state.orderPredDay,
                cart: JSON.stringify( my_cart ),
            })
        }).then(res => res.json()).then(json => {
            console.log( json )
            
            if( !json.st ){
                this.setState({
                    error: {
                        title: 'Предупреждение', 
                        text: json.text
                    },
                    errorOpen: true
                })
            }else{
                this.setState({
                    timePred: json.data
                })
            }
        });
    }
    
    changePredDay = (event) => {
        this.setState({
            orderPredDay: event.target.value
        })
        
        setTimeout(() => {
            this.loadTimePred();   
        }, 300)
             
        this.saveData();
    }
    
    changePredTime = (event) => {
        this.setState({
            orderPredTime: event.target.value
        })
        
        this.saveData();
    }
    
    render() {
        return (
            <Grid container className="Cart mainContainer MuiGrid-spacing-xs-3">
                <Grid item xs={12}>
                    <Typography variant="h5" component="h1">Корзина</Typography>
                </Grid>
                
                <Grid item container spacing={3} md={10} sm={12} xs={12} xl={10} className="mainContainer" style={{ paddingTop: 0 }}>
                    <AppBar position="static" style={{ backgroundColor: '#fff', color: '#000', zIndex: 0 }} elevation={0}>
                        <Tabs value={this.state.orderType} onChange={this.changeTab.bind(this)} aria-label="simple tabs example"  style={{ justifyContent: 'center' }}>
                            <Tab label="Доставка" {...a11yProps(0)} disableRipple={true} />
                            <Tab label="Самовывоз" {...a11yProps(1)} disableRipple={true} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={this.state.orderType} index={0} style={{ width: '100%' }}>
                        <FormControl component="fieldset">
                            <RadioGroup name="addrs" value={ this.state.orderAddr ? this.state.orderAddr.id : 0 } onChange={this.changeAddr}>
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
                    <TabPanel value={this.state.orderType} index={1}>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                            {this.state.pic_point.map((item, key) => 
                                <div className="boxPic" id={'pic_'+item.id} key={key} onClick={this.choosePic.bind(this, item.id)}>
                                    <Typography variant="h5" component="span">{item.raion}</Typography>
                                    <Typography variant="h5" component="span">{item.addr}, c 10:00 до 21:30</Typography>
                                </div>
                            )}
                        </div>
                    </TabPanel>
                    
                    {this.state.orderType == 0 ?
                        <div>
                            <form noValidate autoComplete="off">
                                <TextField
                                    style={{ width: '100%' }}
                                    id="outlined-multiline-flexible"
                                    label="Комментарий курьеру"
                                    multiline
                                    rowsMax={2}
                                    value={this.state.orderComment}
                                    onChange={this.changeComment}
                                    variant="outlined"
                                />
                            </form>
                        </div>
                            :
                        null
                    }
                    <div>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Оплата</FormLabel>
                            <RadioGroup aria-label="pays" name="pays" value={this.state.orderPay} onChange={this.changePay}>
                                {this.state.renderPay.map((item, key) => 
                                    <FormControlLabel key={key} value={item.id} control={<Radio />} label={item.name} />
                                )}
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Когда приготовить?</FormLabel>
                            <RadioGroup aria-label="times" name="times" value={this.state.orderTimes} onChange={this.changeTimes}>
                                <FormControlLabel value='1' control={<Radio />} label="Как можно быстрее" />
                                <FormControlLabel value='2' control={<Radio />} label="Предзаказ" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    {this.state.orderTimes == 2 ?
                        <div>
                            <FormControl style={{ width: '30%' }}>
                                <InputLabel htmlFor="age-native-simple">День</InputLabel>
                                <Select
                                  displayEmpty
                                  value={this.state.orderPredDay}
                                  onChange={this.changePredDay}
                                  inputProps={{
                                    id: 'age-native-simple',
                                  }}
                                >
                                    {this.state.date_pred.map((item, key) => 
                                        <MenuItem key={key} value={item.date}>{item.text}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            <FormControl style={{ width: '20%' }}>
                                <InputLabel htmlFor="age-native-simple1">Время</InputLabel>
                                <Select
                                  displayEmpty
                                  value={this.state.orderPredTime}
                                  onChange={this.changePredTime}
                                  inputProps={{
                                    id: 'age-native-simple1',
                                  }}
                                >
                                    {this.state.timePred.map((item, key) => 
                                        <MenuItem key={key} value={item.value}>{item.text}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </div>
                            :
                        null
                    }
                    
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
                            <tfoot>
                                <tr>
                                    <td colSpan='2'>
                                        <Typography component="span">Доставка:</Typography>
                                    </td>
                                    <td>
                                        <Typography gutterBottom variant="h5" component="span" className="namePrice">{this.state.sumDiv} <FontAwesomeIcon icon={faRubleSign} /></Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan='2'>
                                        <Typography component="span">Итого:</Typography>
                                    </td>
                                    <td>
                                        <Typography gutterBottom variant="h5" component="span" className="namePrice">{ this.state.sumDiv + this.state.allPrice } <FontAwesomeIcon icon={faRubleSign} /></Typography>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    
                    {this.state.orderType == 0 ?
                        <div className="orderSdacha">
                            <div>
                                <FormControl>
                                    <InputLabel htmlFor="standard-adornment-weight">Подготовить сдачу с</InputLabel>
                                    <Input
                                        type="number"
                                        id="standard-adornment-weight"
                                        value={this.state.orderSdacha}
                                        onChange={this.changeSdacha}
                                        endAdornment={<FontAwesomeIcon icon={faRubleSign} />}
                                    />
                                </FormControl>
                            </div>
                        </div>    
                            :
                        null
                    }
                    <div className="promoOrder">
                        <div>
                            <Paper component="div" className="SpacePromo">
                                <InputBase
                                    onBlur={this.checkPromo.bind(this)}
                                    value={this.state.orderPromo}
                                    onChange={ event => this.setState({ orderPromo: event.target.value }) }
                                    placeholder="Промокод"
                                />
                                <Divider orientation="vertical" />
                                <IconButton color="primary" aria-label="directions" onClick={this.checkPromo.bind(this)}>
                                    <CheckOutlinedIcon />
                                </IconButton>
                            </Paper>
                            {this.state.orderPromoText.length > 0 ?
                                <div className="DescPromo">
                                    <Typography variant="h5" component="span">Промокод дает: {this.state.orderPromoText}</Typography>
                                </div>
                                    :
                                null
                            }
                        </div>
                        <div>
                            <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="BtnBorder">
                                <Button variant="contained" className="BtnCardMain CardInCardItem">Заказать</Button>
                            </ButtonGroup>
                        </div>
                    </div>
                    
                </Grid>
                
                
                <Dialog
                    open={this.state.errorOpen}
                    onClose={() => this.setState({ errorOpen: false })}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{this.state.error.title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">{this.state.error.text}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({ errorOpen: false })} color="primary">Хорошо</Button>
                    </DialogActions>
                </Dialog>
                
            </Grid>
        )
    }
}