import React from 'react';
import { NavLink as Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faTimes } from '@fortawesome/free-solid-svg-icons'
import * as Scroll from 'react-scroll';

function IconRuble(props) {
    return (
        <svg
            style={ props.style }
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-1 0 24 24"
            >
            <path d="M17.778 7.449a3.628 3.628 0 00-1.107-2.761l-.001-.001a4.03 4.03 0 00-2.923-1.057h.009-5.454v7.636h5.454a4.032 4.032 0 002.917-1.06l-.003.003a3.633 3.633 0 001.108-2.768v.007zm4.04 0a7.11 7.11 0 01-2.158 5.368l-.002.002a7.65 7.65 0 01-5.581 2.08h.015-5.795v2.011H16.926c.29 0 .525.235.525.525v.022-.001 2.203c0 .29-.235.525-.525.525h-.022.001-8.608v3.291a.537.537 0 01-.537.528H4.886a.525.525 0 01-.525-.525v-.022.001-3.273H.522a.525.525 0 01-.525-.525v-.022.001-2.182-.021c0-.29.235-.525.525-.525h.022-.001 3.818v-2.011H.522a.525.525 0 01-.525-.525v-.022.001-2.54-.006a.537.537 0 01.528-.537h.019-.001 3.818V.55.529c0-.29.235-.525.525-.525h.022-.001 9.187a7.653 7.653 0 015.57 2.084l-.004-.004a7.11 7.11 0 012.157 5.378v-.013z"></path>
        </svg>
    );
}

var Element  = Scroll.Element;
var Events  = Scroll.Events;
var scroller = Scroll.scroller;
const queryString = require('query-string');
import axios from 'axios';

import {Helmet} from "react-helmet";

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';

import IconButton from '@material-ui/core/IconButton';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

import itemsStore from '../../stores/items-store';
import config from '../../stores/config';

import { autorun } from "mobx"
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Hidden from '@material-ui/core/Hidden';

import LazyLoad from 'react-lazyload';

import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

var firebaseAPP = null;

import Swiper from "swiper";
import SwiperCore, { Pagination, Navigation, A11y, Autoplay } from 'swiper';
SwiperCore.use([Navigation, Pagination, A11y, Autoplay]);
import "swiper/swiper.min.css";

class CoverFlowCarousel extends React.Component {
    swiper = null;
    
    constructor(props) {
        super(props);
        
        this.state = {      
            data: this.props.data,
            type: this.props.type,
        };
    }
    
    componentDidMount() {
        let count = 1;
        let this_count = this.state.data.length;
        
        /*if(this.state.type == 'pc'){
            count = this.state.data.length >= 3 ? 2 : 1;
        }else{
            count = this.state.data.length >= 3 ? 2 : 1;
        }*/
        
        
        
        this.swiper = new Swiper(".swiper-container", {
            grabCursor: this_count == 1 ? false : true,
            loop: this_count == 1 ? false : true,
            centeredSlidesBounds: false,
            setWrapperSize: this_count == 1 ? false : true,
            autoHeight: true,
            //spaceBetween: 100,
            centeredSlides: true,
            slidesPerView: count,
            
            autoplay: this_count == 1 ? false : true,
            autoplay: {
                delay: 5000,
            },
            
            pagination: this_count == 1 ? false : this.state.type == 'pc' ? true : true,
            pagination: this_count == 1 ? {} : this.state.type == 'pc' ? {
                el: ".swiper-pagination",
                clickable: true,
                type: 'bullets',
                renderBullet: function (index, className) {
                    return '<span class="' + className + '">' + (index + 1) + '</span>';
                },
            } : {},
            navigation: this_count == 1 ? {} : this.state.type == 'pc' ? {
                nextEl: ".swiper-button-next", // arrows on the side of the slides
                prevEl: ".swiper-button-prev", // arrows on the side of the slides
            } : {},
            
            //renderPrevButton: () => <FontAwesomeIcon icon={faPlus} style={{ fontSize: '1rem' }} />,
            //renderNextButton: () => <FontAwesomeIcon icon={faPlus} style={{ fontSize: '1rem' }} />
        });
    }
     
    prev(){
        this.swiper.slidePrev();
    }
    
    next(){
        this.swiper.slideNext();
    }
     
    render() {
        return (
            <div className={"swiper-container swiper_"+this.state.type+" _h1_"}>
                <div className={"swiper-wrapper _h2_ _count_"+this.state.data.length}>
                    {this.state.data.map((item, key) => 
                        <div className={"swiper-slide _h3_ "+key} key={key}>
                            {item}
                        </div>
                    )}
                </div>
                    
                { this.state.data.length == 1 ? null : this.state.type == 'pc' ?
                    <>
                        <div className="swiper-pagination" />
                        <div className="swiper-button-prev" onClick={this.prev.bind(this)} />
                        <div className="swiper-button-next" onClick={this.next.bind(this)} />
                    </>
                        :
                    null
                }
            </div>
        );
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

function IconClose(props) {
    return (
      <svg
        style={ props.style ? props.style : null }
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        fill="none"
        viewBox="0 0 64 64"
      >
        <path
          stroke="#fff"
          strokeLinecap="round"
          strokeWidth="3"
          d="M2 2l60 60M62 2L2 62"
        ></path>
      </svg>
    );
}

const handleDragStart = (e) => e.preventDefault();

function get_city(path){
    
    path = path.split('/');
    path = path.filter( (item) => item != '' );
    
    return path[ 0 ];
}

import { Item, Item2 } from '../item';

class CardItem extends React.Component {
    _isMounted = false;
    
    constructor(props) {
        super(props);
        
        this.state = {      
            item: this.props.data, 
            count: 0,
            is_old_price: false,
            old_price: 0
        };
    }
    
    componentDidMount(){
        this._isMounted = true; 
        let my_cart = itemsStore.getItems();
            
        let item = my_cart.find( (item) => item.item_id == this.state.item['id'] );
  
        if( item ){
            this.setState({ 
              count: item.count,
            })
            
            let city = itemsStore.getCity();
            
            if( city == 'samara' && (parseInt(this.state.item['id']) == 70 || parseInt(this.state.item['id']) == 71 || parseInt(this.state.item['id']) == 7) ){
                this.setState({
                    //old_price: 205,
                    //is_old_price: true
                })
            }

            if( city == 'samara' && parseInt(this.state.item['id']) == 4 ){
                this.setState({
                    //old_price: 135,
                    //is_old_price: true
                })
            }
            
            if( city == 'togliatti' && (parseInt(this.state.item['id']) == 70 || parseInt(this.state.item['id']) == 71 || parseInt(this.state.item['id']) == 7) ){
                this.setState({
                    //old_price: 195,
                    //is_old_price: true
                })
            }

            if( city == 'togliatti' && parseInt(this.state.item['id']) == 4 ){
                this.setState({
                    //old_price: 135,
                    //is_old_price: true
                })
            }
        }
        
        autorun(() => {
            if( this._isMounted ){
                
                let city = itemsStore.getCity();
            
                if( city == 'samara' && (parseInt(this.state.item['id']) == 70 || parseInt(this.state.item['id']) == 71 || parseInt(this.state.item['id']) == 7) ){
                    this.setState({
                        //old_price: 205,
                        //is_old_price: true
                    })
                }
    
                if( city == 'samara' && parseInt(this.state.item['id']) == 4 ){
                    this.setState({
                        //old_price: 135,
                        //is_old_price: true
                    })
                }
                
                if( city == 'togliatti' && (parseInt(this.state.item['id']) == 70 || parseInt(this.state.item['id']) == 71 || parseInt(this.state.item['id']) == 7) ){
                    this.setState({
                        //old_price: 195,
                        //is_old_price: true
                    })
                }
    
                if( city == 'togliatti' && parseInt(this.state.item['id']) == 4 ){
                    this.setState({
                        //old_price: 135,
                        //is_old_price: true
                    })
                }
                
                let my_cart = itemsStore.getItems();
                let item = my_cart.find( (item) => item.item_id == this.state.item['id'] );
          
                if( item ){
                    this.setState({ 
                      count: item.count,
                    })
                }else{
                    this.setState({ 
                      count: 0,
                    })
                }
            }
        })
    }
    
    componentWillUnmount(){
        this._isMounted = false;
    }
    
    add(){
        if(this._isMounted){
            itemsStore.AddItem(this.state.item['id']);
        }
    }
    
    minus(){
        if(this._isMounted){
            itemsStore.MinusItem(this.state.item['id']);
        }
    }
    
    /*shouldComponentUpdate(nextProps, nextState) {
        return (
            this.state.count !== nextState.count ||
            this.state.item.price !== nextState.item.price
        );
    }*/
    
    render() {
        const img_name = this.state.item.img_app.length > 0 ? this.state.item.img_app : this.state.item.img_new;
        const img_type = this.state.item.img_app.length > 0 ? 'new' : 'old';

        const desc = this.state.item.marc_desc.length > 0 ? this.state.item.marc_desc : this.state.item.tmp_desc;

        let item_name = '';

        let count = ""+this.state.count;

        count = count.split("");

        count = count[ count.length - 1 ];

        if( parseInt( this.state.item.cat_id ) == 4 ){
            if( parseInt( count ) == 1 ){
                item_name = 'сет';
            }

            if( parseInt( count ) > 1 && parseInt( count ) < 5 ){
                item_name = 'сета';
            }

            if( parseInt( count ) > 4 || parseInt( count ) == 0 ){
                item_name = 'сетов';
            }
        }

        if( parseInt( this.state.item.cat_id ) == 14 ){
            if( parseInt( count ) == 1 ){
                item_name = 'пицца';
            }

            if( parseInt( count ) > 1 && parseInt( count ) < 5 ){
                item_name = 'пиццы';
            }

            if( parseInt( count ) > 4 || parseInt( count ) == 0 ){
                item_name = 'пицц';
            }
        }

        if( parseInt( this.state.item.cat_id ) == 9 || parseInt( this.state.item.cat_id ) == 10 || parseInt( this.state.item.cat_id ) == 12 || parseInt( this.state.item.cat_id ) == 13 ){
            if( parseInt( count ) == 1 ){
                item_name = 'ролл';
            }

            if( parseInt( count ) > 1 && parseInt( count ) < 5 ){
                item_name = 'ролла';
            }

            if( parseInt( count ) > 4 || parseInt( count ) == 0 ){
                item_name = 'роллов';
            }
        }

        if( parseInt( this.state.item.cat_id ) == 6 ){
            if( parseInt( count ) == 1 ){
                item_name = 'напиток';
            }

            if( parseInt( count ) > 1 && parseInt( count ) < 5 ){
                item_name = 'напитка';
            }

            if( parseInt( count ) > 4 || parseInt( count ) == 0 ){
                item_name = 'напитков';
            }
        }

        if( parseInt( this.state.item.cat_id ) == 7 ){
            if( parseInt( count ) == 1 ){
                item_name = 'соус';
            }

            if( parseInt( count ) > 1 && parseInt( count ) < 5 ){
                item_name = 'соуса';
            }

            if( parseInt( count ) > 4 || parseInt( count ) == 0 ){
                item_name = 'соусов';
            }
        }

        if( parseInt( this.state.item.cat_id ) == 5 ){
            if( parseInt( count ) == 1 ){
                item_name = 'закуска';
            }

            if( parseInt( count ) > 1 && parseInt( count ) < 5 ){
                item_name = 'закуски';
            }

            if( parseInt( count ) > 4 || parseInt( count ) == 0 ){
                item_name = 'закусок';
            }
        }

        const width = window.innerWidth;

        const GRID = (width- 7*20) / 6;

        if( this.props.type == 'pc' ){
            return (
                <Card elevation={0} className="CardItem" style={{ width: '100%' }}>
                    
                    <CardContent style={{ cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }} onClick={ () => this.props.openItem(this.state.item.id)}>
                        
                        {img_type == 'old' ?
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
                                :
                            <picture>
                                <source srcset={`
                                    https://storage.yandexcloud.net/site-img/${img_name}_138x138.jpg 138w, 
                                    https://storage.yandexcloud.net/site-img/${img_name}_146x146.jpg 146w,
                                    https://storage.yandexcloud.net/site-img/${img_name}_183x183.jpg 183w,
                                    https://storage.yandexcloud.net/site-img/${img_name}_233x233.jpg 233w,
                                    https://storage.yandexcloud.net/site-img/${img_name}_292x292.jpg 292w
                                    https://storage.yandexcloud.net/site-img/${img_name}_366x366.jpg 366w,
                                    https://storage.yandexcloud.net/site-img/${img_name}_584x584.jpg 584w,
                                    https://storage.yandexcloud.net/site-img/${img_name}_760x760.jpg 760w,
                                    https://storage.yandexcloud.net/site-img/${img_name}_1875x1875.jpg 1875w`} 
                                    sizes="(max-width=1439px) 233px, (max-width=1279px) 218px, 292px" />
                                <img alt={this.state.item.name} title={this.state.item.name} src={`https://storage.yandexcloud.net/site-img/${img_name}_138x138.jpg`} />
                            </picture>
                        }
                        
                        { parseInt(this.state.item.is_new) == 0 ? null :
                            <Badge size={'small'} type={'new'} view={'pc'} />
                        }

                        <Typography className="CardNameItem" variant="h5" component="h3" style={{ flex: 1 }}>{this.state.item.name}</Typography>

                        <CardContent style={{ padding: 0 }}>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 10, marginBottom: 10 }}>
                                <div style={{ width: parseInt( this.state.item.cat_id ) == 4 ? 230 : parseInt( this.state.item.cat_id ) == 5 || parseInt( this.state.item.cat_id ) == 6 || parseInt( this.state.item.cat_id ) == 7 ? 75 : 135, height: 34, border: '1px solid #dadada', borderRadius: 15, display: 'flex', flexDirection: 'row' }}>
                                    { parseInt( this.state.item.cat_id ) == 4 ?
                                        <div style={{ height: 34, borderRight: '1px solid #dadada', flex: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <span style={{ fontFamily: 'Roboto', fontSize: '0.9rem', fontWeight: 400, color: '#525252' }}>{this.state.item.count_part_new}</span>
                                        </div>
                                            :
                                        null
                                    }
                                    { parseInt( this.state.item.cat_id ) == 5 || parseInt( this.state.item.cat_id ) == 6 || parseInt( this.state.item.cat_id ) == 7 ? null :
                                        <div style={{ height: 34, borderRight: '1px solid #dadada', flex: parseInt( this.state.item.cat_id ) == 4 ? 2 : 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <span style={{ fontFamily: 'Roboto', fontSize: '0.9rem', fontWeight: 400, color: '#525252' }}>{ parseInt( this.state.item.cat_id ) == 14 ? this.state.item.size_pizza : this.state.item.count_part } { parseInt( this.state.item.cat_id ) == 14 ? 'см' : parseInt( this.state.item.cat_id ) == 6 ? 'л' : 'шт.'} </span>
                                        </div>
                                    }
                                    <div style={{ height: 34, flex: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <span style={{ fontFamily: 'Roboto', fontSize: '0.9rem', fontWeight: 400, color: '#525252' }}>{ new Intl.NumberFormat('ru-RU').format(this.state.item.weight) } { parseInt( this.state.item.id ) == 17 || parseInt( this.state.item.id ) == 237 ? 'шт.' : parseInt( this.state.item.cat_id ) == 6 ? 'л' : 'г' }</span>
                                    </div>
                                </div>
                            </div>

                            <div style={{ height: 120, width: '100%', marginBottom: 10, textAlign: 'center', overflow: 'hidden' }}>
                                <Typography component="span" className='hidddenText5' style={{ fontFamily: 'Roboto', fontSize: '0.925rem', color: '#525252' }}>{desc}</Typography>
                            </div>
                        </CardContent>
                    </CardContent>
                    
                    <CardActions style={{ padding: 0, width: '100%' }}>
                        { this.state.count == 0 ?
                            <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" style={{ width: '100%' }}>
                                <Button variant="contained" className='ModalItemButtonCart' style={{ width: '100%', height: 60, borderRadius: 40, border: '2px solid #F9BC23' }} onClick={this.add.bind(this)}>
                                    <span style={{ fontSize: '1.25rem', fontFamily: 'Roboto', fontWeight: 700, color: '#525252', textTransform: 'initial' }}>{ new Intl.NumberFormat('ru-RU').format(this.state.item.price)}</span>
                                    <IconRuble style={{ width: 16, height: 16, fill: '#525252', marginLeft: 5 }} />
                                </Button>
                            </ButtonGroup>
                                :
                            <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" style={{ width: '100%' }}>
                                <div variant="contained" className='ModalItemButtonCart OPEN' style={{ width: '100%', height: 56, borderRadius: 40, border: '2px solid #F9BC23', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <button style={{ width: 30, height: 30, padding: 0, borderRadius: 40, marginLeft: 13, border: '1px solid #F9BC23', backgroundColor: '#F9BC23', color: '#525252', fontSize: '1.5rem', fontFamily: 'Roboto', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={this.minus.bind(this)}>–</button>
                                    <div>
                                        <span style={{ fontSize: '1.25rem', fontFamily: 'Roboto', fontWeight: 700, color: '#525252' }}>{this.state.count} шт. на { new Intl.NumberFormat('ru-RU').format( parseInt(this.state.item.price) * parseInt(this.state.count) )}</span>
                                        <IconRuble style={{ width: 16, height: 16, fill: '#525252', marginLeft: 5 }} />
                                    </div>
                                    <button style={{ width: 40, height: 40, padding: 0, borderRadius: 40, marginRight: 10, border: '1px solid #F9BC23', backgroundColor: '#F9BC23', color: '#525252', fontSize: '2rem', fontFamily: 'Roboto', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={this.add.bind(this)}>+</button>
                                </div>
                            </ButtonGroup>
                        }
                    </CardActions>
                </Card>
            )
        }
        
        if( this.props.type == 'mobile' ){
            return (
                <Grid item container xs={12} className="CardItem_mobile" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>
                    <Grid style={{ position: 'relative', marginRight: 20 }} item onClick={ () => this.props.openItem(this.state.item.id)}>
                        
                        {img_type == 'old' ?
                            <picture>
                                <source 
                                    srcSet={"https://storage.yandexcloud.net/site-img/"+this.state.item.img_new+"600х400.webp?"+this.state.item.img_new_update} 
                                    type="image/webp" 
                                />
                                <img 
                                    src={"https://storage.yandexcloud.net/site-img/"+this.state.item.img_new+"600х400.jpg?"+this.state.item.img_new_update} 
                                    alt={this.state.item.name}
                                    title={this.state.item.name}
                                    style={{ width: ((GRID*3) + (2*20)), height: 'auto'  }}
                                />
                            </picture>
                                :
                            <picture>
                                <source srcset={`
                                    https://storage.yandexcloud.net/site-img/${img_name}_138x138.jpg 138w, 
                                    https://storage.yandexcloud.net/site-img/${img_name}_146x146.jpg 146w,
                                    https://storage.yandexcloud.net/site-img/${img_name}_183x183.jpg 183w,
                                    https://storage.yandexcloud.net/site-img/${img_name}_233x233.jpg 233w,
                                    https://storage.yandexcloud.net/site-img/${img_name}_292x292.jpg 292w
                                    https://storage.yandexcloud.net/site-img/${img_name}_366x366.jpg 366w,
                                    https://storage.yandexcloud.net/site-img/${img_name}_584x584.jpg 584w,
                                    https://storage.yandexcloud.net/site-img/${img_name}_760x760.jpg 760w,
                                    https://storage.yandexcloud.net/site-img/${img_name}_1875x1875.jpg 1875w`} 
                                    sizes="(max-width=1439px) 233px, (max-width=1279px) 218px, 292px" />
                                <img 
                                    alt={this.state.item.name} 
                                    title={this.state.item.name} 
                                    src={`https://storage.yandexcloud.net/site-img/${img_name}_138x138.jpg`} 
                                    style={{ width: ((GRID*3) + (2*20)), height: ((GRID*3) + (2*20))  }}
                                />
                            </picture>
                        }

                        { parseInt(this.state.item.is_new) == 0 ? null :
                            <Badge size={'small'} type={'new'} view={'mobile'} />
                        }
                    </Grid>
                    <Grid item className="SecondBox_" style={{ width: 'max-content', display: 'flex', flexDirection: 'column', position: 'relative', justifyContent: 'flex-end' }}>
                        <Typography className="CardNameItem_" variant="h5" component="h3" style={{ fontFamily: 'Roboto', fontSize: '1.0625rem', fontWeight: 700, color: '#525252', marginBottom: 10 }} onClick={ () => this.props.openItem(this.state.item.id)}>{this.state.item.name}</Typography>

                        {  parseInt( this.state.item.cat_id ) == 4 ?
                            <div style={{ width: 148, height: 28, display: 'flex', flexDirection: 'row', alignItems: 'center', border: '1px solid #dadada', borderRadius: 10, marginBottom: 10, }}>
                                <div style={{ flex: 3, textAlign: 'center', borderRight: '1px solid #dadada', height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Typography style={{ fontFamily: 'Roboto', fontSize: '0.875rem', fontWeight: 400, color: '#525252', lineHeight: 0 }} component="span">{this.state.item.count_part_new}</Typography>
                                </div>
                                <div style={{ flex: 2, textAlign: 'center', height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Typography style={{ fontFamily: 'Roboto', fontSize: '0.875rem', fontWeight: 400, color: '#525252', lineHeight: 0 }} component="span">{this.state.item.count_part} шт.</Typography>
                                </div>
                            </div>
                                :
                            null
                        }

                        <Typography className="CardInfoItem_" style={{ marginBottom: 10, fontFamily: 'Roboto', fontSize: '0.875rem', fontWeight: 400, color: '#525252', maxHeight: 60, overflow: 'hidden' }} component="p" onClick={() => this.props.openItem(this.state.item.id)}>{desc}</Typography>
                        
                        <div style={{ marginBottom: 10 }}>
                            { this.state.count == 0 ?
                                <ButtonGroup disableElevation={true} disableRipple={true} variant="contained">
                                    <Button variant="contained" style={{ fontFamily: 'Roboto', fontSize: '0.875rem', fontWeight: 500, color: '#525252', width: 80, height: 30, padding: 0, backgroundColor: '#fff', border: '1px solid #F9BC23', borderRadius: 30, backgroundColor: 'rgb(255, 255, 255)', border: '1px solid rgb(249, 188, 35)', borderRadius: 30 }} onClick={this.add.bind(this)}>
                                        {new Intl.NumberFormat('ru-RU').format( parseInt(this.state.item.price))}
                                        <IconRuble style={{ width: 11, height: 11, fill: '#525252', marginLeft: 3 }} />
                                    </Button>
                                </ButtonGroup>
                                    :
                                <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" style={{ width: '100%' }}>
                                    <div variant="contained" className='ModalItemButtonCart OPEN' style={{ width: '100%', height: 28, borderRadius: 40, border: '1px solid #F9BC23', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <button style={{ width: 28, height: 28, padding: 0, marginLeft: 13, color: '#525252', fontSize: '0.875rem', fontFamily: 'Roboto', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', border: 'transparent' }} onClick={this.minus.bind(this)}>–</button>
                                        <div>
                                            <span style={{ fontSize: '0.875rem', fontFamily: 'Roboto', fontWeight: 500, color: '#525252' }}>{this.state.count}</span>
                                        </div>
                                        <button style={{ width: 28, height: 28, padding: 0, marginRight: 10, color: '#525252', fontSize: '0.875rem', fontFamily: 'Roboto', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', border: 'transparent' }} onClick={this.add.bind(this)}>+</button>
                                    </div>
                                </ButtonGroup>
                            }
                        </div>
                    </Grid>
                    
                </Grid>
            )
        }
    }
}

class CardItemBot extends React.Component {
    _isMounted = false;
    
    constructor(props) {
        super(props);
        
        this.state = {   
            city: this.props.city,   
            item: this.props.data, 
            count: 0 
        };
    }
    
    componentDidMount(){
        this._isMounted = true; 
        let my_cart = itemsStore.getItems();
            
        let item = my_cart.find( (item) => item.item_id == this.state.item['id'] );
  
        if( item ){
            this.setState({ 
              count: item.count,
            })
        }
        
        autorun(() => {
            if( this._isMounted ){
                let my_cart = itemsStore.getItems();
                let item = my_cart.find( (item) => item.item_id == this.state.item['id'] );
          
                if( item ){
                    this.setState({ 
                      count: item.count,
                    })
                }else{
                    this.setState({ 
                      count: 0,
                    })
                }
            }
        })
    }
    
    componentWillUnmount(){
        this._isMounted = false;
    }
    
    add(){
        if(this._isMounted){
            itemsStore.AddItem(this.state.item['id']);
        }
    }
    
    minus(){
        if(this._isMounted){
            itemsStore.MinusItem(this.state.item['id']);
        }
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        return (
            this.state.count !== nextState.count ||
            this.state.item.price !== nextState.item.price
        );
    }
    
    render() {
        return (
            <Card elevation={0} className="CardItem">
                
                <CardContent style={{ cursor: 'pointer', position: 'relative' }} onClick={ () => this.props.openItem(this.state.item.id)}>
                    <a href={'/'+this.state.city+'/menu/item/'+this.state.item.link}>
                        { parseInt(this.state.item.is_new) == 0 ? null :
                            <img 
                                src='/assets/is_new.png'
                                alt="Новинка"
                                style={{ position: 'absolute', width: 70, top: 0, right: 0 }}
                            />
                        }
                        
                        <CardContent style={{ padding: '1.2vw', paddingBottom: 0, paddingTop: 0 }}>
                            <Typography className="CardNameItem" gutterBottom variant="h5" component="h3">{this.state.item.name}</Typography>
                            <Typography gutterBottom className="CardInfoWeiItem" component="p">{this.state.item.info_weight}</Typography>
                            <Typography className="CardInfoItem" component="p">{this.state.item.tmp_desc}</Typography>
                        </CardContent>
                    </a>
                </CardContent>
                    
                <CardActions className="CardAction">
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 0, width: '100%' }}>
                        <div><Typography className="CardPriceItem" variant="h5" component="span">{this.state.item.price} <Ruble /></Typography></div>
                        {this.state.count == 0 ?
                            <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="BtnBorder fohover">
                                <Button variant="contained" className="BtnCardMain CardInCardItem NONHOVERED" onClick={this.add.bind(this)}>
                                    <ShoppingCartOutlinedIcon color='inherit'  />
                                </Button>
                                <Button variant="contained" className="BtnCardMain CardInCardItem HOVERED" onClick={this.add.bind(this)}>В корзину</Button>
                            </ButtonGroup>
                                :
                            <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="BtnBorder count">
                                <Button variant="contained" className="BtnCardMain" onClick={this.minus.bind(this)}>
                                    <FontAwesomeIcon icon={faMinus} style={{ fontSize: '1rem' }} />
                                </Button>
                                <Button variant="contained" className="BtnCardMain" >
                                    <Typography className="CardCountItem" component="span">{this.state.count}</Typography>
                                </Button>
                                <Button variant="contained" className="BtnCardMain" onClick={this.add.bind(this)}> 
                                    <FontAwesomeIcon icon={faPlus} style={{ fontSize: '1rem' }} />
                                </Button>
                            </ButtonGroup>
                        }
                    </div>
                </CardActions>
            </Card>
        )
    }
}

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
                <div style={{ width: this.state.size == 'small' ? 84 : 114, height: this.state.size == 'small' ? 34 : 44, backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: 15 }} />
                <div style={{ width: this.state.size == 'small' ? 80 : 110, height: this.state.size == 'small' ? 30 : 40, backgroundColor: this.state.color, borderRadius: 15, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 2, left: 2 }}>
                    <Typography component="span" style={{ fontFamily: 'Roboto', fontSize: '0.75rem', fontWeight: 400, color: '#fff', textTransform: 'uppercase', lineHeight: 1 }}>{this.state.text}</Typography>
                </div>
            </div>
        );
    }
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export class HomeCat extends React.Component{
    
    static fetchData(propsData) {
        let data = {
            type: 'get_page_info', 
            city_id: get_city(propsData),
            page: '',
            link: propsData,
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
    
    render(){
        return (
            <Home data={this.props.data} city={this.props.city} this_link={this.props.this_link} />
        )
    }
}

export class Home extends React.Component {
    _isMounted = false;
    startMove = 0;
    activeID = 0;
    firebaseAnalitic = null;

    constructor(props) {
        super(props);
        
        this.state = {      
            allItems: [],  
            is_load: false,
            testData: [1, 2, 3, 4, 5, 6, 7, 8],
            openItem: null,
            openItemSet: null,
            openModal: false,
            openModalPC: false,
            openModalPCSet: false,
            openModalPCSetItems: [],
            openModalPCInfo: false,
            openModalPCInfoItems: [],
            banners_pc: [],
            banners_mobile: [],
            city_name: this.props.city,
            page: this.props.data ? this.props.data.page : null,
            title: this.props.data ? this.props.data.title : null,
            description: this.props.data ? this.props.data.description : null,
            mainLink: this.props.this_link
        };
        
        if( this.props.data ){
            this.loadBanners( this.props.data.all.other.cats.baners );
        }
        itemsStore.setCity(this.props.city);
    }

    loadBanners(banners){
        let banners_pc = [],
            banners_mobile = [];
        
        banners.map((item, key) => {
            if( item.aktia_id && parseInt(item.aktia_id) > 0 ){
                banners_pc.push(
                    <Link
                        to={'/'+itemsStore.getCity()+'/akcii?act_'+item.aktia_id}
                        exact={ true }
                        style={{ width: 'inherit', height: 'auto'/*, borderRadius: 15*/ }}
                    >
                        <picture style={{ width: 'inherit', height: 'auto' }}>
                            <source 
                                srcSet={"https://storage.yandexcloud.net/site-home-img/"+item.img_new+"3700х1000.webp?"+item.img_new_update} 
                                type="image/webp" 
                            />
                            <img 
                                src={"https://storage.yandexcloud.net/site-home-img/"+item.img_new+"3700х1000.jpg?"+item.img_new_update} 
                                //alt={this.state.item.name}
                                //title={this.state.item.name}
                                style={{ width: 'inherit', height: 'auto', minHeight: 200/*, borderRadius: 15*/ }}
                                onDragStart={handleDragStart}
                            />
                        </picture>
                    </Link>
                )
                
                banners_mobile.push(
                    <Link
                        to={'/'+itemsStore.getCity()+'/akcii?act_'+item.aktia_id}
                        exact={ true }
                        style={{ width: 'inherit', height: 'auto'/*, borderRadius: 15*/ }}
                    >
                        <picture style={{ width: 'inherit', height: 'auto' }}>
                            <source 
                                srcSet={"https://storage.yandexcloud.net/site-home-img/"+item.img_new+"1000х500.webp?"+item.img_new_update} 
                                type="image/webp" 
                            />
                            <img 
                                src={"https://storage.yandexcloud.net/site-home-img/"+item.img_new+"1000х500.jpg?"+item.img_new_update} 
                                //alt={this.state.item.name}
                                //title={this.state.item.name}
                                style={{ width: 'inherit', height: 'auto'/*, borderRadius: 15*/ }}
                                onDragStart={handleDragStart}
                            />
                        </picture>
                    </Link>
                )
                
            }else{
                if( item.item && parseInt(item.item) > 0 ){
                    banners_pc.push(
                        <picture style={{ width: 'inherit', height: 'auto' }}>
                            <source 
                                srcSet={"https://storage.yandexcloud.net/site-home-img/"+item.img_new+"3700х1000.webp?"+item.img_new_update} 
                                type="image/webp" 
                            />
                            <img 
                                src={"https://storage.yandexcloud.net/site-home-img/"+item.img_new+"3700х1000.jpg?"+item.img_new_update} 
                                //alt={this.state.item.name}
                                //title={this.state.item.name}
                                style={{ width: 'inherit', height: 'auto', minHeight: 200/*, borderRadius: 15*/ }}
                                onDragStart={handleDragStart}
                                onClick={this.openItemPC.bind(this, item.item)}
                            />
                        </picture>
                    )
                    
                    banners_mobile.push(
                        <picture style={{ width: 'inherit', height: 'auto' }}>
                            <source 
                                srcSet={"https://storage.yandexcloud.net/site-home-img/"+item.img_new+"1000х500.webp?"+item.img_new_update} 
                                type="image/webp" 
                            />
                            <img 
                                src={"https://storage.yandexcloud.net/site-home-img/"+item.img_new+"1000х500.jpg?"+item.img_new_update} 
                                //alt={this.state.item.name}
                                //title={this.state.item.name}
                                style={{ width: 'inherit', height: 'auto'/*, borderRadius: 15*/ }}
                                onDragStart={handleDragStart}
                                onClick={this.openItem.bind(this, item.item)}
                            />
                        </picture>
                    )
                }else{
                    banners_pc.push(
                        <picture style={{ width: 'inherit', height: 'auto' }}>
                            <source 
                                srcSet={"https://storage.yandexcloud.net/site-home-img/"+item.img_new+"3700х1000.webp?"+item.img_new_update} 
                                type="image/webp" 
                            />
                            <img 
                                src={"https://storage.yandexcloud.net/site-home-img/"+item.img_new+"3700х1000.jpg?"+item.img_new_update} 
                                //alt={this.state.item.name}
                                //title={this.state.item.name}
                                style={{ width: 'inherit', height: 'auto', minHeight: 200/*, borderRadius: 15*/ }}
                                onDragStart={handleDragStart}
                            />
                        </picture>
                    )
                    
                    banners_mobile.push(
                        <picture style={{ width: 'inherit', height: 'auto' }}>
                            <source 
                                srcSet={"https://storage.yandexcloud.net/site-home-img/"+item.img_new+"1000х500.webp?"+item.img_new_update} 
                                type="image/webp" 
                            />
                            <img 
                                src={"https://storage.yandexcloud.net/site-home-img/"+item.img_new+"1000х500.jpg?"+item.img_new_update} 
                                //alt={this.state.item.name}
                                //title={this.state.item.name}
                                style={{ width: 'inherit', height: 'auto'/*, borderRadius: 15*/ }}
                                onDragStart={handleDragStart}
                            />
                        </picture>
                    )
                }
            }
        })
        
        this.setState({ 
            banners_pc: banners_pc,
            banners_mobile: banners_mobile
        });
    }
    
    static fetchData(propsData) {
        let data = {
            type: 'get_page_info', 
            city_id: get_city(propsData),
            page: '',
            link: propsData,
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
    
    componentDidUmount(){
        window.removeEventListener('scroll');
    }
    
    componentDidMount = () => {
        this._isMounted = true; 
        var time = Date.now();
        
        let arrMax = [];
        
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

        const AllItemsCatNew = itemsStore.getAllItemsCatNew();
        const AllItemsCat = itemsStore.getAllItemsCat();
        
        setTimeout( () => {
            window.addEventListener('scroll', function() {
                if( this._isMounted ){
                    if ((time + 500 - Date.now()) < 0) {
                        AllItemsCat.map( (item, key) => {
                            var elem = document.getElementById('cat'+item.id);
                            if( elem ){
                                var top = elem.getBoundingClientRect().top + document.body.scrollTop - 200;
                                
                                if(top < 0){
                                    arrMax.push({ name: item.name, Y: top, main_id: item.main_id })
                                }
                            }
                        })
                        
                        if( arrMax.length > 0 ){
                            let max = arrMax[ arrMax.length-1 ];
                            
                            arrMax = [];
                            
                            if( max ){
                                if( this.activeID != parseInt(max.main_id) && parseInt(max.main_id) != 0 ){
                                    if( document.querySelector('.activeCat') ){
                                        document.querySelector('.activeCat').classList.remove('activeCat');
                                    }
                                    if( document.querySelector('#link_'+max.main_id) ){
                                        document.querySelector('#link_'+max.main_id).classList.add('activeCat');
                                    }
                                    
                                    this.activeID = parseInt(max.main_id);
                                }
                            }
                        }
                        
                        time = Date.now();
                    }
                }
            });
            
            this.setState({
                is_load: true
            })
        }, 300 )
        
        let data = {
            type: 'get_page_info', 
            city_id: this.state.city_name,
            page: '' 
        };
        
        if (typeof window !== 'undefined') {
            setTimeout(() => {
                if( localStorage.getItem('goTo') ){
                    let hash = localStorage.getItem('goTo')
                    
                    localStorage.removeItem('goTo');
                    
                    let offset = 50;
                    
                    if( document.querySelector('.scrollCat.mobile') ){
                        offset += 50;
                    }
                    
                    setTimeout(()=>{
                        scroller.scrollTo("myScrollToElement", {
                            duration: 800,
                            delay: 800,
                            smooth: "easeInOutQuart",
                            offset: document.getElementById('cat'+hash).getBoundingClientRect()['y'] - offset
                        });
                    }, 150)
                    
                    
                }
            }, 1000);
            
            setTimeout(() => {
                let search = window.location.search;
                
                //
                
                if( search.length > 0 ){
                    
                    let checkItem = search.split('?showItem=');
                    
                    let allItems = itemsStore.getAllItems();
                    let act_id = checkItem[1];

                    act_id = act_id.split('&')[0];
                    //let item = allItems.find( (item) => item.id == act_id );
                    
                    if( window.innerWidth <= 500 ){
                        this.openItem(act_id);
                    }else{
                        this.openItemPC(act_id);
                    }
                    
                    //let str = window.location.pathname;
                    //str.replace("/item/"+act_id, '');
                    
                    //this.props.history.replace({ pathname: checkItem[0] })
                }
                
                
                
                
                let link = window.location.pathname;
                link = link.split('/');
                let mainLink = '';
                
                let check = link.find( (item) => item == 'menu');
                
                if( check && check.length > 0 ){
                    let check2 = link.find( (item) => item == 'item');
                    
                    if( !check2 ){
                        let index = link.findIndex( (item) => item == 'menu');
                        mainLink = link[ index+1 ];
                        
                        if( document.querySelector('.activeCat') ){
                            document.querySelector('.activeCat').classList.remove('activeCat');
                        }
                        
                        if( document.querySelector('[name="'+mainLink+'"]') ){
                            document.querySelector('[name="'+mainLink+'"]').classList.add('activeCat')
                        }
                    }
                }
            }, 750);
        }
        
        //if( !this.props.data ){
            Home.fetchData('/'+this.state.city_name).then( data => {
                this.setState( {
                    page: data.page,
                    title: data.title,
                    description: data.description,


                } );
            } );
        //}
        
        itemsStore.setPage('home');
        
        if( itemsStore.getAllItemsCat().length == 0 ){
            this.setState({
                allItems: itemsStore.getAllItemsCat()
            })
        }
        
        //if( itemsStore.getAllItemsCat().length == 0 ){
            window.scrollTo(0, 0);
        //}
        
        autorun(() => {
            if( this._isMounted ){
                this.setState({
                    allItems: itemsStore.getAllItemsCat(),
                    mainLink: itemsStore.getMainLink()
                })
                
                this.loadBanners(itemsStore.getBanners());
            }
        })
    }

    openItem(id){
        let allItems = itemsStore.getAllItems();
        let item = allItems.find( (item) => item.id == id );
        
        let state = { 'item_id': item.id, 'item_name': item.name },
            title = '',
            url = window.location.pathname+'?showItem='+item.id;

        logEvent(this.firebaseAnalitic, 'open_item', {
            content_type: 'item',
            content_id: item.id,
            items: [{ name: item.name }]
        });

        window.history.pushState(state, title, url)
        
        this.setState({
            openItem: item,
            openModal: true
        })
        
        setTimeout(()=>{
            /*let el = document.getElementById("forSwiper");
            el.addEventListener("touchstart", this.touchStart.bind(this), false);
            el.addEventListener("touchend", this.touchEnd.bind(this), false);*/
        }, 300)
    }
    
    openItemPC(id){
        let allItems = itemsStore.getAllItems();
        let item = allItems.find( (item) => item.id == id );
        
        let state = { 'item_id': item.id, 'item_name': item.name },
            title = '',
            url = window.location.pathname+'?showItem='+item.id;

        logEvent(this.firebaseAnalitic, 'open_item', {
            content_type: 'item',
            content_id: item.id,
            items: [{ name: item.name }]
        });

        window.history.pushState(state, title, url)
        
        this.setState({
            openItem: item,
            openModalPC: true
        })
    }

    openModal(){
        this.setState({
            openModal: true
        })
    }
    
    handleClose(){
        /*let el = document.getElementById("forSwiper");
        el.removeEventListener("touchstart", this.touchStart.bind(this), false);
        el.removeEventListener("touchend", this.touchEnd.bind(this), false);*/
        
        let state = { },
            title = '',
            url = window.location.pathname;

        window.history.pushState(state, title, url)
        
        this.setState({
            openModal: false,
            openItem: null
        })
    }
    
    handleClosePC(){
        
        let state = { },
            title = '',
            url = window.location.pathname;

        window.history.pushState(state, title, url)
        
        this.setState({
            openModalPC: false,
            openItem: null,

            openModalPCSet: false,
            openModalPCSetItems: []
        })
    }

    handleClosePCSet(){
        this.setState({
            openModalPCSet: false,
            openModalPCSetItems: []
        })
    }

    handleClosePCInfo(){
        this.setState({
            openModalPCInfo: false,
            openModalPCInfoItems: []
        })
    }

    touchStart(el){
        this.startMove = el['changedTouches'][0].pageY;
    }
    
    touchEnd(el){
        if( el['changedTouches'][0].pageY - this.startMove > 125 ){
            this.handleClose();
        }
    }
    
    openSetPc(items){
        this.setState({
            openModalPCSet: true,
            openModalPCSetItems: items
        })
    }

    openInfo(items){
        this.setState({
            openModalPCInfo: true,
            openModalPCInfoItems: items
        })
    }

    render() {
        //this.props.data.page.page_h
        
        let link = this.state.mainLink;
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
            
            if( this.state.mainLink != location ){
                
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
            this.state.is_load === false ?
                <Element name="myScrollToElement" className="Category">
                    
                    <Typography variant="h5" component="h1" style={{ paddingBottom: 20 }}>{ this.state.page ? this.state.page.page_h : '' }</Typography>
                    
                    {itemsStore.getAllItemsCat().map((cat, key) => 
                        mainLink == '' || mainLink == cat.main_link ?
                            <div key={key} name={"cat"+cat.main_id} id={"cat"+cat.id}>
                                <Grid container spacing={2} style={{ margin: 0, padding: '0px 36px', flexWrap: 'wrap', width: '100%', paddingBottom: 40 }} className="MainItems mainContainer">
                                    <Typography variant="h5" component="h2">{ cat.name }</Typography>
                                </Grid>
                                <Grid container spacing={2} style={{ margin: 0, padding: '0px 10px', paddingBottom: 20, flexWrap: 'wrap', width: '100%' }} className="MainItems mainContainer" >
                                    {cat.items.map((it, k) => (
                                        <Grid item xs={12} sm={4} md={3} xl={3} key={k} style={{ padding: '10px 8px', display: 'flex'}}>
                                            <CardItemBot city={this.state.city_name} data={it} type={'pc'} openItem={this.openItemPC.bind(this)} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </div>
                                :
                            null
                    )}
                    
                    <Hidden mdUp>
                        <Backdrop style={{ zIndex: 4, color: '#fff' }} open={true}>
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    </Hidden>
                </Element>
                    :
                <Element name="myScrollToElement" className="Category">
            
                    <Helmet>
                        <title>{this.state.title}</title>
                        <meta name="description" content={this.state.description} />
                    </Helmet>
                    
                    <Hidden smDown>
                        { this.state.banners_pc.length == 0 ? null :
                            <CoverFlowCarousel
                                type="pc"
                                data={this.state.banners_pc}
                            />
                        }
                    </Hidden>
                    <Hidden mdUp>
                        { this.state.banners_mobile.length == 0 ? null :
                            <CoverFlowCarousel
                                type="mobile"
                                data={this.state.banners_mobile}
                            />
                        }
                    </Hidden>
                    
                    {itemsStore.getAllItemsCat().map((cat, key) => 
                        cat.items.length > 0 ?
                            mainLink == '' || mainLink == cat.main_link || mainLink == cat.link ?
                                <div key={key} name={"cat"+cat.main_id} id={"cat"+cat.id}>
                                    <Grid container spacing={2} style={{ margin: 0, padding: '0px 20px', flexWrap: 'wrap', width: '100%' }} className="MainItems mainContainer" >
                                        {cat.items.map((it, k) => (
                                            <React.Fragment key={k}>
                                                <Hidden xsDown>
                                                    <Grid item xs={12} sm={6} md={4} lg={3} xl={3} style={{ padding: '30px 16px', display: 'flex', width: '100%' }}>
                                                        <CardItem data={it} type={'pc'} openItem={this.openItemPC.bind(this)} />
                                                    </Grid>
                                                </Hidden>
                                                <Hidden smUp>
                                                    <Grid item xs={12} sm={6} md={4} lg={3} xl={3} style={{ display: 'flex', padding: '10px 0px', borderBottom: cat.items.length-1 == k && itemsStore.getAllItemsCat().length-1 == key ? 'none' : '1px solid rgba(27, 27, 31, 0.1)' }}>
                                                        <CardItem data={it} type={'mobile'} openItem={this.openItem.bind(this)} />
                                                    </Grid>
                                                </Hidden>
                                            </React.Fragment>
                                        ))}
                                    </Grid>
                                </div>
                                    :
                                null
                                :
                            null
                    )}
                    
                    {this.state.openItem ?
                        <Dialog disableElevation fullScreen open={this.state.openModal} className="ItemDialog" onClose={this.handleClose.bind(this)} TransitionComponent={Transition}>
                            <MuiDialogTitle disableTypography style={{ margin: 0, padding: 0 }}>
                                <IconButton aria-label="close" style={{ position: 'absolute', top: -47, left: 8, backgroundColor: 'transparent' }} onClick={this.handleClose.bind(this)}>
                                    <IconClose style={{ width: 25, height: 25 }} />
                                </IconButton>
                            </MuiDialogTitle>
                            <div>
                                <Item2 itemId={this.state.openItem.id} item={this.state.openItem} openSetPc={this.openSetPc.bind(this)} openInfo={this.openInfo.bind(this)} openModalPCInfo={this.state.openModalPCInfo} />
                            </div>
                        </Dialog>
                            :
                        null
                    }
                    
                    {this.state.openItem ?
                        <>
                            <Hidden lgUp>
                                <Dialog disableElevation maxWidth={'md'} fullWidth={true} style={{ borderRadius: 50 }} onClose={this.handleClosePC.bind(this)} className="modalActii Item OpenItemPC testModalMD" open={this.state.openModalPC}>
                                    <IconButton className='IconButtonClose' aria-label="close" style={{ position: 'absolute', top: -52, left: 16, zIndex: 1500, width: 52, height: 52, backgroundColor: 'transparent' }} onClick={this.handleClosePC.bind(this)}>
                                        <IconClose />
                                    </IconButton>
                                    
                                    <MuiDialogContent className="modalActiiContentNew" style={{ overflow: 'hidden' }}>
                                        <Item2 itemId={this.state.openItem.id} item={this.state.openItem} openSetPc={this.openSetPc.bind(this)} openInfo={this.openInfo.bind(this)} openModalPCInfo={this.state.openModalPCInfo} />
                                    </MuiDialogContent>
                                </Dialog>
                            </Hidden>
                            
                            <Hidden only={['xs', 'sm', 'md']}>
                                <Dialog disableElevation maxWidth={'lg'} fullWidth={true} style={{ borderRadius: 50 }} onClose={this.handleClosePC.bind(this)} className="modalActii Item OpenItemPC testModalLG" open={this.state.openModalPC}>
                                    <IconButton className='IconButtonClose' aria-label="close" style={{ position: 'absolute', top: -52, left: 16, zIndex: 1500, width: 52, height: 52, backgroundColor: 'transparent' }} onClick={this.handleClosePC.bind(this)}>
                                        <IconClose />
                                    </IconButton>
                                    
                                    <MuiDialogContent className="modalActiiContentNew" style={{ overflow: 'hidden' }}>
                                        <Item2 itemId={this.state.openItem.id} item={this.state.openItem} openSetPc={this.openSetPc.bind(this)} openInfo={this.openInfo.bind(this)} openModalPCInfo={this.state.openModalPCInfo} />
                                    </MuiDialogContent>
                                </Dialog>
                            </Hidden>
                        </>
                            :
                        null
                    }

                    {this.state.openItem ?
                        <>
                            <Hidden smUp>
                                <Dialog disableElevation fullScreen style={{ width: '100%', marginTop: this.state.openItem.items.length > 1 ? 400 : 470, backgroundColor: 'rgba(0, 0, 0, 0.6)', borderTopRightRadius: 30, borderTopLeftRadius: 30 }} onClose={this.handleClosePCInfo.bind(this)} className="ItemDialog OpenItemMobInfo blurBacground" open={this.state.openModalPCInfo} TransitionComponent={Transition}>
                                    <MuiDialogTitle disableTypography style={{ margin: 0, padding: 0 }}>
                                        <IconButton aria-label="close" style={{ position: 'absolute', top: -47, left: 8, backgroundColor: 'transparent' }} onClick={this.handleClosePCInfo.bind(this)}>
                                            <IconClose style={{ width: 25, height: 25 }} />
                                        </IconButton>
                                    </MuiDialogTitle>
                                    
                                    <MuiDialogContent className="modalActiiContentNew" style={{ height: this.state.openItem.items.length > 1 ? 'calc(100vh - 400px)' : 'calc(100vh - 470px)', padding: 20, display: 'flex', flexWrap: 'wrap', alignContent: 'start' }}>

                                        <Typography variant="h5" component="h1" style={{ textAlign: 'center', fontFamily: 'Roboto', fontWeight: 700, fontSize: '1.625rem', color: '#fff', width: '100%', marginBottom: 20 }}>Пищевая ценность на 100 г</Typography>

                                        { this.state.openItem.items.length == 1 ? null :
                                            <div style={{ width: '100%', height: 2, backgroundColor: '#fff', marginBottom: 20 }} />
                                        }

                                        <div style={ this.state.openItem.items.length > 1 ? { overflowY: 'scroll', maxHeight: 200 } : {}}>
                                            { this.state.openItem.items.map( (item, key) =>
                                                <div style={{ border: '2px solid #fff', borderRadius: 10, marginBottom: this.state.openItem.items.length == 1 ? 0 : this.state.openItem.items.length-1 == key ? 0 : 20 }} key={key}>
                                                    <div style={{ width: '100%', display: 'flex', flexDirection: 'row', borderBottom: '2px solid #fff' }}>
                                                        <div style={{ width: '75%', display: 'flex', alignItems: 'center', borderRight: '2px solid #fff', padding: 10 }}>
                                                            <Typography style={{ fontFamily: 'Roboto', fontWeight: 400, fontSize: '1.1rem', lineHeight: 1.25, color: '#fff' }}>{item.name}</Typography>
                                                        </div>
                                                        <div style={{ width: '25%', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', padding: 10 }}>
                                                            <Typography style={{ fontSize: '2rem', lineHeight: 1, fontFamily: 'Roboto', fontWeight: 500, color: '#fff' }}>{item.kkal}</Typography>
                                                            <Typography style={{ fontSize: '1rem', lineHeight: 0.8, fontFamily: 'Roboto', fontWeight: 400, color: '#fff' }}>ккал</Typography>
                                                        </div>
                                                    </div>
                                                    <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                                                        <div style={{ width: '50%', padding: 10, borderRight: '2px solid #fff' }}>
                                                            <Typography style={{ fontSize: '0.8rem', fontFamily: 'Roboto', fontWeight: 400, color: '#fff' }}>Состав: {item.tmp_desc}</Typography>
                                                        </div>
                                                        <div style={{ width: '50%', padding: 10 }} className='styleTooltip'>
                                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                <Typography style={{ fontSize: '0.8rem', fontFamily: 'Roboto', fontWeight: 400, order: 1, color: '#fff' }}>белки</Typography>
                                                                <Typography style={{ fontSize: '0.8rem', fontFamily: 'Roboto', fontWeight: 400, order: 3, color: '#fff' }}>{item.protein} г</Typography>
                                                            </div>
                                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                <Typography style={{ fontSize: '0.8rem', fontFamily: 'Roboto', fontWeight: 400, order: 1, color: '#fff' }}>жиры</Typography>
                                                                <Typography style={{ fontSize: '0.8rem', fontFamily: 'Roboto', fontWeight: 400, order: 3, color: '#fff' }}>{item.fat} г</Typography>
                                                            </div>
                                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                <Typography style={{ fontSize: '0.8rem', fontFamily: 'Roboto', fontWeight: 400, order: 1, color: '#fff' }}>углеводы</Typography>
                                                                <Typography style={{ fontSize: '0.8rem', fontFamily: 'Roboto', fontWeight: 400, order: 3, color: '#fff' }}>{item.carbohydrates} г</Typography>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) }
                                        </div>
                                        
                                        
                                    </MuiDialogContent>
                                </Dialog>
                            </Hidden>

                            <Hidden smUp>
                                <Dialog disableElevation fullScreen style={{ height: 'calc(100vh - 50px)', width: '100%' }} onClose={this.handleClosePCSet.bind(this)} className="ItemDialog OpenItemMobSet" open={this.state.openModalPCSet} TransitionComponent={Transition}>
                                    <MuiDialogTitle disableTypography style={{ margin: 0, padding: 0 }}>
                                        <IconButton aria-label="close" style={{ position: 'absolute', top: -47, left: 8, backgroundColor: 'transparent' }} onClick={this.handleClosePCSet.bind(this)}>
                                            <IconClose style={{ width: 25, height: 25 }} />
                                        </IconButton>
                                    </MuiDialogTitle>
                                    
                                    <MuiDialogContent className="modalActiiContentNew" style={{ height: 'calc(100vh - 50px)', padding: 20, display: 'flex', flexWrap: 'wrap', alignContent: 'start' }}>

                                        <Typography variant="h5" component="h1" style={{ textAlign: 'center', fontFamily: 'Roboto', fontWeight: 700, fontSize: '1.625rem', color: '#525252', width: '100%' }}>{this.state.openItem.name}</Typography>

                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                                            <div style={{ width: parseInt( this.state.openItem.cat_id ) == 4 ? 238 : parseInt( this.state.openItem.cat_id ) == 5 || parseInt( this.state.openItem.cat_id ) == 6 || parseInt( this.state.openItem.cat_id ) == 7 ? 78 : 148, height: 28, border: '1px solid #DADADA', borderRadius: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 10, marginBottom: 20 }}>
                                                { parseInt( this.state.openItem.cat_id ) == 4 ?
                                                    <>
                                                        <Typography variant="h5" component="span" className='ModalItemOther' style={{ flex: 3, textAlign: 'center', fontFamily: 'Roboto', fontWeight: 400, fontSize: '0.87rem', color: '#525252' }}>{this.state.openItem.count_part_new}</Typography>
                                                        <div style={{ height: '100%', borderLeft: '1px solid #DADADA' }} />
                                                    </>
                                                        :
                                                    null
                                                }
                                                { parseInt( this.state.openItem.cat_id ) == 5 || parseInt( this.state.openItem.cat_id ) == 6 || parseInt( this.state.openItem.cat_id ) == 7 ?
                                                    null
                                                        :
                                                    <>
                                                        <Typography variant="h5" component="span" className='ModalItemOther' style={{ flex: parseInt( this.state.openItem.cat_id ) == 4 ? 2 : 3, textAlign: 'center', fontFamily: 'Roboto', fontWeight: 400, fontSize: '0.87rem', color: '#525252' }}>{ parseInt( this.state.openItem.cat_id ) == 14 ? this.state.openItem.size_pizza + ' см' : this.state.openItem.count_part + ' шт.' }</Typography>
                                                        <div style={{ height: '100%', borderLeft: '1px solid #DADADA' }} />
                                                    </>
                                                }
                                                <Typography variant="h5" component="span" className='ModalItemOther' style={{ flex: 3, textAlign: 'center', fontFamily: 'Roboto', fontWeight: 400, fontSize: '0.87rem', color: '#525252' }}>{ new Intl.NumberFormat('ru-RU').format(this.state.openItem.weight)} { parseInt( this.state.openItem.cat_id ) == 6 ? 'л' : 'г' }</Typography>
                                            </div>
                                        </div>
                                        
                                        <div style={{ width: '100%', height: '100%', maxHeight: 'calc(100vh - 250px)', overflow: 'auto' }}>
                                            {this.state.openModalPCSetItems.map( (item, key) =>
                                                <div key={key} style={{ width: '100', display: 'flex', flexDirection: 'row', padding: '10px 0', borderTop: key == 0 ? '1px solid rgba(27, 27, 31, 0.1)' : null, borderBottom: '1px solid rgba(27, 27, 31, 0.1)' }}>
                                                    <div style={{ width: '40%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        { item.img_app.length == 0 || !item.img_app ?
                                                            <picture>
                                                                <source 
                                                                    srcSet={"https://storage.yandexcloud.net/site-img/"+item.img_new+"600х400.webp?"+item.img_new_update} 
                                                                    type="image/webp" 
                                                                />
                                                                <img 
                                                                    src={"https://storage.yandexcloud.net/site-img/"+item.img_new+"600х400.jpg?"+item.img_new_update} 
                                                                    alt={item.name}
                                                                    title={item.name}
                                                                    style={{ width: '100%', height: 'auto' }}
                                                                />
                                                            </picture>
                                                                :
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
                                                                <img alt={item.name} title={item.name} style={{ width: '100%', height: 'auto' }} src={`https://storage.yandexcloud.net/site-img/${item.img_app}_276x276.jpg`} />
                                                            </picture>
                                                        }
                                                    </div>
                                                    <div style={{ width: '60%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                                        <Typography variant="h5" component="span" style={{ fontFamily: 'Roboto', fontWeight: 700, fontSize: '1.06rem', color: '#525252'  }}>{ item.name }</Typography>
                                                        <Typography variant="h5" component="span" style={{ fontFamily: 'Roboto', fontWeight: 400, fontSize: '0.875rem', color: '#525252'  }}>{ item.tmp_desc }</Typography>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </MuiDialogContent>
                                </Dialog>
                            </Hidden>

                            <Hidden only={['xs', 'sm', 'lg', 'xl']}>
                                <Dialog disableElevation maxWidth={'md'} fullWidth={true} style={{ borderRadius: 50 }} onClose={this.handleClosePCSet.bind(this)} className="modalActii Item OpenItemPCSet" open={this.state.openModalPCSet}>
                                    <IconButton className='IconButtonClose' aria-label="close" style={{ position: 'absolute', top: -52, left: 16, zIndex: 2000, width: 52, height: 52, backgroundColor: 'transparent' }} onClick={this.handleClosePCSet.bind(this)}>
                                        <IconClose />
                                    </IconButton>
                                    
                                    <MuiDialogContent className="modalActiiContentNew" style={{ display: 'flex', flexWrap: 'wrap', padding: '2% 2.25% 2% 4.5%', alignContent: 'start' }}>
                                        {this.state.openModalPCSetItems.map( (item, key) =>
                                            <div key={key} style={{ width: '49%', display: 'flex', flexDirection: 'row', marginRight: key == 0 || key % 2 == 0 ? '2%' : 0, marginBottom: '2%' }}>
                                                <div style={{ width: '30%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    { item.img_app.length == 0 || !item.img_app ?
                                                        <picture>
                                                            <source 
                                                                srcSet={"https://storage.yandexcloud.net/site-img/"+item.img_new+"600х400.webp?"+item.img_new_update} 
                                                                type="image/webp" 
                                                            />
                                                            <img 
                                                                src={"https://storage.yandexcloud.net/site-img/"+item.img_new+"600х400.jpg?"+item.img_new_update} 
                                                                alt={item.name}
                                                                title={item.name}
                                                                style={{ width: '100%', height: 'auto' }}
                                                            />
                                                        </picture>
                                                            :
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
                                                            <img alt={item.name} title={item.name} style={{ width: '100%', height: 'auto' }} src={`https://storage.yandexcloud.net/site-img/${item.img_app}_276x276.jpg`} />
                                                        </picture>
                                                    }
                                                </div>
                                                <div style={{ width: '70%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                                    <Typography variant="h5" component="span" style={{ fontFamily: 'Roboto', fontWeight: 500, fontSize: '1.25rem'  }}>{ item.name }</Typography>
                                                    <Typography variant="h5" component="span" style={{ fontFamily: 'Roboto', fontWeight: 300, fontSize: '0.94rem'  }}>{ item.tmp_desc }</Typography>
                                                </div>
                                            </div>
                                        )}
                                    </MuiDialogContent>
                                </Dialog>
                            </Hidden>
                            
                            <Hidden only={['xs', 'sm', 'md']}>
                                <Dialog disableElevation maxWidth={'lg'} fullWidth={true} style={{ borderRadius: 50 }} onClose={this.handleClosePCSet.bind(this)} className="modalActii Item OpenItemPCSet" open={this.state.openModalPCSet}>
                                    <IconButton className='IconButtonClose' aria-label="close" style={{ position: 'absolute', top: -52, left: 16, zIndex: 2000, width: 52, height: 52, backgroundColor: 'transparent' }} onClick={this.handleClosePCSet.bind(this)}>
                                        <IconClose />
                                    </IconButton>
                                    
                                    <MuiDialogContent className="modalActiiContentNew" style={{ display: 'flex', flexWrap: 'wrap', padding: '2% 2.25% 2% 4.5%', marginRight: '2.25%', alignContent: 'start' }}>
                                        {this.state.openModalPCSetItems.map( (item, key) =>
                                            <div key={key} style={{ width: '49%', display: 'flex', flexDirection: 'row', marginRight: key == 0 || key % 2 == 0 ? '2%' : 0, marginBottom: '2%' }}>
                                                <div style={{ width: '45%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    { item.img_app.length == 0 || !item.img_app ?
                                                        <picture>
                                                            <source 
                                                                srcSet={"https://storage.yandexcloud.net/site-img/"+item.img_new+"600х400.webp?"+item.img_new_update} 
                                                                type="image/webp" 
                                                            />
                                                            <img 
                                                                src={"https://storage.yandexcloud.net/site-img/"+item.img_new+"600х400.jpg?"+item.img_new_update} 
                                                                alt={item.name}
                                                                title={item.name}
                                                                style={{ width: '100%', height: 'auto' }}
                                                            />
                                                        </picture>
                                                            :
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
                                                            <img alt={item.name} title={item.name} style={{ width: '100%', height: 'auto' }} src={`https://storage.yandexcloud.net/site-img/${item.img_app}_276x276.jpg`} />
                                                        </picture>
                                                    }
                                                </div>
                                                <div style={{ width: '55%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                                    <Typography variant="h5" component="span" style={{ fontFamily: 'Roboto', fontWeight: 700, fontSize: '1.25rem', color: '#525252' }}>{ item.name }</Typography>
                                                    <Typography variant="h5" component="span" style={{ fontFamily: 'Roboto', fontWeight: 400, fontSize: '0.9rem', color: '#525252'  }}>{ item.tmp_desc }</Typography>
                                                </div>
                                            </div>
                                        )}
                                    </MuiDialogContent>
                                </Dialog>
                            </Hidden>
                        </>
                            :
                        null
                    }
                    
                </Element>
        )
    }
}