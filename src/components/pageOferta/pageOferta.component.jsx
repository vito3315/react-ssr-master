import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import itemsStore from '../../stores/items-store';

import {Helmet} from "react-helmet";
const queryString = require('query-string');
import axios from 'axios';

function get_city(path){
    return path.split('/')[1];
}

export class PageOferta extends React.Component {
    _isMounted = false;
    
    constructor(props) {
        super(props);
        
        this.state = {      
            is_load: false,
            city_name: props.match.params.cityName,
            title: '',
            description: '',
            page: null
        };
        
        itemsStore.setCity(props.match.params.cityName);
    }
    
    static fetchData(propsData) {
        let data = {
            type: 'get_page_info', 
            city_id: get_city(propsData),
            page: 'publichnaya-oferta' 
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
    
    componentWillUnmount(){
        this._isMounted = false; 
    }
    
    componentDidMount(){
        this._isMounted = true; 
        
        if( document.querySelector('.activeCat') ){
            document.querySelector('.activeCat').classList.remove('activeCat');
        }
        window.scrollTo(0, 0);
        itemsStore.setPage('actii');
        
        PageOferta.fetchData('/'+this.state.city_name).then( data => {
            data.page.content = data.page.content.replace(
                /<a href=\"\//g,
                '<a href="/'+this.state.city_name+'/'
            );
            
            this.setState( {
                title: data.page.title,
                description: data.page.description,
                page: data.page
            } );
        } );
    }
    
    render() {
        return (
            <>
                <Helmet>
                    <title>{this.state.title}</title>
                    <meta name="description" content={this.state.description} />
                </Helmet>
                
                <Grid container className="PAGEoferta mainContainer">
                    <Grid item xs={12} style={{ paddingBottom: 15 }}>
                        <Typography variant="h5" component="h1">{ this.state.page ? this.state.page.page_h : '' }</Typography>
                    </Grid>
                    
                    { this.state.page && this.state.page.content ?
                        <Grid item container spacing={3} md={10} sm={12} xs={12} xl={10} className="mainContainer" dangerouslySetInnerHTML={{__html: this.state.page.content}} />
                            :
                        null
                    }
                </Grid>
            </>
        )
    }
}