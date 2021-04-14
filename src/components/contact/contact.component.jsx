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


import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import itemsStore from '../../stores/items-store';

const queryString = require('query-string');

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
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
                            <Typography variant="h5" component="span">ООО Мистер Жако</Typography>
                        </div>
                        <div>
                            <Typography variant="h5" component="b">ИНН / КПП: </Typography>
                            <Typography variant="h5" component="span">6321390811 / 632401001</Typography>
                        </div>
                        <div>
                            <Typography variant="h5" component="b">ОГРН: </Typography>
                            <Typography variant="h5" component="span">1156313042621</Typography>
                        </div>
                        <div>
                            <Typography variant="h5" component="b">Фактический адрес: </Typography>
                            <Typography variant="h5" component="span">445021, РФ, Самарская обл., г. Тольятти, ул. Ленинградская, д. 47, комната 47</Typography>
                        </div>
                        <div>
                            <Typography variant="h5" component="b">Телефон: </Typography>
                            <Typography variant="h5" component="span">8 (8482) 90-30-52</Typography>
                        </div>
                    </AccordionDetails>
                </Accordion>
            )}
        </div>
    );
}

export class Contact extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {      
            points: [],  
            is_load: false,
        };
    }
    
    componentDidMount = () => {
        if( document.querySelector('.activeCat') ){
            document.querySelector('.activeCat').classList.remove('activeCat');
        }
        
        itemsStore.setPage('contact');
        
        fetch('https://jacofood.ru/src/php/test_app.php', {
            method: 'POST',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'},
            body: queryString.stringify({
                type: 'get_addr_zone', 
                city_id: 1
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
            
            this.loadMap(json, points_zone);
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
    					iconImageHref: '/src/assets/img_other/Favikon.png',
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
            <Grid container md={10} sm={12} xs={12} xl={10} className="Contact mainContainer MuiGrid-spacing-xs-3">
                <Grid item xs={12}>
                    <Typography variant="h5" component="h1">Контакты</Typography>
                </Grid>
                <Grid item lg={4} md={4} xl={4} sm={12} xs={12} >
                    <Typography variant="h5" component="span" className="p20">Стоимость доставки: 100 руб.</Typography>
                    <Typography variant="h5" component="h2">Режим работы</Typography>
                    <Typography variant="h5" component="span" className="p20">Работаем ежедневно с 10:00 до 21:30</Typography>
                    <Typography variant="h5" component="h2">Телефон контакт-центра:</Typography>
                    <Typography variant="h5" component="span" className="p20">8 (8482) 90-30-52</Typography>
                    <Typography variant="h5" component="h2">Адреса кафе:</Typography>
                    <ControlledAccordions points={this.state.points}/>
                </Grid>
                <Grid item lg={8} md={8} xl={8} sm={12} xs={12} id="ForMap"></Grid>
            </Grid>
        )
    }
}