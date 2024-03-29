import React from 'react';

import Grid from '@mui/material/Grid';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';

import Typography from '@mui/material/Typography';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';

import itemsStore from '../../stores/items-store';
import config from '../../stores/config';

import TextField from '@mui/material/TextField';

import axios from 'axios';
import {Helmet} from "react-helmet";
const queryString = require('query-string');

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import AppBar from '@mui/material/AppBar';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import Checkbox from '@mui/material/Checkbox';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

import Snackbar from '@mui/material/Snackbar';
import Box from '@mui/material/Box';

import Modal from '@mui/material/Modal';

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
    
    path = path.split('/');
    path = path.filter( (item) => item != '' );
    
    return path[ 0 ];
}

function Ruble(props){
    return (
        <svg width={ props.width ? props.width : "50"} height="20" viewBox={ props.viewBox ? props.viewBox : "0 0 1500 200"} xmlns="http://www.w3.org/2000/svg">
            <g>
                <path id="svg_1" d="m219.27,252.76c63.98,-2.85 99.22,-39.48 99.22,-103.13c0,-37.42 -12.62,-65.49 -37.52,-83.44c-22.29,-16.07 -48.63,-19.21 -62.35,-19.65c-28.61,-0.92 -107.02,-0.04 -110.34,0c-5.75,0.07 -10.38,4.75 -10.38,10.5l0,174.95c-9.23,-0.11 -15.07,-0.2 -15.31,-0.21c-0.06,0 -0.11,0 -0.17,0c-5.72,0 -10.41,4.59 -10.5,10.34c-0.09,5.8 4.54,10.57 10.34,10.66c0.95,0.01 6.78,0.1 15.64,0.21l0,26.12l-15.48,0c-5.8,0 -10.5,4.7 -10.5,10.5s4.7,10.5 10.5,10.5l15.48,0l0,74.89c0,5.8 4.7,10.5 10.5,10.5s10.5,-4.7 10.5,-10.5l0,-74.9l109.39,0c5.8,0 10.5,-4.7 10.5,-10.5s-4.7,-10.5 -10.5,-10.5l-109.39,0l0,-25.88c32.67,0.31 78.53,0.51 100.37,-0.46zm-100.37,-185.33c22.81,-0.21 76.99,-0.61 99.05,0.1c23.92,0.77 79.55,10.31 79.55,82.1c0,52.17 -26.63,79.82 -79.16,82.16c-21.17,0.94 -66.91,0.74 -99.44,0.43l0,-164.79z"/>
            </g>
        </svg>
    )
}

import RoulettePro from 'react-roulette-pro';
import { useState } from 'react';

import { IconClose } from '../../stores/elements';

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

const TestApp = ({items, city_name}) => {

    const [start, setStart] = useState(false);
    const [start2, setStart2] = useState(false);
    const [prizeIndex, setPrizeIndex] = useState(0);

    const [doubleCLick, setDoubleCLick] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalText, setModalText] = useState('');
    const [modalImg, setModalImg] = useState(null);
  
    const testStart = () => {
        //const square = document.querySelector('.fon');
        //square.style.visibility = 'hidden';

        //const square1 = document.querySelector('.fon_static');
        //square1.style.visibility = 'visible';

        if( doubleCLick ){
            return;
        }

        setDoubleCLick(true);
        fetch(config.urlApi, {
            method: 'POST',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'},
            body: queryString.stringify({
                type: 'get_my_prize', 
                city_name: city_name,
                token: localStorage.getItem('token')
            })
        }).then(res => res.json()).then(json => {

            if( json.st === true ){

                let prizeIndex2 = items.findIndex( item => parseInt(item.test_id) == parseInt(json.prize) );

                setPrizeIndex( prizeIndex2 )

                //handleStart();
            }else{
                //const square = document.querySelector('.fon');
                //square.style.visibility = 'visible';

                //const square1 = document.querySelector('.fon_static');
                //square1.style.visibility = 'hidden';

                setModalText(json.text);
                setShowModal(true);
                
                setModalImg(null);
                setDoubleCLick(false);
            }
        })
        .catch(err => { });
    }

    const handleStart = () => {
        const square = document.querySelector('.fon');
        square.style.visibility = 'hidden';

        const square1 = document.querySelector('.fon_static');
        square1.style.visibility = 'visible';

        setTimeout( () => {
            setStart((prevState) => !prevState);
            setTimeout( () => {
                setStart2((prevState) => !prevState);
            }, 500 )
        }, 300 )
    };
  
    const handlePrizeDefined = () => {
        const square = document.querySelector('.fon');
        square.style.visibility = 'visible';

        const square1 = document.querySelector('.fon_static');
        square1.style.visibility = 'hidden';

        setTimeout( () => {
            setShowModal(true);
            setModalImg(items[ prizeIndex ])
            setDoubleCLick(false);

            setStart2((prevState) => !prevState);
            setStart((prevState) => !prevState);
        }, 300 )
    };
  
    return (
      <>
        {start === true ?
            <RoulettePro
                prizes={items}
                prizeIndex={prizeIndex}
                start={start2}
                onPrizeDefined={handlePrizeDefined}
                spinningTime={5}
                designOptions={{hideCenterDelimiter: true}}
            />
                :
            false
        }

        <Modal
            open={showModal}
            onClose={ () => { setShowModal(false) } }
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            className="class123"
            
        >
            <Fade in={showModal}>
                
                <Box className='modalCity'>

                    <IconButton style={{ position: 'absolute', top: -40, left: 15, backgroundColor: 'transparent' }} onClick={ () => { setShowModal(false) } }>
                        <IconClose style={{ width: 25, height: 25, fill: '#fff', color: '#fff', overflow: 'visible' }} />
                    </IconButton>

                    <div style={{ display: 'grid' }}>
                        { modalImg ? <Typography component="h5" style={{ textAlign: 'center' }}>Мы приехали — ура!<br />Получите приз, друзья:</Typography> : false }
                        
                        { modalImg ? <Typography component="h4" style={{ color: '#c03', textAlign: 'center' }}><br />Сертификат {modalImg.about}<br />{modalImg.company}</Typography> : false }
                        
                        { modalImg ? <img style={{ width: 100, height: 100, margin: '0 auto', borderRadius: 10 }} src={modalImg.image} /> : false }

                        { modalImg ? <Typography component="h4" style={{ textAlign: 'center' }}><br />Дождитесь получения заказа и скорее в личный кабинет – призовой сертификат будет ждать вас в разделе «Жакобус»!<br />Счастливого пути!</Typography> : false }

                        

                        { !modalImg ? <Typography component="h4" style={{ textAlign: 'center' }}>Жакобус скоро выезжает, — занимайте места поскорей!</Typography> : false }
                        { !modalImg ? <Typography component="h4" style={{ textAlign: 'center' }}>Участвовать в поездке может каждый, оформив заказ на 1300 рублей.</Typography> : false }
                        { !modalImg ? <Typography component="h4" style={{ textAlign: 'center' }}><a style={{ color: '#c03', border: 0 }} href='https://drive.google.com/file/d/1kuC_z3n349NBFNPSyz5qaBHOIE2STlYA/view' target='_blank'>Подробности о конкурсе</a></Typography> : false }
                    </div>

                </Box>
                
            </Fade>
        </Modal>

        <button className='START' onClick={testStart}>ПОЕХАЛИ</button>
      </>
    );
  };

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
            page: this.props.data ? this.props.data.page : null,
            city_name: this.props.city,
            
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
                {id: '2', label: 'Изменились планы', value: 0 },
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
            showOrder: null,

            items: [],
            modalMyPr: false,
            MyPr: []
        };
        
        if( typeof window !== 'undefined' ){
            
            setTimeout( () => {
                let search = window.location.search;
            
                if( search.length > 0 ){
                    
                    if(search.indexOf('orderId') > 0){
                        let order_pay = window.location.search;
                    
                        let p1 = order_pay.split('&');
                        let bank = p1[0].split('bank=');
                        bank = bank[1];
    
                        let order_id = p1[1].split('orderId=');
                        order_id = order_id[1];
                        
                        this.checkPay(bank, order_id);
                        
                        let state = { },
                            title = '',
                            url = window.location.pathname;
    
                        window.history.pushState(state, title, url)
                    }
                    
                    if(search.indexOf('trueOrder') > 0){
                        let state = { },
                            title = '',
                            url = window.location.pathname;
    
                        window.history.pushState(state, title, url)
                    }
                }
            }, 300 )
            
        }
        
        itemsStore.setCity(this.props.city);
    }
    
    componentDidMount = () => {
        if( document.querySelector('.activeCat') ){
            document.querySelector('.activeCat').classList.remove('activeCat');
        }
        window.scrollTo(0, 0);
        itemsStore.setPage('profile');
        
        setTimeout( () => {
            if( !itemsStore.getToken() ){
                window.location.pathname = '/'+this.state.city_name;
                //this.props.history.replace({ pathname: '/'+this.state.city_name+'/' });
            }
        }, 300 )
        
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
        
        setTimeout( () => {
            fetch(config.urlApi, {
                method: 'POST',
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded'},
                body: queryString.stringify({
                    type: 'get_user_web', 
                    city_id: this.state.city_name,
                    user_id: itemsStore.getToken()
                })
            }).then(res => res.json()).then(json => {
                
                let check_reload = json.orders.my_orders.filter( (item) => parseInt(item.status_order) != 6 && parseInt(item.is_delete) == 0 );
                
                this.setState({ 
                    info: json, 
                    is_load: true,
                    arr_day: arr_day,
                    userMail: json.user.mail,
                    spam: json.user.spam,
                    userName: json.user.name
                });
                
                this.generatePrize(json.items)

                if( check_reload.length > 0 ){
                    setTimeout(()=>{
                        this.loadData(json.items);
                    }, 6000)
                }
                
            })
            .catch(err => { });
        }, 300 )
    }
    
    generatePrize(items){
        items.map( (item, key) => {
            items[ key ]['image'] = "https://storage.yandexcloud.net/site-other-data/"+item.logo_src+"_512x512.webp";
        } )

        const reproductionArray = (array = [], length = 0) => [
            ...Array(length)
              .fill('_')
              .map(() => array[Math.floor(Math.random() * array.length)]),
          ];
          
          const reproducedPrizeList = [
            ...items,
            ...reproductionArray(items, items.length),
          ];
          
          const generateId = () =>
            `${Date.now().toString(36)}-${Math.random().toString(36).substring(2)}`;
          
          const prizeList = reproducedPrizeList.map((prize) => ({
            ...prize,
            id: typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : generateId(),
          }));

        if( this.state.items.length == 0 ){
            this.setState({
                items: prizeList
            })
        }
    }

    static fetchData(propsData) {
        let data = {
            type: 'get_page_info', 
            city_id: get_city(propsData),
            page: 'profile' 
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
                    all: json
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
            url: config.urlApi,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: queryString.stringify(data)
        }).then(response => {
            if(response['status'] === 200){
                var json = response['data'];
                
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
                            this.props.history.push(window.location.pathname);
                            
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
        fetch(config.urlApi, {
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
        
        fetch(config.urlApi, {
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
        fetch(config.urlApi, {
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
            
            fetch(config.urlApi, {
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
                    fetch(config.urlApi, {
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
        fetch(config.urlApi, {
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
        
        fetch(config.urlApi, {
            method: 'POST',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'},
            body: queryString.stringify({
                type: 'get_order', 
                order_id: order_id,
                point_id: point_id
            })
        }).then(res => res.json()).then(json => {
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
            fetch(config.urlApi, {
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
                setTimeout(() => {
                    if( json['st'] ){
                        this.setState({
                            openMSG: true,
                            statusMSG: true,
                            textMSG: "Данные успешно обновлены",
                            
                            delOrder: false,
                            openDialog: false,
                            showItem: null,
                        });
                        
                        this.loadData();
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
            orderAddr: parseInt(this.state.showOrder.order.type_order_) == 1 ? this.state.showOrder.street.name : null,
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
    
    logOut(){
        localStorage.removeItem('token');
        window.location.pathname = '/'+this.state.city_name;
    }
    
    getMyPrize(){
        fetch(config.urlApi, {
            method: 'POST',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'},
            body: queryString.stringify({
                type: 'getMyPrize', 
                token: itemsStore.getToken()
            })
        }).then(res => res.json()).then(json => {
            
            this.setState({
                MyPr: json,
                modalMyPr: true
            })
            
        })
        .catch(err => { });
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
                        <Tabs value={this.state.valueTab} onChange={this.changeTab.bind(this)} aria-label="simple tabs example" className='abv3334'  style={{ justifyContent: 'center' }} scrollButtons={false} variant="scrollable">
                            <Tab label="Промокоды" {...a11yProps(0)} disableRipple={true} />
                            <Tab label="Заказы" {...a11yProps(1)} disableRipple={true} />
                            <Tab label="Редактирование" {...a11yProps(2)} disableRipple={true} />
                            
                        </Tabs>
                    </AppBar>
                    <TabPanel value={this.state.valueTab} index={0} style={{ width: '100%' }}>
                        <div style={{ padding: 12 }}>
                            {this.state.info.promo ?
                                <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
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
                                </Box>
                                    :
                                null
                            }
                            {this.state.info.promo ?
                                <Box sx={{ display: { xs: 'block', lg: 'none' } }}>
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
                                                                <Button variant="contained" className="BtnCardMain CardInCardItem" style={{ width: '100%' }}>Применить промокод</Button>
                                                            </ButtonGroup>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </Box>
                                    :
                                null
                            }
                        </div>
                    </TabPanel>
                    <TabPanel value={this.state.valueTab} index={1} style={{ width: '100%' }}>

                        <div style={{ marginTop: 20, marginBottom: 20 }} className='dis_none'>
                            <Button variant="contained" className='btnMyPrize' onClick={ () => { this.setState({ valueTab: 3 }) } }>Прокатиться в Жакобусе</Button>
                        </div>

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
                                                <Typography variant="h5" component="span" className="CardPriceItem" style={{ flex: 1 }}>{item.sum} <Ruble width="20" viewBox="0 0 700 300" /></Typography>
                                                <Typography variant="h5" component="span" style={{ flex: 1 }}>{parseInt(item.is_delete) == 1 ? <CloseIcon style={{ position: 'relative', top: 3 }} /> : parseInt(item.status_order) == 6 ? <CheckIcon style={{ position: 'relative', top: 3 }} /> : null}</Typography>
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
                                                    { item.time_to_client == 0 ? null :
                                                        <div>
                                                            <Typography variant="h5" component="span">{ parseInt(item.type_order) == 1 ? 'Заказ привезут до: ' : 'Ориентировочное время готовности заказа: ' }{item.time_to_client}</Typography>
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
                                        size="small"
                                    />
                                    <TextField 
                                        InputProps={{ readOnly: true }} 
                                        label="Номер телефона" 
                                        value={this.state.info.user.login} 
                                        className="input" 
                                        size="small"
                                    />
                                </form>
                                <form noValidate autoComplete="off">
                                    {this.state.info.user.date_bir != '' ?
                                        <TextField 
                                            label="Дата рождения" 
                                            className="input" 
                                            InputProps={{ readOnly: true }} 
                                            value={this.state.info.user.date_bir} 
                                            size="small"
                                        />
                                            :
                                        <div className="input">
                                            <InputLabel className="otherLabel" size="small">Дата рождения</InputLabel>
                                            
                                            <FormControl className="ChangeDay">
                                                <Select
                                                    size="small"
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
                                                  size="small"
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
                                        label="E-mail" 
                                        className="input" 
                                        value={this.state.userMail} 
                                        onChange={this.changeMail.bind(this)} 
                                        onBlur={this.saveMail.bind(this)}
                                        size="small"
                                    />
                                </form>
                                
                                <FormGroup row className="input checkbox">
                                    <FormControlLabel 
                                        onChange={this.changeCheck.bind(this)} 
                                        control={
                                            <Checkbox 
                                                checked={ parseInt(this.state.spam) == 1 ? true : false } 
                                                name="checkedC" 
                                                sx={{
                                                    '&.Mui-checked': {
                                                        color: '#c03',
                                                    },
                                                }}
                                            />} 
                                        label="Получать сообщения с акциями" 
                                    />
                                </FormGroup>
                                
                                <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="BtnBorder" onClick={this.logOut.bind(this)}>
                                    <Button variant="contained" className="BtnCardMain CardInCardItem">Выйти</Button>
                                </ButtonGroup>
                            </div>
                                :
                            null
                        }
                    </TabPanel>
                    <TabPanel value={this.state.valueTab} index={3} style={{ width: '100%', height: 800 }}>

                        <div style={{ marginTop: 20, marginBottom: 20 }}>
                            <Button variant="contained" className='btnMyPrize' onClick={ this.getMyPrize.bind(this) }>Мои призы</Button>
                        </div>

                        <div className={'abv'}>
                            <img className='fon' src='https://jacochef.ru/src/img/test/test35464.png' />
                            <img className='fon_static' src='https://jacochef.ru/src/img/test/test.gif' />
                            <img className='fonBus' src='https://jacochef.ru/src/img/test/test3.png' />
                            
                            <div className='shadowright' />
                            <div className='shadowleft' />

                            <div className='otherDiv dis_none'>
                                { this.state.items.length == 0 ? false :
                                    <TestApp items={this.state.items} city_name={this.state.city_name} />
                                }
                            </div>
                        </div>
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
                        <DialogTitle disableTypography style={{ margin: 0, padding: 8 }}>
                            <Typography variant="h6">Заказ {this.state.showOrder.order.order_id}</Typography>
                          
                            <IconButton aria-label="close" style={{ position: 'absolute', top: 0, right: 0, color: '#000' }} onClick={this.closeDialog.bind(this)}>
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        
                        <DialogContent className="showOrderDialogContent">
                            <Typography variant="h6" component="span">{this.state.showOrder.order.type_order}: {this.state.showOrder.order.type_order_addr_new}</Typography>
                            <Typography variant="h6" component="span">{this.state.showOrder.order.time_order_name}: {this.state.showOrder.order.time_order}</Typography>
                            <Typography variant="h6" component="span">Статус заказа: {this.state.showOrder.order.this_status_order}</Typography>
                            { parseInt(this.state.showOrder.order.is_preorder) == 1 ? null :
                                <Typography variant="h6" component="span">{this.state.showOrder.order.text_time}{this.state.showOrder.order.time_to_client}</Typography>
                            }
                            { this.state.showOrder.order.promo_name == null || this.state.showOrder.order.promo_name.length == 0 ? null :
                                <Typography variant="h6" component="span">Промокод: {this.state.showOrder.order.promo_name}</Typography>
                            }
                            { this.state.showOrder.order.promo_name == null || this.state.showOrder.order.promo_name.length == 0 ? null :
                                <Typography variant="h6" component="span" className="noSpace">{this.state.showOrder.order.promo_text}</Typography>
                            }
                            { this.state.showOrder.order.sdacha == null || this.state.showOrder.order.sdacha.length == 0 || this.state.showOrder.order.sdacha == 0 ? null :
                                <Typography variant="h6" component="span">Сдача с: {this.state.showOrder.order.sdacha}</Typography>
                            }
                            <Typography variant="h5" component="span" className="CardPriceItem">Сумма закза: {this.state.showOrder.order.sum_order} <Ruble width="20" viewBox="0 0 700 300" /></Typography>
                            
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
                            
                        </DialogContent>
                        
                        { parseInt( this.state.showOrder.order.is_delete ) == 0 && parseInt( this.state.showOrder.order.status_order ) !== 6 ? 
                            <DialogActions style={{ justifyContent: 'flex-end', padding: '15px 0px' }}>
                                <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="BtnBorderOther" style={{ marginRight: 24 }}>
                                    <Button variant="contained" className="BtnCardMain CardInCardItem" onClick={ this.closeOrder.bind(this, this.state.showOrder.order.order_id, this.state.showOrder.order.point_id) }>Отменить заказ</Button>
                                </ButtonGroup>
                            </DialogActions>
                                :
                            null
                        }
                        { parseInt( this.state.showOrder.order.is_delete ) == 1 || parseInt( this.state.showOrder.order.status_order ) == 6 ? 
                            <DialogActions style={{ justifyContent: 'flex-end', padding: '15px 0px' }}>
                                <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="BtnBorderOther" style={{ marginRight: 24 }}>
                                    <Button variant="contained" className="BtnCardMain CardInCardItem" onClick={ this.repeatOrder.bind(this, this.state.showOrder.order.order_id, this.state.showOrder.order.point_id) }>Повторить заказ</Button>
                                </ButtonGroup>
                            </DialogActions>
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
                                    <FormControlLabel 
                                        key={key} 
                                        value={item.id} 
                                        control={ <Radio sx={{ '&.Mui-checked': { color: '#c03', }, }} /> } 
                                        label={item.label} />
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
                    <DialogActions style={{ paddingBottom: 24 }}>
                        <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="BtnBorderOther" style={{ marginRight: 24 }}>
                            <Button variant="contained" className="BtnCardMain CardInCardItem" onClick={() => { this.setState({delOrder: false}) }}>К заказу</Button>
                        </ButtonGroup>
                        <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="BtnBorderOther" style={{ marginRight: 24 }}>
                            <Button variant="contained" className="BtnCardMain CardInCardItem" onClick={this.closeOrderTrue.bind(this)}>Отменить заказ</Button>
                        </ButtonGroup>
                    </DialogActions>
                </Dialog>


                <Modal
                    open={this.state.modalMyPr}
                    onClose={() => { this.setState({modalMyPr: false}) }}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                    className="class123 modalMyPr"
                    maxWidth={'md'}
                    fullWidth={true}
                >
                    
                    <Fade in={this.state.modalMyPr}>
                        
                        <Box className='modalCity'>
                            <DialogTitle>Список выигранных призов</DialogTitle>

                            <IconButton style={{ position: 'absolute', top: -40, left: 15, backgroundColor: 'transparent' }} onClick={() => { this.setState({modalMyPr: false}) }}>
                                <IconClose style={{ width: 25, height: 25, fill: '#fff', color: '#fff', overflow: 'visible' }} />
                            </IconButton>

                            <table>
                                <tbody>
                                    { this.state.MyPr.map( (item, key) =>
                                        <tr key={key} style={{ minHeight: 60 }}>
                                            <td style={{ padding: 10 }}>{item.company} Сертификат {item.about}</td>
                                            
                                            <td style={{ padding: 10 }}>{item.cert_img.length > 0 ? <a href={'https://storage.yandexcloud.net/site-prize/'+item.cert_img} target='_blank' style={{ borderWidth: 0, color: '#c03' }}>скачать</a> : 'Будет доступен после завершения заказа'}</td>
                                        </tr>
                                    ) }
                                    
                                    <tr style={{ minHeight: 60 }}>
                                        <td style={{ padding: 10, paddingTop: 50 }}><a href={'https://drive.google.com/file/d/1kuC_z3n349NBFNPSyz5qaBHOIE2STlYA/view'} target='_blank' style={{ borderWidth: 0, color: '#c03' }}>Полные правила розыгрыша</a></td>
                                    </tr>
                                </tbody>
                            </table>

                        </Box>
                        
                    </Fade>
                </Modal>

                
            </Grid>
        )
    }
}