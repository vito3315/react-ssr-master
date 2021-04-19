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

import CloseIcon from '@material-ui/icons/Close';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

import itemsStore from '../../stores/items-store';

const queryString = require('query-string');

export function Actii() {
    let { cityName } = useParams();
  
    itemsStore.setCity(cityName);
  
    return (
        <RenderActii cityName={cityName} />
    );
}

class RenderActii extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {      
            actii: [],  
            is_load: false,
            showItem: null,
            openDialog: false,
            city_name: this.props.cityName,
        };
    }
    
    componentDidMount = () => {
        if( document.querySelector('.activeCat') ){
            document.querySelector('.activeCat').classList.remove('activeCat');
        }
        window.scrollTo(0, 0);
        itemsStore.setPage('actii');
        
        fetch('https://jacofood.ru/src/php/test_app.php', {
            method: 'POST',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'},
            body: queryString.stringify({
                type: 'get_my_actii_web', 
                city_id: this.state.city_name
            })
        }).then(res => res.json()).then(json => {
            this.setState({ 
                actii: json.actii, 
                is_load: true,
            });
        })
        .catch(err => { });
    }
    
    closeDialog(){
        this.setState({
            showItem: null,
            openDialog: false
        })
    }
    
    openDialog(item){
        this.setState({
            showItem: item,
            openDialog: true
        })
    }
    
    render() {
        if(!this.state.is_load){
            return (
                <Grid container className="Actii" style={{ marginTop: 64 }}>
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', paddingBottom: 15 }}>
                        <div style={{ width: 200, height: 30, backgroundColor: '#e5e5e5' }} />
                    </Grid>
                    <Grid item container spacing={3} md={10} sm={12} xs={12} xl={10} className="mainContainer" style={{ paddingTop: 0, paddingBottom: 50 }}>
                        <Grid item  xs={12} sm={6} md={4} xl={3}>
                            <div style={{ width: '100%', height: 400, backgroundColor: '#e5e5e5' }} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} xl={3}>
                            <div style={{ width: '100%', height: 400, backgroundColor: '#e5e5e5' }} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} xl={3}>
                            <div style={{ width: '100%', height: 400, backgroundColor: '#e5e5e5' }} />
                        </Grid>
                    </Grid>    
                </Grid>
            )
        }
        
        return (
            <Grid container className="Actii" style={{ marginTop: 64 }}>
                <Grid item xs={12} style={{ paddingBottom: 0 }}>
                    <Typography variant="h5" component="h1">Акции</Typography>
                </Grid>
                <Grid item container spacing={3} md={10} sm={12} xs={12} xl={10} className="mainContainer" style={{ paddingTop: 0 }}>
                    {this.state.actii.map((item, key) =>
                        <Grid item xs={12} sm={6} md={4} xl={3} key={key}>
                            <img src={"https://newjacofood.ru/src/img/aktii/"+item.img_min} alt={item.promo_title} style={{ width: '100%' }} onClick={this.openDialog.bind(this, item)} />
                        </Grid>
                    )}
                </Grid>
                
                { this.state.showItem ?
                    <Dialog onClose={this.closeDialog.bind(this)} aria-labelledby="customized-dialog-title" className="modalActii" open={this.state.openDialog}>
                        <MuiDialogTitle disableTypography style={{ margin: 0, padding: 8 }}>
                            <Typography variant="h6">{this.state.showItem.promo_title}</Typography>
                          
                            <IconButton aria-label="close" style={{ position: 'absolute', top: 0, right: 0, color: '#000' }} onClick={this.closeDialog.bind(this)}>
                                <CloseIcon />
                            </IconButton>
                        </MuiDialogTitle>
                        
                        <MuiDialogContent className="modalActiiContent">
                            <div dangerouslySetInnerHTML={{__html: this.state.showItem.text}} />
                        </MuiDialogContent>
                        {this.state.showItem.promo.length > 0 ?
                            <MuiDialogActions style={{ justifyContent: 'center' }}>
                                <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="BtnBorderOther">
                                    <Button variant="contained" className="BtnCardMain CardInCardItem">Применить промокод</Button>
                                </ButtonGroup>
                            </MuiDialogActions>
                                :
                            null
                        }
                    </Dialog>
                        :
                    null
                }
            </Grid>
        )
    }
}