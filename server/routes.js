const { Home } = require( '../src/components/home' );
const { Item } = require( '../src/components/item' );
const { Contact } = require( '../src/components/contact' );
const { Actii } = require( '../src/components/actii' );
const { Profile } = require( '../src/components/profile' );
const { NotFound } = require( '../src/components/app' );
const { Cart } = require( '../src/components/cart' );

const { PageAbout } = require( '../src/components/pageAbout' );
const { PageJob } = require( '../src/components/pageJob' );
const { PageInstPay } = require( '../src/components/pageInstPay' );
const { PageOferta } = require( '../src/components/pageOferta' );
const { PagePolitika } = require( '../src/components/pagePolitika' );

module.exports = [
    {
        path: '/:cityName',
        exact: true,
        component: Home,
        type: 'home',
        code: 200
    },
    {
        path: '/:cityName/home',
        exact: true,
        component: Home,
        type: 'home',
        code: 200
    },
    {
        path: '/:cityName/menu',
        exact: true,
        component: Home,
        type: 'home',
        code: 200
    },
    {
        path: '/:cityName/contact',
        exact: true,
        component: Contact,
        type: '',
        code: 200
    },
    {
        path: '/:cityName/actii',
        exact: true,
        component: Actii,
        type: '',
        code: 200
    },
    {
        path: '/:cityName/menu/:itemLink',
        component: Home,
        type: 'Home',
        code: 200
    },
    {
        path: '/:cityName/item/:itemLink',
        component: Home,
        type: 'item',
        code: 200
    },
    {
        path: '/:cityName/menu/:catLink/item/:itemId',
        component: Home,
        type: 'item',
        code: 200
    },
    {
        path: '/',
        exact: true,
        component: Contact,
        type: '',
        code: 200
    },
    {
        path: '/:cityName/profile',
        exact: true,
        component: Profile,
        type: '',
        code: 200
    },
    {
        path: '/:cityName/cart',
        exact: true,
        component: Cart,
        type: '',
        code: 200
    },
    
    {
        path: '/:cityName/about',
        exact: true,
        component: PageAbout,
        type: '',
        code: 200
    },
    {
        path: '/:cityName/jobs',
        exact: true,
        component: PageJob,
        type: '',
        code: 200
    },
    {
        path: '/:cityName/instpayorders',
        exact: true,
        component: PageInstPay,
        type: '',
        code: 200
    },
    {
        path: '/:cityName/publichnaya-oferta',
        exact: true,
        component: PageOferta,
        type: '',
        code: 200
    },
    {
        path: '/:cityName/politika-konfidencialnosti',
        exact: true,
        component: PagePolitika,
        type: '',
        code: 200
    },
    
    {
        path: '*',
        component: NotFound,
        type: '',
        code: 404
    },
];