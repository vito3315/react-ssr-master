import React from 'react';
import { NavLink as Link, Switch, Route, useParams, useHistory } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';

import Typography from '@material-ui/core/Typography';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import InfoIcon from '@material-ui/icons/Info';

import CheckIcon from '@material-ui/icons/Check';

import CloseIcon from '@material-ui/icons/Close';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import itemsStore from '../../stores/items-store';

import TextField from '@material-ui/core/TextField';

import axios from 'axios';
import {Helmet} from "react-helmet";
const queryString = require('query-string');

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faPlus, faMinus, faRubleSign, faCreditCard, faMoneyBill, faCashRegister, faGift } from '@fortawesome/free-solid-svg-icons'


import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import FormLabel from '@material-ui/core/FormLabel';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';

import Snackbar from '@material-ui/core/Snackbar';
import Hidden from '@material-ui/core/Hidden';

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
          <div style={{ width: '100%' }}>
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

function get_city(path){
    return path.split('/')[1];
}

export class Profile extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {      
            actii: [],  
            is_load: false,
            openDialog: false,
            delOrder: false,
            
            errorOpen: false,
            error: {
                title: '',
                text: ''
            },
            
            title: '',
            description: '',
            page: null,
            city_name: props.match.params.cityName,
            
            typeDel: '0',
            
            valueTab: 1,
            info: {},
            arr_day: [],
            arr_m: [ 
                {name: 'Января', value: 1},
                {name: 'Февраля', value: 2},
                {name: 'Марта', value: 3},
                {name: 'Апреля', value: 4},
                {name: 'Мая', value: 5},
                {name: 'Июня', value: 6},
                {name: 'Июля', value: 7},
                {name: 'Августа', value: 8},
                {name: 'Сентября', value: 9},
                {name: 'Октября', value: 10},
                {name: 'Ноября', value: 11},
                {name: 'Декабря', value: 12}
            ],
            
            radiogroup_options: [
                {id: '0', label: 'Решили отредактировать заказ', value: 0 },
                {id: '1', label: 'Не устраивает время ожидания', value: 0 },
                {id: '2', label: 'Изминились планы', value: 0 },
                {id: '3', label: 'Недостаточно средств', value: 0 },
                {id: '4', label: 'Другое', value: 0 },
            ],
            textDel: '',
            
            changeDay: '',
            changeM: '',
            userMail: '',
            openMSG: false,
            statusMSG: false,
            textMSG: '',
            spam: 0,
            userName: '',
            
            spiner: false,
            showOrder: null
        };
        
        if( props.location.search.length > 3 ){
            
            let order_pay = props.location.search;
            
            let p1 = order_pay.split('&');
    		let bank = p1[0].split('bank=');
    		bank = bank[1];

    		let order_id = p1[1].split('orderId=');
            order_id = order_id[1];
            
            this.checkPay(bank, order_id);            
        }
        
        itemsStore.setCity(props.match.params.cityName);
    }
    
    componentDidMount = () => {
        if( document.querySelector('.activeCat') ){
            document.querySelector('.activeCat').classList.remove('activeCat');
        }
        window.scrollTo(0, 0);
        itemsStore.setPage('actii');
        
        Profile.fetchData('/'+this.state.city_name).then( data => {
            this.setState( {
                title: data.page.title,
                description: data.page.description,
            } );
        } );
        
        this.loadData();
    }
    
    loadData(){
        let arr_day = [];
        
        for(let i = 1; i <= 31; i++){
            arr_day.push(i)
        }
        
        fetch('https://jacofood.ru/src/php/test_app.php', {
            method: 'POST',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'},
            body: queryString.stringify({
                type: 'get_user_web', 
                city_id: this.state.city_name,
                user_id: itemsStore.getToken()
            })
        }).then(res => res.json()).then(json => {
            console.log( json )
            
            this.setState({ 
                info: json, 
                is_load: true,
                arr_day: arr_day,
                userMail: json.user.mail,
                spam: json.user.spam,
                userName: json.user.name
            });
        })
        .catch(err => { });
    }
    
    static fetchData(propsData) {
        let data = {
            type: 'get_page_info', 
            city_id: get_city(propsData),
            page: 'profile' 
        };
        
        return axios({
            method: 'POST',
            url:'https://jacofood.ru/src/php/test_app.php',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: queryString.stringify(data)
        }).then(response => {
            if(response['status'] === 200){
                var json = response['data'];
                
                return {
                    title: json.page.title,
                    description: json.page.description,
                    page: json.page,
                }
            } 
        }).catch(function (error) {
            console.log(error);
        });
    }
    
    checkPay(bank, pay_id) {
        let data = {
            type: 'check_pay_web', 
            payId: pay_id,
            bank: bank
        };
        
        axios({
            method: 'POST',
            url:'https://jacofood.ru/src/php/test_app.php',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: queryString.stringify(data)
        }).then(response => {
            if(response['status'] === 200){
                var json = response['data'];
                
                console.log( json )
                
                if( json.repeat ){
                    setTimeout(()=>{
                        this.checkPay(bank, pay_id);
                    }, 5000)
                }else{
                    if( !json.is_create ){
                        this.setState({
                            spiner: false
                        })
                      
                        if( json.st ){
                            this.trueOrder(json.order_id, json.point_id);
                        }else{
                            this.props.history.push(this.props.location.pathname);
                            
                            this.setState({
                                error: {
                                    title: 'Ошибка оплаты', 
                                    text: json.pay.actionCodeDescription
                                },
                                errorOpen: true
                            })
                        }
                    }
                }
            } 
        }).catch(function (error) {
            console.log(error);
        });
    }
    
    trueOrder(order_id, point_id){
        fetch('https://jacofood.ru/src/php/test_app.php', {
            method: 'POST',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'},
            body: queryString.stringify({
                type: 'trueOrder', 
                city_id: this.state.city_name,
                user_id: itemsStore.getToken(),
                
                order_id: order_id,
                point_id: point_id,
            })
        }).then(res => res.json()).then(json => {
            if( json['st'] == false ){
                this.setState({
                    error: {
                        title: 'При подтверждении оплаты произошла ошибка', 
                        text: json.text_err
                    },
                    errorOpen: true
                })
            }else{
                itemsStore.setItems([]);
                
                let data = {
                    orderType: '0',
                    orderAddr: '',
                    orderPic: 0,
                    orderComment: '',
                    
                    orderTimes: '1',
                    orderPredDay: '',
                    orderPredTime: '',
                    
                    orderPay: '',
                    orderSdacha: '',
                };
                
                itemsStore.saveCartData(data);
                
                this.loadData();
            }
        });
    }
    
    closeDialog(){
        this.setState({
            showItem: null,
            openDialog: false
        })
    }
    
    openDialog(item){
        this.setState({
            showItem: item,
            openDialog: true
        })
    }
    
    changeTab = (event, newValue) => {
        this.setState({
            valueTab: newValue
        })
    }
    
    changeM = (event) => {
        this.setState({
            changeM: event.target.value
        })
    }
    
    changeDay = (event) => {
        this.setState({
            changeDay: event.target.value
        })
    }
    
    changeMail = (event) => {
        this.setState({
            userMail: event.target.value
        })
    }
    
    closeAlert(){
        this.setState({
            openMSG: false
        })
    }
    
    changeCheck = (event) => {
        let check = event.target.checked;
        
        fetch('https://jacofood.ru/src/php/test_app.php', {
            method: 'POST',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'},
            body: queryString.stringify({
                type: 'save_profile_spam', 
                my_spam: check ? 1 : 0,
                user_id: itemsStore.getToken(),
            })
        }).then(res => res.json()).then(json => {
            this.setState({
                openMSG: true,
                statusMSG: true,
                textMSG: "Данные успешно обновлены",
                spam: check ? 1 : 0
            })
        });
    }
    
    saveMail(){
        fetch('https://jacofood.ru/src/php/test_app.php', {
            method: 'POST',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'},
            body: queryString.stringify({
                type: 'save_profile_mail_web', 
                my_mail: this.state.userMail,
                user_id: itemsStore.getToken(),
            })
        }).then(res => res.json()).then(json => {
            setTimeout(() => {
                if( json['st'] ){
                    this.setState({
                        openMSG: true,
                        statusMSG: true,
                        textMSG: "Данные успешно обновлены"
                    })
                }else{
                    this.setState({
                        openMSG: true,
                        statusMSG: false,
                        textMSG: json['text']
                    })
                }
            }, 300);
        });
    }
    
    saveDay(){
        let day = this.state.changeDay,
            mo = this.state.changeM;
        
        if( day != '' & mo != '' ){
            
            let nameM = '';
            
            this.state.arr_m.map(function(item, key){
                if( parseInt(item.value) == parseInt(mo) ){
                    nameM = item.name;
                }
            })
            
            fetch('https://jacofood.ru/src/php/test_app.php', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded'},
                body: queryString.stringify({
                    type: 'save_profile_date', 
                    my_date: day + ' ' + nameM,
                    user_id: itemsStore.getToken(),
                })
              }).then(res => res.json()).then(json => {
                if( json['st'] ){
                    fetch('https://jacofood.ru/src/php/test_app.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type':'application/x-www-form-urlencoded'},
                        body: queryString.stringify({
                            type: 'get_user_web', 
                            city_id: this.state.city_name,
                            user_id: itemsStore.getToken()
                        })
                    }).then(res => res.json()).then(json => {
                        this.setState({ 
                            info: json, 
                        });
                    })
                    .catch(err => { });
                }
                  
                setTimeout(() => {
                    if( json['st'] ){
                        this.setState({
                            openMSG: true,
                            statusMSG: true,
                            textMSG: "Данные успешно обновлены"
                        });
                        
                        
                    }else{
                        this.setState({
                            openMSG: true,
                            statusMSG: false,
                            textMSG: json['text']
                        })
                    }
                }, 300);
            });
        }
    }
    
    activePromo(promo_info, promo_name){
        itemsStore.setPromo(JSON.stringify(promo_info), promo_name)
        let res = itemsStore.checkPromo();
        
        setTimeout(() => {
            if( res['st'] ){
                this.setState({
                    openMSG: true,
                    statusMSG: true,
                    textMSG: "Промокод применен"
                })
            }else{
                this.setState({
                    openMSG: true,
                    statusMSG: false,
                    textMSG: res['text']
                })
            }
        }, 300);
    }
    
    changeName = (event) => {
        this.setState({
            userName: event.target.value
        })
    }
    
    saveName(){
        fetch('https://jacofood.ru/src/php/test_app.php', {
            method: 'POST',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'},
            body: queryString.stringify({
                type: 'save_profile_name', 
                my_name: this.state.userName,
                user_id: itemsStore.getToken(),
            })
        }).then(res => res.json()).then(json => {
            setTimeout(() => {
                if( json['st'] ){
                    this.setState({
                        openMSG: true,
                        statusMSG: true,
                        textMSG: "Данные успешно обновлены"
                    })
                }else{
                    this.setState({
                        openMSG: true,
                        statusMSG: false,
                        textMSG: json['text']
                    })
                }
            }, 300);
        });
    }
    
    getOrder(order_id, point_id){
        this.setState({ 
            spiner: true
        });
        
        fetch('https://jacofood.ru/src/php/test_app.php', {
            method: 'POST',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'},
            body: queryString.stringify({
                type: 'get_order', 
                order_id: order_id,
                point_id: point_id
            })
        }).then(res => res.json()).then(json => {
            console.log( json )
            
            setTimeout(()=>{
                this.setState({ 
                    showOrder: json,
                    openDialog: true,
                    spiner: false
                });
            }, 1000)
        })
        .catch(err => { });
    }
    
    closeOrder(){
        this.setState({
            delOrder: true,
            typeDel: '0',
            textDel: ''
        })
    }
    
    changeAddr = (event) => {
        this.setState({
            typeDel: event.target.value,
        })
    }
    
    closeOrderTrue(){
        
        let deltype = this.state.radiogroup_options.find( (item) => item.id == this.state.typeDel );
        
        if( deltype.id == '4' ){
            deltype.label = this.state.textDel;
        }
        
        if (confirm("Отменить заказ #"+this.state.showOrder.order.order_id)) {
            fetch('https://jacofood.ru/src/php/test_app.php', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded'},
                body: queryString.stringify({
                    type: 'close_order', 
                    user_id: itemsStore.getToken(),
                    order_id: this.state.showOrder.order.order_id,
                    point_id: this.state.showOrder.order.point_id,
                    ans: deltype.label
                })
            }).then(res => res.json()).then(json => {
                console.log( json )
                
                /*setTimeout(() => {
                    if( json['st'] ){
                        this.setState({
                            openMSG: true,
                            statusMSG: true,
                            textMSG: "Данные успешно обновлены"
                        })
                    }else{
                        this.setState({
                            openMSG: true,
                            statusMSG: false,
                            textMSG: json['text']
                        })
                    }
                }, 300);*/
            });
        }
    }
    
    repeatOrder(){
        let my_cart = [];
        let all_items = itemsStore.getAllItems();
        let item_info = null;
        
        this.state.showOrder.order_items.map( (item) => {
            item_info = all_items.find( (item_) => item_.id == item.item_id );
            
            if( item_info ){
                let price = parseInt(item_info.price),
                    all_price = parseInt(item.count) * parseInt(item_info.price);
                
                my_cart.push({
                    name: item.name,
                    item_id: item.item_id,
                    count: item.count,
                    
                    one_price: price,
                    all_price: all_price
                })
            }
        } )
        
        let data = {
            orderType: parseInt(this.state.showOrder.order.type_order_) - 1,
            orderAddr: this.state.showOrder.street.name,
            orderPic: parseInt(this.state.showOrder.order.point_id),
            orderComment: '',
            
            orderTimes: '1',
            orderPredDay: '',
            orderPredTime: '',
            
            orderPay: parseInt(this.state.showOrder.order.type_order_) == 1 ? 'cash' : 'in',
            orderSdacha: '',
            
        };
        
        itemsStore.saveCartData(data);
        
        if( this.state.showOrder.order.promo_name && this.state.showOrder.order.promo_name != '' ){
            itemsStore.setPromo( this.state.showOrder.promo_info, this.state.showOrder.order.promo_name )
        }
        itemsStore.setItems(my_cart)
        
        setTimeout(()=>{
            window.location.pathname = '/'+this.state.city_name+'/cart';
        }, 300)
    }
    
    render() {
        return (
            <Grid container className="Profile mainContainer MuiGrid-spacing-xs-3">
                
                <Helmet>
                    <title>{this.state.title}</title>
                    <meta name="description" content={this.state.description} />
                </Helmet>
                
                <Backdrop open={this.state.spiner} style={{ zIndex: 99, color: '#fff' }}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                
                <Dialog
                    open={this.state.errorOpen}
                    onClose={() => this.setState({ errorOpen: false })}
                    className="DialogErr"
                >
                    <Typography variant="h5" component="span" className="orderCheckTitle">{this.state.error.title}</Typography>
                    <FontAwesomeIcon className="closeDialog" onClick={() => this.setState({ errorOpen: false })} icon={faTimes}/>
                    <DialogContent>
                        <DialogContentText className="DialogErrText">{this.state.error.text}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="BtnBorder" onClick={() => this.setState({ errorOpen: false })}>
                            <Button variant="contained" className="BtnCardMain CardInCardItem">Хорошо</Button>
                        </ButtonGroup>
                    </DialogActions>
                </Dialog>
                
                <Grid item xs={12}>
                    <Typography variant="h5" component="h1">Личный кабинет</Typography>
                </Grid>
                
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={this.state.openMSG}
                    autoHideDuration={3000}
                    onClose={this.closeAlert.bind(this)}
                    message={this.state.textMSG}
                    style={{ backgroundColor: this.state.statusMSG ? 'green' : '#BB0025', borderRadius: 4 }}
                    action={
                        <React.Fragment>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={this.closeAlert.bind(this)}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </React.Fragment>
                    }
                />
                
                <Grid item container spacing={3} md={10} sm={12} xs={12} xl={10} className="mainContainer" style={{ paddingTop: 0 }}>
                    <AppBar position="static" style={{ backgroundColor: '#fff', color: '#000', zIndex: 0 }} elevation={0}>
                        <Tabs value={this.state.valueTab} onChange={this.changeTab.bind(this)} aria-label="simple tabs example"  style={{ justifyContent: 'center' }}>
                            <Tab label="Промокоды" {...a11yProps(0)} disableRipple={true} />
                            <Tab label="Заказы" {...a11yProps(1)} disableRipple={true} />
                            <Tab label="Редактирование" {...a11yProps(2)} disableRipple={true} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={this.state.valueTab} index={0} style={{ width: '100%' }}>
                        <div style={{ padding: 12 }}>
                            {this.state.info.promo ?
                                <Hidden mdDown>
                                    <table style={{ width: '100%' }} className="TablePromo">
                                        <thead>
                                            <tr>
                                                <td><Typography variant="h5" component="span">Промокод</Typography></td>
                                                <td><Typography variant="h5" component="span">Промокод дает:</Typography></td>
                                                <td><Typography variant="h5" component="span">Действует до</Typography></td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.info.promo.promo.map((item, key) => 
                                                <tr key={key}>
                                                    <td><Typography variant="h5" component="span" onClick={this.activePromo.bind(this, item.info, item.promo_name)}>{item.promo_name}</Typography></td>
                                                    <td><Typography variant="h5" component="span">{item.promo_text}</Typography></td>
                                                    <td><Typography variant="h5" component="span">{item.date_end}</Typography></td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </Hidden>
                                    :
                                null
                            }
                            {this.state.info.promo ?
                                <Hidden lgUp>
                                    <table style={{ width: '100%' }} className="TablePromoMobile">
                                        <tbody>
                                            {this.state.info.promo.promo.map((item, key) => 
                                                <tr key={key}>
                                                    <td>
                                                        <div>
                                                            <Typography variant="h5" component="span">Промокод: </Typography>
                                                            <Typography variant="h5" component="span">{item.promo_name}</Typography>
                                                        </div>
                                                        <div style={{ width: '100%', paddingTop: 10 }}>
                                                            <Typography variant="h5" component="span">Действует до: </Typography>
                                                            <Typography variant="h5" component="span">{item.date_end}</Typography>
                                                        </div>
                                                        <div style={{ width: '100%', paddingTop: 10, textAlign: 'justify' }}>
                                                            <Typography variant="h5" component="span">Промокод дает: </Typography>
                                                            <Typography variant="h5" component="span">{item.promo_text}</Typography>
                                                        </div>
                                                        <div style={{ width: '100%', paddingTop: 10 }}>
                                                            <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="BtnBorder" style={{ width: '100%' }} onClick={this.activePromo.bind(this, item.info, item.promo_name)}>
                                                                <Button variant="contained" className="BtnCardMain CardInCardItem" style={{ width: '100%' }}>Активирывать промокод</Button>
                                                            </ButtonGroup>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </Hidden>
                                    :
                                null
                            }
                        </div>
                    </TabPanel>
                    <TabPanel value={this.state.valueTab} index={1} style={{ width: '100%' }}>
                        {this.state.info.orders ?
                            <div className="TableOrders">
                                <div className="thead">
                                    <Typography variant="h5" component="span" style={{ flex: 2 }}>№</Typography>
                                    <Typography variant="h5" component="span" style={{ flex: 3 }}>Дата</Typography>
                                    <Typography variant="h5" component="span" style={{ flex: 1 }}>Сумма</Typography>
                                    <Typography variant="h5" component="span" style={{ flex: 1 }}></Typography>
                                </div>
                                <div className="tbody">
                                    {this.state.info.orders.my_orders.map((item, key) => 
                                        <div key={key} className={ (parseInt(item.status_order) == 6 || parseInt(item.is_delete) == 1) ? '' : 'active' } onClick={ this.getOrder.bind(this, item.order_id, item.point_id) }>
                                            <div>
                                                <Typography variant="h5" component="span" style={{ flex: 2 }}>{item.order_id}</Typography>
                                                <Typography variant="h5" component="span" style={{ flex: 3 }}>{item.date_time_new}</Typography>
                                                <Typography variant="h5" component="span" className="CardPriceItem" style={{ flex: 1 }}>{item.sum} <FontAwesomeIcon icon={faRubleSign} /></Typography>
                                                <Typography variant="h5" component="span" style={{ flex: 1 }}>{parseInt(item.is_delete) == 1 ? <CloseIcon /> : parseInt(item.status_order) == 6 ? <CheckIcon /> : null}</Typography>
                                            </div>
                                            
                                            {(parseInt(item.status_order) == 6 || parseInt(item.is_delete) == 1) ? null :
                                                <div className="boxSteps">
                                                    <div>
                                                        <div className={ parseInt(item.steps[0]['active']) == 0 || parseInt(item.steps[0]['active']) == 2 ? '' : 'active' }>
                                                            <Typography variant="h5" component="span">{item.steps[0]['name']}</Typography>
                                                        </div>
                                                        <div className={ parseInt(item.steps[1]['active']) == 0 || parseInt(item.steps[1]['active']) == 2 ? '' : 'active' }>
                                                            <Typography variant="h5" component="span">{item.steps[1]['name']}</Typography>
                                                        </div>
                                                        <div className={ parseInt(item.steps[2]['active']) == 0 || parseInt(item.steps[2]['active']) == 2 ? '' : 'active' }>
                                                            <Typography variant="h5" component="span">{item.steps[2]['name']}</Typography>
                                                        </div>
                                                        <div className={ parseInt(item.steps[3]['active']) == 0 || parseInt(item.steps[3]['active']) == 2 ? '' : 'active' }>
                                                            <Typography variant="h5" component="span">{item.steps[3]['name']}</Typography>                                                        
                                                        </div>
                                                    </div>
                                                    { parseInt(item.time_to_client) == 0 ? null :
                                                        <div>
                                                            <Typography variant="h5" component="span">Заказ { parseInt(item.type_order) == 1 ? 'привезут через: ' : 'будет готов через: ' }{item.time_to_client}</Typography>
                                                        </div>
                                                    }
                                                </div> 
                                            }
                                        </div>
                                    )}
                                </div>
                            </div>
                                :
                            null
                        }
                    </TabPanel>
                    <TabPanel value={this.state.valueTab} index={2} style={{ width: '100%' }}>
                        {this.state.info.user ?
                            <div className="TableInfo">
                                <form noValidate autoComplete="off">
                                    <TextField 
                                        label="Имя" 
                                        value={this.state.userName} 
                                        className="input" 
                                        onChange={this.changeName.bind(this)}
                                        onBlur={this.saveName.bind(this)}
                                    />
                                    <TextField InputProps={{ readOnly: true }} label="Номер телефона" value={this.state.info.user.login} className="input" />
                                </form>
                                <form noValidate autoComplete="off">
                                    {this.state.info.user.date_bir != '' ?
                                        <TextField label="Дата рождения" className="input" InputProps={{ readOnly: true }} value={this.state.info.user.date_bir} />
                                            :
                                        <div className="input">
                                            <InputLabel className="otherLabel">Дата рождения</InputLabel>
                                            
                                            <FormControl className="ChangeDay">
                                                <Select
                                                  labelId="demo-simple-select-label"
                                                  id="demo-simple-select"
                                                  displayEmpty
                                                  value={this.state.changeDay}
                                                  onChange={this.changeDay.bind(this)}
                                                  onBlur={this.saveDay.bind(this)}
                                                >
                                                    <MenuItem className="menuItem" value="">День</MenuItem>
                                                    {this.state.arr_day.map((item, key) =>
                                                        <MenuItem key={key} className="menuItem" value={item}>{item}</MenuItem>
                                                    )}
                                                </Select>
                                            </FormControl>
                                            <FormControl className="ChangeM">
                                                <Select
                                                  labelId="demo-simple-select-label"
                                                  id="demo-simple-select"
                                                  displayEmpty
                                                  value={this.state.changeM}
                                                  onChange={this.changeM.bind(this)}
                                                  onBlur={this.saveDay.bind(this)}
                                                >
                                                    <MenuItem className="menuItem" value="">Месяц</MenuItem>
                                                    {this.state.arr_m.map((item, key) =>
                                                        <MenuItem key={key} className="menuItem" value={item.value}>{item.name}</MenuItem>
                                                    )}
                                                </Select>
                                            </FormControl>
                                        </div>
                                    }
                                    <TextField 
                                        label="Почта" 
                                        className="input" 
                                        value={this.state.userMail} 
                                        onChange={this.changeMail.bind(this)} 
                                        onBlur={this.saveMail.bind(this)}
                                    />
                                </form>
                                
                                <FormGroup row className="input checkbox">
                                    <FormControlLabel 
                                        onChange={this.changeCheck.bind(this)} 
                                        control={<Checkbox checked={ parseInt(this.state.spam) == 1 ? true : false } name="checkedC" />} 
                                        label="Получать сообщения с акциями" 
                                    />
                                </FormGroup>
                            </div>
                                :
                            null
                        }
                    </TabPanel>
                </Grid>
                
                { this.state.showOrder ?
                    <Dialog 
                        onClose={this.closeDialog.bind(this)} 
                        aria-labelledby="customized-dialog-title" 
                        className="showOrderDialog" 
                        open={this.state.openDialog}
                        fullWidth={true}
                    >
                        <MuiDialogTitle disableTypography style={{ margin: 0, padding: 8 }}>
                            <Typography variant="h6">Заказ {this.state.showOrder.order.order_id}</Typography>
                          
                            <IconButton aria-label="close" style={{ position: 'absolute', top: 0, right: 0, color: '#000' }} onClick={this.closeDialog.bind(this)}>
                                <CloseIcon />
                            </IconButton>
                        </MuiDialogTitle>
                        
                        <MuiDialogContent className="showOrderDialogContent">
                            <Typography variant="h6" component="span">{this.state.showOrder.order.type_order}: {this.state.showOrder.order.type_order_addr_new}</Typography>
                            <Typography variant="h6" component="span">{this.state.showOrder.order.time_order_name}: {this.state.showOrder.order.time_order}</Typography>
                            { parseInt(this.state.showOrder.order.is_preorder) == 1 ? null :
                                <Typography variant="h6" component="span">{this.state.showOrder.order.text_time}{this.state.showOrder.order.unix_time_to_client}</Typography>
                            }
                            { this.state.showOrder.order.promo_name == null || this.state.showOrder.order.promo_name.length == 0 ? null :
                                <Typography variant="h6" component="span">Промокод: {this.state.showOrder.order.promo_name}</Typography>
                            }
                            { this.state.showOrder.order.promo_name == null || this.state.showOrder.order.promo_name.length == 0 ? null :
                                <Typography variant="h6" component="span" className="noSpace">{this.state.showOrder.order.promo_text}</Typography>
                            }
                            <Typography variant="h5" component="span" className="CardPriceItem">Сумма закза: {this.state.showOrder.order.sum_order} <FontAwesomeIcon icon={faRubleSign} /></Typography>
                            
                            <table className="tableOrderCheck">
                                <tbody>
                                    {this.state.showOrder.order_items.map((item, key) => 
                                        <tr key={key}>
                                            <td>
                                                <Typography variant="h5" component="span">{item.name}</Typography>
                                            </td>
                                            <td>
                                                <Typography variant="h5" component="span">{item.count}</Typography>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            
                        </MuiDialogContent>
                        
                        { parseInt( this.state.showOrder.order.is_delete ) == 0 && parseInt( this.state.showOrder.order.status_order ) !== 6 ? 
                            <MuiDialogActions style={{ justifyContent: 'flex-end', padding: '15px 0px' }}>
                                <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="BtnBorderOther" style={{ marginRight: 24 }}>
                                    <Button variant="contained" className="BtnCardMain CardInCardItem" onClick={ this.closeOrder.bind(this, this.state.showOrder.order.order_id, this.state.showOrder.order.point_id) }>Отменить заказ</Button>
                                </ButtonGroup>
                            </MuiDialogActions>
                                :
                            null
                        }
                        { parseInt( this.state.showOrder.order.is_delete ) == 1 || parseInt( this.state.showOrder.order.status_order ) == 6 ? 
                            <MuiDialogActions style={{ justifyContent: 'flex-end', padding: '15px 0px' }}>
                                <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="BtnBorderOther" style={{ marginRight: 24 }}>
                                    <Button variant="contained" className="BtnCardMain CardInCardItem" onClick={ this.repeatOrder.bind(this, this.state.showOrder.order.order_id, this.state.showOrder.order.point_id) }>Повторить заказ</Button>
                                </ButtonGroup>
                            </MuiDialogActions>
                                :
                            null
                        }
                    </Dialog>
                        :
                    null
                }
                
                <Dialog open={this.state.delOrder} onClose={() => { this.setState({delOrder: false}) }} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Отмена заказа</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Нам очень жаль, что вы приняли решение отменить заказ. Возможно, мы сделали что-то не так, помогите нам стать лучше, поделитесь причиной отказа:
                        </DialogContentText>
                      
                        <IconButton aria-label="close" style={{ position: 'absolute', top: 0, right: 0, color: '#000' }} onClick={() => { this.setState({delOrder: false}) }}>
                            <CloseIcon />
                        </IconButton>
                      
                        <FormControl component="fieldset">
                            <RadioGroup name="typeDel" value={ this.state.typeDel } onChange={this.changeAddr} >
                                {this.state.radiogroup_options.map((item, key) => 
                                    <FormControlLabel key={key} value={item.id} control={<Radio />} label={item.label} />
                                )}
                            </RadioGroup>
                        </FormControl>
                      
                        <TextField
                            //autoFocus
                            onFocus={ () => { this.setState({ typeDel: '4' }) } }
                            value={ this.state.textDel }
                            onChange={ (event) => { this.setState({ textDel: event.target.value }) } }
                            margin="dense"
                            id="name"
                            label="Причина отмены"
                            type="text"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { this.setState({delOrder: false}) }} color="primary">К заказу</Button>
                        <Button onClick={this.closeOrderTrue.bind(this)} color="primary">Отменить заказ</Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        )
    }
}