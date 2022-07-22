import React from 'react';
import { NavLink as Link } from 'react-router-dom';

import Grid from '@mui/material/Grid';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';

import Typography from '@mui/material/Typography';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import Popover from '@mui/material/Popover';
import { Link as ScrollLink } from "react-scroll";

const queryString = require('query-string');

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputMask from "react-input-mask";
import Badge from '@mui/material/Badge';
import itemsStore from '../../stores/items-store';
import config from '../../stores/config';

import { MiniActionsCartButton, MiniActionsCartButtonPrize, IconRuble, MyTextInput } from '../../stores/elements';

import { autorun } from "mobx"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { faUtensils, faUser, faGift } from '@fortawesome/free-solid-svg-icons'

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import Modal from '@mui/material/Modal';
// web.cjs is required for IE11 support
import { useSpring, animated } from '@react-spring/web';

const Fade = React.forwardRef(function Fade(props, ref) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
      from: { opacity: 0 },
      to: { opacity: open ? 1 : 0 },
      onStart: () => {
        if (open && onEnter) {
          onEnter();
        }
      },
      onRest: () => {
        if (!open && onExited) {
          onExited();
        }
      },
    });
  
    return (
      <animated.div ref={ref} style={style} {...other}>
        {children}
      </animated.div>
    );
});

Fade.propTypes = {
    children: PropTypes.element,
    in: PropTypes.bool.isRequired,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
};

function SpringModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box className='modalLoginStart'>
                        <div className='loginHeader'>
                            <Typography component="h2">Мой аккаунт</Typography>
                        </div>
                        
                        
                        <MyTextInput label="Телефон" value={ '' } func={ () => {} } />
                        <MyTextInput label="Пароль" value={ '' } func={ () => {} } />

                        <Typography component="span">Забыли пароль ?</Typography>

                        <Typography component="span">Войти</Typography>
                        <Typography component="span">Создать новый аккаутн</Typography>
                        <div className='loginSMS'>
                            <Typography component="span">Войти по смс</Typography>
                        </div>
                        
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

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
                        component="span"
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
                        component="span"
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
    _isMounted = false;
    
    constructor(props) {
        super(props);
        
        this.state = {      
            anchorEl: null,
            cartItems: [],
            originPrice: 0,
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
            }, 1000)
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
        
        let allPrice = itemsStore.getSumDiv();

        newCart.map( (item) => {
            allPrice += parseInt(item.one_price) * parseInt(item.count);
        } )

        newCart.map( (item, key) => {
            let this_item = allItems.find( (it) => parseInt(it.id) == parseInt(item.item_id) );

            newCart[ key ]['img_new'] = this_item['img_new'];
            newCart[ key ]['img_new_update'] = this_item['img_new_update'];
            newCart[ key ]['img_app'] = this_item['img_app'];
        } )

        this.setState({
            cartItems: newCart,
            originPrice: allPrice,
        })
        
        autorun(() => {
            if( this._isMounted ){

                this.setState({
                    allPrice: itemsStore.getSumDiv() + itemsStore.getAllPrice(),

                    promoText: itemsStore.promoText,
                    promoST: itemsStore.promoST,
                })

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
                
                newCart.map( (item, key) => {
                    let this_item = allItems.find( (it) => parseInt(it.id) == parseInt(item.item_id) );
        
                    newCart[ key ]['img_new'] = this_item['img_new'];
                    newCart[ key ]['img_new_update'] = this_item['img_new_update'];
                    newCart[ key ]['img_app'] = this_item['img_app'];
                } )

                let allPrice = itemsStore.getSumDiv();

                newCart.map( (item) => {
                    allPrice += parseInt(item.one_price) * parseInt(item.count);
                } )

                this.setState({
                    originPrice: allPrice,
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
        itemsStore.getInfoPromo(this.state.promoName);

        /*fetch(config.urlApi, {
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
        })*/
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
                    <Badge badgeContent={this.state.allPrice} max={500000} color="primary">
                        <ShoppingCartOutlinedIcon />
                    </Badge>
                </IconButton>
                
                <Popover
                    id={id}
                    open={open}
                    anchorEl={this.state.anchorEl}
                    onClose={this.handleClose.bind(this)}
                    //anchorPosition={{ top: 50, right: 50 }}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <div>
                        <table className="TableMini">
                            <tbody>
                                {this.state.cartItems.map((item, key) => 
                                    item.type == 'us' ?
                                        <tr key={key}>
                                            <td className="CellPic">

                                                { item.img_app.length > 0 ? 
                                                    <picture>
                                                        <source srcset={`
                                                            https://storage.yandexcloud.net/site-img/${item.img_app}_276x276.jpg 138w, 
                                                            https://storage.yandexcloud.net/site-img/${item.img_app}_292x292.jpg 146w,
                                                            https://storage.yandexcloud.net/site-img/${item.img_app}_366x366.jpg 183w,
                                                            https://storage.yandexcloud.net/site-img/${item.img_app}_466x466.jpg 233w,
                                                            https://storage.yandexcloud.net/site-img/${item.img_app}_585x585.jpg 292w
                                                            https://storage.yandexcloud.net/site-img/${item.img_app}_732x732.jpg 366w,
                                                            https://storage.yandexcloud.net/site-img/${item.img_app}_1168x1168.jpg 584w,
                                                            https://storage.yandexcloud.net/site-img/${item.img_app}_1420x1420.jpg 760w,
                                                            https://storage.yandexcloud.net/site-img/${item.img_app}_2000x2000.jpg 1875w`} 
                                                            sizes="(max-width=1439px) 233px, (max-width=1279px) 218px, 292px" />
                                                        <img 
                                                            alt={item.name} 
                                                            title={item.name} 
                                                            src={`https://storage.yandexcloud.net/site-img/${item.img_app}_276x276.jpg`} />
                                                    </picture>
                                                        : 
                                                    <picture>
                                                        <source 
                                                            srcSet={"https://storage.yandexcloud.net/site-img/"+item.img_new+"600х400.webp?"+item.img_new_update} 
                                                            type="image/webp" 
                                                        />
                                                        <img 
                                                            src={"https://storage.yandexcloud.net/site-img/"+item.img_new+"600х400.jpg?"+item.img_new_update} 
                                                            alt={item.name}
                                                            title={item.name}
                                                        />
                                                    </picture> 
                                                }
                                            </td>
                                            <td className="TableMiniName CellName">
                                                <span style={{ height: 40, width: '100%', display: 'flex', alignItems: 'center' }}>{item.name}</span>
                                            </td>
                                            <td className="CellButton">
                                                <MiniActionsCartButton count={item.count} item_id={item.item_id} minus={this.minus.bind(this)} add={this.add.bind(this)} />
                                            </td>
                                            <td className="CellPrice"> 
                                                <div className="TableMiniPrice">
                                                    { new Intl.NumberFormat('ru-RU').format(item.all_price) } 
                                                    <IconRuble style={{ width: 13, height: 13, fill: '#525252', marginLeft: 5 }} />
                                                </div>
                                            </td>
                                        </tr>
                                            :
                                        <tr key={key}>
                                            <td className="CellPic">
                                                { item.img_app.length > 0 ? 
                                                    <picture>
                                                        <source srcset={`
                                                            https://storage.yandexcloud.net/site-img/${item.img_app}_276x276.jpg 138w, 
                                                            https://storage.yandexcloud.net/site-img/${item.img_app}_292x292.jpg 146w,
                                                            https://storage.yandexcloud.net/site-img/${item.img_app}_366x366.jpg 183w,
                                                            https://storage.yandexcloud.net/site-img/${item.img_app}_466x466.jpg 233w,
                                                            https://storage.yandexcloud.net/site-img/${item.img_app}_585x585.jpg 292w
                                                            https://storage.yandexcloud.net/site-img/${item.img_app}_732x732.jpg 366w,
                                                            https://storage.yandexcloud.net/site-img/${item.img_app}_1168x1168.jpg 584w,
                                                            https://storage.yandexcloud.net/site-img/${item.img_app}_1420x1420.jpg 760w,
                                                            https://storage.yandexcloud.net/site-img/${item.img_app}_2000x2000.jpg 1875w`} 
                                                            sizes="(max-width=1439px) 233px, (max-width=1279px) 218px, 292px" />
                                                        <img 
                                                            alt={item.name} 
                                                            title={item.name} 
                                                            src={`https://storage.yandexcloud.net/site-img/${item.img_app}_276x276.jpg`} />
                                                    </picture>
                                                        : 
                                                    <picture>
                                                        <source 
                                                            srcSet={"https://storage.yandexcloud.net/site-img/"+item.img_new+"600х400.webp?"+item.img_new_update} 
                                                            type="image/webp" 
                                                        />
                                                        <img 
                                                            src={"https://storage.yandexcloud.net/site-img/"+item.img_new+"600х400.jpg?"+item.img_new_update} 
                                                            alt={item.name}
                                                            title={item.name}
                                                        />
                                                    </picture> 
                                                }   
                                            </td>
                                            <td className="TableMiniName CellName">
                                                <span style={{ height: 40, width: '100%', display: 'flex', alignItems: 'center' }}>{item.name}</span>
                                            </td>
                                            <td className="CellButtonPrize" colSpan="2">
                                                <MiniActionsCartButtonPrize count={item.count} price={item.all_price} />
                                            </td>
                                        </tr>
                                )}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td>Итого:</td>
                                    <td>
                                        { this.state.originPrice != this.state.allPrice ?
                                            <div className='originPrice'>
                                                <span>
                                                    { new Intl.NumberFormat('ru-RU').format(this.state.originPrice) } 
                                                    <IconRuble style={{ width: 14, height: 14, fill: 'rgba(27,27,31,0.2)', marginLeft: 5 }} />
                                                </span>
                                            </div>
                                                :
                                            <div>
                                                { new Intl.NumberFormat('ru-RU').format(this.state.allPrice) } 
                                                <IconRuble style={{ width: 14, height: 14, fill: '#525252', marginLeft: 5 }} />
                                            </div>
                                        }
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

                            { this.state.originPrice != this.state.allPrice ?
                                <div className="DescPromoPrice">
                                    { new Intl.NumberFormat('ru-RU').format(this.state.allPrice) } 
                                    <IconRuble style={{ width: 14, height: 14, fill: '#525252', marginLeft: 5 }} />
                                </div>
                                    :
                                null
                            }

                            {this.state.promoText.length > 0 && this.state.promoST === false ?
                                <div className="DescPromo">
                                    <Typography className="cat" variant="h5" component="span">{this.state.promoText}</Typography>
                                </div>
                                    :
                                null
                            }
                        </div>
                        <div className="InCart">

                            <SpringModal />

                            {itemsStore.getToken() !== null ?
                                <Link
                                    to={'/'+itemsStore.getCity()+'/cart'}
                                    exact={ true }
                                    style={{ textDecoration: 'none' }}
                                    onClick={this.handleClose.bind(this)}
                                >
                                    <ButtonGroup disableElevation={true} disableRipple={true} variant="contained">
                                        <Button variant="contained">Оформить заказ</Button>
                                    </ButtonGroup>
                                </Link>
                                    :
                                <ButtonGroup disableElevation={true} disableRipple={true} variant="contained">
                                    <Button variant="contained" onClick={this.props.openLogin}>Оформить заказ</Button>
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
                                    <Grid item key={key}>
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
                    
                        <Box sx={{ display: { md: 'none', lg: 'none', xl: 'none' } }}>
                            <Typography variant="h5" component="span" className="thisCity" onClick={this.openCity.bind(this)}><FontAwesomeIcon icon={ faMapMarkerAlt } /> {itemsStore.getCityRU()}</Typography>
                        </Box>
                    </Toolbar>
                    
                    {this.state.activePage == 'home' ?
                        <Grid className="scrollCat">
                            <Box sx={{ display: { md: 'none', lg: 'none', xl: 'none' } }}>
                                {this.state.testData.map((item, key) => 
                                    <Grid item key={key}>
                                        <div style={{ width: 120, height: 28, marginRight: 12, backgroundColor: '#e5e5e5' }} />    
                                    </Grid>)
                                }
                            </Box>
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
                            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', width: '100%' }}>
                                
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
                            </Box>
                        </Grid>
                    
                        <Box sx={{ display: { md: 'none' } }}>
                            <Typography variant="h5" component="span" className="thisCity" onClick={this.openCity.bind(this)}><FontAwesomeIcon icon={ faMapMarkerAlt } /> {itemsStore.getCityRU()}</Typography>
                        </Box>
                                
                    </Toolbar>
                    
                    {this.state.activePage == 'home' ?
                        <Grid className="scrollCat mobile">
                            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
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
                            </Box>
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
                    <Box sx={{ display: { md: 'none', lg: 'none', xl: 'none' } }}>
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
                    </Box>
                        :
                    null
                }    
                
                <Box sx={{ display: { md: 'none', lg: 'none', xl: 'none' } }}>
                    <CustomBottomNavigation login={ this.openLogin.bind(this) } />
                </Box>
            </div>
        )
    }
}