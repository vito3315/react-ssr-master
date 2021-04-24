import React from 'react';
import { NavLink as Link, Switch, Route, useParams, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import * as Scroll from 'react-scroll';
var Element  = Scroll.Element;
var scroller = Scroll.scroller;

const queryString = require('query-string');

import { observer } from 'mobx-react';
import itemsStore from '../../stores/items-store';
import { trace, autorun } from "mobx"

import { makeStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import Hidden from '@material-ui/core/Hidden';

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const handleDragStart = (e) => e.preventDefault();

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
            
        let item = my_cart.filter( (item) => item.item_id == this.state.item['id'] );
  
        if( item.length > 0 ){
            this.setState({ 
              count: item[0].count,
            })
        }
        
        autorun(() => {
            if( this._isMounted ){
                let my_cart = itemsStore.getItems();
            
                let item = my_cart.filter( (item) => item.item_id == this.state.item['id'] );
          
                if( item.length > 0 ){
                    this.setState({ 
                      count: item[0].count,
                    })
                }else{
                    this.setState({ 
                      count: 0,
                    })
                }
            }
        })
    }
    
    add(){
        if(this._isMounted){
            let count = itemsStore.AddItem(this.state.item['id']);
            this.setState({ count: count })
        }
    }
    
    minus(){
        if(this._isMounted){
            let count = itemsStore.MinusItem(this.state.item['id']);
            this.setState({ count: count })
        }
    }
    
    render() {
        
        if( this.props.type == 'pc' ){
            return (
                <Card elevation={0} className="CardItem">
                    
                        <CardContent>
                            <Link to={"/"+itemsStore.getCity()+"/item/"+this.state.item.id} >
                                <CardMedia
                                    component="img"
                                    alt={this.state.item.name}
                                    image={"https://newjacofood.ru/src/img/items/"+this.state.item.img_full+'?'+this.state.item.img_full_date_update}
                                    title={this.state.item.name}
                                    style={{ minHeight: 150 }}
                                />
                                <CardContent style={{ padding: '1.2vw' }}>
                                    <Typography className="CardNameItem" gutterBottom variant="h5" component="span">{this.state.item.name}</Typography>
                                    <Typography className="CardInfoItem" component="p">{this.state.item.tmp_desc}</Typography>
                                </CardContent>
                            </Link>
                        </CardContent>
                    
                    <CardActions className="CardAction">
                        <Typography gutterBottom className="CardInfoWeiItem" component="span">{this.state.item.info_weight}</Typography>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 0, width: '100%' }}>
                            <div><Typography className="CardPriceItem" variant="h5" component="span">{this.state.item.price} <AttachMoneyIcon fontSize="small" /></Typography></div>
                            {this.state.count == 0 ?
                                <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="BtnBorder">
                                    <Button variant="contained" className="BtnCardMain CardInCardItem" onClick={this.add.bind(this)}>В корзину</Button>
                                </ButtonGroup>
                            :
                                <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="BtnBorder count">
                                    <Button variant="contained" className="BtnCardMain" onClick={this.minus.bind(this)}>
                                        <RemoveIcon fontSize="small" />
                                    </Button>
                                    <Button variant="contained" className="BtnCardMain" >
                                        <Typography className="CardCountItem" component="span">{this.state.count}</Typography>
                                    </Button>
                                    <Button variant="contained" className="BtnCardMain" onClick={this.add.bind(this)}> 
                                        <AddIcon fontSize="small" />
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
                        <CardMedia
                            component="img"
                            alt={this.state.item.name}
                            image={"https://newjacofood.ru/src/img_app/"+this.state.item.img_app+'?'+this.state.item.img_full_date_update}
                            title={this.state.item.name}
                        />
                    </Grid>
                    <Grid item xs={7} sm={7} md={7} xl={7} className="SecondBox">
                        <Typography className="CardNameItem" gutterBottom variant="h5" component="span">{this.state.item.name}</Typography>
                        <Typography className="CardInfoItem" component="p">{this.state.item.tmp_desc}</Typography>
                        <div>
                            <Typography gutterBottom className="CardPriceItem" variant="h5" component="span">{this.state.item.price} <AttachMoneyIcon fontSize="small" /></Typography>
                            {this.state.count == 0 ?
                                <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="BtnBorder">
                                    <Button variant="contained" className="BtnCardMain CardInCardItem" onClick={this.add.bind(this)}>В корзину</Button>
                                </ButtonGroup>
                                    :
                                <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="BtnBorder count">
                                    <Button variant="contained" className="BtnCardMain" onClick={this.minus.bind(this)}>
                                        <RemoveIcon fontSize="small" />
                                    </Button>
                                    <Button variant="contained" className="BtnCardMain" >
                                        <Typography className="CardCountItem" component="span">{this.state.count}</Typography>
                                    </Button>
                                    <Button variant="contained" className="BtnCardMain" onClick={this.add.bind(this)}> 
                                        <AddIcon fontSize="small" />
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

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function Home() {
    let { cityName } = useParams();
  
    itemsStore.setCity(cityName);
  
    return (
        <RenderHome />
    );
}

class RenderHome extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {      
            allItems: [],  
            is_load: true,
            testData: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            openItem: null,
            openModal: false,
            banners_pc: [],
            banners_mobile: []
        };
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
                banners_pc.push(
                    <img style={{ minHeight: 380 }} src={"https://jacofood.ru/src/img/banners/"+item.b_img_full+"?date=2021_03_12_13_56_39"} onDragStart={handleDragStart} />
                )
                
                banners_mobile.push(
                    <img src={"https://jacofood.ru/src/img/banners/"+item.img_app+"?date=2021_03_12_13_56_39"} onDragStart={handleDragStart} />
                )
            })
            
            this.setState({ 
                banners_pc: banners_pc,
                banners_mobile: banners_mobile
            });
        })
    }

    openItem(id){
        console.log( id )
        
        let allItems = itemsStore.getAllItems();
            
        let item = allItems.filter( (item) => item.id == id )[0];
        
        console.log( item )
        
        this.setState({
            openItem: item,
            openModal: true
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
            <Element name="myScrollToElement">
                
                <Hidden xsDown>
                    <AliceCarousel 
                        style={{ minHeight: 350 }}
                        mouseTracking 
                        //autoPlay={true}
                        //autoPlayInterval={3000}
                        infinite={true}
                        items={this.state.banners_pc} 
                    />
                </Hidden>
                <Hidden smUp>
                    <AliceCarousel 
                        mouseTracking 
                        disableButtonsControls={true}
                        //autoPlay={true}
                        //autoPlayInterval={3000}
                        infinite={true}
                        items={this.state.banners_mobile} 
                    />
                </Hidden>
                
                {itemsStore.getAllItemsCat().map((cat, key) => (
                    <Grid container spacing={2} style={{ margin: 0, padding: '0px 10px', flexWrap: 'wrap', width: '100%' }} className="MainItems mainContainer" key={key} name={"cat"+cat.id} id={"cat"+cat.id}>
                        {cat.items.map((it, k) => (
                            <Grid item xs={12} sm={4} md={3} xl={3} key={k} style={{ padding: '16px 8px', display: 'flex'}}>
                                <Hidden xsDown>
                                    <CardItem data={it} type={'pc'} openItem={this.openItem.bind(this)} />
                                </Hidden>
                                <Hidden smUp>
                                    <CardItem data={it} type={'mobile'} openItem={this.openItem.bind(this)} />
                                </Hidden>
                            </Grid>
                        ))}
                    </Grid>
                ))}
                
                
                {this.state.openItem ?
                    <Dialog fullScreen open={this.state.openModal} onClose={this.handleClose.bind(this)} TransitionComponent={Transition}>
                        <AppBar style={{ position: 'relative', backgroundColor: '#fff' }}>
                            <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <img alt="Жако доставка роллов и пиццы" src="https://newjacofood.ru/src/img/other/Logotip.png" style={{ height: 40 }} />
                            
                                <Button autoFocus color="inherit" onClick={this.handleClose.bind(this)}>
                                    <CloseIcon style={{ fill: '#000', fontSize: '2.2rem' }} />
                                </Button>
                            </Toolbar>
                        </AppBar>
                        <div style={{ padding: 20 }}>
                            <Item itemId={this.state.openItem.id} item={this.state.openItem} />
                        </div>
                    </Dialog>
                        :
                    null
                }
                
            </Element>
        );
    }
}