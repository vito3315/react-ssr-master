import React from 'react';
import { NavLink as Link, useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRubleSign, faInfoCircle, faPlus, faMinus, faTimes } from '@fortawesome/free-solid-svg-icons'
import * as Scroll from 'react-scroll';
var Element  = Scroll.Element;
var scroller = Scroll.scroller;
const queryString = require('query-string');
import axios from 'axios';



import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

import IconButton from '@material-ui/core/IconButton';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

import itemsStore from '../../stores/items-store';
import { autorun } from "mobx"
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
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
            
            /*autoplay: true,
            autoplay: {
                delay: 5000,
            },*/
            
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
                <path id="svg_1" d="m219.27,252.76c63.98,-2.85 99.22,-39.48 99.22,-103.13c0,-37.42 -12.62,-65.49 -37.52,-83.44c-22.29,-16.07 -48.63,-19.21 -62.35,-19.65c-28.61,-0.92 -107.02,-0.04 -110.34,0c-5.75,0.07 -10.38,4.75 -10.38,10.5l0,174.95c-9.23,-0.11 -15.07,-0.2 -15.31,-0.21c-0.06,0 -0.11,0 -0.17,0c-5.72,0 -10.41,4.59 -10.5,10.34c-0.09,5.8 4.54,10.57 10.34,10.66c0.95,0.01 6.78,0.1 15.64,0.21l0,26.12l-15.48,0c-5.8,0 -10.5,4.7 -10.5,10.5s4.7,10.5 10.5,10.5l15.48,0l0,74.89c0,5.8 4.7,10.5 10.5,10.5s10.5,-4.7 10.5,-10.5l0,-74.9l109.39,0c5.8,0 10.5,-4.7 10.5,-10.5s-4.7,-10.5 -10.5,-10.5l-109.39,0l0,-25.88c32.67,0.31 78.53,0.51 100.37,-0.46zm-100.37,-185.33c22.81,-0.21 76.99,-0.61 99.05,0.1c23.92,0.77 79.55,10.31 79.55,82.1c0,52.17 -26.63,79.82 -79.16,82.16c-21.17,0.94 -66.91,0.74 -99.44,0.43l0,-164.79z"/>
            </g>
        </svg>
    )
}

const handleDragStart = (e) => e.preventDefault();

function get_city(path){
    return path.split('/')[1];
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
    
    shouldComponentUpdate(nextProps, nextState) {
        return (
            this.state.count !== nextState.count ||
            this.state.item.price !== nextState.item.price
        );
    }
    
    render() {
        
        //  <FontAwesomeIcon icon={faRubleSign} />
        
        if( this.props.type == 'pc' ){
            return (
                <Card elevation={0} className="CardItem">
                    
                    <CardContent onClick={ () => this.props.openItem(this.state.item.id)}>
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
                        <CardContent style={{ padding: '1.2vw', paddingBottom: 0, paddingTop: 0 }}>
                            <Typography className="CardNameItem" gutterBottom variant="h5" component="span">{this.state.item.name}</Typography>
                            <Typography gutterBottom className="CardInfoWeiItem" component="p">{this.state.item.info_weight}</Typography>
                            <Typography className="CardInfoItem" component="p">{this.state.item.tmp_desc}</Typography>
                        </CardContent>
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
        
        if( this.props.type == 'mobile' ){
            return (
                <Grid item container xs={12} className="CardItem_mobile">
                    <Grid item xs={5} sm={5} md={5} xl={5} onClick={ () => this.props.openItem(this.state.item.id)}>
                        <picture>
                            <source 
                                srcSet={"https://storage.yandexcloud.net/site-img/"+this.state.item.img_new+"300х200.webp?"+this.state.item.img_new_update} 
                                type="image/webp" 
                            />
                            <img 
                                src={"https://storage.yandexcloud.net/site-img/"+this.state.item.img_new+"300х200.jpg?"+this.state.item.img_new_update} 
                                alt={this.state.item.name}
                                title={this.state.item.name}
                            />
                        </picture>
                    </Grid>
                    <Grid item xs={7} sm={7} md={7} xl={7} className="SecondBox">
                        <Typography className="CardNameItem" gutterBottom variant="h5" component="span" onClick={ () => this.props.openItem(this.state.item.id)}>{this.state.item.name}</Typography>
                        <Typography className="CardInfoItem" component="p" onClick={ () => this.props.openItem(this.state.item.id)}>{this.state.item.tmp_desc}</Typography>
                        <div>
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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export class Home extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {      
            allItems: [],  
            is_load: true,
            testData: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            openItem: null,
            openModal: false,
            openModalPC: false,
            banners_pc: [],
            banners_mobile: [],
            city_name: props.match.params.cityName,
            page: null
        };
        
        itemsStore.setCity(props.match.params.cityName);
    }

    static fetchData(propsData) {
        let data = {
            type: 'get_page_info', 
            city_id: get_city(propsData),
            page: '' 
        };
        
        return axios({
            method: 'POST',
            url:'https://jacofood.ru/src/php/test_app.php',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: queryString.stringify(data)
        }).then(response => {
            if(response['status'] === 200){
                var json = response['data'];
                
                return {
                    title: json.page.title,
                    description: json.page.description,
                    page: json.page,
                }
            } 
        }).catch(function (error) {
            console.log(error);
        });
    }
    
    componentDidMount = () => {
        if (typeof window !== 'undefined') {
            setTimeout(() => {
                if( localStorage.getItem('goTo') ){
                    let hash = localStorage.getItem('goTo')
                    
                    localStorage.removeItem('goTo');
                    
                    scroller.scrollTo("myScrollToElement", {
                        duration: 800,
                        delay: 500,
                        smooth: "easeInOutQuart",
                        offset: document.getElementById('cat'+hash).getBoundingClientRect()['y'] - 150
                    });
                }
            }, 2000);
        }
        
        Home.fetchData('/'+this.state.city_name).then( data => {
            console.log( data )
            
            this.setState( {
                page: data.page
            } );
        } );
        
        itemsStore.setPage('home');
        
        //if( itemsStore.getAllItemsCat().length == 0 ){
            window.scrollTo(0, 0);
        //}
        
        autorun(() => {
            this.setState({
                allItems: itemsStore.getAllItemsCat()
            })
            
            let banners_pc = [],
                banners_mobile = [];
            
            itemsStore.getBanners().map((item, key) => {
                if( item.aktia_id && parseInt(item.aktia_id) > 0 ){
                    banners_pc.push(
                        <Link
                            to={'/'+itemsStore.getCity()+'/actii#act'+item.aktia_id}
                            exact={ true }
                            style={{ width: 'inherit', height: 'auto', borderRadius: 15 }}
                        >
                            <img style={{ width: 'inherit', height: 'auto', borderRadius: 15 }} src={"https://jacofood.ru/src/img/banners/"+item.b_img_full+"?date=2021_03_12_13_56_39"} onDragStart={handleDragStart} />
                        </Link>
                    )
                    
                    banners_mobile.push(
                        <Link
                            to={'/'+itemsStore.getCity()+'/actii#act'+item.aktia_id}
                            exact={ true }
                            style={{ width: 'inherit', height: 'auto', borderRadius: 15 }}
                        >
                            <img style={{ width: 'inherit', height: 'auto', borderRadius: 15 }} src={"https://jacofood.ru/src/img/banners/"+item.img_app+"?date=2021_03_12_13_56_39"} onDragStart={handleDragStart} />
                        </Link>
                    )
                    
                }else{
                    banners_pc.push(
                        <img style={{ width: 'inherit', height: 'auto', borderRadius: 15 }} src={"https://jacofood.ru/src/img/banners/"+item.b_img_full+"?date=2021_03_12_13_56_39"} onDragStart={handleDragStart} />
                    )
                    
                    banners_mobile.push(
                        <img style={{ width: 'inherit', height: 'auto', borderRadius: 15 }} src={"https://jacofood.ru/src/img/banners/"+item.img_app+"?date=2021_03_12_13_56_39"} onDragStart={handleDragStart} />
                    )
                }
            })
            
            this.setState({ 
                banners_pc: banners_pc,
                banners_mobile: banners_mobile
            });
        })
    }

    openItem(id){
        let allItems = itemsStore.getAllItems();
        let item = allItems.find( (item) => item.id == id );
        
        this.setState({
            openItem: item,
            openModal: true
        })
    }
    
    openItemPC(id){
        let allItems = itemsStore.getAllItems();
        let item = allItems.find( (item) => item.id == id );
        
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
        this.setState({
            openModal: false,
            openItem: null
        })
    }
    
    handleClosePC(){
        this.setState({
            openModalPC: false,
            openItem: null
        })
    }

    render() {
        if( itemsStore.getAllItemsCat().length == 0 ){
            return (
                <Element name="myScrollToElement">
                    <Grid container spacing={2} style={{ margin: 0, padding: '0px 10px', paddingTop: 64, flexWrap: 'wrap' }} className="MainItems mainContainer">
                        {this.state.testData.map((cat, key) => [
                            <div key={key}>
                                <Hidden xsDown>
                                    <Grid item xs={12} sm={4} md={3} xl={3} style={{ padding: '16px 8px'}}>
                                        <div style={{ width: 260, height: 170, backgroundColor: '#e5e5e5', marginBottom: 10 }} />
                                        <div style={{ width: 120, height: 20, backgroundColor: '#e5e5e5', marginBottom: 10 }} />
                                        <div style={{ width: 260, height: 20, backgroundColor: '#e5e5e5', marginBottom: 10 }} />
                                        <div style={{ width: 260, height: 20, backgroundColor: '#e5e5e5', marginBottom: 10 }} />
                                        <div style={{ width: 260, height: 20, backgroundColor: '#e5e5e5', marginBottom: 10 }} />
                                    </Grid>
                                </Hidden>
                                <Hidden smUp>
                                    <Grid item xs={12} sm={4} md={3} xl={3} style={{ padding: '16px 8px', display: 'flex', flexDirection: 'row'}}>
                                        <div style={{ width: 200, height: 170, backgroundColor: '#e5e5e5' }} />
                                        <div style={{ marginLeft: 15}}>
                                            <div style={{ width: 100, height: 20, backgroundColor: '#e5e5e5', marginBottom: 10 }} />
                                            <div style={{ width: 150, height: 20, backgroundColor: '#e5e5e5', marginBottom: 10 }} />
                                            <div style={{ width: 150, height: 20, backgroundColor: '#e5e5e5', marginBottom: 10 }} />
                                            <div style={{ width: 150, height: 20, backgroundColor: '#e5e5e5', marginBottom: 10 }} />
                                        </div>
                                    </Grid>
                                </Hidden>
                            </div>    
                        ])}
                    </Grid>
                </Element>
            );
        }
        
        return (
            <Element name="myScrollToElement" className="Category">
                
                <Hidden xsDown>
                    { this.state.banners_pc.length == 0 ? null :
                        <CoverFlowCarousel
                            type="pc"
                            data={this.state.banners_pc}
                        />
                    }
                </Hidden>
                <Hidden smUp>
                    { this.state.banners_mobile.length == 0 ? null :
                        <CoverFlowCarousel
                            type="mobile"
                            data={this.state.banners_mobile}
                        />
                    }
                </Hidden>
                
                {itemsStore.getAllItemsCat().map((cat, key) => 
                    <div key={key} name={"cat"+cat.id} id={"cat"+cat.id}>
                        <Grid container spacing={2} style={{ margin: 0, padding: '0px 36px', flexWrap: 'wrap', width: '100%' }} className="MainItems mainContainer">
                            <Typography variant="h5" component="h3">{ cat.name }</Typography>
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
                )}
                
                <Grid item xs={12}>
                    <Typography variant="h5" component="h2">{ this.state.page && this.state.page.page_h ? this.state.page.page_h : '' }</Typography>
                </Grid>
                
                { this.state.page && this.state.page.content ?
                    <Grid item container spacing={3} md={10} sm={12} xs={12} xl={10} className="mainContainer dopText" dangerouslySetInnerHTML={{__html: this.state.page.content}} />
                        :
                    null
                }
                
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
                    <Dialog maxWidth={'md'} fullWidth={true} onClose={this.handleClosePC.bind(this)} className="modalActii Item" open={this.state.openModalPC}>
                        <MuiDialogTitle disableTypography style={{ margin: 0, padding: 8 }}>
                            <IconButton aria-label="close" style={{ position: 'absolute', top: 0, right: 0 }} onClick={this.handleClosePC.bind(this)}>
                                <FontAwesomeIcon icon={faTimes} style={{ fontSize: '1.8rem', color: '#e5e5e5' }} />
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
        );
    }
}