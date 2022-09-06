import React from 'react';
import { NavLink as Link } from 'react-router-dom';

import Grid from '@mui/material/Grid';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import * as Scroll from 'react-scroll';

var Element  = Scroll.Element;
var Events  = Scroll.Events;
var scroller = Scroll.scroller;
const queryString = require('query-string');
import axios from 'axios';

import {Helmet} from "react-helmet";

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import itemsStore from '../../stores/items-store';
import config from '../../stores/config';

import { autorun } from "mobx"

import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';

import { Link as ScrollLink } from "react-scroll";

//import LazyLoad from 'react-lazyload';

import { ActionsCartButton, ActionsCartButtonStart, IconRuble, IconClose } from '../../stores/elements';

import useMediaQuery from '@mui/material/useMediaQuery';
import mediaQuery from 'css-mediaquery';

import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

var firebaseAPP = null;

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
            //modules: [Navigation, Pagination, A11y, Autoplay],

            grabCursor: this_count == 1 ? false : true,
            loop: this_count == 1 ? false : true,
            centeredSlidesBounds: false,
            setWrapperSize: this_count == 1 ? false : true,
            autoHeight: true,
            //spaceBetween: 100,
            centeredSlides: true,
            slidesPerView: count,
            
            //autoplay: this_count == 1 ? false : true,
            autoplay: {
                delay: 5000,
            },
            
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                //clickable: true,
                
            },

            /*pagination: this_count == 1 ? false : this.state.type == 'pc' ? true : true,
            pagination: this_count == 1 ? {} : this.state.type == 'pc' ? {
                el: ".swiper-pagination",
                clickable: true,
                type: 'bullets',
                renderBullet: function (index, className) {
                    return '<span class="' + className + '">' + (index + 1) + '</span>';
                },
            } : {},*/
            navigation: this_count == 1 ? {} : this.state.type == 'pc' ? {
                nextEl: ".swiper-button-next", // arrows on the side of the slides
                prevEl: ".swiper-button-prev", // arrows on the side of the slides
            } : {},
        });
    }
     
    render() {

        return (
            <div className={"swiper-container swiper_"+this.state.type+" _h1_"} style={{ overflow: 'hidden', position: 'relative' }}>
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
                        <div className="swiper-button-prev" />
                        <div className="swiper-button-next" />
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

const handleDragStart = (e) => e.preventDefault();

function get_city(path){
    
    path = path.split('/');
    path = path.filter( (item) => item != '' );
    
    return path[ 0 ];
}

import { Item } from '../item';

function ItemHookAdaptive(props) {
    const matches = useMediaQuery('(min-width:600px)', { noSsr: false });

    //console.log( 'props.device', props.device )
    //console.log( 'matches', matches )

    let device = props.device ? props.device : matches === true ? 'desktop' : 'mobile';

    console.log( 'device', device, props.type )

    if( props.type == 'bot' ){
        if( device == 'desktop' ){
            console.log( 'render pc user' )
            return (
                <Grid item className='_PC_' xs={12} sm={6} md={4} lg={3} xl={3} sx={{ display: 'flex' }} style={{ padding: '30px 16px', width: '100%' }}>
                    <CardItemBotNew data={props.data} type={'pc'} openItem={props.openItemPC} />
                </Grid>
            )
        }
    
        console.log( 'render mobile user' )
        return (
            <Grid item className='_mobile_' xs={12} sm={6} md={4} lg={3} xl={3} sx={{ display: 'flex' }} style={{ padding: '10px 0px', borderBottom: props.isLast ? 'none' : '1px solid rgba(27, 27, 31, 0.1)' }}>
                <CardItemBotNew data={props.data} type={'mobile'} openItem={props.openItemMobile} />
            </Grid>
        )
    }else{
        if( device !== 'mobile' ){
            console.log( 'render pc user' )
            return (
                <Grid item className='_PC_' xs={12} sm={6} md={4} lg={3} xl={3} sx={{ display: 'flex' }} style={{ padding: '30px 16px', width: '100%' }}>
                    <CardItem data={props.data} type={'pc'} openItem={props.openItemPC} />
                </Grid>
            )
        }
    
        console.log( 'render mobile user' )
        return (
            <Grid item className='_mobile_' xs={12} sm={6} md={4} lg={3} xl={3} sx={{ display: 'flex' }} style={{ padding: '10px 0px', borderBottom: props.isLast ? 'none' : '1px solid rgba(27, 27, 31, 0.1)' }}>
                <CardItem data={props.data} type={'mobile'} openItem={props.openItemMobile} />
            </Grid>
        )
    }
}

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
    
    isEqual(object1, object2) {
        const props1 = Object.getOwnPropertyNames(object1);
        const props2 = Object.getOwnPropertyNames(object2);
      
        if (props1.length !== props2.length) {
            return false;
        }
      
        for (let i = 0; i < props1.length; i += 1) {
            const prop = props1[i];
      
            if (object1[prop] !== object2[prop]) {
                return false;
            }
        }
      
        return true;
    }

    /*shouldComponentUpdate(nextProps, nextState) {
        return !this.isEqual(nextState, this.state);
    }*/
    
    render() {
        const img_name = this.state.item.img_app.length > 0 ? this.state.item.img_app : this.state.item.img_new;
        const img_type = this.state.item.img_app.length > 0 ? 'new' : 'old';

        const desc = this.state.item.marc_desc.length > 0 ? this.state.item.marc_desc : this.state.item.tmp_desc;

        //const width = window.innerWidth;

        let width = 0;
        let GRID = 0;

        //const GRID = (width- 7*20) / 6;

        if( this.props.type == 'pc' ){

            if (typeof window !== 'undefined') {
                width = window.innerWidth;
            }else{
                width = 1280;
            }

            GRID = (width- 7*20) / 6;

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
                                    loading="lazy"
                                />
                            </picture>
                                :
                            <picture>
                                <source 
                                    type="image/webp" 
                                    srcset={`
                                        https://storage.yandexcloud.net/site-img/${img_name}_276x276.webp 138w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_292x292.webp 146w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_366x366.webp 183w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_466x466.webp 233w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_585x585.webp 292w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_732x732.webp 366w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_1168x1168.webp 584w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_1420x1420.webp 760w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_2000x2000.webp 1875w`} 
                                    sizes="(max-width=1439px) 233px, (max-width=1279px) 218px, 292px" />
                                <source 
                                    type="image/jpeg" 
                                    srcset={`
                                        https://storage.yandexcloud.net/site-img/${img_name}_276x276.jpg 138w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_292x292.jpg 146w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_366x366.jpg 183w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_466x466.jpg 233w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_585x585.jpg 292w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_732x732.jpg 366w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_1168x1168.jpg 584w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_1420x1420.jpg 760w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_2000x2000.jpg 1875w`} 
                                    sizes="(max-width=1439px) 233px, (max-width=1279px) 218px, 292px" />

                                <img 
                                    alt={this.state.item.name} 
                                    title={this.state.item.name} 
                                    src={`https://storage.yandexcloud.net/site-img/${img_name}_292x292.jpg`} 
                                    style={{ minHeight: GRID * 1.125, minWidth: GRID * 1.125 }}
                                    loading="lazy"
                                />
                            </picture>
                        }
                        
                        { parseInt(this.state.item.is_new) == 0 ? 
                            parseInt(this.state.item.is_hit) == 0 ? null :
                            <Badge size={'small'} type={'hit'} view={'pc'} />
                                :
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
                            <ActionsCartButtonStart price={this.state.item.price} add={this.add.bind(this)} />
                                :
                            <ActionsCartButton count={this.state.count} price={this.state.item.price} item_id={this.state.item.id} minus={this.minus.bind(this)} add={this.add.bind(this)} />
                        }
                    </CardActions>
                </Card>
            )
        }
        
        if( this.props.type == 'mobile' ){

            if (typeof window !== 'undefined') {
                width = window.innerWidth;
            }else{
                width = 320;
            }

            GRID = (width- 7*20) / 6;

            return (
                <Grid item container xs={12} className="CardItem_mobile" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>
                    <Grid style={{ position: 'relative', marginRight: '3%' }} item onClick={ () => this.props.openItem(this.state.item.id)}>
                        
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
                                    loading="lazy"
                                />
                            </picture>
                                :
                            <picture>
                                <source 
                                    type="image/webp" 
                                    srcset={`
                                        https://storage.yandexcloud.net/site-img/${img_name}_138x138.webp 138w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_146x146.webp 146w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_183x183.webp 183w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_233x233.webp 233w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_292x292.webp 292w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_366x366.webp 366w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_584x584.webp 584w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_760x760.webp 760w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_1875x1875.webp 1875w`} 
                                    sizes="(max-width=1439px) 233px, (max-width=1279px) 218px, 292px" />
                                <source 
                                    type="image/jpeg" 
                                    srcset={`
                                        https://storage.yandexcloud.net/site-img/${img_name}_138x138.jpg 138w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_146x146.jpg 146w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_183x183.jpg 183w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_233x233.jpg 233w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_292x292.jpg 292w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_366x366.jpg 366w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_584x584.jpg 584w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_760x760.jpg 760w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_1875x1875.jpg 1875w`} 
                                    sizes="(max-width=1439px) 233px, (max-width=1279px) 218px, 292px" />
                                <img 
                                    alt={this.state.item.name} 
                                    title={this.state.item.name} 
                                    src={`https://storage.yandexcloud.net/site-img/${img_name}_366x366.jpg`} 
                                    style={{ width: ((GRID*3) + (2*20)), height: ((GRID*3) + (2*20))  }}
                                    loading="lazy"
                                />
                            </picture>
                        }

                        { parseInt(this.state.item.is_new) == 0 ? 
                            parseInt(this.state.item.is_hit) == 0 ? null :
                            <Badge size={'small'} type={'hit'} view={'mobile'} />
                                :
                            <Badge size={'small'} type={'new'} view={'mobile'} />
                        }
                    </Grid>
                    <Grid item className="SecondBox_" style={{ width: '100%', display: 'flex', flexDirection: 'column', position: 'relative', justifyContent: 'flex-end' }}>
                        <Typography className="CardNameItem_" variant="h5" component="h3" style={{ fontFamily: 'Roboto', fontSize: '1.0625rem', fontWeight: '500', color: '#525252', marginBottom: 10 }} onClick={ () => this.props.openItem(this.state.item.id)}>{this.state.item.name}</Typography>

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

                        <Typography className="CardInfoItem_ hidddenText3" style={{ marginBottom: 10, fontFamily: 'Roboto', fontSize: '0.875rem', fontWeight: 400, color: '#525252', maxHeight: 60, overflow: 'hidden' }} component="p" onClick={() => this.props.openItem(this.state.item.id)}>{desc}</Typography>
                        
                        <div style={{ marginBottom: 10 }}>
                            { this.state.count == 0 ?
                                <ButtonGroup disableElevation={true} disableRipple={true} variant="outlined" className='MobileActionsCartButtonStart'>
                                    <Button variant="outlined" onClick={this.add.bind(this)}>
                                        В корзину за {new Intl.NumberFormat('ru-RU').format( parseInt(this.state.item.price))}
                                        <IconRuble style={{ width: 11, height: 11, fill: '#525252', marginLeft: 3, paddingBottom: 1 }} />
                                    </Button>
                                </ButtonGroup>
                                    :
                                <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className='MobileActionsCartButton'>
                                    <div variant="contained" className='ModalItemButtonCart OPEN' >
                                        <span className='minus' onClick={this.minus.bind(this)}>–</span>
                                        <span>{this.state.count}</span>
                                        <span className='plus' onClick={this.add.bind(this)}>+</span>
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

class CardItemBotNew extends React.Component {
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
    
    isEqual(object1, object2) {
        const props1 = Object.getOwnPropertyNames(object1);
        const props2 = Object.getOwnPropertyNames(object2);
      
        if (props1.length !== props2.length) {
            return false;
        }
      
        for (let i = 0; i < props1.length; i += 1) {
            const prop = props1[i];
      
            if (object1[prop] !== object2[prop]) {
                return false;
            }
        }
      
        return true;
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !this.isEqual(nextState, this.state);
    }
    
    render() {
        const img_name = this.state.item.img_app.length > 0 ? this.state.item.img_app : this.state.item.img_new;
        const img_type = this.state.item.img_app.length > 0 ? 'new' : 'old';

        const desc = this.state.item.marc_desc.length > 0 ? this.state.item.marc_desc : this.state.item.tmp_desc;

        //const width = window.innerWidth;

        let width = 0;
        let GRID = 0;

        //const GRID = (width- 7*20) / 6;

        if( this.props.type == 'pc' ){

            if (typeof window !== 'undefined') {
                width = window.innerWidth;
            }else{
                width = 1280;
            }

            GRID = (width- 7*20) / 6;

            return (
                <Card elevation={0} className="CardItem" style={{ width: '100%' }}>
                    
                    <CardContent style={{ cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }} onClick={ () => this.props.openItem(this.state.item.id)}>
                        
                        {img_type == 'old' ?
                            <picture>
                                <source 
                                    srcSet={"https://storage.yandexcloud.net/site-img/"+this.state.item.img_new+"300х200.webp?"+this.state.item.img_new_update} 
                                    type="image/webp" 
                                />
                                <img 
                                    datasrc={"https://storage.yandexcloud.net/site-img/"+this.state.item.img_new+"300х200.jpg?"+this.state.item.img_new_update} 
                                    alt={this.state.item.name}
                                    title={this.state.item.name}
                                    style={{ minHeight: 150 }}
                                    loading="lazy"
                                />
                            </picture>
                                :
                            <picture>
                                <source 
                                    type="image/webp" 
                                    srcset={`
                                        https://storage.yandexcloud.net/site-img/${img_name}_138x138.webp 138w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_146x146.webp 146w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_183x183.webp 183w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_233x233.webp 233w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_292x292.webp 292w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_366x366.webp 366w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_584x584.webp 584w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_760x760.webp 760w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_1875x1875.webp 1875w`} 
                                    sizes="(max-width=1439px) 233px, (max-width=1279px) 218px, 292px" />
                                <source 
                                    type="image/jpeg" 
                                    srcset={`
                                        https://storage.yandexcloud.net/site-img/${img_name}_138x138.jpg 138w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_146x146.jpg 146w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_183x183.jpg 183w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_233x233.jpg 233w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_292x292.jpg 292w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_366x366.jpg 366w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_584x584.jpg 584w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_760x760.jpg 760w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_1875x1875.jpg 1875w`} 
                                    sizes="(max-width=1439px) 233px, (max-width=1279px) 218px, 292px" />
                                <img 
                                    alt={this.state.item.name} 
                                    title={this.state.item.name}
                                    loading="lazy"
                                    datasrc={`https://storage.yandexcloud.net/site-img/${img_name}138x138.jpg`} />
                            </picture>
                        }
                        
                        { parseInt(this.state.item.is_new) == 0 ? 
                            parseInt(this.state.item.is_hit) == 0 ? null :
                            <Badge size={'small'} type={'hit'} view={'pc'} />
                                :
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
                            <ActionsCartButtonStart price={this.state.item.price} add={this.add.bind(this)} />
                                :
                            <ActionsCartButton count={this.state.count} price={this.state.item.price} item_id={this.state.item.id} minus={this.minus.bind(this)} add={this.add.bind(this)} />
                        }
                    </CardActions>
                </Card>
            )
        }
        
        if( this.props.type == 'mobile' ){

            if (typeof window !== 'undefined') {
                width = window.innerWidth;
            }else{
                width = 320;
            }

            GRID = (width- 7*20) / 6;

            return (
                <Grid item container xs={12} className="CardItem_mobile" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>
                    <Grid style={{ position: 'relative', marginRight: 20 }} item onClick={ () => this.props.openItem(this.state.item.id)}>
                        
                        {img_type == 'old' ?
                            <picture>
                                <source 
                                    srcSet={"https://storage.yandexcloud.net/site-img/"+this.state.item.img_new+"300х200.webp?"+this.state.item.img_new_update} 
                                    type="image/webp" 
                                />
                                <img 
                                    datasrc={"https://storage.yandexcloud.net/site-img/"+this.state.item.img_new+"300х200.jpg?"+this.state.item.img_new_update} 
                                    alt={this.state.item.name}
                                    title={this.state.item.name}
                                    style={{ width: ((GRID*3) + (2*20)), height: 'auto'  }}
                                    loading="lazy"
                                />
                            </picture>
                                :
                            <picture>
                                <source 
                                    type="image/webp" 
                                    srcset={`
                                        https://storage.yandexcloud.net/site-img/${img_name}_138x138.webp 138w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_146x146.webp 146w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_183x183.webp 183w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_233x233.webp 233w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_292x292.webp 292w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_366x366.webp 366w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_584x584.webp 584w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_760x760.webp 760w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_1875x1875.webp 1875w`} 
                                    sizes="(max-width=1439px) 233px, (max-width=1279px) 218px, 292px" />
                                <source 
                                    type="image/jpeg" 
                                    srcset={`
                                        https://storage.yandexcloud.net/site-img/${img_name}_138x138.jpg 138w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_146x146.jpg 146w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_183x183.jpg 183w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_233x233.jpg 233w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_292x292.jpg 292w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_366x366.jpg 366w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_584x584.jpg 584w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_760x760.jpg 760w,
                                        https://storage.yandexcloud.net/site-img/${img_name}_1875x1875.jpg 1875w`} 
                                    sizes="(max-width=1439px) 233px, (max-width=1279px) 218px, 292px" />
                                <img 
                                    alt={this.state.item.name} 
                                    title={this.state.item.name}
                                    loading="lazy"
                                    style={{ width: ((GRID*3) + (2*20)), height: ((GRID*3) + (2*20))  }}
                                    datasrc={`https://storage.yandexcloud.net/site-img/${img_name}138x138.jpg`} />
                            </picture>
                        }

                        { parseInt(this.state.item.is_new) == 0 ? 
                            parseInt(this.state.item.is_hit) == 0 ? null :
                            <Badge size={'small'} type={'hit'} view={'mobile'} />
                                :
                            <Badge size={'small'} type={'new'} view={'mobile'} />
                        }
                    </Grid>
                    <Grid item className="SecondBox_" style={{ width: 'max-content', display: 'flex', flexDirection: 'column', position: 'relative', justifyContent: 'flex-end' }}>
                        <Typography className="CardNameItem_" variant="h5" component="h3" style={{ fontFamily: 'Roboto', fontSize: '1.0625rem', fontWeight: '500', color: '#525252', marginBottom: 10 }} onClick={ () => this.props.openItem(this.state.item.id)}>{this.state.item.name}</Typography>

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

                        <Typography className="CardInfoItem_ hidddenText3" style={{ marginBottom: 10, fontFamily: 'Roboto', fontSize: '0.875rem', fontWeight: 400, color: '#525252', maxHeight: 60, overflow: 'hidden' }} component="p" onClick={() => this.props.openItem(this.state.item.id)}>{desc}</Typography>
                        
                        <div style={{ marginBottom: 10 }}>
                            { this.state.count == 0 ?
                                <ButtonGroup disableElevation={true} disableRipple={true} variant="outlined" className='MobileActionsCartButtonStart'>
                                    <Button variant="outlined" onClick={this.add.bind(this)}>
                                        В корзину за {new Intl.NumberFormat('ru-RU').format( parseInt(this.state.item.price))}
                                        <IconRuble style={{ width: 11, height: 11, fill: '#525252', marginLeft: 3, paddingBottom: 1 }} />
                                    </Button>
                                </ButtonGroup>
                                    :
                                <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className='MobileActionsCartButton'>
                                    <div variant="contained" className='ModalItemButtonCart OPEN' >
                                        <span className='minus' onClick={this.minus.bind(this)}>–</span>
                                        <span>{this.state.count}</span>
                                        <span className='plus' onClick={this.add.bind(this)}>+</span>
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
    constructor(props) {
        super(props);
        
        this.state = {      
            
        };
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
    
    render(){
        return (
            <Home data={this.props.data} city={this.props.city} this_link={this.props.this_link} device={this.props.device} />
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
            device: this.props.device ? this.props.device : null,
            mainLink: this.props.this_link,
            doubleCatList: [],

            mainCatActive: 0,
            doubleCatActive: 0,
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
        let _isMounted = this._isMounted;

        setTimeout( () => {
            window.addEventListener('scroll', () => {
                if( this._isMounted ){
                    if ((time + 700 - Date.now()) < 0) {
                        AllItemsCat.map( (item, key) => {
                            var elem = document.getElementById('cat'+item.id);
                            if( elem ){
                                var top = elem.getBoundingClientRect().top + document.body.scrollTop - 200;
                                
                                if(top < 0){
                                    arrMax.push({ name: item.name, Y: top, main_id: item.main_id, id: item.id })
                                }
                            }
                        })
                        
                        let is_find = false;



                        if( arrMax.length > 0 ){
                            let max = arrMax[ arrMax.length-1 ];
                            
                            arrMax = [];
                            
                            let doubleCatList = AllItemsCat.filter( (item) => parseInt(item.main_id) == parseInt(max.main_id) )

                            if( max ){
                                if( this.activeID != parseInt(max.main_id) && parseInt(max.main_id) != 0 ){
                                    is_find = true;
                                    if( document.querySelector('#link_'+max.main_id) ){
                                        if( document.querySelector('.activeCat') ){
                                            document.querySelector('.activeCat').classList.remove('activeCat');
                                        }
                                        document.querySelector('#link_'+max.main_id).classList.add('activeCat');
                                    }

                                    if( doubleCatList.length > 1 ){
                                        this.setState({
                                            doubleCatList: doubleCatList
                                        })
                                    }else{
                                        this.setState({
                                            doubleCatList: []
                                        })
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
        }, 50 )
        
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
                    
                    let offset = 120;
                    
                    if( document.querySelector('.scrollCat.mobile') ){
                        offset += 120;
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
                        
                        //if( document.querySelector('.activeCat') ){
                        //    document.querySelector('.activeCat').classList.remove('activeCat');
                        //}
                        
                        //if( document.querySelector('[name="'+mainLink+'"]') ){
                        //    document.querySelector('[name="'+mainLink+'"]').classList.add('activeCat')
                        //}
                    }
                }
            }, 750);
        }
        
        //if( !this.props.data ){
            Home.fetchData('/'+this.state.city_name).then( data => {
                if( this._isMounted === true ){
                    this.setState( {
                        page: data.page,
                        title: data.title,
                        description: data.description,


                    } );
                }
            } );
        //}
        
        itemsStore.setPage('home');
        
        if( itemsStore.getAllItemsCat().length == 0 ){
            if( this._isMounted === true ){
                this.setState({
                    allItems: itemsStore.getAllItemsCat()
                })
            }
        }
        
        //if( itemsStore.getAllItemsCat().length == 0 ){
            window.scrollTo(0, 0);
        //}
        
        autorun(() => {
            if( this._isMounted === true ){
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
            this.state.is_load === false && false ?
                <Element name="myScrollToElement" className="Category">
                    
                    <Typography variant="h5" component="h1" style={{ paddingBottom: 20 }}>{ this.state.page ? this.state.page.page_h : '' }</Typography>
                    
                    {itemsStore.getAllItemsCat().map((cat, key) => 
                        mainLink == '' || mainLink == cat.main_link ?
                            <div key={key} name={"cat"+cat.main_id} id={"cat"+cat.id}>
                                <Grid container spacing={2} style={{ margin: 0, padding: '0px 36px', flexWrap: 'wrap', width: '100%', paddingBottom: 40 }} className="MainItems mainContainer">
                                    <Typography variant="h5" component="h2">{ cat.name }</Typography>
                                </Grid>
                                <Grid container spacing={2} style={{ margin: 0, padding: '0px 20px', flexWrap: 'wrap', width: '100%' }} className="MainItems mainContainer" >
                                    {cat.items.map((it, k) => (
                                        <ItemHookAdaptive openItemPC={this.openItemPC.bind(this)} openItemMobile={this.openItem.bind(this)} data={it} key={k} type={'bot'} isLast={cat.items.length-1 == k && itemsStore.getAllItemsCat().length-1 == key} />
                                    ))}
                                </Grid>
                            </div>
                                :
                            null
                    )}
                    
                    
                    <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                        <Backdrop style={{ zIndex: 4, color: '#fff' }} open={true}>
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    </Box>
                </Element>
                    :
                <Element name="myScrollToElement" className="Category">
            
                    <Helmet>
                        <title>{this.state.title}</title>
                        <meta name="description" content={this.state.description} />
                    </Helmet>
                    
                    
                    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                        { this.state.banners_pc.length == 0 ? null :
                            <CoverFlowCarousel
                                type="pc"
                                data={this.state.banners_pc}
                            />
                        }
                    </Box>
                    <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                        { this.state.banners_mobile.length == 0 ? null :
                            <CoverFlowCarousel
                                type="mobile"
                                data={this.state.banners_mobile}
                            />
                        }
                    </Box>
                    
                    

                    <Box sx={{ display: { xs: 'flex', md: 'none' } }} className="HomeCatList">
                        <div className='subHeaderBlock' name='subHeaderBlock' id='subHeaderBlock'>
                            {itemsStore.getAllItemsCatNew().map( (item, key) => 
                                <ScrollLink 
                                    key={key}
                                    to={"cat"+item.id} 
                                    id={"catSubCat"+item.id}
                                    spy={true} 
                                    isDynamic={true}
                                    onSetActive={(el) => { 
                                        if( parseInt(item.id) != parseInt(this.state.mainCatActive) ){
                                            this.setState({
                                                mainCatActive: item.id
                                            })

                                            if( document.querySelector("#catSubCat"+item.id) ){
                                                let scrollContainer = document.querySelector("#subHeaderBlock");

                                                let data = document.getElementById("catSubCat"+item.id).getBoundingClientRect()

                                                scrollContainer.scroll({
                                                    left: data['x'] + data['width'] - 150,
                                                    behavior: 'smooth'
                                                });
                                            }
                                        }
                                    }} 
                                    smooth={false} 
                                    offset={-120}
                                >
                                    <span className={ parseInt(this.state.mainCatActive) == parseInt(item.id) ? 'headerCat activeCat' : 'headerCat'} name={item.main_link} id={'link2_'+item.id}>{item.name}</span>
                                </ScrollLink>
                            )}
                        </div>
                    </Box>

                    {this.state.doubleCatList.length == 0 ? null :
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }} className="HomeSubCatList">
                            <div className='subHeaderBlock' id='sub1HeaderBlock'>
                                {this.state.doubleCatList.map( (item, key) => 
                                    <ScrollLink 
                                        key={key}
                                        to={"cat"+item.id} 
                                        id={"cat1SubCat"+item.id}
                                        spy={true} 
                                        isDynamic={true}
                                        onSetActive={(el) => { 
                                            if( parseInt(item.main_id) != parseInt(this.state.mainCatActive) || parseInt(item.id) != parseInt(this.state.doubleCatActive) ){
                                                this.setState({
                                                    mainCatActive: item.main_id,
                                                    doubleCatActive: item.id
                                                })

                                                if( document.querySelector("#cat1SubCat"+item.id) ){
                                                    let scrollContainer = document.querySelector("#sub1HeaderBlock");

                                                    let data = document.getElementById("cat1SubCat"+item.id).getBoundingClientRect()

                                                    scrollContainer.scroll({
                                                        left: data['x'] + data['width'] - 150,
                                                        behavior: 'smooth'
                                                    });
                                                }
                                            }
                                        }} 
                                        smooth={false} 
                                        offset={-170}
                                    >
                                        <span className={ parseInt(this.state.doubleCatActive) == parseInt(item.id) ? 'headerCat activeCat' : 'headerCat'} name={item.main_link} id={'link3_'+item.id}>{item.short_name}</span>
                                    </ScrollLink>
                                )}
                            </div>
                        </Box>
                    }

                    

                    {itemsStore.getAllItemsCat().map((cat, key) => 
                        cat.items.length > 0 ?
                            mainLink == '' || mainLink == cat.main_link || mainLink == cat.link ?
                                <div key={key} name={"cat"+cat.main_id} id={"cat"+cat.id}>
                                    <Grid container spacing={2} sx={{ padding: { xs: '0px 5%', sm: '0px 20px' } }} style={{ margin: 0, flexWrap: 'wrap', width: '100%' }} className="MainItems mainContainer" >
                                        {cat.items.map((it, k) => (
                                            <ItemHookAdaptive openItemPC={this.openItemPC.bind(this)} openItemMobile={this.openItem.bind(this)} data={it} key={k} type={'user'} isLast={cat.items.length-1 == k && itemsStore.getAllItemsCat().length-1 == key} device={this.state.device} />
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
                            <DialogTitle disableTypography style={{ margin: 0, padding: 0 }}>
                                <div style={{ position: 'absolute', top: -36, left: 15, backgroundColor: 'transparent', cursor: 'pointer' }} onClick={this.handleClose.bind(this)}>
                                    <IconClose style={{ width: 25, height: 25, fill: '#fff', color: '#fff', overflow: 'visible' }} />
                                </div>
                            </DialogTitle>
                            <div>
                                <Item itemId={this.state.openItem.id} item={this.state.openItem} openSetPc={this.openSetPc.bind(this)} openInfo={this.openInfo.bind(this)} openModalPCInfo={this.state.openModalPCInfo} />
                            </div>
                        </Dialog>
                            :
                        null
                    }
                    
                    {this.state.openItem ?
                        <>
                            <Dialog disableElevation maxWidth={'md'} sx={{ display: { xs: 'none', md: 'block', lg: 'none' } }} fullWidth={true} style={{ borderRadius: 50 }} onClose={this.handleClosePC.bind(this)} className="modalActii Item OpenItemPC testModalMD" open={this.state.openModalPC}>
                                <div className='IconButtonClose' aria-label="close" style={{ position: 'absolute', top: -52, left: 16, zIndex: 1500, width: 52, height: 52, backgroundColor: 'transparent', cursor: 'pointer' }} onClick={this.handleClosePC.bind(this)}>
                                    <IconClose style={{ width: 'inherit', height: 'inherit', fill: '#fff', color: '#fff', overflow: 'visible' }} />
                                </div>
                                
                                <DialogContent className="modalActiiContentNew" style={{ overflow: 'hidden' }}>
                                    <Item itemId={this.state.openItem.id} item={this.state.openItem} openSetPc={this.openSetPc.bind(this)} openInfo={this.openInfo.bind(this)} openModalPCInfo={this.state.openModalPCInfo} />
                                </DialogContent>
                            </Dialog>
                        
                            <Dialog disableElevation maxWidth={'lg'} sx={{ display: { xs: 'none', lg: 'block' } }} fullWidth={true} style={{ borderRadius: 50 }} onClose={this.handleClosePC.bind(this)} className="modalActii Item OpenItemPC testModalLG" open={this.state.openModalPC}>
                                <div className='IconButtonClose' aria-label="close" style={{ position: 'absolute', top: -32, left: 16, zIndex: 1500, width: 25, height: 25, backgroundColor: 'transparent', cursor: 'pointer' }} onClick={this.handleClosePC.bind(this)}>
                                    <IconClose style={{ width: 'inherit', height: 'inherit', fill: '#fff', color: '#fff', overflow: 'visible' }} />
                                </div>
                                
                                <DialogContent className="modalActiiContentNew" style={{ overflow: 'hidden' }}>
                                    <Item itemId={this.state.openItem.id} item={this.state.openItem} openSetPc={this.openSetPc.bind(this)} openInfo={this.openInfo.bind(this)} openModalPCInfo={this.state.openModalPCInfo} />
                                </DialogContent>
                            </Dialog>
                        </>
                            :
                        null
                    }

                    {this.state.openItem ?
                        <>
                            <Dialog sx={{ display: { xs: 'block', md: 'none' } }} disableElevation fullScreen style={{ width: '100%', marginTop: this.state.openItem.items.length > 1 ? 400 : 470, borderTopRightRadius: 30, borderTopLeftRadius: 30 }} onClose={this.handleClosePCInfo.bind(this)} className="ItemDialog OpenItemMobInfo blurBacground" open={this.state.openModalPCInfo} TransitionComponent={Transition}>
                                <DialogTitle disableTypography style={{ margin: 0, padding: 0 }}>
                                    <div style={{ position: 'absolute', top: -36, left: 15, backgroundColor: 'transparent', cursor: 'pointer' }} onClick={this.handleClosePCInfo.bind(this)}>
                                        <IconClose style={{ width: 25, height: 25, fill: '#fff', color: '#fff', overflow: 'visible' }} />
                                    </div>
                                </DialogTitle>
                                
                                <DialogContent className="modalActiiContentNew" style={{ height: this.state.openItem.items.length > 1 ? 'calc(100vh - 400px)' : 'calc(100vh - 470px)', padding: 20, display: 'flex', flexWrap: 'wrap', alignContent: 'start' }}>

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
                                    
                                    
                                </DialogContent>
                            </Dialog>
                            
                            <Dialog sx={{ display: { xs: 'block', sm: 'none' } }} disableElevation fullScreen style={{ height: 'calc(100vh - 50px)', width: '100%' }} onClose={this.handleClosePCSet.bind(this)} className="ItemDialog OpenItemMobSet" open={this.state.openModalPCSet} TransitionComponent={Transition}>
                                <DialogTitle disableTypography style={{ margin: 0, padding: 0 }}>
                                    <div style={{ position: 'absolute', top: -36, left: 15, backgroundColor: 'transparent', cursor: 'pointer' }} onClick={this.handleClosePCSet.bind(this)}>
                                        <IconClose style={{ width: 25, height: 25, fill: '#fff', color: '#fff', overflow: 'visible' }} />
                                    </div>
                                </DialogTitle>
                                
                                <DialogContent className="modalActiiContentNew" style={{ height: 'calc(100vh - 50px)', padding: 20, display: 'flex', flexWrap: 'wrap', alignContent: 'start' }}>

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
                                                            <source 
                                                                type="image/webp" 
                                                                srcset={`
                                                                    https://storage.yandexcloud.net/site-img/${item.img_app}_138x138.webp 138w,
                                                                    https://storage.yandexcloud.net/site-img/${item.img_app}_146x146.webp 146w,
                                                                    https://storage.yandexcloud.net/site-img/${item.img_app}_183x183.webp 183w,
                                                                    https://storage.yandexcloud.net/site-img/${item.img_app}_233x233.webp 233w,
                                                                    https://storage.yandexcloud.net/site-img/${item.img_app}_292x292.webp 292w,
                                                                    https://storage.yandexcloud.net/site-img/${item.img_app}_366x366.webp 366w,
                                                                    https://storage.yandexcloud.net/site-img/${item.img_app}_584x584.webp 584w,
                                                                    https://storage.yandexcloud.net/site-img/${item.img_app}_760x760.webp 760w,
                                                                    https://storage.yandexcloud.net/site-img/${item.img_app}_1875x1875.webp 1875w`} 
                                                                sizes="(max-width=1439px) 233px, (max-width=1279px) 218px, 292px" />
                                                            <source 
                                                                type="image/jpeg" 
                                                                srcset={`
                                                                    https://storage.yandexcloud.net/site-img/${item.img_app}_138x138.jpg 138w,
                                                                    https://storage.yandexcloud.net/site-img/${item.img_app}_146x146.jpg 146w,
                                                                    https://storage.yandexcloud.net/site-img/${item.img_app}_183x183.jpg 183w,
                                                                    https://storage.yandexcloud.net/site-img/${item.img_app}_233x233.jpg 233w,
                                                                    https://storage.yandexcloud.net/site-img/${item.img_app}_292x292.jpg 292w,
                                                                    https://storage.yandexcloud.net/site-img/${item.img_app}_366x366.jpg 366w,
                                                                    https://storage.yandexcloud.net/site-img/${item.img_app}_584x584.jpg 584w,
                                                                    https://storage.yandexcloud.net/site-img/${item.img_app}_760x760.jpg 760w,
                                                                    https://storage.yandexcloud.net/site-img/${item.img_app}_1875x1875.jpg 1875w`} 
                                                                sizes="(max-width=1439px) 233px, (max-width=1279px) 218px, 292px" />
                                                            <img 
                                                                alt={item.name} 
                                                                title={item.name} 
                                                                style={{ width: '100%', height: 'auto' }} 
                                                                src={`https://storage.yandexcloud.net/site-img/${item.img_app}138x138.jpg`} />
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
                                </DialogContent>
                            </Dialog>
                            
                            <Dialog sx={{ display: { xs: 'none', md: 'block', lg: 'none' } }} disableElevation maxWidth={'md'} fullWidth={true} style={{ borderRadius: 50 }} onClose={this.handleClosePCSet.bind(this)} className="modalActii Item OpenItemPCSet" open={this.state.openModalPCSet}>
                                <div className='IconButtonClose' style={{ position: 'absolute', top: -32, left: 16, zIndex: 2000, width: 25, height: 25, backgroundColor: 'transparent', cursor: 'pointer' }} onClick={this.handleClosePCSet.bind(this)}>
                                    <IconClose style={{ width: 'inherit', height: 'inherit', fill: '#fff', color: '#fff', overflow: 'visible' }} />
                                </div>
                                
                                <DialogContent className="modalActiiContentNew" style={{ display: 'flex', flexWrap: 'wrap', padding: '2% 2.25% 2% 4.5%', marginRight: '1.5%', alignContent: 'start' }}>
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
                                                        <source 
                                                            type="image/webp" 
                                                            srcset={`
                                                                https://storage.yandexcloud.net/site-img/${item.img_app}_138x138.webp 138w,
                                                                https://storage.yandexcloud.net/site-img/${item.img_app}_146x146.webp 146w,
                                                                https://storage.yandexcloud.net/site-img/${item.img_app}_183x183.webp 183w,
                                                                https://storage.yandexcloud.net/site-img/${item.img_app}_233x233.webp 233w,
                                                                https://storage.yandexcloud.net/site-img/${item.img_app}_292x292.webp 292w,
                                                                https://storage.yandexcloud.net/site-img/${item.img_app}_366x366.webp 366w,
                                                                https://storage.yandexcloud.net/site-img/${item.img_app}_584x584.webp 584w,
                                                                https://storage.yandexcloud.net/site-img/${item.img_app}_760x760.webp 760w,
                                                                https://storage.yandexcloud.net/site-img/${item.img_app}_1875x1875.webp 1875w`} 
                                                            sizes="(max-width=1439px) 233px, (max-width=1279px) 218px, 292px" />
                                                        <source 
                                                            type="image/jpeg" 
                                                            srcset={`
                                                                https://storage.yandexcloud.net/site-img/${item.img_app}_138x138.jpg 138w,
                                                                https://storage.yandexcloud.net/site-img/${item.img_app}_146x146.jpg 146w,
                                                                https://storage.yandexcloud.net/site-img/${item.img_app}_183x183.jpg 183w,
                                                                https://storage.yandexcloud.net/site-img/${item.img_app}_233x233.jpg 233w,
                                                                https://storage.yandexcloud.net/site-img/${item.img_app}_292x292.jpg 292w,
                                                                https://storage.yandexcloud.net/site-img/${item.img_app}_366x366.jpg 366w,
                                                                https://storage.yandexcloud.net/site-img/${item.img_app}_584x584.jpg 584w,
                                                                https://storage.yandexcloud.net/site-img/${item.img_app}_760x760.jpg 760w,
                                                                https://storage.yandexcloud.net/site-img/${item.img_app}_1875x1875.jpg 1875w`} 
                                                            sizes="(max-width=1439px) 233px, (max-width=1279px) 218px, 292px" />
                                                        <img 
                                                            alt={item.name} 
                                                            title={item.name} 
                                                            style={{ width: '100%', height: 'auto' }} 
                                                            src={`https://storage.yandexcloud.net/site-img/${item.img_app}138x138.jpg`} />
                                                    </picture>
                                                }
                                            </div>
                                            <div style={{ width: '70%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                                <Typography variant="h5" component="span" style={{ fontFamily: 'Roboto', fontWeight: 500, fontSize: '1.25rem'  }}>{ item.name }</Typography>
                                                <Typography variant="h5" component="span" style={{ fontFamily: 'Roboto', fontWeight: 300, fontSize: '0.94rem'  }}>{ item.tmp_desc }</Typography>
                                            </div>
                                        </div>
                                    )}
                                </DialogContent>
                            </Dialog>
                        
                            <Dialog sx={{ display: { xs: 'none', lg: 'block' } }} disableElevation maxWidth={'lg'} fullWidth={true} style={{ borderRadius: 50 }} onClose={this.handleClosePCSet.bind(this)} className="modalActii Item OpenItemPCSet" open={this.state.openModalPCSet}>
                                <div className='IconButtonClose' style={{ position: 'absolute', top: -32, left: 16, zIndex: 2000, width: 25, height: 25, backgroundColor: 'transparent', cursor: 'pointer' }} onClick={this.handleClosePCSet.bind(this)}>
                                    <IconClose style={{ width: 'inherit', height: 'inherit', fill: '#fff', color: '#fff', overflow: 'visible' }} />
                                </div>
                                
                                <DialogContent className="modalActiiContentNew" style={{ display: 'flex', flexWrap: 'wrap', padding: '2% 2.25% 2% 4.5%', marginRight: '1.5%', alignContent: 'start' }}>
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
                                                        <source 
                                                            type="image/webp" 
                                                            srcset={`
                                                                https://storage.yandexcloud.net/site-img/${item.img_app}_138x138.webp 138w,
                                                                https://storage.yandexcloud.net/site-img/${item.img_app}_146x146.webp 146w,
                                                                https://storage.yandexcloud.net/site-img/${item.img_app}_183x183.webp 183w,
                                                                https://storage.yandexcloud.net/site-img/${item.img_app}_233x233.webp 233w,
                                                                https://storage.yandexcloud.net/site-img/${item.img_app}_292x292.webp 292w,
                                                                https://storage.yandexcloud.net/site-img/${item.img_app}_366x366.webp 366w,
                                                                https://storage.yandexcloud.net/site-img/${item.img_app}_584x584.webp 584w,
                                                                https://storage.yandexcloud.net/site-img/${item.img_app}_760x760.webp 760w,
                                                                https://storage.yandexcloud.net/site-img/${item.img_app}_1875x1875.webp 1875w`} 
                                                            sizes="(max-width=1439px) 233px, (max-width=1279px) 218px, 292px" />
                                                        <source 
                                                            type="image/jpeg" 
                                                            srcset={`
                                                                https://storage.yandexcloud.net/site-img/${item.img_app}_138x138.jpg 138w,
                                                                https://storage.yandexcloud.net/site-img/${item.img_app}_146x146.jpg 146w,
                                                                https://storage.yandexcloud.net/site-img/${item.img_app}_183x183.jpg 183w,
                                                                https://storage.yandexcloud.net/site-img/${item.img_app}_233x233.jpg 233w,
                                                                https://storage.yandexcloud.net/site-img/${item.img_app}_292x292.jpg 292w,
                                                                https://storage.yandexcloud.net/site-img/${item.img_app}_366x366.jpg 366w,
                                                                https://storage.yandexcloud.net/site-img/${item.img_app}_584x584.jpg 584w,
                                                                https://storage.yandexcloud.net/site-img/${item.img_app}_760x760.jpg 760w,
                                                                https://storage.yandexcloud.net/site-img/${item.img_app}_1875x1875.jpg 1875w`} 
                                                            sizes="(max-width=1439px) 233px, (max-width=1279px) 218px, 292px" />
                                                        <img 
                                                            alt={item.name} 
                                                            title={item.name} 
                                                            style={{ width: '100%', height: 'auto' }} 
                                                            src={`https://storage.yandexcloud.net/site-img/${item.img_app}_138x138.jpg`} />
                                                    </picture>
                                                }
                                            </div>
                                            <div style={{ width: '55%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                                <Typography variant="h5" component="span" style={{ fontFamily: 'Roboto', fontWeight: 500, fontSize: '1.25rem', color: '#525252' }}>{ item.name }</Typography>
                                                <Typography variant="h5" component="span" style={{ fontFamily: 'Roboto', fontWeight: 400, fontSize: '0.9rem', color: '#525252'  }}>{ item.tmp_desc }</Typography>
                                            </div>
                                        </div>
                                    )}
                                </DialogContent>
                            </Dialog>
                        </>
                            :
                        null
                    }
                    
                </Element>
        )
    }
}