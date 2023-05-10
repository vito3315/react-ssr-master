import React from 'react';
import { NavLink as Link } from 'react-router-dom';

import Grid from '@mui/material/Grid';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faPlus, faMinus, faCreditCard, faMoneyBill, faCashRegister, faGift, faQrcode } from '@fortawesome/free-solid-svg-icons'

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';

import AppBar from '@mui/material/AppBar';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';

import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import Input from '@mui/material/Input';

import Autocomplete from '@mui/material/Autocomplete';

import itemsStore from '../../stores/items-store';
import config from '../../stores/config';

import { autorun } from "mobx"

import {Helmet} from "react-helmet";

const queryString = require('query-string');
import axios from 'axios';

import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

var firebaseAPP = null;

function get_city(path){
    
    path = path.split('/');
    path = path.filter( (item) => item != '' );
    
    return path[ 0 ];
}

function Ruble(props){
    return (
        <svg width={ props.width ? props.width : 50 } height="20" viewBox={ props.viewBox ? props.viewBox : "0 0 1400 200"} xmlns="http://www.w3.org/2000/svg">
            <g>
                <path id="svg_1" d="m219.27,252.76c63.98,-2.85 99.22,-39.48 99.22,-103.13c0,-37.42 -12.62,-65.49 -37.52,-83.44c-22.29,-16.07 -48.63,-19.21 -62.35,-19.65c-28.61,-0.92 -107.02,-0.04 -110.34,0c-5.75,0.07 -10.38,4.75 -10.38,10.5l0,174.95c-9.23,-0.11 -15.07,-0.2 -15.31,-0.21c-0.06,0 -0.11,0 -0.17,0c-5.72,0 -10.41,4.59 -10.5,10.34c-0.09,5.8 4.54,10.57 10.34,10.66c0.95,0.01 6.78,0.1 15.64,0.21l0,26.12l-15.48,0c-5.8,0 -10.5,4.7 -10.5,10.5s4.7,10.5 10.5,10.5l15.48,0l0,74.89c0,5.8 4.7,10.5 10.5,10.5s10.5,-4.7 10.5,-10.5l0,-74.9l109.39,0c5.8,0 10.5,-4.7 10.5,-10.5s-4.7,-10.5 -10.5,-10.5l-109.39,0l0,-25.88c32.67,0.31 78.53,0.51 100.37,-0.46zm-100.37,-185.33c22.81,-0.21 76.99,-0.61 99.05,0.1c23.92,0.77 79.55,10.31 79.55,82.1c0,52.17 -26.63,79.82 -79.16,82.16c-21.17,0.94 -66.91,0.74 -99.44,0.43l0,-164.79z"/>
            </g>
        </svg>
    )
}

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

class CartItem extends React.Component {
    _isMounted = false;
    firebaseAnalitic = null;

    constructor(props) {
        super(props);
        
        this.firebaseAnalitic = this.props.firebaseAnalitic;

        this.state = {  
            item: this.props.item,
            type: this.props.type,
            count: 0,
            onePrice: 0,
            new_onePrice: -1,
            allPrice: 0
        };
    }
    
    componentDidMount(){
        this._isMounted = true; 
        
        let cartItems = itemsStore.getItems();
        let promo_cartItems = itemsStore.getItemsPromo();
        let this_item = cartItems.find( (item) => item.item_id == this.state.item.id );
        
        if( this_item ){
            this.setState({
                count: this_item.count,
                onePrice: this_item.one_price,
                allPrice: this_item.all_price,
            })
        }
        
        autorun(() => {
            if( this._isMounted === true ){
                let new_cartItems = itemsStore.getItems();
                let promo_cartItems = itemsStore.getItemsPromo();
                
                if( promo_cartItems && promo_cartItems.length > 0 ){
                    let this_item = promo_cartItems.find( (item) => item.item_id == this.state.item.id );
                    
                    if( this_item ){
                        this.setState({
                            count: this_item.count,
                            onePrice: this_item.one_price,
                            allPrice: this_item.all_price,
                        })
                    }
                }
                
                let this_item = new_cartItems.find( (item) => item.item_id == this.state.item.id );
                
                if( !this_item ){
                    this_item = promo_cartItems.find( (item) => item.item_id == this.state.item.id );
                }

                if( this.state.type != 'promo' ){
                    if( this_item ){
                        this.setState({
                            count: this_item.count,
                            onePrice: this_item.one_price,
                            allPrice: this_item.all_price,
                            new_onePrice: this_item.new_one_price ? this_item.new_one_price : -1
                        })
                    }else{
                        this.setState({
                            count: 0,
                            onePrice: 0,
                            allPrice: 0,
                            new_onePrice: -1
                        })
                    }
                }
            }
        })
    }
    
    componentWillUnmount(){
        this._isMounted = false;
    }
    
    add(item_id){
        logEvent(this.firebaseAnalitic, 'add_to_cart', {
            content_type: 'add_cart',
            content_id: item_id,
            items: [{ name: this.state.item.name }]
        });

        itemsStore.AddItem(item_id);
    }
    
    minus(item_id){
        logEvent(this.firebaseAnalitic, 'remove_from_cart', {
            content_type: 'remove_cart',
            content_id: item_id,
            items: [{ name: this.state.item.name }]
        });

        itemsStore.MinusItem(item_id);
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        return (
            (this.state.count) !== (nextState.count) ||
            this.state.onePrice !== nextState.onePrice ||
            (this.state.allPrice) !== (nextState.allPrice) ||
            this.state.item.name !== nextProps.item.name
        );
    }
    
    render() {
        if( parseInt(this.state.count) > 0 || parseInt(this.state.item.cat_id) == 7 ){
            return (
                <tr>
                    <td style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', position: 'relative' }}>
                        {this.state.item.img_app.length > 0 ?
                            <picture>
                                <source 
                                    type="image/webp" 
                                    srcset={`
                                        https://cdnimg.jacofood.ru/${this.state.item.img_app}_138x138.webp 138w,
                                        https://cdnimg.jacofood.ru/${this.state.item.img_app}_146x146.webp 146w,
                                        https://cdnimg.jacofood.ru/${this.state.item.img_app}_183x183.webp 183w,
                                        https://cdnimg.jacofood.ru/${this.state.item.img_app}_233x233.webp 233w,
                                        https://cdnimg.jacofood.ru/${this.state.item.img_app}_292x292.webp 292w,
                                        https://cdnimg.jacofood.ru/${this.state.item.img_app}_366x366.webp 366w,
                                        https://cdnimg.jacofood.ru/${this.state.item.img_app}_584x584.webp 584w,
                                        https://cdnimg.jacofood.ru/${this.state.item.img_app}_760x760.webp 760w,
                                        https://cdnimg.jacofood.ru/${this.state.item.img_app}_1875x1875.webp 1875w`} 
                                    sizes="(max-width=1439px) 233px, (max-width=1279px) 218px, 292px" />
                                <source 
                                    type="image/jpeg" 
                                    srcset={`
                                        https://cdnimg.jacofood.ru/${this.state.item.img_app}_138x138.jpg 138w,
                                        https://cdnimg.jacofood.ru/${this.state.item.img_app}_146x146.jpg 146w,
                                        https://cdnimg.jacofood.ru/${this.state.item.img_app}_183x183.jpg 183w,
                                        https://cdnimg.jacofood.ru/${this.state.item.img_app}_233x233.jpg 233w,
                                        https://cdnimg.jacofood.ru/${this.state.item.img_app}_292x292.jpg 292w,
                                        https://cdnimg.jacofood.ru/${this.state.item.img_app}_366x366.jpg 366w,
                                        https://cdnimg.jacofood.ru/${this.state.item.img_app}_584x584.jpg 584w,
                                        https://cdnimg.jacofood.ru/${this.state.item.img_app}_760x760.jpg 760w,
                                        https://cdnimg.jacofood.ru/${this.state.item.img_app}_1875x1875.jpg 1875w`} 
                                    sizes="(max-width=1439px) 233px, (max-width=1279px) 218px, 292px" />
                                <img 
                                    alt={this.state.item.name} 
                                    title={this.state.item.name} 
                                    src={`https://cdnimg.jacofood.ru/${this.state.item.img_app}_138x138.jpg`} 
                                    loading="lazy" />
                            </picture>
                                :
                            <picture>
                                <source 
                                    srcSet={"https://cdnimg.jacofood.ru/"+this.state.item.img+"300х200.webp?"+this.state.item.imgUpdate} 
                                    type="image/webp" 
                                />
                                <img 
                                    src={"https://cdnimg.jacofood.ru/"+this.state.item.img+"300х200.jpg?"+this.state.item.imgUpdate} 
                                    alt={this.state.item.name}
                                    title={this.state.item.name}
                                    loading="lazy"
                                />
                            </picture>
                        }
                        
                        {this.state.type == 'promo' ? 
                            <FontAwesomeIcon icon={faGift} className="promoIcon" />
                                :
                            null
                        }
                        <div>
                            <Typography variant="h5" component="span" className="nameItem">{this.state.item.name}</Typography>
                            <Typography variant="h5" component="span" className="descItem">{ this.state.type == 'dop' ? '' : this.state.item.desc}</Typography>
                        </div>
                    </td>
                    <td>
                        {this.state.type != 'promo' ? 
                            <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="count">
                                <Button variant="contained" className="BtnCardMain" onClick={this.minus.bind(this, this.state.item.id)}>
                                    <FontAwesomeIcon icon={faMinus} style={{ fontSize: '1rem' }} />
                                </Button>
                                <Button variant="contained" className="BtnCardMain _COUNT_">
                                    <Typography component="span" className="CardCountItem">{this.state.count}</Typography>
                                </Button>
                                <Button variant="contained" className="BtnCardMain" onClick={this.add.bind(this, this.state.item.id)}> 
                                    <FontAwesomeIcon icon={faPlus} style={{ fontSize: '1rem' }} />
                                </Button>
                            </ButtonGroup>
                                :
                            <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="count promo">
                                <Button variant="contained" className="BtnCardMain">
                                    <FontAwesomeIcon icon={faMinus} style={{ fontSize: '1rem' }} />
                                </Button>
                                <Button variant="contained" className="BtnCardMain" >{this.state.count}</Button>
                                <Button variant="contained" className="BtnCardMain"> 
                                    <FontAwesomeIcon icon={faPlus} style={{ fontSize: '1rem' }} />
                                </Button>
                            </ButtonGroup>
                        }
                    </td>
                    <td>
                        { this.state.new_onePrice != -1 ?
                            <Typography gutterBottom variant="h5" component="span" className="namePriceOld">{ parseInt(this.state.count) * parseInt(this.state.onePrice) }</Typography>
                                :
                            null
                        }
                        <Typography gutterBottom variant="h5" component="span" className="namePrice">{this.state.allPrice} <Ruble width="20" viewBox="0 20 500 200" /></Typography>
                    </td>
                </tr>
            )
        }else{
            return (
                null
            )
        }
    }
}

class CartItemMobile extends React.Component {
    _isMounted = false;
    firebaseAnalitic = null;

    constructor(props) {
        super(props);
        
        this.firebaseAnalitic = this.props.firebaseAnalitic;

        this.state = {  
            item: this.props.item,
            type: this.props.type,
            count: 0,
            onePrice: 0,
            allPrice: 0,
            new_onePrice: -1
        };
    }
    
    componentDidMount(){
        this._isMounted = true; 
        
        let cartItems = itemsStore.getItems();
        let this_item = cartItems.find( (item) => item.item_id == this.state.item.id );
        
        if( this_item ){
            this.setState({
                count: this_item.count,
                onePrice: this_item.one_price,
                allPrice: this_item.all_price,
            })
        }
        
        autorun(() => {
            if( this._isMounted === true ){
                let new_cartItems = itemsStore.getItems();
                let promo_cartItems = itemsStore.getItemsPromo();
                
                if( promo_cartItems && promo_cartItems.length > 0 ){
                    let this_item = promo_cartItems.find( (item) => item.item_id == this.state.item.id );
                    
                    if( this_item ){
                        this.setState({
                            count: this_item.count,
                            onePrice: this_item.one_price,
                            allPrice: this_item.all_price,
                        })
                    }
                }
                
                let this_item = new_cartItems.find( (item) => item.item_id == this.state.item.id );
                
                if( !this_item ){
                    this_item = promo_cartItems.find( (item) => item.item_id == this.state.item.id );
                }

                if( this.state.type != 'promo' ){
                    if( this_item ){
                        this.setState({
                            count: this_item.count,
                            onePrice: this_item.one_price,
                            allPrice: this_item.all_price,
                            new_onePrice: this_item.new_one_price ? this_item.new_one_price : -1
                        })
                    }else{
                        this.setState({
                            count: 0,
                            onePrice: 0,
                            allPrice: 0,
                            new_onePrice: -1
                        })
                    }
                }
            }
        })
    }
    
    componentWillUnmount(){
        this._isMounted = false;
    }
    
    add(item_id){
        logEvent(this.firebaseAnalitic, 'add_to_cart', {
            content_type: 'add_cart',
            content_id: item_id,
            items: [{ name: this.state.item.name }]
        });

        itemsStore.AddItem(item_id);
    }
    
    minus(item_id){
        logEvent(this.firebaseAnalitic, 'remove_from_cart', {
            content_type: 'remove_cart',
            content_id: item_id,
            items: [{ name: this.state.item.name }]
        });

        itemsStore.MinusItem(item_id);
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        return (
            this.state.count !== nextState.count ||
            this.state.onePrice !== nextState.onePrice ||
            this.state.allPrice !== nextState.allPrice ||
            this.state.item.name !== nextProps.item.name
        );
    }
    
    render() {
        if( this.state.count > 0 || (parseInt(this.state.item.cat_id) == 7 || parseInt(this.state.item.cat_id) == 6) ){
            return (
                <div className="boxItem">
                    {this.state.item.img_app.length > 0 ?
                        <picture style={{ width: '40%' }}>
                            <source 
                                type="image/webp" 
                                srcset={`
                                    https://cdnimg.jacofood.ru/${this.state.item.img_app}_138x138.webp 138w,
                                    https://cdnimg.jacofood.ru/${this.state.item.img_app}_146x146.webp 146w,
                                    https://cdnimg.jacofood.ru/${this.state.item.img_app}_183x183.webp 183w,
                                    https://cdnimg.jacofood.ru/${this.state.item.img_app}_233x233.webp 233w,
                                    https://cdnimg.jacofood.ru/${this.state.item.img_app}_292x292.webp 292w,
                                    https://cdnimg.jacofood.ru/${this.state.item.img_app}_366x366.webp 366w,
                                    https://cdnimg.jacofood.ru/${this.state.item.img_app}_584x584.webp 584w,
                                    https://cdnimg.jacofood.ru/${this.state.item.img_app}_760x760.webp 760w,
                                    https://cdnimg.jacofood.ru/${this.state.item.img_app}_1875x1875.webp 1875w`} 
                                sizes="(max-width=1439px) 233px, (max-width=1279px) 218px, 292px" />
                            <source 
                                type="image/jpeg" 
                                srcset={`
                                    https://cdnimg.jacofood.ru/${this.state.item.img_app}_138x138.jpg 138w,
                                    https://cdnimg.jacofood.ru/${this.state.item.img_app}_146x146.jpg 146w,
                                    https://cdnimg.jacofood.ru/${this.state.item.img_app}_183x183.jpg 183w,
                                    https://cdnimg.jacofood.ru/${this.state.item.img_app}_233x233.jpg 233w,
                                    https://cdnimg.jacofood.ru/${this.state.item.img_app}_292x292.jpg 292w,
                                    https://cdnimg.jacofood.ru/${this.state.item.img_app}_366x366.jpg 366w,
                                    https://cdnimg.jacofood.ru/${this.state.item.img_app}_584x584.jpg 584w,
                                    https://cdnimg.jacofood.ru/${this.state.item.img_app}_760x760.jpg 760w,
                                    https://cdnimg.jacofood.ru/${this.state.item.img_app}_1875x1875.jpg 1875w`} 
                                sizes="(max-width=1439px) 233px, (max-width=1279px) 218px, 292px" />
                            <img 
                                alt={this.state.item.name} 
                                title={this.state.item.name} 
                                src={`https://cdnimg.jacofood.ru/${this.state.item.img_app}_466x466.jpg`} 
                                loading="lazy" />
                        </picture>
                            :
                        <picture style={{ width: '40%' }}>
                            <source 
                                srcSet={"https://cdnimg.jacofood.ru/"+this.state.item.img+"300х200.webp?"+this.state.item.imgUpdate} 
                                type="image/webp" 
                            />
                            <img 
                                src={"https://cdnimg.jacofood.ru/"+this.state.item.img+"300х200.jpg?"+this.state.item.imgUpdate} 
                                alt={this.state.item.name}
                                title={this.state.item.name}
                                loading="lazy"
                            />
                        </picture>
                    }


                    
                    {this.state.type == 'promo' ? 
                        <FontAwesomeIcon icon={faGift} className="promoIcon" />
                            :
                        null
                    }
                    <div style={{ width: '60%' }}>
                        <Typography variant="h5" component="span">{this.state.item.name}</Typography>
                        <div>
                            {this.state.type != 'promo' ? 
                                <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="count">
                                    <Button variant="contained" className="BtnCardMain" onClick={this.minus.bind(this, this.state.item.id)}>
                                        <FontAwesomeIcon icon={faMinus} style={{ fontSize: '1rem' }} />
                                    </Button>
                                    <Button variant="contained" className="BtnCardMain _COUNT_" >
                                        <Typography component="span" className="CardCountItem">{this.state.count}</Typography>
                                    </Button>
                                    <Button variant="contained" className="BtnCardMain" onClick={this.add.bind(this, this.state.item.id)}> 
                                        <FontAwesomeIcon icon={faPlus} style={{ fontSize: '1rem' }} />
                                    </Button>
                                </ButtonGroup>
                                    :
                                <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="count promo">
                                    <Button variant="contained" className="BtnCardMain">
                                        <FontAwesomeIcon icon={faMinus} style={{ fontSize: '1rem' }} />
                                    </Button>
                                    <Button variant="contained" className="BtnCardMain _COUNT_" >
                                        <Typography component="span" className="CardCountItem">{this.state.count}</Typography>
                                    </Button>
                                    <Button variant="contained" className="BtnCardMain"> 
                                        <FontAwesomeIcon icon={faPlus} style={{ fontSize: '1rem' }} />
                                    </Button>
                                </ButtonGroup>
                            }
                            
                            { this.state.new_onePrice != -1 ?
                                <Typography gutterBottom variant="h5" component="span" className="namePriceOld">{ parseInt(this.state.count) * parseInt(this.state.onePrice) }</Typography>
                                    :
                                null
                            }
                            
                            <Typography variant="h5" component="span" className="namePrice">{this.state.allPrice} <Ruble width="20" viewBox="10 0 600 200" /></Typography>
                        </div>    
                    </div>
                </div>
            )
        }else{
            return (
                null
            )
        }
    }
}

export class Cart extends React.Component {
    _isMounted = false;
    clickOrderStart = false
    
    startOrderInterval = 90;
    startOrderIntervalTimer = null;
    
    firebaseAnalitic = null;

    constructor(props) {
        super(props);
        
        this.state = {    
            hasError: false,
            
            is_load: false,
            city_name: this.props.city,
            page: this.props.data ? this.props.data.page : null,
            spiner: false,
            
            title: '',
            description: '',
            
            orderCheckDopTea: false,
            
            chooseAddr: false,
            choosePicDialog: false,
            chooseTimeDialog: false,
            choosePayDialog: false,
            chooseNewAddr: false,
            orderCheckDop: false,
            
            sumDiv: 0,
            allPrice: 0,
            
            pic_point: [],
            my_addr: [],
            all_addr: [],
            date_pred: [],
            
            picPointInfo: null,
            
            pays: {
                dev: [
                    {type: 'cash', title: 'Наличными курьеру'},
                    {type: 'card', title: 'Онлайн на сайте'},
                ],
                dev_mini: [
                    {type: 'cash', title: 'Наличными курьеру'},
                    {type: 'card', title: 'Онлайн на сайте'},
                ],
                pic: [
                    {type: 'in', title: 'В кафе'},
                ]
            },
            renderPay: [
                {type: 'cash', title: 'Наличными курьеру'},
                {type: 'card', title: 'Онлайн на сайте'},
            ],
            
            cartItems_main: [],
            cartItems_dop: [],
            cartItems_need_dop: [],
            cartItems_promo: [],
            cartItems_dop_tea: [],
            
            timePred: [],
            
            error: {
                title: '', 
                text: ''
            },
            errorOpen: false,
            orderCheck: false,
            
            newAddrInfo: null,
            newAddrPD: '',
            newAddrET: '',
            newAddrKV: '',
            newAddrHome: '',
            newAddrDom: true,
            
            orderType: 0,
            orderAddr: null,
            orderPic: 0,
            orderComment: '',
            orderPay: '',
            
            orderTimes: '1',
            orderPredDay: '',
            orderPredTime: '',
            
            orderSdacha: '',
            orderPromo: '',
            orderPromoText: '',
            
            newOrderData: null,

            CheckDomTrue: false,

            sberPayData: null,
        };
        
        itemsStore.setCity(this.props.city);
    }
    
    static fetchData(propsData) {
        let data = {
            type: 'get_page_info', 
            city_id: get_city(propsData),
            page: 'cart' 
        };
        
        return axios({
            method: 'POST',
            url: config.urlApi,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: queryString.stringify(data)
        }).then(response => {
            if(response['status'] === 200){
                var json = response['data'];
                
                return {
                    title: json.page.title,
                    description: json.page.description,
                    page: json.page,
                    cats: json.cats,
                    allItems: json.allItems,
                    all: json,
                    st: json.st,
                }
            } 
        }).catch(function (error) {
            console.log(error);
        });
    }
    
    static getDerivedStateFromError(error) {
        // Обновите состояние так, чтобы следующий рендер показал запасной интерфейс.
        //return { hasError: true };
        //this.setState({ hasError: true })

        fetch(config.urlApi, {
            method: 'POST',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'},
            body: queryString.stringify({
                type: 'save_log_err', 
                page: 'cart',
                error: JSON.stringify(error),
                info: '',
            })
        }).then(res => res.json()).then(json => {
            
        });
    }
    
    componentDidCatch(error, info) {
      
    
    
        // Пример "componentStack":
        //   in ComponentThatThrows (created by App)
        //   in ErrorBoundary (created by App)
        //   in div (created by App)
        //   in App
        //logComponentStackToMyService(info.componentStack);
        
        console.log( error )
        console.log( info )
        
        //this.setState({ hasError: true })
        
        fetch(config.urlApi, {
            method: 'POST',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'},
            body: queryString.stringify({
                type: 'save_log_err', 
                page: 'cart',
                error: JSON.stringify(error),
                info: JSON.stringify(info),
            })
        }).then(res => res.json()).then(json => {
            
        });
    }
    
    loadData(){
        setTimeout( () => {
            fetch(config.urlApi, {
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
                
                setTimeout(() => {
                    let cartData = itemsStore.getCartData();
        
                    if( cartData.orderType || cartData.orderType == 0 ){
                        
                        this.setState({
                            orderType: cartData.orderType,
                            orderAddr: cartData.orderAddr && cartData.orderAddr.id == -1 ? null : cartData.orderAddr,
                            orderPic: cartData.orderPic,
                            orderComment: cartData.orderComment,
                            
                            orderTimes: cartData.orderTimes,
                            orderPredDay: cartData.orderPredDay,
                            orderPredTime: cartData.orderPredTime,                
                            
                            orderPay: cartData.orderPay,
                            orderSdacha: cartData.orderSdacha
                        })
                        
                        if( parseInt(cartData.orderTimes) == 2 && cartData.orderPredDay != '' && ((cartData.orderAddr && cartData.orderAddr.id !== -1) || parseInt( cartData.orderPic ) > 0) ){
                            setTimeout(() => {
                                this.loadTimePred();   
                            }, 300)
                        }else{
                            /*let data = {
                                orderType: cartData.orderType,
                                orderAddr: '',
                                orderPic: cartData.orderPic,
                                orderComment: cartData.orderComment,
                                
                                orderTimes: cartData.orderTimes,
                                orderPredDay: '',
                                orderPredTime: '',
                                
                                orderPay: cartData.orderPay,
                                orderSdacha: cartData.orderSdacha,
                                
                            };
                            
                            itemsStore.saveCartData(data);*/
                        }
                        
                        setTimeout(() => {
                            if( parseInt( cartData.orderType ) == 1 && parseInt( cartData.orderPic ) > 0 ){
                                this.choosePic(cartData.orderPic);
                            }
                        }, 300)
                        
                        if( parseInt( cartData.orderType ) == 0 && cartData.orderAddr && cartData.orderAddr.id && cartData.orderAddr.id !== -1 ){
                            let allPrice = itemsStore.getAllPrice();
                            
                            if( parseInt(cartData.orderAddr.free_drive) == 1 || parseInt(itemsStore.free_drive) == 1 ){
                                if( parseInt(allPrice) > 0 ){
                                    itemsStore.setSumDiv(0);
                                }else{
                                    itemsStore.setSumDiv(1);
                                }
                            }else{
                                itemsStore.setSumDiv(parseInt(cartData.orderAddr.sum_div));
                            }
                        }else{
                            itemsStore.setSumDiv(0);
                        }
                        
                        setTimeout(()=>{
                            let type = cartData.orderTimes,
                                type_order = cartData.orderType;
                            
                            if( type_order == 0 ){
                                //if( type == 1 ){
                                    this.setState({
                                        renderPay: this.state.pays.dev
                                    })
                                /*}else{
                                    this.setState({
                                        renderPay: this.state.pays.dev_mini,
                                    })
                                }*/
                            }else{
                                this.setState({
                                    renderPay: this.state.pays.pic,
                                })
                            }
                        }, 300)
                    }else{
                        if( this.state.pic_point.length == 1 ){
                            this.choosePic(this.state.pic_point[0]['id']);
                        }
                        
                        if( this.state.my_addr.length == 1 ){
                            this.changeAddr({target: {value: this.state.my_addr[0]['id']}})
                        }
                    }
                    
                    if (typeof window !== 'undefined') {
                        setTimeout(()=>{
                            if( localStorage.getItem('promo_name') ){
                                this.setState({
                                    orderPromo: localStorage.getItem('promo_name')
                                })
                                
                                setTimeout(()=>{
                                    this.checkPromo();
                                }, 300)
                            }
                        }, 1000)
                    }
                }, 300)
            });
        }, 300 )
    }
    
    componentDidMount = () => {
        this._isMounted = true; 
        
        const firebaseConfig = {
            apiKey: "AIzaSyChAHowCT2C7GRwfcxwt1Pi4SCV4CaVpP4",
            authDomain: "jacofoodsite.firebaseapp.com",
            projectId: "jacofoodsite",
            storageBucket: "jacofoodsite.appspot.com",
            messagingSenderId: "692082803779",
            appId: "1:692082803779:web:39a39963cd8bff927000f6"
        };
          
        // Initialize Firebase
        firebaseAPP = initializeApp(firebaseConfig);
        this.firebaseAnalitic = getAnalytics(firebaseAPP);

        try{

            if( document.querySelector('.activeCat') ){
                document.querySelector('.activeCat').classList.remove('activeCat');
            }
            window.scrollTo(0, 0);
            itemsStore.setPage('cart');
            
            setTimeout( () => {
                if( !itemsStore.getToken() ){
                    if (typeof window !== 'undefined') {
                        window.location.pathname = '/'+this.state.city_name;
                    }
                }
            }, 300 )
            
            
            this.loadData();
            
            Cart.fetchData('/'+this.state.city_name).then( data => {
                this.setState( {
                    title: data.page.title,
                    description: data.page.description,
                } );
            } );
            
            let cartItems = itemsStore.getItems();
            let allItems = itemsStore.getAllItems();
            let promoItems = itemsStore.getItemsPromo();
            
            let cartItems_new = [];
            
            if( cartItems.length > 0 && allItems.length > 0 ){
                cartItems.map((item) => {
                    let thisitem = allItems.find( (item_) => item_.id == item.item_id );
                    
                    if(thisitem){
                        cartItems_new.push({
                            id: item.item_id,
                            cat_id: thisitem.cat_id,
                            name: item.name,
                            desc: thisitem.tmp_desc,
                            count: item.count,
                            allPrice: item.all_price,
                            img: thisitem.img_new,
                            img_app: thisitem.img_app,
                            imgUpdate: thisitem.img_new_update,
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
            
            autorun(() => {
                if( this._isMounted === true ){
                    
                    /*setTimeout( () => {
                        let cartData = itemsStore.getCartData();
                        
                        if( cartData.orderType || cartData.orderType == 0 ){
                            let allPrice = itemsStore.getAllPrice();
                              
                            if( parseInt(cartData.orderAddr ? cartData.orderAddr.free_drive : 0) == 1 || parseInt(itemsStore.free_drive) == 1 ){
                                if( parseInt(allPrice) > 0 ){
                                    itemsStore.setSumDiv(0);
                                }else{
                                    itemsStore.setSumDiv(1);
                                }
                            }else{
                                itemsStore.setSumDiv(parseInt(cartData.orderAddr ? cartData.orderAddr.sum_div : 0));
                            }
                        }
                        
                        if( parseInt(cartData.orderType) == 0 ){
                            itemsStore.setSumDiv(0);
                        }
                    }, 500 )*/
                    
                    
                    let cartItems = itemsStore.getItems();
                    let allItems = itemsStore.getAllItems();
                    let need_dop = itemsStore.check_need_dops();
                    let promoItems = itemsStore.getItemsPromo();
                    
                    let cartItems_new = [];
                    let cartPromoItems = [];
                    
                    cartItems.map((item) => {
                        let thisitem = allItems.find( (item_) => item_.id == item.item_id );
                        
                        if(thisitem){
                            cartItems_new.push({
                                id: item.item_id,
                                cat_id: thisitem.cat_id,
                                name: item.name,
                                desc: thisitem.tmp_desc,
                                count: item.count,
                                allPrice: item.all_price,
                                img: thisitem.img_new,
                                img_app: thisitem.img_app,
                                imgUpdate: thisitem.img_new_update,
                            })
                        }
                    })
                    
                    
                    
                    let main = cartItems_new.filter( (item_) => parseInt(item_.cat_id) !== 7 );
                    let dop = cartItems_new.filter( (item_) => parseInt(item_.cat_id) == 7 );
                    
                    let dop_new = [];
                    
                    need_dop.map((item) => {
                        let cart_item = cartItems_new.find( (item_) => parseInt(item_.id) == parseInt(item.id) );
                        let thisitem = allItems.find( (item_) => parseInt(item_.id) == parseInt(item.id) );
                        
                        if( !cart_item ){
                            dop_new.push({
                                id: item.id,
                                cat_id: item.cat_id,
                                name: item.name,
                                desc: item.tmp_desc,
                                count: 0,
                                allPrice: 0,
                                img: thisitem.img_new,
                                img_app: thisitem.img_app,
                                imgUpdate: thisitem.img_new_update,
                            })
                        }else{
                            dop_new.push({
                                id: item.id,
                                cat_id: item.cat_id,
                                name: item.name,
                                desc: item.tmp_desc,
                                count: cart_item.count,
                                allPrice: cart_item.allPrice,
                                img: thisitem.img_new,
                                img_app: thisitem.img_app,
                                imgUpdate: thisitem.img_new_update,
                            })
                        }
                    })
                    
                    promoItems.map((item) => {
                        let thisitem = allItems.find( (item_) => item_.id == item.item_id );
                        
                        if(thisitem){
                            cartPromoItems.push({
                                id: item.item_id,
                                cat_id: thisitem.cat_id,
                                name: thisitem.name,
                                desc: thisitem.tmp_desc,
                                count: item.count,
                                allPrice: item.all_price,
                                img: thisitem.img_new,
                                img_app: thisitem.img_app,
                                imgUpdate: thisitem.img_new_update,
                            })
                        }
                    })
                    
                    this.setState({
                        cartItems_dop: []
                    })
                    
                    this.setState({
                        cartItems_dop: dop_new,
                    })
                    
                    this.setState({
                        cartItems_main: main,
                        cartItems_need_dop: need_dop,
                        cartItems_promo: cartPromoItems,
                        
                        sumDiv: itemsStore.getSumDiv(),
                        allPrice: itemsStore.getAllPrice()
                    })
                }
            })
        
        } catch (e) {
            //document.write('Text error');
            
            console.log( e )
            
            this.setState({ hasError: true })
            
            fetch(config.urlApi, {
                method: 'POST',
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded'},
                body: queryString.stringify({
                    type: 'save_log_err', 
                    page: 'cart',
                    error: JSON.stringify(e),
                    info: '',
                })
            }).then(res => res.json()).then(json => {
                
            });
            
            //console.log( info )
        }
    }
    
    componentWillUnmount(){
        this._isMounted = false;
    }
    
    changeTab = (event, newValue) => {
        this.setState({
            orderType: newValue
        })
        
        let thisitem = this.state.orderAddr;
        
        if( newValue == 0 ){
            let allPrice = itemsStore.getAllPrice();
        
            if(thisitem){
                if( parseInt(thisitem.free_drive) == 1 || parseInt(itemsStore.free_drive) == 1 ){
                    if( parseInt(allPrice) > 0 ){
                        itemsStore.setSumDiv(0);
                    }else{
                        itemsStore.setSumDiv(1);
                    }
                }else{
                    itemsStore.setSumDiv(parseInt(thisitem.sum_div));
                }
            }else{
                itemsStore.setSumDiv(0);
            }
        }else{
            itemsStore.setSumDiv(0);
            
            setTimeout(()=>{
                if( this.state.pic_point.length > 0 ){
                    this.choosePic(this.state.orderPic);
                }
            }, 300)
        }
        
        let type = this.state.orderTimes,
            type_order = newValue,
            def_type = 'cash';
        
        if( type_order == 0 ){
            
            this.setState({
                renderPay: this.state.pays.dev,
            })
            //def_type = this.state.orderPay == '' || this.state.orderPay == 'in' ? 'cash' : this.state.orderPay;
            def_type = '';
        }else{
            this.setState({
                renderPay: this.state.pays.pic,
            })
            def_type = 'in';
        }
        
        this.setState({
            orderPay: def_type,
        })
        
        this.saveData();
    }
    
    changeAddr = (event) => {
        let thisitem = this.state.my_addr.find( (item) => item.id == event.target.value );
        let allPrice = itemsStore.getAllPrice();
        
        //проверка домофона
        if( parseInt(thisitem.check_dom_true) == 0 ){
            this.setState({
                CheckDomTrue: true
            })
        }

        if( parseInt(thisitem.free_drive) == 1 || parseInt(itemsStore.free_drive) == 1 ){
            if( parseInt(allPrice) > 0 ){
                itemsStore.setSumDiv(0);
            }else{
                itemsStore.setSumDiv(1);
            }
        }else{
            itemsStore.setSumDiv(parseInt(thisitem.sum_div));
        }
        
        let type_order = this.state.orderType;
        
        if( type_order == 0 ){
            this.setState({
                renderPay: this.state.pays.dev,
            })
        }else{
            this.setState({
                renderPay: this.state.pays.pic,
            })
        }
        
        this.setState({
            orderAddr: thisitem,
            chooseAddr: false,
            
            newAddrInfo: null,
            newAddrPD: '',
            newAddrET: '',
            newAddrKV: '',
        })
        
        this.saveData();
    }
    
    choosePic(pointId){
        itemsStore.setSumDiv(0);
        
        if( document.querySelector('.boxPic.active') ){
            document.querySelector('.boxPic.active').classList.remove('active');
        }
        if( document.querySelector('#pic_'+pointId) ){
            document.querySelector('#pic_'+pointId).classList.add('active');
        }
        
        let picPointInfo = this.state.pic_point.find( (item) => item.id == pointId );
        
        this.setState({
            orderPic: pointId,
            picPointInfo: picPointInfo,
            choosePicDialog: false
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
    
    changePayMobile(type){

        this.setState({
            orderPay: type,
            choosePayDialog: false
        })
        
        this.saveData();
    }
    
    changeTimes = (event) => {
        let type = event.target.value,
            type_order = this.state.orderType,
            def_type = 'cash';
        
        if( type_order == 0 ){
            //if( type == 1 ){
                this.setState({
                    renderPay: this.state.pays.dev,
                });
                def_type = this.state.orderPay == '' || this.state.orderPay == 'in' ? 'cash' : this.state.orderPay;
            /*}else{
                this.setState({
                    renderPay: this.state.pays.dev,
                });
                def_type = this.state.orderPay == '' || this.state.orderPay == 'in' ? 'cash' : this.state.orderPay;
            }*/
        }else{
            this.setState({
                renderPay: this.state.pays.pic,
            })
            def_type = 'in';
        }
        
        this.setState({
            orderTimes: type,
            //orderPay: def_type,
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
        itemsStore.setItemsPromo([]);
        itemsStore.free_drive = 0;
        
        let promo_name = '';
        
        if( document.getElementById('PROMONAME') && document.getElementById('PROMONAME').value.length > 0 ){
            promo_name = document.getElementById('PROMONAME').value;
        }else{
            if( document.getElementById('PromoMobile') && document.getElementById('PromoMobile').value.length > 0 ){
                promo_name = document.getElementById('PromoMobile').value;
            }else{
                promo_name = this.state.orderPromo;
            }
        }
        
        fetch(config.urlApi, {
            method: 'POST',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'},
            body: queryString.stringify({
                type: 'get_promo_web', 
                city_id: itemsStore.getCity(),
                promo_name: promo_name
            })
        }).then(res => res.json()).then(json => {
            itemsStore.setPromo( JSON.stringify(json), promo_name );
            let check_promo = itemsStore.checkPromo();
              
            if( promo_name.length == 0 ){
                this.setState({
                    orderPromoText: ''
                })
            }else{
                if( check_promo.st === false ){
                    //localStorage.removeItem('promo_name')
                }
                
                this.setState({
                    orderPromoText: check_promo.text
                })
            }
            
            setTimeout( () => {
                let cartData = itemsStore.getCartData();
                
                if( cartData.orderType || cartData.orderType == 0 ){
                    let allPrice = itemsStore.getAllPrice();
                      
                    if( parseInt(cartData.orderAddr ? cartData.orderAddr.free_drive : 0) == 1 || parseInt(itemsStore.free_drive) == 1 ){
                        if( parseInt(allPrice) > 0 ){
                            itemsStore.setSumDiv(0);
                        }else{
                            itemsStore.setSumDiv(1);
                        }
                    }else{
                        itemsStore.setSumDiv(parseInt(cartData.orderAddr ? cartData.orderAddr.sum_div : 0));
                    }
                }
                
                if( parseInt(cartData.orderType) == 1 ){
                    itemsStore.setSumDiv(0);
                }
            }, 500 )
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
            
            setTimeout( () => {
                this.checkPromo();
            }, 300 )
        }, 500)
    }
    
    saveDataCustomAddr(){
        setTimeout(()=>{
            let data = {
                orderType: this.state.orderType,
                orderAddr: {
                    id: -1,
                    city_name: itemsStore.getCityRU(),
                    street: this.state.newAddrInfo ? this.state.newAddrInfo.street : '',
                    home: this.state.newAddrInfo ? this.state.newAddrInfo.home : '',
                    kv: this.state.newAddrKV,
                    pd: this.state.newAddrPD,
                    et: this.state.newAddrET,
                    dom_true: this.state.newAddrDom ? 1 : 0,
                    free_drive: this.state.newAddrInfo ? this.state.newAddrInfo.free_drive : 0,
                    sum_div: this.state.newAddrInfo ? this.state.newAddrInfo.sum_div : 0,
                    point_id: this.state.newAddrInfo ? this.state.newAddrInfo.point_id : 0,
                    xy: this.state.newAddrInfo ? this.state.newAddrInfo.xy : '',
                    pay_active: this.state.newAddrInfo ? this.state.newAddrInfo.pay_active : 0,
                },
                orderPic: this.state.orderPic,
                orderComment: this.state.orderComment,
                
                orderTimes: this.state.orderTimes,
                orderPredDay: this.state.orderPredDay,
                orderPredTime: this.state.orderPredTime,
                
                orderPay: this.state.orderPay,
                orderSdacha: this.state.orderSdacha,
            };
            
            if( data.orderAddr.street.length > 0 && data.orderAddr.home.length > 0 ){
                this.setState({
                    orderAddr: data.orderAddr
                })
            }
            
            itemsStore.saveCartData(data);
            
            //let thisitem = this.state.my_addr.find( (item) => item.id == event.target.value );
            let allPrice = itemsStore.getAllPrice();
            
            if( parseInt(this.state.newAddrInfo ? this.state.newAddrInfo.free_drive : 0) == 1 || parseInt(itemsStore.free_drive) == 1 ){
                if( parseInt(allPrice) > 0 ){
                    itemsStore.setSumDiv(0);
                }else{
                    itemsStore.setSumDiv(1);
                }
            }else{
                itemsStore.setSumDiv(parseInt(this.state.newAddrInfo ? this.state.newAddrInfo.sum_div : 0));
            }
            
            let type = this.state.orderTimes,
                type_order = this.state.orderType;
            
            if( type_order == 0 ){
                //if( type == 1 ){
                    this.setState({
                        renderPay: this.state.pays.dev,
                    })
                /*}else{
                    this.setState({
                        renderPay: this.state.pays.dev_mini,
                    })
                }*/
            }else{
                this.setState({
                    renderPay: this.state.pays.pic,
                })
            }
        }, 500)
    }
    
    loadTimePred(){
        let my_cart = [];
        let cartItems = itemsStore.getItems();  
        
        if( this.state.orderType+1 == 1 && parseInt(this.state.orderTimes) == 1 ){
            if( !this.state.orderAddr || !this.state.orderAddr.point_id ){
                this.setState({
                    error: {
                        title: 'Предупреждение', 
                        text: 'Адрес доставки или точка самовывоза не выбрана'
                    },
                    errorOpen: true,
                    orderTimes: '1'
                })
                
                return;
            }
        }
        
        cartItems.forEach(el => {
            my_cart.push({
                item_id: el.item_id,
                count: el.count,
            });
        });
        
        fetch(config.urlApi, {
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
        if( event.target.value !== 0 ){
            this.setState({
                orderPredDay: event.target.value,
                orderTimes: '2'
            })
            
            let type_order = this.state.orderType;                
            
            if( type_order == 0 ){
                this.setState({
                    renderPay: this.state.pays.dev,
                    //orderPay: 'cash'
                });
            }else{
                this.setState({
                    renderPay: this.state.pays.pic,
                    //orderPay: 'in'
                })
            }
            
            setTimeout(() => {
                this.loadTimePred();   
            }, 300)
        }else{
            this.setState({
                orderPredDay: 0,
                orderTimes: '1'
            })
            
            let type_order = this.state.orderType;                
            
            if( type_order == 0 ){
                this.setState({
                    renderPay: this.state.pays.dev,
                });
            }else{
                this.setState({
                    renderPay: this.state.pays.pic,
                    //orderPay: 'in'
                })
            }
        }
        
        this.saveData();
    }
    
    changePredTime = (event) => {
        this.setState({
            orderPredTime: event.target.value
        })
        
        this.saveData();
    }
    
    startOrder(){
        if( this.clickOrderStart == false ){
            this.clickOrderStart = true;
            
            let payFull = this.state.renderPay.find( (item) => item.type == this.state.orderPay );

            if( !payFull ){
                this.setState({
                    error: {
                        title: 'Предупреждение', 
                        text: 'Выберите способ оплаты: онлайн на сайте или наличными при получении.'
                    },
                    errorOpen: true
                })
                
                this.clickOrderStart = false;
                return;
            }

            if( parseInt( this.state.orderTimes ) == 2 && (this.state.orderPredDay == '' || this.state.orderPredTime == '') ){
                this.setState({
                    error: {
                        title: 'Предупреждение', 
                        text: 'Дата или время предзаказа не указано'
                    },
                    errorOpen: true
                })
                
                this.clickOrderStart = false;
                return;
            }

            if( this.state.orderType+1 == 1 && parseInt(this.state.orderTimes) == 1 ){
                if( !this.state.orderAddr || !this.state.orderAddr.point_id ){
                    this.setState({
                        error: {
                            title: 'Предупреждение', 
                            text: 'Адрес доставки или точка самовывоза не выбрана'
                        },
                        errorOpen: true
                    })
                    
                    this.clickOrderStart = false;
                    return;
                }
            }

            this.setState({
                spiner: true,
                sberPayData: null
            })
            
            let new_cart = [];
            let cartItems = itemsStore.getItems();
            let allItems = itemsStore.getAllItems();
            let cartItems_dop_tea = [];
            
            cartItems.forEach( (item) => {
                if( item.count > 0 ){
                    new_cart.push({
                        name: item.name,
                        count: item.count,
                        price: item.all_price,
                        item_id: item.item_id,
                        cat_id: allItems.find( (item_) => item_.id == item.item_id )['cat_id']
                    })
                }
            })
            
            let check_tea = allItems.filter( (item) => parseInt(item.id) == 231 || parseInt(item.id) == 232 );
            
            check_tea.map( (item, key) => {
                cartItems_dop_tea.push({
                    name: item.name,
                    id: item.id,
                    count: 0,
                    one_price: 0,
                    all_price: 0,
                    img: item.img_new,
                    imgUpdate: item.img_new_update,
                    cat_id: item.cat_id
                })
            } )
            
            let check_need_dop = false;
            let check_dop_17 = false;
            let check_dop_19 = false;
            
            let check_dop_231 = false;
            let check_dop_232 = false;
            
            new_cart.forEach( (item) => {
                if( 
                    (parseInt(item.cat_id) == 3 
                        || 
                    parseInt(item.cat_id) == 4 
                        || 
                    parseInt(item.cat_id) == 9 
                        ||
                    parseInt(item.cat_id) == 10 
                        ||
                    parseInt(item.cat_id) == 12
                        ||
                    parseInt(item.cat_id) == 13)
                        && 
                    parseInt(item.count) > 0
                ){
                    check_need_dop = true;
                }
                
                if( (parseInt(item.item_id) == 17 && parseInt(item.count) > 0) || (parseInt(item.item_id) == 237 && parseInt(item.count) > 0) ){
                    check_dop_17 = true;
                }
                
                if( parseInt(item.item_id) == 19 && parseInt(item.count) > 0 ){
                    check_dop_19 = true;
                }
                
                
                /*if( (parseInt(item.item_id) == 231 && parseInt(item.count) > 0) ){
                    check_dop_231 = true;
                }
                
                if( parseInt(item.item_id) == 232 && parseInt(item.count) > 0 ){
                    check_dop_232 = true;
                }*/
                
                
            });
              
            if( (check_need_dop && check_dop_17 == false) || (check_need_dop && check_dop_19 == false) ){
                
                this.setState({
                    orderCheckDop: true,
                    spiner: false
                })
                
                setTimeout(()=>{
                    this.clickOrderStart = false;    
                }, 300)
                
                return;
            }else{
                
                //let check = false;
                
                /*if( parseInt(this.state.orderType)+1 == 2 ){
                    if( parseInt(this.state.orderPic) == 3 || parseInt(this.state.orderPic) == 6 ){
                        check = true;
                    }
                }else{
                    if( parseInt(this.state.orderAddr.point_id) == 3 || parseInt(this.state.orderAddr.point_id) == 6 ){
                        check = true;
                    }
                }*/
                
                /*if( cartItems_dop_tea.length > 0 && (check && (check_dop_231 == false || check_dop_232 == false)) ){
                    this.setState({
                        orderCheckDopTea: true,
                        spiner: false,
                        cartItems_dop_tea: cartItems_dop_tea
                    })
                    
                    setTimeout(()=>{
                        this.clickOrderStart = false;    
                    }, 300)
                }else{*/
                    this.clickOrderStart = false;  
                    this.startOrderNext(); 
                //}
            }
        }
    }
    
    startOrderNext(){
        if( this.clickOrderStart == false ){
            this.clickOrderStart = true;
            
            clearTimeout(this.startOrderIntervalTimer);
            
            this.setState({ 
                orderCheckDop: false,
                orderCheckDopTea: false,
                spiner: true,
            })
            
            let payFull = this.state.renderPay.find( (item) => item.type == this.state.orderPay );
            let new_cart = [];
            let cartItems = itemsStore.getItems();
            
            cartItems.forEach( (item) => {
                if( item.count > 0 ){
                    new_cart.push({
                        name: item.name,
                        count: item.count,
                        price: item.all_price,
                        id: item.item_id,
                    })
                }
            })
            
            if( parseInt(this.state.orderType) == 0 ){
                let addr = this.state.orderAddr ? JSON.stringify(this.state.orderAddr) : '';
                
                if( !addr || addr == '' ){
                    setTimeout(()=>{
                        this.setState({
                            spiner: false,
                            error: {
                                title: 'Предупреждение', 
                                text: 'Нет адреса для доставки'
                            },
                            errorOpen: true
                        })
                        
                        this.clickOrderStart = false;
                    }, 300)
                    
                    return;
                }
            }
            
            if( parseInt(this.state.orderType) == 1 ){
                let pic = this.state.orderPic;
                
                if( !pic || pic == 0 ){
                    setTimeout(()=>{
                        this.setState({
                            spiner: false,
                            error: {
                                title: 'Предупреждение', 
                                text: 'Не выбрана точка для самовывоза'
                            },
                            errorOpen: true
                        })
                        
                        this.clickOrderStart = false;
                    }, 300)
                    
                    return;
                }
            }
            
            let promo_name = this.state.orderPromo;

            if( localStorage.getItem('promo_name') && localStorage.getItem('promo_name').length > 0 && localStorage.getItem('promo_name') != promo_name ){
                promo_name = localStorage.getItem('promo_name')
            }
            
            fetch(config.urlApi, {
                method: 'POST',
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded'},
                body: queryString.stringify({
                    type: 'createOrder_web', 
                    city_id: this.state.city_name,
                    user_id: itemsStore.getToken(),
                  
                    timePred: JSON.stringify( { value: parseInt( this.state.orderTimes ) == 1 ? 0 : this.state.orderPredDay + ' ' + this.state.orderPredTime } ),//
                    typeOrder: this.state.orderType,//
                    addrPic: this.state.orderPic,//
                    comment: this.state.orderComment,//
                    addrDev: this.state.orderAddr ? JSON.stringify(this.state.orderAddr) : '', //
                    pay: payFull.title, //
                    sdacha: this.state.orderSdacha,
                    payFull: JSON.stringify(payFull), //
                    cart: JSON.stringify(new_cart),//
                    promo_name: promo_name//
                })
            }).then(res => res.json()).then(json => {
                
                setTimeout(()=>{
                    this.clickOrderStart = false;    
                }, 300)
                
                setTimeout(()=>{
                    this.setState({
                        spiner: false
                    })
                    
                    if( json.st ){
                        this.setState({
                            orderCheck: true,
                            newOrderData: json,
                            sberPayData: json.sberPay
                        })
                        
                        if( json.sberPay ){
                            json.sberPay.selector = '#sbol-pay-container';

                            json.sberPay.rowView = true;

                            var sbolWidget = new window.SbolPay(json.sberPay);
                        }

                        this.startOrderIntervalTimer = setTimeout(()=>{
                            this.setState({
                                orderCheck: false,
                                newOrderData: null
                            })
                        }, this.startOrderInterval * 1000)
                    }else{
                        
                        if( json.type && json.type == 'new_pred' ){
                            this.setState({
                                timePred: json.times
                            })
                        }
                        
                        this.setState({
                            error: {
                                title: 'Предупреждение', 
                                text: json.text_err
                            },
                            errorOpen: true
                        })
                    }
                }, 1000)
            })
            .catch(err => { 
                setTimeout( () => {
                    this.setState({
                        spiner: false
                    })
                }, 300 )
                console.log( err )
            });
        }
    }
    
    checkNewAddr(){
        let street = '';

        let street1 = document.querySelector('#newAddrStreet') ? document.querySelector('#newAddrStreet').value : '';
        let street2 = document.querySelector('#newAddrStreetModal') ? document.querySelector('#newAddrStreetModal').value : '';

        street = street1.length > 0 ? street1 : street2.length > 0 ? street2 : '';
        
        if( street.length > 0 && this.state.newAddrHome.length > 0 ){
            fetch(config.urlApi, {
                method: 'POST',
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded'},
                body: queryString.stringify({
                    type: 'save_new_addr_web_new',  
                    city_id: this.state.city_name,
                    user_id: itemsStore.getToken(),
                    street: street,
                    home: this.state.newAddrHome
                })
            }).then(res => res.json()).then(json => {
                if( !json.st ){
                    this.setState({
                        error: {
                            title: 'Предупреждение', 
                            text: json.text
                        },
                        errorOpen: true
                    })
                }else{
                    if( json.data.home == '' ){
                        this.setState({
                            error: {
                                title: 'Предупреждение', 
                                text: 'Номер дома не указан или указан не верно'
                            },
                            errorOpen: true
                        })
                    }else{
                        this.setState({
                            newAddrInfo: json.data
                        })
                        this.saveDataCustomAddr()
                    }
                }
            });
        }
    }
    
    trueOrder(){
        fetch(config.urlApi, {
            method: 'POST',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'},
            body: queryString.stringify({
                type: 'trueOrder_web', 
                city_id: this.state.city_name,
                user_id: itemsStore.getToken(),
                
                order_id: this.state.newOrderData.order_id,
                point_id: this.state.newOrderData.point_id,
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
                    orderType: 0,
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
                
                setTimeout(()=>{
                    
                    let city = get_city( window.location.pathname )
                    
                    window.location.href = window.location.origin + '/'+city+'/profile?trueOrder';
                    
                    /*if( this.state.city_name.length > 0 ){
                        window.location.pathname = '/'+this.state.city_name+'/profile?trueOrder';
                    }else{
                        if( this.props.city.length > 0 ){
                            window.location.pathname = '/'+this.props.city+'/profile?trueOrder';
                        }
                    }*/
                    
                    //window.location.pathname = '/'+this.state.city_name+'/profile?trueOrder';
                    //this.props.history.push('/'+this.state.city_name+'/profile');
                }, 300)
            }
        });
    }
    
    delAddr(id){
        if (confirm("Удалить сохраненный адрес ?")) {
            fetch(config.urlApi, {
                method: 'POST',
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded'},
                body: queryString.stringify({
                    type: 'del_addr_web',  
                    city_id: this.state.city_name,
                    user_id: itemsStore.getToken(),
                    id_addr: id
                })
            }).then(res => res.json()).then(json => {
                this.setState({
                    my_addr: json
                })
            });
        }
    }
    
    changeDomTrue(type){
        this.setState({
            newAddrDom: type
        })
    }
    
    closeTimeDialog(){
        if( this.state.orderPredTime == '' ){
            this.changePredDay({target: {value: 0}});
            this.setState({ 
                chooseTimeDialog: false 
            })
        }else{
            this.setState({ 
                chooseTimeDialog: false 
            })
        }
    }
    
    enterPromoMobile = (event) => {
        if(event.key === 'Enter'){
            //NextPromo
            if( document.querySelector('#PromoMobile') ){
                document.querySelector('#PromoMobile').blur()
            }
        }
    }
    
    changePayMobile_new(){
        if( this.state.orderType+1 == 1 && parseInt(this.state.orderTimes) == 1 ){
            if( !this.state.orderAddr || !this.state.orderAddr.point_id ){
                this.setState({
                    error: {
                        title: 'Предупреждение', 
                        text: 'Адрес доставки или точка самовывоза не выбрана'
                    },
                    errorOpen: true,
                    orderTimes: '1'
                })
                
                return;
            }
        }

        this.setState({ choosePayDialog: true })
    }

    changeTimeMobile(){
        if( this.state.orderType+1 == 1 && parseInt(this.state.orderTimes) == 1 ){
            if( !this.state.orderAddr || !this.state.orderAddr.point_id ){
                this.setState({
                    error: {
                        title: 'Предупреждение', 
                        text: 'Адрес доставки или точка самовывоза не выбрана'
                    },
                    errorOpen: true,
                    orderTimes: '1'
                })
                
                return;
            }
        }

        this.setState({ chooseTimeDialog: true })
    }

    checkSaveData(event, type){
        let value = event.target.value;

        if( isNaN(value) ){
            return ;
        }

        this.setState({
            [type]: value
        })
    }

    checkDomTrue(type, event){
        fetch(config.urlApi, {
            method: 'POST',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'},
            body: queryString.stringify({
                type: 'checkDomTrue', 
                city_id: this.state.city_name,
                user_id: itemsStore.getToken(),
                
                addr_id: this.state.orderAddr.id,
                dom_true: type === true ? 1 : 0
            })
        }).then(res => res.json()).then(json => {
            
        });

        let orderAddr = this.state.orderAddr;

        orderAddr.dom_true = type === true ? 1 : 0;
        orderAddr.check_dom_true = 1;

        this.setState({
            newAddrDom: type === true ? 1 : 0,
            orderAddr: orderAddr,
            CheckDomTrue: false
        })

        setTimeout( () => {
            this.saveData();
        }, 300 )
    }

    render() {
        
        if(this.state.hasError){
            return (
                <>
                    <Typography variant="h5" component="h1">Корзина</Typography>
                    <a href={'https://jacofood.ru/'+this.state.city_name}>На главную</a>
                </>
            );
        }
        
        let this_pay = this.state.renderPay.find( (item) => item.type == this.state.orderPay );
        
        let this_pic_point = this.state.pic_point.find( (item) => item.id == this.state.orderPic );
        
        if( this_pic_point ){
            this_pic_point = this_pic_point['addr'];
        }else{
            this_pic_point = '';
        }
        
        return (
            <Grid container className="Cart mainContainer MuiGrid-spacing-xs-3">
                
                <Helmet>
                    <title>{this.state.title}</title>
                    <meta name="description" content={this.state.description} />
                </Helmet>
                
                <Backdrop open={this.state.spiner} style={{ zIndex: 9999, color: '#fff' }}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                
                <Grid item xs={12}>
                    <Typography variant="h5" component="h1">Корзина</Typography>
                </Grid>
                
                
                
                <Grid item container sx={{ display: { xs: 'none', sm: 'flex' } }} spacing={3} md={10} sm={12} xs={12} xl={10} className="mainContainer" style={{ paddingTop: 0 }}>
                    <AppBar position="static" style={{ backgroundColor: '#fff', color: '#000', zIndex: 0 }} elevation={0}>
                        <Tabs value={this.state.orderType || this.state.orderType == 0 ? this.state.orderType : 0} onChange={this.changeTab.bind(this)} aria-label="simple tabs example"  style={{ justifyContent: 'center' }}>
                            <Tab label="Доставка" {...a11yProps(0)} disableRipple={true} />
                            <Tab label="Самовывоз" {...a11yProps(1)} disableRipple={true} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={this.state.orderType || this.state.orderType == 0 ? this.state.orderType : 0} index={0} style={{ width: '100%' }}>
                        <FormControl component="fieldset" style={{ width: '100%' }}>
                            <RadioGroup name="addrs" value={ this.state.orderAddr ? this.state.orderAddr.id : 0 } onChange={this.changeAddr}>
                                {this.state.my_addr.map((item, key) => 
                                    <div key={key} className="boxAddr">
                                        <FormControlLabel value={item.id} control={ <Radio sx={{ '&.Mui-checked': { color: '#c03', }, }} /> } label={ 
                                            item.city_name+', '+
                                            item.street+' '+
                                            item.home+
                                            ( parseInt(item.pd) == 0 || item.pd.length == 0 ? '' : ', Пд. '+item.pd )+
                                            ( parseInt(item.et) == 0 || item.et.length == 0 ? '' : ', Эт. '+item.et )+
                                            ( parseInt(item.kv) == 0 || item.kv.length == 0 ? '' : ', Кв. '+item.kv )+
                                            ( parseInt(item.dom_true) == 0 ? ' Домофон не работает' : '' )
                                        } />
                                        <FontAwesomeIcon onClick={this.delAddr.bind(this, item.id)} icon={faTimes}/>
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
                            <AccordionDetails className="newAddr">
                                <div>
                                    <Autocomplete
                                        freeSolo
                                        id="newAddrStreet"
                                        size="small"
                                        onBlur={this.checkNewAddr.bind(this)}
                                        options={this.state.all_addr.map((option) => option.value)}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Улица" margin="normal" variant="outlined" />
                                        )}
                                    />
                                    <TextField 
                                        label="Дом" 
                                        size="small"
                                        variant="outlined" 
                                        value={this.state.newAddrHome} 
                                        onChange={ event => this.setState({ newAddrHome: event.target.value }) }
                                        onBlur={this.checkNewAddr.bind(this)}
                                    />
                                </div>
                                <div>
                                    <TextField 
                                        label="Подъезд" 
                                        variant="outlined" 
                                        size="small"
                                        style={{ width: '100%' }}
                                        value={this.state.newAddrPD} 
                                        onChange={ event => this.checkSaveData(event, 'newAddrPD') }
                                        onBlur={this.saveDataCustomAddr.bind(this)}
                                    />
                                    <TextField 
                                        label="Этаж" 
                                        variant="outlined" 
                                        size="small"
                                        style={{ width: '100%' }}
                                        value={this.state.newAddrET} 
                                        onChange={ event => this.checkSaveData(event, 'newAddrET') }
                                        onBlur={this.saveDataCustomAddr.bind(this)}
                                    />
                                    <TextField 
                                        label="Квартира" 
                                        variant="outlined" 
                                        size="small"
                                        style={{ width: '100%' }}
                                        value={this.state.newAddrKV} 
                                        onChange={ event => this.checkSaveData(event, 'newAddrKV') }
                                        onBlur={this.saveDataCustomAddr.bind(this)}
                                    />  
                                </div>
                                <div>
                                    <ButtonGroup disableElevation variant="contained" className="chooseDomTrue">
                                        <Button className={ this.state.newAddrDom === true ? 'active' : '' } onClick={ this.changeDomTrue.bind(this, true) }>Домофон работает</Button>
                                        <Button className={ this.state.newAddrDom === false ? 'active' : '' } onClick={ this.changeDomTrue.bind(this, false) }>Домофон не работает</Button>
                                    </ButtonGroup>
                                </div>
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
                        <div className='_comment_'>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Комментарий курьеру"
                                multiline
                                rowsMax={2}
                                value={this.state.orderComment}
                                onChange={this.changeComment}
                                variant="outlined" 
                                size={'small'} 
                                type={ 'text' }
                            />

                        </div>
                            :
                        null
                    }
                    <div>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Оплата</FormLabel>
                            <RadioGroup aria-label="pays" name="pays" value={this.state.orderPay} onChange={this.changePay}>
                                {this.state.renderPay.map((item, key) => 
                                    <FormControlLabel key={key} value={item.type} control={ <Radio sx={{ '&.Mui-checked': { color: '#c03', }, }} /> } label={item.title} />
                                )}
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Когда приготовить?</FormLabel>
                            <RadioGroup aria-label="times" name="times" value={this.state.orderTimes} onChange={this.changeTimes}>
                                <FormControlLabel value='1' control={<Radio sx={{ '&.Mui-checked': { color: '#c03', }, }} />} label="Как можно быстрее" />
                                <FormControlLabel value='2' control={<Radio sx={{ '&.Mui-checked': { color: '#c03', }, }} />} label="Предзаказ" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    {this.state.orderTimes == 2 ?
                        <div>
                            <FormControl style={{ width: '30%' }} variant="standard">
                                <InputLabel htmlFor="age-native-simple">День</InputLabel>
                                <Select
                                    size='small'
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
                            <FormControl style={{ width: '20%' }} variant="standard">
                                <InputLabel htmlFor="age-native-simple1">Время</InputLabel>
                                <Select
                                    displayEmpty
                                    size='small'
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
                                    <CartItem key={key} item={item} type="item" firebaseAnalitic={this.firebaseAnalitic} />
                                )}
                                {this.state.cartItems_promo.map((item, key) =>
                                    <CartItem key={key} item={item} type="promo" firebaseAnalitic={this.firebaseAnalitic} />
                                )}
                                
                                <tr className="rowAboutDop">
                                    <td colSpan='3'>
                                        <Typography gutterBottom variant="h5" component="span" className="">Соевый соус, имбирь и васаби приобретаются отдельно!</Typography>
                                        <br />
                                        <Typography gutterBottom variant="h5" component="span" className="">Не забудьте добавить нужные позиции в корзину.</Typography>
                                    </td>
                                </tr>
                                {this.state.cartItems_dop.map((item, key) =>
                                    <CartItem key={key} item={item} type="dop" firebaseAnalitic={this.firebaseAnalitic} />
                                )}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan='2'>
                                        <Typography component="span">Доставка:</Typography>
                                    </td>
                                    <td>
                                        <Typography gutterBottom variant="h5" component="span" className="namePrice">{this.state.sumDiv} <Ruble width="20" viewBox="0 20 500 200"  /></Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan='2'>
                                        <Typography component="span">Итого:</Typography>
                                    </td>
                                    <td>
                                        <Typography gutterBottom variant="h5" component="span" className="namePrice">{ this.state.sumDiv + this.state.allPrice } <Ruble width="20" viewBox="0 20 500 200"  /></Typography>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    
                    {this.state.orderType == 0 && this.state.orderPay == 'cash' ?
                        <div className="orderSdacha">
                            <div>
                                <FormControl>
                                    <InputLabel htmlFor="standard-adornment-weight">Подготовить сдачу с</InputLabel>
                                    <Input
                                        type="number"
                                        id="standard-adornment-weight"
                                        value={this.state.orderSdacha}
                                        onChange={this.changeSdacha}
                                        endAdornment={<Ruble viewBox="-400 0 1200 300" />}
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
                                    id="PROMONAME"
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
                            <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="BtnBorder" onClick={this.startOrder.bind(this)}>
                                <Button variant="contained" className="BtnCardMain CardInCardItem">Оформить заказ</Button>
                            </ButtonGroup>
                        </div>
                    </div>
                    
                </Grid>
            
            
                <Grid item container sx={{ display: { xs: 'flex', sm: 'none' } }} spacing={3} md={10} sm={12} xs={12} xl={10} className="mainContainer mobile">
                    <AppBar position="static" style={{ backgroundColor: '#fff', color: '#000', zIndex: 0 }} elevation={0}>
                        <Tabs value={this.state.orderType || this.state.orderType == 0 ? this.state.orderType : 0} onChange={this.changeTab.bind(this)} aria-label="simple tabs example"  style={{ justifyContent: 'center' }}>
                            <Tab label="Доставка" {...a11yProps(0)} style={{ width: '50%' }} disableRipple={true} />
                            <Tab label="Самовывоз" {...a11yProps(1)} style={{ width: '50%' }} disableRipple={true} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={this.state.orderType || this.state.orderType == 0 ? this.state.orderType : 0} index={0} style={{ width: '100%' }}>
                        <div className="boxMobile" onClick={() => this.setState({ chooseAddr: true })}>
                            <Typography variant="h5" component="span">Адрес: {this.state.orderAddr ? 
                                this.state.orderAddr.city_name+', '+
                                this.state.orderAddr.street+' '+
                                this.state.orderAddr.home+
                                
                                ( parseInt(this.state.orderAddr.pd) == 0 || this.state.orderAddr.pd.length == 0 ? '' : ', Пд. '+this.state.orderAddr.pd )+
                                ( parseInt(this.state.orderAddr.et) == 0 || this.state.orderAddr.et.length == 0 ? '' : ', Эт. '+this.state.orderAddr.et )+
                                ( parseInt(this.state.orderAddr.kv) == 0 || this.state.orderAddr.kv.length == 0 ? '' : ', Кв. '+this.state.orderAddr.kv )
                                    : ''}</Typography>
                        </div>
                    </TabPanel>
                    <TabPanel value={this.state.orderType} index={1} style={{ width: '100%' }}>
                        <div className="boxMobile" onClick={() => this.setState({ choosePicDialog: true })}>
                        <Typography variant="h5" component="span">Адрес: { this.state.orderPic > 0 && this.state.pic_point.length > 0 ? this_pic_point : '' }</Typography>
                        </div>
                    </TabPanel>
                    
                    <div className="boxMobile" onClick={ this.changeTimeMobile.bind(this) }>
                        <Typography variant="h5" component="span">Приготовим: {this.state.orderTimes == 1 ? 'как можно быстрее' : this.state.orderPredDay+' '+this.state.orderPredTime}</Typography>
                    </div>
                    <div className="boxMobile" onClick={ this.changePayMobile_new.bind(this) }>
                        <Typography variant="h5" component="span">Оплачу: { this_pay ? this_pay['title'] : '' }</Typography>
                    </div>
                    <div style={{ marginTop: 15 }}>
                        <Paper component="div" className="SpacePromo">
                            <InputBase
                                onBlur={this.checkPromo.bind(this)}
                                value={this.state.orderPromo}
                                onChange={ event => this.setState({ orderPromo: event.target.value }) }
                                onKeyPress={this.enterPromoMobile}
                                id="PromoMobile"
                                placeholder="Промокод"
                            />
                            <Divider orientation="vertical" />
                            <IconButton color="primary" id="NextPromo" aria-label="directions" onClick={this.checkPromo.bind(this)}>
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
                    
                    {this.state.orderType == 0 ?
                        <div className="boxMobile_ area" style={{ paddingTop: 20 }}>
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
                                    size={'small'} 
                                    type={ 'text' }
                                />
                            </form>
                        </div>
                            :
                        null
                    }
                                            
                    {this.state.orderType == 0 && this.state.orderPay == 'cash' ?
                        <div className="boxMobile_ area" style={{ paddingTop: 20 }}>
                            <FormControl  variant="outlined" style={{ width: '100%' }}>
                                <InputLabel htmlFor="outlined-adornment-password">Подготовить сдачу с</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type="number"
                                    style={{ width: '100%' }}
                                    value={this.state.orderSdacha}
                                    onChange={this.changeSdacha}
                                    endAdornment={<Ruble viewBox="-600 80 1000 300" />}
                                    label="Подготовить сдачу с"
                                />
                            </FormControl>
                        </div>
                        :
                        null
                    }
                    
                    <div>
                        <div className="tableMobile">
                            {this.state.cartItems_main.map((item, key) =>
                                <CartItemMobile key={key} item={item} type="item" firebaseAnalitic={this.firebaseAnalitic} />
                            )}
                            
                            {this.state.cartItems_promo.map((item, key) =>
                                <CartItemMobile key={key} item={item} type="promo" firebaseAnalitic={this.firebaseAnalitic} />
                            )}
                            
                            <div className="boxItem rowAboutDop">
                                <Typography gutterBottom variant="h5" component="span" className="">Соевый соус, имбирь и васаби приобретаются отдельно!</Typography>
                                <br />
                                <Typography gutterBottom variant="h5" component="span" className="">Не забудьте добавить нужные позиции в корзину.</Typography>
                            </div>
                            
                            {this.state.cartItems_dop.map((item, key) =>
                                <CartItemMobile key={key} item={item} type="dop" firebaseAnalitic={this.firebaseAnalitic} />
                            )}
                            
                            
                        </div>
                        
                        
                    </div>
                
                    <div className="bottomOrder" style={{ paddingTop: 0 }}>
                        <div style={{ padding: '5px 0px' }}>
                            <Typography variant="h5" component="span">Доставка</Typography>
                            <Typography variant="h5" component="span" className="namePrice">{ this.state.sumDiv } <Ruble width="20" viewBox="0 0 600 200" /></Typography>
                        </div>
                        <div style={{ paddingBottom: 5 }}>
                            <Typography variant="h5" component="span">К оплате</Typography>
                            <Typography variant="h5" component="span" className="namePrice">{ this.state.sumDiv + this.state.allPrice } <Ruble width="20" viewBox="0 0 600 200" /></Typography>
                        </div>
                        <div>
                            <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="BtnBorder" onClick={this.startOrder.bind(this)}>
                                <Button variant="contained" className="BtnCardMain CardInCardItem">Оформить заказ</Button>
                            </ButtonGroup>
                        </div>
                    </div>
                </Grid>
                
                
                <Dialog
                    open={this.state.CheckDomTrue}
                    onClose={() => this.setState({ CheckDomTrue: false })}
                    className="CheckDomTrue"
                >
                    <Typography variant="h5" component="span" className="orderCheckTitle">Подтвердите работоспособность домофона</Typography>
                    <DialogContent>
                        <DialogContentText className="DialogErrText">{this.state.orderAddr ?
                                    this.state.orderAddr.city_name+', '+
                                    this.state.orderAddr.street+' '+
                                    this.state.orderAddr.home+
                                    ( parseInt(this.state.orderAddr.pd) == 0 || this.state.orderAddr.pd.length == 0 ? '' : ', Пд. '+this.state.orderAddr.pd )+
                                    ( parseInt(this.state.orderAddr.et) == 0 || this.state.orderAddr.et.length == 0 ? '' : ', Эт. '+this.state.orderAddr.et )+
                                    ( parseInt(this.state.orderAddr.kv) == 0 || this.state.orderAddr.kv.length == 0 ? '' : ', Кв. '+this.state.orderAddr.kv )
                                :
                                    ''
                                }
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <ButtonGroup disableElevation variant="contained" className="chooseDomTrue" style={{ width: '100%' }}>
                            <Button style={{ width: '50%' }} onClick={ this.checkDomTrue.bind(this, true) }>Домофон работает</Button>
                            <Button style={{ width: '50%' }} onClick={ this.checkDomTrue.bind(this, false) }>Домофон не работает</Button>
                        </ButtonGroup>
                    </DialogActions>
                </Dialog>

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
                
                <Dialog
                    open={this.state.chooseAddr}
                    fullWidth={true}
                    onClose={() => this.setState({ chooseAddr: false })}
                    className="DialogChooseAddr"
                >
                    <Typography variant="h5" component="span" className="orderCheckTitle">Адрес доставки</Typography>
                    <FontAwesomeIcon className="closeDialog" onClick={() => this.setState({ chooseAddr: false })} icon={faTimes}/>
                    <DialogContent>
                        <FormControl component="fieldset">
                            <RadioGroup name="addrs" value={ this.state.orderAddr ? this.state.orderAddr.id : 0 } onChange={this.changeAddr}>
                                {this.state.my_addr.map((item, key) => 
                                    <div key={key} className="boxAddr">
                                        <FormControlLabel value={item.id} control={<Radio sx={{ '&.Mui-checked': { color: '#c03', }, }} />} label={
                                            item.city_name+', '+
                                            item.street+' '+
                                            item.home+
                                            ( parseInt(item.pd) == 0 || item.pd.length == 0 ? '' : ', Пд. '+item.pd )+
                                            ( parseInt(item.et) == 0 || item.et.length == 0 ? '' : ', Эт. '+item.et )+
                                            ( parseInt(item.kv) == 0 || item.kv.length == 0 ? '' : ', Кв. '+item.kv )+
                                            ( parseInt(item.dom_true) == 0 ? ' Домофон не работает' : '' )
                                        } />
                                        <FontAwesomeIcon onClick={this.delAddr.bind(this, item.id)} icon={faTimes}/>
                                    </div>
                                )}
                            </RadioGroup>
                        </FormControl>
                        <Typography variant="h5" component="span" className="newAddrMobile" onClick={ () => { this.setState({ chooseAddr: false, chooseNewAddr: true }) } } >Новый адрес</Typography>
                    </DialogContent>
                </Dialog>
                
                <Dialog
                    open={this.state.chooseNewAddr}
                    fullWidth={true}
                    onClose={() => this.setState({ chooseNewAddr: false })}
                    className="DialogChooseNewAddr"
                >
                    <Typography variant="h5" component="span" className="orderCheckTitle">Новый адрес</Typography>
                    <FontAwesomeIcon className="closeDialog" onClick={() => this.setState({ chooseNewAddr: false })} icon={faTimes}/>
                    <DialogContent style={{ paddingTop: 0 }}>
                        <div className="newAddrMobile" style={{ paddingTop: 0 }}>
                            <Autocomplete
                                freeSolo
                                id="newAddrStreetModal"
                                size="small"
                                style={{ width: '100%' }}
                                onBlur={this.checkNewAddr.bind(this)}
                                options={this.state.all_addr.map((option) => option.value)}
                                renderInput={(params) => (
                                    <TextField {...params} label="Улица" margin="normal"  />
                                )}
                            />
                            <TextField 
                                label="Дом" 
                                size="small"
                                //variant="outlined" 
                                style={{ width: '100%' }}
                                value={this.state.newAddrHome} 
                                onChange={ event => this.setState({ newAddrHome: event.target.value }) }
                                onBlur={this.checkNewAddr.bind(this)}
                            />
                            <TextField 
                                label="Подъезд" 
                                size="small"
                                //variant="outlined" 
                                style={{ width: '100%' }}
                                value={this.state.newAddrPD} 
                                onChange={ event => this.checkSaveData(event, 'newAddrPD') }
                                onBlur={this.saveDataCustomAddr.bind(this)}
                            />
                            <TextField 
                                label="Этаж" 
                                size="small"
                                //variant="outlined" 
                                style={{ width: '100%' }}
                                value={this.state.newAddrET} 
                                onChange={ event => this.checkSaveData(event, 'newAddrET') }
                                onBlur={this.saveDataCustomAddr.bind(this)}
                            />
                            <TextField 
                                label="Квартира" 
                                size="small"
                                //variant="outlined" 
                                style={{ width: '100%' }}
                                value={this.state.newAddrKV} 
                                onChange={ event => this.checkSaveData(event, 'newAddrKV') }
                                onBlur={this.saveDataCustomAddr.bind(this)}
                            />  
                            <ButtonGroup disableElevation variant="contained" className="chooseDomTrue">
                                <Button className={ this.state.newAddrDom === true ? 'active' : '' } onClick={ this.changeDomTrue.bind(this, true) }>Домофон работает</Button>
                                <Button className={ this.state.newAddrDom === false ? 'active' : '' } onClick={ this.changeDomTrue.bind(this, false) }>Домофон не работает</Button>
                            </ButtonGroup>
                        </div>
                        <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="BtnBorder" onClick={() => this.setState({ chooseNewAddr: false })}>
                            <Button variant="contained" className="BtnCardMain CardInCardItem">Использовать</Button>
                        </ButtonGroup>
                    </DialogContent>
                </Dialog>
                
                <Dialog
                    open={this.state.choosePicDialog}
                    fullWidth={true}
                    onClose={() => this.setState({ choosePicDialog: false })}
                    className="DialogChoosePicDialog"
                >
                    <Typography variant="h5" component="span" className="orderCheckTitle">Адрес кафе</Typography>
                    <FontAwesomeIcon className="closeDialog" onClick={() => this.setState({ choosePicDialog: false })} icon={faTimes}/>
                    <DialogContent>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                            {this.state.pic_point.map((item, key) => 
                                <div className={"boxPic "+( this.state.orderPic == item.id ? 'active' : '' )} id={'pic_'+item.id} key={key} onClick={this.choosePic.bind(this, item.id)}>
                                    <Typography variant="h5" component="span">{item.raion}</Typography>
                                    <Typography variant="h5" component="span">{item.addr}, c 10:00 до 21:30</Typography>
                                </div>
                            )}
                        </div>
                    </DialogContent>
                </Dialog>
                
                <Dialog
                    open={this.state.chooseTimeDialog}
                    fullWidth={true}
                    onClose={this.closeTimeDialog.bind(this)}
                    className="DialogChoosePicDialog"
                >
                    <Typography variant="h5" component="span" className="orderCheckTitle">Время заказа</Typography>
                    <FontAwesomeIcon className="closeDialog" onClick={this.closeTimeDialog.bind(this)} icon={faTimes}/>
                    <DialogContent>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <FormControl style={{ width: '100%', paddingBottom: 20 }} variant="standard">
                                <InputLabel htmlFor="age-native-simple">День</InputLabel>
                                <Select
                                    size='small'
                                  displayEmpty
                                  value={this.state.orderPredDay}
                                  onChange={this.changePredDay}
                                  inputProps={{
                                    id: 'age-native-simple',
                                  }}
                                >
                                    <MenuItem value={0}>Как можно быстрее</MenuItem>
                                    {this.state.date_pred.map((item, key) => 
                                        <MenuItem key={key} value={item.date}>{item.text}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            <FormControl style={{ width: '100%', paddingBottom: 20, display: this.state.orderPredDay == 0 ? 'none' : 'inline-flex' }} variant="standard">
                                <InputLabel htmlFor="age-native-simple1">Время</InputLabel>
                                <Select
                                    size='small'
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
                        <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="BtnBorder" onClick={() => this.setState({ chooseTimeDialog: false })}>
                            <Button variant="contained" className="BtnCardMain CardInCardItem">Использовать</Button>
                        </ButtonGroup>
                    </DialogContent>
                </Dialog>
                
                <Dialog 
                    onClose={() => this.setState({ choosePayDialog: false })}
                    aria-labelledby="simple-dialog-title" 
                    open={this.state.choosePayDialog}
                    fullWidth={true}
                    className="DialogChoosePayDialog"
                >
                    <DialogTitle id="simple-dialog-title" style={{ paddingBottom: 0 }}>Оплата</DialogTitle>
                    <FontAwesomeIcon className="closeDialog" onClick={() => this.setState({ choosePayDialog: false })} icon={faTimes}/>
                    <List>
                        {this.state.renderPay.map((item, key) => 
                            <ListItem button onClick={this.changePayMobile.bind(this, item.type)} key={key}>
                                <ListItemAvatar>
                                    <Avatar style={{ color: '#fff', backgroundColor: '#000' }}>
                                        { item.type == 'cash' ?
                                            <FontAwesomeIcon icon={ faMoneyBill } />
                                                :
                                            item.type == 'in' ?
                                                <FontAwesomeIcon icon={ faCashRegister } />
                                                    :
                                                <FontAwesomeIcon icon={ faCreditCard } />
                                        }
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={item.title} />
                            </ListItem>
                        )}
                    </List>
                </Dialog>
                
                <Dialog
                    open={this.state.orderCheckDop}
                    fullWidth={true}
                    onClose={this.startOrderNext.bind(this)}
                    className="DialogOrderCheckDopDialog"
                >
                    <Typography variant="h5" component="span" className="orderCheckTitle">А как же палочки и соевый соус ?</Typography>
                    <FontAwesomeIcon className="closeDialog" onClick={this.startOrderNext.bind(this)} icon={faTimes}/>
                    <DialogContent>
                        <div className="tableMobile OrderCheckDopDialog">
                            {this.state.cartItems_dop.map((item, key) =>
                                <CartItemMobile key={key} item={item} type="dop" firebaseAnalitic={this.firebaseAnalitic} />
                            )}
                        </div>
                    </DialogContent>
                    <DialogActions style={{ padding: '12px 24px', paddingBottom: 24 }}>
                        <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="BtnBorder" style={{ width: '100%' }} onClick={this.startOrderNext.bind(this)}>
                            <Button variant="contained" style={{ width: '100%' }} className="BtnCardMain CardInCardItem">Продолжить</Button>
                        </ButtonGroup>
                    </DialogActions>
                </Dialog>
                
                <Dialog
                    open={this.state.orderCheckDopTea}
                    fullWidth={true}
                    onClose={this.startOrderNext.bind(this)}
                    className="DialogOrderCheckDopDialog"
                >
                    <Typography variant="h5" component="span" className="orderCheckTitle">Согреваем, чаем угощаем!</Typography>
                    <Typography variant="h5" component="span" className="orderCheckTitle">Две индивидуальные упаковки ягодно-фруктового чая вам в подарок</Typography>
                    <FontAwesomeIcon className="closeDialog" onClick={this.startOrderNext.bind(this)} icon={faTimes}/>
                    <DialogContent>
                        <div className="tableMobile OrderCheckDopDialog">
                            {this.state.cartItems_dop_tea.map((item, key) =>
                                <CartItemMobile key={key} item={item} type="dop" firebaseAnalitic={this.firebaseAnalitic} />
                            )}
                        </div>
                    </DialogContent>
                    <DialogActions style={{ padding: '12px 24px', paddingBottom: 24 }}>
                        <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="BtnBorder" style={{ width: '100%' }} onClick={this.startOrderNext.bind(this)}>
                            <Button variant="contained" style={{ width: '100%' }} className="BtnCardMain CardInCardItem">Продолжить</Button>
                        </ButtonGroup>
                    </DialogActions>
                </Dialog>
                
                { this.state.orderCheck === true ?
                    <Dialog
                        open={this.state.orderCheck}
                        fullWidth={true}
                        onClose={() => this.setState({ orderCheck: false })}
                        className="DialogOrderCheckDialog"
                    >
                        <Typography variant="h5" component="span" className="orderCheckTitle">Подтверждение заказа</Typography>
                        <FontAwesomeIcon className="closeDialog" onClick={() => this.setState({ orderCheck: false })} icon={faTimes}/>
                        <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
                            { parseInt( this.state.orderTimes ) == 1 ?
                                null
                                    :
                                <Typography variant="h5" component="span" className="orderCheckText">Время предзаказа: {this.state.orderPredDay + ' ' + this.state.orderPredTime}</Typography>
                            }
                            { parseInt( this.state.orderType ) == 0 ?
                                <Typography variant="h5" component="span" className="orderCheckText">Доставим: { this.state.orderAddr ?
                                    this.state.orderAddr.city_name+', '+
                                    this.state.orderAddr.street+' '+
                                    this.state.orderAddr.home+
                                    ( parseInt(this.state.orderAddr.pd) == 0 || this.state.orderAddr.pd.length == 0 ? '' : ', Пд. '+this.state.orderAddr.pd )+
                                    ( parseInt(this.state.orderAddr.et) == 0 || this.state.orderAddr.et.length == 0 ? '' : ', Эт. '+this.state.orderAddr.et )+
                                    ( parseInt(this.state.orderAddr.kv) == 0 || this.state.orderAddr.kv.length == 0 ? '' : ', Кв. '+this.state.orderAddr.kv )
                                        :
                                    null
                                }</Typography>
                                    :
                                <Typography variant="h5" component="span" className="orderCheckText">Заберу: {this.state.picPointInfo ? this.state.picPointInfo.addr : ''}</Typography>
                            }
                            { parseInt( this.state.orderType ) == 0 ?
                                this.state.orderAddr && parseInt(this.state.orderAddr.dom_true) == 0 ?
                                    <Typography variant="h5" component="span" className="orderCheckText">Домофон не работает</Typography>
                                        :
                                    null
                                    :
                                null
                            }
                            { this.state.orderPromo.length > 0 ?
                                <Typography variant="h5" component="span" className="orderCheckText">Промокод: {this.state.orderPromo}</Typography>
                                    :
                                null
                            }
                            <Typography variant="h5" component="span" className="orderCheckText">Оплачу: {this.state.renderPay.find( (item) => item.type == this.state.orderPay )['title']}</Typography>
                            
                            { parseInt( this.state.orderType ) == 0 && this.state.orderPay == 'cash' ?
                                this.state.orderSdacha.length > 0 ?
                                    <Typography variant="h5" component="span" className="nameSdacha orderCheckText">Сдача с: {this.state.orderSdacha} <Ruble width="20" viewBox="0 0 700 300" /></Typography>
                                        :
                                    <Typography variant="h5" component="span" className="orderCheckText">Без сдачи</Typography>
                                    :
                                null
                            }
                            
                            { parseInt( this.state.orderType ) != -1 ? null :
                                <Typography variant="h5" component="span" className="orderCheckText" style={{ color: '#c03' }}>Забрать заказ можно только в маске</Typography>
                            }

                            { parseInt( this.state.orderType ) != -1 ? null :
                                <>
                                    <Typography variant="h5" component="span" className="orderCheckText"><FontAwesomeIcon icon={ faQrcode } /> Уважаемые посетители кафе "Жако", посадка в зал осуществляется только при наличии qr - кода и документа, удостоверяющего личность. </Typography>
                                    <Link
                                        to={{ pathname: "https://pravo.samregion.ru/wp-content/uploads/sites/2/2021/11/pgso291.pdf" }}
                                        target="_blank"
                                        style={{ textDecoration: 'none', color: 'inherit', paddingBottom: 10, marginTop: -10 }}
                                    >
                                        <Typography variant="h5" component="span" className="orderCheckText">Постановление губернатора Самарской области от 6.11.2021 г.</Typography>
                                    </Link>
                                </>
                            }
                            
                            { parseInt( this.state.orderType ) == 0 && parseInt(this.state.orderAddr.point_id) == 3 && false ?
                                <>
                                    <Typography variant="h5" component="span" className="orderCheckText">Дорогие жители шлюзового района! В связи с ремонтом моста и затруднённой ситуацией на дорогах, доставка займёт больше времени, чем обычно.</Typography>
                                    <Typography variant="h5" component="span" className="orderCheckText">Благодарим за понимание!</Typography>
                                </>
                                    :
                                null
                            }
                            
                            { this.state.newOrderData && this.state.newOrderData.dop_text && this.state.newOrderData.dop_text.length > 0 ?
                                <Typography variant="h5" component="span" className="orderCheckText" style={{ fontWeight: 'bold' }}>{this.state.newOrderData.dop_text}</Typography>
                                    :
                                null
                            }
                            
                            
                            <table className="tableOrderCheck">
                                <tbody>
                                    {itemsStore.getItems().map((item, key) => 
                                        parseInt(item.count) > 0 ?
                                            <tr key={key}>
                                                <td style={{ width: '60%' }}>
                                                    <Typography variant="h5" component="span" className="orderCheckText">{item.name}</Typography>
                                                </td>
                                                <td>
                                                    <Typography variant="h5" component="span" className="orderCheckText">{item.count}</Typography>
                                                </td>
                                                <td>
                                                    <Typography variant="h5" component="span" className="namePrice orderCheckText">{item.all_price} <Ruble width="20" viewBox="0 0 700 300" /></Typography>
                                                </td>
                                            </tr>
                                                :
                                            null
                                    )}
                                    {this.state.cartItems_promo.map((item, key) =>
                                        <tr key={key}>
                                            <td style={{ width: '60%' }}>
                                                <Typography variant="h5" component="span" className="orderCheckText">{item.name}</Typography>
                                            </td>
                                            <td>
                                                <Typography variant="h5" component="span" className="orderCheckText">{item.count}</Typography>
                                            </td>
                                            <td>
                                                <Typography variant="h5" component="span" className="namePrice orderCheckText">{item.allPrice} <Ruble width="20" viewBox="0 0 700 300" /></Typography>
                                            </td>
                                        </tr>
                                    )}
                                    { parseInt( this.state.orderType ) == 0 ?
                                        <tr>
                                            <td colSpan="2">
                                                <Typography variant="h5" component="span" className="orderCheckText">Доставка</Typography>
                                            </td>
                                            <td>
                                                <Typography variant="h5" component="span" className="namePrice orderCheckText">{ itemsStore.getSumDiv() } <Ruble width="20" viewBox="0 0 700 300" /></Typography>
                                            </td>
                                        </tr>
                                            :
                                        null
                                    }
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan="2">
                                            <Typography variant="h5" component="span" className="orderCheckText bold">Сумма заказа</Typography>
                                        </td>
                                        <td>
                                            <Typography variant="h5" component="span" className="namePrice orderCheckText">{ parseInt(itemsStore.getAllPrice()) + parseInt(itemsStore.getSumDiv()) } <Ruble width="20" viewBox="0 0 700 300" /></Typography>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </DialogContent>
                        <DialogActions style={{ padding: '12px 24px', paddingBottom: 24, display: 'flex', flexDirection: 'column' }}>
                            { this.state.orderPay == 'card' ? 
                                <>
                                    <a
                                        href={ this.state.newOrderData.pay.formUrl }
                                        className="MuiButtonBase-root MuiBottomNavigationAction-root"
                                        style={{ padding: 20 }}
                                    >
                                        <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="BtnBorder" style={{ width: '100%' }}>
                                            <Button variant="contained" style={{ width: '100%', margin: '0px 10px' }} className="BtnCardMain CardInCardItem">Оплатить заказ картой</Button>
                                        </ButtonGroup>
                                    </a>
                                    <div id="sbol-pay-container"></div>
                                </>
                                
                                    :
                                <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="BtnBorder" style={{ width: '100%' }} onClick={ this.trueOrder.bind(this) }>
                                    <Button variant="contained" style={{ width: '100%' }} className="BtnCardMain CardInCardItem">Подтвердить заказ</Button>
                                </ButtonGroup>
                            }
                        </DialogActions>
                    </Dialog>
                        :
                    null
                }
                
            </Grid>
        )
    }
}