import React from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faPlus, faMinus, faRubleSign, faCreditCard, faMoneyBill, faCashRegister, faGift } from '@fortawesome/free-solid-svg-icons'

import Hidden from '@material-ui/core/Hidden';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';

import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';

import Dialog from '@material-ui/core/Dialog';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import Input from '@material-ui/core/Input';

import Autocomplete from '@material-ui/lab/Autocomplete';

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

class CartItem extends React.Component {
    _isMounted = false;
    
    constructor(props) {
        super(props);
        
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
        itemsStore.AddItem(item_id);
    }
    
    minus(item_id){
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
        if( parseInt(this.state.count) > 0 || parseInt(this.state.item.cat_id) == 7 ){
            return (
                <tr>
                    <td style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', position: 'relative' }}>
                        <img src={"https://newjacofood.ru/src/img/items/"+this.state.item.img+'?'+this.state.item.imgUpdate} />
                        {this.state.type == 'promo' ? 
                            <FontAwesomeIcon icon={faGift} className="promoIcon" />
                                :
                            null
                        }
                        <div>
                            <Typography variant="h5" component="span" className="nameItem">{this.state.item.name}</Typography>
                            <Typography variant="h5" component="span" className="descItem">{this.state.item.desc}</Typography>
                        </div>
                    </td>
                    <td>
                        {this.state.type != 'promo' ? 
                            <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="count">
                                <Button variant="contained" className="BtnCardMain" onClick={this.minus.bind(this, this.state.item.id)}>
                                    <FontAwesomeIcon icon={faMinus} style={{ fontSize: '1rem' }} />
                                </Button>
                                <Button variant="contained" className="BtnCardMain" >
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
                                <Button variant="contained" className="BtnCardMain" >
                                    <Typography component="span" className="CardCountItem">{this.state.count}</Typography>
                                </Button>
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
                        <Typography gutterBottom variant="h5" component="span" className="namePrice">{this.state.allPrice} <FontAwesomeIcon icon={faRubleSign} /></Typography>
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
    
    constructor(props) {
        super(props);
        
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
        itemsStore.AddItem(item_id);
    }
    
    minus(item_id){
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
        if( this.state.count > 0 || parseInt(this.state.item.cat_id) == 7 ){
            return (
                <div className="boxItem">
                    <img src={"https://newjacofood.ru/src/img/items/"+this.state.item.img+'?'+this.state.item.imgUpdate} />
                    {this.state.type == 'promo' ? 
                        <FontAwesomeIcon icon={faGift} className="promoIcon" />
                            :
                        null
                    }
                    <div>
                        <Typography variant="h5" component="span">{this.state.item.name}</Typography>
                        <div>
                            {this.state.type != 'promo' ? 
                                <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="count">
                                    <Button variant="contained" className="BtnCardMain" onClick={this.minus.bind(this, this.state.item.id)}>
                                        <FontAwesomeIcon icon={faMinus} style={{ fontSize: '1rem' }} />
                                    </Button>
                                    <Button variant="contained" className="BtnCardMain" >
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
                                    <Button variant="contained" className="BtnCardMain" >
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
                            
                            <Typography variant="h5" component="span" className="namePrice">{this.state.allPrice} <FontAwesomeIcon icon={faRubleSign} /></Typography>
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

class RenderCart extends React.Component {
    _isMounted = false;
    clickOrderStart = false
    
    constructor(props) {
        super(props);
        
        this.state = {      
            is_load: false,
            city_name: this.props.cityName,
            
            chooseAddr: false,
            choosePicDialog: false,
            chooseTimeDialog: false,
            choosePayDialog: false,
            chooseNewAddr: false,
            
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
                    {type: 'card', title: 'Онлайн'},
                ],
                dev_mini: [
                    {type: 'cash', title: 'Наличными курьеру'},
                ],
                pic: [
                    {type: 'in', title: 'В кафе'},
                ]
            },
            renderPay: [
                {type: 'cash', title: 'Наличными курьеру'},
                {type: 'card', title: 'Онлайн'},
            ],
            
            cartItems_main: [],
            cartItems_dop: [],
            cartItems_need_dop: [],
            cartItems_promo: [],
            
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
            
            orderType: 0,
            orderAddr: null,
            orderPic: 0,
            orderComment: '',
            orderPay: 'cash',
            
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
                
            console.log( json )
            
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
                    }
                    
                    setTimeout(() => {
                        if( parseInt( cartData.orderType ) == 1 && parseInt( cartData.orderPic ) > 0 ){
                            this.choosePic(cartData.orderPic);
                        }
                    }, 300)
                    
                    if( cartData.orderType == 0 && cartData.orderAddr && cartData.orderAddr.id && cartData.orderAddr.id !== -1 ){
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
                    
                    setTimeout(()=>{
                        let type = cartData.orderTimes,
                            type_order = cartData.orderType;
                        
                        if( type_order == 0 ){
                            if( type == 1 ){
                                this.setState({
                                    renderPay: cartData.orderAddr && parseInt(cartData.orderAddr.pay_active) == 1 ? this.state.pays.dev : this.state.pays.dev_mini,
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
                    }, 300)
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
    }
    
    componentDidMount = () => {
        this._isMounted = true; 
        
        if( document.querySelector('.activeCat') ){
            document.querySelector('.activeCat').classList.remove('activeCat');
        }
        window.scrollTo(0, 0);
        itemsStore.setPage('cart');
        
        this.loadData();
        
        let cartItems = itemsStore.getItems();
        let allItems = itemsStore.getAllItems();
        let promoItems = itemsStore.getItemsPromo();
        
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
        
        autorun(() => {
            if( this._isMounted === true ){
                
                let cartItems = itemsStore.getItems();
                let allItems = itemsStore.getAllItems();
                let need_dop = itemsStore.check_need_dops();
                let promoItems = itemsStore.getItemsPromo();
                
                let cartItems_new = [];
                let cartPromoItems = [];
                
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
                            img: thisitem.img,
                            imgUpdate: thisitem.img_date_update,
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
    }
    
    componentWillUnmount(){
        this._isMounted = false;
    }
    
    changeTab = (event, newValue) => {
        this.setState({
            orderType: newValue
        })
        
        if( newValue == 0 ){
            let thisitem = this.state.orderAddr;
            let allPrice = itemsStore.getAllPrice();
        
            if(thisitem){
                if( parseInt(thisitem.free_drive) == 1 ){
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
        }
        
        let type = this.state.orderTimes,
            type_order = newValue,
            def_type = 'cash';
        
        if( type_order == 0 ){
            if( type == 1 ){
                this.setState({
                    renderPay: thisitem && parseInt(thisitem.pay_active) == 1 ? this.state.pays.dev : this.state.pays.dev_mini,
                })
                def_type = 'cash';
            }else{
                this.setState({
                    renderPay: this.state.pays.dev_mini,
                })
                def_type = 'cash';
            }
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
        
        if( parseInt(thisitem.free_drive) == 1 ){
            if( parseInt(allPrice) > 0 ){
                itemsStore.setSumDiv(0);
            }else{
                itemsStore.setSumDiv(1);
            }
        }else{
            itemsStore.setSumDiv(parseInt(thisitem.sum_div));
        }
        
        let type = this.state.orderTimes,
            type_order = this.state.orderType;
        
        if( type_order == 0 ){
            if( type == 1 ){
                this.setState({
                    renderPay: thisitem && parseInt(thisitem.pay_active) == 1 ? this.state.pays.dev : this.state.pays.dev_mini,
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
        if( document.querySelector('.boxPic.active') ){
            document.querySelector('.boxPic.active').classList.remove('active');
        }
        if( document.querySelector('#pic_'+pointId) ){
            document.querySelector('#pic_'+pointId).classList.add('active');
        }
        
        let picPointInfo = this.state.pic_point.filter( (item) => item.id == pointId )[0];
        
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
            if( type == 1 ){
                this.setState({
                    renderPay: this.state.orderAddr && parseInt(this.state.orderAddr.pay_active) == 1 ? this.state.pays.dev : this.state.pays.dev_mini,
                });
                def_type = 'cash';
            }else{
                this.setState({
                    renderPay: this.state.pays.dev_mini,
                });
                def_type = 'cash';
            }
        }else{
            this.setState({
                renderPay: this.state.pays.pic,
            })
            def_type = 'in';
        }
        
        this.setState({
            orderTimes: type,
            orderPay: def_type,
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
                city_id: itemsStore.getCity(),
                promo_name: this.state.orderPromo
            })
        }).then(res => res.json()).then(json => {
            
            console.log( json )
            
            itemsStore.setPromo( JSON.stringify(json), this.state.orderPromo );
            let check_promo = itemsStore.checkPromo();
              
            console.log( check_promo )
            
            if( check_promo.st === false ){
                localStorage.removeItem('promo_name')
            }
            
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
                    dom_true: 0,
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
        }, 500)
    }
    
    loadTimePred(){
        let my_cart = [];
        let cartItems = itemsStore.getItems();  
        
        if( this.state.orderType+1 == 1 ){
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
        if( event.target.value !== 0 ){
            this.setState({
                orderPredDay: event.target.value,
                orderTimes: '2'
            })
            
            let type_order = this.state.orderType;                
            
            if( type_order == 0 ){
                this.setState({
                    renderPay: this.state.pays.dev_mini,
                    orderPay: 'cash'
                });
            }else{
                this.setState({
                    renderPay: this.state.pays.pic,
                    orderPay: 'in'
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
                    renderPay: this.state.orderAddr && parseInt(this.state.orderAddr.pay_active) == 1 ? this.state.pays.dev : this.state.pays.dev_mini,
                });
            }else{
                this.setState({
                    renderPay: this.state.pays.pic,
                    orderPay: 'in'
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
            
            fetch('https://jacofood.ru/src/php/test_app.php', {
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
                    payFull: JSON.stringify(payFull), //
                    cart: JSON.stringify(new_cart),//
                    promo_name: this.state.orderPromo//
                })
            }).then(res => res.json()).then(json => {
                console.log( json )
                
                setTimeout(()=>{
                    this.clickOrderStart = false;    
                }, 300)
                
                if( json.st ){
                    this.setState({
                        orderCheck: true
                    })
                }else{
                    this.setState({
                        error: {
                            title: 'Предупреждение', 
                            text: json.text_err
                        },
                        errorOpen: true
                    })
                }
            })
        }
    }
    
    checkNewAddr(){
        let street = document.querySelector('#newAddrStreet').value;
        
        if( street.length > 0 ){
            fetch('https://jacofood.ru/src/php/test_app.php', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded'},
                body: queryString.stringify({
                    type: 'save_new_addr_web',  
                    city_id: this.state.city_name,
                    user_id: itemsStore.getToken(),
                    street: street
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
                    if( json.data.home == '' ){
                        this.setState({
                            error: {
                                title: 'Предупреждение', 
                                text: 'Номер дома не указан'
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
    
    render() {
        let this_pay = this.state.renderPay.find( (item) => item.type == this.state.orderPay );
        
        return (
            <Grid container className="Cart mainContainer MuiGrid-spacing-xs-3">
                <Grid item xs={12}>
                    <Typography variant="h5" component="h1">Корзина</Typography>
                </Grid>
                
                <Hidden xsDown>
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
                                <AccordionDetails className="newAddr">
                                    <div>
                                        <Autocomplete
                                            freeSolo
                                            id="newAddrStreet"
                                            style={{ width: '100%' }}
                                            onBlur={this.checkNewAddr.bind(this)}
                                            options={this.state.all_addr.map((option) => option.value)}
                                            renderInput={(params) => (
                                                <TextField {...params} label="Адрес" margin="normal" variant="outlined" />
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <TextField 
                                            label="Подъезд" 
                                            variant="outlined" 
                                            value={this.state.newAddrPD} 
                                            onChange={ event => this.setState({ newAddrPD: event.target.value }) }
                                            onBlur={this.saveDataCustomAddr.bind(this)}
                                        />
                                        <TextField 
                                            label="Этаж" 
                                            variant="outlined" 
                                            value={this.state.newAddrET} 
                                            onChange={ event => this.setState({ newAddrET: event.target.value }) }
                                            onBlur={this.saveDataCustomAddr.bind(this)}
                                        />
                                        <TextField 
                                            label="Квартира" 
                                            variant="outlined" 
                                            value={this.state.newAddrKV} 
                                            onChange={ event => this.setState({ newAddrKV: event.target.value }) }
                                            onBlur={this.saveDataCustomAddr.bind(this)}
                                        />  
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
                                        <FormControlLabel key={key} value={item.type} control={<Radio />} label={item.title} />
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
                                        <CartItem key={key} item={item} type="item" />
                                    )}
                                    {this.state.cartItems_promo.map((item, key) =>
                                        <CartItem key={key} item={item} type="promo" />
                                    )}
                                    
                                    <tr className="rowAboutDop">
                                        <td colSpan='3'>
                                            <Typography gutterBottom variant="h5" component="span" className="">Соевый соус, имбирь и васаби приобретаются отдельно!</Typography>
                                            <br />
                                            <Typography gutterBottom variant="h5" component="span" className="">Не забудь добавить нужные позиции в корзину.</Typography>
                                        </td>
                                    </tr>
                                    {this.state.cartItems_dop.map((item, key) =>
                                        <CartItem key={key} item={item} type="dop" />
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
                                <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="BtnBorder" onClick={this.startOrder.bind(this)}>
                                    <Button variant="contained" className="BtnCardMain CardInCardItem">Оформить заказ</Button>
                                </ButtonGroup>
                            </div>
                        </div>
                        
                    </Grid>
                </Hidden>
                
                <Hidden smUp>
                    <Grid item container spacing={3} md={10} sm={12} xs={12} xl={10} className="mainContainer mobile">
                        <AppBar position="static" style={{ backgroundColor: '#fff', color: '#000', zIndex: 0 }} elevation={0}>
                            <Tabs value={this.state.orderType} onChange={this.changeTab.bind(this)} aria-label="simple tabs example"  style={{ justifyContent: 'center' }}>
                                <Tab label="Доставка" {...a11yProps(0)} style={{ width: '50%' }} disableRipple={true} />
                                <Tab label="Самовывоз" {...a11yProps(1)} style={{ width: '50%' }} disableRipple={true} />
                            </Tabs>
                        </AppBar>
                        <TabPanel value={this.state.orderType} index={0} style={{ width: '100%' }}>
                            <div className="boxMobile" onClick={() => this.setState({ chooseAddr: true })}>
                                <Typography variant="h5" component="span">Адрес: {this.state.orderAddr ? this.state.orderAddr.city_name+', '+this.state.orderAddr.street+' '+this.state.orderAddr.home+', Пд. '+this.state.orderAddr.pd+', Эт. '+this.state.orderAddr.et+', Кв. '+this.state.orderAddr.kv : ''}</Typography>
                            </div>
                        </TabPanel>
                        <TabPanel value={this.state.orderType} index={1} style={{ width: '100%' }}>
                            <div className="boxMobile" onClick={() => this.setState({ choosePicDialog: true })}>
                            <Typography variant="h5" component="span">Адрес: { this.state.orderPic > 0 ? this.state.pic_point.find( (item) => item.id == this.state.orderPic )['addr'] : '' }</Typography>
                            </div>
                        </TabPanel>
                        
                        <div className="boxMobile" onClick={() => this.setState({ chooseTimeDialog: true })}>
                            <Typography variant="h5" component="span">Приготовим: {this.state.orderTimes == 1 ? 'как можно быстрее' : this.state.orderPredDay+' '+this.state.orderPredTime}</Typography>
                        </div>
                        <div className="boxMobile" onClick={() => this.setState({ choosePayDialog: true })}>
                            <Typography variant="h5" component="span">Оплачу: { this_pay ? this_pay['title'] : '' }</Typography>
                        </div>
                        <div style={{ marginTop: 15 }}>
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
                                    />
                                </form>
                            </div>
                                :
                            null
                        }
                                              
                        {this.state.orderType == 0 && this.state.orderPay == 'cash' ?
                            <div className="boxMobile_ area">
                                <FormControl  variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Подготовить сдачу с</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type="number"
                                        value={this.state.orderSdacha}
                                        onChange={this.changeSdacha}
                                        endAdornment={<FontAwesomeIcon icon={faRubleSign} />}
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
                                    <CartItemMobile key={key} item={item} type="item" />
                                )}
                                
                                {this.state.cartItems_promo.map((item, key) =>
                                    <CartItemMobile key={key} item={item} type="promo" />
                                )}
                                
                                <div className="boxItem rowAboutDop">
                                    <Typography gutterBottom variant="h5" component="span" className="">Соевый соус, имбирь и васаби приобретаются отдельно!</Typography>
                                    <br />
                                    <Typography gutterBottom variant="h5" component="span" className="">Не забудьте добавить нужные позиции в корзину.</Typography>
                                </div>
                                
                                {this.state.cartItems_dop.map((item, key) =>
                                    <CartItemMobile key={key} item={item} type="dop" />
                                )}
                                
                                
                            </div>
                            
                            
                        </div>
                    
                        <div className="bottomOrder">
                            <div>
                                <Typography variant="h5" component="span">К оплате</Typography>
                                <Typography variant="h5" component="span" className="namePrice">{ this.state.sumDiv + this.state.allPrice } <FontAwesomeIcon icon={faRubleSign} /></Typography>
                            </div>
                            <div>
                                <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="BtnBorder" onClick={this.startOrder.bind(this)}>
                                    <Button variant="contained" className="BtnCardMain CardInCardItem">Оформить заказ</Button>
                                </ButtonGroup>
                            </div>
                        </div>
                    </Grid>
                </Hidden>
                
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
                                        <FormControlLabel value={item.id} control={<Radio />} label={item.city_name+', '+item.street+' '+item.home+', Пд. '+item.pd+', Эт. '+item.et+', Кв. '+item.kv} />
                                        <FontAwesomeIcon icon={faTimes}/>
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
                    <DialogContent>
                        <div className="newAddrMobile">
                            <Autocomplete
                                freeSolo
                                id="newAddrStreet"
                                style={{ width: '100%' }}
                                onBlur={this.checkNewAddr.bind(this)}
                                options={this.state.all_addr.map((option) => option.value)}
                                renderInput={(params) => (
                                    <TextField {...params} label="Адрес" margin="normal"  />
                                )}
                            />
                            <TextField 
                                label="Подъезд" 
                                //variant="outlined" 
                                style={{ width: '100%' }}
                                value={this.state.newAddrPD} 
                                onChange={ event => this.setState({ newAddrPD: event.target.value }) }
                                onBlur={this.saveDataCustomAddr.bind(this)}
                            />
                            <TextField 
                                label="Этаж" 
                                //variant="outlined" 
                                style={{ width: '100%' }}
                                value={this.state.newAddrET} 
                                onChange={ event => this.setState({ newAddrET: event.target.value }) }
                                onBlur={this.saveDataCustomAddr.bind(this)}
                            />
                            <TextField 
                                label="Квартира" 
                                //variant="outlined" 
                                style={{ width: '100%' }}
                                value={this.state.newAddrKV} 
                                onChange={ event => this.setState({ newAddrKV: event.target.value }) }
                                onBlur={this.saveDataCustomAddr.bind(this)}
                            />  
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
                    onClose={() => this.setState({ chooseTimeDialog: false })}
                    className="DialogChoosePicDialog"
                >
                    <Typography variant="h5" component="span" className="orderCheckTitle">Время заказа</Typography>
                    <FontAwesomeIcon className="closeDialog" onClick={() => this.setState({ chooseTimeDialog: false })} icon={faTimes}/>
                    <DialogContent>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <FormControl style={{ width: '100%', paddingBottom: 20 }}>
                                <InputLabel htmlFor="age-native-simple">День</InputLabel>
                                <Select
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
                            <FormControl style={{ width: '100%', paddingBottom: 20, display: this.state.orderPredDay == 0 ? 'none' : 'inline-flex' }}>
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
                                    this.state.orderAddr.home+', Пд.:'+
                                    this.state.orderAddr.pd+', Эт.:'+
                                    this.state.orderAddr.et+', Кв.:'+
                                    this.state.orderAddr.kv
                                        :
                                    null
                                }</Typography>
                                    :
                                <Typography variant="h5" component="span" className="orderCheckText">Заберу: {this.state.picPointInfo ? this.state.picPointInfo.addr : ''}</Typography>
                            }
                            { parseInt( this.state.orderType ) == 0 ?
                                this.state.orderAddr && parseInt(this.state.orderAddr.dom_true) == 1 ?
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
                                    <Typography variant="h5" component="span" className="nameSdacha orderCheckText">Сдача с: {this.state.orderSdacha} <FontAwesomeIcon icon={faRubleSign} /></Typography>
                                        :
                                    <Typography variant="h5" component="span" className="orderCheckText">Без сдачи</Typography>
                                    :
                                null
                            }
                            
                            <table className="tableOrderCheck">
                                <tbody>
                                    {itemsStore.getItems().map((item, key) => 
                                        parseInt(item.count) > 0 ?
                                            <tr key={key}>
                                                <td>
                                                    <Typography variant="h5" component="span" className="orderCheckText">{item.name}</Typography>
                                                </td>
                                                <td>
                                                    <Typography variant="h5" component="span" className="orderCheckText">{item.count}</Typography>
                                                </td>
                                                <td>
                                                    <Typography variant="h5" component="span" className="namePrice orderCheckText">{item.all_price} <FontAwesomeIcon icon={faRubleSign} /></Typography>
                                                </td>
                                            </tr>
                                                :
                                            null
                                    )}
                                    {this.state.cartItems_promo.map((item, key) =>
                                        <tr key={key}>
                                            <td>
                                                <Typography variant="h5" component="span" className="orderCheckText">{item.name}</Typography>
                                            </td>
                                            <td>
                                                <Typography variant="h5" component="span" className="orderCheckText">{item.count}</Typography>
                                            </td>
                                            <td>
                                                <Typography variant="h5" component="span" className="namePrice orderCheckText">{item.allPrice} <FontAwesomeIcon icon={faRubleSign} /></Typography>
                                            </td>
                                        </tr>
                                    )}
                                    { parseInt( this.state.orderType ) == 0 ?
                                        <tr>
                                            <td colSpan="2">
                                                <Typography variant="h5" component="span" className="orderCheckText">Доставка</Typography>
                                            </td>
                                            <td>
                                                <Typography variant="h5" component="span" className="namePrice orderCheckText">{ itemsStore.getSumDiv() } <FontAwesomeIcon icon={faRubleSign} /></Typography>
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
                                            <Typography variant="h5" component="span" className="namePrice orderCheckText">{ parseInt(itemsStore.getAllPrice()) + parseInt(itemsStore.getSumDiv()) } <FontAwesomeIcon icon={faRubleSign} /></Typography>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </DialogContent>
                        <DialogActions style={{ padding: '12px 24px', paddingBottom: 24 }}>
                            <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="BtnBorder" style={{ width: '100%' }} onClick={() => this.setState({ orderCheck: false })}>
                                <Button variant="contained" style={{ width: '100%' }} className="BtnCardMain CardInCardItem">Подтвердить заказ</Button>
                            </ButtonGroup>
                        </DialogActions>
                    </Dialog>
                        :
                    null
                }
                
            </Grid>
        )
    }
}