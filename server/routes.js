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
        code: 200
    },
    {
        path: '/:cityName/home',
        exact: true,
        component: Home,
        code: 200
    },
    {
        path: '/:cityName/menu',
        exact: true,
        component: Home,
        code: 200
    },
    {
        path: '/:cityName/contact',
        exact: true,
        component: Contact,
        code: 200
    },
    {
        path: '/:cityName/actii',
        exact: true,
        component: Actii,
        code: 200
    },
    {
        path: '/:cityName/menu/:itemLink',
        component: Item,
        code: 200
    },
    {
        path: '/:cityName/item/:itemLink',
        component: Home,
        code: 200
    },
    {
        path: '/:cityName/menu/:catLink/item/:itemId',
        component: Home,
        code: 200
    },
    {
        path: '/',
        exact: true,
        component: Contact,
        code: 200
    },
    {
        path: '/:cityName/profile',
        exact: true,
        component: Profile,
        code: 200
    },
    {
        path: '/:cityName/cart',
        exact: true,
        component: Cart,
        code: 200
    },
    
    {
        path: '/:cityName/about',
        exact: true,
        component: PageAbout,
        code: 200
    },
    {
        path: '/:cityName/jobs',
        exact: true,
        component: PageJob,
        code: 200
    },
    {
        path: '/:cityName/instpayorders',
        exact: true,
        component: PageInstPay,
        code: 200
    },
    {
        path: '/:cityName/publichnaya-oferta',
        exact: true,
        component: PageOferta,
        code: 200
    },
    {
        path: '/:cityName/politika-konfidencialnosti',
        exact: true,
        component: PagePolitika,
        code: 200
    },
    
    {
        path: '*',
        component: NotFound,
        code: 404
    },
];