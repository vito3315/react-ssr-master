import React from 'react';
import { NavLink as Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';

import Typography from '@material-ui/core/Typography';

import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Hidden from '@material-ui/core/Hidden';
import Popover from '@material-ui/core/Popover';
import { Link as ScrollLink } from "react-scroll";

const queryString = require('query-string');

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputMask from "react-input-mask";
import Badge from '@material-ui/core/Badge';
import itemsStore from '../../stores/items-store';

import { autorun } from "mobx"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faMapMarkerAlt, faRubleSign } from '@fortawesome/free-solid-svg-icons'
import { faUtensils, faUser, faGift } from '@fortawesome/free-solid-svg-icons'

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class CustomBottomNavigation extends React.Component{
    constructor(props) {
        super(props);
        
        this.state = {      
            allPrice: 0,
            thisPage: '',
            auth: false
        };
    }
    
    componentDidMount = () => {
        autorun(() => {
            this.setState({
                allPrice: itemsStore.getSumDiv() + itemsStore.getAllPrice(),
                thisPage: itemsStore.getPage(),
                auth: itemsStore.getToken() ? true : false
            })
        })
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        return (
            this.state.allPrice !== nextState.allPrice ||
            this.state.thisPage !== nextState.thisPage ||
            this.state.auth !== nextState.auth
        );
    }
    
    render(){
        let this_city = itemsStore.getCity();
        
        return(
            <div className="bottomNavigate">
                <Link
                    to={'/'+this_city+'/'}
                    exact={ true }
                    className="MuiButtonBase-root MuiBottomNavigationAction-root"
                >
                    <FontAwesomeIcon icon={ faUtensils } style={{ color: this.state.thisPage == 'home' ? 'black' : 'gray' }} />
                </Link>
                <Link
                    to={'/'+this_city+'/actii'}
                    exact={ true }
                    className="MuiButtonBase-root MuiBottomNavigationAction-root"
                >
                    <FontAwesomeIcon icon={ faGift } style={{ color: this.state.thisPage == 'actii' ? 'black' : 'gray' }} />
                </Link>
                {this.state.auth === true ?
                    <Link
                        to={'/'+this_city+'/cart'}
                        exact={ true }
                        className="MuiButtonBase-root MuiBottomNavigationAction-root"
                    >
                        <Badge badgeContent={ this.state.allPrice } max={500000} color="primary">
                            <ShoppingCartOutlinedIcon style={{ fill: this.state.thisPage == 'cart' ? '#CC0033' : '#CC0033' }} />
                        </Badge>
                    </Link>
                        :
                    <Typography 
                        className="MuiButtonBase-root MuiBottomNavigationAction-root" 
                        onClick={this.props.login}>
                        <Badge badgeContent={ this.state.allPrice } max={500000} color="primary">
                            <ShoppingCartOutlinedIcon style={{ fill: this.state.thisPage == 'cart' ? '#CC0033' : '#CC0033' }} />
                        </Badge>
                    </Typography>
                }
                <Link
                    to={'/'+this_city+'/contact'}
                    exact={ true }
                    className="MuiButtonBase-root MuiBottomNavigationAction-root"
                >
                    <FontAwesomeIcon icon={ faMapMarkerAlt } style={{ color: this.state.thisPage == 'contact' ? 'black' : 'gray' }} />
                </Link>
                {this.state.auth === true ?
                    <Link
                        to={'/'+this_city+'/profile'}
                        exact={ true }
                        className="MuiButtonBase-root MuiBottomNavigationAction-root"
                    >
                        <FontAwesomeIcon icon={ faUser } style={{ color: this.state.thisPage == 'profile' ? 'black' : 'gray' }} />
                    </Link>
                        :
                    <Typography 
                        className="MuiButtonBase-root MuiBottomNavigationAction-root" 
                        onClick={this.props.login}>
                            <FontAwesomeIcon icon={ faUser } style={{ color: this.state.thisPage == 'profile' ? 'black' : 'gray' }} />
                    </Typography>
                }
            </div>
        )
    }
}

function Ruble(props){
    return (
        <svg width={ props.width ? props.width : "50"} height="20" viewBox={ props.viewBox ? props.viewBox : "0 0 1500 200"} xmlns="http://www.w3.org/2000/svg">
            <g>
                <path d="m219.27,252.76c63.98,-2.85 99.22,-39.48 99.22,-103.13c0,-37.42 -12.62,-65.49 -37.52,-83.44c-22.29,-16.07 -48.63,-19.21 -62.35,-19.65c-28.61,-0.92 -107.02,-0.04 -110.34,0c-5.75,0.07 -10.38,4.75 -10.38,10.5l0,174.95c-9.23,-0.11 -15.07,-0.2 -15.31,-0.21c-0.06,0 -0.11,0 -0.17,0c-5.72,0 -10.41,4.59 -10.5,10.34c-0.09,5.8 4.54,10.57 10.34,10.66c0.95,0.01 6.78,0.1 15.64,0.21l0,26.12l-15.48,0c-5.8,0 -10.5,4.7 -10.5,10.5s4.7,10.5 10.5,10.5l15.48,0l0,74.89c0,5.8 4.7,10.5 10.5,10.5s10.5,-4.7 10.5,-10.5l0,-74.9l109.39,0c5.8,0 10.5,-4.7 10.5,-10.5s-4.7,-10.5 -10.5,-10.5l-109.39,0l0,-25.88c32.67,0.31 78.53,0.51 100.37,-0.46zm-100.37,-185.33c22.81,-0.21 76.99,-0.61 99.05,0.1c23.92,0.77 79.55,10.31 79.55,82.1c0,52.17 -26.63,79.82 -79.16,82.16c-21.17,0.94 -66.91,0.74 -99.44,0.43l0,-164.79z"/>
            </g>
        </svg>
    )
}

class SimplePopover extends React.Component{
    _isMounted = false;
    
    constructor(props) {
        super(props);
        
        this.state = {      
            anchorEl: null,
            cartItems: [],
            allPrice: 0,
            sumDiv: 0,
            promoName: '',
            promoText: '',
            promoST: false,
        };
    }
    
    componentWillUnmount(){
        this._isMounted = false;
    }
    
    componentDidMount = () => {
        this._isMounted = true;
        
        let cartItems = itemsStore.getItems();
        let promoItems = itemsStore.getItemsPromo();
        let newCart = [];
        
        cartItems.map((item) => {
            if( item.count > 0 ){
                item.type == 'us';
                newCart.push(item)
            }
        })
        
        promoItems.map((item) => {
            if( item.count > 0 ){
                item.type == 'promo';
                newCart.push(item)
            }
        })
        
        this.setState({
            cartItems: cartItems
        })
        
        
        autorun(() => {
            if( this._isMounted ){
                let cartItems = itemsStore.getItems();
                let promoItems = itemsStore.getItemsPromo();
                let newCart = [];
                
                cartItems.map((item) => {
                    if( item.count > 0 ){
                        item.type = 'us';
                        newCart.push(item)
                    }
                })
                
                promoItems.map((item) => {
                    if( item.count > 0 ){
                        item.type = 'promo';
                        newCart.push(item)
                    }
                })
                
                this.setState({
                    cartItems: newCart,
                    sumDiv: itemsStore.getSumDiv(),
                    promoName: localStorage.getItem('promo_name') ? localStorage.getItem('promo_name') : ''
                })
            }
        })
    }
    
    add(id){
        itemsStore.AddItem(id);
    }
    
    minus(id){
        itemsStore.MinusItem(id);
    }
    
    handleClick = (event) => {
        if( itemsStore.getPage() !== 'cart' ){
            this.setState({
                anchorEl: event.currentTarget
            })
        }else{
            this.handleClose()
        }
    }

    handleClose = () => {
        this.setState({
            anchorEl: null
        })
    }
    
    checkPromo(){
        fetch('https://jacofood.ru/src/php/test_app.php', {
            method: 'POST',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'},
            body: queryString.stringify({
                type: 'get_promo_web', 
                city_id: itemsStore.getCity(),
                promo_name: this.state.promoName
            })
        }).then(res => res.json()).then(json => {
            itemsStore.setPromo( JSON.stringify(json), this.state.promoName );
            let check_promo = itemsStore.checkPromo();
              
            if( check_promo.st === false ){
                localStorage.removeItem('promo_name')
            }
            
            if( this.state.promoName.length == 0 ){
                this.setState({
                    promoText: ''
                })
            }else{
                this.setState({
                    promoText: check_promo.text,
                    promoST: check_promo.st
                })
            }
        })
    }
    
    render(){
        const open = Boolean(this.state.anchorEl);
        const id = open ? 'simple-popover' : undefined;
        return(
            <div>
                <IconButton className="ShopIconBTN" aria-describedby={id} color="inherit" aria-label="menu" onClick={this.handleClick.bind(this)}>
                    <Badge badgeContent={itemsStore.getAllPrice() + itemsStore.getSumDiv()} max={500000} color="primary">
                        <ShoppingCartOutlinedIcon />
                    </Badge>
                </IconButton>
                
                <Popover
                    id={id}
                    open={open}
                    anchorEl={this.state.anchorEl}
                    onClose={this.handleClose.bind(this)}
                    
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <div style={{ width: 400, padding: 16 }}>
                        <table className="TableMini">
                            <tbody>
                                {this.state.cartItems.map((item, key) => 
                                    item.type == 'us' ?
                                        <tr key={key}>
                                            <td className="TableMiniName">{item.name}</td>
                                            <td>
                                                <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="BtnBorderWOBorder">
                                                    <Button variant="contained" className="BtnCardMain" onClick={this.minus.bind(this, item.item_id)}>
                                                        <FontAwesomeIcon icon={faMinus} style={{ fontSize: '1rem' }} />
                                                    </Button>
                                                    <Button variant="contained" className="BtnCardMain" >
                                                        <Typography component="span" className="CardCountItem">{item.count}</Typography>
                                                    </Button>
                                                    <Button variant="contained" className="BtnCardMain" onClick={this.add.bind(this, item.item_id)}> 
                                                        <FontAwesomeIcon icon={faPlus} style={{ fontSize: '1rem' }} />
                                                    </Button>
                                                </ButtonGroup>
                                            </td>
                                            <td style={{ width: '30%' }}> 
                                                <div className="TableMiniPrice">
                                                    {item.all_price} <Ruble viewBox="0 220 700 300" width="20" />
                                                </div>
                                            </td>
                                        </tr>
                                            :
                                        <tr key={key}>
                                            <td className="TableMiniName">{item.name}</td>
                                            <td>
                                                <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="BtnBorderWOBorder">
                                                    <Button variant="contained" className="BtnCardMain PROMO">
                                                        <FontAwesomeIcon icon={faMinus} style={{ fontSize: '1rem' }} />
                                                    </Button>
                                                    <Button variant="contained" className="BtnCardMain" >
                                                        <Typography component="span" className="CardCountItem">{item.count}</Typography>
                                                    </Button>
                                                    <Button variant="contained" className="BtnCardMain PROMO"> 
                                                        <FontAwesomeIcon icon={faPlus} style={{ fontSize: '1rem' }} />
                                                    </Button>
                                                </ButtonGroup>
                                            </td>
                                            <td style={{ width: '30%' }}> 
                                                <div className="TableMiniPrice">
                                                    {item.all_price} <Ruble viewBox="0 220 700 300" width="20" />
                                                </div>
                                            </td>
                                        </tr>
                                )}
                            </tbody>
                            <tfoot>
                                { this.state.sumDiv == 0 ? null :
                                    <tr style={{height: 35}}>
                                        <td className="TableMiniFullName">Доставка:</td>
                                        <td className="" style={{width: '30%', textAlign: 'center'}}>
                                            <div className="TableMiniPrice" style={{ marginRight: 21 }}>
                                                { this.state.sumDiv } <Ruble viewBox="0 220 700 300" width="20" />
                                            </div>
                                        </td>
                                    </tr>
                                }
                                <tr style={{height: 35}}>
                                    <td className="TableMiniFullName">Сумма:</td>
                                    <td className="" style={{width: '30%', textAlign: 'center'}}>
                                        <div className="TableMiniPrice" style={{ marginRight: 21 }}>
                                            { itemsStore.getAllPrice() + itemsStore.getSumDiv() } <Ruble viewBox="0 220 700 300" width="20" />
                                        </div>
                                    </td>
                                </tr>
                            </tfoot>      
                        </table>
                        <Paper component="div" className="SpacePromo">
                            <InputBase
                                onBlur={this.checkPromo.bind(this)}
                                value={this.state.promoName}
                                onChange={ event => this.setState({ promoName: event.target.value }) }
                                placeholder="Промокод"
                            />
                            <Divider orientation="vertical" />
                            <IconButton color="primary" aria-label="directions" onClick={this.checkPromo.bind(this)}>
                                <CheckOutlinedIcon />
                            </IconButton>
                        </Paper>
                        {this.state.promoText.length > 0 ?
                            <div className="DescPromo">
                                <Typography className="cat" variant="h5" component="span">{ this.state.promoST === true ? 'Промокод дает:' : 'Промокодом нельзя воспользоваться. '} {this.state.promoText}</Typography>
                            </div>
                                :
                            null
                        }
                        <div className="InCart">
                            {itemsStore.getToken() !== null ?
                                <Link
                                    to={'/'+itemsStore.getCity()+'/cart'}
                                    exact={ true }
                                    style={{ textDecoration: 'none' }}
                                    onClick={this.handleClose.bind(this)}
                                >
                                    <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="BtnBorder">
                                        <Button variant="contained" className="BtnCardMain CardInCardItem">В корзину</Button>
                                    </ButtonGroup>
                                </Link>
                                    :
                                <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="BtnBorder">
                                    <Button variant="contained" className="BtnCardMain CardInCardItem" onClick={this.props.openLogin}>Войти</Button>
                                </ButtonGroup>
                            }
                        </div>
                    </div>
                </Popover>
            </div>
        );
    }
}

export class Header extends React.Component {
    is_load = false;
    
    sms1 = false;
    sms2 = false;
    
    constructor(props) {
        super(props);
        
        itemsStore.setDops(this.props.data.all.other.cats.need_dop);
        itemsStore.setAllItems(this.props.data.all.other.cats.all_items);
        itemsStore.setAllItemsCat(this.props.data.all.other.cats.arr);
        itemsStore.setAllItemsCatNew(this.props.data.all.other.cats.main_cat);
        itemsStore.setFreeItems(this.props.data.all.other.cats.free_items);
        itemsStore.setBanners(this.props.data.all.other.cats.baners)
        itemsStore.setCityRU(this.props.data.all.other.cats.this_city_name_ru);
        
        
        this.state = {      
            this_link: this.props.this_link,
            categoryItemsNew: this.props.data.all.other.cats.main_cat,
            
            categoryItems: this.props.data.all.other.cats.arr,
            cartItems: [],
            activePage: '',
            is_load: false,
            openCity: false,
            cityName: this.props.city,
            testData: [1, 2, 3, 4],
            cityList: this.props.data.all.other.cats.city_list,
            
            openLogin: false,
            userLogin: '',
            userLoginFormat: '',
            userCode: '',
            
            stage_1: true,
            stage_2: false,
            
            timerSMS: 59,
            errPhone: '',
            errSMS: '',
            userName: '',
            
            soc_link: null,
            
            anchorEl: null,
            cityNameRu: this.props.data.all.other.cats.this_city_name_ru && this.props.data.all.other.cats.this_city_name_ru.length > 0 ? this.props.data.all.other.cats.this_city_name_ru : 'Город'
        };
    }
    
    componentDidMount = () => {
        
        setTimeout(() => {
            let cartData = itemsStore.getCartData();

            if( cartData.orderType || cartData.orderType == 0 ){
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
            }
            
            this.setState({
                is_load: true
            })
            
        }, 300)
        
        autorun(() => {
            this.setState({
                activePage: itemsStore.getPage()
            })
            
            if( itemsStore.getCity() !== this.state.cityName ){
                this.setState({
                    cityName: itemsStore.getCity()
                })
                
                this.load();
            }
            
            this.setState({
                userName: itemsStore.userName
            })
        })
        
        this.load();
    }
    
    load(){
        if( !this.is_load ){
            this.is_load = true;
            
            if( itemsStore.getCity() ){
                fetch('https://jacofood.ru/src/php/test_app.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type':'application/x-www-form-urlencoded'},
                    body: queryString.stringify({
                        type: 'get_cat_web', 
                        city_id: itemsStore.getCity(),
                        user_id: itemsStore.getToken()
                    })
                }).then(res => res.json()).then(json => {
                    
                    itemsStore.setUserName(json.user_name);
                    
                    //itemsStore.setDops(json.need_dop);
                    //itemsStore.setAllItems(json.all_items);
                    //itemsStore.setAllItemsCat(json.arr);
                    //itemsStore.setAllItemsCatNew(json.main_cat);
                    //itemsStore.setFreeItems(json.free_items);
                    //itemsStore.setBanners(json.baners)
                    //itemsStore.setCityRU(json.this_city_name_ru);
                    
                    this.setState({
                        //cityList: json.city_list,
                        //categoryItems: json.arr, 
                        //categoryItemsNew: json.main_cat,
                        is_load: true,
                        //cityNameRu: json.this_city_name_ru
                    });
                    this.is_load = false
                })
                .catch(err => { });
            }else{
                this.is_load = false;
            }
        }
    }  
    
    openCity(){
        this.setState({
            openCity: true
        })
    }
    
    closeCity(){
        this.setState({
            openCity: false
        })
    }

    chooseCity(city){
        let this_addr = window.location.href;
        localStorage.removeItem('cartData');
        setTimeout(()=>{
            //window.location.href = this_addr.replace(this.state.cityName, city);
        }, 300)
        
    }
    
    getNewLink(city){
        let this_addr = this.state.this_link;
        return this_addr.replace(this.state.cityName, city);
    }

    openLogin(){
        this.setState({
            openLogin: true
        })
    }
    
    closeLogin(){
        this.setState({
            openLogin: false
        })
    }
    
    sendSMS(){
        if( this.sms1 === false ){
            this.sms1 = true;
            
            this.setState({
                errPhone: '',
                errSMS: ''
            });
            
            let number = this.state.userLogin;
            
            number = number.split(' ').join('');
            number = number.split('(').join('');
            number = number.split(')').join('');
            number = number.split('-').join('');
            
            number = number.slice(1);
            
            this.setState({
                userLoginFormat: number
            })
            
            fetch('https://jacofood.ru/src/php/test_app.php', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded'},
                body: queryString.stringify({
                    type: 'create_profile', 
                    number: number
                })
            }).then(res => res.json()).then(json => {
                this.sms1 = false;
                
                if( json['st'] ){
                    this.setState({ 
                        stage_1: false,
                        stage_2: true, 
                        errPhone: ''
                    })
                
                    let timerId = setInterval(() => {
                        this.setState({
                            timerSMS: this.state.timerSMS-1
                        })
                        if( this.state.timerSMS == 0 ){
                            clearInterval(timerId);
                        }
                    }, 1000);
                }else{
                    this.setState({
                      errPhone: json.text
                    });
                }
            });
        }
    }
    
    repeatSMS(){
        if( this.sms2 === false ){
            this.sms2 = true;
            
            this.setState({
                errSMS: ''
            });
            
            fetch('https://jacofood.ru/src/php/test_app.php', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded'},
                body: queryString.stringify({
                    type: 'repeat_sms', 
                    number: this.state.userLoginFormat
                })
            }).then(res => res.json()).then(json => {
                this.sms2 = false;
                
                if( json['st'] ){
                    this.setState({
                        timerSMS: 59
                    })
                
                    let timerId = setInterval(() => {
                        this.setState({
                            timerSMS: this.state.timerSMS-1
                        })
                        if( this.state.timerSMS == 0 ){
                            clearInterval(timerId);
                        }
                    }, 1000);
                }else{
                    this.setState({
                        errSMS: json.text
                    });
                }
            });
        }
    }
    
    checkCode(){
        this.setState({
            errSMS: ''
        });
        
        fetch('https://jacofood.ru/src/php/test_app.php', {
            method: 'POST',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'},
            body: queryString.stringify({
                type: 'check_profile', 
                cod: this.state.userCode,
                number: this.state.userLoginFormat
            })
        }).then(res => res.json()).then(json => {
            if( json['st'] ){
                itemsStore.setToken(json.token, json.name);
                this.closeLogin();
            }else{
                this.setState({
                  errSMS: json.text
                });
            }
        });
    }
    
    changeNumber(){
        this.setState({
            stage_1: true,
            stage_2: false,
            
            errPhone: '',
            errSMS: ''
        })
    }

    changeCode(code){
        code = code.target.value
        
        this.setState({
            userCode: code
        })
        
        if( (parseInt(code)+'').length == 4 ){ 
            setTimeout(()=>{
                this.checkCode() 
            }, 500)
        }
    }

    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            this.sendSMS()
        }
    }
    
    handleClick = (event) => {
        
        this.setState({
            anchorEl: event.currentTarget
        })
    };
    
    handleClose = () => {
        this.setState({
            anchorEl: null
        })
    };
    
    render() {
        
        let link = this.props.this_link;
        link = link.split('/');
        let mainLink = '';
        
        let check = link.find( (item) => item == 'menu');
        
        if( check && check.length > 0 ){
            let check2 = link.find( (item) => item == 'item');
            
            if( !check2 ){
                let index = link.findIndex( (item) => item == 'menu');
                mainLink = link[ index+1 ];
            }
        }
        
        console.log( "this.state.activePage == 'home' && !check", this.state.activePage == 'home' && !check )
        
        if( this.state.is_load === false ){
            return (
                <AppBar position="fixed" className="header" style={{ zIndex: 2 }}>
                    <Toolbar className="sub_header">
                        
                        <Grid>
                            <Grid item style={{ marginRight: 15 }}>
                                <Link to={"/"+this.state.cityName}>
                                    <img alt="Жако доставка роллов и пиццы" src="https://jacochef.ru/src/img/Bely_fon_logo.png" />
                                </Link> 
                            </Grid>
                            <>
                                
                                <Grid item className="CityProfileNav">
                                    <Typography className="cat" variant="h5" component="span" onClick={this.openCity.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>{itemsStore.getCityRU()} <ArrowDropDownIcon /></Typography>
                                    <Typography className="cat" variant="h5" component="span" onClick={this.openLogin.bind(this)}>Войти</Typography>
                                </Grid>
                                
                                {this.state.categoryItemsNew.map((item, key) => 
                                    <Grid item>
                                        <Link 
                                            style={{ padding: '4px 8px' }}
                                            to={"/"+this.state.cityName+"/menu/"+item.link} 
                                            className={"catLink"}
                                        >
                                            <Typography className="cat" variant="h5" component="span">{item.name}</Typography>
                                        </Link>    
                                    </Grid>    
                                )}
                                
                                <Grid item>
                                    <Link 
                                        style={{ padding: '4px 8px' }}
                                        to={"/"+this.state.cityName+"/actii"} 
                                        className={ this.state.activePage == 'actii' ? "catLink activeCat" : "catLink"}
                                    >
                                        <Typography className="cat" variant="h5" component="span">Акции</Typography>
                                    </Link>    
                                </Grid>
                                <Grid item>
                                    <Link 
                                        style={{ padding: '4px 8px' }}
                                        to={"/"+this.state.cityName+"/contact"} 
                                        className={ this.state.activePage == 'contact' ? "catLink activeCat" : "catLink"}
                                    >
                                        <Typography className="cat" variant="h5" component="span">Контакты</Typography>
                                    </Link>    
                                </Grid>
                                <Grid item>
                                    <SimplePopover openLogin={this.openLogin.bind(this)} />
                                </Grid>
                            </>
                        </Grid>
                    
                        <Hidden lgUp>
                            <Typography variant="h5" component="span" className="thisCity" onClick={this.openCity.bind(this)}><FontAwesomeIcon icon={ faMapMarkerAlt } /> {itemsStore.getCityRU()}</Typography>
                        </Hidden>
                                
                    </Toolbar>
                    
                    {this.state.activePage == 'home' ?
                        <Grid className="scrollCat">
                            <Hidden lgUp>
                                {this.state.testData.map((item, key) => 
                                    <Grid item key={key}>
                                        <div style={{ width: 120, height: 28, marginRight: 12, backgroundColor: '#e5e5e5' }} />    
                                    </Grid>)
                                }
                            </Hidden>
                        </Grid>
                            :
                        null
                    }
                </AppBar>
            )
        }
        
        return (
            <div>
                <AppBar position="fixed" className="header" style={{ zIndex: 2 }}>
                    <Toolbar className="sub_header">
                        
                        <Grid style={{ width: '100%' }}>
                            <Grid item style={{ marginRight: 15 }}>
                                <Link to={"/"+this.state.cityName+"/"} onClick={ () => { window.scrollTo({ top: 0, behavior: 'smooth', }) } }>
                                    <img alt="Жако доставка роллов и пиццы" src="https://jacochef.ru/src/img/Bely_fon_logo.png" />
                                </Link> 
                            </Grid>
                            <Hidden mdDown>
                                
                                <Grid item className="CityProfileNav">
                                    <Typography className="cat" variant="h5" component="span" onClick={this.openCity.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>{this.state.cityNameRu} <ArrowDropDownIcon /></Typography>
                                    
                                    {itemsStore.getToken() ?
                                        itemsStore.getUserName() && itemsStore.getUserName().length > 0 ?
                                            <Link to={"/"+this.state.cityName+"/profile"} className="cat">{itemsStore.getUserName()}</Link> 
                                                :
                                            <Link to={"/"+this.state.cityName+"/profile"}>
                                                <Typography className="cat" variant="h5" component="span">Профиль</Typography>
                                            </Link>
                                            :
                                        <Typography className="cat" variant="h5" component="span" onClick={this.openLogin.bind(this)}>Войти</Typography>
                                    }
                                </Grid>
                                
                                <div style={{ display: 'flex', alignItems: 'baseline', flexDirection: 'row', width: '100%' }}>
                                    {this.state.categoryItemsNew.map((item, key) => 
                                        <Grid item key={key}>
                                            {this.state.activePage == 'home' && !check ?
                                                item.cats.length > 0 ?
                                                    <>
                                                        <Link id={'link_'+item.id} to={"/"+this.state.cityName} className="catLink" style={{ padding: '4px 0.5vw' }} onClick={this.handleClick.bind(this)}>
                                                            <Typography className="cat" variant="h5" component="span">{item.name}</Typography>
                                                        </Link> 
                                                        
                                                        <Menu
                                                            id="simple-menu"
                                                            anchorEl={this.state.anchorEl}
                                                            keepMounted
                                                            open={Boolean(this.state.anchorEl)}
                                                            onClose={this.handleClose.bind(this)}
                                                            
                                                            elevation={2}
                                                            getContentAnchorEl={null}
                                                            anchorOrigin={{
                                                              vertical: 'bottom',
                                                              horizontal: 'center',
                                                            }}
                                                            transformOrigin={{
                                                              vertical: 'top',
                                                              horizontal: 'center',
                                                            }}
                                                        >
                                                            {item.cats.map( (it, k) =>
                                                                <MenuItem key={k} style={{ width: '100%' }}>
                                                                    <ScrollLink 
                                                                        onClick={this.handleClose.bind(this)}
                                                                        to={"cat"+it.id} 
                                                                        spy={true} 
                                                                        isDynamic={true}
                                                                        onSetActive={(el) => { 
                                                                            if( document.querySelector('.activeCat') ){
                                                                                document.querySelector('.activeCat').classList.remove('activeCat');
                                                                            }
                                                                            document.querySelector('#link_'+it.id).classList.add('activeCat');
                                                                        }} 
                                                                        smooth={true} 
                                                                        offset={-60} 
                                                                        activeClass="activeCat" 
                                                                        id={'link_'+it.id} 
                                                                        
                                                                        style={{ width: 'max-content', display: 'flex', whiteSpace: 'nowrap', padding: '4px 0.5vw', width: '100%' }}
                                                                    >
                                                                        <Typography className="cat" variant="h5" component="span">{it.name}</Typography>
                                                                    </ScrollLink>
                                                                </MenuItem>
                                                            )}
                                                        </Menu>
                                                    </>
                                                        :
                                                    <ScrollLink 
                                                        key={key}
                                                        to={"cat"+item.id} 
                                                        spy={true} 
                                                        isDynamic={true}
                                                        onSetActive={(el) => { 
                                                            if( document.querySelector('.activeCat') ){
                                                                document.querySelector('.activeCat').classList.remove('activeCat');
                                                            }
                                                            document.querySelector('#link_'+item.id).classList.add('activeCat');
                                                        }} 
                                                        smooth={true} 
                                                        offset={-60} 
                                                        activeClass="activeCat" 
                                                        id={'link_'+item.id} 
                                                        style={{ width: 'max-content', display: 'flex', whiteSpace: 'nowrap', padding: '4px 0.5vw' }}
                                                    >
                                                        <Typography className="cat" variant="h5" component="span">{item.name}</Typography>
                                                    </ScrollLink>
                                                    :
                                                <Link to={"/"+this.state.cityName} className="catLink" style={{ padding: '4px 0.5vw' }} onClick={() => { typeof window !== 'undefined' ? localStorage.setItem('goTo', item.id) : {} }}>
                                                    <Typography className="cat" variant="h5" component="span">{item.name}</Typography>
                                                </Link> 
                                            }
                                        </Grid>)
                                    }
                                    
                                    
                                    
                                    <Grid item>
                                        <Link 
                                            style={{ padding: '4px 8px' }}
                                            to={"/"+this.state.cityName+"/actii"} 
                                            className={ this.state.activePage == 'actii' ? "catLink activeCat" : "catLink"}
                                        >
                                            <Typography className="cat" variant="h5" component="span">Акции</Typography>
                                        </Link>    
                                    </Grid>
                                    <Grid item>
                                        <Link 
                                            style={{ padding: '4px 8px' }}
                                            to={"/"+this.state.cityName+"/contact"} 
                                            className={ this.state.activePage == 'contact' ? "catLink activeCat" : "catLink"}
                                        >
                                            <Typography className="cat" variant="h5" component="span">Контакты</Typography>
                                        </Link>    
                                    </Grid>
                                
                                </div>
                                
                                <Grid item style={{ marginLeft: 'auto' }}>
                                    <SimplePopover openLogin={this.openLogin.bind(this)} />
                                </Grid>
                            </Hidden>
                        </Grid>
                    
                        <Hidden lgUp>
                            <Typography variant="h5" component="span" className="thisCity" onClick={this.openCity.bind(this)}><FontAwesomeIcon icon={ faMapMarkerAlt } /> {itemsStore.getCityRU()}</Typography>
                        </Hidden>
                                
                    </Toolbar>
                    
                    {this.state.activePage == 'home' ?
                        <Grid className="scrollCat">
                            <Hidden lgUp>
                                {this.state.categoryItems.map((item, key) => 
                                    <ScrollLink 
                                        key={key}
                                        to={"cat"+item.id} 
                                        spy={true} 
                                        onSetActive={(el) => { 
                                            if( document.querySelector('.activeCat') ){
                                                document.querySelector('.activeCat').classList.remove('activeCat');
                                            }
                                            document.querySelector('#link_'+item.id).classList.add('activeCat');
                                            
                                            document.getElementById('link_'+item.id).scrollIntoView(true);
                                            
                                            /*if( document.querySelector('.scrollCat') ){
                                                document.querySelector('.scrollCat').animate({
                                                    scrollLeft: 200
                                                }, 100);
                                            }*/
                                        }} 
                                        smooth={true} 
                                        offset={-60} 
                                        activeClass="activeCat" 
                                        id={'link_'+item.id} 
                                    >
                                        <Typography className="cat" variant="h5" component="span">{item.name}</Typography>
                                    </ScrollLink>    
                                        
                                )}
                            </Hidden>
                        </Grid>
                            :
                        null
                    }
                </AppBar>
                
                <Dialog
                    open={this.state.openCity}
                    fullWidth={true}
                    maxWidth={'xs'}
                    onClose={this.closeCity.bind(this)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    className="ModalCity"
                >
                    <DialogTitle id="alert-dialog-title">Выберите город</DialogTitle>
                    <DialogContent className="ModalContent_1_1" style={{ paddingBottom: 24, paddingTop: 0 }}>
                        {this.state.cityList.map((item, key) => 
                            <Link 
                                key={key} 
                                className={ this.state.cityName == item.link ? 'active' : '' } 
                                to={{ pathname: this.getNewLink(item.link) }} 
                                onClick={() => { setTimeout(()=>{ itemsStore.saveCartData([]); window.location.reload(); }, 300) }}
                            >
                                <Typography variant="h5" component="span" className={"ModalLabel"}>{item.name}</Typography>
                            </Link> 
                        
                            
                        )}
                    </DialogContent>
                </Dialog>
                
                <Dialog
                    open={this.state.openLogin}
                    fullWidth={true}
                    maxWidth={'xs'}
                    onClose={this.closeLogin.bind(this)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    className="ModalAuth"
                >
                    <DialogTitle id="alert-dialog-title">Вход на сайт</DialogTitle>
                    <DialogContent className="ModalContent_1_1">
                        <div className="ModalContent_1_2">
                            <Typography variant="h5" component="span" className="ModalLabel">Номер телефона</Typography>
                            <InputMask 
                                className="InputMask"
                                mask="8 (999) 999-99-99" 
                                placeholder="8 (999) 999-99-99" 
                                disabled={!this.state.stage_1}
                                value={this.state.userLogin}
                                onKeyPress={this.handleKeyPress}
                                onChange={ event => this.state.stage_1 ? this.setState({ userLogin: event.target.value }) : {} }
                            />
                            {this.state.stage_2 ?
                                <Typography variant="h5" component="span" className="changeNumber" onClick={this.changeNumber.bind(this)}>Изменеить номер</Typography>
                                    :
                                null
                            }
                            {this.state.errPhone.length > 0 ?
                                <div style={{ marginTop: 10, padding: 16, backgroundColor: '#BB0025', borderRadius: 4 }}>
                                    <Typography variant="h5" component="span" style={{ fontSize: '1.1rem', color: '#fff' }}>{this.state.errPhone}</Typography>
                                </div>
                                    :
                                null
                            }
                        </div>
                        {this.state.stage_2 ?
                            <div className="ModalContent_1_3">
                                <Typography variant="h5" component="span" className="ModalLabel">Код из смс</Typography>
                                <div className="ModalContent_1_2">
                                    <InputMask 
                                        className="InputMask"
                                        mask="9999" 
                                        value={this.state.userCode}
                                        //onChange={ (event) => { this.changeCode.bind(this, event.target.value) } }
                                        onChange={ this.changeCode.bind(this) }
                                    />
                                    {this.state.timerSMS > 0 ?
                                        <Typography variant="h5" component="span" style={{ fontSize: '0.8rem', paddingTop: 10 }}>{'Новое смс доступно через '+this.state.timerSMS+' сек.'}</Typography>
                                            :
                                        <Typography variant="h5" component="span" style={{ fontSize: '0.8rem', paddingTop: 10, cursor: 'pointer', width: 'fit-content' }} onClick={this.repeatSMS.bind(this)}>Получить новый код</Typography>
                                    }
                                </div>
                                {this.state.errSMS.length > 0 ?
                                    <div style={{ marginTop: 10, padding: 16, backgroundColor: '#BB0025', borderRadius: 4 }}>
                                        <Typography variant="h5" component="span" style={{ fontSize: '1.1rem', color: '#fff' }}>{this.state.errSMS}</Typography>
                                    </div>
                                        :
                                    null
                                }
                            </div>
                                :
                            null
                        }
                    </DialogContent>
                    {this.state.stage_1 ?
                        <DialogActions style={{ padding: '12px 24px' }}>
                            <Button onClick={this.sendSMS.bind(this)} style={{ backgroundColor: '#BB0025', color: '#fff', padding: '6px 30px' }}>Выслать код</Button>
                        </DialogActions>
                            :
                        null
                    }
                    {this.state.stage_2 ?
                        <DialogActions style={{ padding: '12px 24px' }}>
                            <Button onClick={this.checkCode.bind(this)} style={{ backgroundColor: '#BB0025', color: '#fff', padding: '6px 30px' }}>Подтвердить код</Button>
                        </DialogActions>
                            :
                        null
                    }
                </Dialog>
                
                {this.state.activePage == 'home' ?
                    <Hidden lgUp>
                        <div style={{ width: '100%', height: 3, position: 'fixed', top: 85, zIndex: 0, backgroundColor: '#bababa', opacity: 0.1 }} />
                        <div style={{ width: '100%', height: 3, position: 'fixed', top: 88, zIndex: 0, backgroundColor: '#bababa', opacity: 0.09 }} />
                        <div style={{ width: '100%', height: 3, position: 'fixed', top: 91, zIndex: 0, backgroundColor: '#bababa', opacity: 0.08 }} />
                        <div style={{ width: '100%', height: 3, position: 'fixed', top: 94, zIndex: 0, backgroundColor: '#bababa', opacity: 0.07 }} />
                        <div style={{ width: '100%', height: 3, position: 'fixed', top: 97, zIndex: 0, backgroundColor: '#bababa', opacity: 0.06 }} />
                        <div style={{ width: '100%', height: 3, position: 'fixed', top: 100, zIndex: 0, backgroundColor: '#bababa', opacity: 0.05 }} />
                        <div style={{ width: '100%', height: 3, position: 'fixed', top: 103, zIndex: 0, backgroundColor: '#bababa', opacity: 0.04 }} />
                        <div style={{ width: '100%', height: 3, position: 'fixed', top: 106, zIndex: 0, backgroundColor: '#bababa', opacity: 0.03 }} />
                        <div style={{ width: '100%', height: 3, position: 'fixed', top: 109, zIndex: 0, backgroundColor: '#bababa', opacity: 0.02 }} />
                        <div style={{ width: '100%', height: 3, position: 'fixed', top: 112, zIndex: 0, backgroundColor: '#bababa', opacity: 0.01 }} />
                    </Hidden>
                        :
                    null
                }    
                
                <Hidden lgUp>
                    <CustomBottomNavigation login={ this.openLogin.bind(this) } />
                </Hidden>
            </div>
        )
    }
}