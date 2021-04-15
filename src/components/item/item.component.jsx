import React from 'react';
import { NavLink as Link, Switch, Route, useParams, useHistory } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';

import Typography from '@material-ui/core/Typography';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import InfoIcon from '@material-ui/icons/Info';

import Popover from '@material-ui/core/Popover';
import Skeleton from '@material-ui/lab/Skeleton';
import Hidden from '@material-ui/core/Hidden';

import { observer } from 'mobx-react';

import itemsStore from '../../stores/items-store';

const queryString = require('query-string');

export function Item(props = 0) {
    let { itemId } = useParams();
  
    if( props.item ){
        return (
            <RenderItem itemId={props.itemId} item={props.item} />
        );
    }
  
    return (
        <RenderItem itemId={itemId} />
    );
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
                <InfoIcon fontSize="small" />
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

class RenderItem extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {      
            item: this.props.item ? this.props.item : [],  
            is_load: false,
            count: 0
        };
    }
    
    componentWillUnmount(){
        
    }
    
    componentDidMount(){
        if( this.props.item ){
            if( this.state.item.items.length == 0 && (parseInt(this.state.item.type) !== 3 && parseInt(this.state.item.type) !== 4) ){
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
            
            let item = my_cart.filter( (item) => item.item_id == this.state.item['id'] )[0];
      
            this.setState({ 
                count: item ? item.count : 0,
            })
        }else{
            if( document.querySelector('.activeCat') ){
                document.querySelector('.activeCat').classList.remove('activeCat');
            }
            window.scrollTo(0, 0);
            itemsStore.setPage('item');
            
            fetch('https://jacofood.ru/src/php/test_app.php', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded'},
                body: queryString.stringify({
                    type: 'get_item', 
                    item_id: this.props.itemId,
                    city_id: 1
                })
            }).then(res => res.json()).then(json => {
                if( json.item.items.length == 0 && (parseInt(json.item.type) !== 3 && parseInt(json.item.type) !== 4) ){
                    json.item.items.push({
                        kkal: json.item.kkal,
                        protein: json.item.protein,
                        fat: json.item.fat,
                        carbohydrates: json.item.carbohydrates,
                        name: ''
                    })
                }
                
                this.setState({ 
                    item: json.item, 
                    is_load: true,
                });
                
                
                let my_cart = itemsStore.getItems();
                
                let item = my_cart.filter( (item) => item.item_id == json.item['id'] )[0];
          
                this.setState({ 
                    count: item ? item.count : 0,
                })
            })
            .catch(err => { });
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
    
    render() {
        if(!this.state.is_load){
            return (
                <Grid container spacing={3} className="MainItem">
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Skeleton variant="text" width={200} height={30} />
                    </Grid>
                    <Grid item xs={6}>
                        <Skeleton variant="rect" width={400} height={400} />
                    </Grid>
                    <Grid item xs={6}>
                        <Skeleton variant="text" width={500} height={60} />
                        <Skeleton variant="text" width={500} height={30} />
                        <Skeleton variant="text" width={500} height={30} />
                    </Grid>
                </Grid>
            )
        }
        
        return (
            <div>
                <Hidden xsDown>
                    <Grid container spacing={3} className="MainItem">
                        <Grid item xs={12}>
                            <Typography variant="h5" component="h1">{this.state.item.name}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <img src={"https://newjacofood.ru/src/img/items/"+this.state.item.img_full} alt={this.state.item.name} />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography gutterBottom variant="h5" component="span" className="ItemDesc">{'Состав: '+this.state.item.tmp_desc}</Typography>
                            { this.state.item.info_weight.length > 0 ?
                                <Typography gutterBottom variant="h5" component="span" className="ItemDesc ItemOther">{'Вес: '+this.state.item.info_weight} <ItemInfoPopover items={this.state.item.items} /></Typography>
                                :
                                null
                            }
                            <Typography gutterBottom variant="h5" component="span" className="ItemDesc ItemPrice">{'Цена: '+this.state.item.price} <AttachMoneyIcon fontSize="small" /></Typography>
                            
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
                                        <Typography component="span" className="CardCountItem">{this.state.count}</Typography>
                                    </Button>
                                    <Button variant="contained" className="BtnCardMain" onClick={this.add.bind(this)}> 
                                        <AddIcon fontSize="small" />
                                    </Button>
                                </ButtonGroup>
                            }
                        </Grid>
                    </Grid>
                </Hidden>
                
                <Hidden smUp>
                    <Grid container className="MainItem_mobile">
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                            <img src={"https://newjacofood.ru/src/img/items/"+this.state.item.img_full} alt={this.state.item.name} />
                        </Grid>
                        <Grid item xs={12} className="MainLine">
                            <Typography variant="h5" component="h1">{this.state.item.name}</Typography>
                            <Typography gutterBottom variant="h5" component="span" className="ItemDesc ItemPrice">{this.state.item.price} <AttachMoneyIcon fontSize="small" /></Typography>
                        </Grid>
                        <Grid item xs={12} className="SecondLine">
                            <Typography variant="h5" component="span" className="ItemDesc ItemOther">{this.state.item.info_weight}</Typography>
                            <ItemInfoPopover items={this.state.item.items} />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography gutterBottom variant="h5" component="span" className="ItemDesc">{'Состав: '+this.state.item.tmp_desc}</Typography>
                        </Grid>
                        <Grid item xs={12} className="BtnLine">
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
                                        <Typography component="span" className="CardCountItem">{this.state.count}</Typography>
                                    </Button>
                                    <Button variant="contained" className="BtnCardMain" onClick={this.add.bind(this)}> 
                                        <AddIcon fontSize="small" />
                                    </Button>
                                </ButtonGroup>
                            }
                        </Grid>
                    </Grid>
                </Hidden>
            </div>
        )
    }
}