import React from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

import axios from 'axios';

import {Helmet} from "react-helmet";

import itemsStore from '../../stores/items-store';

const queryString = require('query-string');

/*export function Actii() {
    let { cityName } = useParams();
  
    itemsStore.setCity(cityName);
  
    return (
        <RenderActii cityName={cityName} />
    );
}*/

function get_city(path){
    return path.split('/')[1];
}

export class Actii extends React.Component {
    constructor(props) {
        super(props);
        
        console.log( 'location', props.location )
        console.log( 'context', props.context )
        
        this.state = {      
            actii: [],  
            is_load: false,
            showItem: null,
            openDialog: false,
            city_name: get_city(props.location.pathname),
            page: null,
            title: '',
            description: ''
        };
    }
    
    static fetchData() {
        console.log( 'Post.fetchData()' );

        let data = {
            type: 'get_page_info', 
            city_id: 'samara',
            page: 'akcii' 
        };
        
        axios({
            method: 'POST',
            url:'https://jacofood.ru/src/php/test_app.php',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: queryString.stringify(data)
        }).then(response => {
            if(response['status'] === 200){
                var json = response['data'];
                
                return {
                    title: json.title,
                    description: json.description,
                }
            } 
        }).catch(function (error) {
            console.log(error);
        });
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
            
            setTimeout(() => {
                let hash = window.location.hash;
                if( hash.length > 0 ){
                    let act_id = hash.split('#act')[1];
                    
                    let this_item = json.actii.filter( (item) => item.id == act_id )[0];
                    
                    this.openDialog(this_item);
                    window.location.hash = '';
                }
            }, 300);
        })
        .catch(err => { });
        
        fetch('https://jacofood.ru/src/php/test_app.php', {
            method: 'POST',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'},
            body: queryString.stringify({
                type: 'get_page_info', 
                city_id: this.props.cityName,
                page: 'akcii'
            })
        }).then(res => res.json()).then(json => {
            console.log( json )
            this.setState({ 
                page: json.page,
                title: json.page.title,
                description: json.page.description
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
        return (
            <Grid container className="Actii mainContainer MuiGrid-spacing-xs-3">
                
                
                <Helmet>
                    <title>{this.state.title}</title>
                    <meta name="description" content={this.state.description} />
                </Helmet>
                        
                
                <Grid item xs={12}>
                    <Typography variant="h5" component="h1">{ this.state.page && this.state.page.page_h ? this.state.page.page_h : '' }</Typography>
                </Grid>
                <Grid item container spacing={3} md={10} sm={12} xs={12} xl={10} className="mainContainer">
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
                          
                            <IconButton aria-label="close" style={{ position: 'absolute', top: 0, right: 0 }} onClick={this.closeDialog.bind(this)}>
                                <FontAwesomeIcon icon={faTimes} style={{ fontSize: '1.8rem', color: '#e5e5e5' }} />
                            </IconButton>
                        </MuiDialogTitle>
                        
                        <MuiDialogContent className="modalActiiContent">
                            <div dangerouslySetInnerHTML={{__html: this.state.showItem.text}} />
                        </MuiDialogContent>
                        {this.state.showItem.promo.length > 0 ?
                            <MuiDialogActions style={{ justifyContent: 'center', padding: '15px 0px' }}>
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