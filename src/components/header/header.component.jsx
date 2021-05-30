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
            
            let newCart = [];
            
            cartItems.map((item) => {
                if( item.count > 0 ){
                    newCart.push(item)
                }
            })
            
            this.setState({
                cartItems: cartItems
            })
        }
        
        autorun(() => {
            let cartItems = itemsStore.getItems();
            let newCart = [];
            
            cartItems.map((item) => {
                if( item.count > 0 ){
                    newCart.push(item)
                }
            })
            
            this.setState({
                cartItems: newCart,
                promoName: localStorage.getItem('promo_name') ? localStorage.getItem('promo_name') : ''
            })
            
            itemsStore.getSumDiv();
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
            
            this.setState({
                promoText: check_promo.text
            })
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
                                                {item.all_price} <FontAwesomeIcon icon={faRubleSign} />
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
                                            { itemsStore.getAllPrice() + itemsStore.getSumDiv() } <FontAwesomeIcon icon={faRubleSign} />
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
            
            if( itemsStore.getCity() !== this.state.cityName ){
                this.setState({
                    cityName: itemsStore.getCity()
                })
                
                console.log( 'new city name', itemsStore.getCity() )
                
                this.load();
            }
            
            this.setState({
                userName: itemsStore.userName
            })
        })
        
        this.load();
    }
    
    load(){
        console.log( 'init load data' )
        
        if( !this.is_load ){
            this.is_load = true;
            
            console.log( 'init 2 load data' )
            
            console.log( 'city', itemsStore.getCity() )
            console.log( 'categoryItems', this.state.categoryItems.length )
            
            if( itemsStore.getCity() && this.state.categoryItems.length == 0 ){
                console.log( 'init 2 load data start' )
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
                    
                    itemsStore.setDops(json.need_dop);
                    itemsStore.setAllItems(json.all_items);
                    itemsStore.setAllItemsCat(json.arr);
                    itemsStore.setFreeItems(json.free_items);
                    itemsStore.setBanners(json.baners)
                    itemsStore.setCityRU(json.this_city_name_ru);
                    
                    this.setState({
                        cityList: json.city_list,
                        categoryItems: json.arr, 
                        is_load: true,
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
        window.location.href = this_addr.replace(this.state.cityName, city);
    }
    
    getNewLink(city){
        let this_addr = window.location.pathname;
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
        }else{
            console.log( 'double click 1' )
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
        }else{
            console.log( 'double click 2' )
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
    
    render() {
        
        if( !this.state.is_load ){
            return null;
        }
        
        return (
            <div>
                <AppBar position="fixed" className="header" style={{ zIndex: 2 }}>
                    <Toolbar className="sub_header">
                        
                        <Grid>
                            <Grid item style={{ marginRight: 15 }}>
                                <Link to={"/"+this.state.cityName+"/"}>
                                    <img alt="Жако доставка роллов и пиццы" src="https://jacochef.ru/src/img/Bely_fon_logo.png" />
                                </Link> 
                            </Grid>
                            <Hidden mdDown>
                                
                                <Grid item className="CityProfileNav">
                                    <Typography className="cat" variant="h5" component="span" onClick={this.openCity.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>{itemsStore.getCityRU()} <ArrowDropDownIcon /></Typography>
                                    
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
                                            <Link to={"/"+this.state.cityName+"/"} className="catLink" style={{ padding: '4px 0.5vw' }} onClick={() => { typeof window !== 'undefined' ? localStorage.setItem('goTo', item.id) : {} }}>
                                                <Typography className="cat" variant="h5" component="span">{item.name}</Typography>
                                            </Link> 
                                        }
                                    </Grid>)
                                }
                                
                                <Grid item>
                                    <Link 
                                        style={{ padding: '4px 8px' }}
                                        to={"/"+this.state.cityName+"/actii"} 
                                        className="catLink"
                                    >
                                        <Typography className="cat" variant="h5" component="span">Акции</Typography>
                                    </Link>    
                                </Grid>
                                <Grid item>
                                    <Link 
                                        style={{ padding: '4px 8px' }}
                                        to={"/"+this.state.cityName+"/contact"} 
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
                                            
                                            document.querySelector('.scrollCat').animate({
                                                scrollLeft: 200
                                            }, 100);
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
                            <Link key={key} className={ this.state.cityName == item.link ? 'active' : '' } to={{ pathname: this.getNewLink(item.link) }} onClick={() => { setTimeout(()=>{ window.location.reload(); }, 100) }}>
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