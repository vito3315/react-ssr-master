const { Home } = require( '../src/components/home' );
const { HomeCat } = require( '../src/components/home' );
const { Item } = require( '../src/components/item' );
const { Contact } = require( '../src/components/contact' );
const { Actii } = require( '../src/components/actii' );
const { Profile } = require( '../src/components/profile' );
const { Cart } = require( '../src/components/cart' );

const { PageAbout } = require( '../src/components/pageAbout' );
const { PageJob } = require( '../src/components/pageJob' );
const { PageInstPay } = require( '../src/components/pageInstPay' );
const { PageOferta } = require( '../src/components/pageOferta' );
const { PagePolitika } = require( '../src/components/pagePolitika' );

const { PageLegal } = require( '../src/components/pageLegal' );
const { PagePoliticLegal } = require( '../src/components/pagePoliticLegal' );

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
        path: '/:cityName/contacts',
        exact: true,
        component: Contact,
        type: '',
        code: 200
    },
    {
        path: '/:cityName/akcii/:act_id',
        exact: true,
        component: Actii,
        type: '',
        code: 200
    },
    {
        path: '/:cityName/akcii',
        exact: true,
        component: Actii,
        type: '',
        code: 200
    },
    
    {
        path: '/:cityName/menu/:itemLink',
        exact: true,
        component: HomeCat,
        type: 'home',
        code: 200
    },
    {
        path: '/:cityName/item/:itemLink',
        exact: true,
        component: Item,
        type: 'item',
        code: 200
    },
    {
        path: '/:cityName/menu/:catLink/:itemId',
        exact: true,
        component: Item,
        type: 'item',
        code: 200
    },
    {
        path: '/',
        exact: true,
        component: Home,
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
        path: '/:cityName/legal',
        exact: true,
        component: PageLegal,
        type: '',
        code: 200
    },
    {
        path: '/:cityName/politika-legal',
        exact: true,
        component: PagePoliticLegal,
        type: '',
        code: 200
    },
    
    {
        path: '/sitemap.xml',
        exact: true,
        type: 'other',
        code: 200
    },
    
    {
        path: '*',
        component: Home,
        type: 'home',
        code: 404
    },
];