import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { NavLink as Link, useParams } from 'react-router-dom';
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
//import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

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
        this.swiper = new Swiper(".swiper-container", {
            grabCursor: true,
            loop: true,
            centeredSlidesBounds: false,
            setWrapperSize: true,
            autoHeight: true,
            spaceBetween: 100,
            centeredSlides: true,
            slidesPerView: this.state.type == 'pc' ? 2 : 2,
            
            autoplay: true,
            autoplay: {
                delay: 5000,
            },
            
            pagination: this.state.type == 'pc' ? true : true,
            pagination: this.state.type == 'pc' ? {
                el: ".swiper-pagination",
                clickable: true,
                type: 'bullets',
                renderBullet: function (index, className) {
                    return '<span class="' + className + '">' + (index + 1) + '</span>';
                },
            } : {},
            navigation: this.state.type == 'pc' ? {
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
                <div className="swiper-wrapper _h2_">
                    {this.state.data.map((item, key) => 
                        <div className={"swiper-slide _h3_ "+key} key={key}>
                            {item}
                        </div>
                    )}
                </div>
                    
                {this.state.type == 'pc' ?
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

const handleDragStart = (e) => e.preventDefault();

function get_city(path){
    
    path = path.split('/');
    path = path.filter( (item) => item != '' );
    
    return path[ 0 ];
}

import { Item } from '../item';

class CardItem extends React.Component {
    _isMounted = false;
    
    constructor(props) {
        super(props);
        
        this.state = {      
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
    
    /*shouldComponentUpdate(nextProps, nextState) {
        return (
            this.state.count !== nextState.count ||
            this.state.item.price !== nextState.item.price
        );
    }*/
    
    render() {
        if( this.props.type == 'pc' ){
            return (
                <Card elevation={0} className="CardItem">
                    
                    <CardContent style={{ cursor: 'pointer', position: 'relative' }} onClick={ () => this.props.openItem(this.state.item.id)}>
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
                    </CardContent>
                    
                    <CardActions className="CardAction">
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: 0, width: '100%' }}>
                            <div>
                                <Typography className="CardPriceItem" variant="h5" component="span">{this.state.item.price} <Ruble /></Typography>
                            </div>
                            <Typography className="CardPriceItem_old" variant="h5" component="span">{this.state.item.price}</Typography>
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
        
        if( this.props.type == 'mobile' ){
            return (
                <Grid item container xs={12} className="CardItem_mobile">
                    <Grid style={{ position: 'relative' }} item xs={6} sm={6} md={6} xl={6} onClick={ () => this.props.openItem(this.state.item.id)}>
                        
                        <picture>
                            <source 
                                srcSet={"https://storage.yandexcloud.net/site-img/"+this.state.item.img_new+"300х200.webp?"+this.state.item.img_new_update} 
                                type="image/webp" 
                                //ref={el => this.elementSource = el}
                            />
                            <img 
                                //ref={el => this.elementImg = el}
                                src={"https://storage.yandexcloud.net/site-img/"+this.state.item.img_new+"300х200.jpg?"+this.state.item.img_new_update} 
                                alt={this.state.item.name}
                                title={this.state.item.name}
                            />
                        </picture>
                        
                        { parseInt(this.state.item.is_new) == 0 ? null :
                            <img 
                                src='/assets/is_new.png'
                                alt="Новинка"
                                style={{ position: 'absolute', width: 70, top: 0, right: 0 }}
                            />
                        }
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} xl={6} className="SecondBox">
                        <Typography className="CardNameItem" gutterBottom variant="h5" component="h3" onClick={ () => this.props.openItem(this.state.item.id)}>{this.state.item.name}</Typography>
                        <Typography className="CardInfoItem" component="p" onClick={ () => this.props.openItem(this.state.item.id)}>{this.state.item.tmp_desc}</Typography>
                        <div>
                            <Typography className="CardPriceItem_old" variant="h5" component="span">{this.state.item.price}</Typography>
                            <Typography gutterBottom className="CardPriceItem" variant="h5" component="span">{this.state.item.price} <Ruble width="20" viewBox="200 -200 400 600" /></Typography>
                            {this.state.count == 0 ?
                                <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="BtnBorder">
                                    <Button variant="contained" className="BtnCardMain CardInCardItem" onClick={this.add.bind(this)}>
                                        <ShoppingCartOutlinedIcon color='inherit'  />
                                    </Button>
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
    
    constructor(props) {
        super(props);
        
        this.state = {      
            allItems: [],  
            is_load: false,
            testData: [1, 2, 3, 4, 5, 6, 7, 8],
            openItem: null,
            openModal: false,
            openModalPC: false,
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
                        style={{ width: 'inherit', height: 'auto', borderRadius: 15 }}
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
                                style={{ width: 'inherit', height: 'auto', minHeight: 200, borderRadius: 15 }}
                                onDragStart={handleDragStart}
                            />
                        </picture>
                    </Link>
                )
                
                banners_mobile.push(
                    <Link
                        to={'/'+itemsStore.getCity()+'/akcii?act_'+item.aktia_id}
                        exact={ true }
                        style={{ width: 'inherit', height: 'auto', borderRadius: 15 }}
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
                                style={{ width: 'inherit', height: 'auto', borderRadius: 15 }}
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
                                style={{ width: 'inherit', height: 'auto', minHeight: 200, borderRadius: 15 }}
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
                                style={{ width: 'inherit', height: 'auto', borderRadius: 15 }}
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
                                style={{ width: 'inherit', height: 'auto', minHeight: 200, borderRadius: 15 }}
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
                                style={{ width: 'inherit', height: 'auto', borderRadius: 15 }}
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
                    //let item = allItems.find( (item) => item.id == act_id );
                    
                    if( window.innerWidth <= 400 ){
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
        
        if( !this.props.data ){
            Home.fetchData('/'+this.state.city_name).then( data => {
                this.setState( {
                    page: data.page,
                    title: data.title,
                    description: data.description,
                } );
            } );
        }
        
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

        window.history.pushState(state, title, url)
        
        this.setState({
            openItem: item,
            openModal: true
        })
        
        setTimeout(()=>{
            let el = document.getElementById("forSwiper");
            el.addEventListener("touchstart", this.touchStart.bind(this), false);
            el.addEventListener("touchend", this.touchEnd.bind(this), false);
        }, 300)
    }
    
    openItemPC(id){
        let allItems = itemsStore.getAllItems();
        let item = allItems.find( (item) => item.id == id );
        
        let state = { 'item_id': item.id, 'item_name': item.name },
            title = '',
            url = window.location.pathname+'?showItem='+item.id;

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
        let el = document.getElementById("forSwiper");
        el.removeEventListener("touchstart", this.touchStart.bind(this), false);
        el.removeEventListener("touchend", this.touchEnd.bind(this), false);
        
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
            openItem: null
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
                    
                    <Typography variant="h5" component="h1" style={{ paddingBottom: 20 }}>{ this.state.page ? this.state.page.page_h : '' }</Typography>
                    
                    {itemsStore.getAllItemsCat().map((cat, key) => 
                        cat.items.length > 0 ?
                            mainLink == '' || mainLink == cat.main_link || mainLink == cat.link ?
                                <div key={key} name={"cat"+cat.main_id} id={"cat"+cat.id}>
                                    <Grid container spacing={2} style={{ margin: 0, padding: '0px 36px', flexWrap: 'wrap', width: '100%', paddingBottom: 40 }} className="MainItems mainContainer">
                                        <Typography variant="h5" component="h2">{ cat.name }</Typography>
                                    </Grid>
                                    <Grid container spacing={2} style={{ margin: 0, padding: '0px 10px', paddingBottom: 20, flexWrap: 'wrap', width: '100%' }} className="MainItems mainContainer" >
                                        {cat.items.map((it, k) => (
                                            <Grid item xs={12} sm={4} md={3} xl={3} key={k} style={{ padding: '10px 8px', display: 'flex'}}>
                                                <Hidden xsDown>
                                                    <CardItem data={it} type={'pc'} openItem={this.openItemPC.bind(this)} />
                                                </Hidden>
                                                <Hidden smUp>
                                                    <CardItem data={it} type={'mobile'} openItem={this.openItem.bind(this)} />
                                                </Hidden>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </div>
                                    :
                                null
                                :
                            null
                    )}
                    
                    {this.state.openItem ?
                        <Dialog fullScreen open={this.state.openModal} className="ItemDialog" onClose={this.handleClose.bind(this)} TransitionComponent={Transition}>
                            <MuiDialogTitle disableTypography style={{ margin: 0, padding: 8 }}>
                                <IconButton aria-label="close" style={{ position: 'absolute', top: 0, right: 0 }} onClick={this.handleClose.bind(this)}>
                                    <FontAwesomeIcon icon={faTimes} style={{ fontSize: '1.8rem', color: '#e5e5e5' }} />
                                </IconButton>
                            </MuiDialogTitle>
                            <div>
                                <Item itemId={this.state.openItem.id} item={this.state.openItem} />
                            </div>
                        </Dialog>
                            :
                        null
                    }
                    
                    {this.state.openItem ?
                        <Dialog maxWidth={'md'} fullWidth={true} style={{ borderRadius: 50 }} onClose={this.handleClosePC.bind(this)} className="modalActii Item" open={this.state.openModalPC}>
                            <MuiDialogTitle disableTypography style={{ margin: 0, padding: 8 }}>
                                <IconButton aria-label="close" style={{ position: 'absolute', top: 0, right: 50 }} onClick={this.handleClosePC.bind(this)}>
                                    <FontAwesomeIcon icon={faTimes} style={{ fontSize: '1.8rem', color: '#CC0033' }} />
                                </IconButton>
                            </MuiDialogTitle>
                            
                            <MuiDialogContent className="modalActiiContent">
                                <Item itemId={this.state.openItem.id} item={this.state.openItem} />
                            </MuiDialogContent>
                        </Dialog>
                            :
                        null
                    }
                    
                </Element>
        )
    }
}