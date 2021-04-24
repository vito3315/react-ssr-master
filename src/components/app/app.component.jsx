import React from 'react';
import { NavLink as Link, Switch, Route, useParams, Redirect, StaticRouter } from 'react-router-dom';

import { Home } from '../home';
import { Item } from '../item';
import { Contact } from '../contact';
import { Actii } from '../actii';
import { Profile } from '../profile';


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

import { makeStyles } from '@material-ui/core/styles';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import RestaurantMenuSharpIcon from '@material-ui/icons/RestaurantMenuSharp';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import PersonIcon from '@material-ui/icons/Person';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import Hidden from '@material-ui/core/Hidden';

import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import Popover from '@material-ui/core/Popover';
import * as Scroll from 'react-scroll';
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

var scroller = Scroll.scroller;

const queryString = require('query-string');

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import TextField from '@material-ui/core/TextField';

import InputMask from "react-input-mask";

import Badge from '@material-ui/core/Badge';

import { Provider } from 'mobx-react';
import { useStrict } from 'mobx';

import itemsStore from '../../stores/items-store';
const stores = { itemsStore };

import { trace, autorun, observable, mobx } from "mobx"

var cart = {
    allItems: []
}

class CustomBottomNavigation extends React.Component{
    render(){
        return(
            <div
                style={{ position: 'fixed', bottom: 0, width: '100%', height: 45, display: 'flex', justifyContent: 'center', backgroundColor: '#fff' }}
            >
                <Link
                    to={'/'+itemsStore.getCity()+'/'}
                    exact={ true }
                    className="MuiButtonBase-root MuiBottomNavigationAction-root"
                    style={{ flex: 1 }}
                >
                    <RestaurantMenuSharpIcon style={{ fontSize: '1.7rem', fill: itemsStore.getPage() == 'home' ? 'black' : 'gray' }} />
                </Link>
                <Link
                    to={'/'+itemsStore.getCity()+'/actii'}
                    exact={ true }
                    className="MuiButtonBase-root MuiBottomNavigationAction-root"
                    style={{ flex: 1 }}
                >
                    <CardGiftcardIcon style={{ fontSize: '1.7rem', fill: itemsStore.getPage() == 'actii' ? 'black' : 'gray' }} />
                </Link>
                <Link
                    to={'/'+itemsStore.getCity()+'/'}
                    exact={ true }
                    className="MuiButtonBase-root MuiBottomNavigationAction-root"
                    style={{ flex: 1 }}
                >
                    <Badge badgeContent={itemsStore.getAllPrice()} max={500000} color="primary">
                        <ShoppingCartOutlinedIcon style={{ fontSize: '1.7rem', fill: itemsStore.getPage() == 'cart' ? 'black' : 'gray' }} />
                    </Badge>
                </Link>
                <Link
                    to={'/'+itemsStore.getCity()+'/contact'}
                    exact={ true }
                    className="MuiButtonBase-root MuiBottomNavigationAction-root"
                    style={{ flex: 1 }}
                >
                    <LocationOnIcon style={{ fontSize: '1.7rem', fill: itemsStore.getPage() == 'contact' ? 'black' : 'gray' }} />
                </Link>
                {itemsStore.getToken() ?
                    <Link
                        to={'/'+itemsStore.getCity()+'/profile'}
                        exact={ true }
                        className="MuiButtonBase-root MuiBottomNavigationAction-root"
                        style={{ flex: 1 }}
                    >
                        <PersonIcon style={{ fontSize: '1.7rem', fill: itemsStore.getPage() == 'profile' ? 'black' : 'gray' }} />
                    </Link>
                        :
                    <Typography 
                        className="MuiButtonBase-root MuiBottomNavigationAction-root" 
                        style={{ flex: 1 }} 
                        onClick={this.props.login}>
                            <PersonIcon style={{ fontSize: '1.7rem', fill: itemsStore.getPage() == 'profile' ? 'black' : 'gray' }} />
                    </Typography>
                }
            </div>
        )
    }
}

function Status({ code, children }) {
  return (
    <Route
      render={({ staticContext }) => {
        if (staticContext) staticContext.status = code;
        return children;
      }}
    />
  );
}

export function NotFound() {
  return (
    <Status code={404}>
        <Grid container className="Contact mainContainer MuiGrid-spacing-xs-3" style={{ marginTop: 64 }}>
            <Grid item xs={12}>
                <Typography variant="h5" component="h1">404 Страница не найдена</Typography>
            </Grid>
            
        </Grid>
    </Status>
  );
}

function StickyFooter() {
    return (
        <footer className="footer">
            <Grid container className="mainContainer">
                <Grid item lg={3} md={3} sm={3} xl={3} xs={12}>
                    <Typography variant="body1">Жако роллы и пицца — сеть кафе</Typography>
                    <Typography variant="body1">© Жако 2017 - {new Date().getFullYear()}</Typography>
                </Grid>
                <Grid item lg={3} md={3} sm={3} xl={3} xs={12}>
                    <Typography variant="body1">О Компании</Typography>
                    <Typography variant="body1">Вакансии</Typography>
                    <Typography variant="body1">Публичная оферта</Typography>
                </Grid>
                <Grid item lg={3} md={3} sm={3} xl={3} xs={12}>
                    <Typography variant="body1">Политика конфиденциальности</Typography>
                    <Typography variant="body1">Доставка и контакты</Typography>
                    <Typography variant="body1">Правила оплаты товаров</Typography>
                </Grid>
                <Grid item lg={3} md={3} sm={3} xl={3} xs={12} className="socIcons">
                    <InstagramIcon fontSize="small" />
                    <InstagramIcon fontSize="small" />
                    <FacebookIcon fontSize="small" />
                    <FacebookIcon fontSize="small" />
                </Grid>
            </Grid>
        </footer>
    );
}

class SimplePopover extends React.Component{
    constructor(props) {
        super(props);
        
        this.state = {      
            anchorEl: null,
            cartItems: [],
            allPrice: 0,
            promoName: '',
            promoText: '',
        };
    }
    
    componentDidMount = () => {
        let cartItems = itemsStore.getItems();
        
        if( cartItems.length > 0 ){
            this.setState({
                cartItems: cartItems
            })
        }
        
        autorun(() => {
            let cartItems = itemsStore.getItems();
            this.setState({
                cartItems: cartItems
            })
        })
    }
    
    add=(id)=>{
        let count = itemsStore.AddItem(id);
    }
    
    minus(id){
        let count = itemsStore.MinusItem(id);
    }
    
    handleClick = (event) => {
        this.setState({
            anchorEl: event.currentTarget
        })
    }

    handleClose = () => {
        this.setState({
            anchorEl: null
        })
    }
    
    checkPromo(){
        let promoName = this.state.promoName;
    
        if( promoName == '' ){
          /*storage.save({
            key: 'promoName',
            data: '',
            expires: 1000 * 3600 * 24 * parseInt( cart.days_cart )
          });*/
          
          //cart.promo_info = null;
          //cart.cart_new_promo = [];
          
          /*let allPrice = 0;
          
          cart.cart_new.forEach( (el_cart, key_cart) => {
            allPrice += parseInt(el_cart.one_price) * parseInt(el_cart.count);
            cart.cart_new[ key_cart ].all_price = parseInt(el_cart.one_price) * parseInt(el_cart.count);
          })*/
          
          //allPrice += parseInt(cart.summ_div);
          
          //BadgePrice.set('price', allPrice);
        }else{
            let point_id = 0;
          //let type_order = cart.typeOrder;
            let type_order = 1;
          
            if( type_order == 0 ){
            //point_id = cart.point_id_dev ?? 0;
                point_id = 1;
            }else{
                point_id = 1;
            //point_id = cart.point_id_pic ?? 0;
            }
          
            fetch('https://jacofood.ru/src/php/test_app.php', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded'},
                body: queryString.stringify({
                    type: 'get_promo', 
                    point_id: point_id,
                    city_id: itemsStore.getCity(),
                    promo_name: promoName
                })
            }).then(res => res.json()).then(json => {
                itemsStore.setPromo( JSON.stringify(json) );
                let check_promo = itemsStore.checkPromo();
              
                this.setState({
                    promoText: check_promo.text
                })
              
            /*cart.promo_info = json;
            
            this.setState({ textPromoStatus: json.status_promo })
            
            if( json.status_promo ){
              let res_promo = cart.check_promo();
              
              if( res_promo.st ){
                this.setState({ textPromoStatus: true })
                this.setState({ textPromoText: json.promo_text.true })
                
                storage.save({
                  key: 'promoName',
                  data: promoName,
                  expires: 1000 * 3600 * 24 * parseInt( cart.days_cart )
                });
              }else{
                this.setState({ textPromoStatus: false })
                this.setState({ textPromoText: json.promo_text.false })
                
                storage.save({
                  key: 'promoName',
                  data: '',
                  expires: 1000 * 3600 * 24 * parseInt( cart.days_cart )
                });
              }
            }else{
              this.setState({ textPromoText: json.promo_text.false })
              
              let res_promo = cart.check_promo();
            }
            
            this.setState({ textPromoShow: true })*/
            });
        }
    }
    
    render(){
        const open = Boolean(this.state.anchorEl);
        const id = open ? 'simple-popover' : undefined;
        return(
            <div>
                <IconButton className="ShopIconBTN" aria-describedby={id} color="inherit" aria-label="menu" onClick={this.handleClick.bind(this)}>
                    <Badge badgeContent={itemsStore.getAllPrice()} max={500000} color="primary">
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
                                    <tr key={key}>
                                        <td className="TableMiniName">{item.name}</td>
                                        <td>
                                            <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="BtnBorderWOBorder">
                                                <Button variant="contained" className="BtnCardMain" onClick={this.minus.bind(this, item.item_id)}>
                                                    <RemoveIcon fontSize="small" />
                                                </Button>
                                                <Button variant="contained" className="BtnCardMain" >
                                                    <Typography component="span" className="CardCountItem">{item.count}</Typography>
                                                </Button>
                                                <Button variant="contained" className="BtnCardMain" onClick={this.add.bind(this, item.item_id)}> 
                                                    <AddIcon fontSize="small" />
                                                </Button>
                                            </ButtonGroup>
                                        </td>
                                        <td style={{ width: '30%' }}> 
                                            <div className="TableMiniPrice">
                                                {item.all_price} <AttachMoneyIcon fontSize="small" />
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                            <tfoot>
                                <tr style={{height: 35}}>
                                    <td className="TableMiniFullName">Сумма:</td>
                                    <td className="" style={{width: '30%', textAlign: 'center'}}>
                                        <div className="TableMiniPrice" style={{ marginRight: 21 }}>
                                            {itemsStore.getAllPrice()} <AttachMoneyIcon fontSize="small" />
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
                                <Typography className="cat" variant="h5" component="span">Промокод дает: {this.state.promoText}</Typography>
                            </div>
                                :
                            null
                        }
                        <div className="InCart">
                            {itemsStore.getToken() !== null ?
                                <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="BtnBorder">
                                    <Button variant="contained" className="BtnCardMain CardInCardItem">В корзину</Button>
                                </ButtonGroup>
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

export class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {      
            categoryItems: [],  
            cartItems: [],
            activePage: '',
            is_load: false,
            openCity: false,
            cityName: '',
            testData: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            cityList: [],
            
            openLogin: false,
            userLogin: '',
            userLoginFormat: '',
            userCode: '',
            
            stage_1: true,
            stage_2: false,
            
            timerSMS: 59,
            errPhone: '',
            errSMS: ''
        };
    }

    load(){
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
                console.log( json )
                
                itemsStore.userName = json.user_name;
                
                itemsStore.setAllItems(json.all_items);
                itemsStore.setAllItemsCat(json.arr);
                itemsStore.setBanners(json.baners)
                itemsStore.setCityRU(json.this_city_name_ru);
                
                this.setState({
                    cityList: json.city_list,
                    categoryItems: json.arr, 
                    is_load: true,
                });
                
                console.log( itemsStore.userName )
            })
            .catch(err => { });
        }else{
            
        }
    }  
    
    componentDidMount = () => {
        autorun(() => {
            this.setState({
                cartItems: itemsStore.getItems()
            })
            
            this.setState({
                activePage: itemsStore.getPage()
            })
            
            this.setState({
                cityName: itemsStore.getCity()
            })
            
            this.load();
        })
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
        window.location.href = this_addr.replace(itemsStore.getCity(), city);
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
            console.log( json )
            
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
            
            
            //setTimeout(() => { clearInterval(timerId); }, 60000);
            
            //this.checkAuth(2, 'Профиль создан')
            //AppMetrica.reportEvent('Профиль создан', {number: this.state.number});
          }else{
            //this.checkAuth(3, 'Ошибка создание профиля')
            //AppMetrica.reportEvent('Ошибка создание профиля', {number: this.state.number});
            this.setState({
              errPhone: json.text
            });
          }
        });
    }
    
    repeatSMS(){
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

    render() {
        return (
            <Provider { ...stores }>
                <div className="home">
                    <AppBar position="fixed" className="header" style={{ zIndex: 1 }}>
                        <Toolbar className="sub_header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                            {!this.state.is_load ?
                                <Grid>
                                    <Grid item style={{ marginRight: 15 }}>
                                        <Link to={"/"+itemsStore.getCity()+"/"}>
                                            <img alt="Жако доставка роллов и пиццы" src="https://newjacofood.ru/src/img/other/Logotip.png" />
                                        </Link> 
                                    </Grid>
                                    <Hidden xsDown>
                                        {this.state.testData.map((item, key) => 
                                            <Grid item key={key} style={{ padding: '8px 16px' }}>
                                                <div style={{ width: 100, height: 20, backgroundColor: '#e5e5e5' }} />
                                            </Grid>
                                        )}
                                    </Hidden>
                                </Grid>
                                    :
                                <Grid>
                                    <Grid item style={{ marginRight: 15 }}>
                                        <Link to={"/"+itemsStore.getCity()+"/"}>
                                            <img alt="Жако доставка роллов и пиццы" src="https://newjacofood.ru/src/img/other/Logotip.png" />
                                        </Link> 
                                    </Grid>
                                    <Hidden mdDown>
                                        
                                        <Grid item className="CityProfileNav">
                                            <Typography className="cat" variant="h5" component="span" onClick={this.openCity.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>{itemsStore.getCityRU()} <ArrowDropDownIcon /></Typography>
                                            
                                            {itemsStore.getToken() ?
                                                itemsStore.userName.length > 0 ?
                                                    <Link to={"/"+itemsStore.getCity()+"/profile"} className="cat">{itemsStore.userName}</Link> 
                                                        :
                                                    <Link to={"/"+itemsStore.getCity()+"/profile"}>
                                                        <Typography className="cat" variant="h5" component="span">Профиль</Typography>
                                                    </Link>
                                                    :
                                                <Typography className="cat" variant="h5" component="span" onClick={this.openLogin.bind(this)}>Войти</Typography>
                                            }
                                        </Grid>
                                        
                                        {this.state.categoryItems.map((item, key) => 
                                            <Grid item key={key}>
                                                {this.state.activePage == 'home' ?
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
                                                            
                                                            document.querySelector('.scrollCat').classList.add('mandatory');
                                                            setTimeout(()=>{
                                                                document.querySelector('.scrollCat').classList.remove('mandatory');
                                                            }, 300)
                                                        }} 
                                                        smooth={true} 
                                                        offset={-100} 
                                                        activeClass="activeCat" 
                                                        id={'link_'+item.id} 
                                                        style={{ width: 'max-content', display: 'flex', whiteSpace: 'nowrap', padding: '4px 8px' }}
                                                    >
                                                        <Typography className="cat" variant="h5" component="span">{item.name}</Typography>
                                                    </ScrollLink> 
                                                        :
                                                    <Link to={"/"+itemsStore.getCity()+"/"} className="catLink" style={{ padding: '4px 8px' }} onClick={() => { typeof window !== 'undefined' ? localStorage.setItem('goTo', item.id) : {} }}>
                                                        <Typography className="cat" variant="h5" component="span">{item.name}</Typography>
                                                    </Link> 
                                                }
                                            </Grid>)
                                        }
                                        
                                        <Grid item>
                                            <Link 
                                                style={{ padding: '4px 8px' }}
                                                to={"/"+itemsStore.getCity()+"/actii"} 
                                                className="catLink"
                                            >
                                                <Typography className="cat" variant="h5" component="span">Акции</Typography>
                                            </Link>    
                                        </Grid>
                                        <Grid item>
                                            <Link 
                                                style={{ padding: '4px 8px' }}
                                                to={"/"+itemsStore.getCity()+"/contact"} 
                                                className="catLink"
                                            >
                                                <Typography className="cat" variant="h5" component="span">Контакты</Typography>
                                            </Link>    
                                        </Grid>
                                        <Grid item>
                                            <SimplePopover openLogin={this.openLogin.bind(this)} />
                                        </Grid>
                                    </Hidden>
                                </Grid>
                            }
                            
                            
                            {this.state.is_load === true ?
                                <Hidden lgUp>
                                    <Typography variant="h5" component="span" className="thisCity" onClick={this.openCity.bind(this)}><LocationOnIcon /> {itemsStore.getCityRU()}</Typography>
                                </Hidden>
                                    :
                                null
                            }
                        </Toolbar>
                        
                        {this.state.activePage == 'home' ?
                            <Grid className="scrollCat" style={{ marginTop: 50, display: 'flex', flexDirection: 'row', overflow: 'scroll', position: 'fixed', backgroundColor: '#fff', zIndex: 1, width: '100%' }}>
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
                                                
                                                document.querySelector('.scrollCat').classList.add('mandatory');
                                                document.querySelector('.activeCat').classList.add('activeCatTest');
                                                setTimeout(()=>{
                                                    if( document.querySelector('.scrollCat') ){
                                                        document.querySelector('.scrollCat').classList.remove('mandatory');
                                                        document.querySelector('.activeCat').classList.remove('activeCatTest');
                                                    }
                                                }, 300)
                                            }} 
                                            smooth={true} 
                                            offset={-100} 
                                            activeClass="activeCat" 
                                            id={'link_'+item.id} 
                                            style={{ width: 'max-content', display: 'flex', padding: '6px 10px', whiteSpace: 'nowrap' }}
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
                                <Typography key={key} variant="h5" component="span" className={"ModalLabel "+( itemsStore.getCity() == item.link ? 'active' : '' )} onClick={this.chooseCity.bind(this, item.link)}>{item.name}</Typography>
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
                                    onChange={ event => this.state.stage_1 ? this.setState({ userLogin: event.target.value }) : {} }
                                />
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
                                            onChange={ event => this.setState({ userCode: event.target.value }) }
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
                    
                    
                    <Switch>
                        <Route
                            path='/:cityName/contact'
                            exact={ true }
                            component={ Contact }
                        />
                        <Route
                            path='/:cityName/actii'
                            exact={ true }
                            component={ Actii }
                        />
                        <Route
                            path='/:cityName/menu'
                            exact={ true }
                            component={ Home }
                        />
                        <Route
                            path='/:cityName'
                            exact={ true }
                            component={ Home }
                        />
                        <Route exact path='/:cityName/profile/'>
                            {!itemsStore.getToken() && itemsStore.getCity() ? <Redirect push to={"/"+itemsStore.getCity()+"/"} /> : <Profile />}
                        </Route>

                        
                        <Route
                            path='/:cityName/menu/:itemLink'
                            exact={ true }
                            component={ Item }
                        />
                        <Route
                            component={ NotFound }
                        />
                        
                        
                    </Switch>
                    
                
                    <Hidden lgUp>
                        <div style={{ width: '100%', height: 3, position: 'fixed', bottom: 72, zIndex: 0, backgroundColor: '#bababa', opacity: 0.01 }} />
                        <div style={{ width: '100%', height: 3, position: 'fixed', bottom: 69, zIndex: 0, backgroundColor: '#bababa', opacity: 0.02 }} />
                        <div style={{ width: '100%', height: 3, position: 'fixed', bottom: 66, zIndex: 0, backgroundColor: '#bababa', opacity: 0.03 }} />
                        <div style={{ width: '100%', height: 3, position: 'fixed', bottom: 63, zIndex: 0, backgroundColor: '#bababa', opacity: 0.04 }} />
                        <div style={{ width: '100%', height: 3, position: 'fixed', bottom: 60, zIndex: 0, backgroundColor: '#bababa', opacity: 0.05 }} />
                        <div style={{ width: '100%', height: 3, position: 'fixed', bottom: 57, zIndex: 0, backgroundColor: '#bababa', opacity: 0.06 }} />
                        <div style={{ width: '100%', height: 3, position: 'fixed', bottom: 54, zIndex: 0, backgroundColor: '#bababa', opacity: 0.07 }} />
                        <div style={{ width: '100%', height: 3, position: 'fixed', bottom: 51, zIndex: 0, backgroundColor: '#bababa', opacity: 0.08 }} />
                        <div style={{ width: '100%', height: 3, position: 'fixed', bottom: 48, zIndex: 0, backgroundColor: '#bababa', opacity: 0.09 }} />
                        <div style={{ width: '100%', height: 3, position: 'fixed', bottom: 45, zIndex: 0, backgroundColor: '#bababa', opacity: 0.1 }} />
                    </Hidden>
                    <Hidden lgUp>
                        <CustomBottomNavigation login={this.openLogin.bind(this)} />
                    </Hidden>
                    <StickyFooter />
                </div>
            </Provider>
        );
    }
}