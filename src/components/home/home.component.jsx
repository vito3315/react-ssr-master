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
import Skeleton from '@material-ui/lab/Skeleton';

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
    
    goTo(){
        if(this._isMounted){
            window.location.pathname = "/item/"+this.state.item.id;
        }
    }
    
    render() {
        return (
            <div>
                <Card elevation={0} className="CardItem dis_none">
                    <CardContent onClick={this.goTo.bind(this)}>
                        <CardMedia
                            component="img"
                            alt={this.state.item.name}
                            image={"https://newjacofood.ru/src/img/items/"+this.state.item.img_full+'?'+this.state.item.img_full_date_update}
                            title={this.state.item.name}
                        />
                        <CardContent>
                            <Typography className="CardNameItem" gutterBottom variant="h5" component="span">{this.state.item.name}</Typography>
                            <Typography className="CardInfoItem" component="p">{this.state.item.tmp_desc}</Typography>
                        </CardContent>
                    </CardContent>
                    <CardActions className="CardAction">
                        <div>
                            <div><Typography gutterBottom className="CardInfoWeiItem" component="span">{this.state.item.info_weight}</Typography></div>
                            <div><Typography gutterBottom className="CardPriceItem" variant="h5" component="span">{this.state.item.price} <AttachMoneyIcon fontSize="small" /></Typography></div>
                        </div>
                
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
                    </CardActions>
                </Card>
                
                <Grid item container xs={12} className="CardItem_mobile">
                    <Grid item xs={5} sm={5} md={5} xl={5}>
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
                
                
            </div>
        );
    }
}

export class Home extends React.Component {
    constructor() {
        super();
        
        this.state = {      
            allItems: [],  
            is_load: false,
            testData: [1, 2, 3, 4, 5, 6, 7, 8, 9]
        };
    }

    load(){
        fetch('https://jacofood.ru/src/php/test_app.php', {
            method: 'POST',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'},
            body: queryString.stringify({
                type: 'get_cat', 
                city_id: 1
            })
        }).then(res => res.json()).then(json => {
            let test_arr = [];
            test_arr.push(json.arr[0]);
            
            this.setState({ 
                allItems: test_arr, 
                is_load: true,
            });
            
            setTimeout(() => {
                this.setState({ 
                    allItems: json.arr,
                });
            }, 250)
            
            setTimeout(() => {
                if( localStorage.getItem('goTo') ){
                    let hash = localStorage.getItem('goTo')
                    
                    localStorage.removeItem('goTo');
                    
                    scroller.scrollTo("myScrollToElement", {
                        duration: 800,
                        delay: 0,
                        smooth: "easeInOutQuart",
                        offset: document.getElementById('cat'+hash).getBoundingClientRect()['y'] - 150
                    });
                }
            }, 700);
        })
        .catch(err => { });
    }  
    
    componentDidMount = () => {
        this.load();
    }

    render() {
        if( !this.state.is_load ){
            return (
                <Grid container spacing={2} className="MainItems">
                    {this.state.testData.map((cat, key) => (
                        <Grid item xs={6} sm={3} key={key}>
                            <Skeleton variant="rect" width={260} height={170} />
                            <Skeleton variant="text" width={120} height={26} />
                            <Skeleton variant="text" />
                            <Skeleton variant="text" />
                            <Skeleton variant="text" />
                        </Grid>
                    ))}
                </Grid>
            );
        }
        
        return (
            <Element name="myScrollToElement">
                {this.state.allItems.map((cat, key) => (
                    <Grid container spacing={2} md={10} sm={12} xs={12} xl={10} className="MainItems mainContainer" key={key} name={"cat"+cat.id} id={"cat"+cat.id}>
                        {cat.items.map((it, k) => (
                            <Grid item xs={12} sm={4} md={3} xl={3} key={k} style={{ padding: '16px 8px'}}>
                                <CardItem data={it} />
                            </Grid>
                        ))}
                    </Grid>
                ))}
            </Element>
        );
    }
}