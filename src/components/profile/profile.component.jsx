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

import CheckIcon from '@material-ui/icons/Check';

import CloseIcon from '@material-ui/icons/Close';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

import itemsStore from '../../stores/items-store';

import TextField from '@material-ui/core/TextField';

const queryString = require('query-string');

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';

import Snackbar from '@material-ui/core/Snackbar';
import Hidden from '@material-ui/core/Hidden';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
          <div style={{ width: '100%' }}>
            {children}
            </div>   
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export function Profile() {
    let { cityName } = useParams();
  
    itemsStore.setCity(cityName);
  
    return (
        <RenderProfile cityName={cityName} />
    );
}

class RenderProfile extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {      
            actii: [],  
            is_load: false,
            openDialog: false,
            city_name: this.props.cityName,
            
            valueTab: 1,
            info: {},
            arr_day: [],
            arr_m: [ 
                {name: 'Января', value: 1},
                {name: 'Февраля', value: 2},
                {name: 'Марта', value: 3},
                {name: 'Апреля', value: 4},
                {name: 'Мая', value: 5},
                {name: 'Июня', value: 6},
                {name: 'Июля', value: 7},
                {name: 'Августа', value: 8},
                {name: 'Сентября', value: 9},
                {name: 'Октября', value: 10},
                {name: 'Ноября', value: 11},
                {name: 'Декабря', value: 12}
            ],
            
            changeDay: '',
            changeM: '',
            userMail: '',
            openMSG: false,
            statusMSG: false,
            textMSG: '',
            spam: 0,
            userName: ''
        };
    }
    
    componentDidMount = () => {
        if( document.querySelector('.activeCat') ){
            document.querySelector('.activeCat').classList.remove('activeCat');
        }
        window.scrollTo(0, 0);
        itemsStore.setPage('actii');
        
        let arr_day = [];
        
        for(let i = 1; i <= 31; i++){
            arr_day.push(i)
        }
        
        fetch('https://jacofood.ru/src/php/test_app.php', {
            method: 'POST',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'},
            body: queryString.stringify({
                type: 'get_user_web', 
                city_id: this.state.city_name,
                user_id: itemsStore.getToken()
            })
        }).then(res => res.json()).then(json => {
            console.log( json )
            
            this.setState({ 
                info: json, 
                is_load: true,
                arr_day: arr_day,
                userMail: json.user.mail,
                spam: json.user.spam,
                userName: json.user.name
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
    
    changeTab = (event, newValue) => {
        this.setState({
            valueTab: newValue
        })
    }
    
    changeM = (event) => {
        this.setState({
            changeM: event.target.value
        })
    }
    
    changeDay = (event) => {
        this.setState({
            changeDay: event.target.value
        })
    }
    
    changeMail = (event) => {
        this.setState({
            userMail: event.target.value
        })
    }
    
    closeAlert(){
        this.setState({
            openMSG: false
        })
    }
    
    changeCheck = (event) => {
        let check = event.target.checked;
        
        fetch('https://jacofood.ru/src/php/test_app.php', {
            method: 'POST',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'},
            body: queryString.stringify({
                type: 'save_profile_spam', 
                my_spam: check ? 1 : 0,
                user_id: itemsStore.getToken(),
            })
        }).then(res => res.json()).then(json => {
            this.setState({
                openMSG: true,
                statusMSG: true,
                textMSG: "Данные успешно обновлены",
                spam: check ? 1 : 0
            })
        });
    }
    
    saveMail(){
        fetch('https://jacofood.ru/src/php/test_app.php', {
            method: 'POST',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'},
            body: queryString.stringify({
                type: 'save_profile_mail_web', 
                my_mail: this.state.userMail,
                user_id: itemsStore.getToken(),
            })
        }).then(res => res.json()).then(json => {
            setTimeout(() => {
                if( json['st'] ){
                    this.setState({
                        openMSG: true,
                        statusMSG: true,
                        textMSG: "Данные успешно обновлены"
                    })
                }else{
                    this.setState({
                        openMSG: true,
                        statusMSG: false,
                        textMSG: json['text']
                    })
                }
            }, 300);
        });
    }
    
    saveDay(){
        let day = this.state.changeDay,
            mo = this.state.changeM;
        
        if( day != '' & mo != '' ){
            
            let nameM = '';
            
            this.state.arr_m.map(function(item, key){
                if( parseInt(item.value) == parseInt(mo) ){
                    nameM = item.name;
                }
            })
            
            fetch('https://jacofood.ru/src/php/test_app.php', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded'},
                body: queryString.stringify({
                    type: 'save_profile_date', 
                    my_date: day + ' ' + nameM,
                    user_id: itemsStore.getToken(),
                })
              }).then(res => res.json()).then(json => {
                if( json['st'] ){
                    fetch('https://jacofood.ru/src/php/test_app.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type':'application/x-www-form-urlencoded'},
                        body: queryString.stringify({
                            type: 'get_user_web', 
                            city_id: this.state.city_name,
                            user_id: itemsStore.getToken()
                        })
                    }).then(res => res.json()).then(json => {
                        this.setState({ 
                            info: json, 
                        });
                    })
                    .catch(err => { });
                }
                  
                setTimeout(() => {
                    if( json['st'] ){
                        this.setState({
                            openMSG: true,
                            statusMSG: true,
                            textMSG: "Данные успешно обновлены"
                        });
                        
                        
                    }else{
                        this.setState({
                            openMSG: true,
                            statusMSG: false,
                            textMSG: json['text']
                        })
                    }
                }, 300);
            });
        }
    }
    
    activePromo(promo){
        itemsStore.setPromo(JSON.stringify(promo))
        let res = itemsStore.checkPromo();
        
        setTimeout(() => {
            if( res['st'] ){
                this.setState({
                    openMSG: true,
                    statusMSG: true,
                    textMSG: "Промокод применен"
                })
            }else{
                this.setState({
                    openMSG: true,
                    statusMSG: false,
                    textMSG: res['text']
                })
            }
        }, 300);
    }
    
    changeName = (event) => {
        this.setState({
            userName: event.target.value
        })
    }
    
    saveName(){
        fetch('https://jacofood.ru/src/php/test_app.php', {
            method: 'POST',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'},
            body: queryString.stringify({
                type: 'save_profile_name', 
                my_name: this.state.userName,
                user_id: itemsStore.getToken(),
            })
        }).then(res => res.json()).then(json => {
            setTimeout(() => {
                if( json['st'] ){
                    this.setState({
                        openMSG: true,
                        statusMSG: true,
                        textMSG: "Данные успешно обновлены"
                    })
                }else{
                    this.setState({
                        openMSG: true,
                        statusMSG: false,
                        textMSG: json['text']
                    })
                }
            }, 300);
        });
    }
    
    render() {
        return (
            <Grid container className="Profile mainContainer MuiGrid-spacing-xs-3">
                <Grid item xs={12}>
                    <Typography variant="h5" component="h1">Личный кабинет</Typography>
                </Grid>
                
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={this.state.openMSG}
                    autoHideDuration={3000}
                    onClose={this.closeAlert.bind(this)}
                    message={this.state.textMSG}
                    style={{ backgroundColor: this.state.statusMSG ? 'green' : '#BB0025', borderRadius: 4 }}
                    action={
                        <React.Fragment>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={this.closeAlert.bind(this)}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </React.Fragment>
                    }
                />
                
                <Grid item container spacing={3} md={10} sm={12} xs={12} xl={10} className="mainContainer" style={{ paddingTop: 0 }}>
                    <AppBar position="static" style={{ backgroundColor: '#fff', color: '#000', zIndex: 0 }} elevation={0}>
                        <Tabs value={this.state.valueTab} onChange={this.changeTab.bind(this)} aria-label="simple tabs example"  style={{ justifyContent: 'center' }}>
                            <Tab label="Промокоды" {...a11yProps(0)} disableRipple={true} />
                            <Tab label="Заказы" {...a11yProps(1)} disableRipple={true} />
                            <Tab label="Редактирование" {...a11yProps(2)} disableRipple={true} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={this.state.valueTab} index={0} style={{ width: '100%' }}>
                        <div style={{ padding: 12 }}>
                            {this.state.info.promo ?
                                <Hidden mdDown>
                                    <table style={{ width: '100%' }} className="TablePromo">
                                        <thead>
                                            <tr>
                                                <td><Typography variant="h5" component="span">Промокод</Typography></td>
                                                <td><Typography variant="h5" component="span">Промокод дает:</Typography></td>
                                                <td><Typography variant="h5" component="span">Действует до</Typography></td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.info.promo.promo.map((item, key) => 
                                                <tr key={key}>
                                                    <td><Typography variant="h5" component="span" onClick={this.activePromo.bind(this, item.info)}>{item.promo_name}</Typography></td>
                                                    <td><Typography variant="h5" component="span">{item.promo_text}</Typography></td>
                                                    <td><Typography variant="h5" component="span">{item.date_end}</Typography></td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </Hidden>
                                    :
                                null
                            }
                            {this.state.info.promo ?
                                <Hidden lgUp>
                                    <table style={{ width: '100%' }} className="TablePromoMobile">
                                        <tbody>
                                            {this.state.info.promo.promo.map((item, key) => 
                                                <tr key={key}>
                                                    <td>
                                                        <div>
                                                            <Typography variant="h5" component="span">Промокод: </Typography>
                                                            <Typography variant="h5" component="span">{item.promo_name}</Typography>
                                                        </div>
                                                        <div style={{ width: '100%', paddingTop: 10 }}>
                                                            <Typography variant="h5" component="span">Действует до: </Typography>
                                                            <Typography variant="h5" component="span">{item.date_end}</Typography>
                                                        </div>
                                                        <div style={{ width: '100%', paddingTop: 10, textAlign: 'justify' }}>
                                                            <Typography variant="h5" component="span">Промокод дает: </Typography>
                                                            <Typography variant="h5" component="span">{item.promo_text}</Typography>
                                                        </div>
                                                        <div style={{ width: '100%', paddingTop: 10 }}>
                                                            <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className="BtnBorder" style={{ width: '100%' }}>
                                                                <Button variant="contained" className="BtnCardMain CardInCardItem" style={{ width: '100%' }}>Активирывать промокод</Button>
                                                            </ButtonGroup>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </Hidden>
                                    :
                                null
                            }
                        </div>
                    </TabPanel>
                    <TabPanel value={this.state.valueTab} index={1} style={{ width: '100%' }}>
                        {this.state.info.orders ?
                            <table className="TableOrders">
                                <thead>
                                    <tr>
                                        <td><Typography variant="h5" component="span">№</Typography></td>
                                        <td><Typography variant="h5" component="span">Дата</Typography></td>
                                        <td><Typography variant="h5" component="span">Сумма</Typography></td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.info.orders.my_orders.map((item, key) => 
                                        <tr key={key}>
                                            <td><Typography variant="h5" component="span">{item.order_id}</Typography></td>
                                            <td><Typography variant="h5" component="span">{item.date_time_new}</Typography></td>
                                            <td>
                                                <Typography className="CardPriceItem" variant="h5" component="span">{item.sum} <AttachMoneyIcon fontSize="small" /></Typography>
                                            </td>
                                            <td><Typography variant="h5" component="span">{parseInt(item.is_delete) == 1 ? <CloseIcon /> : <CheckIcon />}</Typography></td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                                :
                            null
                        }
                    </TabPanel>
                    <TabPanel value={this.state.valueTab} index={2} style={{ width: '100%' }}>
                        {this.state.info.user ?
                            <div className="TableInfo">
                                <form noValidate autoComplete="off">
                                    <TextField 
                                        label="Имя" 
                                        value={this.state.userName} 
                                        className="input" 
                                        onChange={this.changeName.bind(this)}
                                        onBlur={this.saveName.bind(this)}
                                    />
                                    <TextField InputProps={{ readOnly: true }} label="Номер телефона" value={this.state.info.user.login} className="input" />
                                </form>
                                <form noValidate autoComplete="off">
                                    {this.state.info.user.date_bir != '' ?
                                        <TextField label="Дата рождения" className="input" InputProps={{ readOnly: true }} value={this.state.info.user.date_bir} />
                                            :
                                        <div className="input">
                                            <InputLabel className="otherLabel">Дата рождения</InputLabel>
                                            
                                            <FormControl className="ChangeDay">
                                                <Select
                                                  labelId="demo-simple-select-label"
                                                  id="demo-simple-select"
                                                  displayEmpty
                                                  value={this.state.changeDay}
                                                  onChange={this.changeDay.bind(this)}
                                                  onBlur={this.saveDay.bind(this)}
                                                >
                                                    <MenuItem className="menuItem" value="">День</MenuItem>
                                                    {this.state.arr_day.map((item, key) =>
                                                        <MenuItem key={key} className="menuItem" value={item}>{item}</MenuItem>
                                                    )}
                                                </Select>
                                            </FormControl>
                                            <FormControl className="ChangeM">
                                                <Select
                                                  labelId="demo-simple-select-label"
                                                  id="demo-simple-select"
                                                  displayEmpty
                                                  value={this.state.changeM}
                                                  onChange={this.changeM.bind(this)}
                                                  onBlur={this.saveDay.bind(this)}
                                                >
                                                    <MenuItem className="menuItem" value="">Месяц</MenuItem>
                                                    {this.state.arr_m.map((item, key) =>
                                                        <MenuItem key={key} className="menuItem" value={item.value}>{item.name}</MenuItem>
                                                    )}
                                                </Select>
                                            </FormControl>
                                        </div>
                                    }
                                    <TextField 
                                        label="Почта" 
                                        className="input" 
                                        value={this.state.userMail} 
                                        onChange={this.changeMail.bind(this)} 
                                        onBlur={this.saveMail.bind(this)}
                                    />
                                </form>
                                
                                <FormGroup row className="input checkbox">
                                    <FormControlLabel 
                                        onChange={this.changeCheck.bind(this)} 
                                        control={<Checkbox checked={ parseInt(this.state.spam) == 1 ? true : false } name="checkedC" />} 
                                        label="Получать сообщения с акциями" 
                                    />
                                </FormGroup>
                            </div>
                                :
                            null
                        }
                    </TabPanel>
                </Grid>
                
                
                
                
                
                
                
                
                { this.state.showItem ?
                    <Dialog onClose={this.closeDialog.bind(this)} aria-labelledby="customized-dialog-title" className="modalProfile" open={this.state.openDialog}>
                        <MuiDialogTitle disableTypography style={{ margin: 0, padding: 8 }}>
                            <Typography variant="h6">{this.state.showItem.promo_title}</Typography>
                          
                            <IconButton aria-label="close" style={{ position: 'absolute', top: 0, right: 0, color: '#000' }} onClick={this.closeDialog.bind(this)}>
                                <CloseIcon />
                            </IconButton>
                        </MuiDialogTitle>
                        
                        <MuiDialogContent className="modalProfileContent">
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