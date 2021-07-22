import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRubleSign, faInfoCircle, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import Popover from '@material-ui/core/Popover';
import Hidden from '@material-ui/core/Hidden';
import { autorun } from "mobx"
import itemsStore from '../../stores/items-store';
import config from '../../stores/config';

import Box from '@material-ui/core/Box';

import {Helmet} from "react-helmet";
const queryString = require('query-string');
import axios from 'axios';

import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function Ruble(props){
    return (
        <svg width={ props.width ? props.width : "50"} height="20" viewBox={ props.viewBox ? props.viewBox : "0 0 1500 300"} xmlns="http://www.w3.org/2000/svg">
            <g>
                <path id="svg_1" d="m219.27,252.76c63.98,-2.85 99.22,-39.48 99.22,-103.13c0,-37.42 -12.62,-65.49 -37.52,-83.44c-22.29,-16.07 -48.63,-19.21 -62.35,-19.65c-28.61,-0.92 -107.02,-0.04 -110.34,0c-5.75,0.07 -10.38,4.75 -10.38,10.5l0,174.95c-9.23,-0.11 -15.07,-0.2 -15.31,-0.21c-0.06,0 -0.11,0 -0.17,0c-5.72,0 -10.41,4.59 -10.5,10.34c-0.09,5.8 4.54,10.57 10.34,10.66c0.95,0.01 6.78,0.1 15.64,0.21l0,26.12l-15.48,0c-5.8,0 -10.5,4.7 -10.5,10.5s4.7,10.5 10.5,10.5l15.48,0l0,74.89c0,5.8 4.7,10.5 10.5,10.5s10.5,-4.7 10.5,-10.5l0,-74.9l109.39,0c5.8,0 10.5,-4.7 10.5,-10.5s-4.7,-10.5 -10.5,-10.5l-109.39,0l0,-25.88c32.67,0.31 78.53,0.51 100.37,-0.46zm-100.37,-185.33c22.81,-0.21 76.99,-0.61 99.05,0.1c23.92,0.77 79.55,10.31 79.55,82.1c0,52.17 -26.63,79.82 -79.16,82.16c-21.17,0.94 -66.91,0.74 -99.44,0.43l0,-164.79z"/>
            </g>
        </svg>
    )
}

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

function get_city(path){
    
    path = path.split('/');
    path = path.filter( (item) => item != '' );
    
    return path[ 0 ];
}

function get_item(path){
    
    path = path.split('/');
    path = path.filter( (item) => item != '' );
    
    return path[ path.length - 1 ];
}

function ItemInfoPopover(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'ItemInfoPopover' : undefined;

    if( props.items.length == 0 ){
        return null;
    }

    return (
        <div>
            <IconButton aria-describedby={id} edge="start" color="inherit" aria-label="menu" onClick={handleClick}>
                <FontAwesomeIcon icon={faInfoCircle} style={{ fontSize: '1.2rem' }} />
            </IconButton>
      
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <div className={props.items.length == 1 ? 'MainItemPopover MainItemPopoverOne' : 'MainItemPopover MainItemPopoverLot'}>
                    <table>
                        <tbody>
                            <tr>
                                <td><Typography variant="h5" className="OtherMiniPopover" component="span">Пищевая ценность на 100 г</Typography></td>
                            </tr>
                            {props.items.map((item, key) => 
                                <tr key={key}>
                                    <td>
                                        <div className="NamePopover">
                                            <Typography variant="h5" component="span">{item.name}</Typography>
                                        </div>
                                        <div className="OtherPopover">
                                            <Typography variant="h5" component="span">Белки:</Typography>
                                            <Typography variant="h5" component="span">{item.protein} г</Typography>
                                        </div>
                                        <div className="OtherPopover">
                                            <Typography variant="h5" component="span">Жиры:</Typography>
                                            <Typography variant="h5" component="span">{item.fat} г</Typography>
                                        </div>
                                        <div className="OtherPopover">
                                            <Typography variant="h5" component="span">Углеводы:</Typography>
                                            <Typography variant="h5" component="span">{item.carbohydrates} г</Typography>
                                        </div>
                                        <div className="OtherPopover">
                                            <Typography variant="h5" component="span">Энерг. ценность:</Typography>
                                            <Typography variant="h5" component="span">{item.kkal} ккал</Typography>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    
                </div>
            </Popover>
        </div>
    );
}

export class Item extends React.Component {
    _isMounted = false;
    swiper = null;
    
    startMove = 0;
    
    constructor(props) {
        super(props);
        
        this.state = {      
            item: this.props.item ? this.props.item : [],  
            is_load: false,
            count: 0,
            city_name: !this.props.item ? this.props.city : '',
            itemLink: !this.props.item ? this.props.linkItem : '',
            title: this.props.data ? this.props.data.title : '',
            description: this.props.data ? this.props.data.description : '',
            itemTab: 0
        };
        
        if( !this.props.item ){
            itemsStore.setCity(this.props.city);
        }
    }
    
    static fetchData(propsData) {
        let data = {
            type: 'get_page_info', 
            city_id: get_city(propsData),
            item: get_item(propsData),
            page: 'item' 
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
    
    componentWillUnmount(){
        this._isMounted = false; 
    }
    
    componentDidMount(){
        this._isMounted = true; 
        
        autorun(() => {
            if( this._isMounted ){
                let item = itemsStore.getAllItems().find( (item) => item.link == this.state.itemLink );
                
                if( item ){
                    this.setState({
                        item: item
                    })
                    
                    if( item.items.length == 0 && (parseInt(item.type) !== 3 && parseInt(item.type) !== 4) ){
                        if( parseFloat(item.kkal) == 0 && parseFloat(item.protein) == 0 && parseFloat(item.fat) == 0 && parseFloat(item.carbohydrates) == 0 ){
                            
                        }else{
                            item.items.push({
                                kkal: item.kkal,
                                protein: item.protein,
                                fat: item.fat,
                                carbohydrates: item.carbohydrates,
                                name: ''
                            })
                        }
                    }
                    
                    this.setState({ 
                        is_load: true,
                    });
                    
                    let my_cart = itemsStore.getItems();
                    
                    let item_cart = my_cart.filter( (item) => item.item_id == item['id'] )[0];
              
                    this.setState({ 
                        count: item_cart ? item_cart.count : 0,
                    })
                }
            }
        })
        
        if( this.props.item ){
            
            /*Item.fetchData('/'+this.state.city_name+'/menu/'+this.state.itemLink).then( data => {
                this.setState( {
                    title: data.page.title,
                    description: data.page.description,
                } );
            } );*/
            
            if( this.state.item.items && this.state.item.items.length == 0 && (parseInt(this.state.item.type) !== 3 && parseInt(this.state.item.type) !== 4) ){
                this.state.item.items.push({
                    kkal: this.state.item.kkal,
                    protein: this.state.item.protein,
                    fat: this.state.item.fat,
                    carbohydrates: this.state.item.carbohydrates,
                    name: ''
                })
            }
            
            this.setState({ 
                is_load: true,
            });
            
            let my_cart = itemsStore.getItems();
            let item = my_cart.find( (item) => item.item_id == this.state.item['id'] );
      
            this.setState({ 
                count: item ? item.count : 0,
            })
        }
        
        if( !this.props.item ){
            if( document.querySelector('.activeCat') ){
                document.querySelector('.activeCat').classList.remove('activeCat');
            }
            window.scrollTo(0, 0);
            itemsStore.setPage('item');
        }
    }
    
    add(){
        let count = itemsStore.AddItem(this.state.item['id']);
        this.setState({ count: count })
    }
    
    minus(){
        let count = itemsStore.MinusItem(this.state.item['id']);
        this.setState({ count: count })
    }
    
    changeTab = (event, newValue) => {
        this.setState({
            itemTab: newValue
        })
    }
    
    render() {
        /*if(!this.state.is_load){
            return (
                <Grid container spacing={3} className="MainItem mainContainer">
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ width: 200, height: 30, backgroundColor: '#e5e5e5' }} />
                    </Grid>
                    <Grid item xs={6}>
                        <div style={{ width: 400, height: 400, backgroundColor: '#e5e5e5' }} />
                    </Grid>
                    <Grid item xs={6}>
                        <div style={{ width: 500, height: 60, backgroundColor: '#e5e5e5' }} />
                        <div style={{ width: 500, height: 30, backgroundColor: '#e5e5e5' }} />
                        <div style={{ width: 500, height: 30, backgroundColor: '#e5e5e5' }} />
                    </Grid>
                </Grid>
            )
        }*/
        
        return (
            <div>
                <Helmet>
                    <title>{this.state.title}</title>
                    <meta name="description" content={this.state.description} />
                </Helmet>
                
                <Box component="div" className="pcItem" >
                    <Grid container className="MainItem mainContainer" style={{ paddingLeft: '6%', paddingRight: '6%' }}>
                        <Grid item xs={6} style={{ paddingRight: 12, display: 'flex', alignItems: 'center', paddingTop: 60 }}>
                            <picture>
                                <source 
                                    srcSet={"https://storage.yandexcloud.net/site-img/"+this.state.item.img_new+"600х400.webp?"+this.state.item.img_new_update} 
                                    type="image/webp" 
                                />
                                <img 
                                    src={"https://storage.yandexcloud.net/site-img/"+this.state.item.img_new+"600х400.jpg?"+this.state.item.img_new_update} 
                                    alt={this.state.item.name}
                                    title={this.state.item.name}
                                    style={{ minHeight: 150 }}
                                />
                            </picture>
                        </Grid>
                        <Grid item xs={6} style={{ paddingLeft: 12, position: 'relative' }}>
                            <Typography variant="h5" component="h1">{this.state.item.name}</Typography>
                            <Typography variant="h5" className="OtherMiniPopover" component="span">{this.state.item.info_weight}</Typography>
                            
                            <AppBar position="static" style={{ backgroundColor: '#fff', color: '#000', zIndex: 0, paddingTop: 10 }} elevation={0}>
                                <Tabs aria-label="simple tabs example" className="itemTabs" value={this.state.itemTab} onChange={this.changeTab.bind(this)} style={{ justifyContent: 'center' }}>
                                    <Tab label="Состав" {...a11yProps(0)} disableRipple={true} />
                                    {this.state.item.items && this.state.item.items.length == 0 ? null :
                                        <Tab label="Пищевая ценность" {...a11yProps(1)} disableRipple={true} />
                                    }
                                </Tabs>
                            </AppBar>
                            <TabPanel value={this.state.itemTab} index={1} style={{ width: '100%', marginTop: 10, marginBottom: 15 }}>
                                <div style={{ maxHeight: 250, overflow: 'auto' }} className={this.state.item.items && this.state.item.items.length == 1 ? 'MainItemPopover tab MainItemPopoverOne' : 'MainItemPopover tab MainItemPopoverLot'}>
                                    <table>
                                        <tbody>
                                            
                                            <tr>
                                                <td><Typography variant="h5" className="OtherMiniPopover" component="span">Пищевая ценность на 100 г</Typography></td>
                                            </tr>
                                            {this.state.item.items && this.state.item.items.map((item, key) => 
                                                <tr key={key}>
                                                    <td>
                                                        <div className="NamePopover">
                                                            <Typography variant="h5" component="span">{item.name}</Typography>
                                                        </div>
                                                        <div className="OtherPopover">
                                                            <Typography variant="h5" component="span">Белки:</Typography>
                                                            <Typography variant="h5" component="span">{item.protein} г</Typography>
                                                        </div>
                                                        <div className="OtherPopover">
                                                            <Typography variant="h5" component="span">Жиры:</Typography>
                                                            <Typography variant="h5" component="span">{item.fat} г</Typography>
                                                        </div>
                                                        <div className="OtherPopover">
                                                            <Typography variant="h5" component="span">Углеводы:</Typography>
                                                            <Typography variant="h5" component="span">{item.carbohydrates} г</Typography>
                                                        </div>
                                                        <div className="OtherPopover">
                                                            <Typography variant="h5" component="span">Энерг. ценность:</Typography>
                                                            <Typography variant="h5" component="span">{item.kkal} ккал</Typography>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </TabPanel>
                            <TabPanel value={this.state.itemTab} index={0} style={{ marginTop: 10, marginBottom: 15 }}>
                                { this.state.item.items && this.state.item.items.length > 1 ?
                                    <div style={{ maxHeight: 300, overflowY: 'auto', overflowX: 'hidden' }}>
                                        {this.state.item.items && this.state.item.items.map((item, key) =>
                                            <div key={key} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', position: 'relative' }}>
                                                <picture style={{ height: 'auto', width: 100, display: 'table' }}>
                                                    <source 
                                                        srcSet={"https://storage.yandexcloud.net/site-img/"+item.img_new+"300х200.webp?"+item.img_new_update} 
                                                        type="image/webp" 
                                                    />
                                                    <img 
                                                        src={"https://storage.yandexcloud.net/site-img/"+item.img_new+"300х200.jpg?"+item.img_new_update} 
                                                        alt={item.name}
                                                        title={item.name}
                                                        style={{ height: 'auto', width: 65 }}
                                                    />
                                                </picture>
                                                <div className="itemMiniText">
                                                    <Typography variant="h5" component="span" className="dopItemName">{item.name}</Typography>
                                                    <Typography variant="h5" component="span" className="ItemDesc">{item.tmp_desc}</Typography>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                        :
                                    <Typography gutterBottom variant="h5" component="span" className="ItemDesc">{this.state.item.tmp_desc}</Typography>
                                }
                            </TabPanel>
                            
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: -30, width: '65%' }}>
                                
                                <div className="newBTN" onClick={this.add.bind(this)}>
                                    <Typography variant="h5" component="span" className="ItemPriceValue" style={{ paddingLeft: 5, paddingBottom: 2 }}>{ parseInt(this.state.count) == 0 ? parseInt(this.state.item.price) : parseInt(this.state.item.price) * parseInt(this.state.count) }</Typography>
                                    <Ruble viewBox="0 0 600 300" width="20" />
                                     
                                    <ShoppingCartOutlinedIcon color='inherit'  />
                                </div>
                                
                                { false && this.state.count == 0 ?
                                    <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="BtnBorder fohover">
                                        <Button variant="contained" className="BtnCardMain CardInCardItem NONHOVERED" onClick={this.add.bind(this)}>
                                            <ShoppingCartOutlinedIcon color='inherit'  />
                                        </Button>
                                        <Button variant="contained" className="BtnCardMain CardInCardItem HOVERED" onClick={this.add.bind(this)}>В корзину</Button>
                                    </ButtonGroup>
                                        :
                                    <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="BtnBorder count" style={{ border: 'none' }}>
                                        <Button variant="contained" className="BtnCardMain" onClick={this.minus.bind(this)}>
                                            <FontAwesomeIcon icon={faMinus} style={{ fontSize: '1rem' }} />
                                        </Button>
                                        <Button variant="contained" className="BtnCardMain" >
                                            <Typography component="span" className="CardCountItem" style={{ fontSize: '1.2rem' }}>{this.state.count}</Typography>
                                        </Button>
                                        <Button variant="contained" className="BtnCardMain" onClick={this.add.bind(this)}> 
                                            <FontAwesomeIcon icon={faPlus} style={{ fontSize: '1rem' }} />
                                        </Button>
                                    </ButtonGroup>
                                }
                            </div>
                        </Grid>
                    </Grid>
                </Box>
                
                <Hidden smUp>
                    <Grid container className="MainItem mainContainer" style={{ paddingLeft: '4%', paddingRight: '4%', height: '100vh' }}>
                        <Grid item xs={12} style={{ paddingRight: 12 }}>
                            <picture id="forSwiper">
                                <source 
                                    srcSet={"https://storage.yandexcloud.net/site-img/"+this.state.item.img_new+"600х400.webp?"+this.state.item.img_new_update} 
                                    type="image/webp" 
                                />
                                <img 
                                    src={"https://storage.yandexcloud.net/site-img/"+this.state.item.img_new+"600х400.jpg?"+this.state.item.img_new_update} 
                                    alt={this.state.item.name}
                                    title={this.state.item.name}
                                    style={{ height: 'auto', width: '100%', paddingTop: 20 }}
                                />
                            </picture>
                            
                            <Typography variant="h5" component="h1" style={{ textAlign: 'center' }}>{this.state.item.name}</Typography>
                        </Grid>
                        <Grid item xs={12} style={{ position: 'relative' }}>
                            <AppBar position="static" style={{ backgroundColor: '#fff', color: '#000', zIndex: 0 }} elevation={0}>
                                <Tabs aria-label="simple tabs example" className="itemTabs" value={this.state.itemTab} onChange={this.changeTab.bind(this)} style={{ justifyContent: 'center' }}>
                                    <Tab label="Состав" {...a11yProps(0)} disableRipple={true} />
                                    {this.state.item.items && this.state.item.items.length == 0 ? null :
                                        <Tab label="Пищевая ценность" {...a11yProps(1)} disableRipple={true} />
                                    }
                                </Tabs>
                            </AppBar>
                            <TabPanel value={this.state.itemTab} index={1} style={{ width: '100%', marginTop: 10, marginBottom: 15, minHeight: '30vh' }}>
                                <div style={{ maxHeight: '30vh', height: '100%', overflow: 'auto' }} className={this.state.item.items && this.state.item.items.length == 1 ? 'MainItemPopover tab MainItemPopoverOne' : 'MainItemPopover tab MainItemPopoverLot'}>
                                    <table>
                                        <tbody>
                                            
                                            { this.state.item.info_weight.length > 0 ?
                                                <tr>
                                                    <td><Typography variant="h5" className="OtherMiniPopover" component="span">Вес: {this.state.item.info_weight}</Typography></td>
                                                </tr>
                                                    :
                                                null
                                            }
                                            
                                            
                                            <tr>
                                                <td><Typography variant="h5" className="OtherMiniPopover" component="span">Пищевая ценность на 100 г</Typography></td>
                                            </tr>
                                            {this.state.item.items && this.state.item.items.map((item, key) => 
                                                <tr key={key}>
                                                    <td>
                                                        <div className="NamePopover">
                                                            <Typography variant="h5" component="span">{item.name}</Typography>
                                                        </div>
                                                        <div className="OtherPopover">
                                                            <Typography variant="h5" component="span">Белки:</Typography>
                                                            <Typography variant="h5" component="span">{item.protein} г</Typography>
                                                        </div>
                                                        <div className="OtherPopover">
                                                            <Typography variant="h5" component="span">Жиры:</Typography>
                                                            <Typography variant="h5" component="span">{item.fat} г</Typography>
                                                        </div>
                                                        <div className="OtherPopover">
                                                            <Typography variant="h5" component="span">Углеводы:</Typography>
                                                            <Typography variant="h5" component="span">{item.carbohydrates} г</Typography>
                                                        </div>
                                                        <div className="OtherPopover">
                                                            <Typography variant="h5" component="span">Энерг. ценность:</Typography>
                                                            <Typography variant="h5" component="span">{item.kkal} ккал</Typography>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </TabPanel>
                            <TabPanel value={this.state.itemTab} index={0} style={{ marginTop: 10, marginBottom: 15, minHeight: '30vh' }}>
                                { this.state.item.items && this.state.item.items.length > 1 ?
                                    <div style={{ maxHeight: '30vh', height: '100%', overflowY: 'auto', overflowX: 'hidden', position: 'relative' }}>
                                        {this.state.item.items && this.state.item.items.map((item, key) =>
                                            <div key={key} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '10px 0px' }}>
                                                <picture style={{ height: 'auto', width: 70, display: 'table' }}>
                                                    <source 
                                                        srcSet={"https://storage.yandexcloud.net/site-img/"+item.img_new+"300х200.webp?"+item.img_new_update} 
                                                        type="image/webp" 
                                                    />
                                                    <img 
                                                        src={"https://storage.yandexcloud.net/site-img/"+item.img_new+"300х200.jpg?"+item.img_new_update} 
                                                        alt={item.name}
                                                        title={item.name}
                                                        style={{ height: 'auto', width: '100%' }}
                                                    />
                                                </picture>
                                                <div className="itemMiniText" style={{ overflow: 'hidden', flexWrap: 'wrap', paddingRight: 15 }}>
                                                    <Typography variant="h5" component="span" className="dopItemName" style={{ width: '100%' }}>{item.name}</Typography>
                                                    <Typography variant="h5" component="span" className="ItemDesc" style={{ width: '100%', wordWrap: 'normal' }}>{item.tmp_desc}</Typography>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                        :
                                    <div style={{ maxHeight: '30vh', height: '100%', overflow: 'auto' }}>
                                        <Typography gutterBottom variant="h5" component="span" className="ItemDesc">{this.state.item.tmp_desc}</Typography>    
                                    </div>
                                }
                            </TabPanel>
                            
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div className="newBTN" onClick={this.add.bind(this)}>
                                    <Typography variant="h5" component="span" className="ItemPriceValue" style={{ paddingLeft: 5 }}>{ parseInt(this.state.count) == 0 ? parseInt(this.state.item.price) : parseInt(this.state.item.price) * parseInt(this.state.count) }</Typography>
                                    <Ruble viewBox="0 0 600 300" width="20" />
                                     
                                    <ShoppingCartOutlinedIcon color='inherit'  />
                                </div>
                                
                                {false && this.state.count == 0 ?
                                    <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="BtnBorder">
                                        <Button variant="contained" className="BtnCardMain CardInCardItem" onClick={this.add.bind(this)}>
                                            <ShoppingCartOutlinedIcon color='inherit'  />
                                        </Button>
                                    </ButtonGroup>
                                        :
                                    <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="BtnBorder count" style={{ border: 'none' }}>
                                        <Button variant="contained" className="BtnCardMain" onClick={this.minus.bind(this)}>
                                            <FontAwesomeIcon icon={faMinus} style={{ fontSize: '1rem' }} />
                                        </Button>
                                        <Button variant="contained" className="BtnCardMain" >
                                            <Typography component="span" className="CardCountItem">{this.state.count}</Typography>
                                        </Button>
                                        <Button variant="contained" className="BtnCardMain" onClick={this.add.bind(this)}> 
                                            <FontAwesomeIcon icon={faPlus} style={{ fontSize: '1rem' }} />
                                        </Button>
                                    </ButtonGroup>
                                }
                            </div>
                        </Grid>
                    </Grid>
                </Hidden>
            </div>
        )
    }
}