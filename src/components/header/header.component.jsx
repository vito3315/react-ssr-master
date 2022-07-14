import React from 'react';
import { NavLink as Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

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
import config from '../../stores/config';

import { MiniActionsCartButton, IconRuble } from '../../stores/elements';

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
                    to={'/'+this_city+'/akcii'}
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
                    to={'/'+this_city+'/contacts'}
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
        
        if( localStorage.getItem('promo_name') && localStorage.getItem('promo_name').length > 0 ){
            this.setState({
                promoName: localStorage.getItem('promo_name')
            })

            setTimeout(() => {
                this.checkPromo();
            }, 300)
        }

        let allItems = itemsStore.getAllItems();
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
        
        console.log( cartItems )

        cartItems.map( (item, key) => {
            let this_item = allItems.find( (it) => parseInt(it.id) == parseInt(item.item_id) );

            cartItems[ key ]['img_new'] = this_item['img_new'];
            cartItems[ key ]['img_new_update'] = this_item['img_new_update'];
            cartItems[ key ]['img_app'] = this_item['img_app'];
        } )

        this.setState({
            cartItems: cartItems
        })
        
        
        autorun(() => {
            if( this._isMounted ){
                let allItems = itemsStore.getAllItems();
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
                
                console.log( newCart )
                
                newCart.map( (item, key) => {
                    let this_item = allItems.find( (it) => parseInt(it.id) == parseInt(item.item_id) );
        
                    newCart[ key ]['img_new'] = this_item['img_new'];
                    newCart[ key ]['img_new_update'] = this_item['img_new_update'];
                    newCart[ key ]['img_app'] = this_item['img_app'];
                } )

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
        fetch(config.urlApi, {
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
                //localStorage.removeItem('promo_name')
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
    
    changePromo(event){
        this.setState({ 
            promoName: event.target.value 
        })
    }

    checkPromoKey(event){
        if( parseInt(event.keyCode) == 13 ){
            this.checkPromo();
        }
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
                    anchorPosition={{ top: 50, right: 50 }}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <div style={{ width: 600, padding: 16 }}>
                        <table className="TableMini">
                            <tbody>
                                {this.state.cartItems.map((item, key) => 
                                    item.type == 'us' ?
                                        <tr key={key} style={{ borderBottom: '1px solid rgba(27, 27, 31, 0.1)', paddingBottom: 5, paddingTop: 5, display: 'block' }}>
                                            <td className="CellPic">

                                                <picture style={{  }}>
                                                    <source 
                                                        srcSet={"https://storage.yandexcloud.net/site-img/"+item.img_new+"600х400.webp?"+item.img_new_update} 
                                                        type="image/webp" 
                                                    />
                                                    <img 
                                                        src={"https://storage.yandexcloud.net/site-img/"+item.img_new+"600х400.jpg?"+item.img_new_update} 
                                                        alt={item.name}
                                                        title={item.name}
                                                        style={{ height: 80, width: 'auto' }}
                                                    />
                                                </picture>  

                                            </td>
                                            <td className="TableMiniName CellName">
                                                <span style={{ height: 60, width: '100%', display: 'flex', alignItems: 'center' }}>{item.name}</span>
                                            </td>
                                            <td className="CellButton">
                                                <MiniActionsCartButton count={item.count} item_id={item.item_id} minus={this.minus.bind(this)} add={this.add.bind(this)} />
                                            </td>
                                            <td className="CellPrice"> 
                                                <div className="TableMiniPrice">
                                                    { new Intl.NumberFormat('ru-RU').format(item.all_price) } 
                                                    <IconRuble style={{ width: 16, height: 16, fill: '#525252', marginLeft: 5 }} />
                                                </div>
                                            </td>
                                        </tr>
                                            :
                                        <tr key={key} style={{ borderBottom: '1px solid rgba(27, 27, 31, 0.1)', paddingBottom: 5, paddingTop: 5, display: 'block' }}>
                                            <td className="CellPic">
                                                <picture>
                                                    <source 
                                                        srcSet={"https://storage.yandexcloud.net/site-img/"+item.img_new+"600х400.webp?"+item.img_new_update} 
                                                        type="image/webp" 
                                                    />
                                                    <img 
                                                        src={"https://storage.yandexcloud.net/site-img/"+item.img_new+"600х400.jpg?"+item.img_new_update} 
                                                        alt={item.name}
                                                        title={item.name}
                                                        style={{ height: 80, width: 'auto' }}
                                                    />
                                                </picture>   
                                            </td>
                                            <td className="TableMiniName CellName">
                                                <span style={{ height: 60, width: '100%', display: 'flex', alignItems: 'center' }}>{item.name}</span>
                                            </td>
                                            <td className="CellButton">
                                                <MiniActionsCartButton count={item.count} item_id={item.item_id} minus={this.minus.bind(this)} add={this.add.bind(this)} />
                                            </td>
                                            <td className="CellPrice"> 
                                                <div className="TableMiniPrice">
                                                    { new Intl.NumberFormat('ru-RU').format(item.all_price) } 
                                                    <IconRuble style={{ width: 16, height: 16, fill: '#525252', marginLeft: 5 }}/>
                                                </div>
                                            </td>
                                        </tr>
                                )}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td>Итого:</td>
                                    <td>
                                        <div>
                                            { itemsStore.getAllPrice() + itemsStore.getSumDiv() } 
                                            <IconRuble style={{ width: 16, height: 16, fill: '#525252', marginLeft: 5 }} />
                                        </div>
                                    </td>
                                </tr>
                            </tfoot>      
                        </table>
                        <div className="SpacePromoRoot">
                            <Paper component="div" className="SpacePromo" elevation={0}>
                                <InputBase
                                    onBlur={this.checkPromo.bind(this)}
                                    value={this.state.promoName}
                                    onKeyDown={this.checkPromoKey.bind(this)}
                                    onChange={this.changePromo.bind(this)}
                                    placeholder="Есть промокод"
                                />
                                {this.state.promoText.length > 0 ?
                                    <div className={ this.state.promoST === true ? 'promoIndicator true' : 'promoIndicator false'} />
                                        :
                                    null
                                }
                            </Paper>
                            {this.state.promoText.length > 0 && this.state.promoST === false ?
                                <div className="DescPromo">
                                    <Typography className="cat" variant="h5" component="span">{this.state.promoText}</Typography>
                                </div>
                                    :
                                null
                            }
                        </div>
                        <div className="InCart">
                            {itemsStore.getToken() !== null ?
                                <Link
                                    to={'/'+itemsStore.getCity()+'/cart'}
                                    exact={ true }
                                    style={{ textDecoration: 'none' }}
                                    onClick={this.handleClose.bind(this)}
                                >
                                    <ButtonGroup disableElevation={true} disableRipple={true} variant="contained">
                                        <Button variant="contained" className="BtnCardMain CardInCardItem">Оформить заказ</Button>
                                    </ButtonGroup>
                                </Link>
                                    :
                                <ButtonGroup disableElevation={true} disableRipple={true} variant="contained">
                                    <Button variant="contained" className="BtnCardMain CardInCardItem" onClick={this.props.openLogin}>Оформить заказ</Button>
                                </ButtonGroup>
                            }
                        </div>
                    </div>
                </Popover>
            </div>
        );
    }
}

export class HeaderCat extends React.Component {
    render(){
        return (
            <Header data={this.props.data} city={this.props.city} this_link={this.props.this_link} />
        )
    }
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            {children}
          </Box>
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
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

export class Header extends React.Component {
    is_load = false;
    
    sms1 = false;
    sms2 = false;
    
    constructor(props) {
        super(props);
        
        if( this.props && this.props.data ){
            this.is_load = true;
            itemsStore.setDops(this.props.data.all.other.cats.need_dop);
            itemsStore.setAllItems(this.props.data.all.other.cats.all_items);
            itemsStore.setAllItemsCat(this.props.data.all.other.cats.arr);
            itemsStore.setAllItemsCatNew(this.props.data.all.other.cats.main_cat);
            itemsStore.setFreeItems(this.props.data.all.other.cats.free_items);
            itemsStore.setBanners(this.props.data.all.other.cats.baners)
            itemsStore.setCityRU(this.props.data.all.other.cats.this_city_name_ru);
            itemsStore.setCity(this.props.city)
        }
        
        this.state = {      
            this_link: this.props.this_link ? this.props.this_link : '',
            categoryItemsNew: this.props.data ? this.props.data.all.other.cats.main_cat : [],
            
            categoryItems: this.props.data ? this.props.data.all.other.cats.arr : [],
            cartItems: [],
            activePage: '',
            is_load: false,
            is_load_new: false,
            openCity: false,
            cityName: this.props.city ? this.props.city : '',
            testData: [1, 2, 3, 4],
            cityList: this.props.data ? this.props.data.all.other.cats.city_list : [],
            
            openLoginNew: false,
            pwd: '',
            ResPWD: false,
            NeedCode: false,
            typeLogin: 0,

            openLogin: false,
            userLogin: '',
            userLoginFormat: '',
            userCode: '',
            
            stage_1: true,
            stage_2: false,
            
            timerSMS: 89,
            errPhone: '',
            errSMS: '',
            userName: '',
            token: '',
            
            soc_link: null,
            
            anchorEl: null,
            cityNameRu: this.props.data ? this.props.data.all.other.cats.this_city_name_ru && this.props.data.all.other.cats.this_city_name_ru.length > 0 ? this.props.data.all.other.cats.this_city_name_ru : 'Город' : 'Город'
        };
    }
    
    componentDidMount = () => {
        setTimeout(() => {

            let userName = itemsStore.getUserName();
            let token = itemsStore.getToken();

            this.setState({
                token: !localStorage.getItem('token') || localStorage.getItem('token').length == 0 ? '' : localStorage.getItem('token')
            })

            if( token && token.length == 0 && localStorage.getItem('token') && localStorage.getItem('token').length > 0 ){
                this.setToken( localStorage.getItem('token'), '' ); 
                
                /*fetch(config.urlApi, {
                    method: 'POST',
                    headers: {
                        'Content-Type':'application/x-www-form-urlencoded'},
                    body: queryString.stringify({
                        type: 'get_user_data', 
                        user_id: localStorage.getItem('token')
                    })
                }).then(res => res.json()).then(json => {

                    itemsStore.setToken( localStorage.getItem('token'), json ); 
                    itemsStore.setUserName(json);

                    this.is_load = false;

                    this.setState({
                        userName: json,
                        token: localStorage.getItem('token')
                    })
                })
                .catch(err => { });*/
            }

            /*if( !userName || userName.length == 0 ){
                fetch(config.urlApi, {
                    method: 'POST',
                    headers: {
                        'Content-Type':'application/x-www-form-urlencoded'},
                    body: queryString.stringify({
                        type: 'get_user_data', 
                        user_id: itemsStore.getToken()
                    })
                }).then(res => res.json()).then(json => {
                    itemsStore.setUserName(json);
                    this.is_load = false;

                    this.setState({
                        userName: json
                    })
                })
                .catch(err => { });


                
            }*/

            if( userName.length > 0 ){
                itemsStore.setUserName(userName);
                this.setState({
                    userName: userName
                })
            } 
            

            


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
            
            this.load();
        }, 300)
        
        autorun(() => {
            this.setState({
                activePage: itemsStore.getPage()
            })
            
            this.setState({
                token: !localStorage.getItem('token') || localStorage.getItem('token').length == 0 ? '' : localStorage.getItem('token')
            })

            if( itemsStore.getCity() !== this.state.cityName ){
                this.setState({
                    cityName: itemsStore.getCity()
                })
                
                this.load();
            }
            
            let user_name = itemsStore.getUserName();

            if( !user_name || user_name.length == 0 ){

            }else{
                this.setState({
                    userName: user_name
                })
            }
            
        })
    }
    
    load(){
        //if( !this.is_load ){
        //    this.is_load = true;
            
            if( itemsStore.getCity() ){
                fetch(config.urlApi, {
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
                    
                    itemsStore.setDops(json.need_dop);
                    itemsStore.setAllItems(json.all_items);
                    itemsStore.setAllItemsCat(json.arr);
                    itemsStore.setAllItemsCatNew(json.main_cat);
                    itemsStore.setFreeItems(json.free_items);
                    itemsStore.setBanners(json.baners)
                    itemsStore.setCityRU(json.this_city_name_ru);
                    
                    this.setState({
                        cityList: json.city_list,
                        categoryItems: json.arr, 
                        categoryItemsNew: json.main_cat,
                        is_load: true,
                        cityNameRu: json.this_city_name_ru,
                        userName: json.user_name
                    });
                    this.is_load = false
                })
                .catch(err => { });
        //    }else{
        //        this.is_load = false;
            }
        //}
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

    getNewLink(city){
        let this_addr = window.location.pathname;
        return this_addr.replace(this.state.cityName, city);
    }

    openLogin(){
        if( localStorage.getItem('token') && localStorage.getItem('token').length > 0 ){
            fetch(config.urlApi, {
                method: 'POST',
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded'},
                body: queryString.stringify({
                    type: 'get_user_data', 
                    user_id: localStorage.getItem('token')
                })
            }).then(res => res.json()).then(json => {
                itemsStore.setToken( localStorage.getItem('token'), json ); 
                itemsStore.setUserName(json);

                this.is_load = false;

                this.setState({
                    userName: json,
                    token: localStorage.getItem('token')
                })

                if (typeof window !== 'undefined') {
                    window.location.pathname = '/'+this.state.cityName+'/profile';
                }
            })
            .catch(err => { });
        }else{
            this.setState({
                openLoginNew: true
                //openLogin: true
            })
        }
    }
    
    closeLogin(){
        this.setState({
            openLogin: false,
            openLoginNew: false,
            ResPWD: false,
            NeedCode: false,
            userLogin: '',
            userLoginFormat: '',
            userCode: '',
            pwd: ''
        })
    }
    
    logIn(){
        let number = this.state.userLogin;
            
        number = number.split(' ').join('');
        number = number.split('(').join('');
        number = number.split(')').join('');
        number = number.split('-').join('');
        number = number.split('_').join('');
        
        number = number.slice(1);

        fetch(config.urlApi, {
            method: 'POST',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'},
            body: queryString.stringify({
                type: 'site_login',
                number: number,
                pwd: this.state.pwd 
            })
        }).then(res => res.json()).then(json => {
            if( json.st === false ){
                this.setState({
                    errPhone: json.text
                });
            }else{
                itemsStore.setToken( json.token, json.name ); 
                itemsStore.setUserName(json.name);

                this.is_load = false;

                this.setState({
                    userName: json.name,
                    token: json.token
                })

                this.closeLogin();

                //if (typeof window !== 'undefined') {
                //    window.location.pathname = '/'+this.state.cityName+'/profile';
                //}
            }

            
        })
        .catch(err => { });
    }

    sendSMS(){
        if( this.sms1 == false ){
            this.sms1 = true;
            
            this.setState({
                stage_1: false,
                stage_2: true, 
                errPhone: '',
                errSMS: ''
            });
            
            let number = this.state.userLogin;
            
            number = number.split(' ').join('');
            number = number.split('(').join('');
            number = number.split(')').join('');
            number = number.split('-').join('');
            number = number.split('_').join('');
            
            number = number.slice(1);
            
            this.setState({
                userLoginFormat: number
            })
            
            grecaptcha.ready(() => {
                grecaptcha.execute('6LdhWpIdAAAAAA4eceqTfNH242EGuIleuWAGQ2su', {action: 'submit'}).then( (token) => {
                    fetch(config.urlApi, {
                        method: 'POST',
                        headers: {
                            'Content-Type':'application/x-www-form-urlencoded'},
                        body: queryString.stringify({
                            type: 'create_profile', 
                            number: number,
                            token: token 
                        })
                    }).then(res => res.json()).then(json => {
                        if( json['st'] ){
                            this.setState({ 
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
                        
                        setTimeout( () => {
                            this.sms1 = false;
                        }, 300 )
                    });
                });
            });
            
        }
    }
    
    repeatSMS(){
        if( this.sms2 === false ){
            this.sms2 = true;
            
            this.setState({
                errSMS: '',
                is_load_new: true
            });
            
            grecaptcha.ready(() => {
                grecaptcha.execute('6LdhWpIdAAAAAA4eceqTfNH242EGuIleuWAGQ2su', {action: 'submit'}).then( (token) => {
                    fetch(config.urlApi, {
                        method: 'POST',
                        headers: {
                            'Content-Type':'application/x-www-form-urlencoded'},
                        body: queryString.stringify({
                            type: 'repeat_sms', 
                            number: this.state.userLoginFormat,
                            token: token
                        })
                    }).then(res => res.json()).then(json => {
                        this.sms2 = false;
                        
                        if( json['st'] ){
                            this.setState({
                                timerSMS: 89
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

                        setTimeout( () => {
                            this.setState({
                                is_load_new: false
                            });
                        }, 300 )
                        
                    });
                });
            });
        }
    }
    
    checkCode(){
        this.setState({
            errSMS: ''
        });
        
        fetch(config.urlApi, {
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

    changeCodeNew(code){
        code = code.target.value
        
        this.setState({
            userCode: code
        })
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
    
    LoginBySMS(){
        this.setState({
            openLoginNew: false,
            openLogin: true,
            errPhone: '', 
            errSMS: ''
        })

        this.is_load = false;
    
        this.sms1 = false;
        this.sms2 = false;
    }

    ResPWD(){
        this.setState({
            ResPWD: true,
            NeedCode: false
        })
    }

    sendsmsrp(){
        if( this.sms1 == false ){
            this.sms1 = true;
            
            this.setState({
                //stage_1: false,
                //stage_2: true, 
                errPhone: '',
                errSMS: '',
                is_load_new: true
            });
            
            let number = this.state.userLogin;
            
            number = number.split(' ').join('');
            number = number.split('(').join('');
            number = number.split(')').join('');
            number = number.split('-').join('');
            number = number.split('_').join('');
            
            number = number.slice(1);
            
            this.setState({
                userLoginFormat: number
            })
            
            grecaptcha.ready(() => {
                grecaptcha.execute('6LdhWpIdAAAAAA4eceqTfNH242EGuIleuWAGQ2su', {action: 'submit'}).then( (token) => {
                    fetch(config.urlApi, {
                        method: 'POST',
                        headers: {
                            'Content-Type':'application/x-www-form-urlencoded'},
                        body: queryString.stringify({
                            type: 'sendsmsrp', 
                            number: number,
                            pwd: this.state.pwd,
                            token: token 
                        })
                    }).then(res => res.json()).then(json => {
                        if( json['st'] ){
                            this.setState({ 
                                errPhone: '',
                                NeedCode: true,
                                errPhone: '', 
                                errSMS: ''
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
                        
                        setTimeout( () => {
                            this.sms1 = false;
                            this.setState({
                                is_load_new: false
                            })
                        }, 300 )
                    });
                });
            });
            
        }
    }

    checkcoderp(){
        fetch(config.urlApi, {
            method: 'POST',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'},
            body: queryString.stringify({
                type: 'checkcoderp', 
                number: this.state.userLoginFormat,
                code: this.state.userCode
            })
        }).then(res => res.json()).then(json => {
            if( json['st'] ){
                this.setState({ 
                    errPhone: '',
                    NeedCode: true
                })
            
                itemsStore.setToken( json.token, json.name ); 
                itemsStore.setUserName(json.name);

                this.is_load = false;

                this.setState({
                    userName: json.name,
                    token: json.token,
                    errPhone: '', 
                    errSMS: ''
                })

                this.closeLogin();

                //if (typeof window !== 'undefined') {
                //    window.location.pathname = '/'+this.state.cityName+'/profile';
                //}
            }else{
                this.setState({
                  errPhone: json.text
                });
            }
            
            setTimeout( () => {
                this.sms1 = false;
            }, 300 )
        });
    }

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
        
        if( typeof window !== 'undefined' ){
            let location = window.location.href;
            
            if( this.state.this_link != location ){
                
                link = location;
                link = link.split('/');
                mainLink = '';
                
                check = link.find( (item) => item == 'menu');
                
                if( check && check.length > 0 ){
                    let check2 = link.find( (item) => item == 'item');
                    
                    if( !check2 ){
                        let index = link.findIndex( (item) => item == 'menu');
                        mainLink = link[ index+1 ];
                    }
                }
            }
        }
        
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
                                        to={"/"+this.state.cityName+"/akcii"} 
                                        className={ this.state.activePage == 'actii' ? "catLink activeCat" : "catLink"}
                                    >
                                        <Typography className="cat" variant="h5" component="span">Акции</Typography>
                                    </Link>    
                                </Grid>
                                <Grid item>
                                    <Link 
                                        style={{ padding: '4px 8px' }}
                                        to={"/"+this.state.cityName+"/contacts"} 
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
                    
                        <Hidden mdUp>
                            <Typography variant="h5" component="span" className="thisCity" onClick={this.openCity.bind(this)}><FontAwesomeIcon icon={ faMapMarkerAlt } /> {itemsStore.getCityRU()}</Typography>
                        </Hidden>
                                
                    </Toolbar>
                    
                    {this.state.activePage == 'home' ?
                        <Grid className="scrollCat">
                            <Hidden mdUp>
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
                                <Link to={"/"+this.state.cityName} onClick={ () => { window.scrollTo({ top: 0, behavior: 'smooth', }) } }>
                                    <img alt="Жако доставка роллов и пиццы" src="https://jacochef.ru/src/img/Bely_fon_logo.png" />
                                </Link> 
                            </Grid>
                            <Hidden smDown>
                                
                                <Grid item className="CityProfileNav">
                                    <Typography className="cat" variant="h5" component="span" onClick={this.openCity.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>{this.state.cityNameRu} <ArrowDropDownIcon /></Typography>
                                    
                                    {this.state.token.length > 0 ?
                                        this.state.userName.length > 0 ?
                                            <Link to={"/"+this.state.cityName+"/profile"} className="cat">{this.state.userName}</Link> 
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
                                                        <Link id={'link_'+item.id} name={item.main_link} to={"/"+this.state.cityName} className="catLink" style={{ padding: '4px 0.5vw' }} onClick={this.handleClick.bind(this)}>
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
                                                                        /*onSetActive={(el) => { 
                                                                            if( document.querySelector('.activeCat') ){
                                                                                document.querySelector('.activeCat').classList.remove('activeCat');
                                                                            }
                                                                            document.querySelector('#link_'+it.id).classList.add('activeCat');
                                                                        }}*/
                                                                        smooth={true} 
                                                                        offset={-60} 
                                                                        activeClass="activeCat" 
                                                                        //id={'link_'+it.id} 
                                                                        
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
                                                        name={item.main_link}
                                                        style={{ width: 'max-content', display: 'flex', whiteSpace: 'nowrap', padding: '4px 0.5vw' }}
                                                    >
                                                        <Typography className="cat" variant="h5" component="span">{item.name}</Typography>
                                                    </ScrollLink>
                                                    :
                                                <Link to={"/"+this.state.cityName} name={item.main_link} className="catLink" style={{ padding: '4px 0.5vw' }} onClick={() => { typeof window !== 'undefined' ? localStorage.setItem('goTo', item.id) : {} }}>
                                                    <Typography className="cat" variant="h5" component="span">{item.name}</Typography>
                                                </Link> 
                                            }
                                        </Grid>)
                                    }
                                    
                                    
                                    
                                    <Grid item>
                                        <Link 
                                            style={{ padding: '4px 8px' }}
                                            to={"/"+this.state.cityName+"/akcii"} 
                                            className={ this.state.activePage == 'actii' ? "catLink activeCat" : "catLink"}
                                        >
                                            <Typography className="cat" variant="h5" component="span">Акции</Typography>
                                        </Link>    
                                    </Grid>
                                    <Grid item>
                                        <Link 
                                            style={{ padding: '4px 8px' }}
                                            to={"/"+this.state.cityName+"/contacts"} 
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
                    
                        <Hidden mdUp>
                            <Typography variant="h5" component="span" className="thisCity" onClick={this.openCity.bind(this)}><FontAwesomeIcon icon={ faMapMarkerAlt } /> {itemsStore.getCityRU()}</Typography>
                        </Hidden>
                                
                    </Toolbar>
                    
                    {this.state.activePage == 'home' ?
                        <Grid className="scrollCat mobile">
                            <Hidden mdUp>
                                {this.state.categoryItems.map((item, key) => 
                                    check && check.length > 0 ?
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
                                            offset={-100} 
                                            activeClass="activeCat" 
                                            id={'link_'+item.id} 
                                            name={item.main_link}
                                            style={{ padding: '3px 5px' }}
                                        >
                                            <Link to={"/"+this.state.cityName} style={{ padding: '3px 5px' }} className="catLink" onClick={() => { typeof window !== 'undefined' ? localStorage.setItem('goTo', item.id) : {} }}>
                                                <Typography className="cat" variant="h5" component="span">{item.name}</Typography>
                                            </Link>
                                        </ScrollLink>  
                                            :                                        
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
                                            offset={-100} 
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
                                //onKeyPress={this.handleKeyPress}
                                onChange={ event => this.state.stage_1 ? this.setState({ userLogin: event.target.value }) : {} }
                            />
                            {this.state.stage_2 ?
                                <Typography variant="h5" component="span" className="changeNumber" onClick={this.changeNumber.bind(this)}>Изменить номер</Typography>
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




                <Dialog
                    open={this.state.openLoginNew}
                    fullWidth={true}
                    maxWidth={'xs'}
                    onClose={this.closeLogin.bind(this)}
                    className="ModalAuth"
                >
                    <DialogTitle style={{ display: 'none' }}>{this.state.ResPWD === false ? 'Авторизация' : 'Восстановление пароля'}</DialogTitle>
                    <DialogContent className="ModalContent_1_1 newContent">

                        <Backdrop open={this.state.is_load_new} style={{ zIndex: 999, color: '#fff' }}>
                            <CircularProgress color="inherit" />
                        </Backdrop>

                        <Tabs
                            value={this.state.typeLogin}
                            onChange={ (event, value) => { this.setState({ typeLogin: value, ResPWD: value == 0 ? false : true, errPhone: '', errSMS: '' }) } }
                            indicatorColor="primary"
                            //textColor="primary"
                            variant="fullWidth"
                            style={{ backgroundColor: '#fff', color: '#000', marginBottom: 20 }}
                        >
                            <Tab style={{ color: '#000' }} label="Вход" {...a11yProps(0)} />
                            <Tab style={{ color: '#000' }} label="Регистрация" {...a11yProps(1)} />
                        </Tabs>

                        <div className="ModalContent_1_2">
                            { this.state.ResPWD === false ?
                                <>
                                    <Typography variant="h5" component="span" className="ModalLabel">Номер телефона</Typography>
                                    <InputMask 
                                        className="InputMask"
                                        mask="8 (999) 999-99-99" 
                                        placeholder="8 (999) 999-99-99" 
                                        disabled={!this.state.stage_1}
                                        value={this.state.userLogin}
                                        //onKeyPress={this.handleKeyPress}
                                        onChange={ event => this.state.stage_1 ? this.setState({ userLogin: event.target.value }) : {} }
                                    />
                                    <Typography variant="h5" component="span" className="ModalLabel" style={{ marginTop: 20 }}>Пароль</Typography>
                                    <TextField 
                                        size="small"
                                        variant="outlined" 
                                        type="password"
                                        value={this.state.pwd} 
                                        disabled={!this.state.stage_1}
                                        onChange={ event => this.setState({ pwd: event.target.value }) }
                                    />
                                    <Typography variant="h5" component="span" className="changeNumberGray" onClick={this.LoginBySMS.bind(this)}>Войти по смс</Typography>
                                    
                                </>
                                    :
                                <>
                                    { this.state.ResPWD === true && this.state.NeedCode === false ?
                                        <>
                                            <Typography variant="h5" component="span" className="ModalLabel">Номер телефона</Typography>
                                            <InputMask 
                                                className="InputMask"
                                                mask="8 (999) 999-99-99" 
                                                placeholder="8 (999) 999-99-99" 
                                                disabled={!this.state.stage_1}
                                                value={this.state.userLogin}
                                                //onKeyPress={this.handleKeyPress}
                                                onChange={ event => this.state.stage_1 ? this.setState({ userLogin: event.target.value }) : {} }
                                            />

                                            <Typography variant="h5" component="span" className="ModalLabel" style={{ marginTop: 20 }}>{ this.state.typeLogin == 0 ? 'Новый пароль' : 'Придумайте пароль' }</Typography>
                                            <TextField 
                                                size="small"
                                                variant="outlined" 
                                                type="password"
                                                value={this.state.pwd} 
                                                disabled={!this.state.stage_1}
                                                onChange={ event => this.setState({ pwd: event.target.value }) }
                                            />
                                        </>
                                            :
                                        <div className="ModalContent_1_3">
                                            <Typography variant="h5" component="span" className="ModalLabel">Номер телефона</Typography>
                                            <InputMask 
                                                className="InputMask"
                                                mask="8 (999) 999-99-99" 
                                                placeholder="8 (999) 999-99-99" 
                                                disabled={true}
                                                value={this.state.userLogin}
                                            />

                                            <div className="ModalContent_1_2">
                                                <Typography variant="h5" component="span" className="ModalLabel" style={{ marginTop: 20 }}>Код из смс</Typography>
                                                <InputMask 
                                                    className="InputMask"
                                                    mask="9999" 
                                                    value={this.state.userCode}
                                                    onChange={ this.changeCodeNew.bind(this) }
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
                                        
                                    }
                                </>
                            }
                            {this.state.errPhone.length > 0 ?
                                <div style={{ marginTop: 10, padding: 16, backgroundColor: '#BB0025', borderRadius: 4 }}>
                                    <Typography variant="h5" component="span" style={{ fontSize: '1.1rem', color: '#fff' }}>{this.state.errPhone}</Typography>
                                </div>
                                    :
                                null
                            }
                        </div>
                        
                    </DialogContent>
                    <DialogActions style={{ padding: '12px 24px' }}>
                        { this.state.ResPWD === false ?
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', width: '100%', justifyContent: 'space-between' }}>
                                <Typography variant="h5" component="span" className="changeNumber" onClick={this.ResPWD.bind(this)}>Восстановить пароль</Typography>

                                <Button onClick={this.logIn.bind(this)} style={{ backgroundColor: '#BB0025', color: '#fff', padding: '6px 30px' }}>Войти</Button>
                            </div>

                            
                                :
                                this.state.NeedCode === false ?
                                    <Button onClick={this.sendsmsrp.bind(this)} style={{ backgroundColor: '#BB0025', color: '#fff', padding: '6px 30px' }}>Подтвердить номер</Button>
                                        :
                                    <Button onClick={this.checkcoderp.bind(this)} style={{ backgroundColor: '#BB0025', color: '#fff', padding: '6px 30px' }}>Авторизоваться</Button>
                        }
                    </DialogActions>
                </Dialog>
                



                {this.state.activePage == 'home' ?
                    <Hidden mdUp>
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
                
                <Hidden mdUp>
                    <CustomBottomNavigation login={ this.openLogin.bind(this) } />
                </Hidden>
            </div>
        )
    }
}