import React from 'react';
import { NavLink as Link, Switch, Route, Redirect } from 'react-router-dom';

import { Home } from '../home';
import { Item } from '../item';
import { Contact } from '../contact';
import { Actii } from '../actii';
import { Profile } from '../profile';
import { Cart } from '../cart';

import { PageAbout } from '../pageAbout';
import { PageJob } from '../pageJob';
import { PageInstPay } from '../pageInstPay';
import { PageOferta } from '../pageOferta';
import { PagePolitika } from '../pagePolitika';


import { Header } from '../header';

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
import { Provider } from 'mobx-react';
import itemsStore from '../../stores/items-store';
const stores = { itemsStore };

import { autorun } from "mobx"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils, faUser, faPlus, faMinus, faGift, faMapMarkerAlt, faRubleSign } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faFacebookF, faOdnoklassniki, faVk, faTelegramPlane } from '@fortawesome/free-brands-svg-icons'

class CustomBottomNavigation extends React.Component{
    constructor(props) {
        super(props);
        
        this.state = {      
            allPrice: 0,
            thisPage: ''
        };
    }
    
    componentDidMount = () => {
        autorun(() => {
            this.setState({
                allPrice: itemsStore.getSumDiv() + itemsStore.getAllPrice(),
                thisPage: itemsStore.getPage()
            })
        })
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        return (
            this.state.allPrice !== nextState.allPrice ||
            this.state.thisPage !== nextState.thisPage
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
                {itemsStore.getToken() ?
                    <Link
                        to={'/'+this_city+'/cart'}
                        exact={ true }
                        className="MuiButtonBase-root MuiBottomNavigationAction-root"
                    >
                        <Badge badgeContent={ this.state.allPrice } max={500000} color="primary">
                            <ShoppingCartOutlinedIcon style={{ fill: this.state.thisPage == 'cart' ? 'black' : 'gray' }} />
                        </Badge>
                    </Link>
                        :
                    <Typography 
                        className="MuiButtonBase-root MuiBottomNavigationAction-root" 
                        onClick={this.props.login}>
                        <Badge badgeContent={ this.state.allPrice } max={500000} color="primary">
                            <ShoppingCartOutlinedIcon style={{ fill: this.state.thisPage == 'cart' ? 'black' : 'gray' }} />
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
                {itemsStore.getToken() ?
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

class StickyFooter extends React.Component{
    constructor(props) {
        super(props);
        
        this.state = {      
            soc_link: null,
            cityName: '',
            is_load: false,
        };
    }
    
    loadPageInfo(){
        if( itemsStore.getCity() ){
            fetch('https://jacofood.ru/src/php/test_app.php', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded'},
                body: queryString.stringify({
                    type: 'get_page_info', 
                    city_id: itemsStore.getCity(),
                    page: 'info'
                })
            }).then(res => res.json()).then(json => {
                console.log( json )
                
                this.setState({
                    soc_link: json.soc_link,
                    is_load: true
                });
            })
            .catch(err => { });
        }
    }
    
    componentDidMount = () => {
        autorun(() => {
            this.setState({
                cityName: itemsStore.getCity()
            })
            
            this.loadPageInfo();
        })
    }
    
    render(){
        return (
            <footer className="footer">
                <Grid container className="mainContainer">
                    <Grid item lg={3} md={3} sm={3} xl={3} xs={12}>
                        <Typography variant="body1">Жако роллы и пицца — сеть кафе</Typography>
                        <Typography variant="body1">© Жако 2017 - {new Date().getFullYear()}</Typography>
                    </Grid>
                    <Grid item lg={3} md={3} sm={3} xl={3} xs={12}>
                        <Link
                            to={ '/'+this.state.cityName+'/about' }
                            style={{ textDecoration: 'none' }}
                        >
                            <Typography variant="body1">О Компании</Typography>
                        </Link>
                        <Link
                            to={ '/'+this.state.cityName+'/jobs' }
                            style={{ textDecoration: 'none' }}
                        >
                            <Typography variant="body1">Вакансии</Typography>
                        </Link>
                        <Link
                            to={ '/'+this.state.cityName+'/publichnaya-oferta' }
                            style={{ textDecoration: 'none' }}
                        >
                            <Typography variant="body1">Публичная оферта</Typography>
                        </Link>
                    </Grid>
                    <Grid item lg={3} md={3} sm={3} xl={3} xs={12}>
                        <Link
                            to={ '/'+this.state.cityName+'/politika-konfidencialnosti' }
                            style={{ textDecoration: 'none' }}
                        >
                            <Typography variant="body1">Политика конфиденциальности</Typography>
                        </Link>
                        <Link
                            to={ '/'+this.state.cityName+'/contact' }
                            style={{ textDecoration: 'none' }}
                        >
                            <Typography variant="body1">Доставка и контакты</Typography>
                        </Link>
                        <Link
                            to={ '/'+this.state.cityName+'/instpayorders' }
                            style={{ textDecoration: 'none' }}
                        >
                            <Typography variant="body1">Правила оплаты товаров</Typography>
                        </Link>
                    </Grid>
                    { this.state.is_load ?
                        <Grid item lg={3} md={3} sm={3} xl={3} xs={12} className="socIcons">
                            { this.state.soc_link && this.state.soc_link.link_fb ?
                                <Link
                                    to={{ pathname: this.state.soc_link.link_fb }}
                                    target="_blank"
                                    style={{ textDecoration: 'none' }}
                                >
                                    <FontAwesomeIcon icon={faFacebookF} style={{ fontSize: '2rem', padding: 10 }} />
                                </Link>
                                    :
                                null
                            }
                            { this.state.soc_link && this.state.soc_link.link_inst ?
                                <Link
                                    to={{ pathname: this.state.soc_link.link_inst }}
                                    target="_blank"
                                    style={{ textDecoration: 'none' }}
                                >
                                    <FontAwesomeIcon icon={faInstagram} style={{ fontSize: '2rem', padding: 10 }} />
                                </Link>
                                    :
                                null
                            }
                            { this.state.soc_link && this.state.soc_link.link_ok ?
                                <Link
                                    to={{ pathname: this.state.soc_link.link_ok }}
                                    target="_blank"
                                    style={{ textDecoration: 'none' }}
                                >
                                    <FontAwesomeIcon icon={faOdnoklassniki} style={{ fontSize: '2rem', padding: 10 }} />
                                </Link>
                                    :
                                null
                            }
                            { this.state.soc_link && this.state.soc_link.link_vk ?
                                <Link
                                    to={{ pathname: this.state.soc_link.link_vk }}
                                    target="_blank"
                                    style={{ textDecoration: 'none' }}
                                >
                                    <FontAwesomeIcon icon={faVk} style={{ fontSize: '2rem', padding: 10 }} />
                                </Link>
                                    :
                                null
                            }
                            
                                <Link
                                    to={{ pathname: 'https://t.me/jacofood' }}
                                    target="_blank"
                                    style={{ textDecoration: 'none' }}
                                >
                                    <FontAwesomeIcon icon={faTelegramPlane} style={{ fontSize: '2rem', padding: 10 }} />
                                </Link>
                                    
                        </Grid>
                            :
                        null
                    }
                </Grid>
            </footer>
        );
    }
}

export class App extends React.Component {
    constructor(props) {
        super(props);
        
        console.log( props )
        
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
            errSMS: '',
            userName: '',
            
            soc_link: null
        };
    }

    componentDidMount = () => {
        autorun(() => {
            this.setState({
                activePage: itemsStore.getPage()
            })
            
            this.setState({
                cityName: itemsStore.getCity()
            })
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            this.state.activePage !== nextState.activePage ||
            this.state.cityName !== nextState.cityName
        );
    }
    
    render() {
        return (
            <Provider { ...stores }>
                <div className="home">
                               
                    <Header />        
                    
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
                            {!itemsStore.getToken() && this.state.cityName ? <Redirect push to={"/"+this.state.cityName+"/"} /> : <Profile />}
                        </Route>
                        <Route
                            path='/:cityName/menu/:itemLink'
                            exact={ true }
                            component={ Item }
                        />
                        <Route
                            path='/:cityName/cart'
                            exact={ true }
                            component={ Cart }
                        />
                        <Route
                            path='/:cityName/about'
                            exact={ true }
                            component={ PageAbout }
                        />
                        <Route
                            path='/:cityName/jobs'
                            exact={ true }
                            component={ PageJob }
                        />
                        <Route
                            path='/:cityName/instpayorders'
                            exact={ true }
                            component={ PageInstPay }
                        />
                        <Route
                            path='/:cityName/publichnaya-oferta'
                            exact={ true }
                            component={ PageOferta }
                        />
                        <Route
                            path='/:cityName/politika-konfidencialnosti'
                            exact={ true }
                            component={ PagePolitika }
                        />
                        
                        
                        <Route
                            component={ NotFound }
                        />
                    </Switch>
                    
                
                    {this.state.activePage == 'cart' ?
                        <Hidden lgUp>
                            <div style={{ width: '100%', height: 3, position: 'fixed', bottom: 72+99, zIndex: 0, backgroundColor: '#bababa', opacity: 0.01 }} />
                            <div style={{ width: '100%', height: 3, position: 'fixed', bottom: 69+99, zIndex: 0, backgroundColor: '#bababa', opacity: 0.02 }} />
                            <div style={{ width: '100%', height: 3, position: 'fixed', bottom: 66+99, zIndex: 0, backgroundColor: '#bababa', opacity: 0.03 }} />
                            <div style={{ width: '100%', height: 3, position: 'fixed', bottom: 63+99, zIndex: 0, backgroundColor: '#bababa', opacity: 0.04 }} />
                            <div style={{ width: '100%', height: 3, position: 'fixed', bottom: 60+99, zIndex: 0, backgroundColor: '#bababa', opacity: 0.05 }} />
                            <div style={{ width: '100%', height: 3, position: 'fixed', bottom: 57+99, zIndex: 0, backgroundColor: '#bababa', opacity: 0.06 }} />
                            <div style={{ width: '100%', height: 3, position: 'fixed', bottom: 54+99, zIndex: 0, backgroundColor: '#bababa', opacity: 0.07 }} />
                            <div style={{ width: '100%', height: 3, position: 'fixed', bottom: 51+99, zIndex: 0, backgroundColor: '#bababa', opacity: 0.08 }} />
                            <div style={{ width: '100%', height: 3, position: 'fixed', bottom: 48+99, zIndex: 0, backgroundColor: '#bababa', opacity: 0.09 }} />
                            <div style={{ width: '100%', height: 3, position: 'fixed', bottom: 45+99, zIndex: 0, backgroundColor: '#bababa', opacity: 0.1 }} />
                        </Hidden>
                            :
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
                    }
                    <Hidden lgUp>
                        <CustomBottomNavigation login={ Header.openLogin } />
                    </Hidden>
                    <StickyFooter />
                </div>
            </Provider>
        );
    }
}