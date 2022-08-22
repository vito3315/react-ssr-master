import React from 'react';
import { NavLink as Link } from 'react-router-dom';

import Grid from '@mui/material/Grid';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';

import Backdrop from '@mui/material/Backdrop';

import PropTypes from 'prop-types';
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

import Badge from '@mui/material/Badge';

import itemsStore from '../../stores/items-store';
import config from '../../stores/config';

import { MiniActionsCartButton, MiniActionsCartButtonPrize, IconRuble, MyTextInput, IconClose, BurgerIcon } from '../../stores/elements';

import { autorun } from "mobx"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { faUtensils, faUser, faGift } from '@fortawesome/free-solid-svg-icons'

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import Modal from '@mui/material/Modal';
// web.cjs is required for IE11 support
import { useSpring, animated } from '@react-spring/web';

import AuthCode from 'react-auth-code-input';

import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DraftsIcon from '@mui/icons-material/Drafts';

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

class ModalLogin extends React.Component{
    sms1 = false;

    constructor(props) {
        super(props);
        
        this.state = {      
            open: false,

            typeLogin: 'start',
            fromType: 'start',
            loginLogin: '',
            pwdLogin: '',
            newPassword: '',
            genPwd: '',
            checkCode: '',

            pwd: '',
            ResPWD: false,
            NeedCode: false,
            

            openLogin: false,
            userLogin: '',
            userLoginFormat: '',
            userCode: '',
            
            timerSMS: 89,
            timerSMSTime: this.toTime(89),
            errPhone: '',
            errSMS: '',

            errTitle: '',
            errText1: '',
            errText2: '',
        };
    }

    componentDidUpdate(){
        if( this.props.isOpen != this.state.open ){
            this.setState({
                open: this.props.isOpen,
                typeLogin: 'start',
                fromType: 'start',
                loginLogin: '',
                pwdLogin: '',
                newPassword: '',
                genPwd: '',
                checkCode: '',
    
                pwd: '',
                ResPWD: false,
                NeedCode: false,
                
    
                openLogin: false,
                userLogin: '',
                userLoginFormat: '',
                userCode: '',
                
                timerSMS: 89,
                timerSMSTime: this.toTime(89),
                errPhone: '',
                errSMS: '',

                errTitle: '',
                errText1: '',
                errText2: '',
            })
        }
    }

    componentDidMount(){
        this.gen_password();
    }

    getData = (method, data = {}, is_load = true) => {
        if( is_load == true ){
            this.setState({
                is_load: true
            })
        }
        
        data.type = method;

        return fetch(config.urlApi, {
          method: 'POST',
          headers: {
            'Content-Type':'application/x-www-form-urlencoded'},
          body: queryString.stringify( data )
        }).then(res => res.json()).then(json => {
          return json;
        })
        .catch(err => { 
          setTimeout( () => {
            this.setState({
              is_load: false
            })
          }, 300 )
          console.log( err )
        });
    }  

    open(){
        this.setState({
            open: true
        })
    }

    close(){
        this.props.close();
        /*this.setState({
            open: false,
            fromType: 'start',
            typeLogin: 'start',
            loginLogin: '',
            pwdLogin: '',
            newPassword: '',
        })*/
    }

    changeData(type, event){
        let data = event.target.value;

        if( type == 'loginLogin' ){
            if( isNaN(data) && data != '+' ){
                return ;
            }

            if( parseInt(data[0]) == 9 ){
                data = '8' + data;
            }
            if( data[0] == '+' && parseInt(data[1]) == '7' ){
                data = data.slice(2);
                data = '8' + data;
            }

            data = data.split(' ').join('');
            data = data.split('(').join('');
            data = data.split(')').join('');
            data = data.split('-').join('');
            data = data.split('_').join('');
        }

        this.setState({
            [type]: data
        })
    }

    checkLoginKey(type, event){
        if( parseInt(event.keyCode) == 13 ){
            if( parseInt(type) == 1 ){
                this.logIn();
            }
            if( parseInt(type) == 2 ){
                this.sendSMS();
            }

            if( parseInt(type) == 3 ){
                this.checkCode();
            }

            if( parseInt(type) == 4 ){
                this.sendsmsNewLogin();
            }
        }
    }

    async logIn(){
        let data = {
            number: this.state.loginLogin,
            pwd: this.state.pwdLogin 
        };

        let res = await this.getData('site_login', data);

        if( res.st === false ){
            if( res.type == 'modal' ){
                this.setState({
                    typeLogin: 'error',
                    errTitle: res.title,
                    errText1: res.text1,
                    errText2: res.text2,
                });
            }else{
                this.setState({
                    errPhone: res.text
                });
            }
        }else{
            this.setState({ 
                errPhone: '',
                errTitle: '',
                errText1: '',
                errText2: '',
            })

            itemsStore.setToken( res.token, res.name ); 
            itemsStore.setUserName(res.name);

            this.close();
        }
    }

    async createProfileFetch(number, token){
        let data = {
            number: number,
            token: token 
        };

        this.setState({ 
            fromType: this.state.typeLogin,
            typeLogin: 'loginSMSCode'
        })

        let timerId = setInterval(() => {
            this.setState({
                timerSMS: this.state.timerSMS-1,
                timerSMSTime: this.toTime(this.state.timerSMS-1)
            })
            if( this.state.timerSMS == 0 ){
                clearInterval(timerId);
            }
        }, 1000);

        let res = await this.getData('create_profile', data);

        if( res['st'] === true ){
            this.setState({ 
                errPhone: '',
                errTitle: '',
                errText1: '',
                errText2: '',
            })
        }else{
            if( res.type == 'modal' ){
                this.setState({
                    typeLogin: 'error',
                    errTitle: res.title,
                    errText1: res.text1,
                    errText2: res.text2,
                });
            }else{
                this.setState({
                    errPhone: res.text
                });
            }
        }
        
        setTimeout( () => {
            this.sms1 = false;
        }, 300 )
    }

    sendSMS(){
        if( this.sms1 == false ){
            this.sms1 = true;
            
            let number = this.state.loginLogin;
            
            grecaptcha.ready(() => {
                grecaptcha.execute('6LdhWpIdAAAAAA4eceqTfNH242EGuIleuWAGQ2su', {action: 'submit'}).then( (token) => {
                    this.createProfileFetch(number, token);
                });
            });
        }
    }

    toTime(seconds) {
        let date = new Date(null);
        date.setSeconds(seconds);
        return date.toISOString().substr(14, 5);
    }

    changeCode(data){
        this.setState({
            checkCode: data
        })

        if( data.length == 4 ){
            setTimeout( () => {
                this.checkCode();
            }, 300 )
        }
    }

    async checkCode(){
        let data = {
            number: this.state.loginLogin,
            cod: this.state.checkCode 
        };

        let res = await this.getData('check_profile', data);

        if( res.st === false ){
            if( res.type == 'modal' ){
                this.setState({
                    typeLogin: 'error',
                    errTitle: res.title,
                    errText1: res.text1,
                    errText2: res.text2,
                });
            }else{
                this.setState({
                    errPhone: res.text
                });
            }
        }else{
            this.setState({ 
                errPhone: '',
                errTitle: '',
                errText1: '',
                errText2: '',
            })

            itemsStore.setToken( res.token, res.name ); 
            itemsStore.setUserName(res.name);

            if( this.state.fromType == 'create' ){
                this.setState({ 
                    fromType: this.state.typeLogin,
                    typeLogin: 'finish'
                })
            }else{
                this.close();
            }
        }
    }

    gen_password(){
        var password = "";
        var symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+?";
        for (var i = 0; i < 10; i++){
            password += symbols.charAt(Math.floor(Math.random() * symbols.length));     
        }
        
        this.setState({
            genPwd: password
        })
    }

    async sendsmsNewLoginFetch(token){
        let data = {
            number: this.state.loginLogin,
            pwd: this.state.newPassword,
            token: token 
        };

        this.setState({ 
            fromType: this.state.typeLogin,
            typeLogin: 'loginSMSCode'
        })

        let timerId = setInterval(() => {
            this.setState({
                timerSMS: this.state.timerSMS-1,
                timerSMSTime: this.toTime(this.state.timerSMS-1)
            })
            if( this.state.timerSMS == 0 ){
                clearInterval(timerId);
            }
        }, 1000);

        let json = await this.getData('sendsmsrp', data);

        if( json['st'] ){
            this.setState({ 
                errPhone: '',
                errTitle: '',
                errText1: '',
                errText2: '',
            })
        }else{
            if( res.type == 'modal' ){
                this.setState({
                    typeLogin: 'error',
                    errTitle: res.title,
                    errText1: res.text1,
                    errText2: res.text2,
                });
            }else{
                this.setState({
                    errPhone: res.text
                });
            }
        }
        
        setTimeout( () => {
            this.sms1 = false;
            this.setState({
                is_load_new: false
            })
        }, 300 )
    }

    sendsmsNewLogin(){
        if( this.sms1 == false ){
            this.sms1 = true;
            
            grecaptcha.ready(() => {
                grecaptcha.execute('6LdhWpIdAAAAAA4eceqTfNH242EGuIleuWAGQ2su', {action: 'submit'}).then( (token) => {
                    this.sendsmsNewLoginFetch(token);
                });
            });
        }
    }

    render(){
        return (
            <Modal
                open={this.props.isOpen}
                onClose={this.props.close}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                className="class123"
                
            >
                <Fade in={this.props.isOpen}>
                    

                    { this.state.typeLogin != 'start' ? null :
                        <Box className='modalLoginStart'>

                            <IconButton style={{ position: 'absolute', top: -40, left: 15, backgroundColor: 'transparent' }} onClick={this.close.bind(this)}>
                                <IconClose style={{ width: 25, height: 25, fill: '#fff', color: '#fff', overflow: 'visible' }} />
                            </IconButton>

                            <div className='loginIMG'>
                                <img 
                                    alt={'Login'} 
                                    title={'Login'} 
                                    src={`/assets/img_other/account-icon-240x240.png`} />
                            </div>

                            <div className='loginHeader'>
                                <Typography component="h2">Мой аккаунт</Typography>
                            </div>
                            
                            <MyTextInput type={"phone"} placeholder="Телефон" value={ this.state.loginLogin } func={ this.changeData.bind(this, 'loginLogin') } onKeyDown={this.checkLoginKey.bind(this, 1)} className="inputLogin" />

                            <div className='loginErr'>
                                <Typography component="span">{this.state.errPhone}</Typography>
                            </div>

                            <MyTextInput type={"password"} placeholder="Пароль" value={ this.state.pwdLogin } func={ this.changeData.bind(this, 'pwdLogin') } onKeyDown={this.checkLoginKey.bind(this, 1)} className="inputLogin" />

                            <div className='loginLosePWD'>
                                <Typography component="span" onClick={ () => { this.setState({ fromType: this.state.typeLogin, typeLogin: 'resetPWD' }) } }>Забыли пароль ?</Typography>
                            </div>

                            <div className='loginLogin' onClick={this.logIn.bind(this)}>
                                <Typography component="span">Войти</Typography>
                            </div>

                            <div className='loginCreate' onClick={ () => { this.setState({ fromType: this.state.typeLogin, typeLogin: 'create' }); this.gen_password(); } }>
                                <Typography component="span">Создать новый аккаунт</Typography>
                            </div>

                            <div className='loginSMS'>
                                <Typography component="span" onClick={ () => { this.setState({ fromType: this.state.typeLogin, typeLogin: 'loginSMS' }) } }>Войти по смс</Typography>
                            </div>
                            
                        </Box>
                    }
                    { this.state.typeLogin != 'loginSMS' ? null :
                        <Box className='modalLoginCreate'>
                            <IconButton style={{ position: 'absolute', top: -40, left: 15, backgroundColor: 'transparent' }} onClick={this.close.bind(this)}>
                                <IconClose style={{ width: 25, height: 25, fill: '#fff', color: '#fff', overflow: 'visible' }} />
                            </IconButton>

                            <div className='loginIMG'>
                                <img 
                                    alt={'Login'} 
                                    title={'Login'} 
                                    src={`/assets/img_other/account-icon-240x240.png`} />
                            </div>

                            <div className='loginHeader'>
                                <Typography component="h2">Вход по СМС</Typography>
                            </div>
                            
                            <MyTextInput type={"phone"} placeholder="Телефон" value={ this.state.loginLogin } func={ this.changeData.bind(this, 'loginLogin') } onKeyDown={this.checkLoginKey.bind(this, 2)} className="inputLogin" style={{ marginBottom: 0 }} />
                            
                            <div className='loginErr'>
                                <Typography component="span">{this.state.errPhone}</Typography>
                            </div>

                            <div className='loginLogin' onClick={this.sendSMS.bind(this)}>
                                <Typography component="span">Получить код</Typography>
                            </div>
                            
                            <div className='loginCreate' onClick={ () => { this.setState({ fromType: this.state.typeLogin, typeLogin: 'start' }) } }>
                                <Typography component="span">У меня есть аккаунт</Typography>
                            </div>
                        </Box>
                    }
                    { this.state.typeLogin != 'loginSMSCode' ? null :
                        <Box className='modalLoginSMSCode'>
                            <IconButton style={{ position: 'absolute', top: -40, left: 15, backgroundColor: 'transparent' }} onClick={this.close.bind(this)}>
                                <IconClose style={{ width: 25, height: 25, fill: '#fff', color: '#fff', overflow: 'visible' }} />
                            </IconButton>

                            <div className='loginIMG'>
                                <img 
                                    alt={'Login'} 
                                    title={'Login'} 
                                    src={`/assets/img_other/tripple_dop.png`} />
                            </div>

                            <div className='loginHeader'>
                                <Typography component="h2">Проверим телефон ?</Typography>
                            </div>

                            <div className='loginSubHeader' style={{ display: 'none' }}>
                                <Typography component="span">Сейчас мы вам позвоним.</Typography>
                                <Typography component="span">Введите последние 4 цифры номера.</Typography>
                            </div>

                            <div className='loginSubHeader'>
                                <Typography component="span">Введите 4 цифры из смс.</Typography>
                            </div>
                            
                            <div className={this.state.timerSMS > 0 ? 'loginAutCode' : 'loginAutCodeOther'}>
                                <AuthCode autoFocus={true} allowedCharacters='numeric' length="4" onChange={ this.changeCode.bind(this) } />
                            </div>

                            <div className='loginErr'>
                                <Typography component="span">{this.state.errPhone}</Typography>
                            </div>

                            { this.state.timerSMS > 0 ?
                                <div className='loginTimer'>
                                    <Typography component="span">Повторно отправить можно через {this.state.timerSMSTime}</Typography>
                                </div>
                                    :
                                <div className='loginTimerSend' onClick={this.sendSMS.bind(this)}>
                                    <Typography component="span">Отправить код еще раз</Typography>
                                </div>
                            }
                            
                            <div className={'loginSend ' + (this.state.checkCode.length == 4 ? '' : 'disabled') } onClick={this.checkCode.bind(this)}>
                                <Typography component="span">Отправить</Typography>
                            </div>
                            
                            <div className='loginPrev'>
                                <Typography component="span" onClick={ () => { this.setState({ typeLogin: this.state.fromType }) } }>Изменить номер телефона</Typography>
                            </div>
                        </Box>
                    }
                    { this.state.typeLogin != 'resetPWD' ? null :
                        <Box className='modalLoginReset'>
                            <IconButton style={{ position: 'absolute', top: -40, left: 15, backgroundColor: 'transparent' }} onClick={this.close.bind(this)}>
                                <IconClose style={{ width: 25, height: 25, fill: '#fff', color: '#fff', overflow: 'visible' }} />
                            </IconButton>

                            <div className='loginIMG'>
                                <img 
                                    alt={'Login'} 
                                    title={'Login'} 
                                    src={`/assets/img_other/account-icon-240x240.png`} />
                            </div>

                            <div className='loginHeader'>
                                <Typography component="h2">Восстановление пароля</Typography>
                            </div>
                            
                            <MyTextInput type={"phone"} placeholder="Телефон" value={ this.state.loginLogin } func={ this.changeData.bind(this, 'loginLogin') } onKeyDown={this.checkLoginKey.bind(this, 4)} className="inputLogin" />
                            
                            <div className='loginErr'>
                                <Typography component="span">{this.state.errPhone}</Typography>
                            </div>

                            <MyTextInput type={"password"} placeholder="Придумай пароль" value={ this.state.newPassword } func={ this.changeData.bind(this, 'newPassword') } onKeyDown={this.checkLoginKey.bind(this, 4)} className="inputLogin" />

                            <div className='loginLogin' onClick={this.logIn.bind(this)}>
                                <Typography component="span">Сменить пароль</Typography>
                            </div>
                            
                            <div className='loginCreate' onClick={ () => { this.setState({ fromType: this.state.typeLogin, typeLogin: 'start' }) } }>
                                <Typography component="span">У меня есть аккаунт</Typography>
                            </div>
                        </Box>
                    }
                    { this.state.typeLogin != 'create' ? null :
                        <Box className='modalLoginCreateNew'>
                            <IconButton style={{ position: 'absolute', top: -40, left: 15, backgroundColor: 'transparent' }} onClick={this.close.bind(this)}>
                                <IconClose style={{ width: 25, height: 25, fill: '#fff', color: '#fff', overflow: 'visible' }} />
                            </IconButton>

                            <div className='loginIMG'>
                                <img 
                                    alt={'Login'} 
                                    title={'Login'} 
                                    src={`/assets/img_other/account-icon-240x240_white.png`} />
                            </div>

                            <div className='loginHeader'>
                                <Typography component="h2">Новый аккаунт</Typography>
                            </div>
                            
                            <MyTextInput type={"phone"} placeholder="Телефон" value={ this.state.loginLogin } func={ this.changeData.bind(this, 'loginLogin') } onKeyDown={this.checkLoginKey.bind(this, 4)} className="inputLogin" />

                            <div className='loginErr'>
                                <Typography component="span">{this.state.errPhone}</Typography>
                            </div>

                            <MyTextInput type={"password"} placeholder="Придумайте пароль" value={ this.state.newPassword } func={ this.changeData.bind(this, 'newPassword') } onKeyDown={this.checkLoginKey.bind(this, 4)} className="inputLogin" />

                            <div className='loginSubHeader'>
                                <Typography component="span">Надежный пароль - строчные и заглавные буквы, цифры и символы.</Typography>
                                <Typography component="span">Например: {this.state.genPwd}</Typography>
                            </div>

                            <div className='loginErrText'>
                                <Typography component="span"></Typography>
                            </div>

                            <div className='loginLogin' onClick={this.sendsmsNewLogin.bind(this)}>
                                <Typography component="span">Создать аккаунт</Typography>
                            </div>
                            
                            <div className='loginCreate' onClick={ () => { this.setState({ fromType: this.state.typeLogin, typeLogin: 'start' }) } }>
                                <Typography component="span">У меня есть аккаунт</Typography>
                            </div>
                        </Box>
                    }
                    { this.state.typeLogin != 'finish' ? null :
                        <Box className='modalLoginFinish'>
                            <IconButton style={{ position: 'absolute', top: -40, left: 15, backgroundColor: 'transparent' }} onClick={this.close.bind(this)}>
                                <IconClose style={{ width: 25, height: 25, fill: '#fff', color: '#fff', overflow: 'visible' }} />
                            </IconButton>

                            <div className='loginIMG'>
                                <img 
                                    alt={'Login'} 
                                    title={'Login'} 
                                    src={`/assets/img_other/like.png`} />
                            </div>

                            <div className='loginHeader'>
                                <Typography component="h2">Добро пожаловать</Typography>
                            </div>
                            
                            <div className='loginSubHeader1'>
                                <Typography component="span">Теперь вы можете легко оформить онлайн-заказ с доставкой или забрать его самостоятельно из любого нашего кафе.</Typography>
                            </div>

                            <div className='loginSubHeader2'>
                                <Typography component="span"><Link to={'/samara/profile'} exact={ true } onClick={ this.close.bind(this) }>Укажите в профиле</Link> день рождения и мы заренее пришлём вам промокод на приятный подарок.</Typography>
                            </div>

                            <Link to={'/samara/'} exact={ true } className='loginLogin' onClick={ this.close.bind(this) }>
                                <Typography component="span">Перейти в меню</Typography>
                            </Link>
                            
                            <Link to={'/samara/cart'} exact={ true } className='loginCreate' onClick={ this.close.bind(this) }>
                                <Typography component="span">Открыть корзину</Typography>
                            </Link>
                        </Box>
                    }
                    { this.state.typeLogin != 'error' ? null :
                        <Box className='modalLoginError'>
                            <IconButton style={{ position: 'absolute', top: -40, left: 15, backgroundColor: 'transparent' }} onClick={this.close.bind(this)}>
                                <IconClose style={{ width: 25, height: 25, fill: '#fff', color: '#fff', overflow: 'visible' }} />
                            </IconButton>

                            <div className='InnerBorder'>
                                <div className='loginHeader'>
                                    <Typography component="h2">{this.state.errTitle}</Typography>
                                </div>
                                
                                <div className='loginSubHeader1'>
                                    <Typography component="span">{this.state.errText1}</Typography>
                                </div>

                                <div className='loginSubHeader2'>
                                    <Typography component="span">{this.state.errText2}</Typography>
                                </div>
                            </div>
                        </Box>
                    }
                </Fade>
            </Modal>
        )
    }
}

class ModalCity extends React.Component{
    constructor(props) {
        super(props);
        
        this.state = {      
            open: false,
            cityName: this.props.cityName ?? '',
            cityList: this.props.cityList ?? []
        };
    }

    componentDidUpdate(){
        if( this.props.isOpen != this.state.open ){
            this.setState({
                open: this.props.isOpen,
                cityName: this.props.cityName ?? '',
                cityList: this.props.cityList ?? []
            })
        }
    }

    chooseCity(){
        setTimeout(()=>{ 
            itemsStore.saveCartData([]); 
            window.location.reload(); 
        }, 300)
    }

    getNewLink(city){
        if (typeof window !== 'undefined') {
            let this_addr = window.location.pathname;
            return this_addr.replace(this.state.cityName, city);
        }else{
            return '';
        }
    }

    render(){
        return (
            <Modal
                open={this.props.isOpen}
                onClose={this.props.close}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                className="class123"
                
            >
                <Fade in={this.props.isOpen}>
                    
                    <Box className='modalCity'>

                        <IconButton style={{ position: 'absolute', top: -40, left: 15, backgroundColor: 'transparent' }} onClick={this.props.close}>
                            <IconClose style={{ width: 25, height: 25, fill: '#fff', color: '#fff', overflow: 'visible' }} />
                        </IconButton>

                        <div className='loginIMG'>
                            <img 
                                alt={'Login'} 
                                title={'Login'} 
                                src={`/assets/img_other/account-icon-240x240.png`} />
                        </div>

                        <div className='loginHeader'>
                            <Typography component="h2">Выберите город</Typography>
                        </div>

                        {this.state.cityList.map((item, key) => 
                            <Link 
                                key={key} 
                                className={ this.state.cityName == item.link ? 'active' : '' } 
                                to={{ pathname: this.getNewLink(item.link) }} 
                                onClick={this.chooseCity.bind(this)}
                            >
                                <Typography variant="h5" component="span" className={"ModalLabel"}>{item.name}</Typography>
                            </Link> 
                        )}
                        
                    </Box>
                    
                </Fade>
            </Modal>
        )
    }
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

            newCart[ key ]['is_sale'] = parseInt(item.all_price) != parseInt(item.count) * parseInt(item.one_price);

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

                let promo_st = itemsStore.getPromoStatus();

                this.setState({
                    allPrice: itemsStore.getSumDiv() + itemsStore.getAllPrice(),

                    promoText: promo_st.text,
                    promoST: promo_st.st,
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
        
                    newCart[ key ]['is_sale'] = parseInt(item.all_price) != parseInt(item.count) * parseInt(item.one_price);

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
                                                        <source 
                                                            srcSet={"https://storage.yandexcloud.net/site-img/"+item.img_app+"_276x276.webp"} 
                                                            type="image/webp" 
                                                        />
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
                                            
                                            { item.is_sale === true && this.state.promoST === true ?
                                                <td className="CellPrice2"> 
                                                    <div className="TableMiniPrice">
                                                        <div>
                                                            { new Intl.NumberFormat('ru-RU').format( parseInt(item.one_price) * parseInt(item.count) ) } 
                                                            <IconRuble style={{ width: 13, height: 13, fill: 'rgba(27, 27, 31, 0.2)', marginLeft: 5 }} />
                                                        </div>
                                                    </div>
                                                    <div className="TableMiniPrice">
                                                        { new Intl.NumberFormat('ru-RU').format(item.all_price) } 
                                                        <IconRuble style={{ width: 13, height: 13, fill: '#525252', marginLeft: 5 }} />
                                                    </div>
                                                </td>
                                                    :
                                                <td className="CellPrice"> 
                                                    <div className="TableMiniPrice">
                                                        { new Intl.NumberFormat('ru-RU').format( parseInt(item.one_price) * parseInt(item.count) ) } 
                                                        <IconRuble style={{ width: 13, height: 13, fill: '#525252', marginLeft: 5 }} />
                                                    </div>
                                                </td>
                                            }
                                            
                                        </tr>
                                            :
                                        <tr key={key}>
                                            <td className="CellPic">
                                                { item.img_app.length > 0 ? 
                                                    <picture>
                                                        <source 
                                                            srcSet={"https://storage.yandexcloud.net/site-img/"+item.img_app+"_276x276.webp"} 
                                                            type="image/webp" 
                                                        />
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
                                        { this.state.originPrice != this.state.allPrice && this.state.promoST === true ?
                                            <div className='originPrice'>
                                                <span>
                                                    { new Intl.NumberFormat('ru-RU').format(this.state.originPrice) } 
                                                    <IconRuble style={{ width: 14, height: 14, fill: 'rgba(27,27,31,0.2)', marginLeft: 5 }} />
                                                </span>
                                            </div>
                                                :
                                            <div>
                                                { new Intl.NumberFormat('ru-RU').format(this.state.originPrice) } 
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

                            { this.state.originPrice != this.state.allPrice && this.state.promoST === true ?
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

class OpenBasket extends React.Component{
    _isMounted = false;
    
    constructor(props) {
        super(props);
        
        this.state = {      
            anchorEl: null,
            cartItems: [],
            originPrice: 0,
            allPrice: 0,
            sumDiv: 0,
            countCart: 0,
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
        let allCount = 0;

        newCart.map( (item) => {
            allPrice += parseInt(item.one_price) * parseInt(item.count);
            allCount += parseInt(item.count);
        } )

        newCart.map( (item, key) => {
            let this_item = allItems.find( (it) => parseInt(it.id) == parseInt(item.item_id) );

            newCart[ key ]['is_sale'] = parseInt(item.all_price) != parseInt(item.count) * parseInt(item.one_price);

            newCart[ key ]['img_new'] = this_item['img_new'];
            newCart[ key ]['img_new_update'] = this_item['img_new_update'];
            newCart[ key ]['img_app'] = this_item['img_app'];
        } )

        this.setState({
            cartItems: newCart,
            originPrice: allPrice,
            countCart: allCount
        })
        
        autorun(() => {
            if( this._isMounted ){

                let promo_st = itemsStore.getPromoStatus();

                this.setState({
                    allPrice: itemsStore.getSumDiv() + itemsStore.getAllPrice(),

                    promoText: promo_st.text,
                    promoST: promo_st.st,
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
        
                    newCart[ key ]['is_sale'] = parseInt(item.all_price) != parseInt(item.count) * parseInt(item.one_price);

                    newCart[ key ]['img_new'] = this_item['img_new'];
                    newCart[ key ]['img_new_update'] = this_item['img_new_update'];
                    newCart[ key ]['img_app'] = this_item['img_app'];
                } )

                let allPrice = itemsStore.getSumDiv();
                let allCount = 0;

                newCart.map( (item) => {
                    allPrice += parseInt(item.one_price) * parseInt(item.count);
                    allCount += parseInt(item.count);
                } )

                this.setState({
                    originPrice: allPrice,
                    cartItems: newCart,
                    sumDiv: itemsStore.getSumDiv(),
                    promoName: localStorage.getItem('promo_name') ? localStorage.getItem('promo_name') : '',
                    countCart: allCount
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
        if( Boolean(this.state.anchorEl) ){
            this.handleClose()
        }else{
            if( itemsStore.getPage() !== 'cart' ){
                this.setState({
                    //anchorEl: event.currentTarget
                    anchorEl: document.getElementById('headerNew')
                })
            }else{
                this.handleClose()
            }
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
            <div style={{ width: '12.27%', minWidth: 'max-content' }}>
                <div aria-describedby={id} style={{ width: '100%', minWidth: 'max-content' }} className={ parseInt(this.state.countCart) > 0 ? 'headerCart count' : 'headerCart'} onClick={this.handleClick.bind(this)}><span>Корзина</span>{ parseInt(this.state.countCart) > 0 ? <div>{this.state.countCart}</div> : null }</div>

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
                    style={{ zIndex: 1100 }}
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
                                                        <source 
                                                            srcSet={"https://storage.yandexcloud.net/site-img/"+item.img_app+"_276x276.webp"} 
                                                            type="image/webp" 
                                                        />
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
                                            
                                            { item.is_sale === true && this.state.promoST === true ?
                                                <td className="CellPrice2"> 
                                                    <div className="TableMiniPrice">
                                                        <div>
                                                            { new Intl.NumberFormat('ru-RU').format( parseInt(item.one_price) * parseInt(item.count) ) } 
                                                            <IconRuble style={{ width: 13, height: 13, fill: 'rgba(27, 27, 31, 0.2)', marginLeft: 5 }} />
                                                        </div>
                                                    </div>
                                                    <div className="TableMiniPrice">
                                                        { new Intl.NumberFormat('ru-RU').format(item.all_price) } 
                                                        <IconRuble style={{ width: 13, height: 13, fill: '#525252', marginLeft: 5 }} />
                                                    </div>
                                                </td>
                                                    :
                                                <td className="CellPrice"> 
                                                    <div className="TableMiniPrice">
                                                        { new Intl.NumberFormat('ru-RU').format( parseInt(item.one_price) * parseInt(item.count) ) } 
                                                        <IconRuble style={{ width: 13, height: 13, fill: '#525252', marginLeft: 5 }} />
                                                    </div>
                                                </td>
                                            }
                                            
                                        </tr>
                                            :
                                        <tr key={key}>
                                            <td className="CellPic">
                                                { item.img_app.length > 0 ? 
                                                    <picture>
                                                        <source 
                                                            srcSet={"https://storage.yandexcloud.net/site-img/"+item.img_app+"_276x276.webp"} 
                                                            type="image/webp" 
                                                        />
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
                                        { this.state.originPrice != this.state.allPrice && this.state.promoST === true ?
                                            <div className='originPrice'>
                                                <span>
                                                    { new Intl.NumberFormat('ru-RU').format(this.state.originPrice) } 
                                                    <IconRuble style={{ width: 14, height: 14, fill: 'rgba(27,27,31,0.2)', marginLeft: 5 }} />
                                                </span>
                                            </div>
                                                :
                                            <div>
                                                { new Intl.NumberFormat('ru-RU').format(this.state.originPrice) } 
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

                            { this.state.originPrice != this.state.allPrice && this.state.promoST === true ?
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

export class HeaderOld extends React.Component {
    is_load = false;
    
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
            }

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
            openLoginNew: false,
        })
    }
    
    handleClick = (event) => {
        console.log( 'anchorEl', event.currentTarget )
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
                
                <ModalCity isOpen={this.state.openCity} close={this.closeCity.bind(this)} cityList={this.state.cityList} cityName={this.state.cityName} />

                <ModalLogin isOpen={this.state.openLoginNew} close={this.closeLogin.bind(this)} />

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

export class Header extends React.Component{

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
            
            userName: '',
            token: '',
            
            soc_link: null,
            openDrawer: false,
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
            }

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
            openLoginNew: false,
        })
    }
    
    handleClick = (event) => {
        console.log( 'anchorEl', event.currentTarget )
        this.setState({
            anchorEl: event.currentTarget
        })
    };
    
    handleClose = () => {
        this.setState({
            anchorEl: null
        })
    };

    toggleDrawer(open){
        this.setState({
            openDrawer: open
        })
    };

    render(){
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

        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed" className='headerNew' id='headerNew' elevation={2} sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Toolbar>
                        <div style={{ width: '4.51%' }} />
                        <Link to={"/"} style={{ width: '14.8%' }}>
                            <img alt="Жако доставка роллов и пиццы" src={`/assets/jaco-logo.png`} style={{ width: '100%' }} />
                        </Link> 
                        <div style={{ width: '2.53%' }} />

                        {this.state.categoryItemsNew.map((item, key) => 
                            this.state.activePage == 'home' && !check ?
                                <React.Fragment key={key}>
                                    <ScrollLink 
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
                                        offset={-120} 
                                        style={{ width: '7.22%', minWidth: 'max-content' }}
                                    >
                                       <span className='headerCat' name={item.main_link} id={'link_'+item.id}>{item.name}</span>
                                    </ScrollLink>
                                    <div style={{ width: '0.36%' }} />
                                </React.Fragment>
                                    :
                                <React.Fragment key={key}>
                                    <Link to={"/"+this.state.cityName} name={item.main_link} style={{ width: '7.22%', minWidth: 'max-content', textDecoration: 'none' }} onClick={() => { typeof window !== 'undefined' ? localStorage.setItem('goTo', item.id) : {} }}>
                                        <span className='headerCat'>{item.name}</span>
                                    </Link> 
                                    <div style={{ width: '0.36%' }} />
                                </React.Fragment>
                        )}

                        

                        
                        <Link to={"/"+this.state.cityName+"/akcii"} style={{ width: '7.22%', minWidth: 'max-content', textDecoration: 'none' }}>
                            <span className={this.state.activePage == 'actii' ? 'headerCat activeCat' : 'headerCat'}>Акции</span>
                        </Link>
                        <div style={{ width: '3.25%' }} />


                        {this.state.token.length > 0 ?
                            this.state.userName.length > 0 ?
                                <Link to={"/"+this.state.cityName+"/profile"} style={{ width: '12.27%', minWidth: 'max-content', textDecoration: 'none' }} className='headerProfile'><span>{this.state.userName}</span></Link> 
                                    :
                                <Link to={"/"+this.state.cityName+"/profile"} style={{ width: '12.27%', minWidth: 'max-content', textDecoration: 'none' }} className='headerProfile'><span>Профиль</span></Link>
                                :
                            <div style={{ width: '12.27%', minWidth: 'max-content' }} className='headerProfile' onClick={this.openLogin.bind(this)}><span>Войти</span></div>
                        }
                        <div style={{ width: '0.72%' }} />

                        <OpenBasket openLogin={this.openLogin.bind(this)} />
                        <div style={{ width: '4.51%' }} />
                    </Toolbar>
                </AppBar>

                <AppBar position="fixed" className='headerNewMobile' id='headerNewMobile' elevation={2} sx={{ display: { xs: 'block', md: 'none' } }}>
                    <Toolbar>
                        <Link to={"/"}>
                            <img alt="Жако доставка роллов и пиццы" src={`/assets/Logomini.png`} style={{ height: 40 }} />
                        </Link> 

                        <React.Fragment>
                            <BurgerIcon onClick={this.toggleDrawer.bind(this, true)} />
                            <SwipeableDrawer
                                anchor={'right'}
                                open={this.state.openDrawer}
                                onClose={this.toggleDrawer.bind(this, false)}
                                onOpen={this.toggleDrawer.bind(this, true)}
                            >
                                <List className='LinkList'>
                                    <ListItem disablePadding>
                                        <Link to={"/"+this.state.cityName}>Меню</Link> 
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <Link to={"/"+this.state.cityName+"/akcii"}>Акции</Link> 
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <Link to={"/"+this.state.cityName+"/profile"}>Профиль</Link> 
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <Link to={"/"+this.state.cityName+"/contacts"}>Контакты</Link> 
                                    </ListItem>
                                </List>
                            </SwipeableDrawer>
                        </React.Fragment>
                    </Toolbar>
                </AppBar>

                

                <ModalCity isOpen={this.state.openCity} close={this.closeCity.bind(this)} cityList={this.state.cityList} cityName={this.state.cityName} />
                <ModalLogin isOpen={this.state.openLoginNew} close={this.closeLogin.bind(this)} />

                   
                
                <Box sx={{ display: { md: 'none', lg: 'none', xl: 'none' } }}>
                    <CustomBottomNavigation login={ this.openLogin.bind(this) } />
                </Box>
            </Box>
        )
    }
}