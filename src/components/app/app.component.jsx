import React from 'react';
import { NavLink as Link, Switch, Route, Redirect } from 'react-router-dom';

import { Home } from '../home';
import { HomeCat } from '../home';
import { Item } from '../item';
import { Contact } from '../contact';
import { Actii } from '../actii';
import { Profile } from '../profile';
import { Cart } from '../cart';

import { PageAbout } from '../pageAbout';
import { PageJob } from '../pageJob';
import { PageInstPay } from '../pageInstPay';
import { PageOferta } from '../pageOferta';
import { PagePolitika } from '../pagePolitika';

import { HeaderCat } from '../header';
import { Header } from '../header';

import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';

const queryString = require('query-string');

import { Provider } from 'mobx-react';
import itemsStore from '../../stores/items-store';
import config from '../../stores/config';
const stores = { itemsStore };

import { autorun } from "mobx"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faFacebookF, faOdnoklassniki, faVk, faTelegramPlane } from '@fortawesome/free-brands-svg-icons'

function Status({ code, children }) {
  return (
    <Route
      render={({ staticContext }) => {
        if (staticContext) staticContext.status = code;
        return children;
      }}
    />
  );
}

export function NotFound() {
  return (
    <Status code={404}>
        <Grid container className="Contact mainContainer MuiGrid-spacing-xs-3" style={{ marginTop: 64 }}>
            <Grid item xs={12}>
                <Typography variant="h5" component="h1">404 Страница не найдена</Typography>
            </Grid>
            
        </Grid>
    </Status>
  );
}

class StickyFooter extends React.Component{
    constructor(props) {
        super(props);
        
        /*let pathname = window.location.pathname;
        
        pathname = pathname.split('/');
        pathname = pathname[0];*/
        
        this.state = {      
            soc_link: null,
            cityName: this.props.cityName,
            is_load: false,
            page: ''
        };
    }
    
    loadPageInfo(){
        if( itemsStore.getCity() ){
            fetch(config.urlApi, {
                method: 'POST',
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded'},
                body: queryString.stringify({
                    type: 'get_page_info', 
                    city_id: itemsStore.getCity(),
                    page: 'info'
                })
            }).then(res => res.json()).then(json => {
                this.setState({
                    soc_link: json.soc_link,
                    is_load: true
                });
            })
            .catch(err => { });
        }
    }
    
    componentDidMount = () => {
        
        this.setState({
            page: itemsStore.getPage()
        })
        
        autorun(() => {
            this.setState({
                cityName: itemsStore.getCity()
            })
            
            this.setState({
                page: itemsStore.getPage()
            })
            
            this.loadPageInfo();
        })
    }
    
    render(){
        return (
            <footer className={"footer "+(this.state.page == 'cart' ? this.state.page : '')}>
                <Grid container className="mainContainer">
                    <Grid item lg={3} md={3} sm={3} xl={3} xs={12} className="copy">
                        <Typography variant="body1">© Жако 2017 - {new Date().getFullYear()}</Typography>
                    </Grid>
                    <Grid item lg={3} md={3} sm={3} xl={3} xs={12}>
                        <Link
                            to={ '/'+this.state.cityName+'/about' }
                            style={{ textDecoration: 'none' }}
                        >
                            <Typography variant="body1">О Компании</Typography>
                        </Link>
                        <Link
                            to={ '/'+this.state.cityName+'/jobs' }
                            style={{ textDecoration: 'none' }}
                        >
                            <Typography variant="body1">Вакансии</Typography>
                        </Link>
                        <Link
                            to={ '/'+this.state.cityName+'/publichnaya-oferta' }
                            style={{ textDecoration: 'none' }}
                        >
                            <Typography variant="body1">Публичная оферта</Typography>
                        </Link>
                    </Grid>
                    <Grid item lg={3} md={3} sm={3} xl={3} xs={12}>
                        <Link
                            to={ '/'+this.state.cityName+'/politika-konfidencialnosti' }
                            style={{ textDecoration: 'none' }}
                        >
                            <Typography variant="body1">Политика конфиденциальности</Typography>
                        </Link>
                        <Link
                            to={ '/'+this.state.cityName+'/contacts' }
                            style={{ textDecoration: 'none' }}
                        >
                            <Typography variant="body1">Доставка и контакты</Typography>
                        </Link>
                        <Link
                            to={ '/'+this.state.cityName+'/instpayorders' }
                            style={{ textDecoration: 'none' }}
                        >
                            <Typography variant="body1">Правила оплаты товаров</Typography>
                        </Link>
                    </Grid>
                    { this.state.is_load ?
                        <Grid item lg={3} md={3} sm={3} xl={3} xs={12} className="socIcons">
                            { this.state.soc_link && this.state.soc_link.link_fb ?
                                <Link
                                    to={{ pathname: this.state.soc_link.link_fb }}
                                    target="_blank"
                                    style={{ textDecoration: 'none' }}
                                >
                                    <FontAwesomeIcon icon={faFacebookF} style={{ fontSize: '2rem', padding: 10 }} />
                                </Link>
                                    :
                                null
                            }
                            { this.state.soc_link && this.state.soc_link.link_inst ?
                                <Link
                                    to={{ pathname: this.state.soc_link.link_inst }}
                                    target="_blank"
                                    style={{ textDecoration: 'none' }}
                                >
                                    <FontAwesomeIcon icon={faInstagram} style={{ fontSize: '2rem', padding: 10 }} />
                                </Link>
                                    :
                                null
                            }
                            { this.state.soc_link && this.state.soc_link.link_ok ?
                                <Link
                                    to={{ pathname: this.state.soc_link.link_ok }}
                                    target="_blank"
                                    style={{ textDecoration: 'none' }}
                                >
                                    <FontAwesomeIcon icon={faOdnoklassniki} style={{ fontSize: '2rem', padding: 10 }} />
                                </Link>
                                    :
                                null
                            }
                            { this.state.soc_link && this.state.soc_link.link_vk ?
                                <Link
                                    to={{ pathname: this.state.soc_link.link_vk }}
                                    target="_blank"
                                    style={{ textDecoration: 'none' }}
                                >
                                    <FontAwesomeIcon icon={faVk} style={{ fontSize: '2rem', padding: 10 }} />
                                </Link>
                                    :
                                null
                            }
                            
                                <Link
                                    to={{ pathname: 'https://t.me/jacofood' }}
                                    target="_blank"
                                    style={{ textDecoration: 'none' }}
                                >
                                    <FontAwesomeIcon icon={faTelegramPlane} style={{ fontSize: '2rem', padding: 10 }} />
                                </Link>
                                    
                        </Grid>
                            :
                        null
                    }
                </Grid>
            </footer>
        );
    }
}

export class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {      
            categoryItems: [],  
            cartItems: [],
            activePage: '',
            is_load: false,
            openCity: false,
            cityName: '',
            testData: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            cityList: [],
            
            openLogin: false,
            userLogin: '',
            userLoginFormat: '',
            userCode: '',
            
            stage_1: true,
            stage_2: false,
            
            timerSMS: 59,
            errPhone: '',
            errSMS: '',
            userName: '',
            
            soc_link: null
        };
    }

    componentDidMount = () => {
        autorun(() => {
            this.setState({
                activePage: itemsStore.getPage()
            })
            
            this.setState({
                cityName: itemsStore.getCity()
            })
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            this.state.activePage !== nextState.activePage ||
            this.state.cityName !== nextState.cityName
        );
    }
    
    render() {
        return (
            <Provider { ...stores }>
                <div className="home">
                    <Switch>
                        <Route
                            path='/:cityName/contacts'
                            exact={ true }
                        >
                            <Header 
                                data={this.props.globalState.data} 
                                city={this.props.globalState.city} 
                                this_link={this.props.globalState.this_link} />   
                            <Contact data={this.props.globalState.data} city={this.props.globalState.city} this_link={this.props.globalState.this_link}  />
                        </Route>
                        <Route
                            path='/:cityName/akcii/:act_id'
                            exact={ true }
                        >
                            <Header 
                                data={this.props.globalState.data} 
                                city={this.props.globalState.city} 
                                this_link={this.props.globalState.this_link} />  
                            <Actii data={this.props.globalState.data} city={this.props.globalState.city} this_link={this.props.globalState.this_link}  />
                        </Route>
                        <Route
                            path='/:cityName/akcii'
                            exact={ true }
                        >
                            <Header 
                                data={this.props.globalState.data} 
                                city={this.props.globalState.city} 
                                this_link={this.props.globalState.this_link} />  
                            <Actii data={this.props.globalState.data} city={this.props.globalState.city} this_link={this.props.globalState.this_link}  />
                        </Route>
                        <Route
                            path='/:cityName/menu'
                            exact={ true }
                        >
                            <Header 
                                data={this.props.globalState.data} 
                                city={this.props.globalState.city} 
                                this_link={this.props.globalState.this_link} />  
                            <Home data={this.props.globalState.data} city={this.props.globalState.city} this_link={this.props.globalState.this_link}  />
                        </Route>
                        <Route
                            path='/:cityName'
                            exact={ true }
                        >
                            <Header 
                                data={this.props.globalState.data} 
                                city={this.props.globalState.city} 
                                this_link={this.props.globalState.this_link} />  
                            <Home data={this.props.globalState.data} city={this.props.globalState.city} this_link={this.props.globalState.this_link}  />
                        </Route>
                        <Route
                            path='/:cityName/item/:id'
                            exact={ true }
                        >
                            <HeaderCat 
                                data={this.props.globalState.data} 
                                city={this.props.globalState.city} 
                                this_link={this.props.globalState.this_link} />  
                            <div style={{ paddingTop: 80 }}>
                                <Item 
                                    data={this.props.globalState.data} 
                                    city={this.props.globalState.city} 
                                    this_link={this.props.globalState.this_link} 
                                    linkItem={this.props.globalState.linkItem} 
                                    item={this.props.globalState.Item}  
                                />
                            </div>
                        </Route>
                        <Route
                            path='/:cityName/menu/:catLink/:itemId'
                            exact={ true }
                        >
                            <HeaderCat 
                                data={this.props.globalState.data} 
                                city={this.props.globalState.city} 
                                this_link={this.props.globalState.this_link} />  
                            <div style={{ paddingTop: 80 }}>
                                <Item 
                                    data={this.props.globalState.data} 
                                    city={this.props.globalState.city} 
                                    this_link={this.props.globalState.this_link} 
                                    linkItem={this.props.globalState.linkItem} 
                                    item={this.props.globalState.Item}  
                                />
                            </div>
                        </Route>
                        <Route 
                            exact 
                            path='/:cityName/profile/'
                        >
                            <Header 
                                data={this.props.globalState.data} 
                                city={this.props.globalState.city} 
                                this_link={this.props.globalState.this_link} />  
                            <Profile data={this.props.globalState.data} city={this.props.globalState.city} this_link={this.props.globalState.this_link}  />
                        </Route>
                        <Route
                            path='/:cityName/menu/:itemLink'
                            exact={ true }
                        >
                            <HeaderCat 
                                data={this.props.globalState.data} 
                                city={this.props.globalState.city} 
                                this_link={this.props.globalState.this_link} />  
                            <HomeCat data={this.props.globalState.data} city={this.props.globalState.city} this_link={this.props.globalState.this_link}  />
                        </Route>
                        <Route
                            path='/:cityName/cart'
                            exact={ true }
                        >
                            <Header 
                                data={this.props.globalState.data} 
                                city={this.props.globalState.city} 
                                this_link={this.props.globalState.this_link} />  
                            <Cart data={this.props.globalState.data} city={this.props.globalState.city} this_link={this.props.globalState.this_link}  />
                        </Route>
                        <Route
                            path='/:cityName/about'
                            exact={ true }
                        >
                            <Header 
                                data={this.props.globalState.data} 
                                city={this.props.globalState.city} 
                                this_link={this.props.globalState.this_link} />  
                            <PageAbout data={this.props.globalState.data} city={this.props.globalState.city} this_link={this.props.globalState.this_link}  />
                        </Route>
                        <Route
                            path='/:cityName/jobs'
                            exact={ true }
                        >
                            <Header 
                                data={this.props.globalState.data} 
                                city={this.props.globalState.city} 
                                this_link={this.props.globalState.this_link} />  
                            <PageJob data={this.props.globalState.data} city={this.props.globalState.city} this_link={this.props.globalState.this_link}  />
                        </Route>
                        <Route
                            path='/:cityName/instpayorders'
                            exact={ true }
                        >
                            <Header 
                                data={this.props.globalState.data} 
                                city={this.props.globalState.city} 
                                this_link={this.props.globalState.this_link} />  
                            <PageInstPay data={this.props.globalState.data} city={this.props.globalState.city} this_link={this.props.globalState.this_link}  />
                        </Route>
                        <Route
                            path='/:cityName/publichnaya-oferta'
                            exact={ true }
                        >
                            <Header 
                                data={this.props.globalState.data} 
                                city={this.props.globalState.city} 
                                this_link={this.props.globalState.this_link} />  
                            <PageOferta data={this.props.globalState.data} city={this.props.globalState.city} this_link={this.props.globalState.this_link}  />
                        </Route>
                        <Route
                            path='/:cityName/politika-konfidencialnosti'
                            exact={ true }
                        >
                            <Header 
                                data={this.props.globalState.data} 
                                city={this.props.globalState.city} 
                                this_link={this.props.globalState.this_link} />  
                            <PagePolitika data={this.props.globalState.data} city={this.props.globalState.city} this_link={this.props.globalState.this_link}  />
                        </Route>
                        <Route
                            path='/'
                            exact={ true }
                        >
                            <Redirect push
                                to={"/togliatti"}
                            />
                        </Route>
                        <Route
                            path='/profile'
                            exact={ true }
                        >
                            <Redirect push
                                to={"/togliatti"}
                            />
                        </Route>
                        
                        <Route>
                            <Header 
                                data={this.props.globalState.data} 
                                city={this.props.globalState.city} 
                                this_link={this.props.globalState.this_link} />  
                            <NotFound data={this.props.globalState.data} city={this.props.globalState.city} this_link={this.props.globalState.this_link}  />
                        </Route>
                        
                    </Switch>
                    
                    {this.state.activePage == 'cart' ?
                        <Hidden mdDown>
                            <Hidden only="xs">
                                <div className="456" style={{ width: '100%', height: 3, position: 'fixed', bottom: 72, zIndex: 0, backgroundColor: '#bababa', opacity: 0.01 }} />
                                <div style={{ width: '100%', height: 3, position: 'fixed', bottom: 69, zIndex: 0, backgroundColor: '#bababa', opacity: 0.02 }} />
                                <div style={{ width: '100%', height: 3, position: 'fixed', bottom: 66, zIndex: 0, backgroundColor: '#bababa', opacity: 0.03 }} />
                                <div style={{ width: '100%', height: 3, position: 'fixed', bottom: 63, zIndex: 0, backgroundColor: '#bababa', opacity: 0.04 }} />
                                <div style={{ width: '100%', height: 3, position: 'fixed', bottom: 60, zIndex: 0, backgroundColor: '#bababa', opacity: 0.05 }} />
                                <div style={{ width: '100%', height: 3, position: 'fixed', bottom: 57, zIndex: 0, backgroundColor: '#bababa', opacity: 0.06 }} />
                                <div style={{ width: '100%', height: 3, position: 'fixed', bottom: 54, zIndex: 0, backgroundColor: '#bababa', opacity: 0.07 }} />
                                <div style={{ width: '100%', height: 3, position: 'fixed', bottom: 51, zIndex: 0, backgroundColor: '#bababa', opacity: 0.08 }} />
                                <div style={{ width: '100%', height: 3, position: 'fixed', bottom: 48, zIndex: 0, backgroundColor: '#bababa', opacity: 0.09 }} />
                                <div style={{ width: '100%', height: 3, position: 'fixed', bottom: 45, zIndex: 0, backgroundColor: '#bababa', opacity: 0.1 }} />
                            </Hidden>


                            <Hidden only="sm">
                                <div className="123" style={{ width: '100%', height: 3, position: 'fixed', bottom: 72+99, zIndex: 0, backgroundColor: '#bababa', opacity: 0.01 }} />
                                <div style={{ width: '100%', height: 3, position: 'fixed', bottom: 69+99, zIndex: 0, backgroundColor: '#bababa', opacity: 0.02 }} />
                                <div style={{ width: '100%', height: 3, position: 'fixed', bottom: 66+99, zIndex: 0, backgroundColor: '#bababa', opacity: 0.03 }} />
                                <div style={{ width: '100%', height: 3, position: 'fixed', bottom: 63+99, zIndex: 0, backgroundColor: '#bababa', opacity: 0.04 }} />
                                <div style={{ width: '100%', height: 3, position: 'fixed', bottom: 60+99, zIndex: 0, backgroundColor: '#bababa', opacity: 0.05 }} />
                                <div style={{ width: '100%', height: 3, position: 'fixed', bottom: 57+99, zIndex: 0, backgroundColor: '#bababa', opacity: 0.06 }} />
                                <div style={{ width: '100%', height: 3, position: 'fixed', bottom: 54+99, zIndex: 0, backgroundColor: '#bababa', opacity: 0.07 }} />
                                <div style={{ width: '100%', height: 3, position: 'fixed', bottom: 51+99, zIndex: 0, backgroundColor: '#bababa', opacity: 0.08 }} />
                                <div style={{ width: '100%', height: 3, position: 'fixed', bottom: 48+99, zIndex: 0, backgroundColor: '#bababa', opacity: 0.09 }} />
                                <div style={{ width: '100%', height: 3, position: 'fixed', bottom: 45+99, zIndex: 0, backgroundColor: '#bababa', opacity: 0.1 }} />
                            </Hidden>
                        </Hidden>
                            :
                        null
                    }
                 
                    
                    {this.state.activePage == 'cart' ? null
                            :
                        <Hidden mdUp>
                            <div style={{ width: '100%', height: 3, position: 'fixed', bottom: 72, zIndex: 0, backgroundColor: '#bababa', opacity: 0.01 }} />
                            <div style={{ width: '100%', height: 3, position: 'fixed', bottom: 69, zIndex: 0, backgroundColor: '#bababa', opacity: 0.02 }} />
                            <div style={{ width: '100%', height: 3, position: 'fixed', bottom: 66, zIndex: 0, backgroundColor: '#bababa', opacity: 0.03 }} />
                            <div style={{ width: '100%', height: 3, position: 'fixed', bottom: 63, zIndex: 0, backgroundColor: '#bababa', opacity: 0.04 }} />
                            <div style={{ width: '100%', height: 3, position: 'fixed', bottom: 60, zIndex: 0, backgroundColor: '#bababa', opacity: 0.05 }} />
                            <div style={{ width: '100%', height: 3, position: 'fixed', bottom: 57, zIndex: 0, backgroundColor: '#bababa', opacity: 0.06 }} />
                            <div style={{ width: '100%', height: 3, position: 'fixed', bottom: 54, zIndex: 0, backgroundColor: '#bababa', opacity: 0.07 }} />
                            <div style={{ width: '100%', height: 3, position: 'fixed', bottom: 51, zIndex: 0, backgroundColor: '#bababa', opacity: 0.08 }} />
                            <div style={{ width: '100%', height: 3, position: 'fixed', bottom: 48, zIndex: 0, backgroundColor: '#bababa', opacity: 0.09 }} />
                            <div style={{ width: '100%', height: 3, position: 'fixed', bottom: 45, zIndex: 0, backgroundColor: '#bababa', opacity: 0.1 }} />
                        </Hidden>
                    }
                    
                    <StickyFooter cityName={ this.props.globalState.city } />
                </div>
            </Provider>
        );
    }
}