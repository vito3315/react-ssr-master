import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import { autorun } from "mobx"
import itemsStore from '../../stores/items-store';
import config from '../../stores/config';

import Box from '@mui/material/Box';

import {Helmet} from "react-helmet";
const queryString = require('query-string');
import axios from 'axios';

import PropTypes from 'prop-types';

import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/base/ClickAwayListener';

import { ActionsCartButton, ActionsCartButtonStart, IconRuble, IconInfoWhite, IconInfoBlack } from '../../stores/elements';

import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

var firebaseAPP = null;

class Badge extends React.Component{
    arrColor = {
        new: { color: '#EE7900', text: 'новинка' },
        hit: { color: '#AF00DB', text: 'хит' },
        sale: { color: '#DB0021', text: 'скидка' }, 
    }

    constructor(props) {
        super(props);
        
        this.state = {      
            size: this.props.size,
            view: this.props.view,
            color: this.arrColor[ this.props.type ].color,
            text: this.arrColor[ this.props.type ].text
        };
    }

    render(){
        return (
            <div style={{ position: 'absolute', top: this.state.view == 'mobile' ? 0 : 20, left: this.state.view == 'mobile' ? -10 : 20, }}>
                <div style={{ width: this.state.size == 'small' ? 84 : 114, height: this.state.size == 'small' ? 34 : 44, backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: 30 }} />
                <div style={{ width: this.state.size == 'small' ? 80 : 110, height: this.state.size == 'small' ? 30 : 40, backgroundColor: this.state.color, borderRadius: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 2, left: 2 }}>
                    <Typography component="span" style={{ fontFamily: 'Roboto', fontSize: this.state.size == 'small' ? '0.75rem' : '1rem', fontWeight: 400, color: '#fff', textTransform: 'uppercase', lineHeight: 1 }}>{this.state.text}</Typography>
                </div>
            </div>
        );
    }
}

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      //backgroundColor: '#f5f5f9',
      //color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }));

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

export class Item extends React.Component {
    _isMounted = false;
    swiper = null;
    
    startMove = 0;
    firebaseAnalitic = null;

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
            itemTab: 0,

            openTooltip: false,

            img_name: this.props.item ? this.props.item.img_app.length > 0 ? this.props.item.img_app : this.props.item.img_new : '',
            img_type: this.props.item ? this.props.item.img_app.length > 0 ? 'new' : 'old' : 'old',
            desc: this.props.item ? this.props.item.marc_desc_full.length > 0 ? this.props.item.marc_desc_full : this.props.item.tmp_desc : ''
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
        
        const firebaseConfig = {
            apiKey: "AIzaSyChAHowCT2C7GRwfcxwt1Pi4SCV4CaVpP4",
            authDomain: "jacofoodsite.firebaseapp.com",
            projectId: "jacofoodsite",
            storageBucket: "jacofoodsite.appspot.com",
            messagingSenderId: "692082803779",
            appId: "1:692082803779:web:39a39963cd8bff927000f6"
        };
          
        // Initialize Firebase
        firebaseAPP = initializeApp(firebaseConfig);
        this.firebaseAnalitic = getAnalytics(firebaseAPP);

        autorun(() => {
            if( this._isMounted ){
                let item = itemsStore.getAllItems().find( (item) => item.link == this.state.itemLink );
                
                if( item ){
                    this.setState({
                        item: item,
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

        logEvent(this.firebaseAnalitic, 'add_to_cart', {
            content_type: 'add_cart',
            content_id: this.state.item['id'],
            items: [{ name: this.state.item.name }]
        });

        let count = itemsStore.AddItem(this.state.item['id']);
        this.setState({ count: count })
    }
    
    minus(){

        logEvent(this.firebaseAnalitic, 'remove_from_cart', {
            content_type: 'remove_cart',
            content_id: this.state.item['id'],
            items: [{ name: this.state.item.name }]
        });

        let count = itemsStore.MinusItem(this.state.item['id']);
        this.setState({ count: count })
    }
    
    changeTab = (event, newValue) => {
        this.setState({
            itemTab: newValue
        })
    }
    
    handleTooltipOpen(){
        this.setState({
            openTooltip: !this.state.openTooltip
        })
    }

    handleTooltipClose(){
        this.setState({
            openTooltip: false
        })
    }

    render() {
        return (
            <>
                <Helmet>
                    <title>{this.state.title}</title>
                    <meta name="description" content={this.state.description} />
                </Helmet>

                
                <Box component="div" className="pcItem NewModal" sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <Grid container className="MainItem mainContainer">
                        
                        {this.state.img_type == 'old' ?
                            <Grid item className='FirstMainItem'>
                                <picture style={{ width: '100%' }}>
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

                                { parseInt(this.state.item.is_new) == 0 ? 
                                    parseInt(this.state.item.is_hit) == 0 ? null :
                                    <Badge size={'big'} type={'hit'} view={'pc'} />
                                        :
                                    <Badge size={'big'} type={'new'} view={'pc'} />
                                }
                            </Grid>
                                :
                            <Grid item className='FirstMainItem'>
                                <picture style={{ width: '100%' }}>
                                    <source srcSet={`
                                        https://storage.yandexcloud.net/site-img/${this.state.img_name}_276x276.jpg 138w, 
                                        https://storage.yandexcloud.net/site-img/${this.state.img_name}_292x292.jpg 146w,
                                        https://storage.yandexcloud.net/site-img/${this.state.img_name}_366x366.jpg 183w,
                                        https://storage.yandexcloud.net/site-img/${this.state.img_name}_466x466.jpg 233w,
                                        https://storage.yandexcloud.net/site-img/${this.state.img_name}_585x585.jpg 292w
                                        https://storage.yandexcloud.net/site-img/${this.state.img_name}_732x732.jpg 366w,
                                        https://storage.yandexcloud.net/site-img/${this.state.img_name}_1168x1168.jpg 584w,
                                        https://storage.yandexcloud.net/site-img/${this.state.img_name}_1420x1420.jpg 760w,
                                        https://storage.yandexcloud.net/site-img/${this.state.img_name}_2000x2000.jpg 1875w`} 
                                        sizes="(max-width=1439px) 233px, (max-width=1279px) 218px, 292px" />
                                    <img alt={this.state.item.name} title={this.state.item.name} className="img" src={`https://storage.yandexcloud.net/site-img/${this.state.img_name}_276x276.jpg`} />
                                </picture>

                                { parseInt(this.state.item.is_new) == 0 ? 
                                    parseInt(this.state.item.is_hit) == 0 ? null :
                                    <Badge size={'big'} type={'hit'} view={'pc'} />
                                        :
                                    <Badge size={'big'} type={'new'} view={'pc'} />
                                }
                            </Grid>
                        }
                        
                        <Grid item className='SecondMainItem'>
                            <Typography variant="h5" component="h1" className='ModalItemTitle' style={{ marginTop: 0 }}>{this.state.item.name}</Typography>
                            
                            
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: 300 }}>
                                <div style={{ width: parseInt( this.state.item.cat_id ) == 4 ? 230 : parseInt( this.state.item.cat_id ) == 5 || parseInt( this.state.item.cat_id ) == 6 || parseInt( this.state.item.cat_id ) == 7 ? 80 : 150, height: 40, border: '1px solid #DADADA', borderRadius: 15, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 20, marginBottom: 20, marginRight: 25 }}>
                                    { parseInt( this.state.item.cat_id ) == 4 ?
                                        <>
                                            <Typography variant="h5" component="span" className='ModalItemOther' style={{ flex: 3, textAlign: 'center' }}>{this.state.item.count_part_new}</Typography>
                                            <div style={{ height: '100%', borderLeft: '1px solid #DADADA' }} />
                                        </>
                                            :
                                        null
                                    }
                                    { parseInt( this.state.item.cat_id ) == 5 || parseInt( this.state.item.cat_id ) == 6 || parseInt( this.state.item.cat_id ) == 7 ?
                                        null
                                            :
                                        <>
                                            <Typography variant="h5" component="span" className='ModalItemOther' style={{ flex: parseInt( this.state.item.cat_id ) == 4 ? 2 : 3, textAlign: 'center' }}>{ parseInt( this.state.item.cat_id ) == 14 ? this.state.item.size_pizza + ' см' : this.state.item.count_part + ' шт.' }</Typography>
                                            <div style={{ height: '100%', borderLeft: '1px solid #DADADA' }} />
                                        </>
                                    }
                                    <Typography variant="h5" component="span" className='ModalItemOther' style={{ flex: 3, textAlign: 'center' }}>{ new Intl.NumberFormat('ru-RU').format(this.state.item.weight)} { parseInt( this.state.item.id ) == 17 || parseInt( this.state.item.id ) == 237 ? 'шт.' : parseInt( this.state.item.cat_id ) == 6 ? 'л' : 'г' }</Typography>
                                </div>

                                { parseInt( this.state.item.id ) == 17 || parseInt( this.state.item.id ) == 237 ? null :
                                    <ClickAwayListener mouseEvent="onMouseDown" touchEvent="onTouchStart" onClickAway={this.handleTooltipClose.bind(this)}>
                                        <div>
                                            <HtmlTooltip
                                                onClose={this.handleTooltipClose.bind(this)}
                                                open={this.state.openTooltip}
                                                disableFocusListener
                                                disableHoverListener
                                                disableTouchListener
                                                PopperProps={{
                                                    disablePortal: true,
                                                }}
                                                title={
                                                <React.Fragment>
                                                    <Typography style={{ textAlign: 'center', fontFamily: 'Roboto', fontSize: '1.5rem', fontWeight: 500, lineHeight: 1, paddingTop: 10, paddingBottom: 20, whiteSpace: 'nowrap' }}>Пищевая ценность на 100 г</Typography>
                                                    
                                                    { this.state.item.items.length == 1 ? null :
                                                        <div style={{ width: '100%', height: 2, backgroundColor: '#fff', marginBottom: 20 }} />
                                                    }

                                                    <div className='InfoScroll' style={ this.state.item.items.length > 1 ? { overflowY: 'scroll', maxHeight: 280, paddingRight: 5 } : {}}>
                                                        { this.state.item.items.map( (item, key) =>
                                                            <div style={{ border: '2px solid #fff', borderRadius: 10, marginBottom: this.state.item.items.length == 1 ? 0 : this.state.item.items.length-1 == key ? 0 : 20 }} key={key}>
                                                                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', borderBottom: '2px solid #fff' }}>
                                                                    <div style={{ width: '75%', display: 'flex', alignItems: 'center', borderRight: '2px solid #fff', padding: 10 }}>
                                                                        <Typography style={{ fontFamily: 'Roboto', fontWeight: 400, fontSize: '1.1rem', lineHeight: 1.25 }}>{item.name}</Typography>
                                                                    </div>
                                                                    <div style={{ width: '25%', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', padding: 10 }}>
                                                                        <Typography style={{ fontSize: '2rem', lineHeight: 1, fontFamily: 'Roboto', fontWeight: 500 }}>{item.kkal}</Typography>
                                                                        <Typography style={{ fontSize: '1rem', lineHeight: 0.8, fontFamily: 'Roboto', fontWeight: 400 }}>ккал</Typography>
                                                                    </div>
                                                                </div>
                                                                <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                                                                    <div style={{ width: '50%', padding: 10, borderRight: '2px solid #fff' }}>
                                                                        <Typography style={{ fontSize: '0.8rem', fontFamily: 'Roboto', fontWeight: 400 }}>Состав: {item.tmp_desc}</Typography>
                                                                    </div>
                                                                    <div style={{ width: '50%', padding: 10 }} className='styleTooltip'>
                                                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                            <Typography style={{ fontSize: '0.8rem', fontFamily: 'Roboto', fontWeight: 400, order: 1 }}>белки</Typography>
                                                                            <Typography style={{ fontSize: '0.8rem', fontFamily: 'Roboto', fontWeight: 400, order: 3 }}>{item.protein} г</Typography>
                                                                        </div>
                                                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                            <Typography style={{ fontSize: '0.8rem', fontFamily: 'Roboto', fontWeight: 400, order: 1 }}>жиры</Typography>
                                                                            <Typography style={{ fontSize: '0.8rem', fontFamily: 'Roboto', fontWeight: 400, order: 3 }}>{item.fat} г</Typography>
                                                                        </div>
                                                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                            <Typography style={{ fontSize: '0.8rem', fontFamily: 'Roboto', fontWeight: 400, order: 1 }}>углеводы</Typography>
                                                                            <Typography style={{ fontSize: '0.8rem', fontFamily: 'Roboto', fontWeight: 400, order: 3 }}>{item.carbohydrates} г</Typography>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) }
                                                    </div>
                                                </React.Fragment>
                                                }
                                            >
                                                <div style={{ width: 40, height: 40, cursor: 'pointer' }} onClick={this.handleTooltipOpen.bind(this)}>
                                                    { this.state.openTooltip === true ?
                                                        <IconInfoBlack />
                                                            :
                                                        <IconInfoWhite />
                                                    }
                                                    
                                                </div>
                                            </HtmlTooltip>
                                        </div>
                                    </ClickAwayListener>
                                }
                                
                            </div>
                            

                            { parseInt( this.state.item.cat_id ) == 4 ?
                                <ButtonGroup elevation={0} disableRipple={true} variant="contained" style={{ marginBottom: 20, width: 300 }}>
                                    <Button variant="contained" className='ModalItemButtonCartOther' style={{ width: 300, height: 40, borderRadius: 30, border: '1px solid #F9BC23' }} onClick={this.props.openSetPc ? this.props.openSetPc.bind(this, this.state.item.items) : null }>Состав сета</Button>
                                </ButtonGroup>
                                    :
                                null
                            }

                            <Typography variant="h5" component="span" style={{ marginBottom: 20, minHeight: 200 }} className='ModalItemDesc'>{this.state.desc}</Typography>
                            
                            { this.state.count == 0 ?
                                <ActionsCartButtonStart price={this.state.item.price} add={this.add.bind(this)} />
                                    :
                                <ActionsCartButton count={this.state.count} price={this.state.item.price} item_id={this.state.item.id} minus={this.minus.bind(this)} add={this.add.bind(this)} />
                            }
                        </Grid>
                    </Grid>
                </Box>
                

                <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                    <Grid container className="MainItem MainItemMobile mainContainer" style={{ height: 'calc(100vh - 50px)', paddingRight: 20, paddingLeft: 20, paddingTop: 20, alignContent: 'flex-start', position: 'relative' }}>
                        <Grid item xs={12}>

                            {this.state.img_type == 'old' ?
                                <picture>
                                    <source 
                                        srcSet={"https://storage.yandexcloud.net/site-img/"+this.state.item.img_new+"600х400.webp?"+this.state.item.img_new_update} 
                                        type="image/webp" 
                                    />
                                    <img 
                                        src={"https://storage.yandexcloud.net/site-img/"+this.state.item.img_new+"600х400.jpg?"+this.state.item.img_new_update} 
                                        alt={this.state.item.name}
                                        title={this.state.item.name}
                                        style={{ width: '100%' }}
                                    />
                                </picture>
                                    :
                                <picture>
                                    <source srcSet={`
                                        https://storage.yandexcloud.net/site-img/${this.state.img_name}_276x276.jpg 138w, 
                                        https://storage.yandexcloud.net/site-img/${this.state.img_name}_292x292.jpg 146w,
                                        https://storage.yandexcloud.net/site-img/${this.state.img_name}_366x366.jpg 183w,
                                        https://storage.yandexcloud.net/site-img/${this.state.img_name}_466x466.jpg 233w,
                                        https://storage.yandexcloud.net/site-img/${this.state.img_name}_585x585.jpg 292w
                                        https://storage.yandexcloud.net/site-img/${this.state.img_name}_732x732.jpg 366w,
                                        https://storage.yandexcloud.net/site-img/${this.state.img_name}_1168x1168.jpg 584w,
                                        https://storage.yandexcloud.net/site-img/${this.state.img_name}_1420x1420.jpg 760w,
                                        https://storage.yandexcloud.net/site-img/${this.state.img_name}_2000x2000.jpg 1875w`} 
                                        sizes="(max-width=1439px) 233px, (max-width=1279px) 218px, 292px" />
                                    <img 
                                        alt={this.state.item.name} 
                                        title={this.state.item.name} 
                                        style={{ width: '80%' }}
                                        src={`https://storage.yandexcloud.net/site-img/${this.state.img_name}_276x276.jpg`} />
                                </picture>
                            }

                            <Typography variant="h5" component="h1" style={{ textAlign: 'center' }}>{this.state.item.name}</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', position: 'relative' }}>
                                <div style={{ width: parseInt( this.state.item.cat_id ) == 4 ? 238 : parseInt( this.state.item.cat_id ) == 5 || parseInt( this.state.item.cat_id ) == 6 || parseInt( this.state.item.cat_id ) == 7 ? 78 : 148, height: 28, border: '1px solid #DADADA', borderRadius: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 10, marginBottom: 20 }}>
                                    { parseInt( this.state.item.cat_id ) == 4 ?
                                        <>
                                            <Typography variant="h5" component="span" className='ModalItemOther' style={{ flex: 3, textAlign: 'center', fontFamily: 'Roboto', fontWeight: 400, fontSize: '0.87rem', color: '#525252' }}>{this.state.item.count_part_new}</Typography>
                                            <div style={{ height: '100%', borderLeft: '1px solid #DADADA' }} />
                                        </>
                                            :
                                        null
                                    }
                                    { parseInt( this.state.item.cat_id ) == 5 || parseInt( this.state.item.cat_id ) == 6 || parseInt( this.state.item.cat_id ) == 7 ?
                                        null
                                            :
                                        <>
                                            <Typography variant="h5" component="span" className='ModalItemOther' style={{ flex: parseInt( this.state.item.cat_id ) == 4 ? 2 : 3, textAlign: 'center', fontFamily: 'Roboto', fontWeight: 400, fontSize: '0.87rem', color: '#525252' }}>{ parseInt( this.state.item.cat_id ) == 14 ? this.state.item.size_pizza + ' см' : this.state.item.count_part + ' шт.' }</Typography>
                                            <div style={{ height: '100%', borderLeft: '1px solid #DADADA' }} />
                                        </>
                                    }
                                    <Typography variant="h5" component="span" className='ModalItemOther' style={{ flex: 3, textAlign: 'center', fontFamily: 'Roboto', fontWeight: 400, fontSize: '0.87rem', color: '#525252' }}>{ new Intl.NumberFormat('ru-RU').format(this.state.item.weight)} { parseInt( this.state.item.id ) == 17 || parseInt( this.state.item.id ) == 237 ? 'шт.' : parseInt( this.state.item.cat_id ) == 6 ? 'л' : 'г' }</Typography>
                                </div>

                                { parseInt( this.state.item.id ) == 17 || parseInt( this.state.item.id ) == 237 ? null :
                                    <div style={{ width: 30, height: 30, cursor: 'pointer', position: 'absolute', top: 10, right: 0 }} onClick={this.props.openInfo ? this.props.openInfo.bind(this) : null}>
                                        { this.props.openModalPCInfo && this.props.openModalPCInfo === true ?
                                            <IconInfoBlack />
                                                :
                                            <IconInfoWhite />
                                        }
                                    </div>
                                }
                                
                            </div>
                        </Grid>

                        { parseInt( this.state.item.cat_id ) == 4 ?
                            <Grid item xs={12} style={{ marginBottom: 20 }}>
                                <ButtonGroup elevation={0} disableRipple={true} variant="contained" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                    <Button variant="contained" className='ModalItemButtonCart' style={{ width: 240, height: 30, borderRadius: 15, border: '1px solid #F9BC23', fontSize: '0.875rem', textTransform: 'initial', fontFamily: 'Roboto', color: '#525252', fontWeight: 400 }} onClick={this.props.openSetPc ? this.props.openSetPc.bind(this, this.state.item.items) : null}>
                                        Состав сета
                                    </Button>
                                </ButtonGroup>
                            </Grid>
                                :
                            null
                        }

                        <Grid item xs={12} style={{ height: 80, justifyContent: 'center' }}>
                            <Typography component="span" className='hidddenText4' style={{ textAlign: 'center', fontFamily: 'Roboto', fontSize: '0.875rem', fontWeight: 400, color: '#525252', width: '100%' }}>{this.state.desc}</Typography>
                        </Grid>

                        <Grid item xs={12} style={{ position: 'absolute', width: 'calc(100% - 40px)', bottom: 120 }}>
                            { this.state.count == 0 ?
                                <ButtonGroup disableelevation={true} disableRipple={true} variant="contained" style={{ width: '100%', backgroundColor: '#fff' }}>
                                    <Button variant="contained" className='ModalItemButtonCart _NON_HOVER_' style={{ width: '100%', height: 60, borderRadius: 40, border: '2px solid #F9BC23' }} onClick={this.add.bind(this)}>
                                        <span style={{ fontSize: '1.25rem', textTransform: 'initial', fontFamily: 'Roboto', color: '#525252', fontWeight: 700 }}>В корзину за { new Intl.NumberFormat('ru-RU').format(this.state.item.price)}</span>
                                        <IconRuble style={{ width: 15, height: 15, fill: '#525252', marginLeft: 5 }} />
                                    </Button>
                                </ButtonGroup>
                                    :
                                <ButtonGroup disableelevation={true} disableRipple={true} variant="contained" style={{ width: '100%', backgroundColor: '#fff' }}>
                                    <div variant="contained" className='ModalItemButtonCart OPEN' style={{ width: '100%', height: 56, borderRadius: 40, border: '2px solid #F9BC23', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <button style={{ width: 30, height: 30, minWidth: 30, maxWidth: 30, minHeight: 30, maxHeight: 30, borderRadius: 40, padding: 0, marginLeft: 13, border: '1px solid #F9BC23', backgroundColor: '#F9BC23', color: '#525252', fontSize: '1.5rem', fontFamily: 'Roboto', fontWeight: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={this.minus.bind(this)}>–</button>
                                        <div>
                                            <span style={{ fontSize: '1.25rem', textTransform: 'initial', fontFamily: 'Roboto', color: '#525252', fontWeight: 700 }}>{this.state.count} шт. на { new Intl.NumberFormat('ru-RU').format( parseInt(this.state.item.price) * parseInt(this.state.count) )}</span>
                                            <IconRuble style={{ width: 15, height: 15, fill: '#525252', marginLeft: 5 }} />
                                        </div>
                                        <button style={{ width: 40, height: 40, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40, borderRadius: 40, padding: 0, marginRight: 10, border: '1px solid #F9BC23', backgroundColor: '#F9BC23', color: '#525252', fontSize: '2rem', fontFamily: 'Roboto', fontWeight: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={this.add.bind(this)}>+</button>
                                    </div>
                                </ButtonGroup>
                            }
                        </Grid>
                    </Grid>
                </Box>
            </>
        )
    }
}