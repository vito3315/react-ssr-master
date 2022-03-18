import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import itemsStore from '../../stores/items-store';
import config from '../../stores/config';

import {Helmet} from "react-helmet";
import axios from 'axios';
const queryString = require('query-string');

function ControlledAccordions(props) {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const points = props.points;

    return (
        <div className="Accordion">
            {points.map((item, key) => 
                <Accordion key={key} expanded={expanded === 'panel'+key} onChange={handleChange('panel'+key)}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={"panel"+key+"bh-content"}
                        id={"panel"+key+"bh-header"}
                    >
                        <Typography variant="h5" component="span">{item.raion}: {item.addr}</Typography>
                    </AccordionSummary>
                    <AccordionDetails className="AccordionDesc" style={{ flexDirection: 'column', padding: 0 }}>
                        <div>
                            <Typography variant="h5" component="b">Название организации: </Typography>
                            <Typography variant="h5" component="span">{item.organization}</Typography>
                        </div>
                        <div>
                            <Typography variant="h5" component="b">ИНН / КПП: </Typography>
                            <Typography variant="h5" component="span">{item.inn} / {item.kpp}</Typography>
                        </div>
                        <div>
                            <Typography variant="h5" component="b">ОГРН: </Typography>
                            <Typography variant="h5" component="span">{item.ogrn}</Typography>
                        </div>
                        <div>
                            <Typography variant="h5" component="b">Фактический адрес: </Typography>
                            <Typography variant="h5" component="span">{item.full_addr}</Typography>
                        </div>
                        <div>
                            <Typography variant="h5" component="b">Телефон: </Typography>
                            <Typography variant="h5" component="span">{item.phone}</Typography>
                        </div>
                    </AccordionDetails>
                </Accordion>
            )}
        </div>
    );
}

function get_city(path){
    
    path = path.split('/');
    path = path.filter( (item) => item != '' );
    
    return path[ 0 ];
}

export class Contact extends React.Component {
    is_load_script = false;

    constructor(props) {
        super(props);
        
        this.state = {      
            points: [],  
            unic_point: [],
            page: this.props.data ? this.props.data.page : null,
            title: '',
            description: '',
            
            city_name: this.props.city,
            is_load: false,

            is_load_script: false
        };
        
        itemsStore.setCity(this.props.city);
    }
    
    dynamicallyLoadScript() {
        if( this.state.is_load_script === false ){

            console.log( 'is_load_script' )

            var script = document.createElement("script");  // create a script DOM node
            script.src = 'https://api-maps.yandex.ru/2.1/?apikey=ae2bad1f-486e-442b-a9f7-d84fff6296db&lang=ru_RU';  // set its src to the provided URL

            document.head.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)

            this.setState({
                is_load_script: true
            })
        }
    }
    
    componentDidMount = () => {
        if( document.querySelector('.activeCat') ){
            document.querySelector('.activeCat').classList.remove('activeCat');
        }
        window.scrollTo(0, 0);
        itemsStore.setPage('contact');
        
        //this.dynamicallyLoadScript();
        
        Contact.fetchData('/'+this.state.city_name).then( data => {
            this.setState( {
                title: data.page.title,
                description: data.page.description,
            } );
        } );
        
        fetch(config.urlApi, {
            method: 'POST',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'},
            body: queryString.stringify({
                type: 'get_addr_zone_web', 
                city_id: this.state.city_name
            })
        }).then(res => res.json()).then(json => {
            let points_zone = [];
            
            json.map(function(point){
				if(point['zone_origin'].length > 0){
					points_zone.push( JSON.parse(point['zone_origin']) );
				}
            })
            
            let unic_point = [],
                check = false;
            
            json.map(function(point){
                check = false;
                
                unic_point.map(function(new_point){
                    if( parseInt(new_point.id) == parseInt(point.id) ){
                        check = true;
                    }
                })
                
                if( !check ){
                    unic_point.push(point)
                }
            })
            
            this.setState({
                points: json,
                unic_point: unic_point,
                is_load: true
            })
            
            setTimeout(() => {
                this.loadMap(json, points_zone);
            }, 500);
            
        })
        .catch(err => { });
    }
    
    static fetchData(propsData) {
        let data = {
            type: 'get_page_info', 
            city_id: get_city(propsData),
            page: 'contacts' 
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
    
    loadMap(points, points_zone){
        let myMap2;
        
        ymaps.ready(function () {

            myMap2 = new ymaps.Map('ForMap', {
				center: [ points[0]['xy_center_map']['latitude'], points[0]['xy_center_map']['longitude'] ],
				zoom: 10.8
			});
            
			let HintLayout = ymaps.templateLayoutFactory.createClass( 
                "<div class='my-hint'>" +
                    "<b>{{ properties.address }}</b><br />" +
                    "График работы: c 10:00 до 21:30<br />" +
                    "Стоимость доставки: {{ properties.sum_div }} руб." +
                "</div>"
            );
			
            points_zone.map((zone, key)=>{
                myMap2.geoObjects.add(
                    new ymaps.Polygon([zone], {
    					//hintContent: "Зона доставки"
                        address: points[ key ]['addr'], 
                        sum_div: points[ key ]['sum_div'], 
    				}, {
                        hintLayout: HintLayout,
    					fillColor: 'rgba(187, 0, 37, 0.25)',
    					strokeColor: 'rgb(187, 0, 37)',
    					strokeWidth: 5
    				})
                );
            })
            
			points.map(function(point){
				myMap2.geoObjects.add(
                    new ymaps.Placemark( [point['xy_point']['latitude'], point['xy_point']['longitude']], {
    				
                    }, {
                        iconLayout: 'default#image',
                        iconImageHref: '/assets/img_other/Favikon.png',
    					iconImageSize: [30, 30],
    					iconImageOffset: [-12, -24],
    					iconContentOffset: [15, 15],
    				})
                )
			})
        })
    }
    
    render() {
        return (
            <Grid container className="Contact mainContainer MuiGrid-spacing-xs-3">
                
                <Helmet>
                    <title>{this.state.title}</title>
                    <meta name="description" content={this.state.description} />
                </Helmet>
                
                <Grid item xs={12}>
                    <Typography variant="h5" component="h1">Контакты</Typography>
                </Grid>
                <Grid item lg={4} md={4} xl={4} sm={12} xs={12} className="mainContainer">
                    <Typography variant="h5" component="h2">Режим работы</Typography>
                    <Typography variant="h5" component="span" className="p20">Работаем ежедневно с 10:00 до 21:30</Typography>
                    <Typography variant="h5" component="h2">Телефон контакт-центра:</Typography>
                    {this.state.points[0] ?
                        <Typography variant="h5" component="a" className="p20" href={'tel:'+this.state.points[0].phone_new}>{this.state.points[0].phone}</Typography>
                            :
                        null
                    }
                    <Typography variant="h5" component="h2">Адреса кафе:</Typography>
                    <ControlledAccordions points={this.state.unic_point}/>
                </Grid>
                <Grid item lg={8} md={8} xl={8} sm={12} xs={12} id="ForMap">
                    <div style={{ width: '100%', height: '100%', marginRight: 12, backgroundColor: '#e5e5e5' }} />    
                </Grid>
            </Grid>
        )
    }
}