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


import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import itemsStore from '../../stores/items-store';

const queryString = require('query-string');

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexShrink: 0,
  }
}));

function ControlledAccordions(props) {
    const classes = useStyles();
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
                        <Typography variant="h5" className={classes.heading}>{item.raion}: {item.addr}</Typography>
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

export function Contact() {
    let { cityName } = useParams();
  
    itemsStore.setCity(cityName);
  
    return (
        <RenderContact cityName={cityName} />
    );
}

class RenderContact extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {      
            points: [],  
            city_name: this.props.cityName,
            is_load: false,
        };
    }
    
    dynamicallyLoadScript() {
        var script = document.createElement("script");  // create a script DOM node
        script.src = 'https://api-maps.yandex.ru/2.1/?apikey=ae2bad1f-486e-442b-a9f7-d84fff6296db&lang=ru_RU';  // set its src to the provided URL

        document.head.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
    }
    
    componentDidMount = () => {
        if( document.querySelector('.activeCat') ){
            document.querySelector('.activeCat').classList.remove('activeCat');
        }
        window.scrollTo(0, 0);
        itemsStore.setPage('contact');
        
        this.dynamicallyLoadScript();
        
        fetch('https://jacofood.ru/src/php/test_app.php', {
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
            
            this.setState({
                points: json,
            })
            
            setTimeout(() => {
                this.loadMap(json, points_zone);
            }, 500);
            
        })
        .catch(err => { });
    }
    
    loadMap(points, points_zone){
        let myMap2;
        
        ymaps.ready(function () {
            myMap2 = new ymaps.Map('ForMap', {
				center: [ points[0]['xy_center_map']['latitude'], points[0]['xy_center_map']['longitude'] ],
				zoom: 10.8
			});
            
			points_zone.map((zone)=>{
                myMap2.geoObjects.add(
                    new ymaps.Polygon([zone], {
    					//hintContent: "Зона доставки"
    				}, {
    					fillColor: 'rgba(187, 0, 37, 0)',
    					strokeColor: 'rgb(187, 0, 37)',
    					strokeWidth: 5
    				})
                );
            })
            
			let HintLayout = ymaps.templateLayoutFactory.createClass( 
                "<div class='my-hint'>" +
                    "<b>{{ properties.address }}</b><br />" +
                    "График работы: c 10:00 до 21:30" +
                "</div>"
            );
			
			points.map(function(point){
				myMap2.geoObjects.add(
                    new ymaps.Placemark( [point['xy_point']['latitude'], point['xy_point']['longitude']], {
    					//hintContent: point['addr'],
    					//balloonContent: point['addr'],
                        address: point['addr'],
                    }, {
                        hintLayout: HintLayout,
    					iconLayout: 'default#image',
    					iconImageHref: 'https://jacofood.ru/src/img/other/Favikon.png',
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
                <Grid item xs={12}>
                    <Typography variant="h5" component="h1">Контакты</Typography>
                </Grid>
                <Grid item lg={4} md={4} xl={4} sm={12} xs={12} className="mainContainer">
                    {this.state.points[0] ?
                        <Typography variant="h5" component="span" className="p20">Стоимость доставки: {this.state.points[0].sum_div} руб.</Typography>
                            :
                        null
                    }
                    <Typography variant="h5" component="h2">Режим работы</Typography>
                    <Typography variant="h5" component="span" className="p20">Работаем ежедневно с 10:00 до 21:30</Typography>
                    <Typography variant="h5" component="h2">Телефон контакт-центра:</Typography>
                    {this.state.points[0] ?
                        <Typography variant="h5" component="a" className="p20" href={'tel:'+this.state.points[0].phone_new}>{this.state.points[0].phone}</Typography>
                            :
                        null
                    }
                    <Typography variant="h5" component="h2">Адреса кафе:</Typography>
                    <ControlledAccordions points={this.state.points}/>
                </Grid>
                <Grid item lg={8} md={8} xl={8} sm={12} xs={12} id="ForMap"></Grid>
            </Grid>
        )
    }
}