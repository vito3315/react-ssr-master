import React from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faPlus, faMinus, faRubleSign, faCreditCard, faMoneyBill, faCashRegister } from '@fortawesome/free-solid-svg-icons'

import Hidden from '@material-ui/core/Hidden';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';

import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';


import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import { blue } from '@material-ui/core/colors';

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
            count: 0,
            onePrice: 0,
            allPrice: 0
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
                let this_item = new_cartItems.find( (item) => item.item_id == this.state.item.id );
            
                if( this_item ){
                    this.setState({
                        count: this_item.count,
                        onePrice: this_item.one_price,
                        allPrice: this_item.all_price,
                    })
                }else{
                    this.setState({
                        count: 0,
                        onePrice: 0,
                        allPrice: 0,
                    })
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
                <tr>
                    <td style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <img src={"https://newjacofood.ru/src/img/items/"+this.state.item.img+'?'+this.state.item.imgUpdate} />
                    
                        <div>
                            <Typography variant="h5" component="span" className="nameItem">{this.state.item.name}</Typography>
                            <Typography variant="h5" component="span" className="descItem">{this.state.item.desc}</Typography>
                        </div>
                    </td>
                    <td>
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
                    </td>
                    <td>
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
            count: 0,
            onePrice: 0,
            allPrice: 0
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
                let this_item = new_cartItems.find( (item) => item.item_id == this.state.item.id );
            
                if( this_item ){
                    this.setState({
                        count: this_item.count,
                        onePrice: this_item.one_price,
                        allPrice: this_item.all_price,
                    })
                }else{
                    this.setState({
                        count: 0,
                        onePrice: 0,
                        allPrice: 0,
                    })
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
                    <div>
                        <Typography variant="h5" component="span">{this.state.item.name}</Typography>
                        <div>
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

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
    { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
    { title: 'Casablanca', year: 1942 },
    { title: 'City Lights', year: 1931 },
    { title: 'Psycho', year: 1960 },
    { title: 'The Green Mile', year: 1999 },
    { title: 'The Intouchables', year: 2011 },
    { title: 'Modern Times', year: 1936 },
    { title: 'Raiders of the Lost Ark', year: 1981 },
    { title: 'Rear Window', year: 1954 },
    { title: 'The Pianist', year: 2002 },
    { title: 'The Departed', year: 2006 },
    { title: 'Terminator 2: Judgment Day', year: 1991 },
    { title: 'Back to the Future', year: 1985 },
    { title: 'Whiplash', year: 2014 },
    { title: 'Gladiator', year: 2000 },
    { title: 'Memento', year: 2000 },
    { title: 'The Prestige', year: 2006 },
    { title: 'The Lion King', year: 1994 },
    { title: 'Apocalypse Now', year: 1979 },
    { title: 'Alien', year: 1979 },
    { title: 'Sunset Boulevard', year: 1950 },
    { title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb', year: 1964 },
    { title: 'The Great Dictator', year: 1940 },
    { title: 'Cinema Paradiso', year: 1988 },
    { title: 'The Lives of Others', year: 2006 },
    { title: 'Grave of the Fireflies', year: 1988 },
    { title: 'Paths of Glory', year: 1957 },
    { title: 'Django Unchained', year: 2012 },
    { title: 'The Shining', year: 1980 },
    { title: 'WALL·E', year: 2008 },
    { title: 'American Beauty', year: 1999 },
    { title: 'The Dark Knight Rises', year: 2012 },
    { title: 'Princess Mononoke', year: 1997 },
    { title: 'Aliens', year: 1986 },
    { title: 'Oldboy', year: 2003 },
    { title: 'Once Upon a Time in America', year: 1984 },
    { title: 'Witness for the Prosecution', year: 1957 },
    { title: 'Das Boot', year: 1981 },
    { title: 'Citizen Kane', year: 1941 },
    { title: 'North by Northwest', year: 1959 },
    { title: 'Vertigo', year: 1958 },
    { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
    { title: 'Reservoir Dogs', year: 1992 },
    { title: 'Braveheart', year: 1995 },
    { title: 'M', year: 1931 },
    { title: 'Requiem for a Dream', year: 2000 },
    { title: 'Amélie', year: 2001 },
    { title: 'A Clockwork Orange', year: 1971 },
    { title: 'Like Stars on Earth', year: 2007 },
    { title: 'Taxi Driver', year: 1976 },
    { title: 'Lawrence of Arabia', year: 1962 },
    { title: 'Double Indemnity', year: 1944 },
    { title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
    { title: 'Amadeus', year: 1984 },
    { title: 'To Kill a Mockingbird', year: 1962 },
    { title: 'Toy Story 3', year: 2010 },
    { title: 'Logan', year: 2017 },
    { title: 'Full Metal Jacket', year: 1987 },
    { title: 'Dangal', year: 2016 },
    { title: 'The Sting', year: 1973 },
    { title: '2001: A Space Odyssey', year: 1968 },
    { title: "Singin' in the Rain", year: 1952 },
    { title: 'Toy Story', year: 1995 },
    { title: 'Bicycle Thieves', year: 1948 },
    { title: 'The Kid', year: 1921 },
    { title: 'Inglourious Basterds', year: 2009 },
    { title: 'Snatch', year: 2000 },
    { title: '3 Idiots', year: 2009 },
    { title: 'Monty Python and the Holy Grail', year: 1975 },
  ];

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
            
            timePred: [],
            
            error: {
                title: '', 
                text: ''
            },
            errorOpen: false,
            orderCheck: false,
            
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
                        orderAddr: cartData.orderAddr,
                        orderPic: cartData.orderPic,
                        orderComment: cartData.orderComment,
                        
                        orderTimes: cartData.orderTimes,
                        orderPredDay: cartData.orderPredDay,
                        orderPredTime: cartData.orderPredTime,                
                        
                        orderPay: cartData.orderPay,
                        orderSdacha: cartData.orderSdacha
                    })
                    
                    if( cartData.orderPredDay != '' ){
                        setTimeout(() => {
                            this.loadTimePred();   
                        }, 300)
                    }
                    
                    setTimeout(() => {
                        if( parseInt( cartData.orderType ) == 1 && parseInt( cartData.orderPic ) > 0 ){
                            this.choosePic(cartData.orderPic);
                        }
                    }, 300)
                    
                    if( cartData.orderType == 0 && cartData.orderAddr && cartData.orderAddr.id ){
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
                                    renderPay: this.state.pays.dev,
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
                
                let cartItems_new = [];
                
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
                
                this.setState({
                    cartItems_dop: []
                })
                
                this.setState({
                    cartItems_dop: dop_new,
                })
                
                this.setState({
                    cartItems_main: main,
                    cartItems_need_dop: need_dop,
                    
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
                    renderPay: this.state.pays.dev,
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
        let thisitem = this.state.my_addr.filter( (item) => item.id == event.target.value )[0];
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
        
        this.setState({
            orderAddr: thisitem,
            chooseAddr: false
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
                    renderPay: this.state.pays.dev,
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
            itemsStore.setPromo( JSON.stringify(json), this.state.orderPromo );
            let check_promo = itemsStore.checkPromo();
              
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
                    renderPay: this.state.pays.dev,
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
                                <AccordionDetails>
                                    <Autocomplete
                                        id="combo-box-demo"
                                        options={top100Films}
                                        getOptionLabel={(option) => option.title}
                                        style={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
                                    />
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
                                        <CartItem key={key} item={item} />
                                    )}
                                    <tr className="rowAboutDop">
                                        <td colSpan='3'>
                                            <Typography gutterBottom variant="h5" component="span" className="">Соевый соус, имбирь и васаби приобретаются отдельно!</Typography>
                                            <br />
                                            <Typography gutterBottom variant="h5" component="span" className="">Не забудь добавить нужные позиции в корзину.</Typography>
                                        </td>
                                    </tr>
                                    {this.state.cartItems_dop.map((item, key) =>
                                        <CartItem key={key} item={item} />
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
                                    <CartItemMobile key={key} item={item} />
                                )}
                                
                                <div className="boxItem rowAboutDop">
                                    <Typography gutterBottom variant="h5" component="span" className="">Соевый соус, имбирь и васаби приобретаются отдельно!</Typography>
                                    <br />
                                    <Typography gutterBottom variant="h5" component="span" className="">Не забудьте добавить нужные позиции в корзину.</Typography>
                                </div>
                                
                                {this.state.cartItems_dop.map((item, key) =>
                                    <CartItemMobile key={key} item={item} />
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
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{this.state.error.title}</DialogTitle>
                    <FontAwesomeIcon className="closeDialog" onClick={() => this.setState({ errorOpen: false })} icon={faTimes}/>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">{this.state.error.text}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({ errorOpen: false })} color="primary">Хорошо</Button>
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